import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getDb, schema } from "../server/db/index.js";
import { and, eq, inArray } from "drizzle-orm";
import { z } from "zod";
import { parseActivityContent } from "../shared/activity-content.js";
import type { QuestionBlock } from "../shared/activity-content.js";
import { getUserLabels, labelFor } from "../server/lib/user-names.js";

/**
 * The open answers waiting to be marked, each with what it takes to mark it
 * fairly.
 *
 * Every item carries the question, its mark scheme, the objectives the work
 * was set against, and the learner's answer — because marking against
 * criteria is what makes a mark defensible, and marking against a model answer
 * is what makes it unfair. A learner who says the right thing in their own
 * words has earned the mark; one who echoes the expected phrasing without
 * understanding has not.
 *
 * The closed questions are not here. They were settled the moment they were
 * answered, and re-reading them would be wasted effort.
 */
export default defineAction({
  description:
    "List open answers awaiting marking for an activity, each with the question, its mark scheme, the activity's objectives and the student's own words. Read this before marking, then record each mark with record-answer-mark. Never invent a mark scheme that is not here — if one is missing, say so and mark conservatively, or ask the teacher.",
  schema: z.object({
    assessmentId: z.string().describe("Activity to mark"),
    includeMarked: z.coerce
      .boolean()
      .optional()
      .default(false)
      .describe("Include answers already marked, to review them"),
  }),
  http: { method: "GET" },
  run: async (args) => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const db = getDb();

    const [assessment] = await db
      .select()
      .from(schema.assessments)
      .where(
        and(
          eq(schema.assessments.id, args.assessmentId),
          eq(schema.assessments.orgId, orgId),
        ),
      )
      .limit(1);
    if (!assessment) throw new Error("Activity not found.");

    const objectives: string[] = (() => {
      try {
        return JSON.parse(assessment.objectivesJson ?? "[]");
      } catch {
        return [];
      }
    })();

    const variants = await db
      .select()
      .from(schema.assessmentVariants)
      .where(eq(schema.assessmentVariants.assessmentId, args.assessmentId));

    // Questions differ per variant, so each response is read against the
    // paper that learner actually sat.
    const questionsByVariant = new Map<string, QuestionBlock[]>();
    for (const v of variants) {
      const content = parseActivityContent(v.contentJson, assessment.renderAs);
      questionsByVariant.set(
        v.id,
        content?.shape === "questions"
          ? (content.blocks as QuestionBlock[])
          : [],
      );
    }
    const fallbackQuestions = questionsByVariant.get(variants[0]?.id) ?? [];

    const submissions = await db
      .select()
      .from(schema.submissions)
      .where(eq(schema.submissions.assessmentId, args.assessmentId));
    if (submissions.length === 0) {
      return { assessment: assessment.title, items: [], count: 0 };
    }

    const responses = await db
      .select()
      .from(schema.questionResponses)
      .where(
        inArray(
          schema.questionResponses.submissionId,
          submissions.map((s: any) => s.id),
        ),
      );

    const students = await db
      .select()
      .from(schema.students)
      .where(
        inArray(
          schema.students.id,
          submissions.map((s: any) => s.studentId),
        ),
      );
    const labels = await getUserLabels(
      students.map((s: any) => s.userId).filter(Boolean),
    );
    const nameByStudentId = new Map<string, string>(
      students.map((s: any) => [s.id, labelFor(labels, s.userId) ?? s.id]),
    );
    const submissionById = new Map<string, any>(
      submissions.map((s: any) => [s.id, s]),
    );

    const items = responses
      .filter((r: any) => {
        // Already settled by the answer key — nothing to read.
        if (r.isCorrect !== null && r.isCorrect !== undefined) return false;
        if (!args.includeMarked && r.markedAt) return false;
        return true;
      })
      .map((r: any) => {
        const submission = submissionById.get(r.submissionId);
        const questions =
          questionsByVariant.get(submission?.variantId ?? "") ??
          fallbackQuestions;
        const block = questions[r.blockIndex];
        return {
          responseId: r.id,
          submissionId: r.submissionId,
          studentName: nameByStudentId.get(r.studentId) ?? r.studentId,
          questionNumber: r.blockIndex + 1,
          prompt: block?.prompt ?? null,
          maxPoints: block?.points ?? null,
          // The basis for the mark. Without it, marking is a guess.
          markScheme: block?.markScheme ?? null,
          answer: r.answer ?? "",
          answerLength: (r.answer ?? "").trim().length,
          secondsTaken:
            r.elapsedMs === null ? null : Math.round(r.elapsedMs / 1000),
          timedOut: !!r.timedOut,
          alreadyMarked: !!r.markedAt,
          awardedPoints: r.awardedPoints ?? null,
        };
      })
      .sort(
        (a, b) =>
          a.questionNumber - b.questionNumber ||
          a.studentName.localeCompare(b.studentName),
      );

    const missingSchemes = items.filter((i) => !i.markScheme).length;

    return {
      assessment: assessment.title,
      objectives,
      totalPoints: assessment.totalPoints,
      items,
      count: items.length,
      message: items.length
        ? `${items.length} open answer(s) to mark.${
            missingSchemes
              ? ` ${missingSchemes} have no mark scheme — mark those conservatively and tell the teacher which questions need one.`
              : ""
          } Mark against the scheme and the objectives, quote the learner's own words as evidence, then record each with record-answer-mark. Nothing reaches a learner until the teacher publishes.`
        : "Nothing open is waiting to be marked.",
    };
  },
});
