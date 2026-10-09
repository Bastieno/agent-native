/**
 * The edits a formatting button makes to markdown text.
 *
 * Lesson notes are stored as markdown because the agent writes them, the print
 * view renders them and students read them — but a teacher should not have to
 * know that. These turn "make this a bullet list" into the characters that
 * mean it, so the syntax is something the app types rather than something the
 * teacher learns.
 *
 * Every edit toggles: pressing bold on bold text takes it off. A teacher who
 * presses the wrong button gets their text back by pressing it again, which is
 * the only forgiving behaviour when the buttons are unfamiliar.
 *
 * Kept apart from the component so the rules can be read, and reasoned about,
 * without a browser.
 */

export type TextEdit = {
  /** The whole new value. */
  text: string;
  /** Where the selection should sit afterwards. */
  selectionStart: number;
  selectionEnd: number;
};

/** Wrap or unwrap the selection — bold, italic. */
export function toggleWrap(
  text: string,
  start: number,
  end: number,
  marker: string,
): TextEdit {
  const selected = text.slice(start, end);
  const before = text.slice(0, start);
  const after = text.slice(end);

  // Already wrapped, inside the selection: take it off.
  if (
    selected.length >= marker.length * 2 &&
    selected.startsWith(marker) &&
    selected.endsWith(marker)
  ) {
    const inner = selected.slice(
      marker.length,
      selected.length - marker.length,
    );
    return {
      text: before + inner + after,
      selectionStart: start,
      selectionEnd: start + inner.length,
    };
  }

  // Already wrapped, just outside the selection: take it off there.
  if (before.endsWith(marker) && after.startsWith(marker)) {
    return {
      text:
        before.slice(0, before.length - marker.length) +
        selected +
        after.slice(marker.length),
      selectionStart: start - marker.length,
      selectionEnd: end - marker.length,
    };
  }

  // Nothing selected: leave the cursor between the markers, ready to type.
  if (start === end) {
    return {
      text: before + marker + marker + after,
      selectionStart: start + marker.length,
      selectionEnd: start + marker.length,
    };
  }

  return {
    text: before + marker + selected + marker + after,
    selectionStart: start + marker.length,
    selectionEnd: end + marker.length,
  };
}

/** The bounds of every line the selection touches, even partly. */
function lineRange(text: string, start: number, end: number) {
  const from = text.lastIndexOf("\n", start - 1) + 1;
  const nextBreak = text.indexOf("\n", end);
  const to = nextBreak === -1 ? text.length : nextBreak;
  return { from, to };
}

/**
 * Put a prefix on each line the selection touches, or take it off when every
 * line already has it.
 *
 * `prefixFor` receives the line's position so a numbered list can count.
 */
export function toggleLinePrefix(
  text: string,
  start: number,
  end: number,
  prefixFor: (index: number) => string,
  matches: RegExp,
): TextEdit {
  const { from, to } = lineRange(text, start, end);
  const lines = text.slice(from, to).split("\n");
  const allPrefixed = lines.every((l) => l.trim() === "" || matches.test(l));

  const next = lines
    .map((line, i) => {
      if (line.trim() === "") return line;
      if (allPrefixed) return line.replace(matches, "");
      // Never stack one line marker on another: a numbered item turned into a
      // bullet becomes "- solid", not "- 1. solid". Any existing marker goes,
      // whichever kind it is, because these are alternatives to each other.
      return prefixFor(i) + line.replace(ANY_LINE_PREFIX, "");
    })
    .join("\n");

  const block = text.slice(0, from) + next + text.slice(to);
  return {
    text: block,
    selectionStart: from,
    selectionEnd: from + next.length,
  };
}

export const BULLET = /^\s*[-*+]\s+/;
/** Any line marker — one replaces another rather than nesting inside it. */
const ANY_LINE_PREFIX = /^\s*(?:[-*+]\s+|\d+\.\s+|#{1,6}\s+)/;
export const NUMBERED = /^\s*\d+\.\s+/;
export const HEADING = /^#{1,6}\s+/;
