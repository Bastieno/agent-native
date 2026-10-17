import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getDb, schema } from "../server/db/index.js";
import { eq, and, asc } from "drizzle-orm";
import { z } from "zod";

export default defineAction({
  description: "List terms for a given academic year.",
  schema: z.object({
    academicYearId: z
      .string()
      .optional()
      .describe("Filter by academic year ID"),
  }),
  http: { method: "GET" },
  run: async (args) => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const db = getDb();
    const conditions = [eq(schema.terms.schoolId, orgId)];
    if (args.academicYearId) {
      conditions.push(eq(schema.terms.academicYearId, args.academicYearId));
    }
    return db
      .select()
      .from(schema.terms)
      .where(and(...conditions))
      .orderBy(asc(schema.terms.sequence));
  },
});
