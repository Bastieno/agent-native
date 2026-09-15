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
};

export function paceObjectives(
  objectives: string[],
  weekStart: number,
  weekEnd: number,
  explicit?: string[][],
): WeekPlan[] {
  const weeks = Math.max(1, weekEnd - weekStart + 1);

  // The agent's own split, when it has given one that fits.
  if (explicit && explicit.length === weeks) {
    return explicit.map((objs, i) => ({
      week: weekStart + i,
      weekOfUnit: i + 1,
      weeksInUnit: weeks,
      objectives: objs,
      continues: false,
    }));
  }

  const count = objectives.length;
  const plans: WeekPlan[] = [];

  for (let i = 0; i < weeks; i++) {
    // Share the objectives out by position so the split is as even as the
    // numbers allow and the order is never disturbed.
    const from = Math.floor((i * count) / weeks);
    const to = Math.floor(((i + 1) * count) / weeks);
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
      week: weekStart + i,
      weekOfUnit: i + 1,
      weeksInUnit: weeks,
      objectives: slice,
      continues,
    });
  }
  return plans;
}
