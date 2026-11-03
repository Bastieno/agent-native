/**
 * Token usage tracking and cost monitoring.
 *
 * Every LLM call made by the framework records a row here so users can
 * see where their spend is going — chat vs automations vs background jobs
 * vs whatever else a template labels its prompts as.
 *
 * Cost is stored as "centicents" (1/100th of a cent) for integer precision.
 */
import { getDbExec, intType, isPostgres } from "../db/client.js";
import { getRequestOrgId } from "../server/request-context.js";

/**
 * Per-million-token pricing in cents. Cache read is typically ~10% of
 * input; cache write (5m TTL) is ~125%. Pricing is best-effort — keep
 * this table in sync with Anthropic's published prices.
 */
interface ModelPricing {
  input: number;
  output: number;
  cacheRead: number;
  cacheWrite: number;
}

export const BUILDER_AGENT_CREDIT_MARGIN_MULTIPLIER = 1.25;
export const BUILDER_AGENT_CREDITS_PER_USD = 20;

export type UsageBillingUnit = "usd" | "builder-credits";

export interface UsageBillingMode {
  unit: UsageBillingUnit;
  label: string;
  shortLabel: string;
  source: "estimated-provider-cost" | "builder-agent-credits";
  hardCostMarginMultiplier?: number;
  creditsPerUsd?: number;
}

export const USD_USAGE_BILLING: UsageBillingMode = {
  unit: "usd",
  label: "Estimated spend",
  shortLabel: "Cost",
  source: "estimated-provider-cost",
};

export const BUILDER_CREDIT_USAGE_BILLING: UsageBillingMode = {
  unit: "builder-credits",
  label: "Builder.io credit spend",
  shortLabel: "Credits",
  source: "builder-agent-credits",
  hardCostMarginMultiplier: BUILDER_AGENT_CREDIT_MARGIN_MULTIPLIER,
  creditsPerUsd: BUILDER_AGENT_CREDITS_PER_USD,
};

export function usageBillingForEngine(
  engineName: string | null | undefined,
): UsageBillingMode {
  return engineName === "builder"
    ? BUILDER_CREDIT_USAGE_BILLING
    : USD_USAGE_BILLING;
}

export function builderCreditsFromCostCents(cents: number): number {
  if (!Number.isFinite(cents) || cents <= 0) return 0;
  const dollars = cents / 100;
  const credits =
    dollars *
    BUILDER_AGENT_CREDIT_MARGIN_MULTIPLIER *
    BUILDER_AGENT_CREDITS_PER_USD;
  return Math.ceil(credits * 1000) / 1000;
}

const PRICING: Array<{ match: RegExp; pricing: ModelPricing }> = [
  // Newer models first: they are priced differently from the family default.
  // Haiku 5.5 is the price for prompts up to 100k tokens.
  {
    match: /opus-5-5/i,
    pricing: { input: 400, output: 2000, cacheRead: 20, cacheWrite: 500 },
  },
  {
    match: /sonnet-5-5/i,
    pricing: { input: 200, output: 1000, cacheRead: 10, cacheWrite: 250 },
  },
  {
    match: /haiku-5-5/i,
    pricing: { input: 10, output: 50, cacheRead: 1, cacheWrite: 12.5 },
  },
  {
    match: /opus/i,
    pricing: { input: 1500, output: 7500, cacheRead: 150, cacheWrite: 1875 },
  },
  {
    match: /haiku/i,
    pricing: { input: 100, output: 500, cacheRead: 10, cacheWrite: 125 },
  },
  // default → sonnet pricing
  {
    match: /.*/,
    pricing: { input: 300, output: 1500, cacheRead: 30, cacheWrite: 375 },
  },
];

function pricingFor(model: string): ModelPricing {
  for (const entry of PRICING) {
    if (entry.match.test(model)) return entry.pricing;
  }
  return PRICING[PRICING.length - 1]!.pricing;
}

export interface UsageRecord {
  ownerEmail: string;
  inputTokens: number;
  outputTokens: number;
  cacheReadTokens?: number;
  cacheWriteTokens?: number;
  model: string;
  /** Category for this call — e.g. "chat", "automation", "job", "custom-agent". */
  label?: string;
  /** Optional template/app name (e.g. "mail"). Falls back to AGENT_APP / APP_NAME env. */
  app?: string;
  /**
   * The organization the call was made in. Falls back to the request's org,
   * so someone in two orgs has each org's spend kept apart.
   */
  orgId?: string | null;
}

let _initPromise: Promise<void> | undefined;

