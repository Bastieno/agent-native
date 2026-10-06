import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getDb, schema } from "../server/db/index.js";
import { nanoid } from "nanoid";
import {
  UNASSIGNED_TEACHER_ID,
  isUnassignedTeacher,
} from "../shared/class-teacher.js";
import { z } from "zod";

export default defineAction({
  description:
    "Create a class: a subject taught to a year group in an academic year. The teacher is optional — create the class unassigned when the teacher is not settled yet, and assign one later with update-class. Never name a teacher who does not teach it just to get the class created.",
  schema: z.object({
    subjectId: z.string(),
    gradeLevelId: z.string(),
    academicYearId: z.string(),
    termId: z.string().optional(),
    name: z.string().describe('Class name, e.g. "Grade 9A Mathematics"'),
    primaryTeacherUserId: z
      .string()
      .optional()
      .describe(
        "User ID of the primary teacher. Omit when nobody is assigned yet.",
      ),
    roomNumber: z.string().optional(),
    capacity: z.number().optional(),
  }),
  http: { method: "POST" },
  run: async (args) => {
    const { orgId, userEmail } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const db = getDb();
    const id = nanoid();
    const teacherUserId = args.primaryTeacherUserId ?? UNASSIGNED_TEACHER_ID;
    const unassigned = isUnassignedTeacher(teacherUserId);
    await db.insert(schema.classes).values({
      id,

      subjectId: args.subjectId,
      gradeLevelId: args.gradeLevelId,
      academicYearId: args.academicYearId,
      termId: args.termId ?? null,
      name: args.name,
      primaryTeacherUserId: teacherUserId,
      roomNumber: args.roomNumber ?? null,
      capacity: args.capacity ?? null,
      status: "active",
      ownerEmail: userEmail ?? "",
      orgId,
      visibility: "org" as const,
    });
    // Nobody to add to the join table when nobody is assigned.
    if (!unassigned) {
      await db.insert(schema.classTeachers).values({
        id: nanoid(),
        classId: id,
        teacherUserId: teacherUserId,
        role: "primary",
      });
    }
    return {
      id,
      name: args.name,
      teacherAssigned: !unassigned,
      message: unassigned
        ? `Created ${args.name} with no teacher assigned. Assign one with update-class when the school has decided; work cannot be published from it until then.`
        : `Created ${args.name}.`,
    };
  },
});
