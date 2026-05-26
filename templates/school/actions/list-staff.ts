import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getDb, schema } from "../server/db/index.js";
import { eq, and, ne, sql } from "drizzle-orm";
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

    const profiles = await db
      .select()
      .from(schema.schoolProfiles)
      .where(and(...conditions));

    // Enrich with name and email from the framework user table
    const enriched = await Promise.all(
      profiles.map(async (p) => {
        const userRow = await db.get(
          sql`SELECT email, name FROM "user" WHERE id = ${p.userId} LIMIT 1`,
        ) as { email: string; name: string } | undefined;
        return {
          ...p,
          email: userRow?.email ?? null,
          name: userRow?.name ?? null,
        };
      }),
    );

    return enriched;
  },
});
