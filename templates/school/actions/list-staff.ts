import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getDb, schema } from "../server/db/index.js";
import { eq, and, ne } from "drizzle-orm";
import { z } from "zod";

export default defineAction({
  description: "List all staff members (teachers, coordinators, admins) for the school.",
  schema: z.object({
    role: z
      .enum(["school_admin", "teacher", "subject_coordinator"])
      .optional()
      .describe("Filter by school role"),
    status: z.enum(["active", "suspended"]).optional(),
  }),
  http: { method: "GET" },
  run: async (args) => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const db = getDb();
    const conditions = [
      eq(schema.schoolProfiles.schoolId, orgId),
      ne(schema.schoolProfiles.schoolRole, "student"),
    ];
    if (args.role) conditions.push(eq(schema.schoolProfiles.schoolRole, args.role));
    if (args.status) conditions.push(eq(schema.schoolProfiles.status, args.status));
    return db
      .select()
      .from(schema.schoolProfiles)
      .where(and(...conditions));
  },
});
