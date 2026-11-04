import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getDb, schema } from "../server/db/index.js";
import { and, eq, inArray, or } from "drizzle-orm";
import { nanoid } from "nanoid";
import { z } from "zod";
import { actorForEmail } from "../server/lib/class-access.js";
import { notify, peopleOfClass } from "../server/lib/notifications.js";

export default defineAction({
  description:
    "Change an announcement's title, text or classes. One posted to several classes is changed in all of them: classes added get a copy, classes dropped lose theirs. Nobody is told again unless notifyAgain is true.",
  schema: z.object({
    id: z.string().describe("Any announcement id from the card"),
    title: z.string().min(1).optional(),
    content: z.string().min(1).optional(),
    classIds: z
      .array(z.string())
      .min(1)
      .max(100)
      .optional()
      .describe("The full list of classes, for a class announcement"),
    notifyAgain: z.boolean().optional().default(false),
  }),
  http: { method: "POST" },
  run: async (args) => {
    const { orgId, userEmail } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const db = getDb();

    const [first] = await db
      .select()
      .from(schema.announcements)
      .where(
        and(
          eq(schema.announcements.id, args.id),
          eq(schema.announcements.orgId, orgId),
        ),
      );
    if (!first) throw new Error("That announcement was not found.");

    const rows = await db
      .select()
      .from(schema.announcements)
      .where(
        and(
          eq(schema.announcements.orgId, orgId),
          first.groupId
            ? or(
                eq(schema.announcements.id, first.id),
                eq(schema.announcements.groupId, first.groupId),
              )
            : eq(schema.announcements.id, first.id),
        ),
      );
    const now = new Date().toISOString();
    const title = args.title ?? first.title;
    const content = args.content ?? first.content;

    // The classes it is for, for a class announcement.
    let classIds = rows.map((r) => r.classId).filter((c): c is string => !!c);
    if (first.scope === "class" && args.classIds) {
      const wanted = [...new Set(args.classIds)];
      const own = await db
        .select({ id: schema.classes.id })
        .from(schema.classes)
        .where(
          and(
            eq(schema.classes.orgId, orgId),
            inArray(schema.classes.id, wanted),
          ),
        );
      if (own.length !== wanted.length)
        throw new Error("One of those classes is not in this school.");

      const have = new Set(classIds);
      const dropped = rows.filter(
        (r) => r.classId && !wanted.includes(r.classId),
      );
      const added = wanted.filter((c) => !have.has(c));
      // Rows are tied by a group id once there is more than one.
      const groupId = first.groupId ?? (wanted.length > 1 ? nanoid() : null);
      if (dropped.length > 0) {
        await db.delete(schema.announcements).where(
          inArray(
            schema.announcements.id,
            dropped.map((r) => r.id),
          ),
        );
      }
      if (added.length > 0) {
        await db.insert(schema.announcements).values(
          added.map((classId) => ({
            id: nanoid(),
            schoolId: orgId,
            scope: "class",
            classId,
            groupId,
            title,
            content,
            publishedAt: first.publishedAt,
            authorUserId: first.authorUserId,
            ownerEmail: first.ownerEmail,
            orgId,
            visibility: "org" as const,
          })),
        );
      }
      if (groupId && !first.groupId) {
        await db
          .update(schema.announcements)
          .set({ groupId })
          .where(eq(schema.announcements.id, first.id));
      }
      classIds = wanted;
    }

    // Title and text on every row left, and the time it was changed.
    const keep = new Set(classIds);
    const remaining = rows
      .filter((r) => !r.classId || keep.has(r.classId))
      .map((r) => r.id);
    if (remaining.length > 0) {
      await db
        .update(schema.announcements)
        .set({ title, content, updatedAt: now })
        .where(inArray(schema.announcements.id, remaining));
    }

    let told = 0;
    if (args.notifyAgain && first.publishedAt) {
      const author = userEmail ? await actorForEmail(userEmail) : null;
      const people =
        first.scope === "class"
          ? (
              await Promise.all(classIds.map((c) => peopleOfClass(orgId, c)))
            ).flat()
          : [];
      told = await notify(
        people.filter((p) => p.userId !== author?.userId),
        {
          kind: "announcement",
          title,
          body: content,
          dedupeKey: `announcement:${first.groupId ?? first.id}:edit:${now}`,
        },
      );
    }
    return { id: first.id, updated: true, notified: told };
  },
});
