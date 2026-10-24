/**
 * What a piece of work nobody handed in is worth.
 *
 * Every average in the app was computed from the work that came back, so a
 * learner who sat two papers out of six was averaged on two. That quietly
 * ranks an absentee above a diligent weak learner, and — worse — a child who
 * hands in nothing has no average at all, so "who is struggling?" could not
 * include the one pupil most obviously in trouble.
 *
 * Two different things were tangled there, and only one of them is a policy:
 *
 *   - Whether a missed piece counts as zero or is left out of the average is
 *     a real choice, and schools differ. It is a setting.
 *   - Whether anyone can see that work was missed is not a choice. It shows,
 *     whatever the policy, because a mark computed from two papers and a mark
 *     computed from six are not the same claim.
 *
 * The fallback is `excluded`, which is what the app has always done — so no
 * school's existing numbers move under them. What changes by default is that
 * the gap is now visible, and `check-school-setup` says the policy is unset.
 */

export type MissedWorkPolicy = "zero" | "excluded";

export function missedWorkPolicy(config: unknown): MissedWorkPolicy {
  const raw = (config as { missedWorkPolicy?: unknown } | null)
    ?.missedWorkPolicy;
  return raw === "zero" ? "zero" : "excluded";
}

export type MarkSummary = {
  /** Pieces of work set for this learner. */
  set: number;
  /** How many came back and were marked. */
  sat: number;
  /** The average under the school's policy, or null when there is none. */
  percentage: number | null;
  /** True when work was set and none of it came back. */
  nothingHandedIn: boolean;
};

/**
 * One learner's standing in one subject, counted the school's way.
 *
 * `scores` are the percentages that were marked; `set` is how many pieces
 * were published to them.
 */
export function summarise(
  scores: number[],
  set: number,
  policy: MissedWorkPolicy,
): MarkSummary {
  const sat = scores.length;
  const missed = Math.max(0, set - sat);
  const total = scores.reduce((sum, s) => sum + s, 0);

  if (sat === 0) {
    return {
      set,
      sat,
      // Under "zero" a learner who handed nothing in scored nothing, which
      // is a fact about them; under "excluded" there is genuinely nothing to
      // average, and a report card says so rather than inventing a 0.
      percentage: set > 0 && policy === "zero" ? 0 : null,
      nothingHandedIn: set > 0,
    };
  }

  const divisor = policy === "zero" ? sat + missed : sat;
  return {
    set,
    sat,
    percentage: Math.round(total / Math.max(1, divisor)),
    nothingHandedIn: false,
  };
}

/** "3 of 6" — said on the page, so a mark cannot be read as a full term's. */
export function satOf(summary: MarkSummary): string {
  return `${summary.sat} of ${summary.set}`;
}
