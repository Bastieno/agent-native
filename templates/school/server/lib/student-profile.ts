import { getOrgSetting } from "@agent-native/core/settings";
import { and, desc, eq } from "drizzle-orm";
import { sql } from "drizzle-orm";
import { getDb, schema } from "../db/index.js";
import { rowOf } from "./raw-sql.js";
import {
  AccessDeniedError,
  actorForEmail,
  canAccessClass,
} from "./class-access.js";
import { classAveragesFor } from "./class-averages.js";
import { termGradesFor } from "./term-grades.js";
import { missedWorkPolicy } from "../../shared/missed-work.js";
import { findingsFor } from "../../shared/student-findings.js";

/**
 * One learner, for the person who has to act on it.
 *
 * Marks alone leave the reader to work out what they mean, so this says what
 * is going well and what needs attention, with the evidence for each, and who
 * to speak to. It is counted the way the learner's own Grades page and the
 * report card count, so nobody quotes a different average for the same child.
 *
 * A teacher sees only the learners in their own classes, and only those
 * classes' subjects. A position in the year group appears only when the
 * school has switched ranking on, as on the report card.
 */

export async function studentProfileFor(
  studentId: string,
  who: { orgId: string; userEmail: string | undefined },
) {
  const { orgId, userEmail } = who;
  const db = getDb();

  const [student] = await db
    .select()
    .from(schema.students)
    .where(
      and(
        eq(schema.students.id, studentId),
        eq(schema.students.schoolId, orgId),
      ),
    )
    .limit(1);
  if (!student) throw new Error("Student not found.");

  const actor = userEmail ? await actorForEmail(userEmail) : null;
  const role = actor?.schoolRole ?? null;
  const isTeacher = role === "teacher";

  const config = ((await getOrgSetting(orgId, "school-config")) ?? {}) as any;
  const policy = missedWorkPolicy(config);
  const term = await termGradesFor(studentId, orgId, { trendPieces: true });

  // A teacher sees this learner only through the classes they teach.
  let subjects = term.subjects;
  if (isTeacher && actor) {
    const allowed: typeof subjects = [];
    for (const s of subjects) {
      if (await canAccessClass(actor, s.classId)) allowed.push(s);
    }
    if (allowed.length === 0) {
      throw new AccessDeniedError(
        "This learner is not in any of your classes.",
      );
    }
    subjects = allowed;
  }

  const averages = await classAveragesFor(
    subjects.map((s) => s.classId),
    policy,
  );
  const withClass = subjects.map((s) => ({
    ...s,
    classAverage: averages.get(s.classId)?.average ?? null,
    classLearners: averages.get(s.classId)?.learners ?? 0,
  }));

  // The overall figures come from every subject for an admin, and from the
  // teacher's own subjects for a teacher, so nothing leaks across.
  const all = withClass.flatMap((s) => s.pieces);
  const counted = withClass.filter((s) => s.percentage !== null);
  const summary = !term.summary
    ? null
    : isTeacher
      ? {
          ...term.summary,
          percentage: counted.length
            ? Math.round(
                counted.reduce((n, s) => n + (s.percentage ?? 0), 0) /
                  counted.length,
              )
            : null,
          handedIn: all.filter(
            (p) => p.state === "marked" || p.state === "waiting",
          ).length,
          set: all.length,
          missed: all.filter((p) => p.state === "missed").length,
          stillOpen: all.filter((p) => p.state === "open").length,
          // The halves of the whole term mix in subjects not theirs.
          earlier: null,
          later: null,
          trend: null,
          dueNext: null,
        }
      : term.summary;

  const findings = findingsFor({
    subjects: withClass.map((s) => ({
      classId: s.classId,
      subject: s.subject,
      teacher: s.teacher,
      percentage: s.percentage,
      belowPassMark: s.belowPassMark,
      marked: s.marked,
      missed: s.missed,
      pieces: s.pieces,
      classAverage: s.classAverage,
    })),
    summary: summary
      ? {
          percentage: summary.percentage,
          passMark: summary.passMark,
          handedIn: summary.handedIn,
          set: summary.set,
          missed: summary.missed,
          earlier: summary.earlier,
          later: summary.later,
          trend: summary.trend,
          missedCountsAsZero: policy === "zero",
        }
      : null,
  });

  // Who they are.
  const person = (await rowOf(
    sql`SELECT name, email FROM "user" WHERE id = ${student.userId} LIMIT 1`,
  )) as { name: string | null; email: string | null } | undefined;
  const [grade] = student.gradeLevelId
    ? await db
        .select({ name: schema.gradeLevels.name })
        .from(schema.gradeLevels)
        .where(eq(schema.gradeLevels.id, student.gradeLevelId))
        .limit(1)
    : [];
  const [arm] = student.armId
    ? await db
        .select({ name: schema.arms.name })
        .from(schema.arms)
        .where(eq(schema.arms.id, student.armId))
        .limit(1)
    : [];
  const fieldDefs = ((
    (await getOrgSetting(orgId, "custom-fields-schema")) as any
  )?.student ?? []) as Array<{ name: string; label?: string }>;
  let fields: Record<string, unknown> = {};
  try {
    fields = JSON.parse(student.customFieldsJson ?? "{}");
  } catch {
    /* a malformed value is shown as no fields */
  }

  // A place in the year group, only where the school asked for ranking, and
  // only to someone who may see every subject (a teacher sees a slice).
  let position: { place: number; outOf: number } | null = null;
  if (config?.rankLearners && !isTeacher && student.gradeLevelId) {
    const [latest] = await db
      .select({ termId: schema.gradebookEntries.termId })
      .from(schema.gradebookEntries)
      .innerJoin(
        schema.terms,
        eq(schema.terms.id, schema.gradebookEntries.termId),
      )
      .where(
        and(
          eq(schema.gradebookEntries.studentId, studentId),
          eq(schema.gradebookEntries.orgId, orgId),
        ),
      )
      .orderBy(desc(schema.terms.endDate))
      .limit(1);
    if (latest) {
      const cohort = await db
        .select({
          studentId: schema.gradebookEntries.studentId,
          computedScore: schema.gradebookEntries.computedScore,
        })
        .from(schema.gradebookEntries)
        .innerJoin(
          schema.students,
          eq(schema.students.id, schema.gradebookEntries.studentId),
        )
        .where(
          and(
            eq(schema.gradebookEntries.termId, latest.termId),
            eq(schema.gradebookEntries.orgId, orgId),
            eq(schema.students.gradeLevelId, student.gradeLevelId),
          ),
        );
      const byStudent = new Map<string, number[]>();
      for (const row of cohort as any[]) {
        const v = Number(row.computedScore);
        if (!Number.isFinite(v)) continue;
        byStudent.set(row.studentId, [
          ...(byStudent.get(row.studentId) ?? []),
          v,
        ]);
      }
      const averagesOf = [...byStudent.entries()].map(([id, vs]) => ({
        id,
        average: vs.reduce((a, b) => a + b, 0) / vs.length,
      }));
      const me = averagesOf.find((a) => a.id === studentId);
      if (me && averagesOf.length > 1) {
        // Equal averages share a place, as a school would read them.
        position = {
          place: averagesOf.filter((a) => a.average > me.average).length + 1,
          outOf: averagesOf.length,
        };
      }
    }
  }

  return {
    learner: {
      id: student.id,
      name: person?.name ?? person?.email ?? null,
      email: person?.email ?? null,
      admissionNumber: student.admissionNumber ?? null,
      yearGroup: grade?.name ?? null,
      arm: arm?.name ?? null,
      status: student.status,
      customFields: fieldDefs
        .map((d) => ({
          label: d.label ?? d.name,
          value: fields[d.name] ?? null,
        }))
        .filter((f) => f.value !== null && f.value !== ""),
    },
    summary,
    subjects: withClass,
    findings,
    position,
    // Said so the reader knows how the figures were counted.
    counting: {
      publishedMarksOnly: true,
      missedWorkCountsAsZero: policy === "zero",
      rankingOn: !!config?.rankLearners,
    },
    scopedToMyClasses: isTeacher,
  };
}

export type StudentProfile = Awaited<ReturnType<typeof studentProfileFor>>;
