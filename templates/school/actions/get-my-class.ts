import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getDb, schema } from "../server/db/index.js";
import { eq, and, desc, asc, inArray, sql } from "drizzle-orm";
import { resolveStudentId } from "../server/lib/student-session.js";
import { z } from "zod";

/**
 * A class as a learner sees it: what it is, who teaches it, the material that
 * has been shared, and their own standing on each assessment.
 *
 * Deliberately narrower than the staff view — no roster, no other students'
 * work, no unfinished lesson drafts.
 */
export default defineAction({
  description:
    "A student's view of one class: teacher, finalized lesson notes, published assessments, and the student's own submission status for each.",
  schema: z.object({
    classId: z.string().describe("Class ID"),
    studentId: z
      .string()
      .optional()
      .describe(
        "Student record ID. Omit when the signed-in user is the student.",
      ),
  }),
  http: { method: "GET" },
  run: async (rawArgs) => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const db = getDb();
    const studentId = await resolveStudentId(rawArgs.studentId);

    const [cls] = await db
      .select({
        id: schema.classes.id,
        name: schema.classes.name,
        subjectName: schema.subjects.name,
        primaryTeacherUserId: schema.classes.primaryTeacherUserId,
      })
      .from(schema.classes)
      .leftJoin(
        schema.subjects,
        eq(schema.classes.subjectId, schema.subjects.id),
      )
      .where(
        and(
          eq(schema.classes.id, rawArgs.classId),
          eq(schema.classes.orgId, orgId),
        ),
      )
      .limit(1);
    if (!cls) throw new Error("Class not found.");

    let teacherName: string | null = null;
    if (cls.primaryTeacherUserId) {
      const t = (await db.get(
        sql`SELECT name, email FROM "user" WHERE id = ${cls.primaryTeacherUserId} LIMIT 1`,
      )) as { name: string | null; email: string | null } | undefined;
      teacherName = t?.name ?? t?.email ?? null;
    }

    const lessons = await db
      .select({
        id: schema.lessonNotes.id,
        title: schema.lessonNotes.title,
        summary: schema.lessonNotes.summary,
        lessonDate: schema.lessonNotes.lessonDate,
      })
      .from(schema.lessonNotes)
      .where(
        and(
          eq(schema.lessonNotes.classId, rawArgs.classId),
          eq(schema.lessonNotes.status, "finalized"),
        ),
      )
      .orderBy(desc(schema.lessonNotes.createdAt))
      .limit(20);

    const assessments = await db
      .select({
        id: schema.assessments.id,
        title: schema.assessments.title,
        assessmentType: schema.assessments.assessmentType,
        dueDate: schema.assessments.dueDate,
        status: schema.assessments.status,
      })
      .from(schema.assessments)
      .where(
        and(
          eq(schema.assessments.classId, rawArgs.classId),
          eq(schema.assessments.status, "published"),
        ),
      )
      .orderBy(asc(schema.assessments.dueDate));

    // The student's own status per assessment — never anyone else's.
    const assessmentIds = assessments.map((a: any) => a.id);
    const mySubs =
      studentId && assessmentIds.length > 0
        ? await db
            .select({
              assessmentId: schema.submissions.assessmentId,
              status: schema.submissions.status,
            })
            .from(schema.submissions)
            .where(
              and(
                eq(schema.submissions.studentId, studentId),
                inArray(schema.submissions.assessmentId, assessmentIds),
              ),
            )
        : [];
    const statusByAssessment: Record<string, string> = {};
    for (const s of mySubs) statusByAssessment[s.assessmentId] = s.status;

    return {
      cls: { ...cls, teacherName },
      lessons,
      assessments: assessments.map((a: any) => ({
        ...a,
        submissionStatus: statusByAssessment[a.id] ?? "not_started",
      })),
    };
  },
});
