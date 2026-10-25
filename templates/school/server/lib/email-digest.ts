/**
 * One email a day with what a person has not yet seen in the app.
 *
 * Email is the scarce channel: the sending provider caps a day's mail, and an
 * invitation or a password reset must still get through. So a digest goes out
 * only when all of these hold:
 *
 *   - the school has turned digests on (`school-config.emailDigests`);
 *   - the person opted in (`notification_prefs.email_digest = 'daily'`);
 *   - they have something unread, not yet emailed, from the last 36 hours;
 *   - they have a real address (an ID account's made-up one never receives);
 *   - the day's cap has not been reached (`DIGEST_MAX_PER_RUN`, 60 by default,
 *     which leaves most of a 100-a-day limit for invitations and resets).
 *
 * What is not sent because of the cap stays unemailed, and is still in the app.
 */
import { and, eq, inArray, isNull, gt } from "drizzle-orm";
import { sql } from "drizzle-orm";
import {
  emailStrong,
  fromWithName,
  isEmailConfigured,
  renderEmail,
  sendEmail,
} from "@agent-native/core/server";
import { getOrgSetting } from "@agent-native/core/settings";
import { getDb, schema } from "../db/index.js";
import { rowsOf } from "./raw-sql.js";
import { schoolAppUrl } from "./school-host.js";
import { isMadeUpEmail } from "./student-login.js";

const HOURS_36 = 36 * 60 * 60 * 1000;

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function digestCap(): number {
  const n = Number(process.env.DIGEST_MAX_PER_RUN);
  return Number.isFinite(n) && n >= 0 ? Math.floor(n) : 60;
}

export async function sendDailyDigests(now = new Date()) {
  const result = { sent: 0, skippedForCap: 0, schools: 0 };
  if (!isEmailConfigured()) return result;
  const db = getDb();
  let budget = digestCap();

  const optedIn = await db
    .select({
      userId: schema.notificationPrefs.userId,
      schoolId: schema.notificationPrefs.schoolId,
    })
    .from(schema.notificationPrefs)
    .where(eq(schema.notificationPrefs.emailDigest, "daily"));
  const bySchool = new Map<string, string[]>();
  for (const p of optedIn as any[]) {
    bySchool.set(p.schoolId, [...(bySchool.get(p.schoolId) ?? []), p.userId]);
  }

  const since = new Date(now.getTime() - HOURS_36).toISOString();
  for (const [schoolId, userIds] of bySchool) {
    const config = (await getOrgSetting(schoolId, "school-config")) as {
      name?: string;
      emailDigests?: boolean;
      replyToEmail?: string | null;
    } | null;
    if (!config?.emailDigests) continue;
    result.schools++;

    const unread = await db
      .select()
      .from(schema.notifications)
      .where(
        and(
          inArray(schema.notifications.userId, userIds),
          isNull(schema.notifications.readAt),
          isNull(schema.notifications.emailedAt),
          gt(schema.notifications.createdAt, since),
        ),
      );
    if (unread.length === 0) continue;

    const byUser = new Map<string, any[]>();
    for (const n of unread as any[]) {
      byUser.set(n.userId, [...(byUser.get(n.userId) ?? []), n]);
    }
    const addresses = await rowsOf<{ id: string; email: string }>(
      sql`SELECT id, email FROM "user" WHERE id IN (${sql.join(
        [...byUser.keys()].map((id) => sql`${id}`),
        sql`, `,
      )})`,
    );
    const emailOf = new Map(addresses.map((a) => [a.id, a.email]));
    const schoolName = config.name?.trim() || "your school";
    const link = `${await schoolAppUrl(schoolId, "")}/`;

    for (const [userId, items] of byUser) {
      const to = emailOf.get(userId);
      if (!to || isMadeUpEmail(to)) continue;
      if (budget <= 0) {
        result.skippedForCap++;
        continue;
      }
      const lines = items
        .slice(0, 8)
        .map(
          (n) =>
            `${emailStrong(n.title)}${
              n.body ? `<br />${esc(String(n.body).slice(0, 200))}` : ""
            }`,
        );
      if (items.length > 8) lines.push(`${items.length - 8} more in the app.`);
      const { html, text } = renderEmail({
        preheader: `${items.length} new at ${schoolName}`,
        heading: `New at ${schoolName}`,
        paragraphs: lines,
        cta: link.length > 1 ? { label: "Open the app", url: link } : undefined,
        footer:
          "You get this because you chose a daily email. Turn it off any time under Notifications in the app.",
      });
      try {
        await sendEmail({
          to,
          subject: `${items.length} new at ${schoolName}`,
          html,
          text,
          from: fromWithName(schoolName),
          replyTo: config.replyToEmail || undefined,
        });
      } catch (err) {
        console.error("[digest] send failed:", err);
        continue;
      }
      budget--;
      result.sent++;
      await db
        .update(schema.notifications)
        .set({ emailedAt: now.toISOString() })
        .where(
          inArray(
            schema.notifications.id,
            items.map((n) => n.id),
          ),
        );
    }
  }
  return result;
}
