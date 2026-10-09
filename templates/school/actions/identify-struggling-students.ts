import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getOrgSetting } from "@agent-native/core/settings";
import { getDb, schema } from "../server/db/index.js";
import { eq, and } from "drizzle-orm";
import { z } from "zod";
import { missedWorkPolicy, summarise } from "../shared/missed-work.js";

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

    const policy = missedWorkPolicy(config);
    const struggling = [];
    for (const enrollment of enrollments) {
      const [student] = await db
        .select()
        .from(schema.students)
        .where(eq(schema.students.userId, enrollment.studentUserId))
        .limit(1);
      if (!student) continue;

      let count = 0;
      const scores: number[] = [];
      const weakAreas: string[] = [];
      const notHandedIn: string[] = [];

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
        // A piece nobody handed in is not an absence of information: it is
        // the information. Skipping it here is why a learner who had stopped
        // working could not be flagged as struggling — they had no average,
        // and the check below only looked at learners who had one.
        if (
          !submission ||
          !["submitted", "graded"].includes(submission.status)
        ) {
          notHandedIn.push(assessment.title);
          continue;
        }
        const [grade] = await db
          .select()
          .from(schema.grades)
          .where(eq(schema.grades.submissionId, submission.id))
          .limit(1);
        if (grade?.percentage) {
          const pct = parseFloat(grade.percentage);
          scores.push(pct);
          count++;
          if (pct < threshold) weakAreas.push(assessment.title);
        }
      }

      const summary = summarise(scores, assessments.length, policy);
      const average = summary.percentage;
      // Three different kinds of trouble, named rather than averaged into
      // silence: nothing handed in at all, a lot missing, and low marks.
      const missed = Math.max(0, summary.set - summary.sat);
      const reasons: string[] = [];
      if (summary.nothingHandedIn) {
        reasons.push(`has handed in none of the ${summary.set} set`);
      } else if (missed > 0 && missed >= summary.set / 2) {
        reasons.push(`has handed in only ${summary.sat} of ${summary.set}`);
      }
      if (average !== null && average < threshold) {
        reasons.push(`averaging ${average.toFixed(0)}%`);
      }

      if (reasons.length > 0) {
        struggling.push({
          studentId: student.id,
          studentUserId: enrollment.studentUserId,
          average: average === null ? null : average.toFixed(1),
          weakAreas,
          gradedAssessments: count,
          assessmentsSet: summary.set,
          notHandedIn: notHandedIn.length,
          reason: reasons.join(", "),
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
