import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getDb, schema } from "../server/db/index.js";
import { assertSubjectInSchool } from "../server/lib/curriculum-access.js";
import { termIdsForYear, unitInYear } from "../server/lib/academic-year.js";
import { eq, and, asc } from "drizzle-orm";
import { z } from "zod";

export default defineAction({
  description:
    "List curriculum units for a subject, optionally filtered by grade level or term. The school's current year unless another is named.",
  schema: z.object({
    subjectId: z.string().describe("Subject ID"),
    gradeLevelId: z.string().optional(),
    termId: z.string().optional(),
    academicYearId: z
      .string()
      .optional()
      .describe("Which academic year's units. Omit for the current year."),
    status: z.enum(["draft", "active", "archived"]).optional(),
  }),
  http: { method: "GET" },
  run: async (args) => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    await assertSubjectInSchool(args.subjectId, orgId);
    const db = getDb();
    const conditions = [eq(schema.units.subjectId, args.subjectId)];
    if (args.gradeLevelId)
      conditions.push(eq(schema.units.gradeLevelId, args.gradeLevelId));
    if (args.termId) conditions.push(eq(schema.units.termId, args.termId));
    if (args.status) conditions.push(eq(schema.units.status, args.status));
    const units = await db
      .select()
      .from(schema.units)
      .where(and(...conditions))
      .orderBy(asc(schema.units.sequence));
    // One year's, unless a term was named (a term is already one year's).
    if (args.termId) return units;
    const yearTerms = await termIdsForYear(orgId, args.academicYearId);
    return units.filter((u: any) => unitInYear(u, yearTerms));
  },
});
