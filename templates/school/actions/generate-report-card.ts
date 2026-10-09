import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getDb, schema } from "../server/db/index.js";
import { eq, and, inArray } from "drizzle-orm";
import { sql } from "drizzle-orm";
import { getOrgSetting } from "@agent-native/core/settings";
import { z } from "zod";
import { getUserLabels, realNameOrNull } from "../server/lib/user-names.js";

export default defineAction({
  description:
    "Generate a report card summary for a student in a class for a given term. Returns a structured report with grades and commentary.",
  schema: z.object({
    studentId: z.string().describe("Student user ID"),
    classId: z.string(),
    termId: z.string(),
  }),
  http: { method: "POST" },
  run: async (args) => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const db = getDb();

    const schoolConfig = (await getOrgSetting(orgId, "school-config")) as any;

    // Who this is.
    //
    // A learner has two ids: the student record and the account. This looked
    // the student record id up in the user table, which matches nothing, so
    // every report card came out with no name and no email on it — the one
    // document that goes home to a parent. The record gives the account id;
    // the account gives the name.
    const [record] = await db
      .select({ id: schema.students.id, userId: schema.students.userId })
      .from(schema.students)
      .where(
        and(
          eq(schema.students.id, args.studentId),
          eq(schema.students.orgId, orgId),
        ),
      )
      .limit(1);
    // Tolerant of being handed the account id instead, since both are called
    // "student id" in conversation.
    const [byUser] = record
      ? []
      : await db
          .select({ id: schema.students.id, userId: schema.students.userId })
          .from(schema.students)
          .where(
            and(
              eq(schema.students.userId, args.studentId),
              eq(schema.students.orgId, orgId),
            ),
          )
          .limit(1);
    const studentUserId = (record ?? byUser)?.userId ?? null;
    const labels = studentUserId ? await getUserLabels([studentUserId]) : {};
    const userRow = studentUserId
      ? {
          name: realNameOrNull(
            labels[studentUserId]?.name,
            labels[studentUserId]?.email,
          ),
          email: labels[studentUserId]?.email ?? null,
        }
      : undefined;

    // Class + term info
    const [cls] = await db
      .select({
        id: schema.classes.id,
        name: schema.classes.name,
        subjectName: schema.subjects.name,
      })
      .from(schema.classes)
      .leftJoin(
        schema.subjects,
        eq(schema.classes.subjectId, schema.subjects.id),
      )
      .where(eq(schema.classes.id, args.classId))
      .limit(1);

    const [term] = await db
      .select()
      .from(schema.terms)
      .where(eq(schema.terms.id, args.termId))
      .limit(1);

    // Grades for this student in this class
    const assessments = await db
      .select({
        id: schema.assessments.id,
        title: schema.assessments.title,
        totalPoints: schema.assessments.totalPoints,
      })
      .from(schema.assessments)
      .where(
        and(
          eq(schema.assessments.classId, args.classId),
          eq(schema.assessments.status, "published"),
        ),
      );

    const assessmentIds = assessments.map((a: any) => a.id);
    const grades =
      assessmentIds.length > 0
        ? await db
            .select()
            .from(schema.grades)
            .where(
              and(
                eq(schema.grades.studentId, args.studentId),
                inArray(schema.grades.assessmentId, assessmentIds),
                eq(schema.grades.isPublished, 1 as any),
              ),
            )
        : [];

    const gradeMap: Record<string, any> = {};
    for (const g of grades) gradeMap[g.assessmentId] = g;

    const scores = grades
      .map((g: any) => parseFloat(g.percentage ?? "0"))
      .filter(Boolean);
    const overallAverage = scores.length
      ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
      : null;

    const gradebookEntry = await db
      .select()
      .from(schema.gradebookEntries)
      .where(
        and(
          eq(schema.gradebookEntries.studentId, args.studentId),
          eq(schema.gradebookEntries.classId, args.classId),
          eq(schema.gradebookEntries.termId, args.termId),
        ),
      )
      .limit(1);

    return {
      student: {
        id: args.studentId,
        name: userRow?.name ?? null,
        email: userRow?.email ?? null,
      },
      class: cls ?? { id: args.classId, name: null, subjectName: null },
      term: term ?? { id: args.termId, name: null },
      assessments: assessments.map((a: any) => ({
        ...a,
        grade: gradeMap[a.id] ?? null,
      })),
      overallAverage,
      gradebookEntry: gradebookEntry[0] ?? null,
      generatedAt: new Date().toISOString(),
    };
  },
});
