import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getDb, schema } from "../server/db/index.js";
import { nanoid } from "nanoid";
import { z } from "zod";

export default defineAction({
  description:
    "Manually override a student's differentiation category in a class. NEVER reveal categories to students.",
  schema: z.object({
    studentId: z.string().describe("Student user ID"),
    classId: z.string(),
    category: z.enum(["foundational", "developing", "advanced"]),
    notes: z.string().optional(),
  }),
  http: { method: "POST" },
  run: async (args) => {
    const { orgId, userEmail } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const db = getDb();
    const now = new Date().toISOString();

    await db.insert(schema.studentCategories).values({
      id: nanoid(),
      studentId: args.studentId,
      classId: args.classId,
      category: args.category,
      basis: "teacher_manual",
      assessedAt: now,
      assessedBy: userEmail ?? null,
      notes: args.notes ?? null,
      createdAt: now,
      updatedAt: now,
    });

    return {
      studentId: args.studentId,
      classId: args.classId,
      category: args.category,
    };
  },
});
