import { defineAction } from "@agent-native/core";
import { getDb, schema } from "../server/db/index.js";
import { eq } from "drizzle-orm";
import { z } from "zod";

export default defineAction({
  description:
    "Get a single lesson note by ID, including any attached resources.",
  schema: z.object({
    id: z.string().describe("Lesson note ID"),
  }),
  http: { method: "GET" },
  run: async (args) => {
    const db = getDb();
    const [note] = await db
      .select()
      .from(schema.lessonNotes)
      .where(eq(schema.lessonNotes.id, args.id))
      .limit(1);
    if (!note) throw new Error(`Lesson note not found: ${args.id}`);

    const resources = await db
      .select()
      .from(schema.lessonResources)
      .where(eq(schema.lessonResources.lessonNoteId, args.id));

    return { ...note, resources };
  },
});
