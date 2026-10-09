/**
 * Which of a unit's objectives belong to which of its weeks.
 *
 * A unit spans several weeks, and its objectives are taught across them — not
 * all of them every week. Giving each week the unit's whole objective list
 * meant a teacher planning week 8 of a three-week unit on fractions saw five
 * objectives and no indication which two were theirs, which is not a plan.
 *
 * Objectives arrive in teaching order, so the spread keeps that order and
 * shares them out as evenly as it can. When a unit has more weeks than
 * objectives, an objective carries over into the next week rather than leaving
 * a week with nothing to teach — that week is continuing, not empty.
 *
 * This is only the default. An agent that knows "reduce to lowest terms" is a
 * lighter week than "word problems" can say so with an explicit split, and
 * that always wins.
 *
 * Weeks a school keeps for examinations are left out of the spread — teaching
 * new material in a week nobody is teaching in is not a plan either. Which
 * weeks those are is the school's own answer (`examWeeksPerTerm`), never a
 * number assumed here: a school that reserves none, or that examines in the
 * middle of term, is not doing it wrongly.
 */

export type WeekPlan = {
  /** The week within the term. */
  week: number;
  /** Position within the unit, from 1. */
  weekOfUnit: number;
  weeksInUnit: number;
  objectives: string[];
  /** True when this week carries on an objective from the week before. */
  continues: boolean;
  /** True when the school keeps this week for examinations. */
  reserved?: boolean;
};

export type PacingOptions = {
  /**
   * The first week of the term the school keeps for examinations, if it keeps
   * any. Weeks from here on carry no new objectives.
   */
  reservedFromWeek?: number | null;
};

/**
 * The first reserved week of a term, from the school's own setting.
 *
 * Returns null when the school has not said, or has said none — in which case
 * nothing is reserved. The app does not decide that a term ends in
 * examinations; the school does.
 */
export function reservedFromWeek(
  totalWeeks: number | null | undefined,
  examWeeksPerTerm: number | null | undefined,
): number | null {
  if (!totalWeeks || typeof examWeeksPerTerm !== "number") return null;
  if (examWeeksPerTerm <= 0) return null;
  const from = totalWeeks - examWeeksPerTerm + 1;
  return from > 1 ? from : null;
}

export function paceObjectives(
  objectives: string[],
  weekStart: number,
  weekEnd: number,
  explicit?: string[][],
  opts: PacingOptions = {},
): WeekPlan[] {
  const weeks = Math.max(1, weekEnd - weekStart + 1);
  const reserved = opts.reservedFromWeek ?? null;

  // The agent's own split, when it has given one that fits.
  if (explicit && explicit.length === weeks) {
    return explicit.map((objs, i) => ({
      week: weekStart + i,
      weekOfUnit: i + 1,
      weeksInUnit: weeks,
      objectives: objs,
      continues: false,
      reserved: reserved != null && weekStart + i >= reserved,
    }));
  }

  const count = objectives.length;
  const plans: WeekPlan[] = [];

  // Spread the teaching across the weeks that are for teaching. A unit ending
  // inside the school's examination weeks keeps them — they are still its
  // weeks — but nothing new is taught in them.
  const lastTeachingWeek =
    reserved != null ? Math.min(weekEnd, reserved - 1) : weekEnd;
  const teachingWeeks = Math.max(0, lastTeachingWeek - weekStart + 1);

  for (let i = 0; i < weeks; i++) {
    const week = weekStart + i;
    if (reserved != null && week >= reserved) {
      plans.push({
        week,
        weekOfUnit: i + 1,
        weeksInUnit: weeks,
        objectives: [],
        continues: false,
        reserved: true,
      });
      continue;
    }
    // Share the objectives out by position so the split is as even as the
    // numbers allow and the order is never disturbed.
    const span = teachingWeeks || weeks;
    const from = Math.floor((i * count) / span);
    const to = Math.floor(((i + 1) * count) / span);
    let slice = objectives.slice(from, to);

    if (slice.length === 0 && count > 0) {
      // More weeks than objectives: stay with the objective in hand.
      slice = [objectives[Math.min(from, count - 1)]];
    }

    // A week continues when it opens on the objective the last one ended on.
    const previous = plans[plans.length - 1];
    const continues =
      !!previous &&
      slice.length > 0 &&
      previous.objectives[previous.objectives.length - 1] === slice[0];

    plans.push({
      week,
      weekOfUnit: i + 1,
      weeksInUnit: weeks,
      objectives: slice,
      continues,
    });
  }
  return plans;
}
