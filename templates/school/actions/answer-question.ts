import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { resolveStudentId } from "../server/lib/student-access.js";
import { getDb, schema } from "../server/db/index.js";
import { and, eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import { z } from "zod";
import {
  activityWindow,
  closedMessage,
} from "../server/lib/activity-window.js";
import {
  loadPaper,
  isPastQuestionDeadline,
} from "../server/lib/question-paper.js";
import { markAnswer, isAutoMarkable } from "../shared/mark-answer.js";

/**
 * Record a learner's answer to one question, and move them on.
 *
 * How long they took is computed here from the moment the question was served,
 * not reported by the tablet. A question whose time has run out is still
 * recorded — the answer is kept and marked as having overrun, because "they
 * knew it but ran out of time" and "they did not know it" are different facts
 * about a learner and a teacher should be able to tell them apart.
 *
 * A closed question is marked immediately. An open one is stored with no mark
 * at all rather than a guessed one; it waits for a person, or for the agent
 * reading the mark scheme.
 */
export default defineAction({
  description:
    "Record a student's answer to one question of a timed paper. Computes how long they took from when the question was served, marks it if it is a closed question, and returns the next question's index. Right/wrong is only told back to the learner when the activity allows instant feedback.",
  schema: z.object({
    assessmentId: z.string(),
    index: z.coerce.number().describe("Zero-based question number"),
    answer: z
      .string()
      .optional()
      .describe(
        "What the learner gave. For a choice question, the option index, its letter, or its text.",
      ),
    studentId: z
      .string()
      .optional()
      .describe("Omit when the signed-in user is the student."),
  }),
  http: { method: "POST" },
  run: async (rawArgs) => {
    const { orgId, userEmail } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const db = getDb();
    const studentId = await resolveStudentId(
      userEmail,
      rawArgs.studentId,
      orgId,
    );

    const { assessment, questions } = await loadPaper(
      rawArgs.assessmentId,
      studentId,
    );
    if (rawArgs.index < 0 || rawArgs.index >= questions.length) {
      throw new Error(`There is no question ${rawArgs.index + 1}.`);
    }
    const block = questions[rawArgs.index];

    const [submission] = await db
      .select()
      .from(schema.submissions)
      .where(
        and(
          eq(schema.submissions.assessmentId, rawArgs.assessmentId),
          eq(schema.submissions.studentId, studentId),
        ),
      )
      .limit(1);
    if (!submission) {
      throw new Error("Start the activity before answering.");
    }

    const window = activityWindow(assessment, submission.startedAt);
    if (window.hasClosed) {
      throw new Error(closedMessage(assessment.title, window));
    }

    const [existing] = await db
      .select()
      .from(schema.questionResponses)
      .where(
        and(
          eq(schema.questionResponses.submissionId, submission.id),
          eq(schema.questionResponses.blockIndex, rawArgs.index),
        ),
      )
      .limit(1);

    if (assessment.navigation === "linear" && existing?.answeredAt) {
      throw new Error(
        `Question ${rawArgs.index + 1} has already been answered, and this paper moves forward only.`,
      );
    }

    const now = new Date();
    const servedAt = existing?.servedAt ?? null;
    const timedOut = isPastQuestionDeadline(block, servedAt, now);
    const elapsedMs = servedAt
      ? Math.max(0, now.getTime() - new Date(servedAt).getTime())
      : null;

    // An answer that arrived after the question's own time still counts as
    // given — it just carries the fact that it overran.
    const mark = markAnswer(block, rawArgs.answer);

    const row = {
      answer: rawArgs.answer ?? null,
      answeredAt: now.toISOString(),
      elapsedMs,
      timedOut,
      isCorrect: mark.isCorrect,
      awardedPoints: mark.awardedPoints,
      updatedAt: now.toISOString(),
    };

    if (existing) {
      await db
        .update(schema.questionResponses)
        .set(row)
        .where(eq(schema.questionResponses.id, existing.id));
    } else {
      await db.insert(schema.questionResponses).values({
        id: nanoid(),
        submissionId: submission.id,
        assessmentId: rawArgs.assessmentId,
        studentId,
        blockIndex: rawArgs.index,
        servedAt,
        ...row,
      });
    }

    const nextIndex = rawArgs.index + 1;
    const finished = nextIndex >= questions.length;

    // Whether the learner is told right or wrong is the teacher's decision per
    // activity: motivating in practice, and the end of an assessment.
    const tellThem = !!assessment.instantFeedback && isAutoMarkable(block);

    return {
      index: rawArgs.index,
      recorded: true,
      elapsedSeconds: elapsedMs === null ? null : Math.round(elapsedMs / 1000),
      timedOut,
      // Null when not told, so the page cannot accidentally reveal it.
      isCorrect: tellThem ? mark.isCorrect : null,
      awardedPoints: tellThem ? mark.awardedPoints : null,
      feedback: tellThem ? mark.reason : null,
      autoMarked: mark.isCorrect !== null,
      nextIndex: finished ? null : nextIndex,
      finished,
      total: questions.length,
      message: finished
        ? "That was the last question. Hand the work in to finish."
        : `Answer recorded. Question ${nextIndex + 1} of ${questions.length} is next.`,
    };
  },
});
