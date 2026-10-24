import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { writeAppState } from "@agent-native/core/application-state";
import { getDb, schema } from "../server/db/index.js";
import { eq, max } from "drizzle-orm";
import { assertUnitInSchool } from "../server/lib/curriculum-access.js";
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
    sequence: z
      .number()
      .optional()
      .describe("Position in the unit. Omit to add it at the end."),
  }),
  http: { method: "POST" },
  run: async (args) => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    await assertUnitInSchool(args.unitId, orgId);
    const db = getDb();
    const id = nanoid();

    // Defaulting every new objective to position 1 put it ahead of the
    // unit's existing ones; it goes at the end unless placed.
    const [{ last }] = await db
      .select({ last: max(schema.learningObjectives.sequence) })
      .from(schema.learningObjectives)
      .where(eq(schema.learningObjectives.unitId, args.unitId));
    await db.insert(schema.learningObjectives).values({
      id,
      unitId: args.unitId,
      description: args.description,
      bloomsLevel: args.bloomsLevel ?? null,
      sequence: args.sequence ?? (Number(last) || 0) + 1,
    });
    await writeAppState("refresh-signal", { ts: Date.now() });
    return { id, description: args.description };
  },
});
