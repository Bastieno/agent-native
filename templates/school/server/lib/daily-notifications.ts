/**
 * What the daily job tells people.
 *
 * - Learners: work due in the next two days that they have not handed in.
 * - Teachers: how many hand-ins are waiting for their marks.
 *
 * Every notification carries a key, so running the job twice in a day adds
 * nothing. Delivery (email digest, push) is a separate step that reads these.
 */
import { and, eq, inArray, ne } from "drizzle-orm";
import { getDb, schema } from "../db/index.js";
import { sendDailyDigests } from "./email-digest.js";
import { notify, type Recipient } from "./notifications.js";

const DAY_MS = 24 * 60 * 60 * 1000;

/** The school each person belongs to, by their profile. */
async function schoolsOf(userIds: string[]): Promise<Map<string, string>> {
  if (userIds.length === 0) return new Map();
  const rows = await getDb()
    .select({
      userId: schema.schoolProfiles.userId,
      schoolId: schema.schoolProfiles.schoolId,
    })
    .from(schema.schoolProfiles)
    .where(inArray(schema.schoolProfiles.userId, userIds));
  return new Map(rows.map((r: any) => [r.userId, r.schoolId]));
}

/** A due date as a moment: a bare date means the end of that day. */
export function dueMoment(due: string): number {
  const iso = /^\d{4}-\d{2}-\d{2}$/.test(due) ? `${due}T23:59:59` : due;
  return Date.parse(iso);
}

export async function notifyDueSoon(now: Date): Promise<number> {
  const db = getDb();
  const from = now.getTime();
  const to = from + 2 * DAY_MS;

  const open = await db
    .select({
      id: schema.assessments.id,
      title: schema.assessments.title,
      classId: schema.assessments.classId,
      dueDate: schema.assessments.dueDate,
    })
    .from(schema.assessments)
    .where(
      and(
        eq(schema.assessments.status, "published"),
        ne(schema.assessments.responseMode, "none"),
      ),
    );
  const due = open.filter((a: any) => {
    if (!a.dueDate) return false;
    const at = dueMoment(a.dueDate);
    return Number.isFinite(at) && at >= from && at <= to;
  });
  if (due.length === 0) return 0;

  let added = 0;
  for (const a of due as any[]) {
    const enrolled = await db
      .select({ userId: schema.classEnrollments.studentUserId })
      .from(schema.classEnrollments)
      .where(
        and(
          eq(schema.classEnrollments.classId, a.classId),
          eq(schema.classEnrollments.status, "active"),
        ),
      );
    if (enrolled.length === 0) continue;
    const records = await db
      .select({ id: schema.students.id, userId: schema.students.userId })
      .from(schema.students)
      .where(
        inArray(
          schema.students.userId,
          enrolled.map((e: any) => e.userId),
        ),
      );
    const handedIn = new Set(
      (
        await db
          .select({ studentId: schema.submissions.studentId })
          .from(schema.submissions)
          .where(
            and(
              eq(schema.submissions.assessmentId, a.id),
              inArray(schema.submissions.status, ["submitted", "graded"]),
            ),
          )
      ).map((r: any) => r.studentId),
    );
    const schools = await schoolsOf(records.map((r: any) => r.userId));
    const waiting: Recipient[] = records
      .filter((r: any) => !handedIn.has(r.id) && schools.has(r.userId))
      .map((r: any) => ({
        userId: r.userId,
        schoolId: schools.get(r.userId)!,
      }));
    added += await notify(waiting, {
      kind: "due-soon",
      title: `Due soon: ${a.title}`,
      body: `Due ${a.dueDate}. Open it from your class to hand it in.`,
      link: `/student/classes/${a.classId}`,
      dedupeKey: `due:${a.id}`,
    });
  }
  return added;
}

export async function notifyToMark(now: Date): Promise<number> {
  const db = getDb();
  const day = now.toISOString().slice(0, 10);
  const classes = await db
    .select({
      id: schema.classes.id,
      teacher: schema.classes.primaryTeacherUserId,
    })
    .from(schema.classes);
  const byTeacher = new Map<string, { ids: string[] }>();
  for (const c of classes as any[]) {
    if (!c.teacher) continue;
    const t = byTeacher.get(c.teacher) ?? { ids: [] };
    t.ids.push(c.id);
    byTeacher.set(c.teacher, t);
  }

  const schools = await schoolsOf([...byTeacher.keys()]);
  let added = 0;
  for (const [teacher, { ids }] of byTeacher) {
    const schoolId = schools.get(teacher);
    if (!schoolId) continue;
    const papers = await db
      .select({ id: schema.assessments.id })
      .from(schema.assessments)
      .where(inArray(schema.assessments.classId, ids));
    if (papers.length === 0) continue;
    const paperIds = papers.map((p: any) => p.id);
    const submitted = await db
      .select({ id: schema.submissions.id })
      .from(schema.submissions)
      .where(
        and(
          inArray(schema.submissions.assessmentId, paperIds),
          eq(schema.submissions.status, "submitted"),
        ),
      );
    if (submitted.length === 0) continue;
    const graded = new Set(
      (
        await db
          .select({ submissionId: schema.grades.submissionId })
          .from(schema.grades)
          .where(
            inArray(
              schema.grades.submissionId,
              submitted.map((s: any) => s.id),
            ),
          )
      ).map((g: any) => g.submissionId),
    );
    const n = submitted.filter((s: any) => !graded.has(s.id)).length;
    if (n === 0) continue;
    added += await notify([{ userId: teacher, schoolId }], {
      kind: "to-mark",
      title: `${n} hand-in${n === 1 ? "" : "s"} waiting for your marks`,
      body: "Open My Classes, then the paper, to mark them.",
      link: "/teacher/classes",
      dedupeKey: `to-mark:${teacher}:${day}`,
    });
  }
  return added;
}

export async function runDailyNotifications(now = new Date()) {
  const dueSoon = await notifyDueSoon(now);
  const toMark = await notifyToMark(now);
  // After the notifications above, so today's are in the digest.
  const digests = await sendDailyDigests(now);
  return { dueSoon, toMark, digests };
}
