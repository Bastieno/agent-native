import { defineAction } from "@agent-native/core";
import { getDb, schema } from "../server/db/index.js";
import { eq, and, inArray } from "drizzle-orm";
import { getUserLabels, labelFor } from "../server/lib/user-names.js";
import { z } from "zod";

export default defineAction({
  description:
    "List submissions for an assessment. Teachers see all; use studentId to filter to a specific student.",
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

    return rows.map((r: any) => {
      const mine = responses.filter((q: any) => q.submissionId === r.id);
      return {
        ...r,
        studentName: labelFor(labels, userIdByRecord[r.studentId]),
        questionCount: mine.length,
        flaggedCount: mine.filter((q: any) => q.needsReview).length,
        unmarkedCount: mine.filter(
          (q: any) =>
            (q.isCorrect === null || q.isCorrect === undefined) && !q.markedAt,
        ).length,
      };
    });
  },
});
