/**
 * Automatic timetable generation, the database side: gathering a term's
 * classes into the solver's input, fingerprinting a term's lessons, and
 * finding the draft waiting for a term.
 */
import { and, desc, eq, inArray } from "drizzle-orm";
import { getDb, schema } from "../db/index.js";
import { isUnassignedTeacher } from "../../shared/class-teacher.js";
import { schoolWord } from "./arm-enrolment.js";
import { naivePlural } from "../../shared/terminology.js";
import { countCoverage } from "../../shared/timetable-coverage.js";
import type {
  GenClass,
  GenInput,
  ProposedLesson,
  Words,
} from "./timetable-generator.js";
import {
  findTerm,
  loadTimetable,
  ownRowsOfActiveClasses,
} from "./timetable.js";
import { activeClassesOfYear } from "./timetable-coverage.js";
import { getUserLabels, labelFor } from "./user-names.js";

export {
  PROPOSAL_STALE,
  staleReason,
} from "../../shared/timetable-proposal.js";

export type ProposalRow = typeof schema.timetableProposals.$inferSelect;

/** The locale tag when it is well formed, else undefined (Intl throws on a bad one). */
function validLocale(locale: string | undefined): string | undefined {
  if (!locale) return undefined;
  try {
    return Intl.getCanonicalLocales(locale)[0];
  } catch {
    return undefined;
  }
}

/** The school's own nouns for the solver's explanations, lower-cased. */
export async function generatorWords(orgId: string): Promise<Words> {
  const [arm, double, learner, teacher] = await Promise.all([
    schoolWord(orgId, "arm", "arm"),
    schoolWord(orgId, "double", "double"),
    schoolWord(orgId, "student", "learner"),
    schoolWord(orgId, "teacher", "teacher"),
  ]);
  return {
    arm,
    double,
    doubles: naivePlural(double),
    learner,
    learners: naivePlural(learner),
    teacher,
  };
}

/**
 * Everything the solver needs to know about a term: its week, the lessons it
 * already has (never moved) and every active class of its academic year.
 * Fixed lessons are the term's own only; a term still showing the school's
 * earlier timetable has none of its own. One query per table, joined here.
 */
