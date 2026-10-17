import { defineAction } from "@agent-native/core";
import { getDb, schema } from "../server/db/index.js";
import { eq, and } from "drizzle-orm";
import { z } from "zod";

export default defineAction({
  description:
    "List assessments for a class. Filter by status to see drafts, published, or closed assessments.",
  schema: z.object({
    classId: z.string().describe("Class ID"),
    status: z
      .enum(["draft", "published", "closed"])
      .optional()
      .describe("Filter by status (omit to return all)"),
  }),
  http: { method: "GET" },
  run: async (args) => {
    const db = getDb();
    const conditions = [eq(schema.assessments.classId, args.classId)];
    if (args.status)
      conditions.push(eq(schema.assessments.status, args.status));
    return db
      .select()
      .from(schema.assessments)
      .where(and(...conditions));
  },
});
