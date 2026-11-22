import { correctNote } from "../../shared/note-words.js";

/**
 * What an expense was for, from the text kept with it (raw_text):
 *
 *   <the slip's narration, line breaks kept> · Paid from <account>[ · …]
 *
 * The narration is stored as it was read off the slip and corrected only when
 * shown, so the reading is never lost and corrections can improve. A note the
 * owner wrote or corrected carries OWNER_MARK and is shown exactly as written.
 */
export const OWNER_MARK = " · written by the owner";

/** The text kept with an expense, with its note replaced by the owner's words. */
export function withNote(
  rawText: string | null | undefined,
  note: string,
): string {
  const text = (rawText ?? "").replace(OWNER_MARK, "").trim();
  const tail = /^Paid from\b/i.test(text)
    ? ` · ${text}`
    : (text.match(/ · Paid from[\s\S]*$/)?.[0] ?? "");
  return `${note.trim()}${tail}${OWNER_MARK}`;
}

export function expenseNote(rawText: string | null | undefined): string | null {
  if (!rawText) return null;
  if (/^Paid from\b/i.test(rawText.trim())) return null;
  const owners = rawText.includes(OWNER_MARK);
  const note = rawText
    .split(" · Paid from")[0]
    .replace(OWNER_MARK, "")
    .replace(/\s*Provider\s+Re\S*[\s\S]*$/i, "")
    .replace(/^[ГT]or\b/, "For")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .join("\n");
  if (!note) return null;
  return owners ? note : correctNote(note);
}
