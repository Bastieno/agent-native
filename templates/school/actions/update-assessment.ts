import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getDb, schema } from "../server/db/index.js";
import { and, eq } from "drizzle-orm";
import { z } from "zod";

export default defineAction({
  description:
    "Update an assessment's title, description, due date, closing date, total points, type, or the week's lesson it belongs to.",
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
    opensAt: z
      .string()
      .optional()
      .describe(
        "ISO date/time it becomes available to the class. Until then learners see its title and when it opens, not its content. Pass an empty string to open it at once.",
      ),
    closesAt: z
      .string()
      .optional()
      .describe(
        "ISO date/time it closes. Once closed, learners see the right answers on their returned paper. Pass an empty string for no closing date.",
      ),
    lessonNoteId: z
      .string()
      .optional()
      .describe(
        "Attach this to a week's lesson, so it shows under that lesson rather than only in the class's list. Pass an empty string to detach it.",
      ),
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
    // Empty string detaches: a week it no longer belongs to is a real edit,
    // and omitting the field has to keep meaning "leave it alone".
    if (args.lessonNoteId !== undefined) {
      updates.lessonNoteId =
        args.lessonNoteId === "" ? null : args.lessonNoteId;
    }
    if (args.totalPoints !== undefined) updates.totalPoints = args.totalPoints;
    // Empty string clears it, for the same reason as the lesson above.
    if (args.opensAt !== undefined)
      updates.opensAt = args.opensAt === "" ? null : args.opensAt;
    if (args.closesAt !== undefined)
      updates.closesAt = args.closesAt === "" ? null : args.closesAt;

    // Scoped to this school here as well as by the central class guard, so
    // the action is safe on its own.
    await db
      .update(schema.assessments)
      .set(updates)
      .where(
        and(
          eq(schema.assessments.id, args.id),
          eq(schema.assessments.orgId, orgId),
        ),
      );

    return { id: args.id, updated: true };
  },
});
