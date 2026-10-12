import { validPairs, type PairHalf, type SchoolWeek } from "./school-week.js";

/** A placed period as coverage needs to see it. */
export type CoverageRow = PairHalf & { classId: string };

export interface Tally {
  periods: number;
  doubles: number;
}

/** A class as coverage needs to see it. */
export interface CoverageClass {
  classId: string;
  className: string;
  subjectName: string;
  armId: string | null;
  periodsPerWeek: number | null;
  doublesPerWeek: number | null;
}

export interface ClassCoverage {
  classId: string;
  className: string;
  subjectName: string;
  armId: string | null;
  required: Tally | null;
  placed: Tally;
  short: Tally;
}

/**
 * How many of a class's placed periods come as doubles: each valid pair (see
 * `validPairs`) is one. Its two rows still count as two periods.
 */
export function placedDoubles(
  week: SchoolWeek | null | undefined,
  rows: CoverageRow[],
): number {
  return validPairs(week, rows).size;
}

/**
 * What each class needs a week against what the timetable holds for it.
 * Pure. Every row of a class counts, including those off the bells. A class
 * the school hasn't given counts shows `required: null` and is not short of
 * anything; shortfalls are never negative.
 */
export function countCoverage(
  periods: CoverageRow[],
  classes: CoverageClass[],
  week: SchoolWeek | null | undefined,
): { classes: ClassCoverage[]; unset: number } {
  const rowsOf = new Map<string, CoverageRow[]>();
  for (const p of periods) {
    const list = rowsOf.get(p.classId) ?? [];
    list.push(p);
    rowsOf.set(p.classId, list);
  }
  let unset = 0;
  const out: ClassCoverage[] = classes.map((c) => {
    const rows = rowsOf.get(c.classId) ?? [];
    const placed: Tally = {
      periods: rows.length,
      doubles: placedDoubles(week, rows),
    };
    if (c.periodsPerWeek == null) {
      unset++;
      return {
        classId: c.classId,
        className: c.className,
        subjectName: c.subjectName,
        armId: c.armId,
        required: null,
        placed,
        short: { periods: 0, doubles: 0 },
      };
    }
    const required: Tally = {
      periods: c.periodsPerWeek,
      doubles: c.doublesPerWeek ?? 0,
    };
    return {
      classId: c.classId,
      className: c.className,
      subjectName: c.subjectName,
      armId: c.armId,
      required,
      placed,
      short: {
        periods: Math.max(0, required.periods - placed.periods),
        doubles: Math.max(0, required.doubles - placed.doubles),
      },
    };
  });
  return { classes: out, unset };
}

/** True when a class with a count has fewer periods or fewer doubles than it needs. */
export function isShort(c: ClassCoverage): boolean {
  return !!c.required && (c.short.periods > 0 || c.short.doubles > 0);
}

/**
 * "4 of 5" or, when the class needs doubles, "4 of 5, 0 of 1 double". Takes
 * the class's tallies, so the page can pass a fresher placed count.
 */
export function shortInWords(required: Tally, placed: Tally): string {
  const base = `${placed.periods} of ${required.periods}`;
  return required.doubles > 0
    ? `${base}, ${placed.doubles} of ${required.doubles} ${required.doubles === 1 ? "double" : "doubles"}`
    : base;
}
