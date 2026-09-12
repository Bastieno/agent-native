import { defineAction } from "@agent-native/core";
import { getDb, schema } from "../server/db/index.js";
import { eq, and, inArray } from "drizzle-orm";
import {
  resolveStudentId,
  resolveUserId,
} from "../server/lib/student-session.js";
import { activityWindow } from "../server/lib/activity-window.js";
import { z } from "zod";

/**
 * Everything a student has been set, across the classes they are enrolled in.
 *
 * Enrolment is what decides whether work reaches a learner; an explicit
 * `student_assessments` row only decides *which variant* they get. It used to
 * be the other way round — the list was built purely from assigned rows — so a
 * teacher could create and publish a worksheet to a class and every learner
 * would still be told "All caught up". The single-activity view falls back to
 * the first variant, so a direct link worked fine, which is exactly what kept
 * the gap hidden.
 */
export default defineAction({
  description:
    "Student-facing: everything published to the classes this student is enrolled in. Shows only their own variant — never the difficulty label, never that other variants exist.",
  schema: z.object({
    studentId: z
      .string()
      .optional()
      .describe(
        "Student record ID. Omit when the signed-in user is the student — it is resolved from the session.",
      ),
    classId: z.string().optional().describe("Filter to a specific class"),
  }),
  http: { method: "GET" },
  run: async (rawArgs) => {
    const studentId = await resolveStudentId(rawArgs.studentId);
    if (!studentId) {
      // Staff must name a student; a student is resolved from their session.
      throw new Error("studentId is required — say which student you mean.");
    }
    const db = getDb();

    // Enrolment is keyed by auth user id, while submissions and assignments are
    // keyed by the student record id. They are not the same value.
    const [student] = await db
      .select({ userId: schema.students.userId })
      .from(schema.students)
      .where(eq(schema.students.id, studentId))
      .limit(1);

    const enrollments = student?.userId
      ? await db
          .select({ classId: schema.classEnrollments.classId })
          .from(schema.classEnrollments)
          .where(
            and(
              eq(schema.classEnrollments.studentUserId, student.userId),
              eq(schema.classEnrollments.status, "active"),
            ),
          )
      : [];

    let classIds = enrollments.map((e: { classId: string }) => e.classId);
    if (rawArgs.classId) {
      classIds = classIds.filter((id: string) => id === rawArgs.classId);
    }
    if (classIds.length === 0) return [];

    const activities = await db
      .select()
      .from(schema.assessments)
      .where(
        and(
          inArray(schema.assessments.classId, classIds),
          eq(schema.assessments.status, "published"),
        ),
      );
    if (activities.length === 0) return [];

    const activityIds = activities.map((a: { id: string }) => a.id);

    // Which variant this learner was given, where anyone said so.
    const assigned = await db
      .select()
      .from(schema.studentAssessments)
      .where(
        and(
          eq(schema.studentAssessments.studentId, studentId),
          inArray(schema.studentAssessments.assessmentId, activityIds),
        ),
      );
    const assignedVariant = new Map<string, string | null>(
      assigned.map((a: any) => [a.assessmentId, a.variantId ?? null]),
    );

    const variants = await db
      .select()
      .from(schema.assessmentVariants)
      .where(inArray(schema.assessmentVariants.assessmentId, activityIds));

    const submissions = await db
      .select()
      .from(schema.submissions)
      .where(
        and(
          eq(schema.submissions.studentId, studentId),
          inArray(schema.submissions.assessmentId, activityIds),
        ),
      );
    const submissionFor = new Map<string, any>(
      submissions.map((s: any) => [s.assessmentId, s]),
    );

    return activities.map((activity: any) => {
      const variantId = assignedVariant.get(activity.id);
      const mine =
        variants.find((v: any) => v.id === variantId) ??
        variants.find((v: any) => v.assessmentId === activity.id) ??
        null;
      const submission = submissionFor.get(activity.id) ?? null;

      return {
        assessmentId: activity.id,
        classId: activity.classId,
        title: activity.title,
        assessmentType: activity.assessmentType,
        format: activity.format,
        renderAs: activity.renderAs,
        responseMode: activity.responseMode,
        dueDate: activity.dueDate,
        durationMinutes: activity.durationMinutes,
        totalPoints: mine?.totalPoints ?? activity.totalPoints,
        // difficulty is deliberately omitted.
        instructions: mine?.instructions ?? null,
        submissionStatus: submission?.status ?? "not_started",
        submissionId: submission?.id ?? null,
        window: activityWindow(activity, submission?.startedAt),
      };
    });
  },
});
