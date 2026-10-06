import type { ItemStyle } from "./assessment-style.js";

/**
 * What a pile of a school's own questions says about how it asks them.
 *
 * The agent reads the papers — it can see a PDF, a photograph, a pasted page
 * — and hands the questions over as data. The counting is then arithmetic,
 * which is why it lives here rather than in a prompt: a median is a fact, and
 * a fact should come out the same every time it is computed.
 *
 * The one judgement encoded here is about **sample size**. A style read from
 * thirty questions is an anecdote wearing a lab coat: it will report a
 * negation rate of 13% because four questions happened to say "except", and
 * nobody will know it was noise. So the derivation says how much it saw and
 * what that supports, and drops the fields it cannot stand behind.
 */

export type ReadQuestion = {
  stem: string;
  options?: string[];
  answer?: string | null;
  marks?: number | null;
};

export type Derivation = {
  itemStyle: ItemStyle;
  questionsAnalysed: number;
  /** What the numbers rest on, said plainly. */
  confidence: "thin" | "workable" | "solid";
  observations: string[];
  problems: string[];
};

const NEG = /\b(not|except|incorrect|false|least|cannot)\b/i;
const VERB =
  /^(state|define|explain|calculate|determine|find|describe|list|name|give|identify|outline|mention|distinguish|differentiate|compare|discuss|write|draw|solve|evaluate|express|convert|simplify|prove|show|derive)\b/i;

const median = (xs: number[]) => {
  if (!xs.length) return 0;
  const s = [...xs].sort((a, b) => a - b);
  return s[Math.floor(s.length / 2)];
};
const percentile = (xs: number[], p: number) => {
  if (!xs.length) return 0;
  const s = [...xs].sort((a, b) => a - b);
  return s[Math.min(s.length - 1, Math.floor(s.length * p))];
};

export function deriveItemStyle(questions: ReadQuestion[]): Derivation {
  const problems: string[] = [];
  const observations: string[] = [];
  const usable = questions.filter((q) => q?.stem?.trim());
  if (usable.length < questions.length) {
    problems.push(
      `${questions.length - usable.length} question(s) had no wording and were left out.`,
    );
  }

  const n = usable.length;
  if (n === 0) {
    return {
      itemStyle: {},
      questionsAnalysed: 0,
      confidence: "thin",
      observations: [],
      problems: [...problems, "No questions to read."],
    };
  }

  const lengths = usable.map((q) => q.stem.trim().length);
  const optionCounts = new Map<number, number>();
  const answers = new Map<string, number>();
  const verbs = new Map<string, number>();
  let negated = 0;
  let withMaths = 0;

  for (const q of usable) {
    const opts = q.options?.length ?? 0;
    if (opts) optionCounts.set(opts, (optionCounts.get(opts) ?? 0) + 1);
    if (q.answer && /^[A-H]$/.test(q.answer.trim())) {
      const a = q.answer.trim();
      answers.set(a, (answers.get(a) ?? 0) + 1);
    }
    if (NEG.test(q.stem)) negated++;
    const v = (q.stem.trim().match(VERB) ?? [])[0];
    if (v) verbs.set(v.toLowerCase(), (verbs.get(v.toLowerCase()) ?? 0) + 1);
    if (/[\\^_$]|[√≤≥±×÷π²³∞≈≠°θ∆Ω]/.test(q.stem)) withMaths++;
  }

  const itemStyle: ItemStyle = {
    stemLengthChars: { median: median(lengths), p90: percentile(lengths, 0.9) },
  };

  // Only claim an option count when the papers are actually consistent.
  const [commonest] = [...optionCounts.entries()].sort((a, b) => b[1] - a[1]);
  if (commonest) {
    const [count, times] = commonest;
    const shareOfMcq =
      times / [...optionCounts.values()].reduce((a, b) => a + b, 0);
    if (shareOfMcq >= 0.8) itemStyle.optionCount = count;
    else {
      observations.push(
        `Option counts vary (${[...optionCounts.entries()].map(([c, t]) => `${c} options ×${t}`).join(", ")}), so none is recorded as the house habit.`,
      );
    }
  }

  // A negation rate needs enough questions to mean anything.
  if (n >= 60) {
    itemStyle.negationRatePct = Math.round((100 * negated) / n);
  } else {
    observations.push(
      `Negation rate not recorded: ${n} questions is too few to tell a habit from a coincidence.`,
    );
  }

  const topVerbs = [...verbs.entries()]
    .sort((a, b) => b[1] - a[1])
    .filter(([, t]) => t >= Math.max(2, n * 0.03))
    .slice(0, 6)
    .map(([v]) => v);
  if (topVerbs.length) itemStyle.commandVerbs = topVerbs;

  if (answers.size >= 2) {
    const counts = [...answers.values()];
    const spread = Math.max(...counts) / Math.min(...counts);
    itemStyle.answerSpread =
      spread <= 1.6 ? "even across the letters" : "unevenly across the letters";
    if (spread > 1.6) {
      observations.push(
        `Correct answers are not evenly spread in these papers (${[
          ...answers.entries(),
        ]
          .sort()
          .map(([a, c]) => `${a}:${c}`)
          .join(" ")}). Recorded as observed, not as something to copy.`,
      );
    }
  }

  if (withMaths / n > 0.15) itemStyle.mathsNotation = "LaTeX, fenced with $…$";

  const confidence = n >= 200 ? "solid" : n >= 60 ? "workable" : "thin";
  if (confidence === "thin") {
    problems.push(
      `Only ${n} questions read. That is enough to notice how long a question runs, and not enough for anything else — add more papers before committing this, or expect a style that mostly describes one paper.`,
    );
  }

  return {
    itemStyle,
    questionsAnalysed: n,
    confidence,
    observations,
    problems,
  };
}
