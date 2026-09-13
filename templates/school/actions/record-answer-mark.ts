import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getDb, schema } from "../server/db/index.js";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { jsonish } from "../shared/zod-json.js";

/**
 * Record what one open answer earned, and why.
 *
 * The mark is not the interesting part — the evidence is. A teacher checking
 * twenty scripts should be able to see which of the learner's own words earned
 * each mark and agree or disagree in seconds, rather than re-reading and
 * re-deciding. That is what makes marking at this speed safe: the teacher is
 * verifying, not delegating.
 *
 * Nothing here reaches a learner. Marks live on the response until a teacher
 * compiles them into a grade and publishes it; the publishing gate is the
 * existing one, unchanged.
 */
export default defineAction({
  description:
    "Record the mark for one open answer: the points earned, the evidence from the learner's own words, feedback for them, and how confident you are. Mark against the question's mark scheme and the activity's objectives, never against a model answer — a learner who says the right thing in their own words has earned it. Low confidence, a blank answer, or anything you are unsure of should be flagged for the teacher.",
  schema: z.object({
    responseId: z.string().describe("From get-marking-queue"),
    awardedPoints: z.coerce
      .number()
      .describe("Points earned, never more than the question's maximum"),
    feedback: z
      .string()
      .optional()
      .describe(
        "What the learner is told — what they got right, and the one thing that would earn more. Address them directly.",
      ),
    evidence: jsonish(
      z.array(
        z.object({
          criterion: z
            .string()
            .describe("Which part of the mark scheme this satisfies"),
          points: z.coerce.number(),
          quote: z
            .string()
            .describe("The learner's own words that earned it, quoted exactly"),
        }),
      ),
    )
      .optional()
      .describe(
        "Which words earned which marks. A teacher verifies from this instead of re-marking.",
      ),
    confidence: z
      .enum(["high", "medium", "low"])
      .optional()
      .default("medium")
      .describe(
        "How sure you are. Use low for anything ambiguous, off-topic, very short, or where the mark scheme does not cover what the learner wrote.",
      ),
    needsReview: z.coerce
      .boolean()
      .optional()
      .describe(
        "Force this in front of the teacher. Low confidence does this automatically.",
      ),
  }),
  http: { method: "POST" },
  run: async (args) => {
    const { orgId, userEmail } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const db = getDb();

    const [response] = await db
      .select()
      .from(schema.questionResponses)
      .where(eq(schema.questionResponses.id, args.responseId))
      .limit(1);
    if (!response) throw new Error("That answer was not found.");

    // Belongs to this school? The response points at an assessment, which is
    // the thing that carries the org.
    const [assessment] = await db
      .select({ id: schema.assessments.id, orgId: schema.assessments.orgId })
      .from(schema.assessments)
      .where(eq(schema.assessments.id, response.assessmentId))
      .limit(1);
    if (!assessment || assessment.orgId !== orgId) {
      throw new Error("That answer is not part of this school.");
    }

    if (
      response.isCorrect !== null &&
      response.isCorrect !== undefined &&
      !response.drawingJson
    ) {
      throw new Error(
        "That question was settled by its answer key and does not need marking by hand.",
      );
    }

    const points = Math.max(0, args.awardedPoints);
    const blank = !(response.answer ?? "").trim();

    // A blank answer earning marks, or a low-confidence judgement, is exactly
    // what a teacher should see before anything is published.
    const needsReview =
      args.needsReview ?? (args.confidence === "low" || (blank && points > 0));

    const now = new Date().toISOString();
    await db
      .update(schema.questionResponses)
      .set({
        awardedPoints: points,
        feedback: args.feedback ?? null,
        evidenceJson: args.evidence ? JSON.stringify(args.evidence) : null,
        confidence: args.confidence ?? "medium",
        markedBy: userEmail ?? "agent",
        markedAt: now,
        needsReview,
        updatedAt: now,
      })
      .where(eq(schema.questionResponses.id, args.responseId));

    return {
      responseId: args.responseId,
      awardedPoints: points,
      confidence: args.confidence ?? "medium",
      needsReview,
      message: `Recorded ${points} point(s)${
        needsReview ? ", flagged for the teacher to check" : ""
      }. Not visible to the learner until the teacher publishes.`,
    };
  },
});
