import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getDb, schema } from "../server/db/index.js";
import { eq, and, inArray, asc } from "drizzle-orm";
import { z } from "zod";

/**
 * A term laid out week by week: what each subject covers, and whether the
 * lesson for that week has been written yet.
 *
 * This is the "where are we up to?" view — for an admin checking coverage
 * across the school, and for a teacher seeing what is coming next.
 */
export default defineAction({
  description:
    "The week-by-week curriculum calendar for a term: each teaching week with the units being covered per subject and year group, and whether lesson notes are drafted or finalized. Use it to answer 'what are we teaching this week?' or 'which subjects have no plan yet?'.",
  schema: z.object({
    termId: z.string().describe("Term to show"),
    gradeLevelId: z.string().optional().describe("Limit to one year group"),
    subjectId: z.string().optional().describe("Limit to one subject"),
  }),
  http: { method: "GET" },
  run: async (args) => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const db = getDb();

    const [term] = await db
      .select()
      .from(schema.terms)
      .where(
        and(eq(schema.terms.id, args.termId), eq(schema.terms.schoolId, orgId)),
      )
      .limit(1);
    if (!term) throw new Error("Term not found in this school.");

    const conditions = [
      eq(schema.units.termId, args.termId),
      eq(schema.units.orgId, orgId),
      eq(schema.units.status, "active"),
    ];
    if (args.gradeLevelId)
      conditions.push(eq(schema.units.gradeLevelId, args.gradeLevelId));
    if (args.subjectId)
      conditions.push(eq(schema.units.subjectId, args.subjectId));

    const units = await db
      .select({
        unit: schema.units,
        subjectName: schema.subjects.name,
        gradeLevelName: schema.gradeLevels.name,
      })
      .from(schema.units)
      .leftJoin(schema.subjects, eq(schema.units.subjectId, schema.subjects.id))
      .leftJoin(
        schema.gradeLevels,
        eq(schema.units.gradeLevelId, schema.gradeLevels.id),
      )
      .where(and(...conditions))
      .orderBy(asc(schema.units.sequence));

    const unitIds = units.map((u: any) => u.unit.id);
    const lessons =
      unitIds.length > 0
        ? await db
            .select({
              id: schema.lessonNotes.id,
              unitId: schema.lessonNotes.unitId,
              classId: schema.lessonNotes.classId,
              title: schema.lessonNotes.title,
              status: schema.lessonNotes.status,
              lessonDate: schema.lessonNotes.lessonDate,
            })
            .from(schema.lessonNotes)
            .where(inArray(schema.lessonNotes.unitId, unitIds))
        : [];

    const objectives =
      unitIds.length > 0
        ? await db
            .select()
            .from(schema.learningObjectives)
            .where(inArray(schema.learningObjectives.unitId, unitIds))
            .orderBy(asc(schema.learningObjectives.sequence))
        : [];

    const weeks = Math.max(
      0,
      ...units.map((u: any) => u.unit.weekEnd ?? u.unit.weekStart ?? 0),
    );

    const calendar = [];
    for (let week = 1; week <= weeks; week++) {
      const inWeek = units.filter(
        (u: any) =>
          (u.unit.weekStart ?? 0) <= week && (u.unit.weekEnd ?? 0) >= week,
      );
      calendar.push({
        week,
        entries: inWeek.map((u: any) => {
          const weekLessons = lessons.filter(
            (l: any) =>
              l.unitId === u.unit.id &&
              (l.title?.startsWith(`Week ${week} `) ||
                l.title?.startsWith(`Week ${week}—`)),
          );
          return {
            unitId: u.unit.id,
            unitTitle: u.unit.title,
            subjectId: u.unit.subjectId,
            gradeLevelId: u.unit.gradeLevelId,
            subjectName: u.subjectName ?? "—",
            gradeLevelName: u.gradeLevelName ?? "—",
            objectives: objectives
              .filter((o: any) => o.unitId === u.unit.id)
              .map((o: any) => o.description),
            lessons: weekLessons.map((l: any) => ({
              id: l.id,
              classId: l.classId,
              title: l.title,
              status: l.status,
              lessonDate: l.lessonDate,
            })),
            lessonsPrepared: weekLessons.filter(
              (l: any) => l.status === "finalized",
            ).length,
            lessonsDrafted: weekLessons.length,
          };
        }),
      });
    }

    return {
      term: {
        id: term.id,
        name: term.name,
        startDate: term.startDate,
        endDate: term.endDate,
      },
      weeks,
      unitCount: units.length,
      lessonNoteCount: lessons.length,
      finalizedLessonCount: lessons.filter((l: any) => l.status === "finalized")
        .length,
      calendar,
    };
  },
});
