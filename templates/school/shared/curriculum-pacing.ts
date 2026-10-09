/**
 * What a term's units add up to — stated as facts, not as rules.
 *
 * A curriculum draft could say anything and be saved without a murmur: one
 * unit covering all thirteen weeks of a term, two units claiming the same
 * week, a term with nothing in week six. None of that is visible until a
 * teacher tries to teach from it.
 *
 * What counts as a well-shaped term is not the same everywhere — a school
 * running a term-long project is not making a mistake — so almost everything
 * here is reported rather than judged. Only things wrong under any system are
 * called problems: a week nothing covers, a week claimed twice, a unit running
 * past the end of term, a unit with nothing to teach. Everything else is an
 * observation the reader can dismiss, and a school that wants firmer limits
 * states them itself.
 */

export type PacingUnit = {
  title: string;
  weekStart?: number | null;
  weekEnd?: number | null;
  objectives: number;
  /** Whether somebody set which weeks teach what, rather than leaving it. */
  paced?: boolean;
  /**
   * The weeks that actually carry new objectives, when they are known.
   *
   * A unit's week range is not the same thing: a unit running weeks 10–13
   * whose plan gives week 13 to the examination teaches nothing new in it.
   * Judging "teaching in an examination week" from the range alone accused
   * every such plan of something it had explicitly not done.
   */
  weeksTeaching?: number[] | null;
};

/** A week the school keeps for something other than new material. */
export type ReservedWeekInTerm = { week: number; label: string };

export type PacingPreferences = {
  /** Longest a unit normally runs here, if the school has said. */
  maxUnitWeeks?: number | null;
  /** Fewest units a term normally holds here, if the school has said. */
  minUnitsPerTerm?: number | null;
};

export type TermPacing = {
  termName: string;
  weeksInTerm: number | null;
  examWeeksReserved: number | null;
  /** The weeks this school keeps aside in this term, in its own words. */
  reservedWeeks: ReservedWeekInTerm[];
  units: Array<PacingUnit & { weeks: number | null }>;
  weeksWithoutUnit: number[];
  /** Weeks claimed by more than one unit. */
  weeksClaimedTwice: number[];
  problems: string[];
  observations: string[];
};

function weekList(weeks: number[]): string {
  const out: string[] = [];
  let i = 0;
  while (i < weeks.length) {
    let j = i;
    while (j + 1 < weeks.length && weeks[j + 1] === weeks[j] + 1) j++;
    out.push(i === j ? `${weeks[i]}` : `${weeks[i]}–${weeks[j]}`);
    i = j + 1;
  }
  return out.join(", ");
}

