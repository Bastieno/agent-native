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
  /**
   * How the learner answers. "drawing" gives them a page to write on with a
   * stylus, "both" gives them that and a box for the final value — which is
   * what most mathematics wants, since the method carries most of the marks.
   * Defaults to typing.
   */
  answerMode?: "text" | "drawing" | "both";
  /**
   * Time allowed on this question alone, counted from when it was served to
   * this learner. Questions in the same paper can differ — a recall question
   * is not a multi-step problem.
   */
  durationSeconds?: number;

  // ── Marking. Never sent to a learner; see `forLearner` below. ────────────

  /**
   * The correct answer. For a choice question this is the zero-based index of
   * the right option, or its letter. For a number or short text question it is
   * the value itself.
   */
  answer?: string | number;
  /** Other answers that should also be accepted — "0.5", "1/2", "a half". */
  acceptableAnswers?: string[];
  /**
   * How an open question earns its marks: what each mark is for, what partial
   * credit looks like, and the misconceptions to expect. This is what makes
   * marking defensible rather than a guess, and it is drafted with the
   * question so the teacher can correct it before anyone sits the paper.
   */
  markScheme?: string;
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

/** Fields on a block that would give the answer away. */
const MARKING_FIELDS = ["answer", "acceptableAnswers", "markScheme"] as const;

/**
 * The same content, with everything that gives the answer away removed.
 *
 * This is not presentation, it is a boundary. The structured body is sent to
 * the learner's own browser, so anything left in it can be read from the
 * network tab by any pupil curious enough to look — an answer key included.
 * Every path that returns content to a learner must go through here.
 */
export function forLearner(
  content: ActivityContent | null,
): ActivityContent | null {
  if (!content) return null;
  return {
    ...content,
    blocks: content.blocks.map((block) => {
      const copy: Record<string, unknown> = { ...(block as object) };
      for (const field of MARKING_FIELDS) delete copy[field];
      return copy as ActivityBlock;
    }),
  };
}

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
