/**
 * Automatic timetable generation: pure, no database, no randomness, no clock
 * but the injected `now`. The same input always gives the same output.
 */
import {
  doubleSecondPeriod,
  roomKey,
  schoolWeekdayName,
  timesOverlap,
  type SchoolWeek,
} from "../../shared/school-week.js";
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

// ── The solver ──

/** How long a run may search before it stops and returns what it has. */
export const GENERATION_BUDGET_MS = 4000;
/** How many placed units a stuck unit may take back and re-place. */
export const REPAIR_DEPTH = 3;

export interface ProposedLesson {
  classId: string;
  day: number;
  periodNumber: number;
  start: string;
  end: string;
  room: string | null;
  pairKey: string | null; // shared by a double's two halves
}
export type Blocker =
  | { kind: "arm-full"; armIds: string[] }
  | { kind: "teacher-busy"; teacherId: string; days: number[] }
  | { kind: "no-consecutive"; days: number[] }
  | { kind: "block-teachers"; teacherIds: string[] }
  | { kind: "room-busy"; room: string }
  | { kind: "learners-busy"; classIds: string[]; count: number }
  | { kind: "class-full"; classId: string }
  | { kind: "budget" };
export interface UnplacedUnit {
  unitId: string;
  classIds: string[];
  kind: UnitKind;
  blockers: Blocker[];
}

/** One lesson as the clash rules see it. */
interface Party {
  classId: string;
  teachers: string[];
  room: string; // roomKey, "" for none
  armId: string | null;
  attached: string[]; // armId plus option arms
  learners: string[];
}
/** A lesson period of the week. `second` is the slot a double ends in, or -1. */
interface Slot {
  day: number;
  periodNumber: number;
  start: string;
  end: string;
  second: number;
  overlaps: number[]; // slots sharing time with this one, itself included
}
interface Lesson {
  member: GenMember;
  party: Party;
  slot: number;
  pairKey: string | null;
}
interface Fault {
  arm: boolean; // a whole arm against something attached to it
  self: boolean; // the class itself is already busy
  learners: boolean; // a shared learner
  teachers: string[];
  room: boolean;
}

const uniq = <T>(xs: T[]) => [...new Set(xs)];

function partyOf(c: {
  classId: string;
  teachers: string[];
  room: string | null;
  armId: string | null;
  optionArmIds: string[];
  learners: string[];
}): Party {
  return {
    classId: c.classId,
    teachers: uniq(c.teachers),
    room: c.room ? roomKey(c.room) : "",
    armId: c.armId,
    attached: uniq([...(c.armId ? [c.armId] : []), ...c.optionArmIds]),
    learners: uniq(c.learners),
  };
}

/**
 * Who is busy in a slot, as counts per key, so a candidate is checked by
 * lookups. The keys reproduce `findClashes` exactly: a shared teacher; a
 * shared non-empty room key; a whole-arm class against anything attached to
 * its arm (option classes of the same arms never clash with each other); a
 * shared learner. A class is also never in two places at once.
 */
class Occupancy {
  private n = new Map<string, number>();
  private bump(k: string, d: number) {
    const v = (this.n.get(k) ?? 0) + d;
    if (v === 0) this.n.delete(k);
    else this.n.set(k, v);
  }
  private has(k: string) {
    return this.n.has(k);
  }
  add(p: Party, d: 1 | -1) {
    this.bump(`c:${p.classId}`, d);
    for (const t of p.teachers) this.bump(`t:${t}`, d);
    if (p.room) this.bump(`r:${p.room}`, d);
    if (p.armId) this.bump(`w:${p.armId}`, d);
    for (const a of p.attached) this.bump(`a:${a}`, d);
    for (const l of p.learners) this.bump(`l:${l}`, d);
  }
  fault(p: Party, into: Fault) {
    if (this.has(`c:${p.classId}`)) into.self = true;
    if (
      (p.armId !== null && this.has(`a:${p.armId}`)) ||
      p.attached.some((a) => this.has(`w:${a}`))
    ) {
      into.arm = true;
    }
    if (p.learners.some((l) => this.has(`l:${l}`))) into.learners = true;
    for (const t of p.teachers) if (this.has(`t:${t}`)) into.teachers.push(t);
    if (p.room && this.has(`r:${p.room}`)) into.room = true;
  }
}

