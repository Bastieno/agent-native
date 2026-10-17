import { useSchoolConfig } from "@/hooks/use-school-config";
import { formatSchoolDate, formatSchoolDateTime } from "@shared/dates";

/**
 * Dates formatted the way this school writes them.
 *
 * The config is already cached by `useSchoolConfig`, so this costs nothing
 * beyond the call — and it means no screen has to remember to pass the locale
 * and timezone by hand, which is how they came to be forgotten everywhere.
 */
export function useSchoolDates() {
  const { config } = useSchoolConfig();
  return {
    formatDate: (
      value: string | number | Date | null | undefined,
      options?: Intl.DateTimeFormatOptions,
    ) => formatSchoolDate(value, config as any, options),
    formatDateTime: (
      value: string | number | Date | null | undefined,
      options?: Intl.DateTimeFormatOptions,
    ) => formatSchoolDateTime(value, config as any, options),
  };
}
