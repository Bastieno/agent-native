import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getDb, schema } from "../server/db/index.js";
import { assertUnitInSchool } from "../server/lib/curriculum-access.js";
import { eq, asc } from "drizzle-orm";
import { z } from "zod";

export default defineAction({
  description: "List learning objectives for a unit.",
  schema: z.object({
    unitId: z.string().describe("Unit ID"),
  }),
  http: { method: "GET" },
  run: async (args) => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    await assertUnitInSchool(args.unitId, orgId);
    const db = getDb();
    return db
      .select()
      .from(schema.learningObjectives)
      .where(eq(schema.learningObjectives.unitId, args.unitId))
      .orderBy(asc(schema.learningObjectives.sequence));
  },
});
