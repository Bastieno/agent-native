import { and, eq, inArray } from "drizzle-orm";
import { getDb, schema } from "../db/index.js";
import { listInWords, loadTimetable, termContext } from "./timetable.js";
import { resolveViewTerm } from "./timetable-view.js";

export {
  countCoverage,
  placedDoubles,
  isShort,
  shortInWords,
  type ClassCoverage,
  type CoverageClass,
  type Tally,
} from "../../shared/timetable-coverage.js";
import {
  countCoverage,
  isShort,
  shortInWords,
} from "../../shared/timetable-coverage.js";

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
    loaded.week,
  );
  counted.classes.sort((a, b) => a.className.localeCompare(b.className));

  const short = counted.classes.filter(isShort);
  const parts: string[] = [];
  if (counted.classes.length === 0) {
    parts.push("There are no classes to count.");
  } else {
    parts.push(
      short.length
        ? `${short.length} ${short.length === 1 ? "class is" : "classes are"} short of the lessons ${short.length === 1 ? "it needs" : "they need"}: ${listInWords(
            short.map(
              (c) => `${c.className} (${shortInWords(c.required!, c.placed)})`,
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