async function ensureUsageTable(): Promise<void> {
  if (!_initPromise) {
    _initPromise = (async () => {
      const client = getDbExec();
      await client.execute(`
        CREATE TABLE IF NOT EXISTS token_usage (
          id ${intType()} PRIMARY KEY,
          owner_email TEXT NOT NULL,
          input_tokens ${intType()} NOT NULL DEFAULT 0,
          output_tokens ${intType()} NOT NULL DEFAULT 0,
          cache_read_tokens ${intType()} NOT NULL DEFAULT 0,
          cache_write_tokens ${intType()} NOT NULL DEFAULT 0,
          cost_cents_x100 ${intType()} NOT NULL DEFAULT 0,
          model TEXT NOT NULL DEFAULT '',
          label TEXT NOT NULL DEFAULT 'chat',
          app TEXT NOT NULL DEFAULT '',
          org_id TEXT,
          created_at ${intType()} NOT NULL
        )
      `);

      // Add columns on older deployments that pre-date the label/cache
      // fields. Each ALTER is wrapped so a dialect without IF NOT EXISTS
      // (SQLite) still makes progress if only some columns are missing.
      const additions: Array<[string, string]> = [
        ["cache_read_tokens", `${intType()} NOT NULL DEFAULT 0`],
        ["cache_write_tokens", `${intType()} NOT NULL DEFAULT 0`],
        ["label", `TEXT NOT NULL DEFAULT 'chat'`],
        ["app", `TEXT NOT NULL DEFAULT ''`],
        // Rows from before this column have no org: they count towards the
        // person's own total but no organization's.
        ["org_id", `TEXT`],
      ];
      for (const [col, def] of additions) {
        try {
          if (isPostgres()) {
            await client.execute(
              `ALTER TABLE token_usage ADD COLUMN IF NOT EXISTS ${col} ${def}`,
            );
          } else {
            await client.execute(
              `ALTER TABLE token_usage ADD COLUMN ${col} ${def}`,
            );
          }
        } catch {
          // Column already exists — ignore
        }
      }

      try {
        await client.execute(
          `CREATE INDEX IF NOT EXISTS idx_token_usage_owner_created ON token_usage (owner_email, created_at)`,
        );
      } catch {}
      try {
        await client.execute(
          `CREATE INDEX IF NOT EXISTS idx_token_usage_org_created ON token_usage (org_id, created_at)`,
        );
      } catch {}
    })();
  }
  return _initPromise;
}

/**
 * Calculate cost in centicents (1/100th of a cent).
 * Accepts cache tokens so callers that use prompt caching are priced
 * correctly. Non-cache-aware callers can pass 0 for the cache fields.
 */
export function calculateCost(
  inputTokens: number,
  outputTokens: number,
  model: string,
  cacheReadTokens = 0,
  cacheWriteTokens = 0,
): number {
  const p = pricingFor(model);
  const rawCenticents =
    (inputTokens / 1_000_000) * p.input * 100 +
    (outputTokens / 1_000_000) * p.output * 100 +
    (cacheReadTokens / 1_000_000) * p.cacheRead * 100 +
    (cacheWriteTokens / 1_000_000) * p.cacheWrite * 100;
  return rawCenticents > 0 ? Math.max(1, Math.round(rawCenticents)) : 0;
}

/**
 * Record token usage from an LLM call.
 *
 * Accepts an object with the full set of fields. A positional overload
 * remains for backward compatibility with the older 4-arg signature.
 */
