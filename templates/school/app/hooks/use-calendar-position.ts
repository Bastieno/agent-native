import { httpError } from "@/lib/http-error";
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

export interface SchoolTermView {
  session: { id: string; name: string } | null;
  term: { id: string; name: string } | null;
  nextTerm: { name: string; startDate: string } | null;
  calendar: CalendarPositionView | null;
}

/** The session and term the school is in today, and the week of it. */
export function useSchoolTerm(): SchoolTermView | null {
  const { data } = useQuery<SchoolTermView>({
    queryKey: ["calendar-position"],
    queryFn: async () => {
      const res = await fetch(
        agentNativePath("/_agent-native/actions/get-current-term"),
      );
      if (!res.ok) throw await httpError(res);
      return await res.json();
    },
    // The week changes on a Monday, not by the minute.
    staleTime: 10 * 60_000,
  });
  return data ?? null;
}

/** Which week of the term it is and what it is for; null between terms. */
export function useCalendarPosition(): CalendarPositionView | null {
  return useSchoolTerm()?.calendar ?? null;
}
