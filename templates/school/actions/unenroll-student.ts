import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getDb, schema } from "../server/db/index.js";
import { eq, and } from "drizzle-orm";
import { z } from "zod";

export default defineAction({
  description:
    "Remove a student from a class (sets enrollment status to withdrawn).",
  schema: z.object({
    classId: z.string(),
    studentUserId: z.string(),
  }),
  http: { method: "POST" },
  run: async (args) => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const db = getDb();

    await db
      .update(schema.classEnrollments)
      .set({ status: "withdrawn" })
      .where(
        and(
          eq(schema.classEnrollments.classId, args.classId),
          eq(schema.classEnrollments.studentUserId, args.studentUserId),
        ),
      );

    return {
      classId: args.classId,
      studentUserId: args.studentUserId,
      status: "withdrawn",
    };
  },
});
