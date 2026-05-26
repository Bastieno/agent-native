import { defineAction } from "@agent-native/core";
import { getDb, schema } from "../server/db/index.js";
import { eq, and } from "drizzle-orm";
import { z } from "zod";

export default defineAction({
  description: "Get the full gradebook for a class and term. Returns all students × all assessments with scores.",
  schema: z.object({
    classId: z.string().describe("Class ID"),
    termId: z.string().optional().describe("Term ID to filter assessments"),
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
          eq(schema.classEnrollments.status, "active"),
        ),
      );

    const assessmentConditions = [eq(schema.assessments.classId, args.classId)];
    const assessments = await db
      .select()
      .from(schema.assessments)
      .where(and(...assessmentConditions));

    const gradebook = [];
    for (const enrollment of enrollments) {
      const [student] = await db
        .select()
        .from(schema.students)
        .where(eq(schema.students.userId, enrollment.studentUserId))
        .limit(1);
      if (!student) continue;

      const grades: Record<string, { score: number | null; percentage: string | null; letterGrade: string | null; isPublished: boolean }> = {};
      for (const assessment of assessments) {
        const [submission] = await db
          .select()
          .from(schema.submissions)
          .where(
            and(
              eq(schema.submissions.studentId, student.id),
              eq(schema.submissions.assessmentId, assessment.id),
            ),
          )
          .limit(1);
        if (submission) {
          const [grade] = await db
            .select()
            .from(schema.grades)
            .where(eq(schema.grades.submissionId, submission.id))
            .limit(1);
          grades[assessment.id] = {
            score: grade?.score ?? null,
            percentage: grade?.percentage ?? null,
            letterGrade: grade?.letterGrade ?? null,
            isPublished: !!grade?.isPublished,
          };
        } else {
          grades[assessment.id] = { score: null, percentage: null, letterGrade: null, isPublished: false };
        }
      }
      gradebook.push({ studentId: student.id, studentUserId: enrollment.studentUserId, grades });
    }

    return {
      classId: args.classId,
      assessments: assessments.map((a) => ({ id: a.id, title: a.title, totalPoints: a.totalPoints, assessmentType: a.assessmentType })),
      gradebook,
    };
  },
});
