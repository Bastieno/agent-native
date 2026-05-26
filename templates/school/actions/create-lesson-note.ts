import { defineAction } from "@agent-native/core";
import { writeAppState } from "@agent-native/core/application-state";
import { currentAccess } from "@agent-native/core/sharing";
import { getDb, schema } from "../server/db/index.js";
import { nanoid } from "nanoid";
import { z } from "zod";

export default defineAction({
  description:
    "Create a lesson note draft and open the editor. After creating, call navigate --view=lesson --lessonId=<id> to open the editor. The lesson-edit-{id} app-state key is written so the editor opens pre-populated.",
  schema: z.object({
    classId: z.string().describe("Class ID"),
    unitId: z.string().describe("Unit this lesson belongs to"),
    title: z.string().describe("Lesson title"),
    content: z.string().optional().default("").describe("Initial markdown content"),
    summary: z.string().optional(),
    lessonDate: z.string().optional().describe("ISO date string for when this lesson will be taught"),
    customFields: z.record(z.string(), z.unknown()).optional(),
  }),
  http: { method: "POST" },
  run: async (args) => {
    const { orgId, userEmail } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const db = getDb();
    const id = nanoid();
    await db.insert(schema.lessonNotes).values({
      id,
      classId: args.classId,
      unitId: args.unitId,
      title: args.title,
      content: args.content ?? "",
      summary: args.summary ?? null,
      lessonDate: args.lessonDate ?? null,
      status: "draft",
      customFieldsJson: JSON.stringify(args.customFields ?? {}),
      ownerEmail: userEmail ?? "",
      orgId,
      visibility: "org" as const,
    });
    // Write initial live edit state so editor opens pre-populated
    await writeAppState(`lesson-edit-${id}`, {
      title: args.title,
      content: args.content ?? "",
      summary: args.summary ?? "",
      status: "draft",
      customFieldsJson: args.customFields ?? {},
    });
    return { id, title: args.title, classId: args.classId, unitId: args.unitId };
  },
});