/** The same rules between two lessons. */
function pairFault(a: Party, b: Party, into: Fault) {
  if (a.classId === b.classId) into.self = true;
  if (
    (a.armId !== null && b.attached.includes(a.armId)) ||
    (b.armId !== null && a.attached.includes(b.armId))
  ) {
    into.arm = true;
  }
  if (a.learners.some((l) => b.learners.includes(l))) into.learners = true;
  for (const t of a.teachers) if (b.teachers.includes(t)) into.teachers.push(t);
  if (a.room && a.room === b.room) into.room = true;
}

const noFault = (): Fault => ({
  arm: false,
  self: false,
  learners: false,
  teachers: [],
  room: false,
});
const faulty = (f: Fault) =>
  f.arm || f.self || f.learners || f.room || f.teachers.length > 0;

function buildSlots(week: SchoolWeek): Slot[] {
  const slots: Slot[] = [];
  const days = [...(week.days ?? [])].sort((a, b) => a.day - b.day);
  for (const d of days) {
    const lessons = (d.periods ?? [])
      .filter((p) => p.kind === "lesson")
      .sort((a, b) => a.start.localeCompare(b.start));
    for (const p of lessons) {
      slots.push({
        day: d.day,
        periodNumber: p.number,
        start: p.start,
        end: p.end,
        second: -1,
        overlaps: [],
      });
    }
  }
  const at = new Map(slots.map((s, i) => [`${s.day}:${s.periodNumber}`, i]));
  for (const s of slots) {
    const second = doubleSecondPeriod(week, s.day, s.periodNumber).second;
    s.second = second ? (at.get(`${s.day}:${second.number}`) ?? -1) : -1;
    s.overlaps = slots
      .map((o, i) => ({ o, i }))
      .filter(
        ({ o }) =>
          o.day === s.day && timesOverlap(o.start, o.end, s.start, s.end),
      )
      .map(({ i }) => i);
  }
  return slots;
}

