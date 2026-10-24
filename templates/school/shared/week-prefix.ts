/**
 * "Week 1" said once, not five times.
 *
 * Activities are titled "Week 1: Worksheet — …" because the title has to stand
 * on its own everywhere else: in a class's long list of work, on the activity
 * itself, at the top of a printed page. Under the Week 1 lesson note, though,
 * the week is already the heading of the page, so every row opening with it
 * pushes the part that differs — worksheet, practical, problem set — to the
 * right, where it is read last.
 *
 * So the prefix is dropped at that one spot, and only there. It is not removed
 * from the data: the same activity still carries its week to the printer and
 * to the class list, where nothing else says which week it belongs to.
 *
 * A range — "Weeks 1–2: … Test" — is kept. That one says something the page
 * does not: this piece of work spans two weeks.
 */

/** The week a title opens with, when it names a single one. */
export function weekNumberIn(title: string | null | undefined): number | null {
  if (!title) return null;
  const match = /^\s*Week\s+(\d+)\b/iu.exec(title);
  if (!match) return null;
  // "Weeks 1–2" is a range even when written "Week 1-2".
  if (/^\s*Week\s+\d+\s*[–—-]\s*\d+/iu.test(title)) return null;
  return Number(match[1]);
}

/**
 * The same title with a leading "Week N" removed — but only when N is the week
 * being looked at, and never when nothing would be left.
 */
export function withoutWeekPrefix(title: string, week: number | null): string {
  if (!title || week === null) return title;
  const match = /^\s*Week\s+(\d+)\s*(?:[:—–-]|\.)?\s*/iu.exec(title);
  if (!match || Number(match[1]) !== week) return title;
  if (/^\s*Week\s+\d+\s*[–—-]\s*\d+/iu.test(title)) return title;
  const rest = title.slice(match[0].length).trim();
  return rest.length ? rest : title;
}
