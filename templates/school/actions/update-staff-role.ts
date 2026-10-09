import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getDb, schema } from "../server/db/index.js";
import { eq, and } from "drizzle-orm";
import { z } from "zod";

export default defineAction({
  description:
    "Update a staff member's role within the school (teacher, subject_coordinator, or school_admin).",
  schema: z.object({
    userId: z.string().describe("Staff member's user ID"),
    schoolRole: z
      .enum(["teacher", "subject_coordinator", "school_admin"])
      .describe("New role to assign"),
  }),
  http: { method: "POST" },
  run: async (args) => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const db = getDb();
    await db
      .update(schema.schoolProfiles)
      .set({ schoolRole: args.schoolRole, updatedAt: new Date().toISOString() })
      .where(
        and(
          eq(schema.schoolProfiles.userId, args.userId),
          eq(schema.schoolProfiles.schoolId, orgId),
        ),
      );
    return { success: true, userId: args.userId, schoolRole: args.schoolRole };
  },
});
