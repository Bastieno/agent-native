/**
 * Dates in the school's own terms.
 *
 * Every date in the app was formatted with `toLocaleDateString()` and no
 * arguments, which means two things, both wrong. It uses the *reader's*
 * browser locale, so the same report card reads 05/10/2026 to the head teacher
 * and 10/05/2026 to the parent — and neither can tell which. And it uses the
 * reader's timezone, so a lesson on the 14th shows as the 13th to anyone whose
 * device is set behind the school.
 *
 * So: the school's locale where it has set one, the school's timezone for
 * anything that happened at a moment in time, and a spelled-out month by
 * default. A spelled-out month is the part that matters most — "14 Sept 2026"
 * cannot be misread, whoever is holding the paper and wherever they are.
 *
 * A date with no time in it — a lesson date, a due date — is a day, not a
 * moment, so it is read as written rather than shifted into any timezone.
 */

export type DateConfig =
  | {
      locale?: string;
      /** What `update-school-config` writes. */
      schoolTimezone?: string;
      /** What `setup-school` wrote first. Both are honoured. */
      timezone?: string;
    }
  | null
  | undefined;

const DATE_ONLY = /^\d{4}-\d{2}-\d{2}$/;

export function schoolTimeZone(config: DateConfig): string | undefined {
  return config?.schoolTimezone ?? config?.timezone ?? undefined;
}

/** The locale to format in — the school's, or the reader's if it has none. */
export function schoolLocale(config: DateConfig): string | undefined {
  const locale = config?.locale?.trim();
  return locale ? locale : undefined;
}

/**
 * A date, spelled out so it cannot be misread.
 *
 * `options` is for callers that want something shorter — a cell with room for
 * "14 Sept" and no more.
 */
export function formatSchoolDate(
  value: string | number | Date | null | undefined,
  config: DateConfig,
  options: Intl.DateTimeFormatOptions = { dateStyle: "long" },
): string {
  if (value === null || value === undefined || value === "") return "";
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  const dayOnly = typeof value === "string" && DATE_ONLY.test(value.trim());
  return new Intl.DateTimeFormat(schoolLocale(config), {
    ...options,
    // A bare date carries no time, so reading it in a timezone behind the
    // school would move it to the day before.
    timeZone: dayOnly ? "UTC" : schoolTimeZone(config),
  }).format(date);
}

/** A moment in time, in the school's own day. */
export function formatSchoolDateTime(
  value: string | number | Date | null | undefined,
  config: DateConfig,
  options: Intl.DateTimeFormatOptions = {
    dateStyle: "long",
    timeStyle: "short",
  },
): string {
  if (value === null || value === undefined || value === "") return "";
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat(schoolLocale(config), {
    ...options,
    timeZone: schoolTimeZone(config),
  }).format(date);
}
