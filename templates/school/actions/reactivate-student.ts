import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getDb, schema } from "../server/db/index.js";
import { eq, and } from "drizzle-orm";
import { z } from "zod";

export default defineAction({
  description:
    "Reactivate a suspended student, restoring their access to the student portal.",
  schema: z.object({
    studentId: z.string().describe("The student record ID"),
  }),
  http: { method: "POST" },
  run: async (args) => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No org context. Are you logged in?");

    const db = getDb();

    const [student] = await db
      .select()
      .from(schema.students)
      .where(
        and(
          eq(schema.students.id, args.studentId),
          eq(schema.students.schoolId, orgId),
        ),
      )
      .limit(1);

    if (!student) {
      throw new Error(`No student found with ID ${args.studentId}.`);
    }

    if (student.status === "active") {
      return {
        success: true,
        message: `Student is already active.`,
      };
    }

    await db
      .update(schema.students)
      .set({ status: "active", updatedAt: new Date().toISOString() })
      .where(eq(schema.students.id, args.studentId));

    // Also reactivate their school profile if suspended
    await db
      .update(schema.schoolProfiles)
      .set({ status: "active", updatedAt: new Date().toISOString() })
      .where(
        and(
          eq(schema.schoolProfiles.userId, student.userId),
          eq(schema.schoolProfiles.schoolId, orgId),
        ),
      );

    return {
      success: true,
      studentId: args.studentId,
      message: `Student reactivated. They can now log in and access the student portal.`,
    };
  },
});
