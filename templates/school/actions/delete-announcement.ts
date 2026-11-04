import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getDb, schema } from "../server/db/index.js";
import { eq, and, or } from "drizzle-orm";
import { z } from "zod";

export default defineAction({
  description:
    "Delete an announcement. One posted to several classes is removed from all of them.",
  schema: z.object({
    id: z.string().describe("Announcement ID"),
  }),
  http: { method: "POST" },
  run: async (args) => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const db = getDb();

    const [row] = await db
      .select({ groupId: schema.announcements.groupId })
      .from(schema.announcements)
      .where(
        and(
          eq(schema.announcements.id, args.id),
          eq(schema.announcements.orgId, orgId),
        ),
      );
    await db
      .delete(schema.announcements)
      .where(
        and(
          eq(schema.announcements.orgId, orgId),
          row?.groupId
            ? or(
                eq(schema.announcements.id, args.id),
                eq(schema.announcements.groupId, row.groupId),
              )
            : eq(schema.announcements.id, args.id),
        ),
      );

    return { id: args.id, deleted: true };
  },
});
