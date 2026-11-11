// guard:allow-unscoped — billing tables are keyed by school id and only ever read or written for the school named in the call; callers (actions, the gate, operator scripts) decide who may ask.
import {
  emailStrong,
  isEmailConfigured,
  renderEmail,
  sendEmail,
} from "@agent-native/core/server";
import { sql } from "drizzle-orm";
import { nanoid } from "nanoid";
import {
  DEFAULT_MARGIN_BP,
  ccToCredits,
  isLowBalance,
  retailCc,
  staffRequestsLeft,
  type BillingMode,
} from "../../shared/credits.js";
import { rowOf, rowsOf, runSql } from "./raw-sql.js";

/**
 * Prepaid credit for the assistant.
 *
 * A school on `managed` uses the operator's provider key and spends credit; a
 * school on `byo`, or with no billing row at all, uses its own key and is never
 * charged. The balance is what the ledger holds (grants, minus what has been
 * settled) less the cost of runs not yet settled, counted from the same
 * `token_usage` rows that `get-school-usage` shows, so there is no second
 * measure of cost to disagree with it.
 */

/** Runs this recent are left for the next settlement: one may still be writing. */
const SETTLE_LAG_MS = 60_000;

export interface Billing {
  schoolId: string;
  mode: BillingMode;
  marginBp: number;
  /** ms since epoch: usage up to here is already in the ledger. */
  chargedTo: number;
  lowNotifiedAt: string | null;
}

export interface LedgerEntry {
  id: string;
  kind: string;
  amountCc: number;
  paymentRef: string | null;
  note: string | null;
  createdBy: string;
  createdAt: string;
}

export interface CreditStatus {
  mode: BillingMode | "none";
  /** Retail centicents; may be below zero by the cost of one run. */
  balanceCc: number;
  credits: number;
  staffRequests: number;
  low: boolean;
  out: boolean;
}

const nowIso = () => new Date().toISOString();

export async function getBilling(schoolId: string): Promise<Billing | null> {
  const row = await rowOf<Record<string, unknown>>(
    sql`SELECT school_id, mode, margin_bp, charged_to, low_notified_at FROM school_billing WHERE school_id = ${schoolId} LIMIT 1`,
  );
  if (!row) return null;
  return {
    schoolId,
    mode: row.mode === "managed" ? "managed" : "byo",
    marginBp: Number(row.margin_bp ?? 0) || DEFAULT_MARGIN_BP,
    chargedTo: Number(row.charged_to ?? 0) || 0,
    lowNotifiedAt: (row.low_notified_at as string | null) ?? null,
  };
}

/** Provider cost (centicents) of a school's runs in a window. */
async function providerCostCc(
  schoolId: string,
  after: number,
  upTo: number,
): Promise<number> {
  try {
    const row = await rowOf<{ total: number | string | null }>(
      sql`SELECT COALESCE(SUM(cost_cents_x100), 0) AS total FROM token_usage
          WHERE org_id = ${schoolId} AND created_at > ${after} AND created_at <= ${upTo}`,
    );
    return Number(row?.total ?? 0);
  } catch {
    // No runs have ever been recorded on this database.
    return 0;
  }
}

async function ledgerTotalCc(schoolId: string): Promise<number> {
  const row = await rowOf<{ total: number | string | null }>(
    sql`SELECT COALESCE(SUM(amount_cc), 0) AS total FROM school_credit_ledger WHERE school_id = ${schoolId}`,
  );
  return Number(row?.total ?? 0);
}

async function balanceFor(b: Billing, nowMs = Date.now()): Promise<number> {
  const ledger = await ledgerTotalCc(b.schoolId);
  const unsettled = await providerCostCc(b.schoolId, b.chargedTo, nowMs);
  return ledger - retailCc(unsettled, b.marginBp);
}

async function lastGrantCc(schoolId: string): Promise<number> {
  const row = await rowOf<{ amount: number | string }>(
    sql`SELECT amount_cc AS amount FROM school_credit_ledger
        WHERE school_id = ${schoolId} AND kind = 'grant'
        ORDER BY created_at DESC LIMIT 1`,
  );
  return Number(row?.amount ?? 0);
}

async function recentDailyCc(schoolId: string): Promise<number> {
  const since = new Date(Date.now() - 7 * 86_400_000).toISOString();
  const row = await rowOf<{ total: number | string | null }>(
    sql`SELECT COALESCE(SUM(-amount_cc), 0) AS total FROM school_credit_ledger
        WHERE school_id = ${schoolId} AND kind = 'debit' AND created_at >= ${since}`,
  );
  return Number(row?.total ?? 0) / 7;
}

