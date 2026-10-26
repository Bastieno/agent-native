/**
 * Grade point average, for schools that report one.
 *
 * A school opts in by giving its grading scale `points` (4.0 for an A, and so
 * on). Nothing is assumed: a scale with no points has no GPA, and nothing is
 * printed in its place. Honors and AP courses can carry a bonus, named in the
 * school's `courseLevels` and set per subject. The bonus is added only when
 * the course earned points, so a failed AP course is not rewarded.
 *
 * Each course counts by the credit it earns (`credits` on the subject, one
 * when unset), so a half-credit PE course weighs half of a full one.
 */

export interface PointLevel {
  grade: string;
  min: number;
  max: number;
  points?: number;
}

export interface CourseLevel {
  name: string;
  bonus: number;
}

export interface GpaConfig {
  gradingScale?: { levels?: PointLevel[] } | null;
  courseLevels?: CourseLevel[] | null;
}

export interface Gpa {
  unweighted: number;
  weighted: number;
  /** How many courses it was counted from. */
  courses: number;
  /** The credits those courses add up to. */
  credits: number;
}

/** Whether this school's scale carries grade points at all. */
export function schoolHasGradePoints(config: GpaConfig | null | undefined) {
  return !!config?.gradingScale?.levels?.some(
    (l) => typeof l.points === "number",
  );
}

export function pointsFor(
  config: GpaConfig | null | undefined,
  percentage: number | null,
): number | null {
  if (percentage === null) return null;
  const level = config?.gradingScale?.levels?.find(
    (l) => percentage >= l.min && percentage <= l.max,
  );
  return typeof level?.points === "number" ? level.points : null;
}

/** The bonus a named course level adds; 0 for none or an unknown name. */
export function bonusFor(
  config: GpaConfig | null | undefined,
  courseLevel: string | null | undefined,
): number {
  if (!courseLevel) return 0;
  const found = config?.courseLevels?.find(
    (c) => c.name.toLowerCase() === courseLevel.toLowerCase(),
  );
  return found?.bonus ?? 0;
}

const round2 = (n: number) => Math.round(n * 100) / 100;

/**
 * The GPA across courses, each a percentage as the report card prints it.
 * Courses with no mark yet are left out. Returns null when the school has no
 * grade points or nothing is marked.
 */
export function gpaOf(
  config: GpaConfig | null | undefined,
  courses: Array<{
    percentage: number | null;
    courseLevel?: string | null;
    /** Credit the course earns; one when not given. */
    credits?: number | null;
  }>,
): Gpa | null {
  if (!schoolHasGradePoints(config)) return null;
  let plain = 0;
  let weighted = 0;
  let n = 0;
  let credits = 0;
  for (const c of courses) {
    const points = pointsFor(config, c.percentage);
    if (points === null) continue;
    const credit = c.credits != null && c.credits > 0 ? c.credits : 1;
    plain += points * credit;
    weighted +=
      (points > 0 ? points + bonusFor(config, c.courseLevel) : points) * credit;
    credits += credit;
    n += 1;
  }
  if (!n) return null;
  return {
    unweighted: round2(plain / credits),
    weighted: round2(weighted / credits),
    courses: n,
    credits,
  };
}

/** "3.67", or "3.67 (4.12 weighted)" when the two differ. */
export function formatGpa(gpa: Gpa): string {
  const plain = gpa.unweighted.toFixed(2);
  return gpa.weighted === gpa.unweighted
    ? plain
    : `${plain} (${gpa.weighted.toFixed(2)} weighted)`;
}
