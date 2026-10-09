import { roomKey, schoolWeekdayName } from "../../shared/school-week.js";
import {
  clashesForTerm,
  findTerm,
  loadTimetable,
  previousTerm,
  resolveTerm,
  splitByAcademicYear,
} from "./timetable.js";

export interface TimetableFilter {
  termId?: string;
  armId?: string;
  teacherUserId?: string;
  room?: string;
}

/**
 * A term's timetable as a person reads it, narrowed to one arm, teacher or
 * room: what `get-timetable` returns, and what `view-screen` shows the agent
 * of the timetable page.
 */
export async function timetableView(orgId: string, args: TimetableFilter) {
  let found: { id: string; name: string; academicYearId: string } | null = null;
  if (args.termId) {
    found = await findTerm(orgId, args.termId);
    if (!found) throw new Error("That term is not in this school.");
  } else {
    const current = await resolveTerm(orgId);
    if (current.termId) found = await findTerm(orgId, current.termId);
  }
  const term = found ? { id: found.id, name: found.name } : null;

  const loaded = await clashesForTerm(orgId, term?.id ?? null);
  const { week, locale, fromUntermedRows } = loaded;

  let periods = loaded.periods;
  if (args.armId) {
    periods = periods.filter(
      (p) => p.armId === args.armId || p.optionArmIds.includes(args.armId!),
    );
  }
  if (args.teacherUserId) {
    periods = periods.filter((p) =>
      p.teachers.some((t) => t.userId === args.teacherUserId),
    );
  }
  if (args.room) {
    const wanted = roomKey(args.room);
    periods = periods.filter((p) => p.room && roomKey(p.room) === wanted);
  }
  const shown = new Set(periods.map((p) => p.scheduleId));
  const clashes = loaded.clashes.filter((c) =>
    c.scheduleIds.some((id) => shown.has(id)),
  );

  const dayNames: Record<number, string> = {};
  for (const d of week?.days ?? []) {
    dayNames[d.day] = schoolWeekdayName(d.day, locale);
  }

  const parts: string[] = [];
  if (!week) {
    parts.push(
      "The school hasn't set its week yet, so there are no periods to place lessons in (Settings → School week). Lessons show only the times typed against them.",
    );
  }
  if (!term) {
    parts.push("There is no current or upcoming term to show.");
  }
  parts.push(
    periods.length === 0
      ? `${term ? term.name : "This timetable"} has no periods placed.`
      : `${periods.length} period(s) placed${term ? ` in ${term.name}` : ""}.`,
  );
  if (fromUntermedRows && periods.length > 0) {
    parts.push(
      "None of these were set for this term in particular; they are the school's earlier timetable, which applies until this term has its own.",
    );
  }
  parts.push(
    clashes.length
      ? `${clashes.length} clash(es): ${clashes.map((c) => c.message).join(" ")}`
      : "No clashes.",
  );

  // Nothing of its own and no earlier timetable standing in: the term before,
  // when it has a timetable with classes of this term's year, is what the
  // page offers to copy (last year's classes never carry over). Read-only.
  const termEmpty = !!term && !fromUntermedRows && loaded.periods.length === 0;
  let before: { id: string; name: string } | null = null;
  if (termEmpty) {
    const prev = await previousTerm(orgId, found!.id);
    if (prev) {
      const { periods: prevPeriods } = await loadTimetable(orgId, prev.id);
      const { kept } = await splitByAcademicYear(
        orgId,
        prevPeriods,
        found!.academicYearId,
      );
      if (kept.length > 0) before = prev;
    }
  }

  return {
    term,
    week,
    dayNames,
    periods,
    clashes,
    fromUntermedRows,
    /** The term has no periods of its own and none from an earlier timetable. */
    termEmpty,
    /** The term before, when this one is empty and that one has a timetable. */
    previousTerm: before,
    message: parts.join(" "),
  };
}
