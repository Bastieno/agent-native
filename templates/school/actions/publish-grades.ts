import { defineAction } from "@agent-native/core";
import { getDb, schema } from "../server/db/index.js";
import { eq } from "drizzle-orm";
import { z } from "zod";

export default defineAction({
  description:
    "Publish all grades for an assessment, making them visible to students.",
  schema: z.object({
    assessmentId: z.string().describe("Assessment ID"),
  }),
  http: { method: "POST" },
  run: async (args) => {
    const db = getDb();
    const now = new Date().toISOString();
    await db
      .update(schema.grades)
      .set({ isPublished: true, updatedAt: now })
      .where(eq(schema.grades.assessmentId, args.assessmentId));
    return { success: true, assessmentId: args.assessmentId, publishedAt: now };
  },
});
