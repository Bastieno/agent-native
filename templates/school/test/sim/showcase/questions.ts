import { rng } from "../population.js";
import type { LibraryObjective } from "./curriculum.js";

/**
 * Questions for any subject, written from the library objectives the week
 * teaches. No model is called: a run is free and the same every time.
 *
 * Three kinds:
 * - a recall question: which of four terms belongs to this week's topic, the
 *   wrong ones drawn from other topics of the same subject;
 * - an open question built on the objective, with a mark scheme of one mark
 *   per idea it names and the ideas a full answer contains;
 * - for Mathematics, Further Mathematics and Financial Accounting, worked
 *   calculations whose answers are computed, so they mark themselves.
 */

export type Question = {
  prompt: string;
  points: number;
  options?: string[];
  answer?: string;
  markScheme?: string;
  answerSpace?: "short" | "long";
  durationSeconds?: number;
  /** What a full answer says, one idea per entry. Never sent to the app. */
  ideas?: string[];
  /** The week's topic, for the learner's own sentences. Never sent. */
  topic?: string;
};

/** What the app is sent for a question: the simulation's own notes stripped. */
export function toBlock(q: Question) {
  const { ideas: _ideas, topic: _topic, ...block } = q;
  return block;
}

const VERB_WORDS =
  "identify|produce|contrast|describe|explain|define|state|list|discuss|classify|distinguish|compare|measure|apply|use|demonstrate|recogni[sz]e|analy[sz]e|evaluate|outline|name|write|read|solve|calculate|construct|draw|prepare|perform|create|understand|know|show|differentiate|relate|interpret|examine|mention|give|observe|practi[sc]e|appreciate|maintain|operate|plan|conduct|carry out|care for|keep|raise|feed|sing|play|design|make|build|speak|listen|recite|investigate|determine|convert|estimate|express|find|simplify|add|subtract|multiply|divide|round|collect|record|present|select|handle|participate|develop|explore|summari[sz]e|translate|pronounce|tell|retell|narrate|locate|trace|assess|manage|identify";
const VERBS = new RegExp(`^(${VERB_WORDS})\\b`, "i");
const LEADING_VERB = new RegExp(`^(${VERB_WORDS})\\s+`, "i");

/**
 * Short noun phrases an objective names: "length", "SI units", "double entry".
 * Only the opening phrase is sentence-cased by the syllabus, so only it is
 * lower-cased, and not when it is an acronym or a name ("African Prose").
 */
export function keyTerms(description: string): string[] {
  const parts = description
    .replace(/e\.g\.|i\.e\./gi, ",")
    .split(
      /[,;:()\u2013\u2014]|\band\b|\bor\b|\bincluding\b|\bsuch as\b|\bin\b|\bwith\b|\busing\b|\bfor\b/i,
    )
    .map((s, index) => {
      let t = s.trim().replace(/[.\s]+$/, "");
      t = t
        .replace(/\s+(should|must|to be)\b.*$/i, "")
        .replace(new RegExp(`\\s+to\\s+(${VERB_WORDS})\\b.*$`, "i"), "");
      for (let i = 0; i < 3; i++) {
        t = t
          .replace(
            /^(the|a|an|of|to|their|its|simple|basic|different|various|namely|between|how)\s+/i,
            "",
          )
          .replace(LEADING_VERB, "");
      }
      t = t.trim();
      const opening =
        index === 0 &&
        /^[A-Z][a-z]/.test(t) &&
        !/^\S+\s+[A-Z]/.test(t) &&
        !/^(Nigeria|Nigerian|African|West|Yoruba|Igbo|Hausa|English|Christian|Islamic)/.test(
          t,
        );
      return opening ? t.charAt(0).toLowerCase() + t.slice(1) : t;
    })
    .filter((s) => s.length >= 3 && s.length <= 40)
    .filter((s) => s.split(/\s+/).length <= 5)
    .filter((s) => !VERBS.test(s))
    .filter((s) => /[a-z]{3}/i.test(s));
  return [...new Set(parts)];
}

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** The open-question prompt an objective makes. */
function openPrompt(o: LibraryObjective): string {
  const text = o.description.trim().replace(/\.$/, "");
  if (VERBS.test(text)) return `${text}.`;
  return `Write short notes on the following: ${text.charAt(0).toLowerCase()}${text.slice(1)}.`;
}