export function generateTimetable(
  input: GenInput,
  opts: { now?: () => number; budgetMs?: number } = {},
): {
  lessons: ProposedLesson[];
  unplaced: UnplacedUnit[];
  notSet: string[];
  noTeacher: string[];
  elapsedMs: number;
} {
  const now = opts.now ?? Date.now;
  const budget = opts.budgetMs ?? GENERATION_BUDGET_MS;
  const t0 = now();
  const spent = () => now() - t0 >= budget;

  const { units, notSet, noTeacher } = buildUnits(input);
  const slots = buildSlots(input.week);
  const classes = new Map(input.classes.map((c) => [c.classId, c]));
  const party = new Map(
    input.classes.map((c) => [
      c.classId,
      partyOf({ ...c, teachers: c.teacherIds, learners: c.learnerUserIds }),
    ]),
  );

  // Fixed lessons, by time: each blocks every slot its stored times overlap.
  const fixed = slots.map(() => new Occupancy());
  const fixedAt: Party[][] = slots.map(() => []);
  const load = new Map<string, number>(); // `${classId}:${day}` → lessons
  const loadKey = (classId: string, day: number) => `${classId}:${day}`;
  const bumpLoad = (classId: string, day: number, d: number) =>
    load.set(loadKey(classId, day), (load.get(loadKey(classId, day)) ?? 0) + d);
  const seenPairs = new Set<string>();
  for (const f of input.fixed) {
    const p = partyOf({
      classId: f.classId,
      teachers: f.teachers.map((t) => t.userId),
      room: f.room,
      armId: f.armId,
      optionArmIds: f.optionArmIds,
      learners: f.learnerUserIds,
    });
    slots.forEach((s, i) => {
      if (s.day === f.day && timesOverlap(s.start, s.end, f.start, f.end)) {
        fixed[i].add(p, 1);
        fixedAt[i].push(p);
      }
    });
    const group = f.pairId ? `${f.classId}:${f.day}:${f.pairId}` : null;
    if (group && seenPairs.has(group)) continue;
    if (group) seenPairs.add(group);
    bumpLoad(f.classId, f.day, 1);
  }

  const gen = slots.map(() => new Occupancy());
  const genAt: { unit: number; party: Party }[][] = slots.map(() => []);
  const placedAt = units.map(() => -1);

  const needsTwo = (u: GenUnit) =>
    u.kind === "double" || u.members.some((m) => m.use === "double");
  const starts = (u: GenUnit) =>
    slots.map((_, i) => i).filter((i) => !needsTwo(u) || slots[i].second >= 0);

  /** The lessons a unit gives when it starts at a slot. */
  function layout(u: GenUnit, s: number, asSingles = false): Lesson[] {
    const out: Lesson[] = [];
    for (const m of u.members) {
      if (m.periods === 0) continue;
      const p = party.get(m.classId)!;
      if (asSingles) {
        out.push({ member: m, party: p, slot: s, pairKey: null });
        continue;
      }
      const pairKey = m.use === "double" ? `${u.id}:${m.classId}` : null;
      out.push({ member: m, party: p, slot: s, pairKey });
      if (m.periods === 2) {
        out.push({ member: m, party: p, slot: slots[s].second, pairKey });
      }
    }
    return out;
  }

  /** Every way the lessons clash, with fixed, placed, and each other. */
  function faultOf(lessons: Lesson[], withGen = true): Fault {
    const f = noFault();
    lessons.forEach((l, i) => {
      fixed[l.slot].fault(l.party, f);
      if (withGen) gen[l.slot].fault(l.party, f);
      for (let j = i + 1; j < lessons.length; j++) {
        if (slots[l.slot].overlaps.includes(lessons[j].slot)) {
          pairFault(l.party, lessons[j].party, f);
        }
      }
    });
    return f;
  }

  const legal = (u: GenUnit, s: number, withGen = true) =>
    !faulty(faultOf(layout(u, s), withGen));

  /** How much a member adds to its class's day load: a double counts once. */
  const weight = (m: GenMember) => (m.use === "double" ? 1 : m.periods);

  /**
   * The day load a unit meets at a start, each member's load weighted by what
   * it adds. Moving a unit to a strictly lower score lowers the sum of squared
   * day loads, so the spread pass always ends.
   */
  function score(u: GenUnit, s: number): number {
    const day = slots[s].day;
    let n = 0;
    for (const m of u.members) {
      n += weight(m) * (load.get(loadKey(m.classId, day)) ?? 0);
    }
    return n;
  }

  /** The best legal start: lightest day for the unit's classes, then earliest. */
  function best(u: GenUnit): number {
    let found = -1;
    let bestScore = Infinity;
    for (const s of starts(u)) {
      if (!legal(u, s)) continue;
      const sc = score(u, s);
      if (sc < bestScore) {
        bestScore = sc;
        found = s;
      }
    }
    return found;
  }

  function place(ui: number, s: number) {
    const u = units[ui];
    for (const l of layout(u, s)) {
      for (const t of slots[l.slot].overlaps) {
        gen[t].add(l.party, 1);
        genAt[t].push({ unit: ui, party: l.party });
      }
    }
    for (const m of u.members) {
      if (m.periods === 0) continue;
      bumpLoad(m.classId, slots[s].day, weight(m));
    }
    placedAt[ui] = s;
  }

  function unplace(ui: number) {
    const u = units[ui];
    const s = placedAt[ui];
    for (const l of layout(u, s)) {
      for (const t of slots[l.slot].overlaps) {
        gen[t].add(l.party, -1);
        genAt[t] = genAt[t].filter((g) => g.unit !== ui);
      }
    }
    for (const m of u.members) {
      if (m.periods === 0) continue;
      bumpLoad(m.classId, slots[s].day, -weight(m));
    }
    placedAt[ui] = -1;
  }

  /**
   * Take back up to REPAIR_DEPTH placed units that stand in the way of one
   * start, place this unit there, and re-place them. On failure everything
   * goes back as it was.
   */
  function repair(ui: number): boolean {
    const u = units[ui];
    const options: { s: number; blocking: number[] }[] = [];
    for (const s of starts(u)) {
      const lessons = layout(u, s);
      if (faulty(faultOf(lessons, false))) continue; // fixed is never moved
      const blocking = new Set<number>();
      for (const l of lessons) {
        for (const g of genAt[l.slot]) {
          const f = noFault();
          pairFault(l.party, g.party, f);
          if (faulty(f)) blocking.add(g.unit);
        }
      }
      if (blocking.size > 0 && blocking.size <= REPAIR_DEPTH) {
        options.push({ s, blocking: [...blocking].sort((a, b) => a - b) });
      }
    }
    options.sort((a, b) => a.blocking.length - b.blocking.length);
    for (const { s, blocking } of options) {
      if (spent()) break;
      const was = blocking.map((b) => placedAt[b]);
      blocking.forEach(unplace);
      place(ui, s);
      const redone: number[] = [];
      for (const b of blocking) {
        const to = best(units[b]);
        if (to < 0) break;
        place(b, to);
        redone.push(b);
      }
      if (redone.length === blocking.length) return true;
      redone.forEach(unplace);
      unplace(ui);
      blocking.forEach((b, i) => place(b, was[i]));
    }
    return false;
  }

  /**
   * What blocks a unit at one start, by source. `outside` is every fault from
   * a class outside the unit, plus teacher and room faults between its own
   * members (a block's teachers). `learnerClasses` and `learners` are the
   * outside classes sharing its learners and the learners shared. `own` is
   * the unit's classes already busy there with their own lessons, and
   * `sibling` the members sharing a learner with each other.
   */
  function blockersAt(u: GenUnit, s: number) {
    const members = new Set(u.members.map((m) => m.classId));
    const outside = noFault();
    const learnerClasses = new Set<string>();
    const learners = new Set<string>();
    const own = new Set<string>();
    const sibling = new Set<string>();
    const siblingLearners = new Set<string>();
    const lessons = layout(u, s);
    lessons.forEach((l, i) => {
      const around = [...fixedAt[l.slot], ...genAt[l.slot].map((g) => g.party)];
      for (const o of around) {
        if (members.has(o.classId)) {
          // The unit's own lessons still hold its arm: a whole-arm class whose
          // arm is filled by its own lessons is arm-full, not class-full.
          const f = noFault();
          pairFault(l.party, o, f);
          if (f.arm) outside.arm = true;
          else if (o.classId === l.party.classId) own.add(o.classId);
          continue;
        }
        pairFault(l.party, o, outside);
        const mine = l.party.learners.filter((x) => o.learners.includes(x));
        if (mine.length === 0) continue;
        learnerClasses.add(o.classId);
        for (const x of mine) learners.add(x);
      }
      for (let j = i + 1; j < lessons.length; j++) {
        const o = lessons[j];
        if (o.party.classId === l.party.classId) continue;
        if (!slots[l.slot].overlaps.includes(o.slot)) continue;
        const f = noFault();
        pairFault(l.party, o.party, f);
        outside.teachers.push(...f.teachers);
        if (f.room) outside.room = true;
        if (f.learners) {
          sibling.add(l.party.classId);
          sibling.add(o.party.classId);
          for (const x of l.party.learners) {
            if (o.party.learners.includes(x)) siblingLearners.add(x);
          }
        }
      }
    });
    outside.teachers = uniq(outside.teachers);
    return {
      s,
      outside,
      learnerClasses,
      learners,
      own,
      sibling,
      siblingLearners,
    };
  }

  /**
   * Why a unit has nowhere to go, most telling reason first. Starts are
   * sifted arm, learners, teacher, room, then the unit's own lessons: the
   * first reason that blocks every start still left is the one given.
   */
  function explain(u: GenUnit): Blocker[] {
    const out: Blocker[] = [];
    const days = uniq(slots.map((s) => s.day));
    const cands = starts(u);
    if (needsTwo(u)) {
      if (cands.length === 0) return [{ kind: "no-consecutive", days }];
      const singleFits = days.filter((d) =>
        slots.some(
          (s, i) => s.day === d && !faulty(faultOf(layout(u, i, true))),
        ),
      );
      if (singleFits.length > 0) {
        out.push({ kind: "no-consecutive", days: singleFits });
      }
    }
    let rest = cands.map((s) => blockersAt(u, s));
    type At = (typeof rest)[number];
    /** True when `has` blocks every start left; else drops those it blocks. */
    const sift = (has: (x: At) => boolean) => {
      if (rest.every(has)) return true;
      rest = rest.filter((x) => !has(x));
      return false;
    };

    // Only a unit with arms can be arm-blocked, so armIds is never empty.
    if (sift((x) => x.outside.arm)) {
      const armIds = uniq(
        u.members
          .filter((m) => m.periods > 0)
          .flatMap((m) => party.get(m.classId)!.attached),
      ).sort();
      out.push({ kind: "arm-full", armIds });
      return out;
    }
    // An outside learner fault always comes with the class that holds them.
    if (sift((x) => x.learnerClasses.size > 0)) {
      const classIds = new Set<string>();
      const learners = new Set<string>();
      for (const x of rest) {
        x.learnerClasses.forEach((c) => classIds.add(c));
        x.learners.forEach((l) => learners.add(l));
      }
      out.push({
        kind: "learners-busy",
        classIds: [...classIds].sort(byText),
        count: learners.size,
      });
      return out;
    }
    const teacherRest = rest;
    if (sift((x) => x.outside.teachers.length > 0)) {
      const busy = new Map<string, Set<number>>();
      for (const { s, outside } of teacherRest) {
        for (const t of outside.teachers) {
          const set = busy.get(t) ?? new Set<number>();
          set.add(slots[s].day);
          busy.set(t, set);
        }
      }
      const ids = [...busy.keys()].sort();
      if (u.blockKey !== null) {
        out.push({ kind: "block-teachers", teacherIds: ids });
      } else {
        for (const t of ids) {
          const d = [...busy.get(t)!].sort((a, b) => a - b);
          out.push({ kind: "teacher-busy", teacherId: t, days: d });
        }
      }
      return out;
    }
    // A room fault needs a member with a room, so this names at least one.
    if (sift((x) => x.outside.room)) {
      const rooms = uniq(
        u.members
          .filter((m) => m.periods > 0 && party.get(m.classId)!.room)
          .map((m) => classes.get(m.classId)!.room!.trim()),
      );
      for (const room of rooms) out.push({ kind: "room-busy", room });
      return out;
    }
    if (sift((x) => x.own.size > 0)) {
      const own = new Set<string>();
      for (const x of rest) x.own.forEach((c) => own.add(c));
      for (const classId of [...own].sort(byText)) {
        out.push({ kind: "class-full", classId });
      }
      return out;
    }
    // What is left can only be members of one unit sharing a learner, which
    // no slot can fix: name them, as that is the true reason.
    const sibling = new Set<string>();
    const shared = new Set<string>();
    for (const x of rest) {
      x.sibling.forEach((c) => sibling.add(c));
      x.siblingLearners.forEach((l) => shared.add(l));
    }
    out.push({
      kind: "learners-busy",
      classIds: [...sibling].sort(byText),
      count: shared.size,
    });
    return out;
  }

  // Hardest first: blocks, then doubles, then fewest legal starts at the start.
  const freedom = units.map(
    (u) => starts(u).filter((s) => legal(u, s, false)).length,
  );
  const order = units
    .map((u, i) => ({
      i,
      key: [
        u.blockKey !== null ? 0 : 1,
        u.kind === "double" ? 0 : 1,
        freedom[i],
      ],
    }))
    .sort(
      (a, b) =>
        a.key[0] - b.key[0] ||
        a.key[1] - b.key[1] ||
        a.key[2] - b.key[2] ||
        a.i - b.i,
    )
    .map((x) => x.i);

  const unplaced = new Map<number, Blocker[]>();
  for (let k = 0; k < order.length; k++) {
    if (spent()) {
      for (const ui of order.slice(k)) unplaced.set(ui, [{ kind: "budget" }]);
      break;
    }
    const ui = order[k];
    const s = best(units[ui]);
    if (s >= 0) place(ui, s);
    else if (!repair(ui)) unplaced.set(ui, explain(units[ui]));
  }

  // Spread: move placed units to lighter days while a legal move exists.
  // Each move lowers the sum of squared day loads, so this ends.
  let moved = true;
  spread: while (moved) {
    moved = false;
    for (const ui of order) {
      if (spent()) break spread;
      const from = placedAt[ui];
      if (from < 0) continue;
      unplace(ui);
      const before = score(units[ui], from);
      const to = best(units[ui]);
      if (to >= 0 && score(units[ui], to) < before) {
        place(ui, to);
        moved = true;
      } else {
        place(ui, from);
      }
    }
  }

  const lessons: ProposedLesson[] = [];
  units.forEach((u, ui) => {
    if (placedAt[ui] < 0) return;
    for (const l of layout(u, placedAt[ui])) {
      const s = slots[l.slot];
      lessons.push({
        classId: l.member.classId,
        day: s.day,
        periodNumber: s.periodNumber,
        start: s.start,
        end: s.end,
        room: classes.get(l.member.classId)!.room,
        pairKey: l.pairKey,
      });
    }
  });
  lessons.sort(
    (a, b) =>
      a.day - b.day ||
      a.start.localeCompare(b.start) ||
      byText(a.classId, b.classId),
  );

  return {
    lessons,
    unplaced: [...unplaced.keys()]
      .sort((a, b) => a - b)
      .map((ui) => ({
        unitId: units[ui].id,
        classIds: units[ui].members
          .filter((m) => m.periods > 0)
          .map((m) => m.classId),
        kind: units[ui].kind,
        blockers: unplaced.get(ui)!,
      })),
    notSet,
    noTeacher,
    elapsedMs: now() - t0,
  };
}

