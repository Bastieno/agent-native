import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getDb, schema } from "../server/db/index.js";
import { and, asc, eq, inArray } from "drizzle-orm";
import { nanoid } from "nanoid";
import { z } from "zod";
import { boolish } from "../shared/zod-json.js";
import { yearsToCarryBetween } from "../server/lib/academic-year.js";

/**
 * Carry a year's curriculum into the next one.
 *
 * Units belong to a term, and a term belongs to one academic year — so when a
 * school moves into a new year its curriculum is, correctly, empty: nothing
 * was ever written for those terms. A school does not write its curriculum
 * again every year. It starts from last year's and changes what it wants to,
 * and last year's stays exactly as it was taught, which is what a report card
 * or a past lesson note points back to.
 *
 * So this copies rather than moves. Each unit lands in the term in the same
 * position (first term to first term) with its objectives, week plan and
 * standards. Nothing is named after a school, a subject or a term: positions,
 * not names, so a school that calls its terms quarters works the same.
 */
export default defineAction({
  description:
    "Copy one academic year's curriculum (units with their objectives, week plans and standards) into another year's terms, term for term by position. Use it after creating next year, so its classes have something to plan lesson notes from. It copies, so last year's curriculum is untouched, and it skips units already there, so it is safe to run again. Previews by default; pass confirm=true to copy. With no years named it copies from the most recent earlier year into the current one.",
  schema: z.object({
    fromAcademicYearId: z
      .string()
      .optional()
      .describe(
        "Year to copy from. Defaults to the latest year before the target.",
      ),
    toAcademicYearId: z
      .string()
      .optional()
      .describe(
        "Year to copy into. Defaults to the upcoming year if there is one, else the current year.",
      ),
    subjectId: z.string().optional().describe("Only this subject"),
    gradeLevelId: z.string().optional().describe("Only this year group"),
    confirm: boolish()
      .optional()
      .default(false)
      .describe("false returns a preview; true copies"),
  }),
  http: { method: "POST" },
  run: async (args) => {
    const { orgId, userEmail } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const db = getDb();

    const { from, to } = await yearsToCarryBetween(
      orgId,
      args.fromAcademicYearId,
      args.toAcademicYearId,
    );

    const termsOf = async (yearId: string) =>
      db
        .select()
        .from(schema.terms)
        .where(
          and(
            eq(schema.terms.orgId, orgId),
            eq(schema.terms.academicYearId, yearId),
          ),
        )
        .orderBy(asc(schema.terms.sequence));
    const fromTerms = await termsOf(from.id);
    const toTerms = await termsOf(to.id);
    if (toTerms.length === 0) {
      throw new Error(
        `${to.name} has no terms yet. Add its terms first, then copy.`,
      );
    }

    // Same position to same position; a year with fewer terms leaves the
    // extra ones behind and says so.
    const termMap = new Map<string, any>();
    const unmatchedTerms: string[] = [];
    fromTerms.forEach((t: any, i: number) => {
      const target = toTerms[i];
      if (target) termMap.set(t.id, target);
      else unmatchedTerms.push(t.name);
    });

    const conditions = [
      eq(schema.units.orgId, orgId),
      eq(schema.units.status, "active"),
      inArray(
        schema.units.termId,
        fromTerms.map((t: any) => t.id),
      ),
    ];
    if (args.subjectId)
      conditions.push(eq(schema.units.subjectId, args.subjectId));
    if (args.gradeLevelId)
      conditions.push(eq(schema.units.gradeLevelId, args.gradeLevelId));
    const source =
      fromTerms.length === 0
        ? []
        : await db
            .select()
            .from(schema.units)
            .where(and(...conditions))
            .orderBy(asc(schema.units.sequence));

    // What the target already has, so a second run adds nothing twice.
    const existing = await db
      .select({
        subjectId: schema.units.subjectId,
        gradeLevelId: schema.units.gradeLevelId,
        termId: schema.units.termId,
        title: schema.units.title,
      })
      .from(schema.units)
      .where(
        and(
          eq(schema.units.orgId, orgId),
          inArray(
            schema.units.termId,
            toTerms.map((t: any) => t.id),
          ),
        ),
      );
    const have = new Set(
      existing.map(
        (u: any) => `${u.subjectId}|${u.gradeLevelId}|${u.termId}|${u.title}`,
      ),
    );

    const toCopy: any[] = [];
    let alreadyThere = 0;
    let noTermMatch = 0;
    for (const u of source as any[]) {
      const target = termMap.get(u.termId);
      if (!target) {
        noTermMatch++;
        continue;
      }
      if (
        have.has(`${u.subjectId}|${u.gradeLevelId}|${target.id}|${u.title}`)
      ) {
        alreadyThere++;
        continue;
      }
      toCopy.push({ unit: u, target });
    }

    const objectives =
      toCopy.length === 0
        ? []
        : await db
            .select()
            .from(schema.learningObjectives)
            .where(
              inArray(
                schema.learningObjectives.unitId,
                toCopy.map((c) => c.unit.id),
              ),
            )
            .orderBy(asc(schema.learningObjectives.sequence));
    const objectivesOf = new Map<string, any[]>();
    for (const o of objectives as any[]) {
      const list = objectivesOf.get(o.unitId) ?? [];
      list.push(o);
      objectivesOf.set(o.unitId, list);
    }
    const objectiveCount = toCopy.reduce(
      (n, c) => n + (objectivesOf.get(c.unit.id)?.length ?? 0),
      0,
    );

    const summary = {
      from: from.name,
      to: to.name,
      units: toCopy.length,
      objectives: objectiveCount,
      alreadyThere,
      leftBehind: noTermMatch,
      termsWithNoCounterpart: unmatchedTerms,
    };
    const notes = [
      alreadyThere
        ? `${alreadyThere} unit${alreadyThere === 1 ? " is" : "s are"} already in ${to.name} and will be left alone.`
        : "",
      noTermMatch
        ? `${noTermMatch} unit${noTermMatch === 1 ? "" : "s"} from ${unmatchedTerms.join(", ")} have no matching term in ${to.name} and are not copied.`
        : "",
    ]
      .filter(Boolean)
      .join(" ");

    if (!args.confirm) {
      return {
        preview: true,
        ...summary,
        message: [
          `This would copy ${toCopy.length} unit${toCopy.length === 1 ? "" : "s"} with ${objectiveCount} objective${objectiveCount === 1 ? "" : "s"} from ${from.name} into ${to.name}, term for term. ${from.name}'s curriculum is not changed.`,
          notes,
          "Re-run with confirm=true to copy it.",
        ]
          .filter(Boolean)
          .join(" "),
      };
    }

    const now = new Date().toISOString();
    for (const { unit, target } of toCopy) {
      const id = nanoid();
      await db.insert(schema.units).values({
        id,
        subjectId: unit.subjectId,
        termId: target.id,
        gradeLevelId: unit.gradeLevelId,
        title: unit.title,
        description: unit.description,
        weekStart: unit.weekStart,
        weekEnd: unit.weekEnd,
        weekPlanJson: unit.weekPlanJson,
        sequence: unit.sequence,
        standardsJson: unit.standardsJson,
        status: "active",
        ownerEmail: userEmail ?? "",
        orgId,
        visibility: "org" as const,
      });
      const objs = objectivesOf.get(unit.id) ?? [];
      if (objs.length > 0) {
        await db.insert(schema.learningObjectives).values(
          objs.map((o: any) => ({
            id: nanoid(),
            unitId: id,
            description: o.description,
            bloomsLevel: o.bloomsLevel,
            sequence: o.sequence,
          })),
        );
      }
    }

    return {
      preview: false,
      ...summary,
      message: [
        `Copied ${toCopy.length} unit${toCopy.length === 1 ? "" : "s"} with ${objectiveCount} objective${objectiveCount === 1 ? "" : "s"} from ${from.name} into ${to.name}.`,
        notes,
        "Their classes can now plan lesson notes from them (plan-lesson-notes).",
      ]
        .filter(Boolean)
        .join(" "),
    };
  },
});
