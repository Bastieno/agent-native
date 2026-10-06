import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getDb, schema } from "../server/db/index.js";
import { assertSubjectInSchool } from "../server/lib/curriculum-access.js";
import { and, eq, inArray } from "drizzle-orm";
import { z } from "zod";

export default defineAction({
  description:
    "Reorder units within a subject by providing the desired sequence of unit IDs (first ID = sequence 1).",
  schema: z.object({
    subjectId: z
      .string()
      .describe("Subject ID — every unit in the order must belong to it"),
    order: z
      .array(z.string())
      .describe("Unit IDs in the desired display order"),
  }),
  http: { method: "PUT" },
  run: async (args) => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    await assertSubjectInSchool(args.subjectId, orgId);
    const db = getDb();

    // The description always said every id must belong to this subject; now
    // it is checked, so an order cannot renumber another subject's units.
    const owned = await db
      .select({ id: schema.units.id })
      .from(schema.units)
      .where(
        and(
          eq(schema.units.subjectId, args.subjectId),
          inArray(schema.units.id, args.order),
        ),
      );
    if (owned.length !== new Set(args.order).size) {
      throw new Error(
        "Some of those units are not in this subject. Read the subject's units again and send only their ids.",
      );
    }

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
