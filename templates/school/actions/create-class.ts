import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getDb, schema } from "../server/db/index.js";
import { nanoid } from "nanoid";
import { z } from "zod";

export default defineAction({
  description:
    "Create a class (a teacher's delivery of a subject to a grade level in an academic year).",
  schema: z.object({
    subjectId: z.string(),
    gradeLevelId: z.string(),
    academicYearId: z.string(),
    termId: z.string().optional(),
    name: z.string().describe('Class name, e.g. "Grade 9A Mathematics"'),
    primaryTeacherUserId: z.string().describe("User ID of the primary teacher"),
    roomNumber: z.string().optional(),
    capacity: z.number().optional(),
  }),
  http: { method: "POST" },
  run: async (args) => {
    const { orgId, userEmail } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const db = getDb();
    const id = nanoid();
    await db.insert(schema.classes).values({
      id,

      subjectId: args.subjectId,
      gradeLevelId: args.gradeLevelId,
      academicYearId: args.academicYearId,
      termId: args.termId ?? null,
      name: args.name,
      primaryTeacherUserId: args.primaryTeacherUserId,
      roomNumber: args.roomNumber ?? null,
      capacity: args.capacity ?? null,
      status: "active",
      ownerEmail: userEmail ?? "",
      orgId,
      visibility: "org" as const,
    });
    // Also add primary teacher to class_teachers join table
    await db.insert(schema.classTeachers).values({
      id: nanoid(),
      classId: id,
      teacherUserId: args.primaryTeacherUserId,
      role: "primary",
    });
    return { id, name: args.name };
  },
});
