import { defineAction } from "@agent-native/core";
import { getDb, schema } from "../server/db/index.js";
import { eq, asc } from "drizzle-orm";
import { z } from "zod";

export default defineAction({
  description: "List learning objectives for a unit.",
  schema: z.object({
    unitId: z.string().describe("Unit ID"),
  }),
  http: { method: "GET" },
  run: async (args) => {
    const db = getDb();
    return db
      .select()
      .from(schema.learningObjectives)
      .where(eq(schema.learningObjectives.unitId, args.unitId))
      .orderBy(asc(schema.learningObjectives.sequence));
  },
});
