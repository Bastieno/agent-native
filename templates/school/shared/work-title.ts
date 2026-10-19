/**
 * What a piece of work's title says, taken apart.
 *
 * Work set for a week is titled "Week 6 reading: How words show how we feel":
 * the week, what kind of thing it is, and what it is about. A list that shows
 * the whole string on every row repeats the first two on each, so a page that
 * already says the week and the subject shows only the third.
 */
export type WorkTitle = {
  /** The week of the term, when the title opens with one. */
  week: number | null;
  /** "reading", "worksheet", "cards" — as the title says it. */
  kind: string | null;
  /** What it is about; the whole title when it has no such opening. */
  topic: string;
};

const OPENING = /^Week (\d+)\s+([^:]+?):\s*(.+)$/i;

export function splitWorkTitle(title: string): WorkTitle {
  const m = title.match(OPENING);
  if (!m) return { week: null, kind: null, topic: title };
  return { week: Number(m[1]), kind: m[2].trim(), topic: m[3].trim() };
}
