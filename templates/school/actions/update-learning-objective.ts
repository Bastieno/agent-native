import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { writeAppState } from "@agent-native/core/application-state";
import { getDb, schema } from "../server/db/index.js";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { assertObjectiveInSchool } from "../server/lib/curriculum-access.js";

/**
 * Reword a committed learning objective.
 *
 * A committed curriculum could only grow: objectives could be added but never
 * corrected. Fixing a typo or a clumsy phrasing meant leaving it in place.
 *
 * Work already set against the old wording keeps it — activities and lesson
 * notes store the text they were written for, so a rewording changes what is
 * planned from now on and leaves past work as it was taught.
 */
export default defineAction({
  description:
    "Reword a learning objective or change its Bloom's level. Work already created keeps the wording it was written against; only future planning uses the new text.",
  schema: z.object({
    id: z.string().describe("Learning objective ID"),
    description: z
      .string()
      .optional()
      .describe("New wording — what learners will be able to do"),
    bloomsLevel: z
      .enum([
        "remember",
        "understand",
        "apply",
        "analyze",
        "evaluate",
        "create",
      ])
      .nullable()
      .optional()
      .describe("Bloom's level; null clears it"),
  }),
  http: { method: "PUT" },
  run: async (args) => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const { objective } = await assertObjectiveInSchool(args.id, orgId);

    const updates: Record<string, unknown> = {};
    if (args.description !== undefined) {
      const text = args.description.trim();
      if (!text) {
        throw new Error(
          "An objective cannot be empty. Use delete-learning-objective to remove it.",
        );
      }
      updates.description = text;
    }
    if (args.bloomsLevel !== undefined) updates.bloomsLevel = args.bloomsLevel;
    if (Object.keys(updates).length === 0) {
      return { id: args.id, message: "Nothing to change." };
    }

    await getDb()
      .update(schema.learningObjectives)
      .set(updates)
      .where(eq(schema.learningObjectives.id, args.id));
    await writeAppState("refresh-signal", { ts: Date.now() });

    return {
      id: args.id,
      unitId: objective.unitId,
      previous: objective.description,
      description: updates.description ?? objective.description,
      message: "Objective updated.",
    };
  },
});
