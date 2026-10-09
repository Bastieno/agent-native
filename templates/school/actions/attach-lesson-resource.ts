import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getDb, schema } from "../server/db/index.js";
import { nanoid } from "nanoid";
import { z } from "zod";

export default defineAction({
  description: "Attach a URL or file resource to a lesson note.",
  schema: z.object({
    lessonId: z.string().describe("Lesson note ID"),
    type: z.enum(["url", "file", "video"]).describe("Resource type"),
    title: z.string().describe("Display title for the resource"),
    url: z.string().optional().describe("URL for url/video resources"),
  }),
  http: { method: "POST" },
  run: async (args) => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const db = getDb();
    const now = new Date().toISOString();

    const id = nanoid();
    await db.insert(schema.lessonResources).values({
      id,
      lessonNoteId: args.lessonId,
      type: args.type,
      title: args.title,
      url: args.url ?? null,
      storageId: null,
      mimeType: null,
      uploadedAt: now,
      createdAt: now,
    });

    return { id, lessonId: args.lessonId, type: args.type, title: args.title };
  },
});
