/**
 * A unit's week-by-week plan: what each of its weeks is for.
 *
 * A unit knows its first and last week, and objectives are otherwise spread
 * across them evenly. That is a fair default and a poor plan: a term has a
 * mid-term test in week 6, three weeks on measurement because it is practical,
 * revision before the examinations, and a week that teaches nothing new. An
 * agent working with a school arrives at exactly that, and until now it was
 * thrown away at commit.
 *
 * A week with no objectives is not a gap — it is a week doing something else,
 * and its note says what. Lesson notes read this when it exists and fall back
 * to the even spread when it does not.
 */

export type WeekPlanEntry = {
  week: number;
  /** Objectives taught this week. Empty for a week that teaches none. */
  objectives: string[];
  /** What the week is for, when it carries no objectives — or a steer. */
  note?: string | null;
};

export function parseWeekPlan(
  json: string | null | undefined,
): WeekPlanEntry[] | null {
  if (!json) return null;
  try {
    const list = JSON.parse(json);
    if (!Array.isArray(list)) return null;
    const entries = list
      .map((e: any) => ({
        week: Number(e?.week),
        objectives: Array.isArray(e?.objectives)
          ? e.objectives.filter((o: unknown) => typeof o === "string")
          : [],
        note: typeof e?.note === "string" && e.note.trim() ? e.note : null,
      }))
      .filter((e) => Number.isFinite(e.week));
    return entries.length ? entries.sort((a, b) => a.week - b.week) : null;
  } catch {
    return null;
  }
}

/**
 * Build a plan from what an agent actually writes.
 *
 * Two shapes turn up, and both are reasonable: `objectivesByWeek` as one array
 * per week of the unit, or as an object keyed by week number. The entries are
 * either the objectives themselves or their positions in the unit's list —
 * positions are the compact form, and they cannot drift out of step with the
 * wording the way copied text can.
 *
 * Reading only one of those shapes silently dropped every objective of a plan
 * written in the other, keeping the week notes so the result looked almost
 * right. So all of them are read, and what was understood is reported back.
 */
export function weekPlanFromDraft(unit: {
  weekStart?: number | null;
  weekEnd?: number | null;
  objectivesByWeek?: unknown;
  weekNotes?: unknown;
  learningObjectives?: unknown;
  objectives?: unknown;
}): WeekPlanEntry[] | null {
  const start = Number(unit.weekStart);
  if (!Number.isFinite(start)) return null;

  // The unit's own objectives, for resolving positions.
  const listed = (
    Array.isArray(unit.learningObjectives)
      ? unit.learningObjectives
      : Array.isArray(unit.objectives)
        ? unit.objectives
        : []
  ).map((o: any) => (typeof o === "string" ? o : (o?.description ?? "")));

  const byWeek = unit.objectivesByWeek;
  const notes = unit.weekNotes;

  const pick = (container: unknown, week: number, index: number): unknown => {
    if (Array.isArray(container)) return container[index];
    if (container && typeof container === "object") {
      const c = container as Record<string, unknown>;
      return c[String(week)] ?? c[`week${week}`];
    }
    return undefined;
  };

  const noteFor = (week: number, index: number): string | null => {
    const v = pick(notes, week, index);
    return typeof v === "string" && v.trim() ? v : null;
  };

  // Positions count from zero when a zero appears, and from one otherwise —
  // "the first objective" is written both ways, and the resolved wording is
  // echoed back so a wrong reading is visible rather than silent.
  const numbers: number[] = [];
  const collect = (v: unknown) => {
    if (Array.isArray(v)) {
      for (const x of v) if (typeof x === "number") numbers.push(x);
    }
  };
  if (Array.isArray(byWeek)) byWeek.forEach(collect);
  else if (byWeek && typeof byWeek === "object") {
    Object.values(byWeek as Record<string, unknown>).forEach(collect);
  }
  const zeroBased = numbers.some((n) => n === 0);

  const objectivesFor = (week: number, index: number): string[] => {
    const raw = pick(byWeek, week, index);
    if (!Array.isArray(raw)) return [];
    return raw
      .map((entry: unknown) => {
        if (typeof entry === "string") return entry;
        if (typeof entry === "number") {
          return listed[zeroBased ? entry : entry - 1] ?? "";
        }
        return "";
      })
      .filter((o: string) => o.trim());
  };

  const weeksInUnit = Array.isArray(byWeek)
    ? byWeek.length
    : Math.max(
        1,
        (Number.isFinite(Number(unit.weekEnd)) ? Number(unit.weekEnd) : start) -
          start +
          1,
      );

  const entries: WeekPlanEntry[] = [];
  for (let i = 0; i < weeksInUnit; i++) {
    const week = start + i;
    const objectives = objectivesFor(week, i);
    const note = noteFor(week, i);
    if (objectives.length === 0 && !note) continue;
    entries.push({ week, objectives, note });
  }
  return entries.length ? entries : null;
}
