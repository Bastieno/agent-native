import { writeFileSync } from "node:fs";
import { join } from "node:path";
import type { SubjectContent, Tier, WeekContent } from "./content.js";

/**
 * A shorter way to write a course's content than the JSON it ends up as.
 *
 * A learner's answer is written once, with the words that earn each mark
 * wrapped in [[point|words]]; the markers are taken out of the text and the
 * `meets` list is built from them, so a quote can never drift from the answer
 * it belongs to. Everything else is the same as the JSON: see
 * test/fixtures/showcase-yellowview/README.md for the standard.
 *
 *   tsx test/fixtures/showcase-yellowview/src/algebra-i-grade-9.ts
 *
 * writes test/fixtures/showcase-yellowview/algebra-i-grade-9.json.
 */

/** [tier, text with [[point|words]] markers, the teacher's feedback, unsure?] */
export type AnswerInput = [Tier, string, string, boolean?];

export type OpenInput = {
  prompt: string;
  /** One point per mark, 2 to 6. */
  scheme: string[];
  model: string;
  /** Six answers: two full, two partial, two weak. */
  answers: AnswerInput[];
};

export type PracticalInput = {
  title: string;
  instructions: string;
  /** [step, caution?] */
  steps: [string, string?][];
  /** [criterion, max points] */
  rubric: [string, number][];
  /** [tier, text, one score per criterion, feedback] */
  writeUps: [Tier, string, number[], string][];
};

export type WeekInput = {
  topic: string;
  note: string;
  reading: [string, string];
  /** [front, back], 6 to 10. */
  cards: [string, string][];
  /** [prompt, [A, B, C, D], answer letter], 5. */
  closed: [string, [string, string, string, string], "A" | "B" | "C" | "D"][];
  /** Two. */
  open: OpenInput[];
  practical?: PracticalInput;
};

const MARK = /\[\[(\d+)\|(.+?)\]\]/g;

function answer([tier, raw, feedback, unsure]: AnswerInput) {
  const meets: { point: number; quote: string }[] = [];
  const text = raw.replace(MARK, (_m, point: string, words: string) => {
    meets.push({ point: Number(point), quote: words });
    return words;
  });
  return {
    tier,
    text,
    meets,
    feedback,
    ...(unsure ? { unsure: true } : {}),
  };
}

function week(w: WeekInput): WeekContent {
  return {
    topic: w.topic,
    lessonNote: w.note.trim(),
    reading: { title: w.reading[0], content: w.reading[1].trim() },
    cards: w.cards.map(([front, back]) => ({ front, back })),
    closed: w.closed.map(([prompt, options, ans]) => ({
      prompt,
      options,
      answer: ans,
    })),
    open: w.open.map((o) => ({
      prompt: o.prompt,
      markScheme: o.scheme,
      modelAnswer: o.model.trim(),
      answers: o.answers.map(answer),
    })),
    ...(w.practical
      ? {
          practical: {
            title: w.practical.title,
            instructions: w.practical.instructions.trim(),
            steps: w.practical.steps.map(([text, note]) => ({
              text,
              ...(note ? { note } : {}),
            })),
            rubric: w.practical.rubric.map(([description, maxPoints]) => ({
              description,
              maxPoints,
            })),
            writeUps: w.practical.writeUps.map(
              ([tier, text, scores, feedback]) => ({
                tier,
                text: text.trim(),
                scores,
                feedback,
              }),
            ),
          },
        }
      : {}),
  };
}

/** Write a course's JSON next to the other content files. */
export function writeCourse(
  file: string,
  subject: string,
  yearGroup: string,
  weeks: Record<number, WeekInput>,
  dir = join("test", "fixtures", "showcase-yellowview"),
) {
  const content: SubjectContent = {
    subject,
    yearGroup,
    weeks: Object.fromEntries(
      Object.entries(weeks).map(([n, w]) => [n, week(w)]),
    ),
  };
  writeFileSync(join(dir, file), `${JSON.stringify(content, null, 1)}\n`);
  console.log(`${file}: ${Object.keys(weeks).length} weeks written`);
}
