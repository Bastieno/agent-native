import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import {
  readAppState,
  writeAppState,
} from "@agent-native/core/application-state";
import { getDb, schema } from "../server/db/index.js";
import { eq, and } from "drizzle-orm";
import { nanoid } from "nanoid";
import { z } from "zod";

export default defineAction({
  description:
    "Agent-assisted bulk grading: drafts grades for all submitted work and stores them in grading-session app-state for teacher review. Pass confirm: true to commit the pending grades to the database.",
  schema: z.object({
    assessmentId: z.string().describe("Assessment ID"),
    confirm: z
      .boolean()
      .optional()
      .default(false)
      .describe(
        "If true, commit the pending grades from grading-session app-state. Run without confirm first to preview.",
      ),
  }),
  http: { method: "POST" },
  run: async (args) => {
    const { orgId, userEmail } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const db = getDb();

    if (args.confirm) {
      const session = (await readAppState(
        `grading-session-${args.assessmentId}`,
      )) as any;
      if (!session?.pendingGrades?.length) {
        throw new Error(
          `No pending grades found for grading-session-${args.assessmentId}. Run bulk-grade-submissions without --confirm first.`,
        );
      }
      const now = new Date().toISOString();
      let committed = 0;
      for (const pending of session.pendingGrades) {
        const percentage = ((pending.score / pending.maxScore) * 100).toFixed(
          1,
        );
        const [existing] = await db
          .select()
          .from(schema.grades)
          .where(eq(schema.grades.submissionId, pending.submissionId))
          .limit(1);
        if (existing) {
          await db
            .update(schema.grades)
            .set({
              score: pending.score,
              maxScore: pending.maxScore,
              percentage,
              feedback: pending.feedback ?? null,
              rubricScoresJson: JSON.stringify(pending.rubricScores ?? {}),
              gradedBy: userEmail ?? "agent",
              gradedAt: now,
              updatedAt: now,
            })
            .where(eq(schema.grades.id, existing.id));
        } else {
          const [submission] = await db
            .select()
            .from(schema.submissions)
            .where(eq(schema.submissions.id, pending.submissionId))
            .limit(1);
          if (!submission) continue;
          await db.insert(schema.grades).values({
            id: nanoid(),
            submissionId: pending.submissionId,
            studentId: submission.studentId,
            assessmentId: args.assessmentId,
            variantId: submission.variantId ?? null,
            score: pending.score,
            maxScore: pending.maxScore,
            percentage,
            letterGrade: null,
            feedback: pending.feedback ?? null,
            rubricScoresJson: JSON.stringify(pending.rubricScores ?? {}),
            gradedBy: userEmail ?? "agent",
            gradedAt: now,
          });
        }
        await db
          .update(schema.submissions)
          .set({ status: "graded", updatedAt: now })
          .where(eq(schema.submissions.id, pending.submissionId));
        committed++;
      }
      await writeAppState(`grading-session-${args.assessmentId}`, null);
      return {
        success: true,
        committed,
        message: `Committed ${committed} grades. Run publish-grades --assessmentId ${args.assessmentId} to make them visible to students.`,
      };
    }

    // Draft phase: collect all submitted work, pre-fill at 70% for teacher review
    const submissions = await db
      .select()
      .from(schema.submissions)
      .where(
        and(
          eq(schema.submissions.assessmentId, args.assessmentId),
          eq(schema.submissions.status, "submitted"),
        ),
      );

    if (submissions.length === 0) {
      return {
        draftCount: 0,
        message: "No submitted work found for this assessment yet.",
      };
    }

    const [assessment] = await db
      .select()
      .from(schema.assessments)
      .where(eq(schema.assessments.id, args.assessmentId))
      .limit(1);
    if (!assessment) throw new Error("Assessment not found.");

    const rubrics = await db
      .select()
      .from(schema.rubrics)
      .where(eq(schema.rubrics.assessmentId, args.assessmentId));
    const rubricCriteria =
      rubrics.length > 0
        ? await db
            .select()
            .from(schema.rubricCriteria)
            .where(eq(schema.rubricCriteria.rubricId, rubrics[0].id))
        : [];

    const maxScore = assessment.totalPoints;
    const pendingGrades = submissions.map((sub) => ({
      submissionId: sub.id,
      score: Math.round(maxScore * 0.7),
      maxScore,
      feedback: "Review and adjust before confirming.",
      rubricScores: Object.fromEntries(
        rubricCriteria.map((c) => [c.id, Math.round(c.maxPoints * 0.7)]),
      ),
    }));

    await writeAppState(`grading-session-${args.assessmentId}`, {
      assessmentId: args.assessmentId,
      pendingGrades,
    });

    return {
      draftCount: pendingGrades.length,
      pendingGrades,
      message: `Drafted ${pendingGrades.length} grades (pre-filled at 70%). Review and adjust scores in grading-session-${args.assessmentId} app-state, then call bulk-grade-submissions --assessmentId ${args.assessmentId} --confirm true to commit.`,
    };
  },
});
