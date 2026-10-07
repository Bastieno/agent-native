/**
 * The school's own week and rooms.
 *
 * Nothing here assumes which days a school teaches, how many periods it has,
 * or what it calls them. A week is whatever the school set; a day it does not
 * teach is simply absent. Day names are never written in code — they are
 * rendered from the day number and a locale.
 */

export type Weekday = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface WeekPeriod {
  number: number;
  start: string;
  end: string;
  kind: "lesson" | "break";
  label?: string;
}

export interface WeekDay {
  day: Weekday;
  periods: WeekPeriod[];
}

export interface SchoolWeek {
  cycleLength: 1;
  days: WeekDay[];
}

export type RoomKind = "classroom" | "special";

export interface Room {
  name: string;
  kind: RoomKind;
}

const TIME = /^([01]\d|2[0-3]):[0-5]\d$/;

function minutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

/**
 * The name of a weekday in a locale, from its ISO number (1 = Monday).
 * Rendered against a fixed week that starts on a Monday, in UTC, so neither
 * the host's timezone nor its locale can shift the day.
 */
export function schoolWeekdayName(day: number, locale?: string): string {
  const date = new Date(Date.UTC(2024, 0, day)); // 2024-01-01 is a Monday
  return new Intl.DateTimeFormat(locale, {
    weekday: "long",
    timeZone: "UTC",
  }).format(date);
}

/** Whether two time ranges share any time. Half-open: touching is not overlap. */
export function timesOverlap(
  aStart: string,
  aEnd: string,
  bStart: string,
  bEnd: string,
): boolean {
  return minutes(aStart) < minutes(bEnd) && minutes(bStart) < minutes(aEnd);
}

/** The period with this number on this day, or null if the school has none. */
export function findPeriod(
  week: SchoolWeek | null | undefined,
  day: number,
  number: number,
): WeekPeriod | null {
  const found = week?.days?.find((d) => d.day === day);
  return found?.periods?.find((p) => p.number === number) ?? null;
}

/** What makes a week unusable, one sentence each. An empty list means valid. */
export function weekProblems(week: SchoolWeek): string[] {
  const problems: string[] = [];
  if ((week.cycleLength as number) !== 1) {
    problems.push(
      "The week must repeat every week (cycleLength 1); other cycle lengths are not supported yet.",
    );
  }
  const seenDays = new Set<number>();
  for (const day of week.days ?? []) {
    const name = schoolWeekdayName(day.day, "en");
    if (!Number.isInteger(day.day) || day.day < 1 || day.day > 7) {
      problems.push(`Day ${day.day} is not a day of the week (use 1 to 7).`);
      continue;
    }
    if (seenDays.has(day.day)) {
      problems.push(`${name} is listed more than once.`);
    }
    seenDays.add(day.day);

    const seenNumbers = new Set<number>();
    const timed: WeekPeriod[] = [];
    for (const p of day.periods ?? []) {
      if (seenNumbers.has(p.number)) {
        problems.push(`${name} has more than one period ${p.number}.`);
      }
      seenNumbers.add(p.number);
      const startOk = TIME.test(p.start);
      const endOk = TIME.test(p.end);
      if (!startOk || !endOk) {
        problems.push(
          `${name}, period ${p.number} needs its times as HH:MM, like 08:00.`,
        );
        continue;
      }
      if (minutes(p.end) <= minutes(p.start)) {
        problems.push(`${name}, period ${p.number} ends before it starts.`);
        continue;
      }
      timed.push(p);
    }
    const ordered = [...timed].sort(
      (a, b) => minutes(a.start) - minutes(b.start),
    );
    for (let i = 1; i < ordered.length; i++) {
      const a = ordered[i - 1];
      const b = ordered[i];
      if (timesOverlap(a.start, a.end, b.start, b.end)) {
        problems.push(
          `${name}, period ${a.number} (${a.start}-${a.end}) overlaps period ${b.number} (${b.start}-${b.end}).`,
        );
      }
    }
  }
  return problems;
}

/** A room's name as it is compared: trimmed, spaces collapsed, lowercase. */
export function roomKey(name: string): string {
  return name.trim().replace(/\s+/g, " ").toLowerCase();
}

/** What makes a list of rooms unusable, one sentence each. */
export function roomProblems(rooms: Room[]): string[] {
  const problems: string[] = [];
  const seen = new Map<string, string>();
  for (const room of rooms ?? []) {
    const key = roomKey(room.name ?? "");
    if (!key) {
      problems.push("A room has no name.");
      continue;
    }
    const first = seen.get(key);
    if (first !== undefined) {
      problems.push(
        `"${room.name.trim()}" and "${first}" are the same room written two ways.`,
      );
    } else {
      seen.set(key, room.name.trim());
    }
  }
  return problems;
}
