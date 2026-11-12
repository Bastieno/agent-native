/**
 * Days, weeks and months in Africa/Lagos time (UTC+1 all year, no DST).
 * Days are `YYYY-MM-DD` strings. Weeks run Monday to Sunday.
 */
const LAGOS_OFFSET_MS = 60 * 60 * 1000;
const DAY_MS = 24 * 60 * 60 * 1000;

export type Period = "daily" | "weekly" | "monthly";

const iso = (ms: number) => new Date(ms).toISOString().slice(0, 10);

/** The Lagos calendar day an instant falls on. */
export function lagosDay(instant: string | Date): string {
  const ms =
    typeof instant === "string" ? Date.parse(instant) : instant.getTime();
  return iso(ms + LAGOS_OFFSET_MS);
}

export function addDays(day: string, n: number): string {
  return iso(Date.parse(`${day}T00:00:00Z`) + n * DAY_MS);
}

/** Days from `start` to `end`, both included. */
export function daysBetween(start: string, end: string): string[] {
  const out: string[] = [];
  for (let d = start; d <= end; d = addDays(d, 1)) out.push(d);
  return out;
}

/** Monday = 0 … Sunday = 6 */
export function weekdayIndex(day: string): number {
  return (new Date(`${day}T00:00:00Z`).getUTCDay() + 6) % 7;
}

/** The period that has just ended at `now`. */
export function periodBounds(
  period: Period,
  now: Date,
): { start: string; end: string } {
  const today = lagosDay(now);
  if (period === "daily") {
    const y = addDays(today, -1);
    return { start: y, end: y };
  }
  if (period === "weekly") {
    const thisMonday = addDays(today, -weekdayIndex(today));
    return { start: addDays(thisMonday, -7), end: addDays(thisMonday, -1) };
  }
  const firstOfThisMonth = `${today.slice(0, 7)}-01`;
  const end = addDays(firstOfThisMonth, -1);
  return { start: `${end.slice(0, 7)}-01`, end };
}
