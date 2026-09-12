import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getOrgSetting, putOrgSetting } from "@agent-native/core/settings";
import { writeAppState } from "@agent-native/core/application-state";
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

    // Invalidate all UI caches so the admin overview reflects the new school immediately
    await writeAppState("refresh-signal", { ts: Date.now() });

    return {
      success: true,
      schoolId: orgId,
      name: args.name,
      type: args.type,
      // The order matters: blueprints are drafted from the subjects, and the
      // scheme of work needs the terms, so naming the sequence here keeps a
      // freshly created school from stalling at an empty dashboard.
      nextSteps: [
        "manage-grade-levels — the year groups this school actually teaches",
        "update-school-config — terms, grading scale, what learners are called, branding",
        "create-subject — the timetable",
        "manage-activity-blueprints — for each subject, how work is set and marked here",
        "start-curriculum-draft, then generate-scheme-of-work — the year, week by week",
      ],
      message: `School '${args.name}' initialized. Present the setup sheet for the admin to correct, then work through: grade levels, config, subjects, activity blueprints for each subject, and the curriculum.`,
    };
  },
});
