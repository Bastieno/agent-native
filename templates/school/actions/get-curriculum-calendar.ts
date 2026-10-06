import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getDb, schema } from "../server/db/index.js";
import { eq, and, inArray, asc } from "drizzle-orm";
import { z } from "zod";
import { subjectsForYearGroup } from "../server/lib/subject-year-groups.js";
import { getOrgSetting } from "@agent-native/core/settings";
import { parseWeekPlan } from "../shared/week-plan.js";
import { reservedWeeksForTerm } from "../shared/term-weeks.js";
import { reservedFromWeek } from "../shared/objective-pacing.js";

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
              className: schema.classes.name,
              title: schema.lessonNotes.title,
              status: schema.lessonNotes.status,
              lessonDate: schema.lessonNotes.lessonDate,
            })
            .from(schema.lessonNotes)
            .leftJoin(
              schema.classes,
              eq(schema.lessonNotes.classId, schema.classes.id),
            )
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

    // Which week of this term a date falls in, counting from its start.
    const termStart = new Date(term.startDate).getTime();
    const weekOf = (date: string | null): number | null => {
      if (!date) return null;
      const t = new Date(date).getTime();
      if (!Number.isFinite(t) || !Number.isFinite(termStart)) return null;
      return Math.floor((t - termStart) / (7 * 24 * 60 * 60 * 1000)) + 1;
    };

    // What this week is for, when it is not for new material.
    //
    // The calendar showed unit titles and nothing else, so a week given to
    // the mid-term test or the examination looked like an ordinary teaching
    // week — and anyone reading it, person or agent, concluded the term had
    // no such weeks at all. Two sources: what the school reserves in every
    // term, and what a unit's own plan says about this week.
    const config = (await getOrgSetting(orgId, "school-config")) as any;
    const reserved = reservedWeeksForTerm(config?.reservedWeeks, term.id);
    const examFrom = reservedFromWeek(weeks, config?.examWeeksPerTerm);

    const calendar = [];
    for (let week = 1; week <= weeks; week++) {
      const inWeek = units.filter(
        (u: any) =>
          (u.unit.weekStart ?? 0) <= week && (u.unit.weekEnd ?? 0) >= week,
      );
      const setAside = [
        ...reserved
          .filter((r: any) => r.week === week)
          .map((r: any) => String(r.label)),
        ...(examFrom != null && week >= examFrom ? ["Examinations"] : []),
      ];

      calendar.push({
        week,
        // The school's own answer, in its own words. Empty when the school
        // has not set a week aside, which is a legitimate answer.
        setAside,
        entries: inWeek.map((u: any) => {
          // A note belongs to the week its date falls in. Matching on the
          // title alone ("Week 3 — …") missed every note a teacher named
          // themselves; the title is only the fallback for undated notes.
          const weekLessons = lessons.filter((l: any) => {
            if (l.unitId !== u.unit.id) return false;
            const noteWeek = weekOf(l.lessonDate);
            if (noteWeek !== null) return noteWeek === week;
            return (
              l.title?.startsWith(`Week ${week} `) ||
              l.title?.startsWith(`Week ${week}—`)
            );
          });
          // What this unit's own plan says about this week — "Mid-term test",
          // "Revision", "Practical". Written when the curriculum was drafted
          // and, until now, visible nowhere but the unit itself.
          const plan = parseWeekPlan(u.unit.weekPlanJson);
          const thisWeek = plan?.find((w) => w.week === week) ?? null;

          return {
            unitId: u.unit.id,
            unitTitle: u.unit.title,
            weekNote: thisWeek?.note ?? null,
            teachesThisWeek: thisWeek ? thisWeek.objectives.length > 0 : null,
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
              className: l.className ?? null,
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

    // The subjects this year group takes that have nothing planned this term.
    // Only subjects we know the year group takes can be "missing" — listing
    // every subject in the school put Physics on JSS1's to-do list.
    let unplannedSubjects: string[] = [];
    let yearGroupsNotStated: string[] = [];
    if (args.gradeLevelId) {
      const { taken, notStated } = await subjectsForYearGroup(
        orgId,
        args.gradeLevelId,
      );
      const planned = new Set(units.map((u: any) => u.unit.subjectId));
      unplannedSubjects = taken
        .filter((s) => !planned.has(s.id))
        .map((s) => s.name);
      yearGroupsNotStated = notStated.map((s) => s.name);
    }

    return {
      unplannedSubjects,
      yearGroupsNotStated,
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
