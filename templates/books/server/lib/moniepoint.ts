import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Moniepoint POS webhooks. Per Moniepoint's developer docs: headers
 * moniepoint-webhook-id / -timestamp / -signature, where the signature is
 * Base64 HMAC-SHA256 of `${id}__${timestamp}__${rawBody}` with the
 * subscription's secret. Amounts are in kobo.
 */

export const SIGNATURE_HEADERS = {
  id: "moniepoint-webhook-id",
  timestamp: "moniepoint-webhook-timestamp",
  signature: "moniepoint-webhook-signature",
} as const;

export function verifyMoniepointSignature(
  rawBody: string,
  headers: { id: string; timestamp: string; signature: string },
  secret: string,
): boolean {
  if (!headers.id || !headers.timestamp || !headers.signature || !secret)
    return false;
  const expected = createHmac("sha256", secret)
    .update(`${headers.id}__${headers.timestamp}__${rawBody}`)
    .digest("base64");
  const a = Buffer.from(headers.signature);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export interface MoniepointEvent {
  type: string;
  /** What the sales export records: the card RRN, or the transfer id after the last `|`. */
  reference: string | null;
  /** The full transactionReference, kept for matching if the first doesn't line up. */
  altReference: string | null;
  amount: number;
  occurredAt: string; // ISO instant
}

const DONE = new Set(["COMPLETED", "APPROVED", "SUCCESSFUL", "SUCCESS"]);

/** "2026-11-10T16:11:53.000+0100", or "2026/11/10 22:01:28" (Lagos local). */
function toInstant(time: unknown): string | null {
  if (typeof time !== "string" || !time.trim()) return null;
  let t = time.trim().replace(/\//g, "-").replace(" ", "T");
  t = t.replace(/([+-]\d{2})(\d{2})$/, "$1:$2");
  if (!/[zZ]$|[+-]\d{2}:\d{2}$/.test(t)) t += "+01:00";
  const ms = Date.parse(t);
  return Number.isNaN(ms) ? null : new Date(ms).toISOString();
}

export function parseMoniepointEvent(body: unknown): MoniepointEvent | null {
  const b = body as {
    eventType?: unknown;
    data?: Record<string, unknown>;
    createdAt?: unknown;
  };
  const d = b?.data;
  if (!d || typeof b.eventType !== "string") return null;
  if (!DONE.has(String(d.transactionStatus ?? "").toUpperCase())) return null;
  const amount = Number(d.amount);
  if (!Number.isFinite(amount)) return null;
  const txRef =
    typeof d.transactionReference === "string"
      ? d.transactionReference.trim()
      : "";
  const rrn =
    typeof d.retrievalReferenceNumber === "string"
      ? d.retrievalReferenceNumber.trim()
      : "";
  const occurredAt = toInstant(d.transactionTime) ?? toInstant(b.createdAt);
  if (!occurredAt) return null;
  return {
    type: b.eventType,
    reference: rrn || (txRef ? txRef.split("|").pop()! : null),
    altReference: rrn ? txRef || null : null,
    amount: Math.round(amount),
    occurredAt,
  };
}
