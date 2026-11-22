import { formatNaira } from "@shared/money";

/** Naira on screen: whole naira, no kobo (₦458,072). */
export const naira = (kobo: number) =>
  formatNaira(Math.round(kobo / 100) * 100);

/** Short headline naira: ₦1.69m, ₦845k, ₦9,400. */
export function nairaShort(kobo: number): string {
  const n = Math.round(kobo / 100);
  const a = Math.abs(n);
  const sign = n < 0 ? "-" : "";
  if (a >= 1_000_000)
    return `${sign}₦${(a / 1_000_000).toFixed(2).replace(/\.?0+$/, "")}m`;
  if (a >= 10_000) return `${sign}₦${Math.round(a / 1000)}k`;
  return naira(kobo);
}
import { signalText, type SignalLike } from "@shared/labels";
export { BUSINESS_NAMES, flagText, signalText } from "@shared/labels";

const COUNTS = new Set([
  "category_margin",
  "new_subscribers",
  "flag_free_run",
  "item_margin_falling",
]);
/** A trend in words, money in whole naira. */
export const signalLine = (s: SignalLike) =>
  signalText(
    COUNTS.has(s.kind) ? s : { ...s, now: Math.round(s.now / 100) * 100 },
  );

const DAY_MS = 86_400_000;

/** Today in Lagos (UTC+1), YYYY-MM-DD. */
export const lagosToday = () =>
  new Date(Date.now() + 3_600_000).toISOString().slice(0, 10);
export const addDays = (day: string, n: number) =>
  new Date(Date.parse(`${day}T00:00:00Z`) + n * DAY_MS)
    .toISOString()
    .slice(0, 10);
export const monthStart = (day: string) => `${day.slice(0, 7)}-01`;

export const dayLabel = (day: string) =>
  new Date(`${day}T12:00:00Z`).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  });
export const shortDay = (day: string) =>
  new Date(`${day}T12:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  });
export const rangeLabel = (start: string, end: string) =>
  start === end ? dayLabel(start) : `${shortDay(start)} – ${shortDay(end)}`;

export const receiptUrl = (fileId: string) => `/api/books/receipts/${fileId}`;

/** Monday of the week a day falls in. */
export const weekStart = (day: string) => {
  const dow = (new Date(`${day}T12:00:00Z`).getUTCDay() + 6) % 7;
  return addDays(day, -dow);
};
export const monthEnd = (day: string) =>
  addDays(monthStart(addDays(monthStart(day), 32)), -1);

export type PeriodKey =
  | "this-month"
  | "last-month"
  | "this-week"
  | "last-7"
  | "last-30"
  | "custom";

/** The preset periods, as of a Lagos day. */
export function presetRange(key: PeriodKey, today: string) {
  switch (key) {
    case "last-month": {
      const end = addDays(monthStart(today), -1);
      return { start: monthStart(end), end };
    }
    case "this-week":
      return { start: weekStart(today), end: today };
    case "last-7":
      return { start: addDays(today, -6), end: today };
    case "last-30":
      return { start: addDays(today, -29), end: today };
    default:
      return { start: monthStart(today), end: today };
  }
}

/** Every day from start to end, inclusive. */
export function daysBetween(start: string, end: string): string[] {
  const out: string[] = [];
  for (let d = start; d <= end && out.length < 400; d = addDays(d, 1))
    out.push(d);
  return out;
}
