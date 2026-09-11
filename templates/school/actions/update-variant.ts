import { defineAction } from "@agent-native/core";
import { getDb, schema } from "../server/db/index.js";
import { eq } from "drizzle-orm";
import { z } from "zod";

export default defineAction({
  description:
    "Update a variant's content, instructions, label, or point value.",
  schema: z.object({
    id: z.string().describe("Variant ID"),
    label: z.string().optional(),
    content: z
      .string()
      .optional()
      .describe("Full markdown content (replaces existing)"),
    instructions: z.string().optional(),
    totalPoints: z.number().optional(),
  }),
  http: { method: "PUT" },
  run: async (args) => {
    const db = getDb();
    const { id, ...updates } = args;
    await db
      .update(schema.assessmentVariants)
      .set({ ...updates, updatedAt: new Date().toISOString() })
      .where(eq(schema.assessmentVariants.id, id));
    return { success: true, id };
  },
});