export async function buildGeneratorInput(
  orgId: string,
  termId: string,
): Promise<GenInput> {
  const term = await findTerm(orgId, termId);
  if (!term) throw new Error("That term is not in this school.");
  const loaded = await loadTimetable(orgId, termId);
  if (!loaded.week) {
    throw new Error(
      "The school hasn't set its week yet, so there are no periods to place lessons in. Set it in Settings → School week.",
    );
  }
  const fixed = loaded.fromUntermedRows ? [] : loaded.periods;

  const db = getDb();
  const classRows = await activeClassesOfYear(orgId, term.academicYearId);
  const ids = classRows.map((c) => c.id as string);
  const [subjectRows, armRows, optionRows, teacherRows, enrolRows] =
    await Promise.all([
      db
        .select()
        .from(schema.subjects)
        .where(eq(schema.subjects.schoolId, orgId)),
      db.select().from(schema.arms).where(eq(schema.arms.schoolId, orgId)),
      ids.length
        ? db
            .select()
            .from(schema.classArms)
            .where(inArray(schema.classArms.classId, ids))
        : Promise.resolve([] as any[]),
      ids.length
        ? db
            .select()
            .from(schema.classTeachers)
            .where(
              and(
                inArray(schema.classTeachers.classId, ids),
                inArray(schema.classTeachers.role, ["primary", "support"]),
              ),
            )
        : Promise.resolve([] as any[]),
      ids.length
        ? db
            .select()
            .from(schema.classEnrollments)
            .where(
              and(
                inArray(schema.classEnrollments.classId, ids),
                eq(schema.classEnrollments.status, "active"),
              ),
            )
        : Promise.resolve([] as any[]),
    ]);

  const subjectName = new Map(
    (subjectRows as any[]).map((s) => [s.id as string, s.name as string]),
  );
  const homeRoom = new Map(
    (armRows as any[]).map((a) => [
      a.id as string,
      (a.homeRoom ?? null) as string | null,
    ]),
  );
  const group = (list: any[], key: string, value: string) => {
    const m = new Map<string, string[]>();
    for (const r of list) {
      const arr = m.get(r[key]) ?? [];
      arr.push(r[value]);
      m.set(r[key], arr);
    }
    return m;
  };
  const optionArms = group(optionRows as any[], "classId", "armId");
  const learners = group(enrolRows as any[], "classId", "studentUserId");

  // Primary first (the class's own, then class_teachers primaries), then
  // support; each person once, unassigned markers dropped.
  const teacherIds = new Map<string, string[]>();
  for (const c of classRows) {
    teacherIds.set(
      c.id,
      isUnassignedTeacher(c.primaryTeacherUserId)
        ? []
        : [c.primaryTeacherUserId],
    );
  }
  const rank = (r: any) => (r.role === "primary" ? 0 : 1);
  for (const t of [...(teacherRows as any[])].sort(
    (a, b) => rank(a) - rank(b),
  )) {
    if (isUnassignedTeacher(t.teacherUserId)) continue;
    const list = teacherIds.get(t.classId);
    if (list && !list.includes(t.teacherUserId)) list.push(t.teacherUserId);
  }
  const labels = await getUserLabels([...teacherIds.values()].flat());

  const counted = countCoverage(
    fixed,
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
  const placedOf = new Map(counted.classes.map((c) => [c.classId, c.placed]));

  const classes: GenClass[] = classRows.map((c) => {
    const names: Record<string, string> = {};
    for (const id of teacherIds.get(c.id) ?? []) {
      names[id] = labelFor(labels, id) ?? "";
    }
    return {
      classId: c.id,
      className: c.name,
      subjectName: subjectName.get(c.subjectId) ?? "",
      armId: c.armId ?? null,
      optionArmIds: optionArms.get(c.id) ?? [],
      teacherIds: teacherIds.get(c.id) ?? [],
      teacherNames: names,
      room: c.roomNumber ?? (c.armId ? homeRoom.get(c.armId) : null) ?? null,
      learnerUserIds: learners.get(c.id) ?? [],
      required:
        c.periodsPerWeek == null
          ? null
          : { periods: c.periodsPerWeek, doubles: c.doublesPerWeek ?? 0 },
      placed: placedOf.get(c.id) ?? { periods: 0, doubles: 0 },
    };
  });

  return {
    week: loaded.week,
    locale: validLocale(loaded.locale),
    armNames: loaded.armNames,
    fixed,
    classes,
  };
}

/**
 * A hash of the term's own lessons of active classes: change, add or remove
 * one, and it differs. Sorted, so the order of reading does not matter.
 */
export async function termFingerprint(
  orgId: string,
  termId: string,
): Promise<string> {
  const rows = await ownRowsOfActiveClasses(orgId, termId);
  const lines = rows
    .map((r) =>
      [
        r.classId,
        r.dayOfWeek,
        r.periodNumber ?? "",
        r.startTime,
        r.endTime,
        r.room ?? "",
        r.pairId ?? "",
      ].join("|"),
    )
    .sort();
  const bytes = new TextEncoder().encode(lines.join("\n"));
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(digest)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** The draft waiting for a term (the newest if somehow there are several), or null. */
export async function openProposal(
  orgId: string,
  termId: string,
): Promise<ProposalRow | null> {
  const P = schema.timetableProposals;
  const [row] = await getDb()
    .select()
    .from(P)
    .where(
      and(eq(P.schoolId, orgId), eq(P.termId, termId), eq(P.status, "open")),
    )
    .orderBy(desc(P.createdAt))
    .limit(1);
  return (row as ProposalRow | undefined) ?? null;
}

export interface ProposalView {
  id: string;
  createdAt: string;
  lessons: (ProposedLesson & {
    className: string;
    subjectName: string;
    armId: string | null;
    optionArmIds: string[];
    teachers: { userId: string; name: string }[];
  })[];
  reasons: { classIds: string[]; message: string }[];
  notSet: string[];
  noTeacher: string[];
  summary: { lessons: number; notFitted: number; elapsedMs: number };
}

/**
 * The draft waiting for a term, shaped for reading: each lesson with its
 * class, arm, subject and teachers (no learner ids). Null when the term is not
 * this school's or nothing is waiting. The one reader, for the action and for
 * view-screen.
 */
export async function proposalView(
  orgId: string,
  termId: string,
): Promise<ProposalView | null> {
  const term = await findTerm(orgId, termId);
  if (!term) return null;
  const row = await openProposal(orgId, term.id);
  if (!row) return null;
  const lessons: ProposedLesson[] = JSON.parse(row.lessonsJson);
  const ids = [...new Set(lessons.map((l) => l.classId))];
  type Info = {
    className: string;
    subjectName: string;
    armId: string | null;
    optionArmIds: string[];
    teachers: { userId: string; name: string }[];
  };
  const info = new Map<string, Info>();
  if (ids.length) {
    const db = getDb();
    const [classRows, optionRows, teacherRows] = await Promise.all([
      db
        .select()
        .from(schema.classes)
        .where(
          and(eq(schema.classes.orgId, orgId), inArray(schema.classes.id, ids)),
        ),
      db
        .select()
        .from(schema.classArms)
        .where(inArray(schema.classArms.classId, ids)),
      db
        .select()
        .from(schema.classTeachers)
        .where(
          and(
            inArray(schema.classTeachers.classId, ids),
            inArray(schema.classTeachers.role, ["primary", "support"]),
          ),
        ),
    ]);
    const subjectIds = [
      ...new Set((classRows as any[]).map((c) => c.subjectId as string)),
    ];
    const subjectRows = subjectIds.length
      ? await db
          .select()
          .from(schema.subjects)
          .where(
            and(
              eq(schema.subjects.schoolId, orgId),
              inArray(schema.subjects.id, subjectIds),
            ),
          )
      : [];
    const subjectName = new Map(
      (subjectRows as any[]).map((s) => [s.id as string, s.name as string]),
    );
    // Primary first, then support; each person once, no unassigned marker.
    const teacherIds = new Map<string, string[]>();
    for (const c of classRows as any[]) {
      teacherIds.set(
        c.id,
        isUnassignedTeacher(c.primaryTeacherUserId)
          ? []
          : [c.primaryTeacherUserId],
      );
    }
    const rank = (r: any) => (r.role === "primary" ? 0 : 1);
    for (const t of [...(teacherRows as any[])].sort(
      (a, b) => rank(a) - rank(b),
    )) {
      if (isUnassignedTeacher(t.teacherUserId)) continue;
      const list = teacherIds.get(t.classId);
      if (list && !list.includes(t.teacherUserId)) list.push(t.teacherUserId);
    }
    const labels = await getUserLabels([...teacherIds.values()].flat());
    for (const c of classRows as any[]) {
      info.set(c.id, {
        className: c.name,
        subjectName: subjectName.get(c.subjectId) ?? "",
        armId: c.armId ?? null,
        optionArmIds: (optionRows as any[])
          .filter((o) => o.classId === c.id)
          .map((o) => o.armId as string),
        teachers: (teacherIds.get(c.id) ?? []).map((userId) => ({
          userId,
          name: labelFor(labels, userId) ?? "",
        })),
      });
    }
  }
  const summary = JSON.parse(row.summaryJson) as Record<string, any>;
  return {
    id: row.id,
    createdAt: row.createdAt,
    lessons: lessons.map((l) => {
      const c = info.get(l.classId);
      return {
        ...l,
        className: c?.className ?? "",
        subjectName: c?.subjectName ?? "",
        armId: c?.armId ?? null,
        optionArmIds: c?.optionArmIds ?? [],
        teachers: c?.teachers ?? [],
      };
    }),
    reasons: JSON.parse(row.unplacedJson),
    notSet: summary.notSet ?? [],
    noTeacher: summary.noTeacher ?? [],
    summary: {
      lessons: summary.lessons ?? lessons.length,
      notFitted: summary.notFitted ?? 0,
      elapsedMs: summary.elapsedMs ?? 0,
    },
  };
}
