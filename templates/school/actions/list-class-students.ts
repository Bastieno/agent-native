import { defineAction } from "@agent-native/core";
import { getDb, schema } from "../server/db/index.js";
import { eq, and } from "drizzle-orm";
import { z } from "zod";

export default defineAction({
  description: "List all students enrolled in a class, with their category if available.",
  schema: z.object({
    classId: z.string().describe("Class ID"),
    status: z.enum(["active", "withdrawn", "suspended"]).optional().default("active"),
  }),
  http: { method: "GET" },
  run: async (args) => {
    const db = getDb();
    const enrollments = await db
      .select()
      .from(schema.classEnrollments)
      .where(
        and(
          eq(schema.classEnrollments.classId, args.classId),
          eq(schema.classEnrollments.status, args.status ?? "active"),
        ),
      );

    const results = [];
    for (const enrollment of enrollments) {
      const [student] = await db
        .select()
        .from(schema.students)
        .where(eq(schema.students.userId, enrollment.studentUserId))
        .limit(1);
      const [category] = await db
        .select()
        .from(schema.studentCategories)
        .where(
          and(
            eq(schema.studentCategories.classId, args.classId),
            student
              ? eq(schema.studentCategories.studentId, student.id)
              : eq(schema.studentCategories.classId, args.classId),
          ),
        )
        .limit(1);
      results.push({
        enrollmentId: enrollment.id,
        studentUserId: enrollment.studentUserId,
        studentId: student?.id ?? null,
        admissionNumber: student?.admissionNumber ?? null,
        category: category?.category ?? null,
        categoryBasis: category?.basis ?? null,
        enrolledAt: enrollment.enrolledAt,
      });
    }
    return results;
  },
});
