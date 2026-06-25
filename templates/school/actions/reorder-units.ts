import { defineAction } from "@agent-native/core";
import { getDb, schema } from "../server/db/index.js";
import { eq } from "drizzle-orm";
import { z } from "zod";

export default defineAction({
  description:
    "Reorder units within a subject by providing the desired sequence of unit IDs (first ID = sequence 1).",
  schema: z.object({
    subjectId: z
      .string()
      .describe(
        "Subject ID (used only for context — all IDs must belong to this subject)",
      ),
    order: z
      .array(z.string())
      .describe("Unit IDs in the desired display order"),
  }),
  http: { method: "PUT" },
  run: async (args) => {
    const db = getDb();
    const now = new Date().toISOString();
    for (let i = 0; i < args.order.length; i++) {
      await db
        .update(schema.units)
        .set({ sequence: i + 1, updatedAt: now })
        .where(eq(schema.units.id, args.order[i]));
    }
    return { success: true, updated: args.order.length };
  },
});