export async function creditStatus(schoolId: string): Promise<CreditStatus> {
  const b = await getBilling(schoolId);
  if (!b) {
    return {
      mode: "none",
      balanceCc: 0,
      credits: 0,
      staffRequests: 0,
      low: false,
      out: false,
    };
  }
  if (b.mode !== "managed") {
    const balanceCc = await ledgerTotalCc(schoolId);
    return {
      mode: "byo",
      balanceCc,
      credits: ccToCredits(balanceCc),
      staffRequests: staffRequestsLeft(balanceCc),
      low: false,
      out: false,
    };
  }
  const balanceCc = await balanceFor(b);
  return {
    mode: "managed",
    balanceCc,
    credits: ccToCredits(balanceCc),
    staffRequests: staffRequestsLeft(balanceCc),
    low: isLowBalance(
      balanceCc,
      await lastGrantCc(schoolId),
      await recentDailyCc(schoolId),
    ),
    out: balanceCc <= 0,
  };
}

/** Whether a school on Ellai's credit has none left. The gate asks this per message. */
export async function creditsRunOut(
  schoolId: string | null | undefined,
): Promise<boolean> {
  if (!schoolId) return false;
  try {
    const b = await getBilling(schoolId);
    if (!b || b.mode !== "managed") return false;
    return (await balanceFor(b)) <= 0;
  } catch {
    // Billing tables not there yet: never refuse because of them.
    return false;
  }
}

/** Whether runs for this school use the operator's key. */
export async function usesManagedKey(
  schoolId: string | null | undefined,
): Promise<boolean> {
  if (!schoolId) return false;
  try {
    return (await getBilling(schoolId))?.mode === "managed";
  } catch {
    return false;
  }
}

export async function ledgerFor(
  schoolId: string,
  limit = 30,
): Promise<LedgerEntry[]> {
  const rows = await rowsOf<Record<string, unknown>>(
    sql`SELECT id, kind, amount_cc, payment_ref, note, created_by, created_at
        FROM school_credit_ledger WHERE school_id = ${schoolId}
        ORDER BY created_at DESC LIMIT ${limit}`,
  );
  return rows.map((r) => ({
    id: String(r.id),
    kind: String(r.kind),
    amountCc: Number(r.amount_cc),
    paymentRef: (r.payment_ref as string | null) ?? null,
    note: (r.note as string | null) ?? null,
    createdBy: String(r.created_by),
    createdAt: String(r.created_at),
  }));
}

async function insertLedger(entry: {
  id?: string;
  schoolId: string;
  kind: "grant" | "debit" | "adjustment" | "refund";
  amountCc: number;
  providerCostCc?: number;
  marginBp?: number;
  usageFrom?: number;
  usageTo?: number;
  paymentRef?: string | null;
  note?: string | null;
  by: string;
}): Promise<void> {
  await runSql(
    sql`INSERT INTO school_credit_ledger
        (id, school_id, kind, amount_cc, provider_cost_cc, margin_bp, usage_from, usage_to, payment_ref, note, created_by, created_at)
        VALUES (${entry.id ?? nanoid()}, ${entry.schoolId}, ${entry.kind}, ${entry.amountCc},
                ${entry.providerCostCc ?? null}, ${entry.marginBp ?? null},
                ${entry.usageFrom != null ? String(entry.usageFrom) : null},
                ${entry.usageTo != null ? String(entry.usageTo) : null},
                ${entry.paymentRef ?? null}, ${entry.note ?? null}, ${entry.by}, ${nowIso()})
        ON CONFLICT (id) DO NOTHING`,
  );
}

/**
 * Move a school's finished runs from `token_usage` into the ledger as one
 * debit. Safe to run twice: the debit's id names the window it closes.
 */
export async function settleSchool(
  schoolId: string,
  nowMs = Date.now(),
): Promise<{ settledCc: number }> {
  const b = await getBilling(schoolId);
  if (!b || b.mode !== "managed") return { settledCc: 0 };
  const upTo = nowMs - SETTLE_LAG_MS;
  if (upTo <= b.chargedTo) return { settledCc: 0 };
  const cost = await providerCostCc(schoolId, b.chargedTo, upTo);
  const charge = retailCc(cost, b.marginBp);
  if (charge > 0) {
    await insertLedger({
      id: `debit:${schoolId}:${upTo}`,
      schoolId,
      kind: "debit",
      amountCc: -charge,
      providerCostCc: cost,
      marginBp: b.marginBp,
      usageFrom: b.chargedTo,
      usageTo: upTo,
      note: "Assistant use",
      by: "system",
    });
  }
  await runSql(
    sql`UPDATE school_billing SET charged_to = ${String(upTo)}, updated_at = ${nowIso()} WHERE school_id = ${schoolId}`,
  );
  return { settledCc: charge };
}

