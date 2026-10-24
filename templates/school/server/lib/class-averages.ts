import { and, eq, inArray } from "drizzle-orm";
import { getDb, schema } from "../db/index.js";
import { isMarkedWork } from "./gradebook.js";
import { SHARED_STATUSES } from "./shared-with-class.js";
import { summarise, type MissedWorkPolicy } from "../../shared/missed-work.js";

/**
 * Each class's average, counted the way one learner's subject mark is: a
 * learner's figure is their published marks under the school's missed-work
 * policy, and the class average is the mean of those figures. A learner with
 * nothing marked under the "excluded" policy has no figure and is left out,
 * so one absentee does not drag the class down or lift it up.
 */
export interface ClassAverage {
  /** Rounded to a whole number, as a learner's own figure is. */
  average: number | null;
  /** The same mean unrounded, for a page that shows a decimal. */
  exact: number | null;
  learners: number;
  /** Each enrolled learner's figure in this class, under the school's policy. */
  figures: Array<{
    studentId: string;
    percentage: number | null;
    /** Work was set and none of it came back. */
    nothingHandedIn: boolean;
  }>;
}

export async function classAveragesFor(
  classIds: string[],
  policy: MissedWorkPolicy,
): Promise<Map<string, ClassAverage>> {
  const out = new Map<string, ClassAverage>();
  if (classIds.length === 0) return out;
  const db = getDb();

  const assessments = (
    await db
      .select()
      .from(schema.assessments)
      .where(
        and(
          inArray(schema.assessments.classId, classIds),
          inArray(schema.assessments.status, [...SHARED_STATUSES]),
        ),
      )
  ).filter(isMarkedWork);
  const ids = assessments.map((a) => a.id);

  const enrolments = await db
    .select({
      classId: schema.classEnrollments.classId,
      userId: schema.classEnrollments.studentUserId,
    })
    .from(schema.classEnrollments)
    .where(
      and(
        inArray(schema.classEnrollments.classId, classIds),
        eq(schema.classEnrollments.status, "active"),
      ),
    );
  const students = enrolments.length
    ? await db
        .select({ id: schema.students.id, userId: schema.students.userId })
        .from(schema.students)
        .where(
          inArray(schema.students.userId, [
            ...new Set(enrolments.map((e) => e.userId)),
          ]),
        )
    : [];
  const studentIdOf = new Map(students.map((s) => [s.userId, s.id]));

  const grades = ids.length
    ? await db
        .select({
          studentId: schema.grades.studentId,
          assessmentId: schema.grades.assessmentId,
          percentage: schema.grades.percentage,
        })
        .from(schema.grades)
        .where(
          and(
            eq(schema.grades.isPublished, true),
            inArray(schema.grades.assessmentId, ids),
          ),
        )
    : [];

  for (const classId of classIds) {
    const set = assessments.filter((a) => a.classId === classId);
    const setIds = new Set(set.map((a) => a.id));
    const figures: number[] = [];
    const each: ClassAverage["figures"] = [];
    const enrolled = enrolments.filter((e) => e.classId === classId);
    for (const e of enrolled) {
      const studentId = studentIdOf.get(e.userId);
      if (!studentId) continue;
      const scores = grades
        .filter((g) => g.studentId === studentId && setIds.has(g.assessmentId))
        .map((g) => parseFloat(g.percentage ?? "0"));
      const { percentage, nothingHandedIn } = summarise(
        scores,
        set.length,
        policy,
      );
      each.push({ studentId, percentage, nothingHandedIn });
      if (percentage !== null) figures.push(percentage);
    }
    const exact = figures.length
      ? figures.reduce((a, b) => a + b, 0) / figures.length
      : null;
    out.set(classId, {
      average: exact === null ? null : Math.round(exact),
      exact,
      learners: figures.length,
      figures: each,
    });
  }
  return out;
}
