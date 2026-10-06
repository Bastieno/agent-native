import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { writeAppState } from "@agent-native/core/application-state";
import { getDb, schema } from "../server/db/index.js";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { jsonish } from "../shared/zod-json.js";
import { assertUnitInSchool } from "../server/lib/curriculum-access.js";

/**
 * Put a unit's objectives in teaching order.
 *
 * Order matters beyond tidiness: the scheme of work shares a unit's
 * objectives across its weeks in this order, so the first objective is what
 * week one teaches.
 */
export default defineAction({
  description:
    "Reorder a unit's learning objectives. Send every objective id in the unit, in teaching order — the scheme of work spreads them across the unit's weeks in this order.",
  schema: z.object({
    unitId: z.string().describe("Unit ID"),
    order: jsonish(z.array(z.string())).describe(
      "All of the unit's objective ids, first to teach first",
    ),
  }),
  http: { method: "PUT" },
  run: async (args) => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    await assertUnitInSchool(args.unitId, orgId);
    const db = getDb();

    const current = await db
      .select({ id: schema.learningObjectives.id })
      .from(schema.learningObjectives)
      .where(eq(schema.learningObjectives.unitId, args.unitId));
    const ids = new Set(current.map((o: { id: string }) => o.id));
    const sent = new Set(args.order);

    // A partial list would leave the missing ones with clashing positions,
    // and an id from another unit would be silently ignored. Refuse both.
    if (
      sent.size !== args.order.length ||
      sent.size !== ids.size ||
      args.order.some((id) => !ids.has(id))
    ) {
      throw new Error(
        `Send each of this unit's ${ids.size} objective ids exactly once. Read them with list-learning-objectives.`,
      );
    }

    for (let i = 0; i < args.order.length; i++) {
      await db
        .update(schema.learningObjectives)
        .set({ sequence: i + 1 })
        .where(eq(schema.learningObjectives.id, args.order[i]));
    }
    await writeAppState("refresh-signal", { ts: Date.now() });
    return { unitId: args.unitId, reordered: args.order.length };
  },
});
