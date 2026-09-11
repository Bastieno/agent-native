import { defineAction } from "@agent-native/core";
import { getDb, schema } from "../server/db/index.js";
import { eq, and, inArray } from "drizzle-orm";
import {
  resolveStudentId,
  resolveUserId,
} from "../server/lib/student-session.js";
import { currentAccess } from "@agent-native/core/sharing";
import {
  accessibleClassIds,
  actorForEmail,
} from "../server/lib/class-access.js";
import { getUserLabels, labelFor } from "../server/lib/user-names.js";
import { studentRecordIdForUser } from "../server/lib/class-access.js";
import { z } from "zod";

export default defineAction({
  description:
    "Student-facing: Get all classes the student is currently enrolled in, including subject and grade level info.",
  schema: z.object({
    studentUserId: z
      .string()
      .optional()
      .describe(
        "Student user ID. Omit when the signed-in user is the student — it is resolved from the session.",
      ),
  }),
  http: { method: "GET" },
  run: async (rawArgs) => {
    const args = {
      ...rawArgs,
      studentUserId: await resolveUserId(rawArgs.studentUserId),
    };
    const db = getDb();

    // Staff calling without a student mean "the classes I teach"; that is what
    // the teacher dashboard asks for.
    if (!args.studentUserId) {
      const { userEmail } = currentAccess();
      const actor = userEmail ? await actorForEmail(userEmail) : null;
      if (!actor) {
        throw new Error(
          "studentUserId is required — say which student you mean.",
        );
      }
      const taught = await accessibleClassIds(actor);
      if (taught.length === 0) return [];

      const rows = await db
        .select({
          cls: schema.classes,
          subjectName: schema.subjects.name,
          gradeLevelName: schema.gradeLevels.name,
        })
        .from(schema.classes)
        .leftJoin(
          schema.subjects,
          eq(schema.classes.subjectId, schema.subjects.id),
        )
        .leftJoin(
          schema.gradeLevels,
          eq(schema.classes.gradeLevelId, schema.gradeLevels.id),
        )
        .where(inArray(schema.classes.id, taught));

      const enrolled = await db
        .select({ classId: schema.classEnrollments.classId })
        .from(schema.classEnrollments)
        .where(
          and(
            inArray(schema.classEnrollments.classId, taught),
            eq(schema.classEnrollments.status, "active"),
          ),
        );
      const countByClass: Record<string, number> = {};
      for (const e of enrolled)
        countByClass[e.classId] = (countByClass[e.classId] ?? 0) + 1;

      return rows.map((r: any) => ({
        ...r.cls,
        subjectName: r.subjectName ?? null,
        gradeLevelName: r.gradeLevelName ?? null,
        enrollmentCount: countByClass[r.cls.id] ?? 0,
        studentCount: countByClass[r.cls.id] ?? 0,
      }));
    }
    const studentRecordId = await studentRecordIdForUser(args.studentUserId);
    const enrollments = await db
      .select()
      .from(schema.classEnrollments)
      .where(
        and(
          eq(schema.classEnrollments.studentUserId, args.studentUserId),
          eq(schema.classEnrollments.status, "active"),
        ),
      );

    if (enrollments.length === 0) return [];
    const classIds = enrollments.map((e: any) => e.classId);

    // Names, not ids: the class list is read by a student, and by the tutor
    // explaining it to them.
    const rows = await db
      .select({
        cls: schema.classes,
        subjectName: schema.subjects.name,
        gradeLevelName: schema.gradeLevels.name,
      })
      .from(schema.classes)
      .leftJoin(
        schema.subjects,
        eq(schema.classes.subjectId, schema.subjects.id),
      )
      .leftJoin(
        schema.gradeLevels,
        eq(schema.classes.gradeLevelId, schema.gradeLevels.id),
      )
      .where(inArray(schema.classes.id, classIds));

    const labels = await getUserLabels(
      rows.map((r: any) => r.cls.primaryTeacherUserId),
    );

    // Work still to do in each class, so the list can show what needs attention.
    const assessments = await db
      .select({
        id: schema.assessments.id,
        classId: schema.assessments.classId,
      })
      .from(schema.assessments)
      .where(
        and(
          inArray(schema.assessments.classId, classIds),
          eq(schema.assessments.status, "published"),
        ),
      );
    const mySubs =
      assessments.length > 0
        ? await db
            .select({
              assessmentId: schema.submissions.assessmentId,
              status: schema.submissions.status,
            })
            .from(schema.submissions)
            .where(
              and(
                eq(schema.submissions.studentId, studentRecordId ?? "__none__"),
                inArray(
                  schema.submissions.assessmentId,
                  assessments.map((a: any) => a.id),
                ),
              ),
            )
        : [];
    const doneIds = new Set(
      mySubs
        .filter((s: any) => ["submitted", "graded"].includes(s.status))
        .map((s: any) => s.assessmentId),
    );

    return rows.map((r: any) => ({
      ...r.cls,
      subjectName: r.subjectName ?? null,
      gradeLevelName: r.gradeLevelName ?? null,
      teacherName: labelFor(labels, r.cls.primaryTeacherUserId),
      pendingAssessments: assessments.filter(
        (a: any) => a.classId === r.cls.id && !doneIds.has(a.id),
      ).length,
    }));
  },
});