/** One recall question, or none when the subject has too few other topics. */
export function recallQuestion(
  objective: LibraryObjective,
  others: LibraryObjective[],
  seed: number,
): Question | null {
  const random = rng(seed);
  const terms = keyTerms(objective.description);
  if (!terms.length) return null;
  const right = terms[Math.floor(random() * terms.length)];
  const pool = [
    ...new Set(
      others
        .filter((o) => o.subStrand !== objective.subStrand)
        .flatMap((o) => keyTerms(o.description))
        .filter((t) => !terms.includes(t)),
    ),
  ];
  if (pool.length < 3) return null;
  const wrong: string[] = [];
  while (wrong.length < 3) {
    const pick = pool[Math.floor(random() * pool.length)];
    if (!wrong.includes(pick)) wrong.push(pick);
  }
  const options = [right, ...wrong].map(cap);
  // Shuffle, keeping track of where the right one went.
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }
  const at = options.indexOf(cap(right));
  return {
    prompt: `Which of these is studied under "${objective.subStrand}"?`,
    points: 1,
    options,
    answer: String.fromCharCode(65 + at),
    durationSeconds: 60,
  };
}

/** One open question on an objective, worth one mark per idea. */
export function openQuestion(
  objective: LibraryObjective,
  maxIdeas = 3,
): Question {
  const terms = keyTerms(objective.description).slice(0, maxIdeas);
  const ideas = terms.length ? terms : [objective.subStrand.toLowerCase()];
  return {
    prompt: openPrompt(objective),
    points: ideas.length,
    answerSpace: "long",
    markScheme: ideas
      .map(
        (t, i) =>
          `(${String.fromCharCode(97 + i)}) 1 mark: explains ${t} correctly, in the learner's own words`,
      )
      .join("; "),
    ideas,
    topic: objective.subStrand,
  };
}

const naira = (n: number) => n.toLocaleString("en-NG");

/** A calculation whose answer is worked out here, with three near misses. */
export function calculation(subject: string, seed: number): Question {
  const random = rng(seed);
  const int = (lo: number, hi: number) =>
    lo + Math.floor(random() * (hi - lo + 1));
  let prompt: string;
  let value: number;
  let near: number[];
  const kind = int(0, 3);
  if (subject === "Financial Accounting") {
    const capital = int(20, 90) * 10_000;
    const liabilities = int(5, 15) * 10_000;
    if (kind % 2 === 0) {
      prompt = `A trader in Bodija market starts business with capital of ₦${naira(capital)} and liabilities of ₦${naira(liabilities)}. What are the total assets?`;
      value = capital + liabilities;
      near = [capital - liabilities, capital, value + 10_000];
    } else {
      const sales = int(30, 80) * 10_000;
      const cost = int(15, 28) * 10_000;
      prompt = `Sales for the month were ₦${naira(sales)} and the cost of goods sold was ₦${naira(cost)}. What is the gross profit?`;
      value = sales - cost;
      near = [sales + cost, value + 5_000, value - 10_000];
    }
    const options = [value, ...near].map((v) => `₦${naira(v)}`);
    return shuffle(prompt, options, 0, random);
  }
  if (kind === 0) {
    const a = int(1200, 9800);
    const b = int(1100, 8900);
    prompt = `Work out ${naira(a)} + ${naira(b)}.`;
    value = a + b;
    near = [value + 100, value - 10, value + 1000];
  } else if (kind === 1) {
    const x = int(2, 15);
    const m = int(2, 9);
    const c = int(1, 20);
    prompt = `Solve for x: ${m}x + ${c} = ${m * x + c}.`;
    value = x;
    near = [x + 1, x - 1, x + 2];
  } else if (kind === 2) {
    const p = [5, 10, 15, 20, 25][int(0, 4)];
    const n = int(4, 60) * 100;
    prompt = `Find ${p}% of ${naira(n)}.`;
    value = (p * n) / 100;
    near = [value * 2, value / 2, value + p];
  } else {
    const l = int(3, 20);
    const w = int(2, 15);
    prompt = `A rectangular plot is ${l} m long and ${w} m wide. What is its area in square metres?`;
    value = l * w;
    near = [2 * (l + w), value + l, value - w];
  }
  if (subject === "Further Mathematics" && kind === 1) {
    const a = int(2, 6);
    const b = int(2, 6);
    prompt = `Find the value of ${a}² + ${b}³.`;
    value = a * a + b * b * b;
    near = [a * 2 + b * 3, value + 1, value - a];
  }
  const options = [
    ...new Set([value, ...near].map((v) => naira(Math.round(v * 100) / 100))),
  ];
  while (options.length < 4) options.push(naira(value + options.length * 7));
  return shuffle(prompt, options.slice(0, 4), 0, random);
}

function shuffle(
  prompt: string,
  options: string[],
  right: number,
  random: () => number,
): Question {
  const tagged = options.map((o, i) => ({ o, right: i === right }));
  for (let i = tagged.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [tagged[i], tagged[j]] = [tagged[j], tagged[i]];
  }
  return {
    prompt,
    points: 1,
    options: tagged.map((t) => t.o),
    answer: String.fromCharCode(65 + tagged.findIndex((t) => t.right)),
    durationSeconds: 90,
  };
}

