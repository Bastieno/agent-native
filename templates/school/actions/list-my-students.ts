import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getOrgSetting } from "@agent-native/core/settings";
import { getDb, schema } from "../server/db/index.js";
import { eq, and, desc, asc, inArray, sql, count } from "drizzle-orm";
import {
  actorForEmail,
  studentRecordIdForUser,
} from "../server/lib/class-access.js";
import { getUserLabels, labelFor } from "../server/lib/user-names.js";
import { z } from "zod";

export default defineAction({
  description:
    "Teacher-facing: the students across the classes you teach, with their class, category, average and completion.",
  schema: z.object({}),
  http: { method: "GET" },
  run: async () => {
    // Ported from the HTTP handler this action replaces; the actor stands in
    // for the request session so the logic is unchanged.
    const { userEmail } = currentAccess();
    const actor = userEmail ? await actorForEmail(userEmail) : null;
    if (!actor) throw new Error("No school context.");
    const session = { userId: actor.userId };
    const profile = { schoolId: actor.schoolId, schoolRole: actor.schoolRole };
    const db = getDb();

    // Get classes this teacher is in
    const teacherClasses = await db
      .select({ classId: schema.classTeachers.classId })
      .from(schema.classTeachers)
      .where(eq(schema.classTeachers.teacherUserId, session.userId));

    const primaryClasses = await db
      .select({ id: schema.classes.id })
      .from(schema.classes)
      .where(
        and(
          eq(schema.classes.primaryTeacherUserId, session.userId),
          eq(schema.classes.orgId, profile.schoolId),
        ),
      );

    const classIds = [
      ...new Set([
        ...teacherClasses.map((r: any) => r.classId),
        ...primaryClasses.map((r: any) => r.id),
      ]),
    ];
    if (classIds.length === 0) return [];

    const enrollments = await db
      .select({
        studentUserId: schema.classEnrollments.studentUserId,
        classId: schema.classEnrollments.classId,
      })
      .from(schema.classEnrollments)
      .where(
        and(
          inArray(schema.classEnrollments.classId, classIds),
          eq(schema.classEnrollments.status, "active"),
        ),
      );

    const studentUserIds = [
      ...new Set(enrollments.map((e: any) => e.studentUserId)),
    ];
    if (studentUserIds.length === 0) return [];

    const categories = await db
      .select()
      .from(schema.studentCategories)
      .where(inArray(schema.studentCategories.classId, classIds))
      .orderBy(desc(schema.studentCategories.assessedAt));

    const latestCategory: Record<string, string> = {};
    for (const cat of categories) {
      const key = `${cat.studentId}-${cat.classId}`;
      if (!latestCategory[key]) latestCategory[key] = cat.category;
    }

    // Fetch user names/emails in one query
    const userRows = (await db.all(
      sql`SELECT id, email, name FROM "user" WHERE id IN (${sql.join(
        studentUserIds.map((id: string) => sql`${id}`),
        sql`, `,
      )})`,
    )) as Array<{ id: string; email: string; name: string }>;
    const userMap: Record<string, { email: string; name: string }> = {};
    for (const u of userRows) userMap[u.id] = u;

    // Categories, submissions, and grades are keyed by student record ID.
    const recordIdByUser: Record<string, string> = {};
    for (const uid of studentUserIds as string[]) {
      const rid = await studentRecordIdForUser(uid);
      if (rid) recordIdByUser[uid] = rid;
    }
    const recordIds: string[] = Object.values(recordIdByUser);

    const categoryByRecord: Record<string, string> = {};
    for (const cat of categories) {
      if (!categoryByRecord[cat.studentId])
        categoryByRecord[cat.studentId] = cat.category;
    }

    const classRows = await db
      .select({ id: schema.classes.id, name: schema.classes.name })
      .from(schema.classes)
      .where(inArray(schema.classes.id, classIds));
    const classNameById: Record<string, string> = {};
    for (const c of classRows) classNameById[c.id] = c.name;

    const publishedAssessments = await db
      .select({
        id: schema.assessments.id,
        classId: schema.assessments.classId,
      })
      .from(schema.assessments)
      .where(
        and(
          inArray(schema.assessments.classId, classIds),
          inArray(schema.assessments.status, ["published", "closed"]),
        ),
      );
    const assessmentIds = publishedAssessments.map((a: any) => a.id);

    const subs =
      assessmentIds.length > 0 && recordIds.length > 0
        ? await db
            .select({
              studentId: schema.submissions.studentId,
              assessmentId: schema.submissions.assessmentId,
            })
            .from(schema.submissions)
            .where(
              and(
                inArray(schema.submissions.assessmentId, assessmentIds),
                inArray(schema.submissions.studentId, recordIds),
                inArray(schema.submissions.status, ["submitted", "graded"]),
              ),
            )
        : [];
    const gradeRows =
      assessmentIds.length > 0 && recordIds.length > 0
        ? await db
            .select({
              studentId: schema.grades.studentId,
              percentage: schema.grades.percentage,
            })
            .from(schema.grades)
            .where(
              and(
                inArray(schema.grades.assessmentId, assessmentIds),
                inArray(schema.grades.studentId, recordIds),
              ),
            )
        : [];

    return studentUserIds.map((userId: string) => {
      const recordId = recordIdByUser[userId];
      const studentClassIds = enrollments
        .filter((e: any) => e.studentUserId === userId)
        .map((e: any) => e.classId);
      const expected = publishedAssessments.filter((a: any) =>
        studentClassIds.includes(a.classId),
      ).length;
      const done = new Set(
        subs
          .filter((s: any) => s.studentId === recordId)
          .map((s: any) => s.assessmentId),
      ).size;
      const pcts = gradeRows
        .filter((g: any) => g.studentId === recordId && g.percentage != null)
        .map((g: any) => parseFloat(g.percentage))
        .filter((p: number) => !isNaN(p));
      return {
        id: userId,
        studentId: recordId ?? null,
        name: userMap[userId]?.name ?? null,
        email: userMap[userId]?.email ?? null,
        category: recordId ? (categoryByRecord[recordId] ?? null) : null,
        averageScore:
          pcts.length > 0
            ? (
                pcts.reduce((a: number, b: number) => a + b, 0) / pcts.length
              ).toFixed(1)
            : null,
        completionRate:
          expected > 0 ? Math.round((done / expected) * 100) : null,
        className:
          studentClassIds
            .map((id: string) => classNameById[id])
            .filter(Boolean)
            .join(", ") || null,
      };
    });
  },
});
