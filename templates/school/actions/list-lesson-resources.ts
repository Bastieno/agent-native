import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getDb, schema } from "../server/db/index.js";
import { eq } from "drizzle-orm";
import { z } from "zod";

export default defineAction({
  description: "List all resources attached to a lesson note.",
  schema: z.object({
    lessonId: z.string().describe("Lesson note ID"),
  }),
  http: { method: "GET" },
  run: async (args) => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const db = getDb();

    return db
      .select()
      .from(schema.lessonResources)
      .where(eq(schema.lessonResources.lessonNoteId, args.lessonId));
  },
});
