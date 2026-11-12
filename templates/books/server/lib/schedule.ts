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

/** How far back a digest that never went out is still sent. */
const LOOKBACK = { daily: 3, weekly: 2, monthly: 1 } as const;

/** Periods that have ended by `now`, most recent first, within the lookback. */
function recentPeriods(now: Date): Omit<DueDigest, "waitingForExport">[] {
  const out: Omit<DueDigest, "waitingForExport">[] = [];
  for (let i = 0; i < LOOKBACK.daily; i++) {
    const { start, end } = periodBounds(
      "daily",
      new Date(now.getTime() - i * 86_400_000),
    );
    out.push({ period: "daily", start, end });
  }
  for (let i = 0; i < LOOKBACK.weekly; i++) {
    const { start, end } = periodBounds(
      "weekly",
      new Date(now.getTime() - i * 7 * 86_400_000),
    );
    out.push({ period: "weekly", start, end });
  }
  out.push({ period: "monthly", ...periodBounds("monthly", now) });
  return out;
}

/**
 * Which digests are due at `now` (Lagos time) and not yet sent, being sent or
 * attempted. A file that arrives late still gets its digest, within the lookback.
 */
export async function dueDigests(
  orgId: string,
  now: Date,
): Promise<DueDigest[]> {
  if (lagosHour(now) < DIGEST_HOUR) return [];
  const due: DueDigest[] = [];
  const seen = new Set<string>();
  for (const { period, start, end } of recentPeriods(now)) {
    const key = `${period}:${start}`;
    if (seen.has(key)) continue;
    seen.add(key);
    const done = await rows(
      `SELECT id FROM digests WHERE org_id = ? AND period = ? AND start_day = ? AND end_day = ? AND status IN ('sent', 'sending', 'failed')`,
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
  // Older digests still waiting for their file are dropped, not chased: only yesterday is reminded.
  const yesterday = periodBounds("daily", now).end;
  return due.filter((d) => !d.waitingForExport || d.end === yesterday);
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

export async function remindOnce(
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
