import { createError, defineEventHandler, getHeader, readRawBody } from "h3";
import { createHmac, timingSafeEqual } from "node:crypto";
import { getDbExec } from "@agent-native/core/db";

/**
 * Cal.com tells us when a call is booked from the landing page, moved or
 * cancelled. Each one becomes or updates a row in `pilot_bookings`. Cal.com
 * emails both sides itself; this only keeps the list.
 *
 * No session: the shared secret is the only gate. Cal.com signs the raw body
 * with it (`x-cal-signature-256`, HMAC-SHA256, hex). Without a secret set the
 * route refuses everything.
 */

const STATUS: Record<string, string> = {
  BOOKING_CREATED: "booked",
  BOOKING_REQUESTED: "booked",
  BOOKING_RESCHEDULED: "booked",
  BOOKING_CANCELLED: "cancelled",
  BOOKING_REJECTED: "cancelled",
};

function signatureMatches(body: string, given: string, secret: string) {
  const want = createHmac("sha256", secret).update(body).digest("hex");
  const a = Buffer.from(given);
  const b = Buffer.from(want);
  return a.length === b.length && timingSafeEqual(a, b);
}

/** Cal.com answers: { field: { label, value } } or { field: value }. */
function responsesOf(raw: unknown): Record<string, unknown> {
  if (!raw || typeof raw !== "object") return {};
  const out: Record<string, unknown> = {};
  for (const [key, v] of Object.entries(raw as Record<string, unknown>)) {
    out[key] =
      v && typeof v === "object" && "value" in (v as object)
        ? (v as { value: unknown }).value
        : v;
  }
  return out;
}

export default defineEventHandler(async (event) => {
  const secret = process.env.CAL_WEBHOOK_SECRET;
  if (!secret) {
    throw createError({ statusCode: 503, statusMessage: "Not configured" });
  }
  const body = (await readRawBody(event, "utf8")) ?? "";
  const given = getHeader(event, "x-cal-signature-256") ?? "";
  if (!given || !signatureMatches(body, given, secret)) {
    throw createError({ statusCode: 401, statusMessage: "Bad signature" });
  }

  let message: any;
  try {
    message = JSON.parse(body);
  } catch {
    throw createError({ statusCode: 400, statusMessage: "Not JSON" });
  }
  const status = STATUS[String(message?.triggerEvent ?? "")];
  const p = message?.payload ?? {};
  // A test ping, or an event we do not keep.
  if (!status || !p.uid) return { ok: true, kept: false };

  const attendee = Array.isArray(p.attendees) ? (p.attendees[0] ?? {}) : {};
  const responses = responsesOf(p.responses);
  const edition = p.metadata?.edition ?? null;
  const from: string | null = p.rescheduleUid ?? p.fromReschedule ?? null;
  const now = new Date().toISOString();
  const exec = getDbExec();

  await exec.execute({
    sql: `INSERT INTO pilot_bookings (id, status, name, email, time_zone, start_time, end_time, responses_json, edition, rescheduled_from, created_at, updated_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          ON CONFLICT (id) DO UPDATE SET status = excluded.status, name = excluded.name, email = excluded.email, time_zone = excluded.time_zone, start_time = excluded.start_time, end_time = excluded.end_time, responses_json = excluded.responses_json, edition = COALESCE(excluded.edition, pilot_bookings.edition), rescheduled_from = COALESCE(excluded.rescheduled_from, pilot_bookings.rescheduled_from), updated_at = excluded.updated_at`,
    args: [
      String(p.uid),
      status,
      String(attendee.name ?? responses.name ?? "") || null,
      String(attendee.email ?? responses.email ?? "") || null,
      attendee.timeZone ? String(attendee.timeZone) : null,
      p.startTime ? String(p.startTime) : null,
      p.endTime ? String(p.endTime) : null,
      JSON.stringify(responses),
      edition === "ng" || edition === "us" ? edition : null,
      from && from !== p.uid ? String(from) : null,
      now,
      now,
    ],
  });
  // The booking it replaced is no longer happening at its old time.
  if (from && from !== p.uid) {
    await exec.execute({
      sql: `UPDATE pilot_bookings SET status = 'rescheduled', updated_at = ? WHERE id = ?`,
      args: [now, String(from)],
    });
  }
  return { ok: true, kept: true };
});
