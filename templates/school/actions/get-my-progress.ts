import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getOrgSetting } from "@agent-native/core/settings";
import { getDb, schema } from "../server/db/index.js";
import { eq, and, inArray } from "drizzle-orm";
import {
  resolveStudentId,
  resolveUserId,
} from "../server/lib/student-session.js";
import { z } from "zod";

export default defineAction({
  description:
    "Student-facing: Get overall progress overview — grades by class, completion rate, strengths and weaknesses.",
  schema: z.object({
    studentId: z
      .string()
      .optional()
      .describe(
        "Student record ID. Omit when the signed-in user is the student — it is resolved from the session.",
      ),
  }),
  http: { method: "GET" },
  run: async (rawArgs) => {
    const args = {
      ...rawArgs,
      studentId: await resolveStudentId(rawArgs.studentId),
    };
    if (!args.studentId) {
      // Staff must name a student; a student is resolved from their session.
      throw new Error("studentId is required — say which student you mean.");
    }
    const { orgId } = currentAccess();
    const db = getDb();
    const config = (await getOrgSetting(orgId!, "school-config")) as any;
    const passMark = config?.passMark ?? 50;

    // Get all class enrollments for student
    const [student] = await db
      .select()
      .from(schema.students)
      .where(eq(schema.students.id, args.studentId))
      .limit(1);
    if (!student) throw new Error("Student not found.");

    const enrollments = await db
      .select()
      .from(schema.classEnrollments)
      .where(
        and(
          eq(schema.classEnrollments.studentUserId, student.userId),
          eq(schema.classEnrollments.status, "active"),
        ),
      );

    const classSummaries = [];
    let totalScore = 0;
    let totalGraded = 0;
    let totalAssigned = 0;
    let totalSubmitted = 0;

    for (const enrollment of enrollments) {
      const [cls] = await db
        .select({ name: schema.classes.name })
        .from(schema.classes)
        .where(eq(schema.classes.id, enrollment.classId))
        .limit(1);

      const assessments = await db
        .select()
        .from(schema.assessments)
        .where(
          and(
            eq(schema.assessments.classId, enrollment.classId),
            eq(schema.assessments.status, "published"),
          ),
        );
      totalAssigned += assessments.length;

      const grades = await db
        .select()
        .from(schema.grades)
        .where(
          and(
            eq(schema.grades.studentId, args.studentId),
            eq(schema.grades.isPublished, true),
          ),
        );
      const classGrades = grades.filter((g) =>
        assessments.some((a) => a.id === g.assessmentId),
      );
      const percentages = classGrades
        .map((g) => parseFloat(g.percentage ?? "0"))
        .filter((p) => !isNaN(p));
      const average =
        percentages.length > 0
          ? percentages.reduce((a, b) => a + b) / percentages.length
          : null;
      totalScore += percentages.reduce((a, b) => a + b, 0);
      totalGraded += percentages.length;

      const submitted = await db
        .select()
        .from(schema.submissions)
        .where(
          and(
            eq(schema.submissions.studentId, args.studentId),
            // Graded work is completed work — counting only "submitted"
            // reported a student who had been marked as having done nothing.
            inArray(schema.submissions.status, ["submitted", "graded"]),
          ),
        );
      totalSubmitted += submitted.filter((s) =>
        assessments.some((a) => a.id === s.assessmentId),
      ).length;

      classSummaries.push({
        classId: enrollment.classId,
        className: cls?.name ?? enrollment.classId,
        averageScore: average !== null ? average.toFixed(1) : null,
        gradedCount: percentages.length,
        totalAssessments: assessments.length,
        completionRate:
          assessments.length > 0
            ? ((submitted.length / assessments.length) * 100).toFixed(0)
            : "0",
        isStruggling: average !== null && average < passMark,
      });
    }

    const overallAverage =
      totalGraded > 0 ? (totalScore / totalGraded).toFixed(1) : null;
    const strongClasses = classSummaries.filter(
      (c) => c.averageScore && parseFloat(c.averageScore) >= 70,
    );
    const weakClasses = classSummaries.filter(
      (c) => c.averageScore && parseFloat(c.averageScore) < passMark,
    );

    return {
      studentId: args.studentId,
      overallAverage,
      assignmentsCompleted: totalSubmitted,
      assignmentsTotal: totalAssigned,
      completionRate:
        totalAssigned > 0
          ? ((totalSubmitted / totalAssigned) * 100).toFixed(0)
          : "0",
      classSummaries,
      strengthsAndWeaknesses: {
        strong: strongClasses.map((c) => (c as any).className ?? c.classId),
        needsWork: weakClasses.map((c) => (c as any).className ?? c.classId),
      },
    };
  },
});
