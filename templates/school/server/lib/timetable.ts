import { getOrgSetting } from "@agent-native/core/settings";
import { and, asc, eq, inArray, isNull } from "drizzle-orm";
import { getDb, schema } from "../db/index.js";
import { schoolLocale } from "../../shared/dates.js";
import { isUnassignedTeacher } from "../../shared/class-teacher.js";
import { findPeriod, type SchoolWeek } from "../../shared/school-week.js";
import { findClashes, type ResolvedPeriod } from "./timetable-clashes.js";
import { getUserLabels, labelFor } from "./user-names.js";

/** The school's settings, or an empty object when it has set none. */
export async function loadSchoolConfig(
  orgId: string,
): Promise<Record<string, any>> {
  return ((await getOrgSetting(orgId, "school-config")) as any) ?? {};
}

/**
 * Where the school is in its year on a date: the active session, its terms
 * in order, and which of them (if any) the date falls in or comes next.
 * The one place this rule lives; `resolveTerm` and `get-current-term` share it.
 */
export async function termContext(orgId: string, date?: string) {
  const db = getDb();
  const today = date ?? new Date().toISOString().slice(0, 10);
  // Normally one year is current. Schools created before
  // `create-academic-year` stopped making every new year current can have
  // two; then the one the date falls in wins, else the latest to have
  // started, else the earliest — never whichever the database returns first.
  const active = await db
    .select()
    .from(schema.academicYears)
    .where(
      and(
        eq(schema.academicYears.orgId, orgId),
        eq(schema.academicYears.schoolId, orgId),
        eq(schema.academicYears.status, "active"),
      ),
    )
    .orderBy(asc(schema.academicYears.startDate));
  const year =
    active.find((y: any) => y.startDate <= today && today <= y.endDate) ??
    [...active].reverse().find((y: any) => y.startDate <= today) ??
    active[0];
  if (!year) return null;

  const terms = await db
    .select()
    .from(schema.terms)
    .where(
      and(
        eq(schema.terms.orgId, orgId),
        eq(schema.terms.academicYearId, year.id),
      ),
    )
    .orderBy(asc(schema.terms.sequence));

  const current = terms.find(
    (t: any) => t.startDate <= today && today <= t.endDate,
  );
  const next = terms.find((t: any) => t.startDate > today);
  return { year, terms, current, next };
}

/** The term the school is in on a date, else the next one, else none. */
export async function resolveTerm(
  orgId: string,
  date?: string,
): Promise<{
  termId: string | null;
  termName: string | null;
  status: "current" | "next" | "none";
}> {
  const ctx = await termContext(orgId, date);
  if (ctx?.current) {
    return {
      termId: ctx.current.id,
      termName: ctx.current.name,
      status: "current",
    };
  }
  if (ctx?.next) {
    return { termId: ctx.next.id, termName: ctx.next.name, status: "next" };
  }
  return { termId: null, termName: null, status: "none" };
}

/** The term before this one: same year by sequence, else last of the year before. */
export async function previousTerm(
  orgId: string,
  termId: string,
): Promise<{ id: string; name: string } | null> {
  const db = getDb();
  const [term] = await db
    .select()
    .from(schema.terms)
    .where(
      and(
        eq(schema.terms.id, termId),
        eq(schema.terms.orgId, orgId),
        eq(schema.terms.schoolId, orgId),
      ),
    )
    .limit(1);
  if (!term) return null;

  const sameYear = await db
    .select()
    .from(schema.terms)
    .where(
      and(
        eq(schema.terms.orgId, orgId),
        eq(schema.terms.schoolId, orgId),
        eq(schema.terms.academicYearId, term.academicYearId),
      ),
    )
    .orderBy(asc(schema.terms.sequence));
  const before = sameYear.filter((t: any) => t.sequence < term.sequence).pop();
  if (before) return { id: before.id, name: before.name };

  const [thisYear] = await db
    .select()
    .from(schema.academicYears)
    .where(
      and(
        eq(schema.academicYears.id, term.academicYearId),
        eq(schema.academicYears.orgId, orgId),
        eq(schema.academicYears.schoolId, orgId),
      ),
    )
    .limit(1);
  if (!thisYear) return null;
  const years = await db
    .select()
    .from(schema.academicYears)
    .where(
      and(
        eq(schema.academicYears.orgId, orgId),
        eq(schema.academicYears.schoolId, orgId),
      ),
    );
  const prevYear = years
    .filter((y: any) => y.startDate < thisYear.startDate)
    .sort((a: any, b: any) => b.startDate.localeCompare(a.startDate))[0];
  if (!prevYear) return null;
  const prevTerms = await db
    .select()
    .from(schema.terms)
    .where(
      and(
        eq(schema.terms.orgId, orgId),
        eq(schema.terms.schoolId, orgId),
        eq(schema.terms.academicYearId, prevYear.id),
      ),
    )
    .orderBy(asc(schema.terms.sequence));
  const last = prevTerms[prevTerms.length - 1];
  return last ? { id: last.id, name: last.name } : null;
}

