import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getDb, schema } from "../server/db/index.js";
import { eq, and, inArray } from "drizzle-orm";
import { sql } from "drizzle-orm";
import { z } from "zod";

export default defineAction({
  description:
    "Get detailed performance data for a specific student, optionally scoped to a class.",
  schema: z.object({
    studentId: z.string().describe("Student user ID"),
    classId: z.string().optional(),
  }),
  http: { method: "GET" },
  run: async (args) => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const db = getDb();

    // Get student info
    const userRow = (await db.get(
      sql`SELECT name, email FROM "user" WHERE id = ${args.studentId} LIMIT 1`,
    )) as { name: string; email: string } | undefined;

    // Get grades
    let gradesQuery = db
      .select()
      .from(schema.grades)
      .where(eq(schema.grades.studentId, args.studentId));

    const grades = await gradesQuery;

    if (grades.length === 0) {
      return {
        studentId: args.studentId,
        name: userRow?.name ?? null,
        email: userRow?.email ?? null,
        overallAverage: null,
        completionRate: null,
        byAssessment: [],
      };
    }

    // Filter to class if provided
    let relevantGrades = grades;
    if (args.classId) {
      const assessmentIds = await db
        .select({ id: schema.assessments.id })
        .from(schema.assessments)
        .where(eq(schema.assessments.classId, args.classId));
      const idSet = new Set(assessmentIds.map((a: any) => a.id));
      relevantGrades = grades.filter((g: any) => idSet.has(g.assessmentId));
    }

    const scores = relevantGrades
      .map((g: any) => parseFloat(g.percentage ?? "0"))
      .filter(Boolean);
    const overallAverage = scores.length
      ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
      : null;

    return {
      studentId: args.studentId,
      name: userRow?.name ?? null,
      email: userRow?.email ?? null,
      overallAverage,
      completionRate: relevantGrades.length > 0 ? 100 : 0,
      byAssessment: relevantGrades.map((g: any) => ({
        assessmentId: g.assessmentId,
        score: g.score,
        maxScore: g.maxScore,
        percentage: g.percentage,
        letterGrade: g.letterGrade,
        feedback: g.feedback,
        isPublished: g.isPublished,
      })),
    };
  },
});