/** Give a school credit. Returns the new balance in retail centicents. */
export async function grantCredit(opts: {
  schoolId: string;
  amountCc: number;
  paymentRef?: string | null;
  note?: string | null;
  by: string;
  kind?: "grant" | "adjustment";
}): Promise<number> {
  if (!Number.isFinite(opts.amountCc) || opts.amountCc === 0) {
    throw new Error("The amount must be a number of credits, not zero.");
  }
  const kind = opts.kind ?? "grant";
  if (kind === "grant" && opts.amountCc < 0) {
    throw new Error(
      "A grant is positive. Use an adjustment to take credit off.",
    );
  }
  let billing = await getBilling(opts.schoolId);
  if (!billing) {
    // Parked until the school is switched to managed.
    await runSql(
      sql`INSERT INTO school_billing (school_id, mode, charged_to, created_at, updated_at)
          VALUES (${opts.schoolId}, 'byo', ${String(Date.now())}, ${nowIso()}, ${nowIso()})
          ON CONFLICT (school_id) DO NOTHING`,
    );
    billing = await getBilling(opts.schoolId);
  }
  await insertLedger({
    schoolId: opts.schoolId,
    kind,
    amountCc: opts.amountCc,
    paymentRef: opts.paymentRef,
    note: opts.note,
    by: opts.by,
  });
  await runSql(
    sql`UPDATE school_billing SET low_notified_at = NULL, updated_at = ${nowIso()} WHERE school_id = ${opts.schoolId}`,
  );
  await runSql(
    sql`UPDATE credit_top_up_requests SET status = 'granted' WHERE school_id = ${opts.schoolId} AND status = 'pending'`,
  );
  return billing?.mode === "managed"
    ? await balanceFor(billing)
    : await ledgerTotalCc(opts.schoolId);
}

/**
 * Switch how a school pays. Leaving managed settles first, so what was used
 * on Ellai's key is charged; entering it starts the count from now, so runs
 * made on the school's own key are never charged.
 */
export async function setBillingMode(
  schoolId: string,
  mode: BillingMode,
  by: string,
): Promise<void> {
  const current = await getBilling(schoolId);
  if (current?.mode === mode) return;
  if (current?.mode === "managed") await settleSchool(schoolId, Date.now());
  const t = nowIso();
  await runSql(
    sql`INSERT INTO school_billing (school_id, mode, charged_to, created_at, updated_at)
        VALUES (${schoolId}, ${mode}, ${String(Date.now())}, ${t}, ${t})
        ON CONFLICT (school_id) DO UPDATE SET mode = ${mode},
          charged_to = ${String(Date.now())}, updated_at = ${t}`,
  );
  console.log(`[credits] ${schoolId} -> ${mode} (${by})`);
}

/** What the operator is told when a school runs low. */
export function operatorEmails(): string[] {
  return (process.env.ELLAI_OPERATOR_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export async function emailOperators(
  subject: string,
  lines: string[],
): Promise<boolean> {
  const to = operatorEmails();
  if (!to.length || !isEmailConfigured()) return false;
  try {
    const { html, text } = renderEmail({
      heading: subject,
      paragraphs: lines.map((l) => emailStrong(l)),
    });
    for (const address of to) {
      await sendEmail({ to: address, subject, html, text });
    }
    return true;
  } catch (err) {
    console.error(
      `[credits] email to operators failed: ${err instanceof Error ? err.message : err}`,
    );
    return false;
  }
}

/**
 * The daily job: settle every managed school, then tell the operator once
 * about each school that has run low or out since its last grant.
 */
export async function settleAllSchools(): Promise<{
  settled: number;
  warned: number;
}> {
  const rows = await rowsOf<{
    school_id: string;
    low_notified_at: string | null;
  }>(
    sql`SELECT school_id, low_notified_at FROM school_billing WHERE mode = 'managed'`,
  );
  let warned = 0;
  const notices: string[] = [];
  for (const r of rows) {
    await settleSchool(r.school_id);
    if (r.low_notified_at) continue;
    const status = await creditStatus(r.school_id);
    if (status.low || status.out) {
      const name = await schoolName(r.school_id);
      notices.push(
        `${name}: ${status.out ? "out of credit" : `${status.credits.toLocaleString("en")} credits left`}`,
      );
      await runSql(
        sql`UPDATE school_billing SET low_notified_at = ${nowIso()} WHERE school_id = ${r.school_id}`,
      );
      warned++;
    }
  }
  if (notices.length)
    await emailOperators("Schools running low on credit", notices);
  return { settled: rows.length, warned };
}

export async function schoolName(schoolId: string): Promise<string> {
  const row = await rowOf<{ name: string }>(
    sql`SELECT name FROM organizations WHERE id = ${schoolId} LIMIT 1`,
  ).catch(() => undefined);
  return row?.name ?? schoolId;
}
