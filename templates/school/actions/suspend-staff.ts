import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getDb, schema } from "../server/db/index.js";
import { eq, and } from "drizzle-orm";
import { z } from "zod";

export default defineAction({
  description:
    "Suspend a staff member, preventing portal access. Their data is preserved and they can be re-activated.",
  schema: z.object({
    userId: z.string().describe("Staff member's user ID"),
  }),
  http: { method: "PUT" },
  run: async (args) => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const db = getDb();
    await db
      .update(schema.schoolProfiles)
      .set({ status: "suspended", updatedAt: new Date().toISOString() })
      .where(
        and(
          eq(schema.schoolProfiles.userId, args.userId),
          eq(schema.schoolProfiles.schoolId, orgId),
        ),
      );
    return { success: true, userId: args.userId, status: "suspended" };
  },
});
