import { defineAction } from "@agent-native/core";
import { getDb, schema } from "../server/db/index.js";
import { and, eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import { z } from "zod";

export default defineAction({
  description: "Enroll a student in a class.",
  schema: z.object({
    classId: z.string().describe("Class ID"),
    studentUserId: z.string().describe("Student's user ID"),
  }),
  http: { method: "POST" },
  run: async (args) => {
    const db = getDb();
    // Check if already enrolled
    const [existing] = await db
      .select()
      .from(schema.classEnrollments)
      .where(
        and(
          eq(schema.classEnrollments.classId, args.classId),
          eq(schema.classEnrollments.studentUserId, args.studentUserId),
        ),
      )
      .limit(1);
    if (existing) {
      if (existing.status === "active") {
        return { alreadyEnrolled: true, id: existing.id };
      }
      // Re-activate withdrawn enrollment
      await db
        .update(schema.classEnrollments)
        .set({ status: "active" })
        .where(eq(schema.classEnrollments.id, existing.id));
      return { reactivated: true, id: existing.id };
    }
    const id = nanoid();
    await db.insert(schema.classEnrollments).values({
      id,
      classId: args.classId,
      studentUserId: args.studentUserId,
      status: "active",
    });
    return { id, classId: args.classId, studentUserId: args.studentUserId };
  },
});
