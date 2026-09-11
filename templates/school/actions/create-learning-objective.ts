import { defineAction } from "@agent-native/core";
import { getDb, schema } from "../server/db/index.js";
import { nanoid } from "nanoid";
import { z } from "zod";

export default defineAction({
  description: "Add a learning objective to a unit.",
  schema: z.object({
    unitId: z.string().describe("Unit ID"),
    description: z
      .string()
      .describe(
        "What students will be able to do, e.g. 'Add fractions with unlike denominators'",
      ),
    bloomsLevel: z
      .enum([
        "remember",
        "understand",
        "apply",
        "analyze",
        "evaluate",
        "create",
      ])
      .optional()
      .describe("Bloom's taxonomy level"),
    sequence: z.number().optional().default(1),
  }),
  http: { method: "POST" },
  run: async (args) => {
    const db = getDb();
    const id = nanoid();
    await db.insert(schema.learningObjectives).values({
      id,
      unitId: args.unitId,
      description: args.description,
      bloomsLevel: args.bloomsLevel ?? null,
      sequence: args.sequence ?? 1,
    });
    return { id, description: args.description };
  },
});
