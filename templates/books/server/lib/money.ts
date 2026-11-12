/** Money is integer kobo everywhere below the UI. ₦1 = 100 kobo. */

export function toKobo(naira: string | number): number {
  const n =
    typeof naira === "number"
      ? naira
      : Number(String(naira).replace(/[₦,\s]/g, ""));
  if (!Number.isFinite(n)) throw new Error(`Not an amount: ${naira}`);
  return Math.round(n * 100);
}

/** ₦45,000 — kobo shown only when there are some (₦290,473.55). */
export function formatNaira(kobo: number): string {
  const negative = kobo < 0;
  const abs = Math.abs(Math.round(kobo));
  const whole = Math.floor(abs / 100);
  const part = abs % 100;
  const text =
    whole.toLocaleString("en-NG") +
    (part ? `.${String(part).padStart(2, "0")}` : "");
  return `${negative ? "-" : ""}₦${text}`;
}
