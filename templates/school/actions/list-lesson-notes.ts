import { defineAction } from "@agent-native/core";
import { getDb, schema } from "../server/db/index.js";
import { eq, and, desc } from "drizzle-orm";
import { z } from "zod";

export default defineAction({
  description: "List lesson notes for a class, optionally filtered by unit or status.",
  schema: z.object({
    classId: z.string().describe("Class ID"),
    unitId: z.string().optional(),
    status: z.enum(["draft", "finalized"]).optional(),
    limit: z.number().optional().default(20),
  }),
  http: { method: "GET" },
  run: async (args) => {
    const db = getDb();
    const conditions = [eq(schema.lessonNotes.classId, args.classId)];
    if (args.unitId) conditions.push(eq(schema.lessonNotes.unitId, args.unitId));
    if (args.status) conditions.push(eq(schema.lessonNotes.status, args.status));
    return db
      .select()
      .from(schema.lessonNotes)
      .where(and(...conditions))
      .orderBy(desc(schema.lessonNotes.updatedAt))
      .limit(args.limit ?? 20);
  },
});
