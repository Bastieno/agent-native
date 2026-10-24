import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getDb, schema } from "../server/db/index.js";
import { eq, and } from "drizzle-orm";
import { nanoid } from "nanoid";
import { z } from "zod";

export default defineAction({
  description:
    "Set or update a student's overall term gradebook entry for a class.",
  schema: z.object({
    studentId: z.string().describe("Student user ID"),
    classId: z.string(),
    termId: z.string(),
    computedScore: z
      .string()
      .optional()
      .describe("Overall score as string, e.g. '78.5'"),
    letterGrade: z.string().optional().describe("Letter grade, e.g. 'B+'"),
    isPublished: z.boolean().optional().default(false),
  }),
  http: { method: "POST" },
  run: async (args) => {
    const { orgId, userEmail } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const db = getDb();
    const now = new Date().toISOString();

    const [existing] = await db
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

    if (existing) {
      await db
        .update(schema.gradebookEntries)
        .set({
          computedScore: args.computedScore ?? existing.computedScore,
          letterGrade: args.letterGrade ?? existing.letterGrade,
          isPublished: args.isPublished ?? existing.isPublished,
          publishedAt: args.isPublished ? now : existing.publishedAt,
          updatedAt: now,
        })
        .where(eq(schema.gradebookEntries.id, existing.id));
      return { id: existing.id, updated: true };
    } else {
      const id = nanoid();
      await db.insert(schema.gradebookEntries).values({
        id,
        studentId: args.studentId,
        classId: args.classId,
        termId: args.termId,
        computedScore: args.computedScore ?? null,
        letterGrade: args.letterGrade ?? null,
        isPublished: args.isPublished ?? false,
        publishedAt: args.isPublished ? now : null,
        ownerEmail: userEmail ?? "",
        orgId,
        visibility: "org" as const,
      });
      return { id, updated: false };
    }
  },
});
