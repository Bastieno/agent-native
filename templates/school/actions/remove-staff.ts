import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getDb, schema } from "../server/db/index.js";
import { eq, and } from "drizzle-orm";
import { z } from "zod";

export default defineAction({
  description:
    "Permanently remove a staff member from the school. This deletes their school profile and cannot be undone.",
  schema: z.object({
    userId: z.string().describe("Staff member's user ID"),
  }),
  http: { method: "DELETE" },
  run: async (args) => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const db = getDb();
    await db
      .delete(schema.schoolProfiles)
      .where(
        and(
          eq(schema.schoolProfiles.userId, args.userId),
          eq(schema.schoolProfiles.schoolId, orgId),
        ),
      );
    return { success: true, userId: args.userId };
  },
});
