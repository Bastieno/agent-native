import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { rng } from "../population.js";
import type { Question } from "./questions.js";

/**
 * The showcase's written content: for every subject and year group, each
 * teaching week's lesson note, reading, cards, questions with mark schemes
 * and model answers, and what learners of different abilities write back,
 * with the marks and feedback each answer earns.
 *
 * Written once and checked in (test/fixtures/showcase/), so a run calls no
 * model and builds the same school every time. The format and the standard
 * it is written to are in test/fixtures/showcase/README.md. A week with no
 * written content falls back to the generator in questions.ts.
 */

export const CONTENT_DIR = join("test", "fixtures", "showcase");

export type Tier = "full" | "partial" | "weak";

export type ClosedQuestion = {
  prompt: string;
  options: string[];
  /** The right option's letter. */
  answer: string;
  hint?: string;
};

/** One learner's written answer to an open question, and how it is marked. */
export type WrittenAnswer = {
  tier: Tier;
  text: string;
  /** The mark-scheme points this answer earns, each with the words that earn it. */
  meets: { point: number; quote: string }[];
  /** What the teacher writes back to this learner on this question. */
  feedback: string;
  /** An answer a careful marker would want a second look at. */
  unsure?: boolean;
};

export type OpenQuestion = {
  prompt: string;
  /** One mark per point; the question is worth as many marks as there are points. */
  markScheme: string[];
  modelAnswer: string;
  answers: WrittenAnswer[];
};

export type WriteUp = {
  tier: Tier;
  text: string;
  /** Marks for each rubric criterion, in order. */
  scores: number[];
  feedback: string;
};

export type Practical = {
  title: string;
  instructions: string;
  steps: { text: string; note?: string }[];
  rubric: { description: string; maxPoints: number }[];
  writeUps: WriteUp[];
};

export type WeekContent = {
  topic: string;
  lessonNote: string;
  reading: { title: string; content: string };
  cards: { front: string; back: string }[];
  closed: ClosedQuestion[];
  open: OpenQuestion[];
  practical?: Practical;
};

export type SubjectContent = {
  subject: string;
  yearGroup: string;
  weeks: Record<string, WeekContent>;
};

/** The file a subject and year group's content lives in. */
export function contentFile(subject: string, yearGroup: string): string {
  const slug = `${subject}-${yearGroup}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return join(CONTENT_DIR, `${slug}.json`);
}

const cache = new Map<string, SubjectContent | null>();

/** Everything written for a subject and year group, or null if nothing is. */
export function contentFor(
  subject: string,
  yearGroup: string,
): SubjectContent | null {
  const file = contentFile(subject, yearGroup);
  if (!cache.has(file))
    cache.set(
      file,
      existsSync(file) ? JSON.parse(readFileSync(file, "utf8")) : null,
    );
  return cache.get(file)!;
}

export function weekContent(
  subject: string,
  yearGroup: string,
  week: number,
): WeekContent | null {
  return contentFor(subject, yearGroup)?.weeks[String(week)] ?? null;
}

/** Every content file there is, for the check. */
export function allContent(): { file: string; content: SubjectContent }[] {
  if (!existsSync(CONTENT_DIR)) return [];
  return readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".json") && f !== "plan.json")
    .map((f) => ({
      file: join(CONTENT_DIR, f),
      content: JSON.parse(readFileSync(join(CONTENT_DIR, f), "utf8")),
    }));
}

// ── Turning written content into questions the run sets ──────────────────

const letters = (n: number) => String.fromCharCode(97 + n);

/** The mark scheme as the app stores it: one mark a point, lettered. */
export function schemeText(q: OpenQuestion): string {
  return q.markScheme.map((p, i) => `(${letters(i)}) 1 mark: ${p}`).join("; ");
}

export function closedToQuestion(q: ClosedQuestion, seconds = 60): Question {
  return {
    prompt: q.prompt,
    points: 1,
    options: q.options,
    answer: q.answer,
    ...(q.hint ? { hint: q.hint } : {}),
    durationSeconds: seconds,
  } as Question;
}

export function openToQuestion(q: OpenQuestion): Question {
  return {
    prompt: q.prompt,
    points: q.markScheme.length,
    answerSpace: "long",
    markScheme: schemeText(q),
    modelAnswer: q.modelAnswer,
  } as Question;
}

export type PaperKind =
  | "worksheet"
  | "quiz"
  | "problem set"
  | "foundational"
  | "developing"
  | "advanced";

/** Which of a week's questions each kind of paper is made from. */
export function paperFrom(week: WeekContent, kind: PaperKind): Question[] {
  const c = week.closed.map((q) => closedToQuestion(q));
  const o = week.open.map(openToQuestion);
  switch (kind) {
    case "quiz":
      return c.slice(0, 5);
    case "problem set":
      return [...c.slice(3, 5), ...o.slice(0, 2)];
    case "foundational":
      return c.slice(0, 4);
    case "advanced":
      return [...c.slice(2, 5), ...o.slice(0, 2)];
    case "worksheet":
    case "developing":
    default:
      return [...c.slice(0, 3), ...o.slice(0, 1)];
  }
}

// ── What a learner writes, and how it is marked ──────────────────────────

/** How able a learner is on the day decides which kind of answer they write. */
export function tierFor(ability: number, seed: number): Tier {
  const day = ability + (rng(seed)() - 0.5) * 0.2;
  return day >= 0.72 ? "full" : day >= 0.42 ? "partial" : "weak";
}

function pick<T extends { tier: Tier }>(
  options: T[],
  tier: Tier,
  seed: number,
): T | undefined {
  const order: Tier[] =
    tier === "full"
      ? ["full", "partial", "weak"]
      : tier === "partial"
        ? ["partial", "weak", "full"]
        : ["weak", "partial", "full"];
  for (const t of order) {
    const these = options.filter((a) => a.tier === t);
    if (these.length) return these[Math.abs(seed) % these.length];
  }
  return undefined;
}

/**
 * Every written answer and practical write-up, by question and text, so the
 * marker can find what the learner's words were written to earn.
 */
const byText = new Map<string, WrittenAnswer>();
const writeUpsByText = new Map<string, WriteUp>();

const key = (prompt: string, text: string) => `${prompt}\u0000${text.trim()}`;

/** The answer a learner of this ability writes to an open question. */
export function writtenAnswer(
  q: OpenQuestion,
  ability: number,
  seed: number,
): WrittenAnswer | undefined {
  const chosen = pick(q.answers, tierFor(ability, seed), seed);
  if (chosen) byText.set(key(q.prompt, chosen.text), chosen);
  return chosen;
}

/** What a written answer earns, looked up from the words handed in. */
export function markFor(
  prompt: string,
  text: string,
): WrittenAnswer | undefined {
  return byText.get(key(prompt, text));
}

export function writeUpFor(
  p: Practical,
  ability: number,
  seed: number,
): WriteUp | undefined {
  const chosen = pick(p.writeUps, tierFor(ability, seed), seed);
  if (chosen) writeUpsByText.set(key(p.title, chosen.text), chosen);
  return chosen;
}

export function writeUpMark(title: string, text: string): WriteUp | undefined {
  return writeUpsByText.get(key(title, text));
}

/** The open questions behind a week's papers, by prompt, for sitting them. */
export function openByPrompt(
  weeks: (WeekContent | null)[],
): Map<string, OpenQuestion> {
  const map = new Map<string, OpenQuestion>();
  for (const w of weeks) for (const q of w?.open ?? []) map.set(q.prompt, q);
  return map;
}
