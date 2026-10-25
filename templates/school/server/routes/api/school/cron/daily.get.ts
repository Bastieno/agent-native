import { createError, defineEventHandler, getHeader } from "h3";
import { timingSafeEqual } from "node:crypto";
import { runDailyNotifications } from "../../../../lib/daily-notifications.js";

/**
 * The once-a-day job, called by the host's scheduler (Vercel cron sends
 * `Authorization: Bearer $CRON_SECRET`). It carries no session, so the secret
 * is the only gate; without one set, it refuses to run at all.
 */
export default defineEventHandler(async (event) => {
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    throw createError({ statusCode: 503, statusMessage: "Not configured" });
  }
  const given = getHeader(event, "authorization") ?? "";
  const want = `Bearer ${secret}`;
  const a = Buffer.from(given);
  const b = Buffer.from(want);
  if (a.length !== b.length || !timingSafeEqual(a, b)) {
    throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
  }
  return { ok: true, ...(await runDailyNotifications()) };
});
