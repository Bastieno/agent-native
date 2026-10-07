import { and, eq, inArray } from "drizzle-orm";
import { nanoid } from "nanoid";
import { getOrgSetting } from "@agent-native/core/settings";
import { getDb, schema } from "../db/index.js";
import { missedWorkPolicy, summarise } from "../../shared/missed-work.js";

/**
 * The class's standing for the term, kept up to date by the app.
 *
 * A gradebook entry is the term's own figure for one learner in one class —
 * the thing a report card quotes and a parent asks about. Nothing computed
 * it: the only writer was `update-gradebook-entry`, which a teacher had to
 * call by hand, so after a full term of marked and published work the
 * gradebook's term column was empty and report cards computed their own
 * average instead. Two sources of truth, one of them blank.
 *
 * Recomputing when marks are published keeps the gradebook the live figure,
 * which a report card can then freeze. It counts the school's way: work
 * nobody handed in counts as a nought or is left out, as the school has
 * said.
 */
export async function recomputeGradebook(
  classId: string,
  orgId: string,
): Promise<number> {
  const db = getDb();

  const [cls] = await db
    .select({ id: schema.classes.id, termId: schema.classes.termId })
    .from(schema.classes)
    .where(and(eq(schema.classes.id, classId), eq(schema.classes.orgId, orgId)))
    .limit(1);
  if (!cls?.termId) return 0;

  const published = await db
    .select({ id: schema.assessments.id })
    .from(schema.assessments)
    .where(
      and(
        eq(schema.assessments.classId, classId),
        eq(schema.assessments.status, "published"),
      ),
    );
  if (published.length === 0) return 0;
  const assessmentIds = published.map((a: any) => a.id);

  const grades = await db
    .select({
      studentId: schema.grades.studentId,
      percentage: schema.grades.percentage,
    })
    .from(schema.grades)
    .where(
      and(
        inArray(schema.grades.assessmentId, assessmentIds),
        eq(schema.grades.isPublished, true),
      ),
    );

  const enrolled = await db
    .select({ studentUserId: schema.classEnrollments.studentUserId })
    .from(schema.classEnrollments)
    .where(
      and(
        eq(schema.classEnrollments.classId, classId),
        eq(schema.classEnrollments.status, "active"),
      ),
    );
  const students = enrolled.length
    ? await db
        .select({ id: schema.students.id, userId: schema.students.userId })
        .from(schema.students)
        .where(
          inArray(
            schema.students.userId,
            enrolled.map((e: any) => e.studentUserId),
          ),
        )
    : [];

  const config = ((await getOrgSetting(orgId, "school-config")) ?? {}) as any;
  const policy = missedWorkPolicy(config);
  const levels: any[] = config?.gradingScale?.levels ?? [];
  const letterFor = (percentage: number) =>
    levels.find((l) => percentage >= l.min && percentage <= l.max)?.grade ??
    null;

  const now = new Date().toISOString();
  let written = 0;

  for (const student of students) {
    const scores = grades
      .filter((g: any) => g.studentId === student.id)
      .map((g: any) => parseFloat(g.percentage ?? "0"));
    const summary = summarise(scores, assessmentIds.length, policy);
    if (summary.percentage === null) continue;

    const [existing] = await db
      .select({ id: schema.gradebookEntries.id })
      .from(schema.gradebookEntries)
      .where(
        and(
          eq(schema.gradebookEntries.studentId, student.id),
          eq(schema.gradebookEntries.classId, classId),
          eq(schema.gradebookEntries.termId, cls.termId),
        ),
      )
      .limit(1);

    const values = {
      computedScore: String(summary.percentage),
      letterGrade: letterFor(summary.percentage),
      updatedAt: now,
    };

    if (existing) {
      await db
        .update(schema.gradebookEntries)
        .set(values)
        .where(eq(schema.gradebookEntries.id, existing.id));
    } else {
      await db.insert(schema.gradebookEntries).values({
        id: nanoid(),
        studentId: student.id,
        classId,
        termId: cls.termId,
        ...values,
        // Publishing a mark is what makes it the learner's; the term figure
        // that follows from it is published for the same reason.
        isPublished: true,
        publishedAt: now,
        orgId,
        visibility: "org" as const,
      });
    }
    written++;
  }

  return written;
}
