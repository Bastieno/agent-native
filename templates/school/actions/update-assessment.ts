import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getDb, schema } from "../server/db/index.js";
import { eq } from "drizzle-orm";
import { z } from "zod";

export default defineAction({
  description:
    "Update an assessment's title, description, due date, total points, or type.",
  schema: z.object({
    id: z.string().describe("Assessment ID"),
    title: z.string().optional(),
    description: z.string().optional(),
    assessmentType: z
      .enum([
        "homework",
        "quiz",
        "test",
        "project",
        "oral",
        "practical",
        "custom",
      ])
      .optional(),
    dueDate: z.string().optional().describe("ISO date string, e.g. 2026-06-15"),
    totalPoints: z.number().optional(),
  }),
  http: { method: "PUT" },
  run: async (args) => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const db = getDb();
    const now = new Date().toISOString();

    const updates: Record<string, any> = { updatedAt: now };
    if (args.title !== undefined) updates.title = args.title;
    if (args.description !== undefined) updates.description = args.description;
    if (args.assessmentType !== undefined)
      updates.assessmentType = args.assessmentType;
    if (args.dueDate !== undefined) updates.dueDate = args.dueDate;
    if (args.totalPoints !== undefined) updates.totalPoints = args.totalPoints;

    await db
      .update(schema.assessments)
      .set(updates)
      .where(eq(schema.assessments.id, args.id));

    return { id: args.id, updated: true };
  },
});
