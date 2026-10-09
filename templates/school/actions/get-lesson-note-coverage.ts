import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getDb, schema } from "../server/db/index.js";
import { and, eq, inArray } from "drizzle-orm";
import { z } from "zod";
import { boolish } from "../shared/zod-json.js";
import { getUserLabels, labelFor } from "../server/lib/user-names.js";
import {
  accessibleClassIds,
  actorForEmail,
} from "../server/lib/class-access.js";
import {
  NO_TEACHER_LABEL,
  isUnassignedTeacher,
} from "../shared/class-teacher.js";

/**
 * How ready each class's lesson notes are.
 *
 * Part of an admin's job is making sure teachers have prepared — and until
 * now the only way to check was to open every class one at a time, which
 * nobody does. The question an admin actually has is not "show me 400 lesson
 * notes", it is "who has not written theirs?", so that is what this answers:
 * one row per class, with the gap on it.
 *
 * A gap is measured against the curriculum, not a guess. The units for a
 * subject, year group and term carry the weeks they cover, and that is how
 * many notes a class should have — the same reckoning `plan-lesson-notes`
 * uses, so the two never disagree about what is missing.
 *
 * A teacher may run this too; they see their own classes. Nothing here is
 * private to admins, and a teacher checking their own readiness is the same
 * question asked of one person.
 */
