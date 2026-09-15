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
        "The full accumulated state, in the shape commit-curriculum-draft reads:\n" +
          '{ "subjects": [ { "subjectId": "<existing subject id, to avoid creating a duplicate>", "name": "Mathematics", "code": "MTH",\n' +
          '  "gradeLevels": [ { "gradeLevelId": "<grade level id>", "gradeLevelName": "JSS1",\n' +
          '    "units": [ { "title": "Whole Numbers", "termId": "<term id>", "weekStart": 1, "weekEnd": 3,\n' +
          '      "standards": [ { "framework": "NERDC", "code": "MATHJSS-NN-1", "description": "..." } ],\n' +
          '      "learningObjectives": [ { "description": "...", "bloomsLevel": "understand" } ] } ] } ] } ] }\n' +
          "Units nest under the year group they are written for. Send the whole state each time, not a patch.",
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
