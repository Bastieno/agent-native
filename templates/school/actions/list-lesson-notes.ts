import { defineAction } from "@agent-native/core";
import { getDb, schema } from "../server/db/index.js";
import { eq, and, asc, desc, sql, inArray } from "drizzle-orm";
import { z } from "zod";
import { numberish } from "../shared/zod-json.js";

export default defineAction({
  description:
    "List lesson notes for a class, optionally filtered by unit or status.",
  schema: z.object({
    classId: z.string().describe("Class ID"),
    unitId: z.string().optional(),
    status: z.enum(["draft", "finalized"]).optional(),
    limit: numberish().optional().default(20),
  }),
  http: { method: "GET" },
  run: async (args) => {
    const db = getDb();
    const conditions = [eq(schema.lessonNotes.classId, args.classId)];
    if (args.unitId)
      conditions.push(eq(schema.lessonNotes.unitId, args.unitId));
    if (args.status)
      conditions.push(eq(schema.lessonNotes.status, args.status));
    const rows = await db
      .select()
      .from(schema.lessonNotes)
      .where(and(...conditions))
      // Teaching order, not editing order. Sorting by what was touched last
      // put whichever week somebody had just opened at the top, so a term
      // read as 2, 1, 3, 4 — a list nobody can scan for "where are we?".
      // Notes with no date fall to the end rather than hiding at the top.
      .orderBy(
        sql`CASE WHEN ${schema.lessonNotes.lessonDate} IS NULL THEN 1 ELSE 0 END`,
        asc(schema.lessonNotes.lessonDate),
        desc(schema.lessonNotes.updatedAt),
      )
      .limit(args.limit ?? 20);
    if (rows.length === 0) return rows;

    // What each row needs to say where it sits: its unit, which week of the
    // term it is, and what material is set for it.
    const unitIds = [
      ...new Set(rows.map((r: any) => r.unitId).filter(Boolean)),
    ];
    const units = unitIds.length
      ? await db
          .select({ id: schema.units.id, title: schema.units.title })
          .from(schema.units)
          .where(inArray(schema.units.id, unitIds as string[]))
      : [];
    const unitTitle = new Map(units.map((u: any) => [u.id, u.title]));

    const orgId = (rows[0] as any).orgId as string | null;
    const terms = orgId
      ? await db
          .select({
            startDate: schema.terms.startDate,
            endDate: schema.terms.endDate,
          })
          .from(schema.terms)
          .where(eq(schema.terms.schoolId, orgId))
      : [];
    const day = (d: string) => Date.parse(d.slice(0, 10));
    const weekOf = (date: string | null) => {
      if (!date) return null;
      const t = day(date);
      const term = terms.find(
        (x: any) => day(x.startDate) <= t && t <= day(x.endDate) + 86_400_000,
      );
      return term
        ? Math.floor((t - day(term.startDate)) / 604_800_000) + 1
        : null;
    };

    const material = await db
      .select({
        lessonNoteId: schema.assessments.lessonNoteId,
        status: schema.assessments.status,
      })
      .from(schema.assessments)
      .where(
        inArray(
          schema.assessments.lessonNoteId,
          rows.map((r: any) => r.id),
        ),
      );

    return rows.map((r: any) => {
      const mine = material.filter((m: any) => m.lessonNoteId === r.id);
      return {
        ...r,
        unitTitle: unitTitle.get(r.unitId) ?? null,
        weekNumber: weekOf(r.lessonDate),
        materialCount: mine.length,
        materialShared: mine.filter(
          (m: any) => m.status === "published" || m.status === "closed",
        ).length,
      };
    });
  },
});
