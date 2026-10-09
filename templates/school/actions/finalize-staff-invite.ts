import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getOrgSetting, putOrgSetting } from "@agent-native/core/settings";
import { getDb, schema } from "../server/db/index.js";
import { eq, and } from "drizzle-orm";
import { sql } from "drizzle-orm";
import { nanoid } from "nanoid";
import { realNameOrNull } from "../server/lib/user-names.js";
import { z } from "zod";

export default defineAction({
  description:
    "Activate a staff member who has already accepted their invitation and signed in. Creates their school profile so they can access the teacher portal. Call this after the staff member confirms they have signed in.",
  schema: z.object({
    email: z.string().email().describe("The staff member's email address"),
    schoolRole: z
      .enum(["teacher", "subject_coordinator", "school_admin"])
      .optional()
      .describe(
        "Override the school role. If omitted, uses the role from the original invite.",
      ),
  }),
  http: { method: "POST" },
  run: async (args) => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No org context. Are you logged in?");

    const email = args.email.trim().toLowerCase();
    const db = getDb();

    // Look up the user by email in the framework user table
    const userRow = await db.get<{ id: string; name: string | null }>(
      sql`SELECT id, name FROM "user" WHERE LOWER(email) = ${email} LIMIT 1`,
    );
    if (!userRow?.id) {
      throw new Error(
        `No account found for ${email}. They must sign in first via the app login page before you can activate them.`,
      );
    }
    const userId = userRow.id;

    // Determine school role: explicit arg takes priority, then pending invite, then error
    let schoolRole = args.schoolRole;
    let invitedName: string | null = null;
    {
      const list = ((await getOrgSetting(orgId, "pending-staff-invites")) ??
        []) as Array<{ email: string; schoolRole: string; name?: string }>;
      const match = list.find((inv) => inv.email === email);
      invitedName = match?.name?.trim() || null;
      if (!schoolRole) {
        schoolRole = (match?.schoolRole as typeof schoolRole) ?? undefined;
      }
    }
    if (!schoolRole) {
      throw new Error(
        `Could not determine school role for ${email}. Please specify --schoolRole explicitly (e.g. --schoolRole teacher).`,
      );
    }

    // Check if already has a profile
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

    if (existing.length > 0) {
      // Already exists — update role if different
      if (existing[0].schoolRole !== schoolRole) {
        await db
          .update(schema.schoolProfiles)
          .set({ schoolRole, updatedAt: new Date().toISOString() })
          .where(eq(schema.schoolProfiles.id, existing[0].id));
        return {
          success: true,
          email,
          schoolRole,
          message: `${email}'s role updated to ${schoolRole}.`,
        };
      }
      return {
        success: true,
        email,
        schoolRole,
        message: `${email} is already active as ${schoolRole}. No changes needed.`,
      };
    }

    // Create the school profile
    await db.insert(schema.schoolProfiles).values({
      id: nanoid(),
      userId,
      schoolId: orgId,
      schoolRole,
      status: "active",
    });

    // Same as the ordinary sign-in path: keep the name they were invited
    // under, unless they have chosen one themselves. Signing up derives a
    // name from the address, and "teacher.maths" is nobody's name.
    if (invitedName && !realNameOrNull(userRow.name, email)) {
      await db.run(
        sql`UPDATE "user" SET name = ${invitedName} WHERE id = ${userId}`,
      );
    }

    // Add to org_members so the framework's getOrgContext can resolve orgId for this user
    const existingMember = await db.get<{ id: string }>(
      sql`SELECT id FROM org_members WHERE org_id = ${orgId} AND LOWER(email) = ${email} LIMIT 1`,
    );
    if (!existingMember) {
      await db.run(
        sql`INSERT INTO org_members (id, org_id, email, role, joined_at) VALUES (${nanoid()}, ${orgId}, ${email}, 'member', ${Date.now()})`,
      );
    }

    // Remove from pending list now that the profile is active
    const currentList = ((await getOrgSetting(
      orgId,
      "pending-staff-invites",
    )) ?? []) as Array<{ email: string }>;
    await putOrgSetting(
      orgId,
      "pending-staff-invites",
      currentList.filter((inv) => inv.email !== email) as any,
    );

    const schoolConfig =
      ((await getOrgSetting(orgId, "school-config")) as Record<
        string,
        unknown
      > | null) ?? {};
    const schoolName = (schoolConfig.name as string) || "the school";

    return {
      success: true,
      email,
      schoolRole,
      message: `${email} is now active as ${schoolRole} at ${schoolName}. They can log in and access the ${(schoolRole as string) === "student" ? "student" : "teacher"} portal.`,
    };
  },
});
