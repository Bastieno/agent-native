/**
 * What an expense was for, from the text kept with it: the slip's narration
 * ("5 packs of chicken"), without the bank's reference tail or the account
 * it was paid from.
 */
const COUNT_WORDS =
  "packs?|pcs|pieces?|crates?|bags?|kg|kilos?|litres?|liters?|bottles?|cartons?|cans?|rolls?|tubers?|bundles?|boxes|box|dozens?|cylinders?|tins?|sachets?|loaves|plates?";
const S_FOR_5 = new RegExp(`(^|[\\s,(])S(?=\\s+(?:${COUNT_WORDS})\\b)`, "gi");

/** Undo text-recognition slips in a note: a 5 before a count word read as S ("S packs"). */
export function fixMisreads(note: string): string {
  return note.replace(S_FOR_5, "$15");
}

/** The note and the "· Paid from …" tail kept with an expense, with the note replaced. */
export function withNote(
  rawText: string | null | undefined,
  note: string,
): string {
  const text = (rawText ?? "").trim();
  const tail = /^Paid from\b/i.test(text)
    ? ` · ${text}`
    : (text.match(/ · Paid from.*$/)?.[0] ?? "");
  return `${note.trim()}${tail}`;
}

export function expenseNote(rawText: string | null | undefined): string | null {
  if (!rawText) return null;
  if (/^Paid from\b/i.test(rawText.trim())) return null;
  const note = rawText
    .split(" · Paid from")[0]
    .replace(/\s*Provider\s+Re\S*\s*\S*.*$/i, "")
    .replace(/^[ГT]or\b/, "For")
    .trim();
  return note ? fixMisreads(note) : null;
}
