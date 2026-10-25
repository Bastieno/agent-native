import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getDb, schema } from "../server/db/index.js";
import { nanoid } from "nanoid";
import { z } from "zod";
import { actorForEmail } from "../server/lib/class-access.js";
import {
  notify,
  peopleOfClass,
  peopleOfSchool,
} from "../server/lib/notifications.js";

export default defineAction({
  description: "Create a school-wide or class-specific announcement.",
  schema: z.object({
    title: z.string().describe("Announcement title"),
    content: z.string().describe("Announcement body (markdown)"),
    scope: z.enum(["school", "class"]).default("school"),
    classId: z.string().optional().describe("Required when scope=class"),
    publishNow: z.boolean().optional().default(true),
  }),
  http: { method: "POST" },
  run: async (args) => {
    const { orgId, userEmail } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    if (args.scope === "class" && !args.classId)
      throw new Error("Provide --classId when scope=class.");
    const db = getDb();
    const id = nanoid();
    const now = new Date().toISOString();
    await db.insert(schema.announcements).values({
      id,
      schoolId: orgId,
      scope: args.scope,
      classId: args.classId ?? null,
      title: args.title,
      content: args.content,
      publishedAt: args.publishNow ? now : null,
      authorUserId: userEmail ?? "agent",
      ownerEmail: userEmail ?? "",
      orgId,
      visibility: "org" as const,
    });
    // Tell the people it is for, once, other than whoever wrote it. A draft
    // tells nobody until it is published.
    let told = 0;
    if (args.publishNow) {
      const author = userEmail ? await actorForEmail(userEmail) : null;
      const people =
        args.scope === "class" && args.classId
          ? await peopleOfClass(orgId, args.classId)
          : await peopleOfSchool(orgId, [
              "school_admin",
              "subject_coordinator",
              "teacher",
              "student",
            ]);
      told = await notify(
        people.filter((p) => p.userId !== author?.userId),
        {
          kind: "announcement",
          title: args.title,
          body: args.content,
          dedupeKey: `announcement:${id}`,
        },
      );
    }
    return { id, title: args.title, scope: args.scope, notified: told };
  },
});