/**
 * Every timetable row for a term, resolved into what a person would read:
 * times from the school's week, room, teachers and learners. One query per
 * table, joined in memory.
 *
 * Fallback is per school: if it has no rows for the term at all, its
 * un-termed rows (those of the term's academic year's classes) are used
 * instead and `fromUntermedRows` says so.
 */
export async function loadTimetable(
  orgId: string,
  termId: string | null,
): Promise<{
  week: SchoolWeek | null;
  locale?: string;
  periods: ResolvedPeriod[];
  fromUntermedRows: boolean;
  armNames: Record<string, string>;
}> {
  const db = getDb();
  const config = await loadSchoolConfig(orgId);
  const week: SchoolWeek | null = config.schoolWeek ?? null;
  const locale = schoolLocale(config);

  const S = schema.classSchedules;
  let fromUntermedRows = false;
  let rows: any[] = [];
  if (termId) {
    rows = await db
      .select()
      .from(S)
      .where(and(eq(S.schoolId, orgId), eq(S.termId, termId)));
  }
  if (rows.length === 0) {
    rows = await earlierRowsFor(orgId, termId);
    fromUntermedRows = !!termId && rows.length > 0;
  }

  const armRows = await db
    .select()
    .from(schema.arms)
    .where(eq(schema.arms.schoolId, orgId));
  const armNames: Record<string, string> = {};
  const armById = new Map<string, any>();
  for (const a of armRows as any[]) {
    armNames[a.id] = a.name;
    armById.set(a.id, a);
  }

  if (rows.length === 0) {
    return { week, locale, periods: [], fromUntermedRows, armNames };
  }

  const classIds = [...new Set(rows.map((r) => r.classId as string))];
  // Deliberate: a term whose rows all belong to archived classes yields an empty
  // timetable, with no fallback to untermed rows.
  const classRows = (await db
    .select()
    .from(schema.classes)
    .where(
      and(
        eq(schema.classes.orgId, orgId),
        eq(schema.classes.status, "active"),
        inArray(schema.classes.id, classIds),
      ),
    )) as any[];
  const classById = new Map(classRows.map((c) => [c.id as string, c]));
  const liveIds = classRows.map((c) => c.id as string);
  if (liveIds.length === 0) {
    return { week, locale, periods: [], fromUntermedRows, armNames };
  }

  const subjectIds = [...new Set(classRows.map((c) => c.subjectId as string))];
  const [subjectRows, optionRows, teacherRows, enrolRows] = await Promise.all([
    db
      .select()
      .from(schema.subjects)
      .where(
        and(
          eq(schema.subjects.schoolId, orgId),
          inArray(schema.subjects.id, subjectIds),
        ),
      ),
    db
      .select()
      .from(schema.classArms)
      .where(inArray(schema.classArms.classId, liveIds)),
    db
      .select()
      .from(schema.classTeachers)
      .where(
        and(
          inArray(schema.classTeachers.classId, liveIds),
          inArray(schema.classTeachers.role, ["primary", "support"]),
        ),
      ),
    db
      .select()
      .from(schema.classEnrollments)
      .where(
        and(
          inArray(schema.classEnrollments.classId, liveIds),
          eq(schema.classEnrollments.status, "active"),
        ),
      ),
  ]);

  const subjectName = new Map(
    (subjectRows as any[]).map((s) => [s.id as string, s.name as string]),
  );
  const group = <T>(list: any[], key: string, pick: (r: any) => T) => {
    const m = new Map<string, T[]>();
    for (const r of list) {
      const arr = m.get(r[key]) ?? [];
      arr.push(pick(r));
      m.set(r[key], arr);
    }
    return m;
  };
  const optionArms = group(
    optionRows as any[],
    "classId",
    (r) => r.armId as string,
  );
  const learners = group(
    enrolRows as any[],
    "classId",
    (r) => r.studentUserId as string,
  );

  // Teachers per class: the class's own primary plus class_teachers rows,
  // each person once, unassigned markers dropped.
  const teacherIds = new Map<string, string[]>();
  for (const c of classRows) {
    const ids = new Set<string>();
    if (!isUnassignedTeacher(c.primaryTeacherUserId))
      ids.add(c.primaryTeacherUserId);
    teacherIds.set(c.id, [...ids]);
  }
  for (const t of teacherRows as any[]) {
    if (isUnassignedTeacher(t.teacherUserId)) continue;
    const list = teacherIds.get(t.classId);
    if (list && !list.includes(t.teacherUserId)) list.push(t.teacherUserId);
  }
  const labels = await getUserLabels([...teacherIds.values()].flat());

  const periods: ResolvedPeriod[] = [];
  for (const r of rows) {
    const c = classById.get(r.classId);
    if (!c) continue;
    const slot =
      r.periodNumber != null
        ? findPeriod(week, r.dayOfWeek, r.periodNumber)
        : null;
    const fromWeek = slot && slot.kind === "lesson" ? slot : null;
    const arm = c.armId ? armById.get(c.armId) : null;
    periods.push({
      scheduleId: r.id,
      classId: c.id,
      className: c.name,
      subjectName: subjectName.get(c.subjectId) ?? "",
      termId: r.termId ?? null,
      day: r.dayOfWeek,
      periodNumber: r.periodNumber ?? null,
      start: fromWeek ? fromWeek.start : r.startTime,
      end: fromWeek ? fromWeek.end : r.endTime,
      room: r.room ?? c.roomNumber ?? arm?.homeRoom ?? null,
      teachers: (teacherIds.get(c.id) ?? []).map((userId) => ({
        userId,
        name: labelFor(labels, userId) ?? "A teacher",
      })),
      armId: c.armId ?? null,
      optionArmIds: optionArms.get(c.id) ?? [],
      learnerUserIds: learners.get(c.id) ?? [],
    });
  }
  return { week, locale, periods, fromUntermedRows, armNames };
}

