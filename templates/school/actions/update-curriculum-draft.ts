import { defineAction } from "@agent-native/core";
import { writeAppState } from "@agent-native/core/application-state";
import { getDb, schema } from "../server/db/index.js";
import { eq } from "drizzle-orm";
import { z } from "zod";

export default defineAction({
  description:
    "Persist accumulated curriculum co-authoring state after each turn. Updates both the SQL row (durable) and the app-state key (live UI). Call this at the end of every turn during a curriculum session.",
  schema: z.object({
    id: z.string().describe("Curriculum draft ID from start-curriculum-draft"),
    stateJson: z
      .record(z.string(), z.unknown())
      .describe(
        "The full accumulated state object — subjects, units, objectives built so far",
      ),
    step: z
      .string()
      .optional()
      .describe(
        "Current step label for the UI, e.g. 'Adding units for Grade 9'",
      ),
    lastAction: z.string().optional().describe("Last action performed"),
  }),
  http: { method: "PUT" },
  run: async (args) => {
    const db = getDb();
    const stateJsonStr = JSON.stringify(args.stateJson);
    await db
      .update(schema.curriculumDrafts)
      .set({ stateJson: stateJsonStr, updatedAt: new Date().toISOString() })
      .where(eq(schema.curriculumDrafts.id, args.id));
    await writeAppState(`curriculum-draft-${args.id}`, {
      draftId: args.id,
      stateJson: args.stateJson,
      step: args.step ?? "in_progress",
      lastAction: args.lastAction ?? "update-curriculum-draft",
    });
    return { success: true, id: args.id };
  },
});
