import type { QuestionBlock } from "../../shared/activity-content.js";
import { rng } from "./population.js";

/**
 * What a simulated learner writes, given how able they are.
 *
 * No model is called here, by design: the point is to test the app, and a
 * model would make every run cost money and none of them repeatable. A
 * student's answer is assembled from the question itself — the right option
 * or a wrong one, a complete explanation or a partial one carrying a
 * believable misconception.
 *
 * It has to be good enough that marking has something real to do. An open
 * answer that is right-but-shorter should earn partial credit, and a
 * confident wrong answer should not — which is exactly what a marking policy
 * ought to get right, and cannot be tested with lorem ipsum.
 */

export type SimAnswer = {
  /** What the learner put down. */
  text: string;
  /** Whether it is right, for closed questions — used to check marking. */
  correct: boolean | null;
  /** 0–1: how much of the mark scheme they covered, for open questions. */
  coverage: number;
};

/** The index of the right option, however the question recorded it. */
function correctIndex(block: QuestionBlock): number | null {
  const raw = block.answer;
  if (raw === undefined || !block.options?.length) return null;
  if (typeof raw === "number") return raw;
  const letter = String(raw).trim().toUpperCase();
  if (/^[A-L]$/.test(letter)) return letter.charCodeAt(0) - 65;
  const asIndex = Number(raw);
  if (Number.isInteger(asIndex)) return asIndex;
  const match = block.options.findIndex(
    (o) => o.toLowerCase() === String(raw).trim().toLowerCase(),
  );
  return match >= 0 ? match : null;
}

/**
 * Answer one question.
 *
 * `seed` keeps a given student's answer to a given question the same across
 * re-runs, so a failure found on Tuesday is still there on Wednesday.
 */
export function answerQuestion(
  block: QuestionBlock,
  ability: number,
  seed: number,
): SimAnswer {
  const random = rng(seed);
  const options = block.options ?? [];

  if (options.length > 0) {
    const right = correctIndex(block);
    // A guess is right one time in four on a four-option question, so even a
    // weak learner scores something — which is what makes the app's own
    // grouping worth checking rather than trivially correct.
    const guessing = 1 / options.length;
    const chance = guessing + (1 - guessing) * ability;
    const correct = right !== null && random() < chance;
    const chosen = correct
      ? right!
      : // A wrong answer is a near miss, not a random stab: weak learners
        // pick the plausible distractor, which is what makes per-question
        // analysis mean anything.
        [...options.keys()].filter((i) => i !== right)[
          Math.floor(random() * Math.max(1, options.length - 1))
        ];
    return {
      text: String.fromCharCode(65 + (chosen ?? 0)),
      correct,
      coverage: correct ? 1 : 0,
    };
  }

  // Open question: how much of the mark scheme they manage to say.
  const coverage = Math.min(1, Math.max(0, ability + (random() - 0.5) * 0.25));
  const scheme = block.markScheme ?? "";
  const points = scheme
    .split(/[.;\n]/)
    .map((s) => s.trim())
    .filter((s) => s.length > 12);
  const kept = points.slice(
    0,
    Math.max(1, Math.round(points.length * coverage)),
  );

  const working = kept.length
    ? kept.map((p) => `I think ${p.toLowerCase()}`).join(". ")
    : `My answer to "${block.prompt.slice(0, 40)}" is based on what we did in class`;

  const misconception =
    coverage < 0.45
      ? " I am not sure about the unit so I left it out."
      : coverage < 0.75
        ? " I did not show every step."
        : "";

  return { text: `${working}.${misconception}`, correct: null, coverage };
}

/** Does this learner hand anything in at all this week? */
export function handsIn(diligence: number, seed: number): boolean {
  return rng(seed)() < diligence;
}
