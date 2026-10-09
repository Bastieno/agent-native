import { defineAction } from "@agent-native/core";
import { writeAppState } from "@agent-native/core/application-state";
import { getDb, schema } from "../server/db/index.js";
import { and, eq, inArray, ne } from "drizzle-orm";
import { z } from "zod";

/**
 * Remove an activity that should never have existed.
 *
 * Everything else in the app can be made and not unmade: a duplicate
 * reading page, a worksheet created against the wrong week, a deck written
 * twice. The agent that found twenty-six reading pages for thirteen lessons
 * could report it and nothing more, which leaves a teacher to publish
 * around the mess.
 *
 * Narrow on purpose. Only a draft — once a class has been given something,
 * taking it away is `unshare-assessment`, which keeps it. And never when a
 * learner has started or handed in work against it: their answers are
 * theirs, and deleting the question would orphan them.
 */
export default defineAction({
  description:
    "Delete a draft activity and its variants. Refuses once it has been shared with a class (unshare it first) and refuses if any learner has started or handed in work against it. Previews by default; pass confirm=true to delete.",
  schema: z.object({
    id: z.string().describe("Activity ID"),
    confirm: z
      .boolean()
      .optional()
      .default(false)
      .describe("false describes what would go; true deletes it"),
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

    if (activity.status === "published") {
      throw new Error(
        `"${activity.title}" is shared with the class. Stop sharing it first, then delete it — that way nobody loses it from under them.`,
      );
    }

    const touched = await db
      .select({ id: schema.submissions.id })
      .from(schema.submissions)
      .where(
        and(
          eq(schema.submissions.assessmentId, args.id),
          ne(schema.submissions.status, "not_started"),
        ),
      );
    if (touched.length > 0) {
      throw new Error(
        `${touched.length} learner(s) have work against "${activity.title}", so it cannot be deleted — their answers would be left pointing at nothing.`,
      );
    }

    const variants = await db
      .select({ id: schema.assessmentVariants.id })
      .from(schema.assessmentVariants)
      .where(eq(schema.assessmentVariants.assessmentId, args.id));

    if (!args.confirm) {
      return {
        preview: true,
        id: args.id,
        title: activity.title,
        variants: variants.length,
        message: `Would delete the draft "${activity.title}" and its ${variants.length} variant(s). Nobody has work against it. Re-run with confirm=true to delete it.`,
      };
    }

    if (variants.length) {
      await db
        .delete(schema.assessmentVariants)
        .where(eq(schema.assessmentVariants.assessmentId, args.id));
    }
    // Empty submission rows can exist before anyone writes anything; they
    // describe an activity that will not exist, so they go with it.
    await db
      .delete(schema.submissions)
      .where(eq(schema.submissions.assessmentId, args.id));
    await db
      .delete(schema.studentAssessments)
      .where(eq(schema.studentAssessments.assessmentId, args.id));
    await db
      .delete(schema.assessments)
      .where(eq(schema.assessments.id, args.id));
    await writeAppState("refresh-signal", { ts: Date.now() });

    return {
      deleted: true,
      id: args.id,
      title: activity.title,
      message: `"${activity.title}" has been deleted.`,
    };
  },
});
