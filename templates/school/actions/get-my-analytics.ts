import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { classAveragesFor } from "../server/lib/class-averages.js";
import { missedWorkPolicy } from "../shared/missed-work.js";
import { getOrgSetting } from "@agent-native/core/settings";
import { getDb, schema } from "../server/db/index.js";
import { eq, and, desc, asc, inArray, sql, count, ne } from "drizzle-orm";
import { actorForEmail } from "../server/lib/class-access.js";
import { getUserLabels, labelFor } from "../server/lib/user-names.js";
import { z } from "zod";
import { sharedWithClass } from "../server/lib/shared-with-class.js";

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
          sharedWithClass(),
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

    // Counted as a learner's own Grades page and the report card count: each
    // learner's figure in a class is their published marks under the school's
    // missed-work setting. A class average is the mean of those figures, and a
    // learner who handed nothing in is struggling, not invisible.
    const policy = missedWorkPolicy(schoolConfig);
    const classAverages = await classAveragesFor(classIds, policy);
    const scored = [...classAverages.values()].filter((c) => c.exact !== null);
    const overallAverage =
      scored.length > 0
        ? (
            scored.reduce((n, c) => n + (c.exact as number), 0) / scored.length
          ).toFixed(1)
        : null;

    const isStruggling = (f: {
      percentage: number | null;
      nothingHandedIn: boolean;
    }) =>
      f.nothingHandedIn || (f.percentage !== null && f.percentage < passMark);
    // Across classes: a learner is struggling when their own average over the
    // teacher's classes is below the pass mark, or they have handed nothing in.
    const byLearner = new Map<string, number[]>();
    const nothingBy = new Set<string>();
    for (const c of classAverages.values()) {
      for (const f of c.figures) {
        if (f.percentage !== null) {
          byLearner.set(f.studentId, [
            ...(byLearner.get(f.studentId) ?? []),
            f.percentage,
          ]);
        } else if (f.nothingHandedIn) {
          nothingBy.add(f.studentId);
        }
      }
    }
    const strugglingCount = new Set([
      ...[...byLearner.entries()]
        .filter(
          ([, xs]) => xs.reduce((a, b) => a + b, 0) / xs.length < passMark,
        )
        .map(([id]) => id),
      ...[...nothingBy].filter((id) => !byLearner.has(id)),
    ]).size;

    // Per-class breakdown
    const byClass = primaryClasses.map((c: any) => {
      const classAssessmentIds = new Set(
        assessments
          .filter((a: any) => a.classId === c.id)
          .map((a: any) => a.id),
      );
      const classCounted = classAverages.get(c.id);
      const classAvg =
        classCounted?.exact != null ? classCounted.exact.toFixed(1) : null;

      const classPendingSubs = pendingSubmissions.filter(
        (s: any) =>
          classAssessmentIds.has(s.assessmentId) &&
          !gradedSubmissionIds.has(s.id),
      ).length;

      const classStruggling = (classCounted?.figures ?? []).filter(
        isStruggling,
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
      // How every figure here is counted, so it can be explained, not guessed.
      counting: [
        "A learner's figure in a class is their published marks, counted as their own Grades page and the report card count them: work not handed in " +
          (policy === "zero"
            ? "counts as zero (the school's missed-work setting)."
            : "is left out of the average (the school's missed-work setting)."),
        "A class's average is the mean of its enrolled learners' figures; the overall average is the mean of your classes' averages, so every class counts equally.",
        `Struggling means a learner whose figure is below the ${passMark}% pass mark, or who has handed in nothing marked.`,
        "Completion is the share of expected hand-ins (learners enrolled times pieces of work set) that were handed in.",
      ],
    };
  },
});
