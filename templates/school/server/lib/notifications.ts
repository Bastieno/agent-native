/**
 * Telling people things.
 *
 * `notify` adds a notification for each recipient and skips any they already
 * have for the same thing (`dedupeKey`), so a job that runs twice, or an
 * announcement published again, never doubles up. Reading and marking them
 * is by person, always the signed-in one.
 *
 * Nothing here sends email or push. Those are delivered from these rows, so
 * the feed in the app is the one record of what a person was told.
 */
import { and, desc, eq, inArray, isNull, sql } from "drizzle-orm";
import { nanoid } from "nanoid";
import { getDb, schema } from "../db/index.js";
import { pushToUsers } from "./push.js";

export interface NewNotification {
  kind: string;
  title: string;
  body?: string;
  link?: string | null;
  /** The same key for the same person is only ever stored once. */
  dedupeKey: string;
}

export interface Recipient {
  userId: string;
  schoolId: string;
}

/** The longest body kept: enough to read an announcement, not a whole page. */
const BODY_MAX = 600;

export async function notify(
  recipients: Recipient[],
  n: NewNotification,
): Promise<number> {
  const unique = [
    ...new Map(recipients.map((r) => [r.userId, r] as const)).values(),
  ];
  if (unique.length === 0) return 0;
  const db = getDb();
  const createdAt = new Date().toISOString();
  const body = (n.body ?? "").slice(0, BODY_MAX);
  let added = 0;
  const newlyTold: string[] = [];
  // In slices: a whole school at once is a long statement.
  for (let i = 0; i < unique.length; i += 100) {
    const slice = unique.slice(i, i + 100);
    const rows = slice.map((r) => ({
      id: nanoid(),
      userId: r.userId,
      schoolId: r.schoolId,
      kind: n.kind,
      title: n.title,
      body,
      link: n.link ?? null,
      dedupeKey: n.dedupeKey,
      createdAt,
    }));
    const result: any = await db
      .insert(schema.notifications)
      .values(rows)
      .onConflictDoNothing()
      .returning({
        id: schema.notifications.id,
        userId: schema.notifications.userId,
      });
    const inserted = Array.isArray(result) ? result : [];
    added += inserted.length;
    newlyTold.push(...inserted.map((r: any) => r.userId));
  }
  // Only those who did not already have it, and never at the cost of the
  // notification itself: a push that fails leaves the feed untouched.
  try {
    await pushToUsers(newlyTold, {
      title: n.title,
      body: n.body,
      url: n.link ?? "/",
      tag: n.dedupeKey,
    });
  } catch (err) {
    console.error("[notify] push failed:", err);
  }
  return added;
}

/** A person's own notifications, newest first, with how many are unread. */
export async function listFor(userId: string, limit = 50) {
  const db = getDb();
  const items = await db
    .select({
      id: schema.notifications.id,
      kind: schema.notifications.kind,
      title: schema.notifications.title,
      body: schema.notifications.body,
      link: schema.notifications.link,
      createdAt: schema.notifications.createdAt,
      readAt: schema.notifications.readAt,
    })
    .from(schema.notifications)
    .where(eq(schema.notifications.userId, userId))
    .orderBy(desc(schema.notifications.createdAt))
    .limit(limit);
  const [{ n }] = (await db
    .select({ n: sql<number>`count(*)` })
    .from(schema.notifications)
    .where(
      and(
        eq(schema.notifications.userId, userId),
        isNull(schema.notifications.readAt),
      ),
    )) as { n: number }[];
  return { items, unread: Number(n) };
}

/** Mark some, or all, of a person's own notifications read. */
export async function markRead(userId: string, ids?: string[]) {
  const db = getDb();
  const readAt = new Date().toISOString();
  await db
    .update(schema.notifications)
    .set({ readAt })
    .where(
      and(
        eq(schema.notifications.userId, userId),
        isNull(schema.notifications.readAt),
        ids?.length ? inArray(schema.notifications.id, ids) : undefined,
      ),
    );
}

/** Everyone in a school with one of these roles. */
export async function peopleOfSchool(
  schoolId: string,
  roles: string[],
): Promise<Recipient[]> {
  const rows = await getDb()
    .select({ userId: schema.schoolProfiles.userId })
    .from(schema.schoolProfiles)
    .where(
      and(
        eq(schema.schoolProfiles.schoolId, schoolId),
        eq(schema.schoolProfiles.status, "active"),
        inArray(schema.schoolProfiles.schoolRole, roles),
      ),
    );
  return rows.map((r: any) => ({ userId: r.userId, schoolId }));
}

/** The learners enrolled in a class, and the teacher who has it. */
export async function peopleOfClass(
  schoolId: string,
  classId: string,
): Promise<Recipient[]> {
  const db = getDb();
  const learners = await db
    .select({ userId: schema.classEnrollments.studentUserId })
    .from(schema.classEnrollments)
    .where(
      and(
        eq(schema.classEnrollments.classId, classId),
        eq(schema.classEnrollments.status, "active"),
      ),
    );
  return learners.map((r: any) => ({ userId: r.userId, schoolId }));
}
