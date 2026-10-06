import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getDb, schema } from "../server/db/index.js";
import { eq, and } from "drizzle-orm";
import { z } from "zod";
import { nanoid } from "nanoid";
import { isUnassignedTeacher } from "../shared/class-teacher.js";

export default defineAction({
  description:
    "Update a class (name, status, room number, capacity, or primary teacher).",
  schema: z.object({
    id: z.string().describe("Class ID"),
    name: z.string().optional(),
    status: z.enum(["active", "archived"]).optional(),
    primaryTeacherUserId: z
      .string()
      .optional()
      .describe(
        "Assign the primary teacher of a class that has none, or swap it",
      ),
    roomNumber: z.string().optional(),
    capacity: z.number().optional(),
  }),
  http: { method: "POST" },
  run: async (args) => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const db = getDb();
    const now = new Date().toISOString();

    const updates: Record<string, any> = { updatedAt: now };
    if (args.name !== undefined) updates.name = args.name;
    if (args.status !== undefined) updates.status = args.status;
    if (args.primaryTeacherUserId !== undefined)
      updates.primaryTeacherUserId = args.primaryTeacherUserId;
    if (args.roomNumber !== undefined) updates.roomNumber = args.roomNumber;
    if (args.capacity !== undefined) updates.capacity = args.capacity;

    await db
      .update(schema.classes)
      .set(updates)
      .where(
        and(eq(schema.classes.id, args.id), eq(schema.classes.orgId, orgId)),
      );

    // Assigning a teacher to an unassigned class has to reach the join table
    // too, or the class stays invisible in their own portal.
    if (
      args.primaryTeacherUserId !== undefined &&
      !isUnassignedTeacher(args.primaryTeacherUserId)
    ) {
      const [existing] = await db
        .select({ id: schema.classTeachers.id })
        .from(schema.classTeachers)
        .where(
          and(
            eq(schema.classTeachers.classId, args.id),
            eq(schema.classTeachers.teacherUserId, args.primaryTeacherUserId),
          ),
        )
        .limit(1);
      if (!existing) {
        await db.insert(schema.classTeachers).values({
          id: nanoid(),
          classId: args.id,
          teacherUserId: args.primaryTeacherUserId,
          role: "primary",
        });
      }
    }

    return { id: args.id, updated: true };
  },
});
