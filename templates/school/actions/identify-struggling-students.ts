import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getOrgSetting } from "@agent-native/core/settings";
import { getDb, schema } from "../server/db/index.js";
import { eq, and } from "drizzle-orm";
import { z } from "zod";

export default defineAction({
  description:
    "Identify students performing below a threshold in a class. Uses the school's pass mark as default threshold.",
  schema: z.object({
    classId: z.string().describe("Class ID"),
    threshold: z
      .number()
      .optional()
      .describe(
        "Percentage below which a student is considered struggling. Defaults to school pass mark.",
      ),
  }),
  http: false,
  run: async (args) => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const db = getDb();
    const config = (await getOrgSetting(orgId, "school-config")) as any;
    const threshold = args.threshold ?? config?.passMark ?? 50;

    const enrollments = await db
      .select()
      .from(schema.classEnrollments)
      .where(
        and(
          eq(schema.classEnrollments.classId, args.classId),
          eq(schema.classEnrollments.status, "active"),
        ),
      );
    const assessments = await db
      .select()
      .from(schema.assessments)
      .where(
        and(
          eq(schema.assessments.classId, args.classId),
          eq(schema.assessments.status, "published"),
        ),
      );

    const struggling = [];
    for (const enrollment of enrollments) {
      const [student] = await db
        .select()
        .from(schema.students)
        .where(eq(schema.students.userId, enrollment.studentUserId))
        .limit(1);
      if (!student) continue;

      let total = 0;
      let count = 0;
      const weakAreas: string[] = [];

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
        if (!submission) continue;
        const [grade] = await db
          .select()
          .from(schema.grades)
          .where(eq(schema.grades.submissionId, submission.id))
          .limit(1);
        if (grade?.percentage) {
          const pct = parseFloat(grade.percentage);
          total += pct;
          count++;
          if (pct < threshold) weakAreas.push(assessment.title);
        }
      }
      const average = count > 0 ? total / count : null;
      if (average !== null && average < threshold) {
        struggling.push({
          studentId: student.id,
          studentUserId: enrollment.studentUserId,
          average: average.toFixed(1),
          weakAreas,
          gradedAssessments: count,
        });
      }
    }

    return {
      classId: args.classId,
      threshold,
      strugglingCount: struggling.length,
      students: struggling,
    };
  },
});