export async function recordUsage(record: UsageRecord): Promise<void>;
export async function recordUsage(
  ownerEmail: string,
  inputTokens: number,
  outputTokens: number,
  model: string,
): Promise<void>;
export async function recordUsage(
  recordOrOwner: UsageRecord | string,
  inputTokens?: number,
  outputTokens?: number,
  model?: string,
): Promise<void> {
  const record: UsageRecord =
    typeof recordOrOwner === "string"
      ? {
          ownerEmail: recordOrOwner,
          inputTokens: inputTokens ?? 0,
          outputTokens: outputTokens ?? 0,
          model: model ?? "",
        }
      : recordOrOwner;

  const {
    ownerEmail,
    inputTokens: inTok,
    outputTokens: outTok,
    cacheReadTokens = 0,
    cacheWriteTokens = 0,
    model: modelName,
    label,
    app,
    orgId,
  } = record;

  // Skip no-op writes (e.g. a stream aborted before any tokens flowed)
  if (!inTok && !outTok && !cacheReadTokens && !cacheWriteTokens) return;

  await ensureUsageTable();
  const client = getDbExec();
  const costX100 = calculateCost(
    inTok,
    outTok,
    modelName,
    cacheReadTokens,
    cacheWriteTokens,
  );
  const id = Date.now() * 1000 + Math.floor(Math.random() * 1000);
  const resolvedApp =
    app ?? process.env.AGENT_APP ?? process.env.APP_NAME ?? "";
  const resolvedLabel = label ?? "chat";
  const resolvedOrg = orgId === undefined ? (getRequestOrgId() ?? null) : orgId;
  await client.execute({
    sql: `INSERT INTO token_usage
      (id, owner_email, input_tokens, output_tokens, cache_read_tokens, cache_write_tokens, cost_cents_x100, model, label, app, org_id, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [
      id,
      ownerEmail,
      inTok,
      outTok,
      cacheReadTokens,
      cacheWriteTokens,
      costX100,
      modelName,
      resolvedLabel,
      resolvedApp,
      resolvedOrg,
      Date.now(),
    ],
  });
}

/** Total cost (in cents) charged against a user, across all time. */
export async function getUserUsageCents(ownerEmail: string): Promise<number> {
  await ensureUsageTable();
  const client = getDbExec();
  const { rows } = await client.execute({
    sql: `SELECT COALESCE(SUM(cost_cents_x100), 0) as total FROM token_usage WHERE owner_email = ?`,
    args: [ownerEmail],
  });
  const total = Number((rows[0] as { total?: number })?.total ?? 0);
  return total / 100;
}

// ─── Admin / UI queries ─────────────────────────────────────────────────

export interface UsageSummaryOptions {
  /** One person's calls. With `orgId` too, their calls in that org only. */
  ownerEmail?: string;
  /** One organization's calls, everyone's. With `ownerEmail`, that person's. */
  orgId?: string;
  /** Inclusive lower bound (ms since epoch). Defaults to 30 days ago. */
  sinceMs?: number;
}

export interface UsageBucket {
  key: string;
  inputTokens: number;
  outputTokens: number;
  cacheReadTokens: number;
  cacheWriteTokens: number;
  cents: number;
  calls: number;
}

export interface DailyBucket {
  /** YYYY-MM-DD (UTC) */
  date: string;
  cents: number;
  calls: number;
}

export interface UsageRecentEntry {
  id: number;
  ownerEmail: string;
  createdAt: number;
  label: string;
  app: string;
  model: string;
  inputTokens: number;
  outputTokens: number;
  cacheReadTokens: number;
  cacheWriteTokens: number;
  cents: number;
}

export interface UsageSummary {
  billing?: UsageBillingMode;
  totalCents: number;
  totalCalls: number;
  totalInputTokens: number;
  totalOutputTokens: number;
  totalCacheReadTokens: number;
  totalCacheWriteTokens: number;
  sinceMs: number;
  byLabel: UsageBucket[];
  byModel: UsageBucket[];
  byApp: UsageBucket[];
  /** Spend per person, highest first. */
  byOwner: UsageBucket[];
  byDay: DailyBucket[];
  recent: UsageRecentEntry[];
}

const DAY_MS = 86_400_000;

/**
 * Produce an aggregated spend view for the Usage admin panel.
 *
 * Scoped to a person, an organization, or a person within one. At least one
 * is required: an unscoped summary would be every user's spend. Callers
 * decide who may see an organization's summary (its admins, typically); this
 * only runs the query.
 */
export async function getUsageSummary(
  options: UsageSummaryOptions,
): Promise<UsageSummary> {
  await ensureUsageTable();
  const client = getDbExec();
  const sinceMs = options.sinceMs ?? Date.now() - 30 * DAY_MS;
  if (!options.ownerEmail && !options.orgId) {
    throw new Error("getUsageSummary needs an ownerEmail or an orgId");
  }
  const conds = ["created_at >= ?"];
  const scopeArgs: Array<string | number> = [sinceMs];
  if (options.ownerEmail) {
    conds.push("owner_email = ?");
    scopeArgs.push(options.ownerEmail);
  }
  if (options.orgId) {
    conds.push("org_id = ?");
    scopeArgs.push(options.orgId);
  }
  const where = conds.join(" AND ");

  const totalRow = await client.execute({
    sql: `SELECT
      COALESCE(SUM(cost_cents_x100), 0) AS cents,
      COUNT(*) AS calls,
      COALESCE(SUM(input_tokens), 0) AS in_tok,
      COALESCE(SUM(output_tokens), 0) AS out_tok,
      COALESCE(SUM(cache_read_tokens), 0) AS cr_tok,
      COALESCE(SUM(cache_write_tokens), 0) AS cw_tok
      FROM token_usage WHERE ${where}`,
    args: scopeArgs,
  });
  const t = (totalRow.rows[0] ?? {}) as Record<string, number | null>;

  const bucketSql = (col: string) => ({
    sql: `SELECT ${col} AS k,
        COALESCE(SUM(cost_cents_x100), 0) AS cents,
        COUNT(*) AS calls,
        COALESCE(SUM(input_tokens), 0) AS in_tok,
        COALESCE(SUM(output_tokens), 0) AS out_tok,
        COALESCE(SUM(cache_read_tokens), 0) AS cr_tok,
        COALESCE(SUM(cache_write_tokens), 0) AS cw_tok
      FROM token_usage
      WHERE ${where}
      GROUP BY ${col}
      ORDER BY cents DESC`,
    args: scopeArgs,
  });

  const mapBuckets = (rows: unknown[]): UsageBucket[] =>
    rows.map((r) => {
      const row = r as Record<string, number | string | null>;
      return {
        key: String(row.k ?? ""),
        cents: Number(row.cents ?? 0) / 100,
        calls: Number(row.calls ?? 0),
        inputTokens: Number(row.in_tok ?? 0),
        outputTokens: Number(row.out_tok ?? 0),
        cacheReadTokens: Number(row.cr_tok ?? 0),
        cacheWriteTokens: Number(row.cw_tok ?? 0),
      };
    });

  const [byLabelR, byModelR, byAppR, byOwnerR] = await Promise.all([
    client.execute(bucketSql("label")),
    client.execute(bucketSql("model")),
    client.execute(bucketSql("app")),
    client.execute(bucketSql("owner_email")),
  ]);

  // By-day aggregation — done in JS so we don't depend on dialect-specific
  // date functions (SQLite `strftime`, Postgres `to_char`). Cheap enough
  // for a 30-day window; if this grows, swap for a dialect-aware query.
  const dayRows = await client.execute({
    sql: `SELECT created_at, cost_cents_x100 FROM token_usage
      WHERE ${where}`,
    args: scopeArgs,
  });
  const dayMap = new Map<string, { cents: number; calls: number }>();
  for (const row of dayRows.rows as Array<Record<string, number>>) {
    const date = new Date(Number(row.created_at)).toISOString().slice(0, 10);
    const prev = dayMap.get(date) ?? { cents: 0, calls: 0 };
    prev.cents += Number(row.cost_cents_x100 ?? 0);
    prev.calls += 1;
    dayMap.set(date, prev);
  }
  const byDay: DailyBucket[] = [...dayMap.entries()]
    .map(([date, v]) => ({
      date,
      cents: v.cents / 100,
      calls: v.calls,
    }))
    .sort((a, b) => a.date.localeCompare(b.date));

  const recentRows = await client.execute({
    sql: `SELECT id, owner_email, created_at, label, app, model,
        input_tokens, output_tokens, cache_read_tokens, cache_write_tokens,
        cost_cents_x100
      FROM token_usage
      WHERE ${where}
      ORDER BY created_at DESC
      LIMIT 50`,
    args: scopeArgs,
  });
  const recent: UsageRecentEntry[] = (
    recentRows.rows as Array<Record<string, number | string | null>>
  ).map((row) => ({
    id: Number(row.id),
    ownerEmail: String(row.owner_email ?? ""),
    createdAt: Number(row.created_at),
    label: String(row.label ?? "chat"),
    app: String(row.app ?? ""),
    model: String(row.model ?? ""),
    inputTokens: Number(row.input_tokens ?? 0),
    outputTokens: Number(row.output_tokens ?? 0),
    cacheReadTokens: Number(row.cache_read_tokens ?? 0),
    cacheWriteTokens: Number(row.cache_write_tokens ?? 0),
    cents: Number(row.cost_cents_x100 ?? 0) / 100,
  }));

  return {
    billing: USD_USAGE_BILLING,
    totalCents: Number(t.cents ?? 0) / 100,
    totalCalls: Number(t.calls ?? 0),
    totalInputTokens: Number(t.in_tok ?? 0),
    totalOutputTokens: Number(t.out_tok ?? 0),
    totalCacheReadTokens: Number(t.cr_tok ?? 0),
    totalCacheWriteTokens: Number(t.cw_tok ?? 0),
    sinceMs,
    byLabel: mapBuckets(byLabelR.rows),
    byModel: mapBuckets(byModelR.rows),
    byApp: mapBuckets(byAppR.rows),
    byOwner: mapBuckets(byOwnerR.rows),
    byDay,
    recent,
  };
}
