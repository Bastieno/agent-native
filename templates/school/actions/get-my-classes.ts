import { defineAction } from "@agent-native/core";
import { getDb, schema } from "../server/db/index.js";
import { eq, and } from "drizzle-orm";
import { z } from "zod";

export default defineAction({
  description:
    "Student-facing: Get all classes the student is currently enrolled in, including subject and grade level info.",
  schema: z.object({
    studentUserId: z.string().describe("The student's user ID"),
  }),
  http: { method: "GET" },
  run: async (args) => {
    const db = getDb();
    const enrollments = await db
      .select()
      .from(schema.classEnrollments)
      .where(
        and(
          eq(schema.classEnrollments.studentUserId, args.studentUserId),
          eq(schema.classEnrollments.status, "active"),
        ),
      );

    const results = [];
    for (const e of enrollments) {
      const [cls] = await db
        .select()
        .from(schema.classes)
        .where(eq(schema.classes.id, e.classId))
        .limit(1);
      if (cls) results.push(cls);
    }
    return results;
  },
});
