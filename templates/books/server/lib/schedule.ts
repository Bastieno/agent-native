import { timingSafeEqual } from "node:crypto";
import { resourcePut } from "@agent-native/core/resources";
import {
  buildDigest,
  recipients,
  appUrl,
  salesFileCovers,
  sendDigest,
} from "./digests.js";
import type { DigestPeriod } from "./digest-figures.js";
import { lagosDay, periodBounds } from "./lagos-time.js";
import { rows, run } from "./sql.js";
import { sendWhatsAppTemplate } from "./whatsapp-send.js";

/** Digests go out from 08:00 Lagos time. */
export const DIGEST_HOUR = 8;

const lagosHour = (now: Date) =>
  new Date(now.getTime() + 3_600_000).getUTCHours();

export interface DueDigest {
  period: Exclude<DigestPeriod, "range">;
  start: string;
  end: string;
  /** The sales file covering the last day hasn't arrived yet. */
  waitingForExport: boolean;
}

/** Which digests are due at `now` (Lagos time) and not yet sent or attempted. */
export async function dueDigests(
  orgId: string,
  now: Date,
): Promise<DueDigest[]> {
  if (lagosHour(now) < DIGEST_HOUR) return [];
  const today = lagosDay(now);
  const weekday = (new Date(`${today}T00:00:00Z`).getUTCDay() + 6) % 7;
  const periods: DueDigest["period"][] = ["daily"];
  if (weekday === 0) periods.push("weekly");
  if (today.endsWith("-01")) periods.push("monthly");
  const due: DueDigest[] = [];
  for (const period of periods) {
    const { start, end } = periodBounds(period, now);
    const done = await rows(
      `SELECT id FROM digests WHERE org_id = ? AND period = ? AND start_day = ? AND end_day = ? AND status IN ('sent', 'failed')`,
      [orgId, period, start, end],
    );
    if (done.length) continue;
    due.push({
      period,
      start,
      end,
      waitingForExport: !(await salesFileCovers(orgId, end)),
    });
  }
  return due;
}

export const reminderText = (day: string) =>
  `No sales file for ${day} yet. Send it to this number and I'll send the report.`;

/** Ask for the missing sales file, through the digest template (it works outside WhatsApp's 24-hour window). */
export async function sendReminder(orgId: string, day: string): Promise<void> {
  const people = await recipients(orgId);
  const owners = people.filter(
    (p) => p.whatsapp && (p as { role?: string }).role !== "partner",
  );
  for (const p of owners)
    await sendWhatsAppTemplate(p.whatsapp!, "books_digest", [
      reminderText(day),
      appUrl(),
    ]);
}

async function remindOnce(
  orgId: string,
  day: string,
  remind: (orgId: string, day: string) => Promise<void>,
) {
  const [s] = await rows(
    `SELECT reminders FROM books_settings WHERE org_id = ?`,
    [orgId],
  );
  const done = JSON.parse(s?.reminders || "{}") as Record<string, string>;
  if (done[day]) return false;
  await remind(orgId, day);
  done[day] = new Date().toISOString();
  await run(`UPDATE books_settings SET reminders = ? WHERE org_id = ?`, [
    JSON.stringify(done),
    orgId,
  ]);
  return true;
}

export interface TickDeps {
  send: (orgId: string, digestId: string) => Promise<{ status: string }>;
  remind: (orgId: string, day: string) => Promise<void>;
}
const defaultDeps: TickDeps = { send: sendDigest, remind: sendReminder };

/**
 * Send whatever is due without commentary: the safety net behind the agent's
 * hourly job, and the whole schedule on hosts where that job can't run.
 */
export async function digestTick(
  orgId: string,
  now: Date,
  deps: TickDeps = defaultDeps,
) {
  const sent: string[] = [];
  const reminded: string[] = [];
  for (const d of await dueDigests(orgId, now)) {
    if (d.waitingForExport) {
      if (d.period === "daily" && (await remindOnce(orgId, d.end, deps.remind)))
        reminded.push(d.end);
      continue;
    }
    const { digestId } = await buildDigest(orgId, d.period, d.start, d.end);
    await deps.send(orgId, digestId);
    sent.push(digestId);
  }
  return { sent, reminded };
}

export function cronAuthorised(header: string | undefined): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret || !header) return false;
  const a = Buffer.from(header);
  const b = Buffer.from(`Bearer ${secret}`);
  return a.length === b.length && timingSafeEqual(a, b);
}

export const DIGEST_JOB_PATH = "jobs/books-digests.md";

export function digestJobContent(owner: string, orgId: string): string {
  return `---
schedule: "0 * * * *"
enabled: true
createdBy: ${owner}
orgId: ${orgId}
runAs: creator
---

Send Books' digests that are due.

1. Call \`due-digests\`. If it returns nothing, stop.
2. For each due digest that is waiting for a sales file and is daily, call \`send-reminder\` with its day, then move on.
3. For each other due digest, call \`build-digest\` with its period, start and end.
4. Read the figures. Write 3–6 plain sentences on what changed and what to look at, then "Going well" and "To watch" lists taken only from \`figures.trends\` (leave a list out if it is empty). Quote only figures from the result, in naira with commas. Never name customers, senders or staff.
5. Call \`save-digest-commentary\`, then \`send-digest\`.
`;
}

/** Install (or refresh) the owner's hourly digest job. */
export async function installDigestJob(
  owner: string,
  orgId: string,
): Promise<void> {
  await resourcePut(owner, DIGEST_JOB_PATH, digestJobContent(owner, orgId));
}
