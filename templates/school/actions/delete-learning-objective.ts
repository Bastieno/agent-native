import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { writeAppState } from "@agent-native/core/application-state";
import { getDb, schema } from "../server/db/index.js";
import { and, asc, eq } from "drizzle-orm";
import { z } from "zod";
import { assertObjectiveInSchool } from "../server/lib/curriculum-access.js";

/**
 * Remove a learning objective from a unit.
 *
 * Removing is safe for work already done: activities and lesson notes keep
 * their own copy of the objectives they were written against, so nothing that
 * has been taught or marked loses its wording. What changes is planning from
 * here on.
 *
 * It previews first, like every other change an agent could make by mistake,
 * and the result carries the text so it can be put back with
 * create-learning-objective if it was the wrong one.
 */
export default defineAction({
  description:
    "Remove a learning objective from its unit. Previews by default; pass confirm=true to remove. Work already created keeps its own copy of the objective. The removed text is returned so it can be re-added.",
  schema: z.object({
    id: z.string().describe("Learning objective ID"),
    confirm: z
      .boolean()
      .optional()
      .default(false)
      .describe("Remove it. Without this, only describes what would happen."),
  }),
  http: { method: "POST" },
  run: async (args) => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const { objective, unit } = await assertObjectiveInSchool(args.id, orgId);
    const db = getDb();

    const siblings = await db
      .select({ id: schema.learningObjectives.id })
      .from(schema.learningObjectives)
      .where(eq(schema.learningObjectives.unitId, objective.unitId))
      .orderBy(asc(schema.learningObjectives.sequence));
    const remaining = siblings.length - 1;
    const warning =
      remaining === 0
        ? `This is the last objective in "${unit.title}". The unit will have nothing to plan or assess against until another is added.`
        : null;

    if (!args.confirm) {
      return {
        preview: true,
        id: args.id,
        unit: unit.title,
        description: objective.description,
        remainingInUnit: remaining,
        warning,
        message: `Would remove "${objective.description}" from "${unit.title}", leaving ${remaining} objective(s).${
          warning ? ` ${warning}` : ""
        } Call again with confirm=true to remove it.`,
      };
    }

    await db
      .delete(schema.learningObjectives)
      .where(
        and(
          eq(schema.learningObjectives.id, args.id),
          eq(schema.learningObjectives.unitId, objective.unitId),
        ),
      );

    // Close the gap so the unit's objectives stay numbered 1, 2, 3.
    const rest = siblings.filter((s: { id: string }) => s.id !== args.id);
    for (let i = 0; i < rest.length; i++) {
      await db
        .update(schema.learningObjectives)
        .set({ sequence: i + 1 })
        .where(eq(schema.learningObjectives.id, rest[i].id));
    }
    await writeAppState("refresh-signal", { ts: Date.now() });

    return {
      removed: true,
      id: args.id,
      unitId: objective.unitId,
      unit: unit.title,
      description: objective.description,
      bloomsLevel: objective.bloomsLevel,
      remainingInUnit: remaining,
      warning,
      message: `Removed "${objective.description}" from "${unit.title}".${
        warning ? ` ${warning}` : ""
      }`,
    };
  },
});
