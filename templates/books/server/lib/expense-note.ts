/**
 * What an expense was for, from the text kept with it: the slip's narration
 * ("5 packs of chicken"), without the bank's reference tail or the account
 * it was paid from.
 */
export function expenseNote(rawText: string | null | undefined): string | null {
  if (!rawText) return null;
  if (/^Paid from\b/i.test(rawText.trim())) return null;
  const note = rawText
    .split(" · Paid from")[0]
    .replace(/\s*Provider\s+Re\S*\s*\S*.*$/i, "")
    .replace(/^[ГT]or\b/, "For")
    .trim();
  return note || null;
}