/** A term of this school, or null when the id is not one of its terms. */
export async function findTerm(
  orgId: string,
  termId: string,
): Promise<{ id: string; name: string; academicYearId: string } | null> {
  const db = getDb();
  const [term] = await db
    .select()
    .from(schema.terms)
    .where(
      and(
        eq(schema.terms.id, termId),
        eq(schema.terms.orgId, orgId),
        eq(schema.terms.schoolId, orgId),
      ),
    )
    .limit(1);
  return term
    ? { id: term.id, name: term.name, academicYearId: term.academicYearId }
    : null;
}

/** Whether a term has timetable rows of its own. */
export async function termHasOwnRows(
  orgId: string,
  termId: string,
): Promise<boolean> {
  const S = schema.classSchedules;
  const [row] = await getDb()
    .select({ id: S.id })
    .from(S)
    .where(and(eq(S.orgId, orgId), eq(S.schoolId, orgId), eq(S.termId, termId)))
    .limit(1);
  return !!row;
}

/**
 * Refuse a term's first row of its own while the school's earlier, un-termed
 * timetable stands in for it: that row would switch the fallback off and hide
 * every other lesson from every learner, teacher and the admin grid.
 * Shared by every action that adds a timetable row to a term.
 */
export async function assertTermCanTakeRow(
  orgId: string,
  term: { id: string; name: string },
): Promise<void> {
  if (await termHasOwnRows(orgId, term.id)) return;
  if ((await earlierRowsFor(orgId, term.id)).length > 0) {
    throw Object.assign(
      new Error(
        `${term.name} is still showing the school's earlier timetable. Copy it into ${term.name} first, then change it.`,
      ),
      { code: "copy-timetable-first" },
    );
  }
}

