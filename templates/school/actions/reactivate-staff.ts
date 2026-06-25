import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getDb, schema } from "../server/db/index.js";
import { eq, and } from "drizzle-orm";
import { z } from "zod";

export default defineAction({
  description:
    "Reactivate a suspended staff member, restoring their access to the school portal.",
  schema: z.object({
    userId: z.string().describe("The staff member's user ID"),
  }),
  http: { method: "POST" },
  run: async (args) => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No org context. Are you logged in?");

    const db = getDb();

    const [existing] = await db
      .select()
      .from(schema.schoolProfiles)
      .where(
        and(
          eq(schema.schoolProfiles.userId, args.userId),
          eq(schema.schoolProfiles.schoolId, orgId),
        ),
      )
      .limit(1);

    if (!existing) {
      throw new Error(`No school profile found for user ${args.userId}.`);
    }

    if (existing.status === "active") {
      return {
        success: true,
        message: `Staff member is already active.`,
      };
    }

    await db
      .update(schema.schoolProfiles)
      .set({ status: "active", updatedAt: new Date().toISOString() })
      .where(eq(schema.schoolProfiles.id, existing.id));

    return {
      success: true,
      userId: args.userId,
      message: `Staff member reactivated. They can now log in and access the portal.`,
    };
  },
});
