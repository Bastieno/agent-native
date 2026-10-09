import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { writeAppState } from "@agent-native/core/application-state";
import { getDb, schema } from "../server/db/index.js";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { actorForEmail } from "../server/lib/class-access.js";
import {
  describeActors,
  actorLabel,
} from "../server/lib/lesson-attribution.js";

/**
 * Put a lesson note back to draft.
 *
 * Marking a note ready can be wrong: an admin who moved too early, a teacher
 * who pressed it before they had finished, a lesson that has to change because
 * the week did. Without a way back, the only remedy was the database — which
 * in practice means no remedy at all, and a teacher stuck with someone else's
 * judgement of their own work.
 *
 * The earlier marking is kept rather than erased. A note that was declared
 * ready and then reopened has a history, and both halves of it — who marked
 * it, who pulled it back — are worth reading. Erasing the first half would
 * make an admin's intervention disappear the moment it was disputed.
 */
export default defineAction({
  description:
    "Put a finalized lesson note back to draft so it can be edited again. Records who reopened it and keeps the earlier marking on the note, so both the marking and the reopening stay visible. A teacher may reopen their own class's notes; an admin any.",
  schema: z.object({
    id: z.string().describe("Lesson note ID"),
  }),
  http: { method: "PUT" },
  run: async (args) => {
    const db = getDb();
    const { userEmail } = currentAccess();
    const actor = userEmail ? await actorForEmail(userEmail) : null;

    const [note] = await db
      .select({
        id: schema.lessonNotes.id,
        title: schema.lessonNotes.title,
        status: schema.lessonNotes.status,
        finalizedByUserId: schema.lessonNotes.finalizedByUserId,
      })
      .from(schema.lessonNotes)
      .where(eq(schema.lessonNotes.id, args.id))
      .limit(1);
    if (!note) throw new Error(`Lesson note not found: ${args.id}`);

    if (note.status !== "finalized") {
      return {
        success: true,
        id: args.id,
        status: "draft",
        alreadyDraft: true,
        message: `"${note.title}" is already a draft — it can be edited as it is.`,
      };
    }

    const reopenedAt = new Date().toISOString();
    await db
      .update(schema.lessonNotes)
      .set({
        status: "draft",
        reopenedByUserId: actor?.userId ?? null,
        reopenedAt,
        updatedAt: reopenedAt,
      })
      .where(eq(schema.lessonNotes.id, args.id));
    await writeAppState("refresh-signal", { ts: Date.now() });

    // Who marked it, and who has just undone that — the second is only
    // meaningful beside the first.
    const people = await describeActors([
      actor?.userId,
      note.finalizedByUserId,
    ]);
    const by = actor ? actorLabel(people[actor.userId]) : null;
    const previously = note.finalizedByUserId
      ? actorLabel(people[note.finalizedByUserId])
      : null;

    return {
      success: true,
      id: args.id,
      status: "draft",
      reopenedAt,
      reopenedBy: by,
      wasMarkedReadyBy: previously,
      message: `"${note.title}" is a draft again${by ? `, reopened by ${by}` : ""}${
        previously ? ` — it had been marked ready by ${previously}` : ""
      }. It can be edited, and marked ready again when it is right.`,
    };
  },
});
