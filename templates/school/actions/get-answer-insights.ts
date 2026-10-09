import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getDb, schema } from "../server/db/index.js";
import { and, eq, inArray } from "drizzle-orm";
import { z } from "zod";
import { parseActivityContent } from "../shared/activity-content.js";
import type { QuestionBlock } from "../shared/activity-content.js";
import { getUserLabels, labelFor } from "../server/lib/user-names.js";
import {
  median,
  timeBands,
  quadrantFor,
  QUADRANT_MEANING,
  QUADRANT_LABEL,
  MIN_FOR_COMPARISON,
  type Quadrant,
} from "../shared/answer-patterns.js";

/**
 * What a paper says beyond the marks.
 *
 * A mark tells a teacher a learner got question 4 wrong. This tells them
 * whether the class answered it wrongly in nine seconds — which looks like a
 * shared misconception worth reteaching — or wrongly after two minutes of
 * effort, which is a different lesson entirely.
 *
 * Deliberately observations, not labels. Nothing here decides that a child is
 * struggling; it says what happened on this paper and leaves the conclusion to
 * the person who knows them.
 */
export default defineAction({
  description:
    "What an activity's answers show beyond the marks: which questions the class got wrong quickly (a likely shared misconception) versus wrong slowly (genuinely hard), and how each learner's pattern of speed and accuracy looks. Observations for a teacher, never labels for a child — read the cautions back to them if they ask you to categorise anyone from this.",
  schema: z.object({
    assessmentId: z.string().describe("Activity to look at"),
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

    const submissions = await db
      .select()
      .from(schema.submissions)
      .where(eq(schema.submissions.assessmentId, args.assessmentId));
    if (submissions.length === 0) {
      return { assessment: assessment.title, questions: [], students: [] };
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
    // Only answers with a clock and a verdict can say anything here.
    const usable = responses.filter(
      (r: any) =>
        r.answeredAt &&
        r.elapsedMs !== null &&
        r.elapsedMs !== undefined &&
        (r.isCorrect !== null || r.awardedPoints !== null),
    );
    if (usable.length === 0) {
      return {
        assessment: assessment.title,
        questions: [],
        students: [],
        message:
          "No answers carry both a time and a mark yet, so there is nothing to compare.",
      };
    }

    const variants = await db
      .select()
      .from(schema.assessmentVariants)
      .where(eq(schema.assessmentVariants.assessmentId, args.assessmentId));
    const content = parseActivityContent(
      variants[0]?.contentJson,
      assessment.renderAs,
    );
    const questions: QuestionBlock[] =
      content?.shape === "questions" ? (content.blocks as QuestionBlock[]) : [];

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
    const nameFor = new Map<string, string>(
      students.map((s: any) => [s.id, labelFor(labels, s.userId) ?? s.id]),
    );

    /** An answer counts as right when the key said so, or it earned full marks. */
    const wasRight = (r: any, block?: QuestionBlock) => {
      if (r.isCorrect !== null && r.isCorrect !== undefined)
        return !!r.isCorrect;
      const max = block?.points ?? 0;
      return max > 0 ? (r.awardedPoints ?? 0) >= max : false;
    };

    const perStudent = new Map<string, Record<Quadrant, number>>();
    const questionRows: any[] = [];

    const indices = [...new Set(usable.map((r: any) => r.blockIndex))].sort(
      (a, b) => a - b,
    );

    for (const index of indices) {
      const block = questions[index];
      const forQuestion = usable.filter((r: any) => r.blockIndex === index);
      const times = forQuestion.map((r: any) => r.elapsedMs / 1000);
      const mid = median(times);
      const enough = forQuestion.length >= MIN_FOR_COMPARISON;
      const bands = timeBands(block?.durationSeconds, enough ? mid : null);

      const tally: Record<Quadrant, number> = {
        fluent: 0,
        guessing: 0,
        unsure: 0,
        stuck: 0,
      };
      let correct = 0;

      for (const r of forQuestion) {
        const right = wasRight(r, block);
        if (right) correct++;
        const quadrant = quadrantFor(
          { seconds: r.elapsedMs / 1000, isCorrect: right },
          bands,
        );
        if (quadrant) {
          tally[quadrant]++;
          const student = perStudent.get(r.studentId) ?? {
            fluent: 0,
            guessing: 0,
            unsure: 0,
            stuck: 0,
          };
          student[quadrant]++;
          perStudent.set(r.studentId, student);
        }
      }

      // The observation worth a teacher's attention, if there is one.
      const note =
        !enough || !bands
          ? `Only ${forQuestion.length} answer(s) — too few to compare times.`
          : tally.guessing >= Math.max(2, Math.ceil(forQuestion.length / 2))
            ? "Most who got this wrong answered quickly — that looks like a shared misconception rather than difficulty."
            : tally.stuck >= Math.max(2, Math.ceil(forQuestion.length / 2))
              ? "Most who got this wrong spent a long time on it — genuinely hard, not careless."
              : tally.unsure >= Math.max(2, Math.ceil(forQuestion.length / 2))
                ? "Most got it right but slowly — they can do it, and need practice rather than reteaching."
                : null;

      questionRows.push({
        questionNumber: index + 1,
        prompt: block?.prompt ?? null,
        answered: forQuestion.length,
        correct,
        correctRate: `${Math.round((correct / forQuestion.length) * 100)}%`,
        medianSeconds: mid === null ? null : Math.round(mid),
        allowedSeconds: block?.durationSeconds ?? null,
        comparedWith: bands?.basis ?? null,
        pattern: tally,
        note,
      });
    }

    const studentRows = [...perStudent.entries()]
      .map(([studentId, tally]) => {
        const total =
          tally.fluent + tally.guessing + tally.unsure + tally.stuck;
        // Name a pattern only when one actually dominates. A learner with one
        // of each is not "fluent" because that count sorted first — saying so
        // would be a label invented out of a tie.
        const ranked = (Object.entries(tally) as [Quadrant, number][])
          .filter(([, n]) => n > 0)
          .sort((a, b) => b[1] - a[1]);
        const dominant =
          ranked.length > 0 &&
          (ranked.length === 1 || ranked[0][1] > ranked[1][1])
            ? ranked[0]
            : null;
        const breakdown = ranked
          .map(([q, n]) => `${n} ${QUADRANT_LABEL[q]}`)
          .join(", ");

        return {
          studentId,
          studentName: nameFor.get(studentId) ?? studentId,
          pattern: tally,
          notableAnswers: total,
          observation: dominant
            ? `${dominant[1]} of ${total} notable answer(s) were ${QUADRANT_MEANING[dominant[0]]}.`
            : ranked.length > 1
              ? `A mixed picture across ${total} notable answer(s): ${breakdown}.`
              : null,
        };
      })
      .sort((a, b) => b.pattern.stuck - a.pattern.stuck);

    return {
      assessment: assessment.title,
      questions: questionRows,
      students: studentRows,
      legend: QUADRANT_MEANING,
      caution:
        "Time taken is a modifier, not a measure of ability. A learner may be slow because of dyslexia, because they are working in an additional language, because the tablet lagged, or because they are thinking carefully. Use this to decide what to teach next, never to label a child — and never show it to learners.",
      message: `${questionRows.length} question(s) across ${studentRows.length} learner(s). ${
        questionRows.filter((q) => q.note).length
      } worth a closer look.`,
    };
  },
});