/**
 * The school's earlier, un-termed timetable rows as a term would show them:
 * only rows of the term's academic year's active classes, so a new year's
 * term never stands in last year's lessons (and can be started empty). With
 * no term, every un-termed row.
 */
export async function earlierRowsFor(
  orgId: string,
  termId: string | null,
): Promise<any[]> {
  const db = getDb();
  const S = schema.classSchedules;
  const rows = (await db
    .select()
    .from(S)
    .where(
      and(eq(S.orgId, orgId), eq(S.schoolId, orgId), isNull(S.termId)),
    )) as any[];
  if (!termId || rows.length === 0) return rows;
  const [term] = await db
    .select({ academicYearId: schema.terms.academicYearId })
    .from(schema.terms)
    .where(
      and(
        eq(schema.terms.id, termId),
        eq(schema.terms.orgId, orgId),
        eq(schema.terms.schoolId, orgId),
      ),
    )
    .limit(1);
  if (!term) return [];
  const classIds = [...new Set(rows.map((r) => r.classId as string))];
  const ofYear = await db
    .select({ id: schema.classes.id })
    .from(schema.classes)
    .where(
      and(
        eq(schema.classes.orgId, orgId),
        eq(schema.classes.academicYearId, term.academicYearId),
        eq(schema.classes.status, "active"),
        inArray(schema.classes.id, classIds),
      ),
    );
  const keep = new Set(ofYear.map((c: any) => c.id as string));
  return rows.filter((r) => keep.has(r.classId));
}

/** The clashes in a term's timetable, in the school's own words. */
export async function clashesForTerm(orgId: string, termId: string | null) {
  const loaded = await loadTimetable(orgId, termId);
  return {
    ...loaded,
    clashes: findClashes(loaded.periods, {
      locale: loaded.locale,
      armNames: loaded.armNames,
    }),
  };
}

/**
 * A timetable's periods split by whether their class belongs to an academic
 * year: a copy into a term carries only that term's year's classes, never
 * last year's. `skippedClasses` names what was left out, in order.
 */
export async function splitByAcademicYear(
  orgId: string,
  periods: ResolvedPeriod[],
  academicYearId: string,
): Promise<{
  kept: ResolvedPeriod[];
  skipped: ResolvedPeriod[];
  skippedClasses: string[];
}> {
  const classIds = [...new Set(periods.map((p) => p.classId))];
  if (classIds.length === 0)
    return { kept: [], skipped: [], skippedClasses: [] };
  const rows = await getDb()
    .select({
      id: schema.classes.id,
      academicYearId: schema.classes.academicYearId,
    })
    .from(schema.classes)
    .where(
      and(
        eq(schema.classes.orgId, orgId),
        inArray(schema.classes.id, classIds),
      ),
    );
  const yearOf = new Map(rows.map((r: any) => [r.id, r.academicYearId]));
  const kept: ResolvedPeriod[] = [];
  const skipped: ResolvedPeriod[] = [];
  for (const p of periods) {
    (yearOf.get(p.classId) === academicYearId ? kept : skipped).push(p);
  }
  const skippedClasses = [...new Set(skipped.map((p) => p.className))].sort(
    (a, b) => a.localeCompare(b),
  );
  return { kept, skipped, skippedClasses };
}

/** Names in a sentence: "A, B and C", or the first few "and N more". */
export function listInWords(names: string[], max = 6): string {
  if (names.length <= 1) return names[0] ?? "";
  const shown = names.slice(0, max);
  const rest = names.length - shown.length;
  if (rest > 0) return `${shown.join(", ")} and ${rest} more`;
  return `${shown.slice(0, -1).join(", ")} and ${shown[shown.length - 1]}`;
}
