import type { QuestionBlock } from "../../shared/activity-content.js";
import { rng } from "./population.js";

/**
 * What a simulated learner writes, given how able they are.
 *
 * No model is called here, by design: the point is to test the app, and a
 * model would make every run cost money and none of them repeatable. A
 * student's answer is assembled from the question itself — the right option
 * or a wrong one, a complete explanation or a partial one that runs out
 * part-way, the way a learner who half-knows a topic does.
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
  /**
   * How hard this paper is, where 1 is the standard one. A foundational
   * paper is easier for the same learner, which is the entire point of
   * setting one — without this, differentiation changes who gets which
   * sheet of paper and nothing else, and the simulation could not tell
   * whether it helped.
   */
  difficulty = 1,
): SimAnswer {
  const random = rng(seed);
  const options = block.options ?? [];
  // An easier paper lifts what a learner can do; a harder one stretches
  // them. Kept gentle, so a weak learner on a foundational paper still
  // misses things and a strong one on an advanced paper still scores well.
  const effective = Math.min(0.98, Math.max(0.03, ability + (1 - difficulty)));

  if (options.length > 0) {
    const right = correctIndex(block);
    // A guess is right one time in four on a four-option question, so even a
    // weak learner scores something — which is what makes the app's own
    // grouping worth checking rather than trivially correct.
    const guessing = 1 / options.length;
    const chance = guessing + (1 - guessing) * effective;
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

  // Open question: how much of a full answer they manage to write.
  const coverage = Math.min(
    1,
    Math.max(0, effective + (random() - 0.5) * 0.25),
  );
  return { text: writeOpen(block, coverage, random), correct: null, coverage };
}

/**
 * An open answer in a learner's words.
 *
 * Built from the question's model answer, one idea per sentence: an able
 * learner writes all of it, a weaker one the opening ideas and then runs out.
 * It used to be built from the mark scheme, which put the marker's notes in
 * the child's mouth — "I think 1 mark per support named" — and a showcase
 * school whose papers read like that convinces nobody.
 */
function writeOpen(
  block: QuestionBlock,
  coverage: number,
  random: () => number,
): string {
  const ideas = ideasOf(block);
  if (!ideas.length) {
    return coverage >= 0.75
      ? "We covered this in class and I have written what I remember."
      : "We did this in class but I am not sure how to answer it.";
  }
  const kept = Math.round(ideas.length * coverage);
  if (kept >= ideas.length) return ideas.join(" ");
  if (kept === 0) {
    const shaky = [
      "I know we did this in class but I am not sure.",
      "I think it is about what we learnt this week but I am not sure.",
    ];
    return shaky[Math.floor(random() * shaky.length)];
  }
  // Running out reads differently depending on how far they got, and the
  // journeys' marking reads it back with `simCoverageOf` below.
  const ending =
    coverage < 0.45
      ? "I am not sure about the rest."
      : "I did not finish this part.";
  // A clause cut short ends its sentence where the learner stopped.
  const written = ideas.slice(0, kept).join(" ").replace(/,$/, ".");
  return `${written} ${ending}`;
}

/** The ideas a full answer makes, in the order a learner would write them. */
function ideasOf(block: QuestionBlock): string[] {
  const model = block.modelAnswer?.trim();
  if (model) {
    const sentences = model.split(/(?<=[.!?])\s+/).filter(Boolean);
    if (sentences.length > 1) return sentences;
    // One sentence carrying several ideas, split where its commas fall.
    const clauses = model
      .replace(/[.!?]$/, "")
      .split(/,\s+/)
      .filter(Boolean);
    return clauses.length > 1
      ? clauses.map((c, i) => (i === clauses.length - 1 ? `${c}.` : `${c},`))
      : [model];
  }
  // No model answer: the scheme's ideas, with the marker's wording removed.
  return (block.markScheme ?? "")
    .split(/[.;\n]/)
    .map((p) =>
      p
        .trim()
        .replace(/^\(?[a-z]\)\s*/i, "")
        .replace(/^\d+\s+marks?\s+(for|per|each for)\s+/i, "")
        .replace(/,?\s*to a maximum of \d+$/i, ""),
    )
    .filter((p) => p.length > 3)
    .map((p) => `${p.charAt(0).toUpperCase()}${p.slice(1)}.`);
}

/**
 * How much of a full answer a simulated learner wrote, read back from the
 * ending `writeOpen` gave it — what a teacher's eye would judge, made
 * mechanical so a run is repeatable.
 */
export function simCoverageOf(text: string): number {
  if (/not sure/i.test(text)) return 0.35;
  if (/did not finish|did not show every step/i.test(text)) return 0.7;
  return 0.95;
}

/** Does this learner hand anything in at all this week? */
export function handsIn(diligence: number, seed: number): boolean {
  return rng(seed)() < diligence;
}
