import { and, eq, inArray } from "drizzle-orm";
import { getDb, schema } from "../db/index.js";
import { listInWords, loadTimetable, termContext } from "./timetable.js";
import type { ResolvedPeriod } from "./timetable-clashes.js";
import { resolveViewTerm } from "./timetable-view.js";

export interface Tally {
  periods: number;
  doubles: number;
}

/** A class as coverage needs to see it. */
export interface CoverageClass {
  classId: string;
  className: string;
  subjectName: string;
  armId: string | null;
  periodsPerWeek: number | null;
  doublesPerWeek: number | null;
}

export interface ClassCoverage {
  classId: string;
  className: string;
  subjectName: string;
  armId: string | null;
  required: Tally | null;
  placed: Tally;
  short: Tally;
}

/**
 * How many of a class's placed periods come as doubles. The one place the
 * pairing of neighbouring periods plugs in; until it does, none are counted.
 */
export function placedDoubles(_rows: ResolvedPeriod[]): number {
  return 0;
}

/**
 * What each class needs a week against what the timetable holds for it.
 * Pure. Every row of a class counts, including those off the bells. A class
 * the school hasn't given counts shows `required: null` and is not short of
 * anything; shortfalls are never negative.
 */
export function countCoverage(
  periods: ResolvedPeriod[],
  classes: CoverageClass[],
): { classes: ClassCoverage[]; unset: number } {
  const rowsOf = new Map<string, ResolvedPeriod[]>();
  for (const p of periods) {
    const list = rowsOf.get(p.classId) ?? [];
    list.push(p);
    rowsOf.set(p.classId, list);
  }
  let unset = 0;
  const out: ClassCoverage[] = classes.map((c) => {
    const rows = rowsOf.get(c.classId) ?? [];
    const placed: Tally = {
      periods: rows.length,
      doubles: placedDoubles(rows),
    };
    if (c.periodsPerWeek == null) {
      unset++;
      return {
        classId: c.classId,
        className: c.className,
        subjectName: c.subjectName,
        armId: c.armId,
        required: null,
        placed,
        short: { periods: 0, doubles: 0 },
      };
    }
    const required: Tally = {
      periods: c.periodsPerWeek,
      doubles: c.doublesPerWeek ?? 0,
    };
    return {
      classId: c.classId,
      className: c.className,
      subjectName: c.subjectName,
      armId: c.armId,
      required,
      placed,
      short: {
        periods: Math.max(0, required.periods - placed.periods),
        doubles: Math.max(0, required.doubles - placed.doubles),
      },
    };
  });
  return { classes: out, unset };
}

/** The active classes of an academic year (every active class with no year). */
export async function activeClassesOfYear(
  orgId: string,
  academicYearId: string | null,
): Promise<any[]> {
  const conditions = [
    eq(schema.classes.orgId, orgId),
    eq(schema.classes.status, "active"),
  ];
  if (academicYearId)
    conditions.push(eq(schema.classes.academicYearId, academicYearId));
  return (await getDb()
    .select()
    .from(schema.classes)
    .where(and(...conditions))) as any[];
}

/** The academic year whose classes the school is timetabling now. */
export async function currentYearId(orgId: string): Promise<string | null> {
  return (await termContext(orgId))?.year.id ?? null;
}

export interface CoverageFilter {
  termId?: string;
  armId?: string;
  teacherUserId?: string;
}

/**
 * What is still missing on a term's timetable: the same term, fallback and
 * loader as `get-timetable`, narrowed the same way (an arm includes option
 * classes drawing on it).
 */
export async function coverageView(orgId: string, args: CoverageFilter) {
  const found = await resolveViewTerm(orgId, args.termId);
  const term = found ? { id: found.id, name: found.name } : null;
  const loaded = await loadTimetable(orgId, term?.id ?? null);

  const db = getDb();
  let classRows = await activeClassesOfYear(
    orgId,
    found?.academicYearId ?? null,
  );
  const ids = classRows.map((c) => c.id as string);

  const [subjectRows, optionRows, teacherRows] = ids.length
    ? await Promise.all([
        db
          .select()
          .from(schema.subjects)
          .where(
            and(
              eq(schema.subjects.orgId, orgId),
              eq(schema.subjects.schoolId, orgId),
            ),
          ),
        db
          .select()
          .from(schema.classArms)
          .where(inArray(schema.classArms.classId, ids)),
        args.teacherUserId
          ? db
              .select()
              .from(schema.classTeachers)
              .where(
                and(
                  inArray(schema.classTeachers.classId, ids),
                  eq(schema.classTeachers.teacherUserId, args.teacherUserId),
                  inArray(schema.classTeachers.role, ["primary", "support"]),
                ),
              )
          : Promise.resolve([] as any[]),
      ])
    : [[], [], []];
  const subjectName = new Map(
    (subjectRows as any[]).map((s) => [s.id as string, s.name as string]),
  );
  const optionArms = new Map<string, string[]>();
  for (const o of optionRows as any[]) {
    const list = optionArms.get(o.classId) ?? [];
    list.push(o.armId);
    optionArms.set(o.classId, list);
  }

  if (args.armId) {
    classRows = classRows.filter(
      (c) =>
        c.armId === args.armId ||
        (optionArms.get(c.id) ?? []).includes(args.armId!),
    );
  }
  if (args.teacherUserId) {
    const supports = new Set((teacherRows as any[]).map((t) => t.classId));
    const placedFor = new Set(
      loaded.periods
        .filter((p) => p.teachers.some((t) => t.userId === args.teacherUserId))
        .map((p) => p.classId),
    );
    classRows = classRows.filter(
      (c) =>
        c.primaryTeacherUserId === args.teacherUserId ||
        supports.has(c.id) ||
        placedFor.has(c.id),
    );
  }

  const counted = countCoverage(
    loaded.periods,
    classRows.map((c) => ({
      classId: c.id,
      className: c.name,
      subjectName: subjectName.get(c.subjectId) ?? "",
      armId: c.armId ?? null,
      periodsPerWeek: c.periodsPerWeek ?? null,
      doublesPerWeek: c.doublesPerWeek ?? null,
    })),
  );
  counted.classes.sort((a, b) => a.className.localeCompare(b.className));

  const short = counted.classes.filter((c) => c.short.periods > 0);
  const parts: string[] = [];
  if (counted.classes.length === 0) {
    parts.push("There are no classes to count.");
  } else {
    parts.push(
      short.length
        ? `${short.length} ${short.length === 1 ? "class is" : "classes are"} short of the lessons ${short.length === 1 ? "it needs" : "they need"}: ${listInWords(
            short.map(
              (c) =>
                `${c.className} (${c.placed.periods} of ${c.required!.periods})`,
            ),
          )}.`
        : counted.unset < counted.classes.length
          ? "Every class with a count has all its lessons placed."
          : "",
    );
    if (counted.unset > 0) {
      parts.push(
        `${counted.unset} ${counted.unset === 1 ? "class has" : "classes have"} no lesson count set, so the timetable can't say what is missing for ${counted.unset === 1 ? "it" : "them"}.`,
      );
    }
  }
  return {
    term,
    classes: counted.classes,
    unset: counted.unset,
    message: parts.filter(Boolean).join(" "),
  };
}
