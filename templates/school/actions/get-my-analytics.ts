import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getOrgSetting } from "@agent-native/core/settings";
import { getDb, schema } from "../server/db/index.js";
import { eq, and, desc, asc, inArray, sql, count, ne } from "drizzle-orm";
import { actorForEmail } from "../server/lib/class-access.js";
import { getUserLabels, labelFor } from "../server/lib/user-names.js";
import { z } from "zod";

export default defineAction({
  description:
    "Teacher-facing: performance across the classes you teach — overall average, work awaiting grading, students below the pass mark, and a per-class breakdown.",
  schema: z.object({}),
  http: { method: "GET" },
  run: async () => {
    // Ported from the HTTP handler this action replaces; the actor stands in
    // for the request session so the logic is unchanged.
    const { userEmail } = currentAccess();
    const actor = userEmail ? await actorForEmail(userEmail) : null;
    if (!actor) throw new Error("No school context.");
    const session = { userId: actor.userId };
    const profile = { schoolId: actor.schoolId, schoolRole: actor.schoolRole };
    const db = getDb();

    const primaryClasses = await db
      .select({ id: schema.classes.id, name: schema.classes.name })
      .from(schema.classes)
      .where(eq(schema.classes.primaryTeacherUserId, session.userId));

    if (primaryClasses.length === 0) return null;

    const classIds = primaryClasses.map((c: any) => c.id);
    const schoolConfig = profile
      ? ((await getOrgSetting(profile.schoolId, "school-config")) as any)
      : null;
    const passMark = schoolConfig?.passMark ?? 50;

    // Enrollment counts per class
    const enrollmentCounts = await db
      .select({ classId: schema.classEnrollments.classId, c: count() })
      .from(schema.classEnrollments)
      .where(
        and(
          inArray(schema.classEnrollments.classId, classIds),
          eq(schema.classEnrollments.status, "active"),
        ),
      )
      .groupBy(schema.classEnrollments.classId);

    const countMap: Record<string, number> = {};
    for (const e of enrollmentCounts) countMap[e.classId] = Number(e.c);

    // All assessments in these classes
    const assessments = await db
      .select({
        id: schema.assessments.id,
        classId: schema.assessments.classId,
      })
      .from(schema.assessments)
      // Only work that was actually set, and that expects something back.
      //
      // This counted every row: unpublished drafts nobody has been given,
      // and reading pages with nothing to hand in. A teacher drafting next
      // week's reading watched this class's completion fall, and the same
      // class read 42% here and 78% on the admin's page — the admin counts
      // published work, which is the honest denominator.
      .where(
        and(
          inArray(schema.assessments.classId, classIds),
          eq(schema.assessments.status, "published"),
          ne(schema.assessments.responseMode, "none"),
        ),
      );

    const assessmentIds = assessments.map((a: any) => a.id);

    // Published grades for these assessments
    const grades =
      assessmentIds.length > 0
        ? await db
            .select()
            .from(schema.grades)
            .where(
              and(
                inArray(schema.grades.assessmentId, assessmentIds),
                eq(schema.grades.isPublished, true),
              ),
            )
        : [];

    // Pending (submitted but not graded) submissions
    const pendingSubmissions =
      assessmentIds.length > 0
        ? await db
            .select({
              id: schema.submissions.id,
              assessmentId: schema.submissions.assessmentId,
            })
            .from(schema.submissions)
            .where(
              and(
                inArray(schema.submissions.assessmentId, assessmentIds),
                eq(schema.submissions.status, "submitted"),
              ),
            )
        : [];

    // Turned-in work (submitted or graded), for completion rates
    const turnedIn =
      assessmentIds.length > 0
        ? await db
            .select({
              studentId: schema.submissions.studentId,
              assessmentId: schema.submissions.assessmentId,
            })
            .from(schema.submissions)
            .where(
              and(
                inArray(schema.submissions.assessmentId, assessmentIds),
                inArray(schema.submissions.status, ["submitted", "graded"]),
              ),
            )
        : [];

    // Check which submissions already have grades
    const gradedSubmissionIds = new Set(grades.map((g: any) => g.submissionId));
    const pendingGrading = pendingSubmissions.filter(
      (s: any) => !gradedSubmissionIds.has(s.id),
    ).length;

    // Overall average from all published grades
    const allPercentages = grades
      .map((g: any) => parseFloat(g.percentage ?? "0"))
      .filter((p: number) => !isNaN(p));
    const overallAverage =
      allPercentages.length > 0
        ? (
            allPercentages.reduce((a: number, b: number) => a + b, 0) /
            allPercentages.length
          ).toFixed(1)
        : null;

    // Struggling: enrolled students with average below passMark
    // Count unique students with avg < passMark across all classes
    const studentScores: Record<string, number[]> = {};
    for (const g of grades as any[]) {
      if (g.studentId && g.percentage != null) {
        const p = parseFloat(g.percentage);
        if (!isNaN(p)) {
          if (!studentScores[g.studentId]) studentScores[g.studentId] = [];
          studentScores[g.studentId].push(p);
        }
      }
    }
    const strugglingCount = Object.values(studentScores).filter((scores) => {
      const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
      return avg < passMark;
    }).length;

    // Per-class breakdown
    const byClass = primaryClasses.map((c: any) => {
      const classAssessmentIds = new Set(
        assessments
          .filter((a: any) => a.classId === c.id)
          .map((a: any) => a.id),
      );
      const classGrades = (grades as any[]).filter((g: any) =>
        classAssessmentIds.has(g.assessmentId),
      );
      const classPercentages = classGrades
        .map((g: any) => parseFloat(g.percentage ?? "0"))
        .filter((p: number) => !isNaN(p));
      const classAvg =
        classPercentages.length > 0
          ? (
              classPercentages.reduce((a: number, b: number) => a + b, 0) /
              classPercentages.length
            ).toFixed(1)
          : null;

      const classPendingSubs = pendingSubmissions.filter(
        (s: any) =>
          classAssessmentIds.has(s.assessmentId) &&
          !gradedSubmissionIds.has(s.id),
      ).length;

      const classStudentScores: Record<string, number[]> = {};
      for (const g of classGrades) {
        if (g.studentId && g.percentage != null) {
          const p = parseFloat(g.percentage);
          if (!isNaN(p)) {
            if (!classStudentScores[g.studentId])
              classStudentScores[g.studentId] = [];
            classStudentScores[g.studentId].push(p);
          }
        }
      }
      const classStruggling = Object.values(classStudentScores).filter(
        (scores) => {
          const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
          return avg < passMark;
        },
      ).length;

      const expected = (countMap[c.id] ?? 0) * classAssessmentIds.size;
      const done = new Set(
        turnedIn
          .filter((s: any) => classAssessmentIds.has(s.assessmentId))
          .map((s: any) => `${s.studentId}:${s.assessmentId}`),
      ).size;

      return {
        classId: c.id,
        className: c.name,
        averageScore: classAvg,
        studentCount: countMap[c.id] ?? 0,
        pendingGrading: classPendingSubs,
        strugglingCount: classStruggling,
        completionRate:
          expected > 0
            ? Math.round((Math.min(done, expected) / expected) * 100)
            : null,
      };
    });

    return {
      overallAverage,
      pendingGrading,
      strugglingCount,
      byClass,
    };
  },
});
