import { defineAction } from "@agent-native/core";
import { writeAppState } from "@agent-native/core/application-state";
import { getDb, schema } from "../server/db/index.js";
import { and, eq, inArray, ne } from "drizzle-orm";
import { z } from "zod";

/**
 * Take something back from the class.
 *
 * Publishing had no opposite. A worksheet shared a week early, a reading
 * page with the wrong week's objectives, a test the class was not ready for —
 * all of it was one click away from the whole class and no clicks away from
 * being undone. A mistake that cannot be undone is one people avoid making
 * by never pressing the button at all, which is the opposite of what a
 * pilot needs.
 *
 * Nobody's work is deleted. Answers already given stay exactly where they
 * are, and reappear if the activity is shared again — this changes who can
 * reach it from now on, nothing else. That is also why work already started
 * needs saying so out loud: a learner halfway through a test would simply
 * find it gone.
 */
export default defineAction({
  description:
    "Stop sharing an activity with the class, putting it back to draft. Nothing anyone has written is deleted — it reappears if you share it again. Refuses, unless confirm=true, when learners have already started or handed in work.",
  schema: z.object({
    id: z.string().describe("Activity ID"),
    confirm: z
      .boolean()
      .optional()
      .default(false)
      .describe(
        "Required only when learners have already started or handed something in",
      ),
  }),
  http: { method: "POST" },
  run: async (args) => {
    const db = getDb();

    const [activity] = await db
      .select({
        id: schema.assessments.id,
        title: schema.assessments.title,
        status: schema.assessments.status,
      })
      .from(schema.assessments)
      .where(eq(schema.assessments.id, args.id))
      .limit(1);
    if (!activity) throw new Error("Activity not found.");

    if (activity.status !== "published") {
      return {
        success: true,
        id: args.id,
        status: activity.status,
        alreadyUnshared: true,
        message: `"${activity.title}" is not shared with the class.`,
      };
    }

    // Work in progress is the thing worth stopping for.
    const started = await db
      .select({ id: schema.submissions.id })
      .from(schema.submissions)
      .where(
        and(
          eq(schema.submissions.assessmentId, args.id),
          ne(schema.submissions.status, "not_started"),
        ),
      );
    const handedIn = await db
      .select({ id: schema.submissions.id })
      .from(schema.submissions)
      .where(
        and(
          eq(schema.submissions.assessmentId, args.id),
          inArray(schema.submissions.status, ["submitted", "graded"]),
        ),
      );

    if (started.length > 0 && !args.confirm) {
      return {
        success: false,
        needsConfirmation: true,
        id: args.id,
        started: started.length,
        handedIn: handedIn.length,
        message: `${started.length} learner(s) have already started "${activity.title}"${
          handedIn.length ? `, and ${handedIn.length} have handed it in` : ""
        }. Unsharing takes it off their screens; nothing they have written is deleted, and it comes back if you share it again. Re-run with confirm=true to go ahead.`,
      };
    }

    await db
      .update(schema.assessments)
      .set({ status: "draft", updatedAt: new Date().toISOString() })
      .where(eq(schema.assessments.id, args.id));
    await writeAppState("refresh-signal", { ts: Date.now() });

    return {
      success: true,
      id: args.id,
      status: "draft",
      started: started.length,
      message: `"${activity.title}" is no longer shared with the class.${
        started.length
          ? ` The work ${started.length} learner(s) had already done is kept, and comes back if you share it again.`
          : ""
      }`,
    };
  },
});
