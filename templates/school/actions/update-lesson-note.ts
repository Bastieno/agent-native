import { defineAction } from "@agent-native/core";
import { writeAppState } from "@agent-native/core/application-state";
import { currentAccess } from "@agent-native/core/sharing";
import { getDb, schema } from "../server/db/index.js";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { actorForEmail } from "../server/lib/class-access.js";

export default defineAction({
  description:
    "Update a lesson note's content. Writes both to SQL (durable) and lesson-edit-{id} app-state (live editor sync). The editor refreshes via polling without a page reload.",
  schema: z.object({
    id: z.string().describe("Lesson note ID"),
    title: z.string().optional(),
    content: z.string().optional().describe("Full markdown content"),
    summary: z.string().optional(),
    lessonDate: z.string().optional(),
    customFields: z.record(z.string(), z.unknown()).optional(),
  }),
  http: { method: "PUT" },
  run: async (args) => {
    const db = getDb();
    const { id, customFields, ...rest } = args;
    // Who last changed it. An admin may edit any teacher's note, and the
    // teacher should be able to see that it was edited and by whom rather
    // than finding wording they did not write.
    const { userEmail } = currentAccess();
    const actor = userEmail ? await actorForEmail(userEmail) : null;
    const updates: Record<string, unknown> = {
      ...rest,
      ...(actor?.userId ? { lastEditedByUserId: actor.userId } : {}),
      updatedAt: new Date().toISOString(),
    };
    if (customFields) {
      const [existing] = await db
        .select({ customFieldsJson: schema.lessonNotes.customFieldsJson })
        .from(schema.lessonNotes)
        .where(eq(schema.lessonNotes.id, id))
        .limit(1);
      updates.customFieldsJson = JSON.stringify({
        ...JSON.parse(existing?.customFieldsJson ?? "{}"),
        ...customFields,
      });
    }
    await db
      .update(schema.lessonNotes)
      .set(updates)
      .where(eq(schema.lessonNotes.id, id));
    // Sync to live editor app-state
    await writeAppState(`lesson-edit-${id}`, {
      title: rest.title,
      content: rest.content,
      summary: rest.summary,
      status: "draft",
      customFieldsJson: customFields ?? {},
    });
    return { success: true, id };
  },
});
