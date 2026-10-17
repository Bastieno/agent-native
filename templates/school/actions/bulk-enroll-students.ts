import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getDb, schema } from "../server/db/index.js";
import { eq, and, inArray } from "drizzle-orm";
import { nanoid } from "nanoid";
import { z } from "zod";

export default defineAction({
  description: "Enroll multiple students into a class at once.",
  schema: z.object({
    classId: z.string(),
    studentUserIds: z.array(z.string()).describe("Array of user IDs to enroll"),
  }),
  http: { method: "POST" },
  run: async (args) => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const db = getDb();

    const [cls] = await db
      .select({ id: schema.classes.id })
      .from(schema.classes)
      .where(
        and(
          eq(schema.classes.id, args.classId),
          eq(schema.classes.orgId, orgId),
        ),
      )
      .limit(1);
    if (!cls) throw new Error("Class not found.");

    // Get already-enrolled students to avoid duplicates
    const existing = await db
      .select({ studentUserId: schema.classEnrollments.studentUserId })
      .from(schema.classEnrollments)
      .where(
        and(
          eq(schema.classEnrollments.classId, args.classId),
          inArray(schema.classEnrollments.studentUserId, args.studentUserIds),
        ),
      );
    const existingSet = new Set(existing.map((e: any) => e.studentUserId));
    const toEnroll = args.studentUserIds.filter((id) => !existingSet.has(id));

    if (toEnroll.length > 0) {
      const now = new Date().toISOString();
      await db.insert(schema.classEnrollments).values(
        toEnroll.map((studentUserId) => ({
          id: nanoid(),
          classId: args.classId,
          studentUserId,
          enrolledAt: now,
          status: "active",
          createdAt: now,
        })),
      );
    }

    return {
      classId: args.classId,
      enrolled: toEnroll.length,
      skipped: existingSet.size,
    };
  },
});
