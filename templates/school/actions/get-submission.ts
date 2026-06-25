import { defineAction } from "@agent-native/core";
import { getDb, schema } from "../server/db/index.js";
import { eq } from "drizzle-orm";
import { z } from "zod";

export default defineAction({
  description:
    "Get a single submission by ID, including the grade if one has been recorded.",
  schema: z.object({
    id: z.string().describe("Submission ID"),
  }),
  http: { method: "GET" },
  run: async (args) => {
    const db = getDb();
    const [submission] = await db
      .select()
      .from(schema.submissions)
      .where(eq(schema.submissions.id, args.id))
      .limit(1);
    if (!submission) throw new Error(`Submission not found: ${args.id}`);

    const [grade] = await db
      .select()
      .from(schema.grades)
      .where(eq(schema.grades.submissionId, args.id))
      .limit(1);

    return { ...submission, grade: grade ?? null };
  },
});
