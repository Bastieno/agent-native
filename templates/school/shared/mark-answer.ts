import type { QuestionBlock } from "./activity-content.js";

/**
 * Marking a closed question.
 *
 * Only questions with an unambiguous right answer are marked here — a choice,
 * a number, a single word. Anything open is left for a person, or for the
 * agent reading the mark scheme; guessing at an essay with string comparison
 * would produce marks nobody could defend.
 *
 * The comparisons are deliberately forgiving of how an answer was typed and
 * strict about what it says. A learner who writes "  B " or "0.50" or "4 cm"
 * has answered the question; one who writes "5" has not.
 */

export type MarkResult = {
  /** Null when this question cannot be marked automatically. */
  isCorrect: boolean | null;
  awardedPoints: number | null;
  /** Why, in a form safe to show a learner. */
  reason: string | null;
};

export const UNMARKABLE: MarkResult = {
  isCorrect: null,
  awardedPoints: null,
  reason: null,
};

/** Can this question be settled without a human reading it? */
export function isAutoMarkable(block: QuestionBlock): boolean {
  return block.answer !== undefined && block.answer !== null;
}

function normalise(value: string): string {
  return (
    value
      .trim()
      .toLowerCase()
      // Commas as thousands separators, and stray spacing inside numbers.
      .replace(/,/g, "")
      .replace(/\s+/g, " ")
  );
}

/** "2.50" and "2.5" are the same answer; "2.5" and "2.6" are not. */
function numbersMatch(a: string, b: string): boolean {
  const na = Number(a);
  const nb = Number(b);
  if (Number.isNaN(na) || Number.isNaN(nb)) return false;
  // A tolerance for floating point only — not for being close enough.
  return Math.abs(na - nb) < 1e-9;
}

/**
 * A choice answer may arrive as an index ("1"), as a letter ("B"), or as the
 * option's own text. All three mean the same thing to a learner tapping a
 * button, so all three are accepted.
 */
function choiceIndex(
  value: string,
  options: string[] | undefined,
): number | null {
  const raw = value.trim();
  if (!raw) return null;

  if (/^\d+$/.test(raw)) {
    const n = Number(raw);
    if (n >= 0 && n < (options?.length ?? Infinity)) return n;
  }
  if (/^[a-z]$/i.test(raw)) {
    const n = raw.toUpperCase().charCodeAt(0) - 65;
    if (n >= 0 && n < (options?.length ?? Infinity)) return n;
  }
  if (options) {
    const found = options.findIndex((o) => normalise(o) === normalise(raw));
    if (found >= 0) return found;
  }
  return null;
}

export function markAnswer(
  block: QuestionBlock,
  answer: string | null | undefined,
): MarkResult {
  if (!isAutoMarkable(block)) return UNMARKABLE;

  const given = (answer ?? "").trim();
  const points = typeof block.points === "number" ? block.points : 1;

  if (!given) {
    return {
      isCorrect: false,
      awardedPoints: 0,
      reason: "No answer was given.",
    };
  }

  const expected = String(block.answer);

  // A choice question: compare positions, not spellings.
  if (block.options?.length) {
    const givenIndex = choiceIndex(given, block.options);
    const expectedIndex = choiceIndex(expected, block.options);
    const isCorrect =
      givenIndex !== null &&
      expectedIndex !== null &&
      givenIndex === expectedIndex;
    return {
      isCorrect,
      awardedPoints: isCorrect ? points : 0,
      reason: isCorrect ? "Correct." : "Not the right option.",
    };
  }

  // A number or a short written answer.
  const candidates = [expected, ...(block.acceptableAnswers ?? [])];
  const isCorrect = candidates.some(
    (candidate) =>
      normalise(candidate) === normalise(given) ||
      numbersMatch(normalise(candidate), normalise(given)),
  );

  return {
    isCorrect,
    awardedPoints: isCorrect ? points : 0,
    reason: isCorrect ? "Correct." : "Not the expected answer.",
  };
}
