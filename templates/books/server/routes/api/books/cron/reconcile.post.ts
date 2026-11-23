import { createError, defineEventHandler, getHeader, readBody } from "h3";
import { daysBetween } from "../../../../lib/lagos-time.js";
import { reconcileDays } from "../../../../lib/reconcile-days.js";
import { cronAuthorised } from "../../../../lib/schedule.js";
import { rows } from "../../../../lib/sql.js";

/**
 * Recalculates every day from `start` to `end` for every org, on the server
 * itself. For after a bulk data fix (ops scripts run with --no-reconcile).
 * No session: the cron secret is the only gate, as for the hourly tick.
 */
export default defineEventHandler(async (event) => {
  if (!process.env.CRON_SECRET)
    throw createError({ statusCode: 503, statusMessage: "Not configured" });
  if (!cronAuthorised(getHeader(event, "authorization")))
    throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
  const body = (await readBody(event).catch(() => null)) as {
    start?: string;
    end?: string;
  } | null;
  const day = /^\d{4}-\d{2}-\d{2}$/;
  if (
    !body?.start ||
    !body?.end ||
    !day.test(body.start) ||
    !day.test(body.end)
  )
    throw createError({
      statusCode: 400,
      statusMessage: "start and end, YYYY-MM-DD",
    });
  const days = daysBetween(body.start, body.end);
  if (days.length > 800)
    throw createError({ statusCode: 400, statusMessage: "At most 800 days" });
  const orgs = await rows<{ org_id: string }>(
    `SELECT org_id FROM books_settings`,
  );
  for (const { org_id } of orgs) await reconcileDays(org_id, days);
  return { ok: true, orgs: orgs.length, days: days.length };
});
