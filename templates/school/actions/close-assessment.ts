import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getDb, schema } from "../server/db/index.js";
import { eq } from "drizzle-orm";
import { z } from "zod";

export default defineAction({
  description: "Close an assessment so no more submissions are accepted.",
  schema: z.object({
    id: z.string().describe("Assessment ID"),
  }),
  http: { method: "POST" },
  run: async (args) => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const db = getDb();

    await db
      .update(schema.assessments)
      .set({ status: "closed", updatedAt: new Date().toISOString() })
      .where(eq(schema.assessments.id, args.id));

    return { id: args.id, status: "closed" };
  },
});
