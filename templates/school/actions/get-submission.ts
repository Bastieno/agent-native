import { defineAction } from "@agent-native/core";
import { getDb, schema } from "../server/db/index.js";
import { asc, eq } from "drizzle-orm";
import { z } from "zod";
import { parseActivityContent } from "../shared/activity-content.js";
import type { QuestionBlock } from "../shared/activity-content.js";

export default defineAction({
  description:
    "Get a single submission by ID, with the grade if one has been recorded and — for a paper worked through question by question — each answer with its mark, the evidence behind it, how long it took, and whether it is flagged for review.",
  schema: z.object({
    id: z.string().describe("Submission ID"),
  }),
  http: { method: "GET" },
  run: async (args) => {
    const db = getDb();
    const [submission] = await db
      .select()
      .from(schema.submissions)
      .where(eq(schema.submissions.id, args.id))
      .limit(1);
    if (!submission) throw new Error(`Submission not found: ${args.id}`);

    const [grade] = await db
      .select()
      .from(schema.grades)
      .where(eq(schema.grades.submissionId, args.id))
      .limit(1);

    // Per-question answers, where the paper was sat one question at a time.
    // A teacher checking a mark needs the question beside the answer beside
    // the evidence — hunting for any of the three is how review gets skipped.
    const responses = await db
      .select()
      .from(schema.questionResponses)
      .where(eq(schema.questionResponses.submissionId, args.id))
      .orderBy(asc(schema.questionResponses.blockIndex));

    let questions: QuestionBlock[] = [];
    if (responses.length > 0) {
      const [assessment] = await db
        .select()
        .from(schema.assessments)
        .where(eq(schema.assessments.id, submission.assessmentId))
        .limit(1);
      const [variant] = submission.variantId
        ? await db
            .select()
            .from(schema.assessmentVariants)
            .where(eq(schema.assessmentVariants.id, submission.variantId))
            .limit(1)
        : await db
            .select()
            .from(schema.assessmentVariants)
            .where(
              eq(
                schema.assessmentVariants.assessmentId,
                submission.assessmentId,
              ),
            )
            .limit(1);
      const content = parseActivityContent(
        variant?.contentJson,
        assessment?.renderAs,
      );
      questions =
        content?.shape === "questions"
          ? (content.blocks as QuestionBlock[])
          : [];
    }

    return {
      ...submission,
      grade: grade ?? null,
      answers: responses.map((r: any) => {
        const block = questions[r.blockIndex];
        let evidence: any[] = [];
        try {
          evidence = r.evidenceJson ? JSON.parse(r.evidenceJson) : [];
        } catch {
          evidence = [];
        }
        return {
          responseId: r.id,
          questionNumber: r.blockIndex + 1,
          prompt: block?.prompt ?? null,
          options: block?.options ?? null,
          maxPoints: block?.points ?? null,
          // Staff-only, so the scheme and the key are safe to include here.
          markScheme: block?.markScheme ?? null,
          expectedAnswer: block?.answer ?? null,
          answer: r.answer ?? "",
          drawing: r.drawingJson ?? null,
          isCorrect: r.isCorrect,
          awardedPoints: r.awardedPoints,
          feedback: r.feedback ?? null,
          evidence,
          confidence: r.confidence ?? null,
          markedBy: r.markedBy ?? null,
          needsReview: !!r.needsReview,
          autoMarked: r.isCorrect !== null && r.isCorrect !== undefined,
          secondsTaken:
            r.elapsedMs === null ? null : Math.round(r.elapsedMs / 1000),
          timedOut: !!r.timedOut,
          unmarked:
            (r.isCorrect === null || r.isCorrect === undefined) && !r.markedAt,
        };
      }),
    };
  },
});
