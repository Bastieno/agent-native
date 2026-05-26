import { defineAction } from "@agent-native/core";
import { getDb, schema } from "../server/db/index.js";
import { eq, and } from "drizzle-orm";
import { z } from "zod";

export default defineAction({
  description:
    "Student-facing: Get all published grades for the current student across all assessments.",
  schema: z.object({
    studentId: z.string().describe("Student record ID"),
    classId: z.string().optional().describe("Filter to a specific class"),
  }),
  http: { method: "GET" },
  run: async (args) => {
    const db = getDb();

    const grades = await db
      .select()
      .from(schema.grades)
      .where(
        and(
          eq(schema.grades.studentId, args.studentId),
          eq(schema.grades.isPublished, true),
        ),
      );

    const results = [];
    for (const grade of grades) {
      const [assessment] = await db
        .select()
        .from(schema.assessments)
        .where(eq(schema.assessments.id, grade.assessmentId))
        .limit(1);
      if (!assessment) continue;
      if (args.classId && assessment.classId !== args.classId) continue;

      results.push({
        assessmentId: grade.assessmentId,
        assessmentTitle: assessment.title,
        classId: assessment.classId,
        score: grade.score,
        maxScore: grade.maxScore,
        percentage: grade.percentage,
        letterGrade: grade.letterGrade,
        feedback: grade.feedback,
        gradedAt: grade.gradedAt,
      });
    }

    return results;
  },
});
