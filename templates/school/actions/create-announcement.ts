import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getDb, schema } from "../server/db/index.js";
import { and, eq, inArray } from "drizzle-orm";
import { nanoid } from "nanoid";
import { z } from "zod";
import {
  actorForEmail,
  assertClassAccess,
  AccessDeniedError,
} from "../server/lib/class-access.js";
import {
  notify,
  peopleOfClass,
  peopleOfSchool,
} from "../server/lib/notifications.js";

export default defineAction({
  description:
    "Create an announcement: for the whole school (admins only), or for one class or several at once (a teacher can choose only the classes they teach). Anyone in a chosen class is told once, even if they are in more than one.",
  schema: z.object({
    title: z.string().describe("Announcement title"),
    content: z.string().describe("Announcement body (markdown)"),
    scope: z.enum(["school", "class"]).default("school"),
    classId: z.string().optional().describe("One class, when scope=class"),
    classIds: z
      .array(z.string())
      .max(100)
      .optional()
      .describe("Several classes, when scope=class"),
    publishNow: z.boolean().optional().default(true),
  }),
  http: { method: "POST" },
  run: async (args) => {
    const { orgId, userEmail } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const classIds = [
      ...new Set([
        ...(args.classIds ?? []),
        ...(args.classId ? [args.classId] : []),
      ]),
    ];
    if (args.scope === "class" && classIds.length === 0)
      throw new Error("Choose at least one class when scope=class.");
    const db = getDb();

    // Who may post where. The whole school hears from its head, not from any
    // teacher; a teacher speaks to the classes they teach.
    const actor = userEmail ? await actorForEmail(userEmail) : null;
    if (!actor) throw new AccessDeniedError("Sign in to a school to post.");
    if (args.scope === "school") {
      if (actor.schoolRole !== "school_admin")
        throw new AccessDeniedError(
          "Only an admin can post to the whole school. Choose your classes instead.",
        );
    } else {
      for (const classId of classIds) await assertClassAccess(actor, classId);
    }

    // A class from another school is not one this school can post to.
    if (args.scope === "class") {
      const own = await db
        .select({ id: schema.classes.id })
        .from(schema.classes)
        .where(
          and(
            eq(schema.classes.orgId, orgId),
            inArray(schema.classes.id, classIds),
          ),
        );
      if (own.length !== classIds.length)
        throw new Error("One of those classes is not in this school.");
    }

    const now = new Date().toISOString();
    const targets: Array<string | null> =
      args.scope === "class" ? classIds : [null];
    // Several classes share one group id so the list shows a single card.
    const groupId = targets.length > 1 ? nanoid() : null;
    const ids = targets.map(() => nanoid());
    await db.insert(schema.announcements).values(
      targets.map((classId, i) => ({
        id: ids[i],
        schoolId: orgId,
        scope: args.scope,
        classId,
        groupId,
        title: args.title,
        content: args.content,
        publishedAt: args.publishNow ? now : null,
        authorUserId: userEmail ?? "agent",
        ownerEmail: userEmail ?? "",
        orgId,
        visibility: "org" as const,
      })),
    );
    // Tell the people it is for, once, other than whoever wrote it. A draft
    // tells nobody until it is published.
    let told = 0;
    if (args.publishNow) {
      const author = actor;
      const people =
        args.scope === "class"
          ? (
              await Promise.all(classIds.map((c) => peopleOfClass(orgId, c)))
            ).flat()
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
          dedupeKey: `announcement:${groupId ?? ids[0]}`,
        },
      );
    }
    return {
      id: ids[0],
      ids,
      title: args.title,
      scope: args.scope,
      classes: targets.filter(Boolean).length,
      notified: told,
    };
  },
});
