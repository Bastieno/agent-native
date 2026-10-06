import { defineAction } from "@agent-native/core";
import {
  readAppState,
  writeAppState,
} from "@agent-native/core/application-state";
import { currentAccess } from "@agent-native/core/sharing";
import { resolveStudentId } from "../server/lib/student-access.js";
import {
  activityWindow,
  closedMessage,
} from "../server/lib/activity-window.js";
import { getDb, schema } from "../server/db/index.js";
import { and, eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import { z } from "zod";
import { jsonish } from "../shared/zod-json.js";
import { parseActivityContent } from "../shared/activity-content.js";
import { markAnswer, isAutoMarkable } from "../shared/mark-answer.js";

export default defineAction({
  description:
    "Submit a student's work for an assessment. Creates or updates the submission row and transitions status to submitted, marking any closed questions whose answers were given. Only the student themselves (or an admin) can submit.",
  schema: z.object({
    assessmentId: z.string().describe("Assessment ID"),
    studentId: z
      .string()
      .optional()
      .describe(
        "Student record ID. Omit when the signed-in user is the student — it is resolved from the session.",
      ),
    content: z
      .string()
      .optional()
      .describe(
        "Final submission content (markdown). If omitted, uses the submission-draft app-state.",
      ),
    answers: jsonish(
      z.array(
        z.object({
          index: z.number().describe("Which question, from 0"),
          answer: z.string(),
        }),
      ),
    )
      .optional()
      .describe(
        "Answers to a question paper worked through as a whole, one entry per question answered. Closed questions are marked here, the same as they are when a paper is served one question at a time.",
      ),
  }),
  http: { method: "POST" },
  run: async (rawArgs) => {
    const { orgId, userEmail } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const db = getDb();
    const args = {
      ...rawArgs,
      studentId: await resolveStudentId(userEmail, rawArgs.studentId, orgId),
    };

    // Find assigned variant
    const [assigned] = await db
      .select()
      .from(schema.studentAssessments)
      .where(
        and(
          eq(schema.studentAssessments.assessmentId, args.assessmentId),
          eq(schema.studentAssessments.studentId, args.studentId),
        ),
      )
      .limit(1);

    // Check if submission already exists
    const [existing] = await db
      .select()
      .from(schema.submissions)
      .where(
        and(
          eq(schema.submissions.assessmentId, args.assessmentId),
          eq(schema.submissions.studentId, args.studentId),
        ),
      )
      .limit(1);

    // The window has to mean something: once any of the three clocks has run
    // out the work is no longer accepted, whatever the screen happens to be
    // showing. The duration clock is this learner's own, so it needs their
    // submission row — which is why this sits after the lookup above.
    const [activity] = await db
      .select({
        title: schema.assessments.title,
        status: schema.assessments.status,
        opensAt: schema.assessments.opensAt,
        closesAt: schema.assessments.closesAt,
        durationMinutes: schema.assessments.durationMinutes,
      })
      .from(schema.assessments)
      .where(eq(schema.assessments.id, args.assessmentId))
      .limit(1);
    if (activity) {
      const window = activityWindow(activity, existing?.startedAt);
      if (window.hasClosed) {
        throw new Error(closedMessage(activity.title, window));
      }
      if (window.notYetOpen) {
        throw new Error(
          `"${activity.title}" has not opened yet. ${window.reason}`,
        );
      }
    }

    // Read content from draft app-state if not provided
    let content = args.content;
    if (!content && existing) {
      const draft = (await readAppState(
        `submission-draft-${existing.id}`,
      )) as any;
      content = draft?.content ?? existing.content;
    }

    const now = new Date().toISOString();
    let submissionId: string;

    if (existing) {
      submissionId = existing.id;
      await db
        .update(schema.submissions)
        .set({
          content: content ?? existing.content,
          status: "submitted",
          submittedAt: now,
          updatedAt: now,
        })
        .where(eq(schema.submissions.id, existing.id));
    } else {
      submissionId = nanoid();
      await db.insert(schema.submissions).values({
        id: submissionId,
        studentId: args.studentId,
        assessmentId: args.assessmentId,
        variantId: assigned?.variantId ?? null,
        content: content ?? "",
        attachmentsJson: "[]",
        status: "submitted",
        submittedAt: now,
        ownerEmail: userEmail ?? "",
        orgId,
        visibility: "org" as const,
      });
    }

    // Mark what can be marked.
    //
    // Closed questions were only ever marked when a paper was served one
    // question at a time, because that is the path `answer-question` sits on.
    // A teacher setting twenty multiple-choice questions as a whole paper was
    // therefore promised no marking and given twenty papers to mark by hand —
    // the marking followed the screen the learner happened to use, rather
    // than the questions. The same rows are written here, so the gradebook,
    // the insights and the marking queue cannot tell the two apart.
    let marked = 0;
    let awarded = 0;
    let possible = 0;
    let unmarkable = 0;
    if (args.answers?.length) {
      const [variant] = assigned?.variantId
        ? await db
            .select({ contentJson: schema.assessmentVariants.contentJson })
            .from(schema.assessmentVariants)
            .where(eq(schema.assessmentVariants.id, assigned.variantId))
            .limit(1)
        : await db
            .select({ contentJson: schema.assessmentVariants.contentJson })
            .from(schema.assessmentVariants)
            .where(
              eq(schema.assessmentVariants.assessmentId, args.assessmentId),
            )
            .limit(1);
      const content = parseActivityContent(variant?.contentJson);
      const blocks = (content?.blocks ?? []) as any[];

      for (const given of args.answers) {
        const block = blocks[given.index];
        if (!block) continue;
        const mark = isAutoMarkable(block)
          ? markAnswer(block, given.answer)
          : { isCorrect: null, awardedPoints: null };
        if (mark.isCorrect === null) unmarkable++;
        else {
          marked++;
          awarded += mark.awardedPoints ?? 0;
          possible += typeof block.points === "number" ? block.points : 0;
        }

        const [already] = await db
          .select({ id: schema.questionResponses.id })
          .from(schema.questionResponses)
          .where(
            and(
              eq(schema.questionResponses.submissionId, submissionId),
              eq(schema.questionResponses.blockIndex, given.index),
            ),
          )
          .limit(1);
        const row = {
          answer: given.answer,
          answeredAt: now,
          isCorrect: mark.isCorrect,
          awardedPoints: mark.awardedPoints,
          updatedAt: now,
        };
        if (already) {
          await db
            .update(schema.questionResponses)
            .set(row)
            .where(eq(schema.questionResponses.id, already.id));
        } else {
          await db.insert(schema.questionResponses).values({
            id: nanoid(),
            submissionId,
            assessmentId: args.assessmentId,
            studentId: args.studentId,
            blockIndex: given.index,
            ...row,
          });
        }
      }
    }

    // Clear submission draft app-state
    await writeAppState(`submission-draft-${submissionId}`, null as any);

    return {
      submissionId,
      status: "submitted",
      submittedAt: now,
      // Said plainly, because "nothing to mark" is a promise a teacher plans
      // around: anything open still needs a person.
      marked,
      awardedPoints: marked ? awarded : null,
      possiblePoints: marked ? possible : null,
      needsMarking: unmarkable,
    };
  },
});
