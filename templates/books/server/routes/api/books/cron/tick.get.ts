import { createError, defineEventHandler, getHeader } from "h3";
import { cronAuthorised, digestTick } from "../../../../lib/schedule.js";
import { rows } from "../../../../lib/sql.js";

/**
 * Called by the host's scheduler (Vercel cron sends `Authorization: Bearer
 * $CRON_SECRET`). No session, so the secret is the only gate. Sends due
 * digests without commentary and asks for missing sales files.
 */
export default defineEventHandler(async (event) => {
  if (!process.env.CRON_SECRET)
    throw createError({ statusCode: 503, statusMessage: "Not configured" });
  if (!cronAuthorised(getHeader(event, "authorization"))) {
    throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
  }
  const orgs = await rows<{ org_id: string }>(
    `SELECT org_id FROM books_settings`,
  );
  const results: Record<string, unknown> = {};
  for (const { org_id } of orgs) {
    try {
      results[org_id] = await digestTick(org_id, new Date());
    } catch (err) {
      results[org_id] = { error: (err as Error).message };
    }
  }
  return { ok: true, results };
});
