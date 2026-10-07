import { schoolLocale, schoolTimeZone } from "../../shared/dates.js";
import {
  schoolWeekdayName,
  timesOverlap,
  type WeekPeriod,
} from "../../shared/school-week.js";
import { getSchoolRole, getUserIdByEmail } from "./student-access.js";
import { loadSchoolConfig, loadTimetable, resolveTerm } from "./timetable.js";
import type { ResolvedPeriod } from "./timetable-clashes.js";

export interface MyWeekLesson {
  classId: string;
  className: string;
  subjectName: string;
  teacherName: string | null;
  room: string | null;
}

export interface MyWeek {
  term: { id: string; name: string } | null;
  termStatus: "current" | "next" | "none";
  days: Array<{
    day: number;
    dayName: string;
    isToday: boolean;
    periods: Array<{
      number: number;
      start: string;
      end: string;
      kind: "lesson" | "break";
      label?: string;
      lessons: MyWeekLesson[];
    }>;
  }>;
  next: {
    dayName: string;
    start: string;
    className: string;
    room: string | null;
  } | null;
  message: string;
}

const minutes = (time: string) => {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
};

/**
 * The moment a reader is at, as a weekday (1 = Monday) and minutes into the
 * day, on the school's own clock. A date that is passed in means the start of
 * that day, so the answer does not depend on when it is asked. A timezone the
 * runtime does not know falls back to UTC.
 */
function reference(date: string | undefined, timeZone: string | undefined) {
  let y: number, mo: number, d: number, at: number;
  if (date) {
    [y, mo, d] = date.split("-").map(Number);
    at = 0;
  } else {
    const parts = (zone: string | undefined) =>
      new Intl.DateTimeFormat("en-US", {
        timeZone: zone,
        hourCycle: "h23",
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      }).formatToParts(new Date());
    let list;
    try {
      list = parts(timeZone);
    } catch {
      list = parts("UTC");
    }
    const get = (type: string) =>
      Number(list.find((p) => p.type === type)?.value ?? 0);
    y = get("year");
    mo = get("month");
    d = get("day");
    at = get("hour") * 60 + get("minute");
  }
  const js = new Date(Date.UTC(y, mo - 1, d, 12)).getUTCDay();
  return { weekday: js === 0 ? 7 : js, at };
}

/**
 * What a person's week looks like: a learner's enrolled classes, or the
 * classes a member of staff teaches. Shared by `get-my-week` and `view-screen`
 * so the page and the agent read the same thing.
 *
 * Built from named fields only. Clashes, other learners, arms and option-block
 * lists never reach the reply; a person's own unresolved clash shows as two
 * lessons in one period and nothing more.
 */
export async function getMyWeek(
  orgId: string,
  userEmail: string | undefined,
  date?: string,
): Promise<MyWeek> {
  if (!userEmail) throw new Error("No authenticated user.");
  const userId = await getUserIdByEmail(userEmail);
  if (!userId) throw new Error("User not found.");
  const role = await getSchoolRole(userEmail);

  const config = await loadSchoolConfig(orgId);
  const locale = schoolLocale(config);
  const term = await resolveTerm(orgId, date);
  const { week, periods } = await loadTimetable(orgId, term.termId);

  const termInfo =
    term.termId && term.termName
      ? { id: term.termId, name: term.termName }
      : null;
  const base = { term: termInfo, termStatus: term.status };

  if (!week || week.days.length === 0) {
    return {
      ...base,
      days: [],
      next: null,
      message: "Your school hasn't set its timetable yet.",
    };
  }

  const mine: ResolvedPeriod[] = periods.filter((p) =>
    role === "student"
      ? p.learnerUserIds.includes(userId)
      : p.teachers.some((t) => t.userId === userId),
  );

  const now = reference(date, schoolTimeZone(config));

  // Each of their rows goes to the week period with its number; a row whose
  // number the week lacks (typed times, a missing period) goes to the lesson
  // period its times overlap. A row that overlaps none is left out of the
  // grid but still counts for "next".
  const days = [...week.days]
    .sort((a, b) => a.day - b.day)
    .map((d) => {
      const slots = [...d.periods].sort((a, b) => a.number - b.number);
      const placed = new Map<number, ResolvedPeriod[]>();
      for (const p of mine.filter((m) => m.day === d.day)) {
        const slot: WeekPeriod | undefined =
          slots.find(
            (s) => s.kind === "lesson" && s.number === p.periodNumber,
          ) ??
          slots.find(
            (s) =>
              s.kind === "lesson" &&
              timesOverlap(s.start, s.end, p.start, p.end),
          );
        if (!slot) continue;
        placed.set(slot.number, [...(placed.get(slot.number) ?? []), p]);
      }
      return {
        day: d.day as number,
        dayName: schoolWeekdayName(d.day, locale),
        isToday: d.day === now.weekday,
        periods: slots.map((s) => {
          const seen = new Set<string>();
          const lessons: MyWeekLesson[] = [];
          for (const p of placed.get(s.number) ?? []) {
            if (seen.has(p.classId)) continue;
            seen.add(p.classId);
            lessons.push({
              classId: p.classId,
              className: p.className,
              subjectName: p.subjectName,
              teacherName: p.teachers[0]?.name ?? null,
              room: p.room,
            });
          }
          lessons.sort((a, b) => a.className.localeCompare(b.className));
          return {
            number: s.number,
            start: s.start,
            end: s.end,
            kind: s.kind,
            ...(s.label ? { label: s.label } : {}),
            lessons,
          };
        }),
      };
    });

  // The next lesson after now, wrapping into next week. Counts every row of
  // theirs, including any the grid left out.
  let next: MyWeek["next"] = null;
  let best = Infinity;
  for (const p of mine) {
    let ahead = (p.day - now.weekday + 7) % 7;
    if (ahead === 0 && minutes(p.start) < now.at) ahead = 7;
    const key = ahead * 1440 + minutes(p.start);
    if (key < best) {
      best = key;
      next = {
        dayName: schoolWeekdayName(p.day, locale),
        start: p.start,
        className: p.className,
        room: p.room,
      };
    }
  }

  let message: string;
  if (mine.length === 0) message = "Nothing is on your timetable yet.";
  else if (term.status === "next" && term.termName)
    message = `This is your timetable for ${term.termName}, which hasn't started yet.`;
  else if (term.termName) message = `Your week for ${term.termName}.`;
  else message = "Your week.";

  return { ...base, days, next, message };
}
