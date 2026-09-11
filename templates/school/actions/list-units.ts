import { defineAction } from "@agent-native/core";
import { getDb, schema } from "../server/db/index.js";
import { eq, and, asc } from "drizzle-orm";
import { z } from "zod";

export default defineAction({
  description:
    "List curriculum units for a subject, optionally filtered by grade level or term.",
  schema: z.object({
    subjectId: z.string().describe("Subject ID"),
    gradeLevelId: z.string().optional(),
    termId: z.string().optional(),
    status: z.enum(["draft", "active", "archived"]).optional(),
  }),
  http: { method: "GET" },
  run: async (args) => {
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
    return units;
  },
});