export default defineAction({
  description:
    "Lesson-note readiness across the school: one row per class with how many notes exist, how many are finalized, and how many the curriculum expects. Answers 'who hasn't prepared their notes?'. Filter by year group, subject, teacher or term. Admins and coordinators see every class; a teacher sees their own.",
  schema: z.object({
    gradeLevelId: z.string().optional().describe("Only this year group"),
    subjectId: z.string().optional().describe("Only this subject"),
    teacherUserId: z
      .string()
      .optional()
      .describe("Only this teacher's classes"),
    termId: z
      .string()
      .optional()
      .describe("Which term to measure. Defaults to the term running today."),
    onlyGaps: boolish()
      .optional()
      .default(false)
      .describe("true returns only classes with notes missing"),
  }),
  http: { method: "GET" },
  run: async (args) => {
    const { orgId, userEmail } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const db = getDb();

    // Which term we are measuring: the one asked for, else the one running
    // today, else the most recent. A school mid-holiday still gets an answer.
    const terms = await db
      .select()
      .from(schema.terms)
      .where(eq(schema.terms.schoolId, orgId));
    const today = new Date().toISOString().slice(0, 10);
    const term = args.termId
      ? terms.find((t: any) => t.id === args.termId)
      : (terms.find((t: any) => t.startDate <= today && t.endDate >= today) ??
        [...terms].sort((a: any, b: any) =>
          b.startDate.localeCompare(a.startDate),
        )[0]);
    if (args.termId && !term) throw new Error("Term not found.");
    if (!term) {
      return {
        term: null,
        classes: [],
        totals: null,
        message:
          "This school has no terms yet, so there is nothing to measure lesson notes against. Set up the academic year first.",
      };
    }

    const conditions = [
      eq(schema.classes.orgId, orgId),
      eq(schema.classes.status, "active"),
    ];
    if (args.gradeLevelId)
      conditions.push(eq(schema.classes.gradeLevelId, args.gradeLevelId));
    if (args.subjectId)
      conditions.push(eq(schema.classes.subjectId, args.subjectId));
    if (args.teacherUserId)
      conditions.push(
        eq(schema.classes.primaryTeacherUserId, args.teacherUserId),
      );

    let rows = await db
      .select({
        id: schema.classes.id,
        name: schema.classes.name,
        subjectId: schema.classes.subjectId,
        gradeLevelId: schema.classes.gradeLevelId,
        primaryTeacherUserId: schema.classes.primaryTeacherUserId,
        subjectName: schema.subjects.name,
        gradeLevelName: schema.gradeLevels.name,
      })
      .from(schema.classes)
      .leftJoin(
        schema.subjects,
        eq(schema.classes.subjectId, schema.subjects.id),
      )
      .leftJoin(
        schema.gradeLevels,
        eq(schema.classes.gradeLevelId, schema.gradeLevels.id),
      )
      .where(and(...conditions));

    // A teacher asking this question is asking about their own classes.
    const actor = userEmail ? await actorForEmail(userEmail) : null;
    if (actor && actor.schoolRole !== "school_admin") {
      const mine = new Set(await accessibleClassIds(actor));
      rows = rows.filter((r: any) => mine.has(r.id));
    }

    if (rows.length === 0) {
      return {
        term: { id: term.id, name: term.name },
        classes: [],
        totals: {
          classes: 0,
          withNothing: 0,
          withGaps: 0,
          ready: 0,
          withoutTeacher: 0,
        },
        message: "No classes match that.",
      };
    }

    // How many notes the curriculum expects: the distinct weeks the term's
    // units cover, per subject and year group. A unit with no pacing cannot
    // say which weeks it covers, and is reported rather than guessed at.
    const units = await db
      .select({
        subjectId: schema.units.subjectId,
        gradeLevelId: schema.units.gradeLevelId,
        weekStart: schema.units.weekStart,
        weekEnd: schema.units.weekEnd,
      })
      .from(schema.units)
      .where(
        and(
          eq(schema.units.termId, term.id),
          eq(schema.units.status, "active"),
        ),
      );
    const weeksFor = new Map<string, Set<number>>();
    const unpaced = new Map<string, number>();
    const unitCount = new Map<string, number>();
    for (const u of units as any[]) {
      const key = `${u.subjectId}|${u.gradeLevelId}`;
      unitCount.set(key, (unitCount.get(key) ?? 0) + 1);
      if (u.weekStart == null) {
        unpaced.set(key, (unpaced.get(key) ?? 0) + 1);
        continue;
      }
      const weeks = weeksFor.get(key) ?? new Set<number>();
      for (let w = u.weekStart; w <= (u.weekEnd ?? u.weekStart); w++) {
        weeks.add(w);
      }
      weeksFor.set(key, weeks);
    }

    // The notes themselves, for this term only — a note belongs to the term
    // its date falls in.
    const classIds = rows.map((r: any) => r.id);
    const notes = await db
      .select({
        classId: schema.lessonNotes.classId,
        status: schema.lessonNotes.status,
        lessonDate: schema.lessonNotes.lessonDate,
        title: schema.lessonNotes.title,
        updatedAt: schema.lessonNotes.updatedAt,
      })
      .from(schema.lessonNotes)
      .where(inArray(schema.lessonNotes.classId, classIds));

    const inTerm = (date: string | null) =>
      !date || (date >= term.startDate && date <= term.endDate);

    const labels = await getUserLabels(
      rows.map((r: any) => r.primaryTeacherUserId),
    );

    // A week from today: the note a teacher should already have ready.
    const weekOut = new Date();
    weekOut.setDate(weekOut.getDate() + 7);
    const horizon = weekOut.toISOString().slice(0, 10);

    const classes = rows.map((r: any) => {
      const key = `${r.subjectId}|${r.gradeLevelId}`;
      const expected = weeksFor.get(key)?.size ?? 0;
      const mine = (notes as any[]).filter(
        (n) => n.classId === r.id && inTerm(n.lessonDate),
      );
      const finalized = mine.filter((n) => n.status === "finalized").length;
      const drafts = mine.length - finalized;
      const upcoming = mine
        .filter(
          (n) =>
            n.lessonDate && n.lessonDate >= today && n.lessonDate <= horizon,
        )
        .sort((a, b) =>
          (a.lessonDate ?? "").localeCompare(b.lessonDate ?? ""),
        )[0];
      const updates = mine.map((n) => n.updatedAt).sort();
      const lastUpdated = updates[updates.length - 1];
      return {
        classId: r.id,
        className: r.name,
        subjectName: r.subjectName ?? null,
        gradeLevelName: r.gradeLevelName ?? null,
        teacherUserId: isUnassignedTeacher(r.primaryTeacherUserId)
          ? null
          : r.primaryTeacherUserId,
        teacher: isUnassignedTeacher(r.primaryTeacherUserId)
          ? NO_TEACHER_LABEL
          : (labelFor(labels, r.primaryTeacherUserId) ?? NO_TEACHER_LABEL),
        units: unitCount.get(key) ?? 0,
        unitsWithoutPacing: unpaced.get(key) ?? 0,
        expectedNotes: expected,
        notes: mine.length,
        drafts,
        finalized,
        missing: Math.max(0, expected - mine.length),
        // What is coming, so "next week has nothing written" is visible
        // without reading dates.
        nextLesson: upcoming
          ? {
              date: upcoming.lessonDate,
              title: upcoming.title,
              status: upcoming.status,
            }
          : null,
        lastUpdated: lastUpdated ?? null,
      };
    });

    const ordered = classes.sort((a, b) => {
      // The work first: nothing written, then partly written, then done.
      const rank = (c: typeof a) =>
        c.notes === 0 && c.expectedNotes > 0 ? 0 : c.missing > 0 ? 1 : 2;
      return (
        rank(a) - rank(b) ||
        (a.gradeLevelName ?? "").localeCompare(b.gradeLevelName ?? "") ||
        (a.subjectName ?? "").localeCompare(b.subjectName ?? "")
      );
    });

    const shown = args.onlyGaps
      ? ordered.filter((c) => c.missing > 0 || c.drafts > 0)
      : ordered;

    const withNothing = ordered.filter(
      (c) => c.notes === 0 && c.expectedNotes > 0,
    ).length;
    const withGaps = ordered.filter((c) => c.missing > 0).length;
    const ready = ordered.filter(
      (c) => c.expectedNotes > 0 && c.missing === 0 && c.drafts === 0,
    ).length;
    const noCurriculum = ordered.filter((c) => c.expectedNotes === 0).length;
    const withoutTeacher = ordered.filter((c) => !c.teacherUserId).length;

    // "1 class has", "4 classes have" — an admin reading this is a person,
    // not a log file.
    const count = (n: number) =>
      `${n} ${n === 1 ? "class has" : "classes have"}`;

    return {
      term: { id: term.id, name: term.name },
      classes: shown,
      totals: {
        classes: ordered.length,
        withNothing,
        withGaps,
        ready,
        noCurriculum,
        withoutTeacher,
      },
      message: [
        `${term.name}: ${ready} of ${ordered.length} ${
          ordered.length === 1 ? "class has" : "classes have"
        } every lesson note written and marked ready.`,
        withNothing ? `${count(withNothing)} nothing written at all.` : "",
        withGaps - withNothing > 0
          ? `${count(withGaps - withNothing)} only part of them written.`
          : "",
        noCurriculum
          ? `${count(noCurriculum)} no curriculum for this term, so there is nothing to write notes from yet.`
          : "",
        withoutTeacher ? `${count(withoutTeacher)} no teacher assigned.` : "",
      ]
        .filter(Boolean)
        .join(" "),
    };
  },
});
