import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getDb, schema } from "../server/db/index.js";
import { eq, and } from "drizzle-orm";
import { z } from "zod";

export default defineAction({
  description: "Delete an announcement.",
  schema: z.object({
    id: z.string().describe("Announcement ID"),
  }),
  http: { method: "POST" },
  run: async (args) => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const db = getDb();

    await db
      .delete(schema.announcements)
      .where(
        and(
          eq(schema.announcements.id, args.id),
          eq(schema.announcements.orgId, orgId),
        ),
      );

    return { id: args.id, deleted: true };
  },
});
