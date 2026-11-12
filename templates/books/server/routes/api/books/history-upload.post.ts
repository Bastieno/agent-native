import { createError, defineEventHandler, readRawBody } from "h3";
import { assertOwner } from "../../../lib/access.js";
import { queueChatExport } from "../../../lib/history.js";
import { withRequestAccess } from "../../../lib/route-access.js";

/** A WhatsApp chat export zip, posted as the raw request body (too large for an action). */
export default defineEventHandler(async (event) => {
  return withRequestAccess(event, async (orgId) => {
    await assertOwner();
    const body = await readRawBody(event, false);
    if (!body || !body.length)
      throw createError({ statusCode: 400, statusMessage: "No file" });
    if (body.length > 200 * 1024 * 1024)
      throw createError({ statusCode: 413, statusMessage: "Over 200 MB" });
    return queueChatExport(orgId, new Uint8Array(body));
  });
});
