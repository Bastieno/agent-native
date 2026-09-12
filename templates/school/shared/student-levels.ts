/**
 * Where the line falls between foundational, developing and advanced.
 *
 * These used to be `>= 75` and `>= 50` written into the code, which quietly
 * assumed every school in the world marks the way a British one does. A school
 * whose pass mark is 40 had a third of its passing students filed as
 * "foundational"; a school marking out of 5 had everybody there.
 *
 * So the boundaries are read from the school's own configuration, in this
 * order of preference:
 *
 *   1. `categoryThresholds` — the school said so outright. Use it.
 *   2. The grading scale's own bands — the bottom of the top band is what that
 *      school already calls excellent, and the pass mark is where they already
 *      draw failure. Reuse their judgement rather than inventing a parallel one.
 *   3. The pass mark alone — "advanced" sits midway between passing and full
 *      marks. Derived from their number, not from ours.
 *
 * There is deliberately no final hardcoded fallback: `passMark` already
 * defaults in `get-school-config`, so by the time we are here there is always
 * a school number to work from.
 */

export type CategoryThresholds = {
  /** At or above this average: advanced. */
  advanced: number;
  /** At or above this average: developing. Below it: foundational. */
  developing: number;
  /** How these were arrived at, so the teacher can see and argue with it. */
  basis: string;
};

type GradeLevel = {
  grade?: string;
  min?: number;
  max?: number;
  label?: string;
};

export function resolveCategoryThresholds(
  config: Record<string, any> | null | undefined,
): CategoryThresholds {
  const passMark =
    typeof config?.passMark === "number" ? config.passMark : null;

  // 1. Stated outright.
  const stated = config?.categoryThresholds;
  if (
    stated &&
    typeof stated.advanced === "number" &&
    typeof stated.developing === "number"
  ) {
    return {
      advanced: stated.advanced,
      developing: stated.developing,
      basis: "the school's own category thresholds",
    };
  }

  // 2. The school's grading bands. The top band's floor is what this school
  //    already treats as its highest attainment, whatever it is called.
  const levels: GradeLevel[] = Array.isArray(config?.gradingScale?.levels)
    ? config.gradingScale.levels
    : [];
  const withMin = levels.filter(
    (l) => typeof l.min === "number" && Number.isFinite(l.min),
  );
  if (withMin.length > 0 && passMark !== null) {
    const topBand = withMin.reduce((best, l) =>
      (l.min as number) > (best.min as number) ? l : best,
    );
    const advanced = topBand.min as number;
    // A top band at or below the pass mark would put everyone who passes into
    // "advanced"; fall through to the pass-mark rule instead of nonsense.
    if (advanced > passMark) {
      return {
        advanced,
        developing: passMark,
        basis: `the school's grading scale (top band "${topBand.grade ?? topBand.label ?? "highest"}" starts at ${advanced}%) and pass mark of ${passMark}%`,
      };
    }
  }

  // 3. The pass mark alone.
  if (passMark !== null) {
    return {
      advanced: Math.round(passMark + (100 - passMark) / 2),
      developing: passMark,
      basis: `the school's pass mark of ${passMark}% (advanced set midway between passing and full marks)`,
    };
  }

  // Only reachable if a caller hands us no config at all.
  return {
    advanced: 75,
    developing: 50,
    basis:
      "no school grading configuration was found — set a pass mark and grading scale",
  };
}

/** Which band an average falls into. */
export function categoryFor(
  average: number,
  thresholds: CategoryThresholds,
): "foundational" | "developing" | "advanced" {
  if (average >= thresholds.advanced) return "advanced";
  if (average >= thresholds.developing) return "developing";
  return "foundational";
}
