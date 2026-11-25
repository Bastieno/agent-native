import { rows } from "./sql.js";

/**
 * Payee names as read off a slip, tidied: banks print "NAME | ACCOUNT" and
 * text recognition misreads letters ("Kilchen"), so the same shop turns up
 * under several names. The owner's confirmed spelling wins.
 */

/** "Name | 9000000001", "NAME 1234567A8B" or "Name | 9000*****01" → "Name". */
export function stripAccount(name: string): string {
  return (
    name
      // "| 9000000001", including the stray brackets text recognition adds.
      .replace(/\s*[|[\]]+\s*[\w*]{6,}\s*$/, "")
      .replace(/\s+(?=[\w]*\d[\w]*)(?=(?:[^\d\s]*\d){6})[\w]{8,11}\s*$/, "")
      // What is left dangling: "ACORN TRADING - |".
      .replace(/[\s|[\]-]+$/, "")
      .trim()
  );
}

/** What two spellings of one payee share: letters only, without a trailing "1". */
function key(name: string): string {
  return stripAccount(name)
    .toLowerCase()
    .replace(/\s+\d{1,2}$/, "")
    .replace(/[^a-z]+/g, " ")
    .trim();
}

function similarity(a: string, b: string): number {
  if (a === b) return 1;
  const d: number[][] = Array.from({ length: a.length + 1 }, (_, i) => [i]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++)
      d[i][j] = Math.min(
        d[i - 1][j] + 1,
        d[i][j - 1] + 1,
        d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1),
      );
  return 1 - d[a.length][b.length] / Math.max(a.length, b.length);
}

export interface KnownPayee {
  name: string;
  uses: number;
}

/**
 * The payee to record: a confirmed payee it is clearly the same as (one or two
 * misread letters, any case, a stray branch digit), else its own name without
 * the account. Short names must match exactly: "Tunde Bakare" is not
 * "Tunde Bello".
 */
export function tidyPayee(
  name: string | null,
  known: KnownPayee[],
): string | null {
  if (!name) return name;
  const own = stripAccount(name) || name.trim();
  const k = key(own);
  if (k.length < 4) return own;
  const min = k.length >= 15 ? 0.9 : 1;
  let best: KnownPayee | null = null;
  for (const p of known) {
    if (similarity(k, key(p.name)) < min) continue;
    if (!best || p.uses > best.uses) best = p;
  }
  return best ? stripAccount(best.name) || best.name : own;
}

/** Confirmed payees and how often each spelling was used. */
export async function knownPayees(orgId: string): Promise<KnownPayee[]> {
  const found = await rows<{ vendor: string; n: number | string }>(
    `SELECT vendor, COUNT(*) AS n FROM expenses WHERE org_id = ? AND status = 'confirmed' GROUP BY vendor`,
    [orgId],
  );
  return found.map((r) => ({ name: r.vendor, uses: Number(r.n) }));
}
