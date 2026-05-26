import { defineAction } from "@agent-native/core";
import { writeAppState } from "@agent-native/core/application-state";
import { getDb, schema } from "../server/db/index.js";
import { eq } from "drizzle-orm";
import { z } from "zod";

export default defineAction({
  description:
    "Finalize a lesson note (mark as finalized, clear the live edit state). Teachers cannot further edit finalized notes without reverting to draft.",
  schema: z.object({
    id: z.string().describe("Lesson note ID"),
  }),
  http: { method: "PUT" },
  run: async (args) => {
    const db = getDb();
    await db
      .update(schema.lessonNotes)
      .set({ status: "finalized", updatedAt: new Date().toISOString() })
      .where(eq(schema.lessonNotes.id, args.id));
    // Delete live edit app-state — note is finalized
    await writeAppState(`lesson-edit-${args.id}`, null as any);
    return { success: true, id: args.id, status: "finalized" };
  },
});
