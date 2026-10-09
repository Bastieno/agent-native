import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getDb, schema } from "../server/db/index.js";
import { and, eq, ne } from "drizzle-orm";
import { z } from "zod";

/**
 * Promotion day: the year planned ahead of time becomes the one the school
 * is in. Every other current year is archived, so there is only ever one —
 * terms, timetables and arm moves all read "the current year", and two of
 * them would leave each of those to guess.
 */
export default defineAction({
  description:
    "Make an academic year the school's current year, archiving whichever was current. Use at promotion, once next year's classes are ready; then move learners into their new arms.",
  schema: z.object({
    id: z.string().describe("The academic year to make current"),
  }),
  http: { method: "POST" },
  run: async (args) => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const db = getDb();

    const [year] = await db
      .select()
      .from(schema.academicYears)
      .where(
        and(
          eq(schema.academicYears.id, args.id),
          eq(schema.academicYears.orgId, orgId),
          eq(schema.academicYears.schoolId, orgId),
        ),
      )
      .limit(1);
    if (!year) throw new Error("That academic year is not in this school.");
    if (year.status === "active") {
      return {
        id: year.id,
        name: year.name,
        message: `${year.name} is already the current academic year.`,
      };
    }

    const others = await db
      .select({ name: schema.academicYears.name })
      .from(schema.academicYears)
      .where(
        and(
          eq(schema.academicYears.orgId, orgId),
          eq(schema.academicYears.schoolId, orgId),
          eq(schema.academicYears.status, "active"),
          ne(schema.academicYears.id, year.id),
        ),
      );
    await db
      .update(schema.academicYears)
      .set({ status: "archived" })
      .where(
        and(
          eq(schema.academicYears.orgId, orgId),
          eq(schema.academicYears.schoolId, orgId),
          eq(schema.academicYears.status, "active"),
        ),
      );
    await db
      .update(schema.academicYears)
      .set({ status: "active", updatedAt: new Date().toISOString() })
      .where(
        and(
          eq(schema.academicYears.id, year.id),
          eq(schema.academicYears.orgId, orgId),
        ),
      );

    const was = others.map((o) => o.name).join(" and ");
    return {
      id: year.id,
      name: year.name,
      message: was
        ? `${year.name} is now the current academic year; ${was} is archived and keeps its classes, marks and report cards.`
        : `${year.name} is now the current academic year.`,
    };
  },
});
