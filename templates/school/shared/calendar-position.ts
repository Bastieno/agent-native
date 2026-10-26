/**
 * Where a date falls in a term: which week, and what that week is for.
 *
 * Every agent and screen that talks about "today's lessons" needs this, or it
 * reads a break as a gap: a mid-term break has lessons on the timetable and
 * no lesson notes, and nothing says why. The school's own weeks come from its
 * `reservedWeeks` (week, label, optional kind) and `examWeeksPerTerm`.
 *
 * A reserved week says what it is called, in the school's words. Its `kind`
 * says what that means for lessons. Where a school gave no kind (older
 * settings), it is read from the label, so nothing has to be migrated.
 */
import {
  reservedWeeksForTerm,
  termWeekCount,
  type ReservedWeek,
} from "./term-weeks";
import { reservedFromWeek } from "./objective-pacing";

export type WeekKind =
  | "teaching" // ordinary lessons
  | "break" // no lessons: mid-term break, half-term, spring break
  | "revision" // lessons are for revising
  | "assessment" // a test week: lessons, with assessments
  | "exam" // examinations
  | "reserved"; // set aside by the school, for something we cannot name

export const WEEK_KINDS: readonly WeekKind[] = [
  "break",
  "revision",
  "assessment",
  "exam",
];

export interface CalendarPosition {
  termName: string | null;
  week: number;
  totalWeeks: number;
  kind: WeekKind;
  /** What the school calls this week; null for an ordinary teaching week. */
  label: string | null;
  /** Whether new lesson notes are expected for this week. */
  lessonNotesExpected: boolean;
  /** One plain sentence, for people and for agents. */
  message: string;
  /** A few words for a screen, where the week is already named. */
  short: string | null;
  /** The next week that is not an ordinary teaching week. */
  next: {
    week: number;
    kind: WeekKind;
    label: string;
    inWeeks: number;
  } | null;
}

/** What a label means, when the school did not say. */
export function kindFromLabel(label: string): WeekKind {
  const l = label.toLowerCase();
  if (/(break|holiday|half-?term|vacation|recess|reading week)/.test(l)) {
    return "break";
  }
  if (/(revision|review|recap)/.test(l)) return "revision";
  if (/(exam|final|finals|assessment week|mock)/.test(l)) return "exam";
  if (/(test|assessment|continu|contr[oô]le|quiz|practical)/.test(l)) {
    return "assessment";
  }
  return "reserved";
}

const DAY_MS = 24 * 60 * 60 * 1000;

function dayNumber(iso: string): number {
  const [y, m, d] = iso.slice(0, 10).split("-").map(Number);
  return Math.floor(Date.UTC(y, (m || 1) - 1, d || 1) / DAY_MS);
}

type WeekInfo = { kind: WeekKind; label: string };

/** What each week of a term is, from the school's settings. */
function weekMap(
  totalWeeks: number,
  reserved: Array<ReservedWeek & { kind?: string }>,
  examWeeksPerTerm: number | null | undefined,
): Map<number, WeekInfo> {
  const map = new Map<number, WeekInfo>();
  for (const r of reserved) {
    if (r.week < 1 || r.week > totalWeeks) continue;
    const kind =
      r.kind && (WEEK_KINDS as readonly string[]).includes(r.kind)
        ? (r.kind as WeekKind)
        : kindFromLabel(r.label);
    map.set(r.week, { kind, label: r.label });
  }
  const examFrom = reservedFromWeek(totalWeeks, examWeeksPerTerm);
  if (examFrom) {
    for (let w = examFrom; w <= totalWeeks; w++) {
      // A school that named the week keeps its own words and kind.
      if (!map.has(w)) map.set(w, { kind: "exam", label: "Examinations" });
    }
  }
  return map;
}

function sentence(
  week: number,
  total: number,
  info: WeekInfo | undefined,
  termName: string | null,
): { message: string; lessonNotesExpected: boolean } {
  const where = `Week ${week} of ${total}${termName ? ` in ${termName}` : ""}`;
  if (!info) {
    return {
      message: `${where}: ordinary teaching.`,
      lessonNotesExpected: true,
    };
  }
  const { kind, label } = info;
  switch (kind) {
    case "break":
      return {
        message: `${where} is the ${label}. No lessons are expected, so no lesson notes are due. The timetable still shows the usual slots.`,
        lessonNotesExpected: false,
      };
    case "revision":
      return {
        message: `${where} is ${label}. Lessons are for revising, so no new lesson notes are expected.`,
        lessonNotesExpected: false,
      };
    case "assessment":
      return {
        message: `${where} is ${label}. Expect tests and assessments; new lesson notes are not usually written for it.`,
        lessonNotesExpected: false,
      };
    case "exam":
      return {
        message: `${where} is ${label}. Examinations are on, so no new lesson notes are expected.`,
        lessonNotesExpected: false,
      };
    default:
      return {
        message: `${where} is ${label}, which the school has set aside. No new lesson notes are expected.`,
        lessonNotesExpected: false,
      };
  }
}

export function calendarPosition(args: {
  term: {
    id?: string | null;
    name?: string | null;
    startDate: string;
    endDate: string;
  };
  today: string;
  reservedWeeks?: unknown;
  examWeeksPerTerm?: number | null;
}): CalendarPosition | null {
  const { term, today } = args;
  const total = termWeekCount(term.startDate, term.endDate);
  if (!total) return null;
  const since = dayNumber(today) - dayNumber(term.startDate);
  const week = Math.floor(since / 7) + 1;
  if (week < 1 || week > total) return null;

  const reserved = reservedWeeksForTerm(
    Array.isArray(args.reservedWeeks)
      ? (args.reservedWeeks as ReservedWeek[])
      : null,
    term.id ?? null,
  ) as Array<ReservedWeek & { kind?: string }>;
  const weeks = weekMap(total, reserved, args.examWeeksPerTerm);
  const info = weeks.get(week);
  const { message, lessonNotesExpected } = sentence(
    week,
    total,
    info,
    term.name ?? null,
  );

  let next: CalendarPosition["next"] = null;
  for (let w = week + 1; w <= total; w++) {
    const n = weeks.get(w);
    if (n) {
      next = { week: w, kind: n.kind, label: n.label, inWeeks: w - week };
      break;
    }
  }
  const SHORT: Record<WeekKind, string | null> = {
    teaching: null,
    break: "No lessons this week.",
    revision: "Lessons are for revising.",
    assessment: "Tests and assessments this week.",
    exam: "Examinations this week.",
    reserved: "Set aside by the school.",
  };
  return {
    termName: term.name ?? null,
    week,
    totalWeeks: total,
    kind: info?.kind ?? "teaching",
    label: info?.label ?? null,
    lessonNotesExpected,
    message,
    short: SHORT[info?.kind ?? "teaching"],
    next,
  };
}
