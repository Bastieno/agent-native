import type {
  ActivityContent,
  QuestionBlock,
} from "../../shared/activity-content.js";

/**
 * A learner's own paper, handed back.
 *
 * Once work is handed in, the answer sheet goes away — and on a paper of
 * questions the answer sheet was the only place the questions were shown, so a
 * marked paper came back as a bare grade: "C6, 2/4", with nothing to say which
 * two. A child learns from the paper, not from the number, so the paper comes
 * back with it.
 *
 * Three things are revealed in stages, and each stage is decided here, on the
 * server, because anything sent to a pupil's browser is readable by that pupil:
 *
 *  - Always, once handed in: the questions and their own answers.
 *  - Once their marks are published: the marks and feedback for each question.
 *    Before then a mark may still change, and telling a child a mark the
 *    teacher has not agreed to is worse than telling them nothing.
 *  - Once the paper has also closed for the whole class: the correct answer to
 *    each closed question. Before then a classmate who has not handed in could
 *    be shown it. A learner asked to redo the work does not see them either,
 *    until they have.
 *
 * The mark scheme of an open question never comes back. It is written for the
 * person marking — "1 mark for naming the cause, 1 for the effect" — and what
 * the learner gets instead is what it said about their answer: the points they
 * earned and the feedback.
 */

export type ReviewResponse = {
  blockIndex: number;
  answer: string | null;
  isCorrect: boolean | null;
  awardedPoints: number | null;
  feedback: string | null;
};

export type ReviewQuestion = {
  index: number;
  prompt: string;
  options?: string[];
  points?: number;
  /** What they wrote or chose, as stored. */
  answer: string | null;
  /** Only once their marks are published. */
  isCorrect?: boolean | null;
  awardedPoints?: number | null;
  feedback?: string | null;
  /**
   * Only once the paper has closed for the class. For a choice question, the
   * letter of the right option; otherwise the expected answer. Absent for an
   * open question, which has no single right answer.
   */
  correctAnswer?: string;
};

export type PaperReview = {
  marksPublished: boolean;
  answersRevealed: boolean;
  /** Why the correct answers are not shown yet, in words for the learner. */
  answersNote: string | null;
  questions: ReviewQuestion[];
};

/** "B" for a choice question, whatever form the key was stored in. */
function correctAnswerFor(block: QuestionBlock): string | undefined {
  if (block.answer === undefined || block.answer === null) return undefined;
  const raw = String(block.answer).trim();
  if (!block.options?.length) return raw || undefined;
  if (/^\d+$/.test(raw) && Number(raw) < block.options.length) {
    return String.fromCharCode(65 + Number(raw));
  }
  if (/^[a-z]$/i.test(raw)) return raw.toUpperCase();
  const found = block.options.findIndex(
    (o) => o.trim().toLowerCase() === raw.toLowerCase(),
  );
  return found >= 0 ? String.fromCharCode(65 + found) : undefined;
}

export function buildPaperReview(opts: {
  /** The full content, answer key included — stripped here, not before. */
  content: ActivityContent | null;
  responses: ReviewResponse[];
  marksPublished: boolean;
  closedForClass: boolean;
  resubmissionRequested: boolean;
}): PaperReview | null {
  const blocks = (opts.content?.blocks ?? []) as QuestionBlock[];
  if (!blocks.length) return null;

  const answersRevealed =
    opts.marksPublished && opts.closedForClass && !opts.resubmissionRequested;
  const answersNote = answersRevealed
    ? null
    : opts.resubmissionRequested
      ? "The correct answers appear once you have handed this in again."
      : !opts.marksPublished
        ? "The correct answers appear once your marks are out and this has closed for the class."
        : "The correct answers appear once this has closed for the whole class.";

  const byIndex = new Map(opts.responses.map((r) => [r.blockIndex, r]));

  const questions = blocks.map((block, index): ReviewQuestion => {
    const response = byIndex.get(index);
    const question: ReviewQuestion = {
      index,
      prompt: block.prompt,
      ...(block.options?.length ? { options: block.options } : {}),
      ...(typeof block.points === "number" ? { points: block.points } : {}),
      answer: response?.answer ?? null,
    };
    if (opts.marksPublished) {
      question.isCorrect = response?.isCorrect ?? null;
      question.awardedPoints = response?.awardedPoints ?? null;
      question.feedback = response?.feedback ?? null;
    }
    if (answersRevealed) {
      const correct = correctAnswerFor(block);
      if (correct) question.correctAnswer = correct;
    }
    return question;
  });

  return {
    marksPublished: opts.marksPublished,
    answersRevealed,
    answersNote,
    questions,
  };
}