// ── Saying in words why a lesson did not fit ──

/** The school's own nouns, passed in; the code holds none. */
export interface Words {
  arm: string;
  double: string;
  doubles: string;
  learner: string;
  learners: string;
  teacher: string;
}

/** "A, B and C": names only, no ids; empty names are dropped. */
function joinNames(names: string[], locale?: string): string {
  const list = names.map((n) => n.trim()).filter(Boolean);
  if (list.length <= 1) return list[0] ?? "";
  // Intl.ListFormat is in every supported runtime but not in the ES2020 lib.
  const ListFormat = (
    Intl as unknown as {
      ListFormat: new (
        locale?: string,
        options?: { type: "conjunction" },
      ) => { format(list: string[]): string };
    }
  ).ListFormat;
  return new ListFormat(locale, { type: "conjunction" }).format(list);
}

/** Most specific first; the first kind a unit carries gives its sentence. */
const PRIMARY_ORDER: Blocker["kind"][] = [
  "class-full",
  "learners-busy",
  "teacher-busy",
  "block-teachers",
  "room-busy",
  "arm-full",
  "no-consecutive",
  "budget",
];

/**
 * One plain sentence per unplaced unit, plus one sentence each for the
 * classes with no lesson counts and the classes with no teacher. A unit can
 * carry several blockers; the most specific kind (PRIMARY_ORDER) is the one
 * said, and every blocker of that kind is named. Pure, and free of ids.
 */
