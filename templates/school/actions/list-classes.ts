import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getDb, schema } from "../server/db/index.js";
import { eq, and, inArray } from "drizzle-orm";
import { getUserLabels, labelFor } from "../server/lib/user-names.js";
import { z } from "zod";
import { isUnassignedTeacher } from "../shared/class-teacher.js";

export default defineAction({
  description:
    "List classes for the school or for a specific teacher. Active classes by default; pass status for archived ones or 'all' for both.",
  schema: z.object({
    teacherUserId: z
      .string()
      .optional()
      .describe("Filter to classes where this user is primary teacher"),
    subjectId: z.string().optional(),
    gradeLevelId: z.string().optional(),
    academicYearId: z.string().optional(),
    status: z
      .enum(["active", "archived", "all"])
      .optional()
      .default("active")
      .describe("Which classes to list. Defaults to the ones running."),
  }),
  http: { method: "GET" },
  run: async (args) => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const db = getDb();
    const conditions = [eq(schema.classes.orgId, orgId)];
    if (args.teacherUserId)
      conditions.push(
        eq(schema.classes.primaryTeacherUserId, args.teacherUserId),
      );
    if (args.subjectId)
      conditions.push(eq(schema.classes.subjectId, args.subjectId));
    if (args.gradeLevelId)
      conditions.push(eq(schema.classes.gradeLevelId, args.gradeLevelId));
    if (args.academicYearId)
      conditions.push(eq(schema.classes.academicYearId, args.academicYearId));
    if (args.status && args.status !== "all") {
      conditions.push(eq(schema.classes.status, args.status));
    }

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
      .where(and(...conditions));

    // Pair IDs with names so the answer is readable without further lookups.
    const labels = await getUserLabels(
      rows.map((r: any) => r.cls.primaryTeacherUserId),
    );

    // How many learners are in each class — an admin scanning the list wants
    // the roster size, not just the name.
    const classIds = rows.map((r: any) => r.cls.id);
    const enrolled =
      classIds.length > 0
        ? await db
            .select({ classId: schema.classEnrollments.classId })
            .from(schema.classEnrollments)
            .where(
              and(
                inArray(schema.classEnrollments.classId, classIds),
                eq(schema.classEnrollments.status, "active"),
              ),
            )
        : [];
    // The arms each option class draws on: one query for every class listed.
    const optionRows =
      classIds.length > 0
        ? await db
            .select({
              classId: schema.classArms.classId,
              armId: schema.classArms.armId,
            })
            .from(schema.classArms)
            .where(inArray(schema.classArms.classId, classIds))
        : [];
    const optionsByClass: Record<string, string[]> = {};
    for (const o of optionRows)
      (optionsByClass[o.classId] ??= []).push(o.armId);
    const countByClass: Record<string, number> = {};
    for (const e of enrolled)
      countByClass[e.classId] = (countByClass[e.classId] ?? 0) + 1;

    return rows.map((r: any) => ({
      ...r.cls,
      armId: r.cls.armId ?? null,
      optionArmIds: optionsByClass[r.cls.id] ?? [],
      subjectName: r.subjectName ?? null,
      gradeLevelName: r.gradeLevelName ?? null,
      // Both spellings: `teacherName` is what the pages read, and
      // `primaryTeacherName` says which teacher it is.
      // An unassigned class matches no user, so the label would be blank;
      // saying so is the point of creating one unassigned.
      teacherName: isUnassignedTeacher(r.cls.primaryTeacherUserId)
        ? null
        : labelFor(labels, r.cls.primaryTeacherUserId),
      primaryTeacherName: isUnassignedTeacher(r.cls.primaryTeacherUserId)
        ? null
        : labelFor(labels, r.cls.primaryTeacherUserId),
      teacherAssigned: !isUnassignedTeacher(r.cls.primaryTeacherUserId),
      enrollmentCount: countByClass[r.cls.id] ?? 0,
      studentCount: countByClass[r.cls.id] ?? 0,
    }));
  },
});
