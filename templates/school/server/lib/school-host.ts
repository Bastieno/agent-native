/**
 * Which school an address belongs to.
 *
 * A school may have its own address (`greenvalley.ellai.dev`). The mapping is
 * the `school_domains` table: host -> organisation. A host that is not in the
 * table (localhost, the shared demo address) belongs to no school, and nothing
 * here applies to it, so existing deployments behave as before.
 */
import { getDbExec } from "@agent-native/core/db";

async function first(sqlText: string, args: string[]) {
  const { rows } = await getDbExec().execute({ sql: sqlText, args });
  return rows[0] as Record<string, any> | undefined;
}

/** Names a school may not take: they are the operator's own addresses. */
export const RESERVED_SLUGS = new Set([
  "www",
  "api",
  "app",
  "admin",
  "demo",
  "mail",
  "status",
  "docs",
  "help",
  "support",
  "static",
  "assets",
  "cdn",
  "dashboard",
]);

/** A host as stored: lower case, no port, no trailing dot. */
export function normalizeHost(raw: string | null | undefined): string {
  return (raw ?? "")
    .trim()
    .toLowerCase()
    .replace(/:\d+$/, "")
    .replace(/\.$/, "");
}

/** Why a slug cannot be used, or null when it can. */
export function slugProblem(slug: string): string | null {
  if (!/^[a-z0-9](?:[a-z0-9-]{1,38}[a-z0-9])$/.test(slug)) {
    return "Use 3 to 40 letters, numbers or hyphens, starting and ending with a letter or number.";
  }
  if (RESERVED_SLUGS.has(slug)) return `"${slug}" is reserved.`;
  return null;
}

const TTL_MS = 60_000;
const cache = new Map<string, { orgId: string | null; at: number }>();

/** The school a host belongs to, or null when it belongs to none. */
export async function orgForHost(
  rawHost: string | null | undefined,
): Promise<string | null> {
  const host = normalizeHost(rawHost);
  if (!host) return null;
  const hit = cache.get(host);
  if (hit && Date.now() - hit.at < TTL_MS) return hit.orgId;
  let orgId: string | null = null;
  try {
    const row = await first(
      "SELECT org_id FROM school_domains WHERE host = ? LIMIT 1",
      [host],
    );
    orgId = row ? String(row.org_id) : null;
  } catch {
    // The table may not exist yet on a first boot; no mapping then.
  }
  cache.set(host, { orgId, at: Date.now() });
  return orgId;
}

/** The address a school is reached at, if it has one. */
export async function hostForOrg(orgId: string): Promise<string | null> {
  try {
    const row = await first(
      "SELECT host FROM school_domains WHERE org_id = ? ORDER BY created_at LIMIT 1",
      [orgId],
    );
    return row ? String(row.host) : null;
  } catch {
    return null;
  }
}

/** Whether an address belongs to a school already. Reads the table, not the cache. */
export async function hostTaken(rawHost: string): Promise<boolean> {
  const row = await first(
    "SELECT org_id FROM school_domains WHERE host = ? LIMIT 1",
    [normalizeHost(rawHost)],
  );
  return !!row;
}

/** Give a school an address. Refuses one already taken by another school. */
export async function assignHost(orgId: string, rawHost: string) {
  const host = normalizeHost(rawHost);
  const taken = await first(
    "SELECT org_id FROM school_domains WHERE host = ? LIMIT 1",
    [host],
  );
  if (taken && String(taken.org_id) !== orgId) {
    throw new Error(`${host} already belongs to another school.`);
  }
  if (!taken) {
    await getDbExec().execute({
      sql: "INSERT INTO school_domains (host, org_id) VALUES (?, ?)",
      args: [host, orgId],
    });
  }
  cache.delete(host);
  return host;
}

/**
 * The address to send people to for this school: its own when it has one,
 * otherwise the deployment's.
 */
export async function schoolAppUrl(
  orgId: string,
  fallback: string,
): Promise<string> {
  const host = await hostForOrg(orgId);
  if (!host) return fallback;
  const local = host.endsWith(".localhost") || host === "localhost";
  return `${local ? "http" : "https"}://${host}`;
}

/**
 * The link an invitation sends: the school's sign-in page, on the sign-up tab,
 * with the invited address filled in.
 */
export function inviteLink(appUrl: string, email: string): string {
  const base = appUrl.replace(/\/$/, "");
  return `${base}/login?tab=signup&email=${encodeURIComponent(email)}`;
}

/**
 * The school a connector request (someone's own Claude or ChatGPT) acts in:
 * the one whose address it came to, when the person belongs to it.
 *
 * A person in several schools has one stored "active school", which tabs open
 * on each school's address keep changing. Left to that, one conversation read
 * two schools: the profile of one and the settings of the other. The address
 * is what the person chose to connect to, so it decides. Null falls back to
 * the default, for an address that is no school's (localhost, the shared demo)
 * or a person who is not a member of this school.
 */
export async function orgForConnectorCaller(caller: {
  userEmail: string;
  origin?: string;
}): Promise<string | null> {
  let host: string;
  try {
    host = new URL(caller.origin ?? "").host;
  } catch {
    return null;
  }
  const hostOrg = await orgForHost(host);
  if (!hostOrg) return null;
  const member = await first(
    `SELECT 1 AS ok FROM org_members WHERE LOWER(email) = ? AND org_id = ? LIMIT 1`,
    [caller.userEmail.toLowerCase(), hostOrg],
  );
  return member ? hostOrg : null;
}
