import { defineAction } from "@agent-native/core";
import { getDb, schema } from "../server/db/index.js";
import { eq, and, inArray, desc } from "drizzle-orm";
import { getUserLabels, labelFor } from "../server/lib/user-names.js";
import { z } from "zod";

export default defineAction({
  description:
    "List all students enrolled in a class, with their name, admission number, and category if available.",
  schema: z.object({
    classId: z.string().describe("Class ID"),
    status: z
      .enum(["active", "withdrawn", "suspended"])
      .optional()
      .default("active"),
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
    if (enrollments.length === 0) return [];

    const userIds = enrollments.map((e: any) => e.studentUserId);

    // Batched: one query for the student records, one for categories, one for
    // names — rather than two queries per enrolled student.
    const students = await db
      .select()
      .from(schema.students)
      .where(inArray(schema.students.userId, userIds));
    const studentByUserId: Record<string, any> = {};
    for (const s of students) studentByUserId[s.userId] = s;

    const recordIds = students.map((s: any) => s.id);
    const categories =
      recordIds.length > 0
        ? await db
            .select()
            .from(schema.studentCategories)
            .where(
              and(
                eq(schema.studentCategories.classId, args.classId),
                inArray(schema.studentCategories.studentId, recordIds),
              ),
            )
            .orderBy(desc(schema.studentCategories.assessedAt))
        : [];
    // Keep the most recent assessment per student.
    const categoryByStudentId: Record<string, any> = {};
    for (const c of categories) {
      if (!categoryByStudentId[c.studentId])
        categoryByStudentId[c.studentId] = c;
    }

    const labels = await getUserLabels(userIds);

    return enrollments.map((enrollment: any) => {
      const student = studentByUserId[enrollment.studentUserId];
      // Only ever read a category belonging to this student — the previous
      // fallback could return another student's category entirely.
      const category = student ? categoryByStudentId[student.id] : null;
      return {
        enrollmentId: enrollment.id,
        studentUserId: enrollment.studentUserId,
        studentId: student?.id ?? null,
        name: labelFor(labels, enrollment.studentUserId),
        email: labels[enrollment.studentUserId]?.email ?? null,
        admissionNumber: student?.admissionNumber ?? null,
        category: category?.category ?? null,
        categoryBasis: category?.basis ?? null,
        enrolledAt: enrollment.enrolledAt,
      };
    });
  },
});
