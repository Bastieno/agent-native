import { defineAction } from "@agent-native/core";
import { getDb, schema } from "../server/db/index.js";
import { eq, and } from "drizzle-orm";
import { z } from "zod";

export default defineAction({
  description: "Get aggregate performance statistics for a class: average scores, distribution, completion rates.",
  schema: z.object({
    classId: z.string().describe("Class ID"),
  }),
  http: { method: "GET" },
  run: async (args) => {
    const db = getDb();

    const assessments = await db
      .select()
      .from(schema.assessments)
      .where(
        and(
          eq(schema.assessments.classId, args.classId),
          eq(schema.assessments.status, "published"),
        ),
      );

    const enrollments = await db
      .select()
      .from(schema.classEnrollments)
      .where(
        and(
          eq(schema.classEnrollments.classId, args.classId),
          eq(schema.classEnrollments.status, "active"),
        ),
      );
    const totalStudents = enrollments.length;

    const assessmentStats = [];
    for (const assessment of assessments) {
      const submissions = await db
        .select()
        .from(schema.submissions)
        .where(
          and(
            eq(schema.submissions.assessmentId, assessment.id),
            eq(schema.submissions.status, "graded"),
          ),
        );
      const grades = await db
        .select()
        .from(schema.grades)
        .where(eq(schema.grades.assessmentId, assessment.id));

      const percentages = grades
        .map((g) => parseFloat(g.percentage ?? "0"))
        .filter((p) => !isNaN(p));
      const average = percentages.length > 0
        ? percentages.reduce((a, b) => a + b, 0) / percentages.length
        : null;
      const distribution = {
        advanced: percentages.filter((p) => p >= 75).length,
        developing: percentages.filter((p) => p >= 50 && p < 75).length,
        foundational: percentages.filter((p) => p < 50).length,
      };

      assessmentStats.push({
        assessmentId: assessment.id,
        title: assessment.title,
        assessmentType: assessment.assessmentType,
        submittedCount: submissions.length,
        gradedCount: grades.length,
        totalStudents,
        completionRate: totalStudents > 0 ? (submissions.length / totalStudents * 100).toFixed(1) : "0",
        averageScore: average !== null ? average.toFixed(1) : null,
        distribution,
      });
    }

    return {
      classId: args.classId,
      totalStudents,
      assessmentStats,
    };
  },
});
