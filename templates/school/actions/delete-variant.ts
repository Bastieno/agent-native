import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getDb, schema } from "../server/db/index.js";
import { eq } from "drizzle-orm";
import { z } from "zod";

export default defineAction({
  description: "Delete an assessment variant.",
  schema: z.object({
    id: z.string().describe("Variant ID"),
  }),
  http: { method: "DELETE" },
  run: async (args) => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const db = getDb();

    await db
      .delete(schema.assessmentVariants)
      .where(eq(schema.assessmentVariants.id, args.id));

    return { id: args.id, deleted: true };
  },
});
