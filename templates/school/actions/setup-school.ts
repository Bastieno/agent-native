import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getOrgSetting, putOrgSetting } from "@agent-native/core/settings";
import { getDb, schema } from "../server/db/index.js";
import { eq, and } from "drizzle-orm";
import { nanoid } from "nanoid";
import { sql } from "drizzle-orm";
import { z } from "zod";

export default defineAction({
  description:
    "Initialize the school. Creates the school admin profile for the current user and saves the school's identity configuration. Run this once at the start of onboarding a new school.",
  schema: z.object({
    name: z.string().describe("School name, e.g. 'Green Valley Academy'"),
    type: z
      .enum(["primary", "secondary", "k12", "university", "other"])
      .describe("School type"),
    timezone: z
      .string()
      .optional()
      .describe("IANA timezone, e.g. 'Africa/Lagos'"),
    country: z.string().optional().describe("Country, e.g. 'Nigeria'"),
  }),
  http: { method: "POST" },
  run: async (args) => {
    const { orgId, userEmail } = currentAccess();
    if (!orgId) throw new Error("No org context. Are you logged in?");
    if (!userEmail) throw new Error("No user email in context.");

    const db = getDb();

    // Look up the current user's ID from the framework user table
    const userRow = await db.get<{ id: string }>(
      sql`SELECT id FROM "user" WHERE email = ${userEmail} LIMIT 1`,
    );
    const userId = userRow?.id;

    if (!userId) {
      throw new Error(
        `User record not found for ${userEmail}. Please log out of the app and sign back in through the login page — this syncs your account to the database. Then try again.`,
      );
    }

    // Create the school_admin profile for this user if it doesn't exist yet
    const existing = await db
      .select()
      .from(schema.schoolProfiles)
      .where(
        and(
          eq(schema.schoolProfiles.userId, userId),
          eq(schema.schoolProfiles.schoolId, orgId),
        ),
      )
      .limit(1);

    if (!existing.length) {
      await db.insert(schema.schoolProfiles).values({
        id: nanoid(),
        userId,
        schoolId: orgId,
        schoolRole: "school_admin",
        status: "active",
      });
    } else if (existing[0].schoolRole !== "school_admin") {
      // Already has a profile but not as admin — upgrade to admin
      await db
        .update(schema.schoolProfiles)
        .set({
          schoolRole: "school_admin",
          updatedAt: new Date().toISOString(),
        })
        .where(eq(schema.schoolProfiles.id, existing[0].id));
    }

    // Save school identity config
    const existingConfig =
      ((await getOrgSetting(orgId, "school-config")) as Record<
        string,
        unknown
      > | null) ?? {};

    await putOrgSetting(orgId, "school-config", {
      ...existingConfig,
      name: args.name,
      type: args.type,
      timezone: args.timezone ?? "UTC",
      country: args.country ?? "",
    });

    return {
      success: true,
      schoolId: orgId,
      name: args.name,
      type: args.type,
      message: `School '${args.name}' initialized. You can now run manage-grade-levels, update-school-config, create-subject, and start-curriculum-draft to complete the setup.`,
    };
  },
});
