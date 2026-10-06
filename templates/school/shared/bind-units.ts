/**

 * Keep a measurement and its unit on the same line.
 *
 * The space in "65.0 cm³" is correct — SI writes a space between a number and
 * its unit, including before °C — and nothing in the app puts it there; it is
 * typed that way in the question. But an ordinary space is also a place the
 * browser may break a line, and on a worksheet it did: "65.0" ended one line
 * and "cm³" began the next, which reads as two separate things and is worse on
 * paper, where there is no reflowing it.
 *
 * So the space becomes a non-breaking one. Nothing looks different; the pair
 * simply moves to the next line together.
 *
 * Markdown text goes through the remark plugin that wraps this, so code,
 * inline code and `$LaTeX$` are left alone. The print renderer, which writes
 * question prompts and options as plain strings, calls it directly.
 */

/**
 * A short word that follows a number without being a unit. "Week 1 of 2" and
 * "3 to 4" would otherwise be bound together — harmless, but it is not what
 * this is for, and the list costs nothing.
 */
const NOT_UNITS = new Set([
  "a",
  "an",
  "and",
  "as",
  "at",
  "by",
  "for",
  "from",
  "in",
  "is",
  "of",
  "on",
  "or",
  "out",
  "per",
  "the",
  "to",
  "up",
  "was",
]);

/**
 * A number, a space, then something short enough to be a unit: letters, a
 * degree sign, a superscript. Anything longer is a word.
 */
const NUMBER_AND_UNIT =
  /(\d)[ \u00A0]([A-Za-zµΩ°][A-Za-z°²³/]{0,3})(?![A-Za-z])/gu;

export function bindUnits(value: string): string {
  return value.replace(NUMBER_AND_UNIT, (whole, digit, unit) =>
    NOT_UNITS.has(unit.toLowerCase()) ? whole : `${digit}\u00A0${unit}`,
  );
}
