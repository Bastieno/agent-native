/**
 * A stored style, said in words the drafter can act on.
 *
 * The style is kept as numbers — a median stem length, a negation rate, an
 * option count — because that is what reading a few hundred past papers
 * produces. Numbers are not instructions, though, and "negationRatePct: 12"
 * tells whoever is writing the questions nothing about what to do. This turns
 * the record into lines that can be followed.
 *
 * Two rules are carried in the wording itself, because they are the ones most
 * easily lost:
 *
 * - **It governs the asking, never the asked.** What a question covers comes
 *   from the curriculum, and how many there are from whoever set the work. A
 *   style that starts deciding scope has overstepped.
 * - **A paper shape is for a paper.** Fifty questions and fifty minutes
 *   describe a mock exam; applying them to a Friday exercise of six questions
 *   would be absurd, so the shape is only rendered when a mock is asked for.
 */

export type ItemStyle = {
  optionCount?: number;
  stemLengthChars?: { median?: number; p90?: number };
  opensWith?: string[];
  commandVerbs?: string[];
  negationRatePct?: number;
  negationWords?: string[];
  answerSpread?: string;
  optionShape?: string;
  mathsNotation?: string;
  calculatorAssumed?: boolean;
  constantsGiven?: string;
  sharedInstruction?: string;
};

export type PaperShape = Record<
  string,
  {
    questions?: number;
    minutes?: number;
    marksPerQuestion?: number;
    calculator?: boolean;
  }
>;

export function parseStyle(json: string | null | undefined): ItemStyle {
  if (!json) return {};
  try {
    const v = JSON.parse(json);
    return v && typeof v === "object" ? (v as ItemStyle) : {};
  } catch {
    return {};
  }
}

/** The house habits, as lines to follow when writing the questions. */
export function styleGuidance(
  styleName: string,
  item: ItemStyle,
  opts: { isSample?: boolean } = {},
): string[] {
  const lines: string[] = [];

  if (item.optionCount) {
    lines.push(
      `Multiple-choice questions have exactly ${item.optionCount} options here, labelled A–${String.fromCharCode(64 + item.optionCount)}.`,
    );
  }
  if (item.stemLengthChars?.median) {
    const { median, p90 } = item.stemLengthChars;
    lines.push(
      `Questions run about ${median} characters — a sentence${
        p90 ? `, and rarely past ${p90}` : ""
      }.`,
    );
  }
  if (item.opensWith?.length) {
    lines.push(`They usually open: ${item.opensWith.join(" / ")}.`);
  }
  if (item.commandVerbs?.length) {
    lines.push(
      `The working verbs are ${item.commandVerbs.join(", ")} — prefer these over synonyms.`,
    );
  }
  if (typeof item.negationRatePct === "number" && item.negationRatePct > 0) {
    const inN = Math.max(2, Math.round(100 / item.negationRatePct));
    lines.push(
      `About one question in ${inN} is negated${
        item.negationWords?.length ? ` (${item.negationWords.join(", ")})` : ""
      } — enough to be characteristic, not every other question.`,
    );
  }
  if (item.optionShape) lines.push(`Options: ${item.optionShape}.`);
  if (item.answerSpread) {
    lines.push(
      `Correct answers sit ${item.answerSpread} — do not favour one letter.`,
    );
  }
  if (item.sharedInstruction) {
    lines.push(`Note: ${item.sharedInstruction}.`);
  }
  if (item.mathsNotation && item.mathsNotation !== "none") {
    lines.push(`Mathematics: ${item.mathsNotation}.`);
  }
  if (item.calculatorAssumed === false) {
    lines.push(
      "No calculator is assumed, so the arithmetic must be doable by hand.",
    );
  }
  if (item.constantsGiven) {
    // The stored values read as fragments; a line of guidance should not.
    const t = item.constantsGiven.trim();
    lines.push(`${t.charAt(0).toUpperCase()}${t.slice(1)}.`);
  }

  if (lines.length === 0) return [];

  lines.push(
    `This is how ${styleName} words questions. It governs the wording only — what is asked comes from the curriculum, and how much from whoever set the work.`,
  );
  if (opts.isSample) {
    lines.push(
      "It is a sample shipped with the app; a style read from this school's own past papers would fit better.",
    );
  }
  return lines;
}

/** The shape of a full paper — only when someone is asking for a mock. */
export function paperGuidance(
  styleName: string,
  shape: PaperShape | null,
): string[] {
  if (!shape) return [];
  const lines: string[] = [];
  for (const [kind, s] of Object.entries(shape)) {
    const bits: string[] = [];
    if (s.questions) bits.push(`${s.questions} questions`);
    if (s.minutes) bits.push(`${s.minutes} minutes`);
    if (s.marksPerQuestion) bits.push(`${s.marksPerQuestion} mark each`);
    if (s.calculator === false) bits.push("no calculator");
    if (s.calculator === true) bits.push("calculator allowed");
    if (bits.length) lines.push(`${styleName} ${kind}: ${bits.join(", ")}.`);
  }
  return lines;
}
