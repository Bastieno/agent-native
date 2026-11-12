import type { IncomingMessage } from "@agent-native/core/server";
import { rows } from "./sql.js";

/** WhatsApp sends numbers as digits with the country code: 2348030000000. */
export function normaliseNumber(n: string): string {
  let d = String(n).replace(/\D/g, "");
  if (d.startsWith("0") && d.length === 11) d = `234${d.slice(1)}`;
  return d;
}

/** The email an allowed number acts as, across every org's Books settings. */
async function emailForNumber(
  senderId: string | undefined,
): Promise<string | null> {
  if (!senderId) return null;
  const number = normaliseNumber(senderId);
  for (const s of await rows<{ allowed_numbers: string }>(
    `SELECT allowed_numbers FROM books_settings`,
  )) {
    const map = JSON.parse(s.allowed_numbers || "{}") as Record<string, string>;
    for (const [n, email] of Object.entries(map))
      if (normaliseNumber(n) === number) return email;
  }
  return null;
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
