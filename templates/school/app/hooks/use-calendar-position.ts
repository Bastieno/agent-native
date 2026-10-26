import { useQuery } from "@tanstack/react-query";
import { agentNativePath } from "@agent-native/core/client";

export interface CalendarPositionView {
  week: number;
  totalWeeks: number;
  kind: "teaching" | "break" | "revision" | "assessment" | "exam" | "reserved";
  label: string | null;
  message: string;
  short: string | null;
  next: { week: number; label: string; inWeeks: number } | null;
}

/** Which week of the term it is and what it is for; null between terms. */
export function useCalendarPosition(): CalendarPositionView | null {
  const { data } = useQuery<CalendarPositionView | null>({
    queryKey: ["calendar-position"],
    queryFn: async () => {
      const res = await fetch(
        agentNativePath("/_agent-native/actions/get-current-term"),
      );
      if (!res.ok) return null;
      return (await res.json()).calendar ?? null;
    },
    // The week changes on a Monday, not by the minute.
    staleTime: 10 * 60_000,
  });
  return data ?? null;
}
