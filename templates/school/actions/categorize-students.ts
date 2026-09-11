import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getDb, schema } from "../server/db/index.js";
import { eq, and } from "drizzle-orm";
import { nanoid } from "nanoid";
import { z } from "zod";

export default defineAction({
  description:
    "Analyze submission history for a class and categorize students as foundational, developing, or advanced. This is an agent-assessed action (http: false) — the agent reads submissions, calculates averages, and writes student_categories rows. Returns the full categorization for teacher review before assigning variants.",
  schema: z.object({
    classId: z.string().describe("Class to categorize students for"),
    confirm: z
      .boolean()
      .optional()
      .default(false)
      .describe(
        "Pass true to commit the categorization to DB. Default false = preview only.",
      ),
  }),
  http: false,
  run: async (args) => {
    const { userEmail } = currentAccess();
    const db = getDb();

    // Get all enrolled students
    const enrollments = await db
      .select()
      .from(schema.classEnrollments)
      .where(
        and(
          eq(schema.classEnrollments.classId, args.classId),
          eq(schema.classEnrollments.status, "active"),
        ),
      );

    // Get all assessments for this class
    const assessments = await db
      .select()
      .from(schema.assessments)
      .where(
        and(
          eq(schema.assessments.classId, args.classId),
          eq(schema.assessments.status, "published"),
        ),
      );
    const assessmentIds = assessments.map((a) => a.id);

    // For each student, compute average grade
    const categorizations: Array<{
      studentId: string;
      studentUserId: string;
      average: number | null;
      category: "foundational" | "developing" | "advanced";
      submissionCount: number;
    }> = [];

    for (const enrollment of enrollments) {
      // Find student record
      const [student] = await db
        .select()
        .from(schema.students)
        .where(eq(schema.students.userId, enrollment.studentUserId))
        .limit(1);
      if (!student) continue;

      let totalPercentage = 0;
      let gradedCount = 0;

      for (const assessmentId of assessmentIds) {
        const [submission] = await db
          .select()
          .from(schema.submissions)
          .where(
            and(
              eq(schema.submissions.studentId, student.id),
              eq(schema.submissions.assessmentId, assessmentId),
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
          totalPercentage += parseFloat(grade.percentage);
          gradedCount++;
        }
      }

      const average = gradedCount > 0 ? totalPercentage / gradedCount : null;
      let category: "foundational" | "developing" | "advanced" = "developing";
      if (average !== null) {
        if (average >= 75) category = "advanced";
        else if (average >= 50) category = "developing";
        else category = "foundational";
      }

      categorizations.push({
        studentId: student.id,
        studentUserId: enrollment.studentUserId,
        average: average !== null ? Math.round(average) : null,
        category,
        submissionCount: gradedCount,
      });
    }

    if (args.confirm) {
      // Write categorizations to DB
      for (const cat of categorizations) {
        // Upsert: delete existing category for this student+class, then insert
        await db
          .delete(schema.studentCategories)
          .where(
            and(
              eq(schema.studentCategories.studentId, cat.studentId),
              eq(schema.studentCategories.classId, args.classId),
            ),
          );
        await db.insert(schema.studentCategories).values({
          id: nanoid(),
          studentId: cat.studentId,
          classId: args.classId,
          category: cat.category,
          basis: "agent_assessed",
          assessedBy: userEmail ?? "agent",
          notes: `Average: ${cat.average ?? "N/A"}%, based on ${cat.submissionCount} graded submissions.`,
        });
      }
    }

    const summary = {
      advanced: categorizations.filter((c) => c.category === "advanced").length,
      developing: categorizations.filter((c) => c.category === "developing")
        .length,
      foundational: categorizations.filter((c) => c.category === "foundational")
        .length,
    };

    return {
      categorizations,
      summary,
      committed: args.confirm,
      message: args.confirm
        ? `Categorized ${categorizations.length} students: ${summary.advanced} Advanced, ${summary.developing} Developing, ${summary.foundational} Foundational.`
        : `Preview: ${categorizations.length} students would be categorized. Pass --confirm to commit.`,
    };
  },
});
