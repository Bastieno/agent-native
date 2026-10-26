import { schoolToday } from "../../shared/dates.js";
import {
  calendarPosition,
  type CalendarPosition,
} from "../../shared/calendar-position.js";
import { loadSchoolConfig, termContext } from "./timetable.js";

/**
 * Where the school is in its term today, and what the week is for: ordinary
 * teaching, a break, revision, an assessment week or examinations. Null
 * between terms. Every tool that talks about "today's lessons" carries it, so
 * an agent never reads a break as a gap.
 */
export async function calendarPositionFor(
  orgId: string,
  date?: string,
): Promise<CalendarPosition | null> {
  const config = await loadSchoolConfig(orgId);
  const today = date ?? schoolToday(config);
  const ctx = await termContext(orgId, today);
  if (!ctx?.current) return null;
  return calendarPosition({
    term: ctx.current,
    today,
    reservedWeeks: config.reservedWeeks,
    examWeeksPerTerm: config.examWeeksPerTerm,
  });
}
