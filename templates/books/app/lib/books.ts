export { formatNaira as naira } from "@shared/money";
export { BUSINESS_NAMES, flagText, signalText } from "@shared/labels";

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
