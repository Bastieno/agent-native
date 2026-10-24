import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { writeAppState } from "@agent-native/core/application-state";
import { getDb, schema } from "../server/db/index.js";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { assertOwnFrameworkObjective } from "../server/lib/curriculum-access.js";

/**
 * Remove an objective that is not in the syllabus — a duplicate, or a heading
 * read as though it were an objective.
 *
 * Previews first, and returns the wording so a mistake can be put back with
 * create-framework-objective.
 */
export default defineAction({
  description:
    "Remove one objective from a syllabus this school imported. Previews by default; pass confirm=true to remove. The wording is returned so it can be added back. Only this school's own libraries can be edited.",
  schema: z.object({
    id: z.string().describe("Objective ID"),
    confirm: z.boolean().optional().default(false),
  }),
  http: { method: "POST" },
  run: async (args) => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const { objective, framework } = await assertOwnFrameworkObjective(
      args.id,
      orgId,
    );

    if (!args.confirm) {
      return {
        preview: true,
        id: args.id,
        code: objective.code,
        description: objective.description,
        message: `Would remove "${objective.description}" (${objective.code}) from ${framework.name} · ${framework.subject ?? "this subject"}. Curricula already written are unchanged. Call again with confirm=true.`,
      };
    }

    await getDb()
      .delete(schema.frameworkObjectives)
      .where(eq(schema.frameworkObjectives.id, args.id));
    await writeAppState("refresh-signal", { ts: Date.now() });

    return {
      removed: true,
      id: args.id,
      code: objective.code,
      description: objective.description,
      strand: objective.strand,
      message: `Removed "${objective.description}" from ${framework.name}. Add it back with create-framework-objective if that was wrong.`,
    };
  },
});
