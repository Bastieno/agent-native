import { createError, defineEventHandler, getHeader, readRawBody } from "h3";
import {
  SIGNATURE_HEADERS,
  parseMoniepointEvent,
  verifyMoniepointSignature,
} from "../../../lib/moniepoint.js";
import { storeMoniepointEvent } from "../../../lib/moniepoint-store.js";
import { reconcileDays } from "../../../lib/reconcile-days.js";

/**
 * Moniepoint POS webhook. No session: the signature is the only gate.
 * One Books deployment serves one business, named by MONIEPOINT_ORG_ID.
 */
export default defineEventHandler(async (event) => {
  const secret = process.env.MONIEPOINT_WEBHOOK_SECRET;
  const orgId = process.env.MONIEPOINT_ORG_ID;
  if (!secret || !orgId)
    throw createError({ statusCode: 503, statusMessage: "Not configured" });
  const raw = (await readRawBody(event, "utf8")) ?? "";
  const headers = {
    id: getHeader(event, SIGNATURE_HEADERS.id) ?? "",
    timestamp: getHeader(event, SIGNATURE_HEADERS.timestamp) ?? "",
    signature: getHeader(event, SIGNATURE_HEADERS.signature) ?? "",
  };
  if (!verifyMoniepointSignature(raw, headers, secret)) {
    throw createError({ statusCode: 401, statusMessage: "Bad signature" });
  }
  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return { ok: true, ignored: "not json" };
  }
  const parsed = parseMoniepointEvent(body);
  if (!parsed) return { ok: true, ignored: "not a completed payment" };
  const { stored, day } = await storeMoniepointEvent(orgId, {
    ...parsed,
    webhookId: headers.id,
    payload: raw,
  });
  if (stored) await reconcileDays(orgId, [day]);
  return { ok: true, stored };
});
