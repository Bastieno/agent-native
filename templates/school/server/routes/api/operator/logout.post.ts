import { defineEventHandler } from "h3";
import { requireOperatorHost } from "../../../lib/operator/access.js";
import { clearSession } from "../../../lib/operator/session.js";

export default defineEventHandler(async (event) => {
  await requireOperatorHost(event);
  clearSession(event);
  return { ok: true };
});
