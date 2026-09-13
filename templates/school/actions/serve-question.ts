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
import { loadPaper, questionDeadline } from "../server/lib/question-paper.js";

/**
 * Put one question in front of a learner and start its clock.
 *
 * The moment a question is served is recorded here, on the server, and never
 * taken from the tablet: a device that sleeps, loses signal or has its clock
 * changed must not be able to buy more time. The learner's page counts down
 * from a deadline this returns; the server decides whether an answer arrived
 * in time.
 *
 * Serving the same question twice returns the original clock rather than
 * restarting it, so a reload is not a second attempt.
 */
export default defineAction({
  description:
    "Serve one question of a timed paper to a student and start that question's clock. Returns the question with the answer key removed, its deadline, and where they are in the paper. Safe to call again for the same question — the clock is not restarted.",
  schema: z.object({
    assessmentId: z.string(),
    index: z.coerce
      .number()
      .optional()
      .describe(
        "Zero-based question number. Omit to continue from wherever the learner is.",
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

    // The paper's own window still governs everything inside it.
    const window = activityWindow(assessment, submission?.startedAt);
    if (window.hasClosed)
      throw new Error(closedMessage(assessment.title, window));
    if (window.notYetOpen) {
      throw new Error(
        `"${assessment.title}" has not opened yet. ${window.reason}`,
      );
    }
    if (!submission) {
      throw new Error(
        "Start the activity before answering — call start-activity first.",
      );
    }

    const answered = await db
      .select()
      .from(schema.questionResponses)
      .where(eq(schema.questionResponses.submissionId, submission.id));
    const byIndex = new Map<number, any>(
      answered.map((r: any) => [r.blockIndex, r]),
    );

    // Where they are: the first question with no answer yet.
    const firstUnanswered = questions.findIndex(
      (_, i) => !byIndex.get(i)?.answeredAt,
    );
    const index =
      rawArgs.index ??
      (firstUnanswered === -1 ? questions.length : firstUnanswered);

    if (index >= questions.length) {
      return {
        finished: true,
        total: questions.length,
        answered: answered.filter((r: any) => r.answeredAt).length,
        message:
          "Every question has been answered. Hand the work in with submit-work.",
      };
    }
    if (index < 0)
      throw new Error("There is no question before the first one.");

    // Going back is what a linear paper does not allow; without that a
    // per-question limit means nothing, because a learner could read every
    // question first and then return to them.
    const existing = byIndex.get(index);
    if (assessment.navigation === "linear" && existing?.answeredAt) {
      throw new Error(
        "This paper moves forward only — question " +
          (index + 1) +
          " has already been answered.",
      );
    }

    const block = questions[index];
    const now = new Date().toISOString();
    let servedAt = existing?.servedAt ?? null;

    if (!servedAt) {
      servedAt = now;
      if (existing) {
        await db
          .update(schema.questionResponses)
          .set({ servedAt, updatedAt: now })
          .where(eq(schema.questionResponses.id, existing.id));
      } else {
        await db.insert(schema.questionResponses).values({
          id: nanoid(),
          submissionId: submission.id,
          assessmentId: rawArgs.assessmentId,
          studentId,
          blockIndex: index,
          servedAt,
        });
      }
    }

    const deadline = questionDeadline(block, servedAt);
    return {
      index,
      total: questions.length,
      isLast: index === questions.length - 1,
      // The answer key and mark scheme are deliberately not here.
      question: {
        prompt: block.prompt,
        options: block.options ?? null,
        hint: block.hint ?? null,
        points: block.points ?? null,
        answerSpace: block.answerSpace ?? null,
        answerMode: block.answerMode ?? "text",
      },
      servedAt,
      deadline,
      secondsAllowed: block.durationSeconds ?? null,
      secondsRemaining: deadline
        ? Math.max(
            0,
            Math.round((new Date(deadline).getTime() - Date.now()) / 1000),
          )
        : null,
      navigation: assessment.navigation ?? "free",
      previousAnswer: existing?.answer ?? null,
      previousDrawing: existing?.drawingJson ?? null,
    };
  },
});
