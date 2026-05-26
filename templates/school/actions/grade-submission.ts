import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getOrgSetting } from "@agent-native/core/settings";
import { getDb, schema } from "../server/db/index.js";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import { z } from "zod";

function computeLetterGrade(
  percentage: number,
  gradingScale: any,
): string | null {
  if (!gradingScale?.levels?.length) return null;
  const level = gradingScale.levels.find(
    (l: any) => percentage >= l.min && percentage <= l.max,
  );
  return level?.grade ?? null;
}

export default defineAction({
  description: "Grade a student submission. Records score, feedback, and optional rubric scores.",
  schema: z.object({
    submissionId: z.string().describe("Submission ID"),
    score: z.number().describe("Points awarded"),
    feedback: z.string().optional().describe("Written feedback (markdown)"),
    rubricScores: z
      .record(z.string(), z.number())
      .optional()
      .describe("Map of rubric criterion ID → points awarded"),
    publish: z
      .boolean()
      .optional()
      .default(false)
      .describe("If true, make grade visible to student immediately"),
  }),
  http: { method: "POST" },
  run: async (args) => {
    const { orgId, userEmail } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const db = getDb();

    const [submission] = await db
      .select()
      .from(schema.submissions)
      .where(eq(schema.submissions.id, args.submissionId))
      .limit(1);
    if (!submission) throw new Error(`Submission not found: ${args.submissionId}`);

    const [assessment] = await db
      .select()
      .from(schema.assessments)
      .where(eq(schema.assessments.id, submission.assessmentId))
      .limit(1);
    const maxScore = assessment?.totalPoints ?? 100;
    const percentage = (args.score / maxScore) * 100;
    const schoolConfig = await getOrgSetting(orgId, "school-config") as any;
    const letterGrade = computeLetterGrade(percentage, schoolConfig?.gradingScale);
    const now = new Date().toISOString();

    // Check if grade already exists
    const [existingGrade] = await db
      .select()
      .from(schema.grades)
      .where(eq(schema.grades.submissionId, args.submissionId))
      .limit(1);

    if (existingGrade) {
      await db
        .update(schema.grades)
        .set({
          score: args.score,
          maxScore,
          percentage: percentage.toFixed(1),
          letterGrade,
          feedback: args.feedback ?? null,
          rubricScoresJson: JSON.stringify(args.rubricScores ?? {}),
          gradedBy: userEmail ?? "agent",
          gradedAt: now,
          isPublished: args.publish ? true : existingGrade.isPublished,
          updatedAt: now,
        })
        .where(eq(schema.grades.id, existingGrade.id));
    } else {
      await db.insert(schema.grades).values({
        id: nanoid(),
        submissionId: args.submissionId,
        studentId: submission.studentId,
        assessmentId: submission.assessmentId,
        variantId: submission.variantId ?? null,
        score: args.score,
        maxScore,
        percentage: percentage.toFixed(1),
        letterGrade,
        feedback: args.feedback ?? null,
        rubricScoresJson: JSON.stringify(args.rubricScores ?? {}),
        gradedBy: userEmail ?? "agent",
        gradedAt: now,
        isPublished: args.publish ? true : false,
      });
    }

    // Update submission status
    await db
      .update(schema.submissions)
      .set({ status: "graded", updatedAt: now })
      .where(eq(schema.submissions.id, args.submissionId));

    return {
      submissionId: args.submissionId,
      score: args.score,
      maxScore,
      percentage: `${percentage.toFixed(1)}%`,
      letterGrade,
      isPublished: args.publish,
    };
  },
});