export function explainUnplaced(
  result: ReturnType<typeof generateTimetable>,
  input: GenInput,
  words: Words,
): {
  reasons: { classIds: string[]; message: string }[];
  notSet: string[];
  noTeacher: string[];
} {
  const classById = new Map(input.classes.map((c) => [c.classId, c]));
  const nameOf = (id: string) => classById.get(id)?.className?.trim() ?? "";
  const join = (names: string[]) => joinNames(names, input.locale);
  const namesOf = (ids: string[]) => join(ids.map(nameOf));
  const day = (d: number) => schoolWeekdayName(d, input.locale);

  const reasons = result.unplaced.map((u) => {
    const teacherName = (id: string) => {
      for (const cid of u.classIds) {
        const n = classById.get(cid)?.teacherNames?.[id]?.trim();
        if (n) return n;
      }
      for (const c of input.classes) {
        const n = c.teacherNames?.[id]?.trim();
        if (n) return n;
      }
      return "";
    };
    const names = namesOf(u.classIds);
    const what = names || "a class";
    const lead =
      u.kind === "double"
        ? `A ${words.double} for ${what}`
        : `A lesson for ${what}`;
    const rank = (b: Blocker) => PRIMARY_ORDER.indexOf(b.kind);
    const primary = [...u.blockers].sort((a, b) => rank(a) - rank(b))[0];
    const same = u.blockers.filter((b) => b.kind === primary?.kind);
    let reason = "it could not be fitted in";

    switch (primary?.kind) {
      case "class-full": {
        const own = namesOf(
          same.flatMap((b) => (b.kind === "class-full" ? [b.classId] : [])),
        );
        reason = `${own || "its own"} lessons already fill every time it could go`;
        break;
      }
      case "learners-busy": {
        const b = primary;
        const others = namesOf(b.classIds);
        const inBlock =
          b.classIds.length > 0 &&
          b.classIds.every((id) => u.classIds.includes(id));
        if (inBlock) {
          reason =
            b.count > 1
              ? `${b.count} ${words.learners} are each in two of its options at once (${others}), so those options cannot share a time`
              : `a ${words.learner} is in two of its options at once (${others}), so those options cannot share a time`;
        } else {
          const who =
            b.count > 0
              ? `${b.count} ${b.count === 1 ? `${words.learner} is` : `${words.learners} are`}`
              : `some of its ${words.learners} are`;
          reason = others
            ? `${who} in another lesson (${others}) at every free time`
            : `${who} in another lesson at every free time`;
        }
        break;
      }
      case "teacher-busy": {
        const parts = same.flatMap((b) => {
          if (b.kind !== "teacher-busy") return [];
          const who = teacherName(b.teacherId) || `a ${words.teacher}`;
          const days = join(b.days.map(day));
          return [
            `${who} is teaching at every free time${days ? ` on ${days}` : ""}`,
          ];
        });
        reason = parts.join("; ");
        break;
      }
      case "block-teachers": {
        const ids = primary.teacherIds.filter((id) => teacherName(id));
        const who = join(ids.map(teacherName));
        reason = who
          ? `${who} ${ids.length === 1 ? "is" : "are"} teaching elsewhere at every time its ${words.arm} is free`
          : `the ${words.teacher} of its options is teaching elsewhere at every time its ${words.arm} is free`;
        break;
      }
      case "room-busy": {
        const rooms = join(
          same.flatMap((b) => (b.kind === "room-busy" ? [b.room] : [])),
        );
        reason = rooms
          ? `${rooms} is in use at every other free time`
          : "its room is in use at every other free time";
        break;
      }
      case "arm-full": {
        const arms = join(
          primary.armIds.map((id) => input.armNames[id]?.trim() ?? ""),
        );
        reason = arms
          ? `every free time is already taken for the ${words.arm} (${arms})`
          : "it has no free time left";
        break;
      }
      case "no-consecutive": {
        // `days` only says where the unit could not be fitted as two lessons
        // in a row; it does not say why, so the sentence claims no more.
        const days = join(primary.days.map(day));
        const need = u.kind === "double" ? `a ${words.double}` : "it";
        reason = days
          ? `${need} needs two lessons in a row, and none could be fitted on ${days}`
          : `${need} needs two lessons in a row, and none could be fitted`;
        break;
      }
      case "budget":
        reason = "time ran out before it could be tried";
        break;
    }
    return {
      classIds: [...u.classIds],
      message: `${lead} could not be placed: ${reason}.`,
    };
  });

  const list = (ids: string[], one: string, many: string) => {
    const names = namesOf(ids);
    if (!names) return [];
    return [ids.length === 1 ? `${names} ${one}` : `${names} ${many}`];
  };
  return {
    reasons,
    notSet: list(
      result.notSet,
      "has no lesson counts set, so no lessons were generated for it.",
      "have no lesson counts set, so no lessons were generated for them.",
    ),
    noTeacher: list(
      result.noTeacher,
      `has no ${words.teacher} yet, so its lessons are placed without one; clashes may appear when one is assigned.`,
      `have no ${words.teacher} yet, so their lessons are placed without one; clashes may appear when one is assigned.`,
    ),
  };
}
