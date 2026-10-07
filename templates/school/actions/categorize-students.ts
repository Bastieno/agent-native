import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getOrgSetting } from "@agent-native/core/settings";
import { getDb, schema } from "../server/db/index.js";
import { eq, and, inArray } from "drizzle-orm";
import { nanoid } from "nanoid";
import { z } from "zod";
import { missedWorkPolicy, summarise } from "../shared/missed-work.js";
import {
  categoryFor,
  resolveCategoryThresholds,
} from "../shared/student-levels.js";

export default defineAction({
  description:
    "Analyze submission history for a class and categorize students as foundational, developing, or advanced, using the school's own pass mark and grading scale to place the boundaries. This is an agent-assessed action (http: false). Returns the full categorization, and the basis for the thresholds, for teacher review before assigning variants.",
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
    const { userEmail, orgId } = currentAccess();
    const db = getDb();

    // Where the boundaries fall is the school's decision, not ours.
    const config = orgId
      ? ((await getOrgSetting(orgId, "school-config")) as Record<
          string,
          any
        > | null)
      : null;
    const thresholds = resolveCategoryThresholds(config ?? { passMark: 50 });

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
      assessmentsSet: number;
      notHandedIn: number;
      category: "foundational" | "developing" | "advanced" | null;
      submissionCount: number;
    }> = [];

    // Read the class's grades in three queries rather than two per student per
    // assessment: a class of 20 with 10 activities was issuing 400+ round
    // trips to place 20 students in three buckets.
    const userIds = enrollments.map((e: any) => e.studentUserId);
    const students = userIds.length
      ? await db
          .select()
          .from(schema.students)
          .where(inArray(schema.students.userId, userIds))
      : [];
    const studentByUserId = new Map<string, any>(
      students.map((s: any) => [s.userId, s]),
    );
    const studentIds = students.map((s: any) => s.id);

    const submissions =
      studentIds.length && assessmentIds.length
        ? await db
            .select()
            .from(schema.submissions)
            .where(
              and(
                inArray(schema.submissions.studentId, studentIds),
                inArray(schema.submissions.assessmentId, assessmentIds),
              ),
            )
        : [];

    const submissionIds = submissions.map((s: any) => s.id);
    const grades = submissionIds.length
      ? await db
          .select()
          .from(schema.grades)
          .where(inArray(schema.grades.submissionId, submissionIds))
      : [];
    const gradeBySubmission = new Map<string, any>(
      grades.map((g: any) => [g.submissionId, g]),
    );

    const policy = missedWorkPolicy(config);
    for (const enrollment of enrollments) {
      const student = studentByUserId.get(enrollment.studentUserId);
      if (!student) continue;

      const scores: number[] = [];
      for (const submission of submissions) {
        if (submission.studentId !== student.id) continue;
        const grade = gradeBySubmission.get(submission.id);
        if (grade?.percentage) scores.push(parseFloat(grade.percentage));
      }

      // Counted the school's way, against everything that was set rather
      // than only what came back — otherwise a learner who sat two papers of
      // six is grouped on two, and lands above classmates who sat them all.
      const summary = summarise(scores, assessmentIds.length, policy);
      const gradedCount = summary.sat;
      const average = summary.percentage;
      // Nobody with no marked work is "developing" — that is a guess dressed
      // up as an assessment. Leave them unplaced and say so.
      const category =
        average !== null ? categoryFor(average, thresholds) : null;

      categorizations.push({
        studentId: student.id,
        studentUserId: enrollment.studentUserId,
        average: average !== null ? Math.round(average) : null,
        category,
        submissionCount: gradedCount,
        assessmentsSet: summary.set,
        notHandedIn: Math.max(0, summary.set - summary.sat),
      });
    }

    if (args.confirm) {
      // Write categorizations to DB
      for (const cat of categorizations) {
        // A student with no marked work gets no row. An absent category is
        // honest; a guessed one follows them into variant assignment.
        if (!cat.category) continue;
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
          notes: `Average: ${cat.average}%, based on ${cat.submissionCount} graded submission(s). Advanced from ${thresholds.advanced}%, developing from ${thresholds.developing}%, using ${thresholds.basis}.`,
        });
      }
    }

    const summary = {
      advanced: categorizations.filter((c) => c.category === "advanced").length,
      developing: categorizations.filter((c) => c.category === "developing")
        .length,
      foundational: categorizations.filter((c) => c.category === "foundational")
        .length,
      unplaced: categorizations.filter((c) => c.category === null).length,
    };

    const placed = categorizations.length - summary.unplaced;
    const unplacedNote = summary.unplaced
      ? ` ${summary.unplaced} student(s) have no marked work yet and were left unplaced.`
      : "";

    return {
      categorizations,
      summary,
      thresholds,
      committed: args.confirm,
      // Say where the lines were drawn and why. A teacher disagreeing with the
      // result needs to know whether to argue with the marking or with the
      // school's grading scale.
      message: args.confirm
        ? `Categorized ${placed} student(s): ${summary.advanced} Advanced, ${summary.developing} Developing, ${summary.foundational} Foundational.${unplacedNote} Advanced from ${thresholds.advanced}%, developing from ${thresholds.developing}% — based on ${thresholds.basis}.`
        : `Preview: ${placed} student(s) would be categorized — ${summary.advanced} Advanced, ${summary.developing} Developing, ${summary.foundational} Foundational.${unplacedNote} Advanced from ${thresholds.advanced}%, developing from ${thresholds.developing}% — based on ${thresholds.basis}. Pass --confirm to commit.`,
    };
  },
});
