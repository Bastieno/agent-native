import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getDb, schema } from "../server/db/index.js";
import { eq, and, inArray } from "drizzle-orm";
import { z } from "zod";

export default defineAction({
  description:
    "Admin-facing: School-wide performance analytics. Aggregates grades across all classes, with optional filters by grade level, subject, or term.",
  schema: z.object({
    gradeLevel: z
      .string()
      .optional()
      .describe("Filter by grade level name (partial match), e.g. 'Grade 9'"),
    subjectName: z
      .string()
      .optional()
      .describe("Filter by subject name (partial match), e.g. 'Mathematics'"),
    termId: z.string().optional().describe("Filter by term ID"),
  }),
  http: { method: "GET" },
  run: async (args) => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const db = getDb();

    let gradeLevels = await db
      .select()
      .from(schema.gradeLevels)
      .where(eq(schema.gradeLevels.schoolId, orgId));
    if (args.gradeLevel) {
      gradeLevels = gradeLevels.filter((g) =>
        g.name.toLowerCase().includes(args.gradeLevel!.toLowerCase()),
      );
    }

    let subjects = await db
      .select()
      .from(schema.subjects)
      .where(
        and(
          eq(schema.subjects.schoolId, orgId),
          eq(schema.subjects.status, "active"),
        ),
      );
    if (args.subjectName) {
      subjects = subjects.filter((s) =>
        s.name.toLowerCase().includes(args.subjectName!.toLowerCase()),
      );
    }

    let classes = await db
      .select()
      .from(schema.classes)
      .where(
        and(
          eq(schema.classes.orgId, orgId),
          eq(schema.classes.status, "active"),
        ),
      );
    if (args.gradeLevel && gradeLevels.length > 0) {
      const ids = gradeLevels.map((g) => g.id);
      classes = classes.filter((c) => ids.includes(c.gradeLevelId));
    }
    if (args.subjectName && subjects.length > 0) {
      const ids = subjects.map((s) => s.id);
      classes = classes.filter((c) => ids.includes(c.subjectId));
    }

    // Batched: three queries for the whole school rather than one per class
    // and one per assessment.
    const classIds = classes.map((c: any) => c.id);
    const assessments =
      classIds.length > 0
        ? await db
            .select()
            .from(schema.assessments)
            .where(
              and(
                inArray(schema.assessments.classId, classIds),
                eq(schema.assessments.status, "published"),
              ),
            )
        : [];
    const assessmentIds = assessments.map((a: any) => a.id);

    const grades =
      assessmentIds.length > 0
        ? await db
            .select()
            .from(schema.grades)
            .where(inArray(schema.grades.assessmentId, assessmentIds))
        : [];
    const turnedIn =
      assessmentIds.length > 0
        ? await db
            .select({
              assessmentId: schema.submissions.assessmentId,
              studentId: schema.submissions.studentId,
            })
            .from(schema.submissions)
            .where(
              and(
                inArray(schema.submissions.assessmentId, assessmentIds),
                inArray(schema.submissions.status, ["submitted", "graded"]),
              ),
            )
        : [];
    const enrollments =
      classIds.length > 0
        ? await db
            .select({
              classId: schema.classEnrollments.classId,
              studentUserId: schema.classEnrollments.studentUserId,
            })
            .from(schema.classEnrollments)
            .where(
              and(
                inArray(schema.classEnrollments.classId, classIds),
                eq(schema.classEnrollments.status, "active"),
              ),
            )
        : [];

    const classIdByAssessment: Record<string, string> = {};
    for (const a of assessments) classIdByAssessment[a.id] = a.classId;
    const enrolledPerClass: Record<string, number> = {};
    for (const e of enrollments)
      enrolledPerClass[e.classId] = (enrolledPerClass[e.classId] ?? 0) + 1;

    const pctByClass: Record<string, number[]> = {};
    for (const g of grades as any[]) {
      const classId = classIdByAssessment[g.assessmentId];
      const p = parseFloat(g.percentage ?? "");
      if (!classId || isNaN(p)) continue;
      (pctByClass[classId] ??= []).push(p);
    }
    const doneByClass: Record<string, number> = {};
    for (const s of turnedIn as any[]) {
      const classId = classIdByAssessment[s.assessmentId];
      if (!classId) continue;
      doneByClass[classId] = (doneByClass[classId] ?? 0) + 1;
    }

    const classSummaries = classes.map((cls: any) => {
      const subject = subjects.find((s: any) => s.id === cls.subjectId);
      const gl = gradeLevels.find((g: any) => g.id === cls.gradeLevelId);
      const pcts = pctByClass[cls.id] ?? [];
      const classAssessments = assessments.filter(
        (a: any) => a.classId === cls.id,
      );
      const expected =
        (enrolledPerClass[cls.id] ?? 0) * classAssessments.length;
      const done = doneByClass[cls.id] ?? 0;

      return {
        classId: cls.id,
        className: cls.name,
        subjectName: subject?.name ?? "Unknown",
        gradeLevel: gl?.name ?? "Unknown",
        assessmentCount: classAssessments.length,
        gradedCount: pcts.length,
        averageScore:
          pcts.length > 0
            ? (pcts.reduce((a, b) => a + b, 0) / pcts.length).toFixed(1)
            : null,
        completionRate:
          expected > 0
            ? Math.round((Math.min(done, expected) / expected) * 100)
            : null,
        distribution: {
          advanced: pcts.filter((p) => p >= 75).length,
          developing: pcts.filter((p) => p >= 50 && p < 75).length,
          foundational: pcts.filter((p) => p < 50).length,
        },
      };
    });

    /** Average of class averages for a subset of classes. */
    function averageOf(summaries: any[]): string | null {
      const scored = summaries.filter((c) => c.averageScore);
      if (scored.length === 0) return null;
      return (
        scored.reduce((sum, c) => sum + parseFloat(c.averageScore), 0) /
        scored.length
      ).toFixed(1);
    }

    /** Distinct students enrolled across a set of classes. */
    function studentsIn(classIdSet: Set<string>): number {
      return new Set(
        enrollments
          .filter((e: any) => classIdSet.has(e.classId))
          .map((e: any) => e.studentUserId),
      ).size;
    }

    /** Weighted completion across a set of classes. */
    function completionOf(classIdSet: Set<string>): number | null {
      let expected = 0;
      let done = 0;
      for (const classId of classIdSet) {
        const count = assessments.filter(
          (a: any) => a.classId === classId,
        ).length;
        expected += (enrolledPerClass[classId] ?? 0) * count;
        done += doneByClass[classId] ?? 0;
      }
      if (expected === 0) return null;
      return Math.round((Math.min(done, expected) / expected) * 100);
    }

    const bySubject = subjects
      .map((s: any) => {
        const subset = classSummaries.filter(
          (c: any) => c.subjectName === s.name,
        );
        const ids = new Set(subset.map((c: any) => c.classId));
        return {
          subjectId: s.id,
          subjectName: s.name,
          classCount: subset.length,
          studentCount: studentsIn(ids),
          average: averageOf(subset),
          averageScore: averageOf(subset),
          completionRate: completionOf(ids),
        };
      })
      .filter((s: any) => s.classCount > 0);

    const byGradeLevel = gradeLevels
      .map((g: any) => {
        const subset = classSummaries.filter(
          (c: any) => c.gradeLevel === g.name,
        );
        const ids = new Set(subset.map((c: any) => c.classId));
        return {
          gradeLevelId: g.id,
          gradeLevelName: g.name,
          gradeLevel: g.name,
          classCount: subset.length,
          studentCount: studentsIn(ids),
          average: averageOf(subset),
          averageScore: averageOf(subset),
          completionRate: completionOf(ids),
        };
      })
      .filter((g: any) => g.classCount > 0);

    const totalExpected = classes.reduce((sum: number, cls: any) => {
      const count = assessments.filter((a: any) => a.classId === cls.id).length;
      return sum + (enrolledPerClass[cls.id] ?? 0) * count;
    }, 0);
    const totalDone = Object.values(doneByClass).reduce((a, b) => a + b, 0);

    const studentProfiles = await db
      .select()
      .from(schema.schoolProfiles)
      .where(
        and(
          eq(schema.schoolProfiles.schoolId, orgId),
          eq(schema.schoolProfiles.schoolRole, "student"),
          eq(schema.schoolProfiles.status, "active"),
        ),
      );

    const scoredClasses = classSummaries.filter((c) => c.averageScore);
    const overallAverage =
      scoredClasses.length > 0
        ? (
            scoredClasses.reduce(
              (sum, c) => sum + parseFloat(c.averageScore!),
              0,
            ) / scoredClasses.length
          ).toFixed(1)
        : null;

    return {
      schoolId: orgId,
      totalStudents: studentProfiles.length,
      totalClasses: classes.length,
      overallAverage,
      // Named for the admin dashboard, which reads these directly.
      schoolAverage: overallAverage,
      activeStudents: studentProfiles.length,
      gradedSubmissions: grades.length,
      completionRate:
        totalExpected > 0
          ? Math.round(
              (Math.min(totalDone, totalExpected) / totalExpected) * 100,
            )
          : null,
      bySubject,
      byGradeLevel,
      classSummaries,
    };
  },
});
