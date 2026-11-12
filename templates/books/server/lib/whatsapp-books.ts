import type { IncomingMessage } from "@agent-native/core/server";
import { rows } from "./sql.js";

/** WhatsApp sends numbers as digits with the country code: 2348030000000. */
export function normaliseNumber(n: string): string {
  let d = String(n).replace(/\D/g, "");
  if (d.startsWith("0") && d.length === 11) d = `234${d.slice(1)}`;
  return d;
}

export async function isOrgMember(
  orgId: string,
  email: string,
): Promise<boolean> {
  const found = await rows(
    `SELECT id FROM org_members WHERE org_id = ? AND LOWER(email) = LOWER(?)`,
    [orgId, email],
  );
  return found.length > 0;
}

/** Which orgs list this number, and for whom. */
export async function claimsOnNumber(
  senderId: string,
): Promise<{ orgId: string; email: string }[]> {
  const number = normaliseNumber(senderId);
  const pinned = process.env.BOOKS_ORG_ID;
  const claims: { orgId: string; email: string }[] = [];
  for (const s of await rows<{ org_id: string; allowed_numbers: string }>(
    `SELECT org_id, allowed_numbers FROM books_settings`,
  )) {
    if (pinned && s.org_id !== pinned) continue;
    const map = JSON.parse(s.allowed_numbers || "{}") as Record<string, string>;
    for (const [n, email] of Object.entries(map))
      if (normaliseNumber(n) === number)
        claims.push({ orgId: s.org_id, email });
  }
  return claims;
}

/**
 * The email a number acts as. It must be listed by exactly one org, for a
 * member of that org; anything else is ignored rather than guessed.
 */
async function emailForNumber(
  senderId: string | undefined,
): Promise<string | null> {
  if (!senderId) return null;
  const claims = await claimsOnNumber(senderId);
  if (new Set(claims.map((c) => c.orgId)).size !== 1) return null;
  const { orgId, email } = claims[0];
  return (await isOrgMember(orgId, email)) ? email : null;
}

/**
 * Runs inside the webhook request, so it only reads settings. A number that
 * is not on the allow-list is dropped: nothing is queued and nobody replies.
 */
export async function beforeBooksMessage(
  incoming: IncomingMessage,
): Promise<{ handled: true } | { handled: false }> {
  return (await emailForNumber(incoming.senderId))
    ? { handled: false }
    : { handled: true };
}

export async function ownerForMessage(
  incoming: IncomingMessage,
): Promise<string> {
  const email = await emailForNumber(incoming.senderId);
  if (!email) throw new Error("Message from a number Books does not know.");
  return email;
}
