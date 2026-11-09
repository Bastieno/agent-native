/**
 * Maths typed as plain text, where it should be written between dollar signs.
 *
 * The page sets `$2^5$` as a superscript and shows `2^5` as the five
 * characters it is. Nothing guesses at notation (a guesser for chemistry was
 * dropped for being wrong in both directions), so the agent has to mark it,
 * and a worksheet saved with "3^2" in a question reads as a typing slip.
 *
 * This finds two cases outside any `$...$` or backticks: a caret used as a
 * power, and Unicode superscript characters. The second looks
 * like notation and is not: ² and ³ come from one block of a font and ⁴ to ⁹
 * and ⁺ from another, so "a³ × a⁴" shows its 3 larger than its 4. Learners are told to type powers with ^ in their answers, so
 * the fields they type into (`instructions`, `answer`) are not looked at.
 */
const MARKED = /\$\$[\s\S]*?\$\$|\$[^$\n]+\$|`[^`\n]*`/g;
const POWER = /[A-Za-z0-9)\]]\^[-+(\w{]/;
/**
 * Superscripts outside the ¹²³ block, which no font sets consistently.
 * Subscripts (H₂O, 1011₂) are all in one block and draw alike, so they pass.
 */
const UNICODE_SCRIPT = /[⁰⁴-⁹⁺⁻⁼⁽⁾ⁿⁱ]/;
/** ¹²³ alone are ordinary in units ("12 m²"); in a sum they are maths. */
const LOW_SCRIPT = /[¹²³]/;
const SUM = /[=+×÷]/;
const COMMAND = /\\(?:frac|sqrt|times|div|cdot|ce)\b/;

/**
 * Whether this server builds demo schools from hand-written content, which was
 * written before this check and is full of plain powers. The local showcase
 * servers set `ALLOW_PLAIN_NOTATION` for that; a hosted school never does, so
 * the check always holds for what an agent writes there.
 */
export function plainNotationAllowed(): boolean {
  return (
    typeof process !== "undefined" &&
    ["1", "true"].includes(
      String(process.env?.ALLOW_PLAIN_NOTATION ?? "").toLowerCase(),
    )
  );
}

/** Fields whose text is what a learner reads, not what they are asked to type. */
const SKIP_KEYS = new Set([
  "answer",
  "acceptableAnswers",
  "instructions",
  "id",
  "shape",
]);

function collect(value: unknown, into: string[]) {
  if (typeof value === "string") into.push(value);
  else if (Array.isArray(value)) for (const v of value) collect(v, into);
  else if (value && typeof value === "object")
    for (const [k, v] of Object.entries(value))
      if (!SKIP_KEYS.has(k)) collect(v, into);
}

/** Short excerpts of text with a power, superscript or LaTeX command outside `$...$`. */
export function findUnmarkedNotation(...parts: unknown[]): string[] {
  const texts: string[] = [];
  for (const p of parts) collect(p, texts);
  const found: string[] = [];
  for (const text of texts) {
    const bare = text.replace(MARKED, " ");
    const script =
      UNICODE_SCRIPT.test(bare) || (LOW_SCRIPT.test(bare) && SUM.test(bare));
    if (!script && !POWER.test(bare) && !COMMAND.test(bare)) continue;
    const at = bare.search(
      new RegExp(
        `${POWER.source}|${COMMAND.source}|${UNICODE_SCRIPT.source}|${LOW_SCRIPT.source}`,
      ),
    );
    found.push(bare.slice(Math.max(0, at - 12), at + 18).trim());
  }
  return found;
}

/** What to tell the agent when it saved maths as plain text. */
export const unmarkedNotationMessage = (found: string[]) =>
  `Some maths is typed as plain text, so it would show as "${found[0]}" rather than as notation (superscript characters such as ³ and ⁴ count: they are set in different sizes). Write every power, fraction and root between dollar signs, for example $2^5$, $3^{x+1}$ and $\\frac{1}{2}$, then try again. Found ${found.length} place${found.length === 1 ? "" : "s"}, such as: ${found
    .slice(0, 3)
    .map((f) => `"${f}"`)
    .join(", ")}.`;
