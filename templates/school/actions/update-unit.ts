import { defineAction } from "@agent-native/core";
import { getDb, schema } from "../server/db/index.js";
import { eq } from "drizzle-orm";
import { z } from "zod";

export default defineAction({
  description:
    "Update a curriculum unit's title, description, dates, sequence, or status.",
  schema: z.object({
    id: z.string().describe("Unit ID"),
    title: z.string().optional(),
    description: z.string().optional(),
    termId: z.string().optional(),
    weekStart: z.number().optional(),
    weekEnd: z.number().optional(),
    sequence: z.number().optional(),
    status: z.enum(["draft", "active", "archived"]).optional(),
  }),
  http: { method: "PUT" },
  run: async (args) => {
    const db = getDb();
    const { id, ...updates } = args;
    await db
      .update(schema.units)
      .set({ ...updates, updatedAt: new Date().toISOString() })
      .where(eq(schema.units.id, id));
    return { success: true, id };
  },
});