export function pacingForTerm(
  termName: string,
  units: PacingUnit[],
  opts: {
    weeksInTerm?: number | null;
    examWeeksReserved?: number | null;
    /** Weeks this school keeps aside, in its own words. */
    reservedWeeks?: ReservedWeekInTerm[] | null;
    preferences?: PacingPreferences | null;
  } = {},
): TermPacing {
  const weeksInTerm = opts.weeksInTerm ?? null;
  const exam = opts.examWeeksReserved ?? null;
  const reserved = opts.reservedWeeks ?? [];
  const prefs = opts.preferences ?? null;
  const problems: string[] = [];
  const observations: string[] = [];

  const shaped = units.map((u) => ({
    ...u,
    weeks:
      u.weekStart && u.weekEnd
        ? Math.max(1, u.weekEnd - u.weekStart + 1)
        : u.weekStart
          ? 1
          : null,
  }));

  // Who claims which week.
  const claims = new Map<number, string[]>();
  for (const u of shaped) {
    if (!u.weekStart) {
      problems.push(`"${u.title}" has no weeks set.`);
      continue;
    }
    const end = u.weekEnd ?? u.weekStart;
    for (let w = u.weekStart; w <= end; w++) {
      claims.set(w, [...(claims.get(w) ?? []), u.title]);
    }
    if (weeksInTerm && end > weeksInTerm) {
      problems.push(
        `"${u.title}" runs to week ${end}, but ${termName} is ${weeksInTerm} weeks long.`,
      );
    }
    if (u.objectives === 0) {
      problems.push(`"${u.title}" has no learning objectives.`);
    }
  }

  const weeksClaimedTwice = [...claims.entries()]
    .filter(([, titles]) => titles.length > 1)
    .map(([week]) => week)
    .sort((a, b) => a - b);
  if (weeksClaimedTwice.length) {
    problems.push(
      `Week${weeksClaimedTwice.length === 1 ? "" : "s"} ${weekList(
        weeksClaimedTwice,
      )} are covered by more than one unit.`,
    );
  }

  const weeksWithoutUnit: number[] = [];
  if (weeksInTerm) {
    for (let w = 1; w <= weeksInTerm; w++) {
      if (!claims.has(w)) weeksWithoutUnit.push(w);
    }
  }
  // Weeks the school keeps for examinations are meant to be empty.
  const teachingWeeks = weeksInTerm && exam ? weeksInTerm - exam : weeksInTerm;
  // A week the school keeps for its mid-term test is not a gap in the plan.
  // Reporting it as one told a teacher to fill a week the school had
  // already spoken for.
  const reservedAt = new Map(reserved.map((r) => [r.week, r.label]));
  const unplannedTeachingWeeks = (
    teachingWeeks
      ? weeksWithoutUnit.filter((w) => w <= teachingWeeks)
      : weeksWithoutUnit
  ).filter((w) => !reservedAt.has(w));
  if (unplannedTeachingWeeks.length) {
    problems.push(
      `Week${unplannedTeachingWeeks.length === 1 ? "" : "s"} ${weekList(
        unplannedTeachingWeeks,
      )} of ${termName} have no unit.`,
    );
  }
  if (teachingWeeks && exam) {
    // Only weeks that carry objectives count. Where a unit says which weeks
    // teach what, believe it; where nobody has said, its whole range is the
    // best available answer.
    const teaches = new Set<number>();
    for (const u of shaped) {
      if (u.weeksTeaching) {
        for (const w of u.weeksTeaching) teaches.add(w);
        continue;
      }
      if (!u.weekStart) continue;
      for (let w = u.weekStart; w <= (u.weekEnd ?? u.weekStart); w++) {
        teaches.add(w);
      }
    }
    const teachingInExamWeeks = [...teaches]
      .filter((w) => w > teachingWeeks)
      .sort((a, b) => a - b);
    if (teachingInExamWeeks.length) {
      const one = teachingInExamWeeks.length === 1;
      observations.push(
        `Week${one ? "" : "s"} ${weekList(teachingInExamWeeks)} ${
          one ? "carries" : "carry"
        } new material, and the school keeps ${exam} week${
          exam === 1 ? "" : "s"
        } at the end of term for examinations.`,
      );
    }
  }

  // New material in a week the school keeps for something else. Not wrong
  // everywhere — a school may well teach up to the mid-term — so it is said
  // rather than judged, and only for weeks the school itself named.
  if (reservedAt.size) {
    const clashes: string[] = [];
    for (const u of shaped) {
      const weeks = u.weeksTeaching ?? null;
      if (weeks) {
        for (const w of weeks) {
          if (reservedAt.has(w))
            clashes.push(`week ${w} (${reservedAt.get(w)})`);
        }
      }
    }
    const unique = [...new Set(clashes)];
    if (unique.length) {
      observations.push(
        `New material falls in ${unique.join(", ")} — ${
          unique.length === 1 ? "a week" : "weeks"
        } this school keeps for something else.`,
      );
    }
  }

  // Observations: true anywhere, judged nowhere.
  for (const u of shaped) {
    if (!u.weeks) continue;
    if (weeksInTerm && u.weeks >= weeksInTerm) {
      observations.push(
        `"${u.title}" covers all ${u.weeks} weeks of ${termName} with ${u.objectives} objective${
          u.objectives === 1 ? "" : "s"
        }.`,
      );
    } else if (u.objectives > 0 && u.weeks >= u.objectives * 2) {
      observations.push(
        `"${u.title}" runs ${u.weeks} weeks with ${u.objectives} objective${
          u.objectives === 1 ? "" : "s"
        } — about one every ${Math.round((u.weeks / u.objectives) * 10) / 10} weeks.`,
      );
    }
    // Only against a limit the school itself stated.
    if (prefs?.maxUnitWeeks && u.weeks > prefs.maxUnitWeeks) {
      observations.push(
        `"${u.title}" runs ${u.weeks} weeks; this school's usual limit is ${prefs.maxUnitWeeks}.`,
      );
    }
  }
  // A unit running several weeks with no week-by-week plan is not wrong — the
  // objectives are spread evenly and the lesson notes follow that. But the
  // even spread is a guess about teaching, and the school knows better: that
  // week 6 is the mid-term test, that measurement needs three weeks. Say so
  // while the draft can still be changed, rather than after the notes exist.
  const unpaced = shaped.filter(
    (u) => !u.paced && (u.weeks ?? 0) > 1 && u.objectives > 0,
  );
  if (unpaced.length) {
    observations.push(
      `${unpaced
        .map((u) => `"${u.title}"`)
        .join(
          ", ",
        )} ${unpaced.length === 1 ? "has" : "have"} no week-by-week plan, so their objectives will be spread evenly across their weeks. Set objectivesByWeek where some weeks are heavier than others, and weekNotes for weeks that teach nothing new.`,
    );
  }

  if (prefs?.minUnitsPerTerm && shaped.length < prefs.minUnitsPerTerm) {
    observations.push(
      `${termName} has ${shaped.length} unit${
        shaped.length === 1 ? "" : "s"
      }; this school usually plans at least ${prefs.minUnitsPerTerm}.`,
    );
  }

  return {
    termName,
    weeksInTerm,
    examWeeksReserved: exam,
    reservedWeeks: reserved,
    units: shaped,
    weeksWithoutUnit,
    weeksClaimedTwice,
    problems,
    observations,
  };
}
