import { defineAction } from "@agent-native/core";
import { getDb, schema } from "../server/db/index.js";
import { eq } from "drizzle-orm";
import { z } from "zod";

export default defineAction({
  description: "List all variants (difficulty tiers) for an assessment.",
  schema: z.object({
    assessmentId: z.string().describe("Assessment ID"),
  }),
  http: { method: "GET" },
  run: async (args) => {
    const db = getDb();
    return db
      .select()
      .from(schema.assessmentVariants)
      .where(eq(schema.assessmentVariants.assessmentId, args.assessmentId));
  },
});
