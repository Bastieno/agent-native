/**
 * What time taken adds to whether an answer was right.
 *
 * A mark alone cannot tell a teacher the difference between a learner who
 * knows something cold and one who guessed, or between one who is stuck and
 * one who is careful. Crossing correctness with time can:
 *
 *                  correct                    wrong
 *   quick     fluent — ready to move on    guessing, or a confident
 *                                          misconception
 *   slow      capable but unsure —         genuinely stuck
 *             needs practice, not
 *             new content
 *
 * Two rules keep this honest, and they matter more than the arithmetic.
 *
 * First, **time is the modifier, never the signal.** A learner is slow because
 * they are dyslexic, because they are working in their third language, because
 * the tablet lagged, because they were interrupted — or because they are
 * thinking carefully, which is the behaviour we want. Nothing here may be used
 * to label a child.
 *
 * Second, **the yardstick belongs to the school, not to us.** Quick and slow
 * are measured against the time the teacher allowed for that question, and
 * where no time was set, against what this class actually took. There is no
 * invented constant for "too slow".
 */

export type Quadrant = "fluent" | "guessing" | "unsure" | "stuck";

export type AnswerPoint = {
  seconds: number;
  isCorrect: boolean;
};

/**
 * The middle time, which is far more robust than an average for a class of
 * twenty where one learner wandered off for four minutes.
 */
export function median(values: number[]): number | null {
  if (values.length === 0) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? (sorted[mid - 1] + sorted[mid]) / 2
    : sorted[mid];
}

/**
 * Below how many seconds counts as quick, and above how many counts as slow.
 *
 * When the teacher set a time for the question, that is the yardstick: comfortably
 * inside it is quick, and using nearly all of it is slow. Otherwise the class's
 * own middle time is the comparator, so a hard question does not make the whole
 * class look slow.
 */
export function timeBands(
  allowedSeconds: number | null | undefined,
  classMedian: number | null,
): { quick: number; slow: number; basis: string } | null {
  if (allowedSeconds && allowedSeconds > 0) {
    return {
      quick: allowedSeconds * 0.4,
      slow: allowedSeconds * 0.85,
      basis: `the ${allowedSeconds}s the teacher allowed for this question`,
    };
  }
  if (classMedian && classMedian > 0) {
    return {
      quick: classMedian * 0.6,
      slow: classMedian * 1.6,
      basis: `what this class actually took (middle time ${Math.round(classMedian)}s)`,
    };
  }
  return null;
}

export function quadrantFor(
  point: AnswerPoint,
  bands: { quick: number; slow: number } | null,
): Quadrant | null {
  if (!bands) return null;
  const quick = point.seconds <= bands.quick;
  const slow = point.seconds >= bands.slow;
  if (!quick && !slow) return null; // middling: nothing worth saying
  if (point.isCorrect) return quick ? "fluent" : "unsure";
  return quick ? "guessing" : "stuck";
}

/** What each pattern suggests a teacher might do — phrased as a prompt, not a verdict. */
export const QUADRANT_MEANING: Record<Quadrant, string> = {
  fluent: "right, and quickly — secure here",
  guessing:
    "wrong, and quickly — worth checking whether they guessed or hold a misconception",
  unsure: "right, but slowly — capable, needs practice rather than reteaching",
  stuck: "wrong, and slowly — genuinely stuck, and the place to start",
};

/** A short name for each pattern, for counting them up in a sentence. */
export const QUADRANT_LABEL: Record<Quadrant, string> = {
  fluent: "quick and right",
  guessing: "quick and wrong",
  unsure: "slow but right",
  stuck: "slow and wrong",
};

/**
 * Too few answers and the middle time means nothing. Below this, report the
 * numbers and say plainly that the class is too small to compare.
 */
export const MIN_FOR_COMPARISON = 3;
