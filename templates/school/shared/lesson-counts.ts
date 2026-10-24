/**
 * How many periods a week a class needs, and how many of them come as
 * doubles (a double is two periods). Null means the school hasn't said.
 */
export interface LessonCounts {
  periods: number | null;
  doubles: number | null;
}

/** Why a pair of counts can't stand, in words; null when it can. */
export function countsProblem(
  periods: number | null | undefined,
  doubles: number | null | undefined,
): string | null {
  if (periods != null && (!Number.isInteger(periods) || periods < 0)) {
    return "Periods a week must be a whole number, zero or more.";
  }
  if (doubles != null && (!Number.isInteger(doubles) || doubles < 0)) {
    return "Doubles must be a whole number, zero or more.";
  }
  if (doubles != null && doubles > 0 && periods == null) {
    return "Doubles are part of the periods a week, so say how many periods first.";
  }
  if (doubles != null && periods != null && doubles * 2 > periods) {
    return `${doubles} ${doubles === 1 ? "double takes" : "doubles take"} ${doubles * 2} periods, which is more than the ${periods} a week.`;
  }
  return null;
}
