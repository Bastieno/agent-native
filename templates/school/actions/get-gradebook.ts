import { defineAction } from "@agent-native/core";
import { getDb, schema } from "../server/db/index.js";
import { eq, and, ne, or, isNull } from "drizzle-orm";
import { getUserLabels, labelFor } from "../server/lib/user-names.js";
import { z } from "zod";

export default defineAction({
  description:
    "Get the full gradebook for a class and term. Returns all students × all assessments with scores.",
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

    // A gradebook is a record of marks, so work that carries none does not
    // belong in it. A card deck or a reference sheet is real work a learner
    // does, but printing it as a column of "/0" tells a teacher nothing and
    // pushes the columns that do matter off the side of the screen.
    const assessmentConditions = [
      eq(schema.assessments.classId, args.classId),
      or(
        isNull(schema.assessments.gradingMode),
        ne(schema.assessments.gradingMode, "none"),
      ),
    ];
    const assessments = await db
      .select()
      .from(schema.assessments)
      .where(and(...assessmentConditions));

    const gradebook = [];
    const studentUserIds: string[] = [];
    for (const enrollment of enrollments) {
      const [student] = await db
        .select()
        .from(schema.students)
        .where(eq(schema.students.userId, enrollment.studentUserId))
        .limit(1);
      if (!student) continue;

      const grades: Record<
        string,
        {
          score: number | null;
          percentage: string | null;
          letterGrade: string | null;
          isPublished: boolean;
        }
      > = {};
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
          grades[assessment.id] = {
            score: null,
            percentage: null,
            letterGrade: null,
            isPublished: false,
          };
        }
      }
      gradebook.push({
        studentId: student.id,
        studentUserId: enrollment.studentUserId,
        grades,
      });
      studentUserIds.push(enrollment.studentUserId);
    }

    // The page and the agent both read this: give it the class name and the
    // students' names, not just ids.
    const [cls] = await db
      .select({ name: schema.classes.name })
      .from(schema.classes)
      .where(eq(schema.classes.id, args.classId))
      .limit(1);
    const labels = await getUserLabels(studentUserIds);

    return {
      classId: args.classId,
      className: cls?.name ?? null,
      students: gradebook.map((row: any) => ({
        id: row.studentUserId,
        studentId: row.studentId,
        name: labelFor(labels, row.studentUserId) ?? row.studentUserId,
        grades: row.grades,
      })),
      assessments: assessments.map((a) => ({
        id: a.id,
        title: a.title,
        totalPoints: a.totalPoints,
        assessmentType: a.assessmentType,
        format: a.format,
      })),
      gradebook,
    };
  },
});
