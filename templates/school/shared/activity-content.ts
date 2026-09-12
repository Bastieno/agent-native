/**
 * The shapes a piece of work can take on screen.
 *
 * There are two different things a school might mean by "what kind of work is
 * this", and keeping them apart is the whole design:
 *
 *   `format`    what the school calls it — "vocabulary drill", "DBQ practice",
 *               "WAEC practical write-up". Free text. Unbounded. School data.
 *   `renderAs`  what it structurally IS on a screen. A small closed set.
 *
 * Ten pedagogical names collapse to a handful of structures: flashcards and
 * vocabulary drills are both front/back cards; worksheets, problem sets and
 * discussion questions are all ordered questions; compare/contrast tables,
 * formula references and timelines are all rows and columns. So a school
 * inventing a new kind of material costs no code at all — its blueprint just
 * says which shape it renders as.
 *
 * This file deliberately contains NO subject, no pedagogy, no prompts and no
 * opinion about which subject gets what. It is display structure, in the same
 * way a table component is not an opinion about data. That judgement lives in
 * the school's own activity blueprints, where a teacher can argue with it.
 *
 * Anything unrecognised falls back to prose, so content can never fail to
 * render — an activity written before a shape existed still shows up.
 */

export const RENDER_SHAPES = [
  "prose",
  "questions",
  "cards",
  "table",
  "steps",
  "criteria",
] as const;

export type RenderShape = (typeof RENDER_SHAPES)[number];

export const DEFAULT_SHAPE: RenderShape = "prose";

/** A numbered thing to answer: worksheet item, problem, discussion prompt. */
export type QuestionBlock = {
  prompt: string;
  /** Marks for this one, when the work carries marks at all. */
  points?: number;
  /** Shown on request — a nudge, not the answer. */
  hint?: string;
  /** Choices, when the question is closed rather than open. */
  options?: string[];
  /** Roughly how much room the learner needs: a word, a line, a paragraph. */
  answerSpace?: "short" | "long";
};

/** Two-sided practice: term/definition, question/answer, word/translation. */
export type CardBlock = {
  front: string;
  back: string;
  hint?: string;
};

/** One step of a procedure — a practical, a method, a set of instructions. */
export type StepBlock = {
  text: string;
  /** A caution or aside attached to this step. */
  note?: string;
};

/** One row of a comparison, reference or timeline. */
export type RowBlock = {
  cells: string[];
};

/** One thing the work is judged on. */
export type CriterionBlock = {
  description: string;
  maxPoints?: number;
  /** Optional named bands, best first. */
  levels?: { label: string; description?: string }[];
};

export type ActivityBlock =
  | QuestionBlock
  | CardBlock
  | StepBlock
  | RowBlock
  | CriterionBlock;

/**
 * The structured body of a variant, stored as JSON alongside the markdown.
 *
 * The markdown is kept as well, always: it is the fallback renderer, it is
 * what prints, and it means nothing is lost if a shape is later retired.
 */
export type ActivityContent = {
  shape: RenderShape;
  /** Column headings — `table` only. */
  columns?: string[];
  blocks: ActivityBlock[];
  /** Said once at the top, above the blocks. */
  preamble?: string;
};

export function isRenderShape(value: unknown): value is RenderShape {
  return (
    typeof value === "string" &&
    (RENDER_SHAPES as readonly string[]).includes(value)
  );
}

/**
 * Read whatever is stored and hand back something renderable, or null to mean
 * "no structured content — use the markdown".
 *
 * Tolerant on purpose. This parses rows written by earlier versions of the app
 * and by an agent that got a field slightly wrong; a learner must never meet a
 * blank page because one key was misspelled.
 */
export function parseActivityContent(
  raw: unknown,
  fallbackShape?: string | null,
): ActivityContent | null {
  let value = raw;
  if (typeof value === "string") {
    const text = value.trim();
    if (!text) return null;
    try {
      value = JSON.parse(text);
    } catch {
      return null;
    }
  }
  if (!value || typeof value !== "object") return null;

  const obj = value as Record<string, unknown>;
  const blocks = Array.isArray(obj.blocks) ? obj.blocks : null;
  if (!blocks || blocks.length === 0) return null;

  const shape = isRenderShape(obj.shape)
    ? obj.shape
    : isRenderShape(fallbackShape)
      ? fallbackShape
      : DEFAULT_SHAPE;

  return {
    shape,
    columns: Array.isArray(obj.columns)
      ? (obj.columns as unknown[]).map(String)
      : undefined,
    preamble: typeof obj.preamble === "string" ? obj.preamble : undefined,
    blocks: blocks.filter(
      (b): b is ActivityBlock => !!b && typeof b === "object",
    ),
  };
}

/**
 * What to call this shape's items when counting them, so the teacher's summary
 * reads "12 cards" rather than "12 blocks".
 */
export function blockNoun(shape: RenderShape, count: number): string {
  const nouns: Record<RenderShape, [string, string]> = {
    prose: ["section", "sections"],
    questions: ["question", "questions"],
    cards: ["card", "cards"],
    table: ["row", "rows"],
    steps: ["step", "steps"],
    criteria: ["criterion", "criteria"],
  };
  const [one, many] = nouns[shape] ?? nouns.prose;
  return count === 1 ? one : many;
}
