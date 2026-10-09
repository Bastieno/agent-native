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

    // A week is open to the class when something has been published for it —
    // a page to read, a card deck, a worksheet.
    //
    // This used to wait for the teacher's own lesson note to be marked ready.
    // That made sense while the class read the note itself; now that the note
    // is the teacher's private plan, it meant a teacher could publish a
    // reading page and their class would still see no weeks at all, because
    // the thing being waited on was one they will never read.
    const allLessons = await db
      .select({
        id: schema.lessonNotes.id,
        title: schema.lessonNotes.title,
        summary: schema.lessonNotes.summary,
        lessonDate: schema.lessonNotes.lessonDate,
      })
      .from(schema.lessonNotes)
      .where(eq(schema.lessonNotes.classId, rawArgs.classId))
      .orderBy(asc(schema.lessonNotes.lessonDate));

    const openWeeks = allLessons.length
      ? await db
          .select({
            lessonNoteId: schema.assessments.lessonNoteId,
            renderAs: schema.assessments.renderAs,
            gradingMode: schema.assessments.gradingMode,
            responseMode: schema.assessments.responseMode,
          })
          .from(schema.assessments)
          .where(
            and(
              inArray(
                schema.assessments.lessonNoteId,
                allLessons.map((l: any) => l.id),
              ),
              eq(schema.assessments.status, "published"),
            ),
          )
      : [];
    const hasMaterial = new Set(
      openWeeks.map((w: any) => w.lessonNoteId).filter(Boolean),
    );
    // What is in each week, by shape rather than by the school's format
    // name — so a week can say "Reading · Cards" without the page having to
    // know what "key terms" means.
    const shapesByWeek = new Map<string, string[]>();
    for (const w of openWeeks as any[]) {
      if (!w.lessonNoteId) continue;
      if (w.gradingMode !== "none" || w.responseMode !== "none") continue;
      const list = shapesByWeek.get(w.lessonNoteId) ?? [];
      list.push(w.renderAs ?? "prose");
      shapesByWeek.set(w.lessonNoteId, list);
    }
    const lessons = allLessons
      .filter((l: any) => hasMaterial.has(l.id))
      .map((l: any) => ({ ...l, shapes: shapesByWeek.get(l.id) ?? [] }));

    const assessments = await db
      .select({
        id: schema.assessments.id,
        title: schema.assessments.title,
        assessmentType: schema.assessments.assessmentType,
        lessonNoteId: schema.assessments.lessonNoteId,
        format: schema.assessments.format,
        gradingMode: schema.assessments.gradingMode,
        responseMode: schema.assessments.responseMode,
        durationMinutes: schema.assessments.durationMinutes,
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
        // Something to read is not something to hand in. Counting the two
        // together told a learner they owed seven pieces of work when they
        // owed three.
        isMaterial: a.gradingMode === "none" && a.responseMode === "none",
        submissionStatus: statusByAssessment[a.id] ?? "not_started",
      })),
      // What is actually owed, for anything that wants to say a number.
      workSet: assessments.filter(
        (a: any) => !(a.gradingMode === "none" && a.responseMode === "none"),
      ).length,
    };
  },
});
