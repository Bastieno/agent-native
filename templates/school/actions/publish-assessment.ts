import { defineAction } from "@agent-native/core";
import { getDb, schema } from "../server/db/index.js";
import { eq } from "drizzle-orm";
import { z } from "zod";

export default defineAction({
  description: "Publish an assessment so students can see and submit it.",
  schema: z.object({
    id: z.string().describe("Assessment ID"),
  }),
  http: { method: "POST" },
  run: async (args) => {
    const db = getDb();
    await db
      .update(schema.assessments)
      .set({ status: "published", updatedAt: new Date().toISOString() })
      .where(eq(schema.assessments.id, args.id));
    return { success: true, id: args.id, status: "published" };
  },
});
