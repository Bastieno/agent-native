import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getDb, schema } from "../server/db/index.js";
import { nanoid } from "nanoid";
import { z } from "zod";
import { resolveStudentId } from "../server/lib/student-access.js";

/**
 * A learner's own verdict on one card, each time they practise it.
 *
 * This is a self-report, and a biased one: seeing an answer makes it feel
 * familiar, and familiarity feels like knowledge. So it is recorded for the
 * person who gave it — to decide what they should see again — and for
 * nobody's judgement of them. No mark comes from it, it reaches no report,
 * and staff never see whose verdict was whose.
 *
 * Every look is kept rather than one row per card, because the useful
 * question is "is this getting easier?", which needs the sequence.
 */
export default defineAction({
  description:
    "Record a learner's own verdict on one flashcard — whether they knew it — so their practice can be scheduled. Private to that learner: it carries no marks and is never shown to staff against a name.",
  schema: z.object({
    assessmentId: z.string().describe("The card deck"),
    cardKey: z
      .string()
      .describe("Identifies the card; from cardKey() in shared/card-key.ts"),
    rating: z
      .enum(["got_it", "missed"])
      .describe("The learner's own verdict, not a mark"),
  }),
  http: { method: "POST" },
  run: async (args) => {
    const { orgId, userEmail } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    // Always the signed-in learner: nobody rates a card on another's behalf.
    const studentId = await resolveStudentId(userEmail, undefined, orgId);
    if (!studentId) {
      throw new Error("Only a student can record their own practice.");
    }

    const db = getDb();
    await db.insert(schema.cardReviews).values({
      id: nanoid(),
      studentId,
      assessmentId: args.assessmentId,
      cardKey: args.cardKey,
      rating: args.rating,
      reviewedAt: new Date().toISOString(),
      orgId,
    });

    return { recorded: true };
  },
});
