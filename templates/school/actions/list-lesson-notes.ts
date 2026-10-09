import { defineAction } from "@agent-native/core";
import { getDb, schema } from "../server/db/index.js";
import { eq, and, asc, desc, sql } from "drizzle-orm";
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
    return (
      db
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
        .limit(args.limit ?? 20)
    );
  },
});
