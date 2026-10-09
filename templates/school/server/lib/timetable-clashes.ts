import {
  roomKey,
  schoolWeekdayName,
  timesOverlap,
} from "../../shared/school-week.js";

export interface ResolvedPeriod {
  scheduleId: string;
  classId: string;
  className: string;
  subjectName: string;
  termId: string | null;
  day: number;
  periodNumber: number | null;
  start: string;
  end: string;
  room: string | null;
  teachers: { userId: string; name: string }[]; // primary + support; [] when unassigned
  armId: string | null;
  optionArmIds: string[];
  learnerUserIds: string[]; // active enrolments
}
export type ClashKind = "teacher" | "room" | "arm" | "learner";
export interface Clash {
  kind: ClashKind;
  scheduleIds: [string, string];
  day: number;
  periodNumber: number | null;
  message: string;
}

function attachedTo(p: ResolvedPeriod, armId: string): boolean {
  return p.armId === armId || p.optionArmIds.includes(armId);
}

/** The arm a whole-arm class of one period holds that the other is attached to. */
function sharedWholeArm(a: ResolvedPeriod, b: ResolvedPeriod): string | null {
  if (a.armId && attachedTo(b, a.armId)) return a.armId;
  if (b.armId && attachedTo(a, b.armId)) return b.armId;
  return null;
}

/**
 * Every clash between the given periods. Pure: callers resolve teachers,
 * arms and enrolments first. One clash per pair per kind.
 */
export function findClashes(
  periods: ResolvedPeriod[],
  ctx: { locale?: string; armNames: Record<string, string> },
): Clash[] {
  const out: Clash[] = [];
  const byDay = new Map<number, ResolvedPeriod[]>();
  for (const p of periods) {
    const list = byDay.get(p.day) ?? [];
    list.push(p);
    byDay.set(p.day, list);
  }

  for (const [day, list] of byDay) {
    const sorted = [...list].sort((x, y) => x.start.localeCompare(y.start));
    for (let i = 0; i < sorted.length; i++) {
      const a = sorted[i];
      for (let j = i + 1; j < sorted.length; j++) {
        const b = sorted[j];
        if (b.start >= a.end) break;
        if (!timesOverlap(a.start, a.end, b.start, b.end)) continue;

        const dayName = schoolWeekdayName(day, ctx.locale);
        const where =
          a.periodNumber != null ? `period ${a.periodNumber}` : `at ${a.start}`;
        const when = `on ${dayName}, ${where}`;
        const ids: [string, string] = [a.scheduleId, b.scheduleId];
        const push = (kind: ClashKind, message: string) =>
          out.push({
            kind,
            scheduleIds: ids,
            day,
            periodNumber: a.periodNumber,
            message,
          });
        const both = `${a.className} and ${b.className}`;

        const bTeachers = new Set(b.teachers.map((t) => t.userId));
        const sharedTeacher = a.teachers.find((t) => bTeachers.has(t.userId));
        if (sharedTeacher) {
          push("teacher", `${sharedTeacher.name} is down for ${both} ${when}.`);
        }

        const roomA = a.room ? roomKey(a.room) : "";
        if (roomA && b.room && roomA === roomKey(b.room)) {
          push("room", `${a.room!.trim()} is booked for ${both} ${when}.`);
        }

        const arm = sharedWholeArm(a, b);
        if (arm) {
          push(
            "arm",
            `${ctx.armNames[arm] ?? arm} has ${both} at the same time ${when}.`,
          );
        } else {
          const bLearners = new Set(b.learnerUserIds);
          const count = new Set(
            a.learnerUserIds.filter((u) => bLearners.has(u)),
          ).size;
          if (count > 0) {
            push("learner", `${count} learner(s) are in both ${both} ${when}.`);
          }
        }
      }
    }
  }
  return out;
}
