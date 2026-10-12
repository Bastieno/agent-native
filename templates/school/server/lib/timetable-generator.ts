/**
 * Automatic timetable generation: pure, no database, no clock, no randomness.
 * The same input always gives the same output.
 */
import type { SchoolWeek } from "../../shared/school-week.js";
import type { ResolvedPeriod } from "./timetable-clashes.js";

export interface GenSlot {
  day: number;
  periodNumber: number;
  start: string;
  end: string;
}
export interface GenClass {
  classId: string;
  className: string;
  subjectName: string;
  armId: string | null;
  optionArmIds: string[];
  teacherIds: string[];
  teacherNames: Record<string, string>;
  room: string | null;
  learnerUserIds: string[];
  required: { periods: number; doubles: number } | null; // null = no lesson count
  placed: { periods: number; doubles: number }; // from countCoverage
}
export interface GenInput {
  week: SchoolWeek;
  locale?: string;
  armNames: Record<string, string>;
  fixed: ResolvedPeriod[]; // the term's lessons, never moved
  classes: GenClass[];
}
export type UnitKind = "single" | "double";
/** How a member uses a unit: its double, its singles (1 or 2 periods), or free. */
export interface GenMember {
  classId: string;
  use: "double" | "singles" | "free";
  periods: 0 | 1 | 2;
}
export interface GenUnit {
  id: string; // deterministic: `${blockKey|classId}:${kind}:${n}`
  kind: UnitKind;
  members: GenMember[]; // one member unless a block
  blockKey: string | null; // sorted option arm ids joined, for blocks
}

function shortfall(c: GenClass): { doubles: number; singles: number } {
  if (!c.required) return { doubles: 0, singles: 0 };
  const periods = Math.max(0, c.required.periods - c.placed.periods);
  const doubles = Math.max(0, c.required.doubles - c.placed.doubles);
  return { doubles, singles: Math.max(0, periods - 2 * doubles) };
}

const byText = (a: string, b: string) => (a < b ? -1 : a > b ? 1 : 0);

export function buildUnits(input: GenInput): {
  units: GenUnit[];
  notSet: string[];
  noTeacher: string[];
} {
  const notSet: string[] = [];
  const groups = new Map<
    string,
    { blockKey: string | null; classes: GenClass[] }
  >();
  for (const c of input.classes) {
    if (!c.required) {
      notSet.push(c.classId);
      continue;
    }
    const blockKey =
      c.optionArmIds.length > 0
        ? [...c.optionArmIds].sort(byText).join(",")
        : null;
    const groupKey = blockKey === null ? `c:${c.classId}` : `b:${blockKey}`;
    const g = groups.get(groupKey) ?? { blockKey, classes: [] };
    g.classes.push(c);
    groups.set(groupKey, g);
  }

  const units: GenUnit[] = [];
  const withUnits = new Set<string>();
  const orderOf = new Map<string, string>();
  for (const g of groups.values()) {
    const sorted = [...g.classes].sort((a, b) => byText(a.classId, b.classId));
    const key = g.blockKey ?? sorted[0].classId;
    const need = sorted.map((c) => ({ c, ...shortfall(c) }));
    const doubleUnits = Math.max(0, ...need.map((n) => n.doubles));
    const maxPeriods = Math.max(
      0,
      ...need.map((n) => n.singles + 2 * n.doubles),
    );
    const singleUnits = Math.max(0, maxPeriods - 2 * doubleUnits);
    const make = (kind: UnitKind, n: number): GenUnit => ({
      id: `${key}:${kind}:${n}`,
      kind,
      members: [],
      blockKey: g.blockKey,
    });
    const doubles = Array.from({ length: doubleUnits }, (_, n) =>
      make("double", n),
    );
    const singles = Array.from({ length: singleUnits }, (_, n) =>
      make("single", n),
    );
    for (const m of need) {
      let left = m.singles;
      let periods = 0;
      let dbl = 0;
      for (let i = 0; i < doubles.length; i++) {
        if (i < m.doubles) {
          doubles[i].members.push({
            classId: m.c.classId,
            use: "double",
            periods: 2,
          });
          periods += 2;
          dbl++;
        }
      }
      for (const u of singles) {
        if (left > 0) {
          left--;
          periods++;
          u.members.push({ classId: m.c.classId, use: "singles", periods: 1 });
        } else {
          u.members.push({ classId: m.c.classId, use: "free", periods: 0 });
        }
      }
      for (let i = m.doubles; i < doubles.length; i++) {
        const take = Math.min(2, left) as 0 | 1 | 2;
        left -= take;
        periods += take;
        doubles[i].members.push(
          take > 0
            ? { classId: m.c.classId, use: "singles", periods: take }
            : { classId: m.c.classId, use: "free", periods: 0 },
        );
      }
      if (
        left !== 0 ||
        periods !== m.singles + 2 * m.doubles ||
        dbl !== m.doubles
      ) {
        throw new Error(
          `timetable units lose lessons for class ${m.c.classId}`,
        );
      }
      if (m.doubles > 0 || m.singles > 0) withUnits.add(m.c.classId);
    }
    for (const u of [...doubles, ...singles]) {
      units.push(u);
      orderOf.set(u.id, key);
    }
  }

  const num = (id: string) => Number(id.slice(id.lastIndexOf(":") + 1));
  units.sort(
    (a, b) =>
      byText(orderOf.get(a.id)!, orderOf.get(b.id)!) ||
      (a.kind === b.kind ? 0 : a.kind === "double" ? -1 : 1) ||
      num(a.id) - num(b.id),
  );

  const noTeacher = input.classes
    .filter((c) => c.teacherIds.length === 0 && withUnits.has(c.classId))
    .map((c) => c.classId)
    .sort(byText);
  notSet.sort(byText);
  return { units, notSet, noTeacher };
}
