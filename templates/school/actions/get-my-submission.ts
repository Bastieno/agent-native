import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getDb, schema } from "../server/db/index.js";
import { eq, and } from "drizzle-orm";
import { z } from "zod";

export default defineAction({
  description:
    "Get the current student's submission for a specific assessment, including their grade if published.",
  schema: z.object({
    assessmentId: z.string(),
  }),
  http: { method: "GET" },
  run: async (args) => {
    const { userEmail } = currentAccess();
    const db = getDb();

    // Get user id from email
    const { sql } = await import("drizzle-orm");
    const userRow = (await db.get(
      sql`SELECT id FROM "user" WHERE email = ${userEmail} LIMIT 1`,
    )) as { id: string } | undefined;
    if (!userRow) throw new Error("User not found.");

    const [submission] = await db
      .select()
      .from(schema.submissions)
      .where(
        and(
          eq(schema.submissions.studentId, userRow.id),
          eq(schema.submissions.assessmentId, args.assessmentId),
        ),
      )
      .limit(1);

    if (!submission) return null;

    const [grade] = await db
      .select()
      .from(schema.grades)
      .where(
        and(
          eq(schema.grades.submissionId, submission.id),
          eq(schema.grades.isPublished, 1 as any),
        ),
      )
      .limit(1);

    return { ...submission, grade: grade ?? null };
  },
});
