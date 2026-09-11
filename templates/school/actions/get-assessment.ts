import { defineAction } from "@agent-native/core";
import { getDb, schema } from "../server/db/index.js";
import { eq, asc } from "drizzle-orm";
import { z } from "zod";

/**
 * One assessment with its variants, as staff see it.
 *
 * Students must not reach this — variants carry their difficulty — so the
 * action policy restricts it to staff and the guard checks the class.
 * A learner's view is get-my-assessment.
 */
export default defineAction({
  description:
    "Get one assessment with its variants and a submission summary. Staff view; students use get-my-assessment.",
  schema: z.object({
    id: z.string().describe("Assessment ID"),
  }),
  http: { method: "GET" },
  run: async (args) => {
    const db = getDb();

    const [assessment] = await db
      .select()
      .from(schema.assessments)
      .where(eq(schema.assessments.id, args.id))
      .limit(1);
    if (!assessment) throw new Error("Assessment not found.");

    const variants = await db
      .select()
      .from(schema.assessmentVariants)
      .where(eq(schema.assessmentVariants.assessmentId, args.id))
      .orderBy(asc(schema.assessmentVariants.position));

    const submissions = await db
      .select({
        id: schema.submissions.id,
        status: schema.submissions.status,
      })
      .from(schema.submissions)
      .where(eq(schema.submissions.assessmentId, args.id));

    return {
      assessment,
      variants,
      submissionSummary: {
        total: submissions.length,
        submitted: submissions.filter((s: any) => s.status === "submitted")
          .length,
        graded: submissions.filter((s: any) => s.status === "graded").length,
      },
    };
  },
});
