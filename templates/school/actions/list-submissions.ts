import { defineAction } from "@agent-native/core";
import { getDb, schema } from "../server/db/index.js";
import { eq, and, inArray } from "drizzle-orm";
import { getUserLabels, labelFor } from "../server/lib/user-names.js";
import { z } from "zod";

export default defineAction({
  description:
    "List submissions for an assessment, with each learner's mark: points awarded, score out of their own variant's total, percentage, grade, and whether it has been published to them. Teachers see all; use studentId to filter to one learner.",
  schema: z.object({
    assessmentId: z.string().describe("Assessment ID"),
    studentId: z.string().optional().describe("Filter to a specific student"),
    status: z
      .enum([
        "not_started",
        "draft",
        "submitted",
        "resubmission_requested",
        "graded",
      ])
      .optional(),
  }),
  http: { method: "GET" },
  run: async (args) => {
    const db = getDb();
    const conditions = [eq(schema.submissions.assessmentId, args.assessmentId)];
    if (args.studentId)
      conditions.push(eq(schema.submissions.studentId, args.studentId));
    if (args.status)
      conditions.push(eq(schema.submissions.status, args.status));
    const rows = await db
      .select()
      .from(schema.submissions)
      .where(and(...conditions));
    if (rows.length === 0) return rows;

    // submissions.studentId is a student record ID; the name lives on the user.
    const students = await db
      .select({ id: schema.students.id, userId: schema.students.userId })
      .from(schema.students)
      .where(
        inArray(
          schema.students.id,
          rows.map((r: any) => r.studentId),
        ),
      );
    const userIdByRecord: Record<string, string> = {};
    for (const s of students) userIdByRecord[s.id] = s.userId;
    const labels = await getUserLabels(Object.values(userIdByRecord));

    // How each paper stands, so a teacher can see which ones want attention
    // before opening any of them.
    const responses = await db
      .select()
      .from(schema.questionResponses)
      .where(
        inArray(
          schema.questionResponses.submissionId,
          rows.map((r: any) => r.id),
        ),
      );

    // The mark itself, which this list did not carry.
    //
    // A teacher opening a paper's submissions saw who had handed in and how
    // many answers were flagged, but not what anyone scored — so "how did
    // the class do?" meant opening twenty submissions one at a time. The
    // grade is one query away and is what the list is read for.
    const grades = await db
      .select({
        submissionId: schema.grades.submissionId,
        score: schema.grades.score,
        maxScore: schema.grades.maxScore,
        percentage: schema.grades.percentage,
        letterGrade: schema.grades.letterGrade,
        isPublished: schema.grades.isPublished,
      })
      .from(schema.grades)
      .where(
        inArray(
          schema.grades.submissionId,
          rows.map((r: any) => r.id),
        ),
      );
    const gradeBySubmission = new Map<string, any>();
    for (const g of grades as any[]) gradeBySubmission.set(g.submissionId, g);

    return rows.map((r: any) => {
      const mine = responses.filter((q: any) => q.submissionId === r.id);
      const grade = gradeBySubmission.get(r.id) ?? null;
      // Points earned so far, even before a grade is compiled: a teacher
      // part-way through marking wants to see the marking, not wait for it.
      const awarded = mine.reduce(
        (sum: number, q: any) => sum + (q.awardedPoints ?? 0),
        0,
      );
      return {
        ...r,
        studentName: labelFor(labels, userIdByRecord[r.studentId]),
        questionCount: mine.length,
        flaggedCount: mine.filter((q: any) => q.needsReview).length,
        unmarkedCount: mine.filter(
          (q: any) =>
            (q.isCorrect === null || q.isCorrect === undefined) && !q.markedAt,
        ).length,
        pointsAwarded: awarded,
        score: grade?.score ?? null,
        // What they were marked out of is their own variant's total, so it
        // comes from the grade rather than from the assessment.
        maxScore: grade?.maxScore ?? null,
        percentage:
          grade?.percentage === null || grade?.percentage === undefined
            ? null
            : Number(grade.percentage),
        letterGrade: grade?.letterGrade ?? null,
        // Whether the learner has been told. A mark a teacher can see and a
        // mark a learner has had are different things.
        gradePublished: grade ? !!grade.isPublished : false,
      };
    });
  },
});