/** A worked problem with method marks, for problem sets in the numerate subjects. */
export function workedProblem(subject: string, seed: number): Question {
  const random = rng(seed);
  const int = (lo: number, hi: number) =>
    lo + Math.floor(random() * (hi - lo + 1));
  if (subject === "Financial Accounting") {
    const opening = int(10, 40) * 1000;
    const receipts = int(20, 60) * 1000;
    const payments = int(10, 30) * 1000;
    return {
      prompt: `A cash book opens with a balance of ₦${naira(opening)}. Receipts for the week are ₦${naira(receipts)} and payments ₦${naira(payments)}. Calculate the closing balance, showing your working.`,
      points: 3,
      answerSpace: "long",
      markScheme: `(a) 1 mark: adds the receipts to the opening balance; (b) 1 mark: subtracts the payments; (c) 1 mark: closing balance ₦${naira(opening + receipts - payments)}`,
      ideas: [
        "adds the receipts to the opening balance",
        "subtracts the payments",
        `closing balance is ₦${naira(opening + receipts - payments)}`,
      ],
      topic: "the cash book",
    };
  }
  const price = int(150, 900);
  const qty = int(12, 48);
  const discount = [5, 10, 15][int(0, 2)];
  const total = price * qty;
  const paid = total - (total * discount) / 100;
  return {
    prompt: `A school buys ${qty} exercise books at ₦${naira(price)} each and is given a ${discount}% discount. How much does the school pay? Show your working.`,
    points: 3,
    answerSpace: "long",
    markScheme: `(a) 1 mark: total before discount ₦${naira(total)}; (b) 1 mark: discount ₦${naira((total * discount) / 100)}; (c) 1 mark: amount paid ₦${naira(paid)}`,
    ideas: [
      `the total before discount is ₦${naira(total)}`,
      `the discount is ₦${naira((total * discount) / 100)}`,
      `the school pays ₦${naira(paid)}`,
    ],
    topic: "percentages",
  };
}

export const NUMERATE = new Set([
  "Mathematics",
  "Further Mathematics",
  "Financial Accounting",
]);

/**
 * The questions for one piece of work: `recall` closed questions and `open`
 * open ones from the week's objectives, numerate subjects mixing in
 * calculations.
 */
export function questionsFor(
  subject: string,
  week: LibraryObjective[],
  all: LibraryObjective[],
  seed: number,
  recall: number,
  open: number,
): Question[] {
  const out: Question[] = [];
  const numerate = NUMERATE.has(subject);
  for (let i = 0; i < recall; i++) {
    if (numerate && i % 2 === 0) {
      out.push(calculation(subject, seed + i * 17));
      continue;
    }
    const objective = week[i % week.length];
    const q =
      recallQuestion(objective, all, seed + i * 31) ??
      (numerate ? calculation(subject, seed + i * 19) : null);
    if (q) out.push(q);
  }
  for (let i = 0; i < open; i++) {
    out.push(
      numerate && i === 0
        ? workedProblem(subject, seed + i * 13)
        : openQuestion(week[(i + 1) % week.length]),
    );
  }
  return out;
}

/**
 * What a learner writes for an open question: the ideas they manage, in
 * sentences of their own, and a hedge when they run out.
 */
export function writeOpenAnswer(
  q: Question,
  ability: number,
  seed: number,
): { text: string; covered: string[] } {
  const random = rng(seed);
  const ideas = q.ideas ?? [];
  const share = Math.min(1, Math.max(0, ability + (random() - 0.5) * 0.35));
  const count = Math.round(ideas.length * share);
  const covered = ideas.slice(0, count);
  const topic = (q.topic ?? "the topic").toLowerCase();
  const frames = [
    (t: string) =>
      `${cap(t)} is part of ${topic}, and we used it in class this week.`,
    (t: string) => `For ${t}, the main point is how it fits into ${topic}.`,
    (t: string) => `${cap(t)}: I would explain it with an example from home.`,
  ];
  const sentences = covered.map((t, i) =>
    /^(adds|subtracts|the |closing)/i.test(t)
      ? `${cap(t)}.`
      : frames[(i + Math.floor(random() * 3)) % 3](t),
  );
  if (!sentences.length)
    sentences.push(
      `We learnt about ${topic} but I cannot remember the details.`,
    );
  if (count < ideas.length)
    sentences.push(
      count === 0 ? "I am not sure." : "I am not sure about the rest.",
    );
  return { text: sentences.join(" "), covered };
}

/** A few strokes of handwritten working, as the drawing pad stores them. */
export function handwriting(seed: number) {
  const random = rng(seed);
  const strokes = Array.from(
    { length: 6 + Math.floor(random() * 6) },
    (_, line) => {
      const y = 30 + line * 28;
      const p: number[] = [];
      let x = 20;
      while (x < 360) {
        p.push(Math.round(x), Math.round(y + (random() - 0.5) * 10));
        x += 8 + random() * 14;
      }
      return { p };
    },
  );
  return { v: 1 as const, width: 400, height: 320, strokes };
}
