import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getDb, schema } from "../server/db/index.js";
import { eq, and } from "drizzle-orm";
import {
  resolveStudentId,
  resolveUserId,
} from "../server/lib/student-session.js";
import { z } from "zod";

export default defineAction({
  description:
    "Student-facing: Get assessments assigned to the current student. Shows only their assigned variant — never reveals difficulty label or that other variants exist.",
  schema: z.object({
    studentId: z
      .string()
      .optional()
      .describe(
        "Student record ID. Omit when the signed-in user is the student — it is resolved from the session.",
      ),
    classId: z.string().optional().describe("Filter to a specific class"),
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
    const db = getDb();

    // Get assigned assessments
    const assigned = await db
      .select()
      .from(schema.studentAssessments)
      .where(eq(schema.studentAssessments.studentId, args.studentId));

    const results = [];
    for (const a of assigned) {
      const [assessment] = await db
        .select()
        .from(schema.assessments)
        .where(
          and(
            eq(schema.assessments.id, a.assessmentId),
            eq(schema.assessments.status, "published"),
          ),
        )
        .limit(1);
      if (!assessment) continue;
      if (args.classId && assessment.classId !== args.classId) continue;

      // Get variant — do NOT expose difficulty name to student
      const [variant] = a.variantId
        ? await db
            .select()
            .from(schema.assessmentVariants)
            .where(eq(schema.assessmentVariants.id, a.variantId))
            .limit(1)
        : [null];

      // Get submission status
      const [submission] = await db
        .select()
        .from(schema.submissions)
        .where(
          and(
            eq(schema.submissions.assessmentId, assessment.id),
            eq(schema.submissions.studentId, args.studentId),
          ),
        )
        .limit(1);

      results.push({
        assessmentId: assessment.id,
        title: assessment.title,
        assessmentType: assessment.assessmentType,
        dueDate: assessment.dueDate,
        totalPoints: variant?.totalPoints ?? assessment.totalPoints,
        // Omit variant.difficulty — never show to student
        instructions: variant?.instructions ?? null,
        submissionStatus: submission?.status ?? "not_started",
        submissionId: submission?.id ?? null,
      });
    }

    return results;
  },
});
