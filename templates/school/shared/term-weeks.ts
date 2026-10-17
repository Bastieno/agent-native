/**
 * Weeks within a term, and which of them have nothing planned.
 *
 * Shared by the curriculum draft and the committed curriculum so the two pages
 * count a term the same way — a draft that says "nothing in weeks 12–13" must
 * not become "nothing in week 13" once it is committed.
 */

const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

/** How many teaching weeks a term spans, from its dates. */
export function termWeekCount(
  startDate: string | null | undefined,
  endDate: string | null | undefined,
): number | null {
  if (!startDate || !endDate) return null;
  const span = new Date(endDate).getTime() - new Date(startDate).getTime();
  if (!Number.isFinite(span)) return null;
  return Math.max(1, Math.round(span / WEEK_MS));
}

/**
 * The weeks of a term with no unit against them, in order.
 *
 * A gap is not necessarily a mistake — a mid-term break and an examination
 * week are both deliberate — but an invisible gap is. The page cannot know
 * which it is, so it shows them and lets the person reading decide.
 */
export function unplannedWeeks(
  units: Array<{ weekStart?: unknown; weekEnd?: unknown }>,
  totalWeeks: number,
): number[] {
  const planned = new Set<number>();
  for (const unit of units) {
    const from = Number(unit?.weekStart);
    const to = Number(unit?.weekEnd ?? unit?.weekStart);
    if (!Number.isFinite(from)) continue;
    for (let w = from; w <= (Number.isFinite(to) ? to : from); w++) {
      planned.add(w);
    }
  }
  const gaps: number[] = [];
  for (let w = 1; w <= totalWeeks; w++) if (!planned.has(w)) gaps.push(w);
  return gaps;
}

/** ["Week 6", "Weeks 12–13"] — consecutive weeks read as a range. */
export function describeWeeks(weeks: number[]): string[] {
  const out: string[] = [];
  let i = 0;
  while (i < weeks.length) {
    let j = i;
    while (j + 1 < weeks.length && weeks[j + 1] === weeks[j] + 1) j++;
    out.push(i === j ? `Week ${weeks[i]}` : `Weeks ${weeks[i]}–${weeks[j]}`);
    i = j + 1;
  }
  return out;
}

/** "Weeks 1–2", "Week 4", or null when a unit has no weeks set. */
export function weekLabel(
  weekStart: number | null | undefined,
  weekEnd: number | null | undefined,
): string | null {
  if (!weekStart) return null;
  if (!weekEnd || weekEnd === weekStart) return `Week ${weekStart}`;
  return `Weeks ${weekStart}–${weekEnd}`;
}

/**
 * Whether a lesson's week is the week we are in now.
 *
 * A term is a list of near-identical rows, and the one a teacher wants is
 * almost always today's. `lessonDate` is the Monday the week starts on, so
 * the week runs from there to the moment the next one begins — seven days,
 * in whatever timezone the reader is in, which is the school's own.
 *
 * Returns false when there is no date: a note nobody placed in a week is not
 * this week by default.
 */
export function isCurrentWeek(
  lessonDate: string | null | undefined,
  now: Date = new Date(),
): boolean {
  if (!lessonDate) return false;
  const start = new Date(lessonDate);
  if (Number.isNaN(start.getTime())) return false;
  start.setHours(0, 0, 0, 0);
  const end = new Date(start);
  end.setDate(end.getDate() + 7);
  return now >= start && now < end;
}

export type ReservedWeek = { week: number; label: string; termId?: string };

/**
 * The weeks one term sets aside, with the term's own entries winning.
 *
 * A school says its mid-term is week 7 and then that Second Term's is week
 * 6. Both entries are kept — the general one still governs the other terms —
 * so for a given term the specific entry has to replace the general one of
 * the same name rather than joining it. Adding them together reserved two
 * mid-terms in one term, and put revision in Second Term's exam week.
 *
 * Matched by label, because the label is what the school is naming: "the
 * mid-term test, except in Second Term". Two different things that happen to
 * share a name would need different names, which is the same rule people
 * already follow when writing a timetable.
 */
export function reservedWeeksForTerm(
  reserved: ReservedWeek[] | null | undefined,
  termId: string | null | undefined,
): ReservedWeek[] {
  if (!Array.isArray(reserved)) return [];
  const forThisTerm = reserved.filter((r) => r?.termId && r.termId === termId);
  const overridden = new Set(forThisTerm.map((r) => normaliseLabel(r.label)));
  const general = reserved.filter(
    (r) => r && !r.termId && !overridden.has(normaliseLabel(r.label)),
  );
  return [...general, ...forThisTerm]
    .filter((r) => typeof r?.week === "number")
    .sort((a, b) => a.week - b.week);
}

function normaliseLabel(label: unknown): string {
  return String(label ?? "")
    .toLowerCase()
    .replace(/\s+/gu, " ")
    .trim();
}
