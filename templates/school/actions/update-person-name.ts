import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { writeAppState } from "@agent-native/core/application-state";
import { getDb, schema } from "../server/db/index.js";
import { and, eq, sql } from "drizzle-orm";
import { z } from "zod";
import { actorForEmail } from "../server/lib/class-access.js";

/**
 * Correct the name a person is known by.
 *
 * Signing up asks only for an email and a password, so a name is either taken
 * from the invitation or derived from the address. Neither could be changed
 * afterwards: a misspelt invitation followed a teacher through the staff list,
 * the gradebook and every report card their students were issued, and someone
 * who signed up before being invited stayed "student1" for good.
 *
 * Anyone may correct their own name. An admin or subject coordinator may
 * correct anyone's in their school — a school office is where a misspelt name
 * gets reported — and nobody may touch a name outside it.
 */
export default defineAction({
  description:
    "Change the name a person is shown by across the school — staff list, gradebook, marking and report cards. Anyone can change their own; admins and subject coordinators can change anyone's in their school. Report cards already issued keep the name they were issued with.",
  schema: z.object({
    name: z.string().describe("The corrected name, as it should be shown"),
    userId: z
      .string()
      .optional()
      .describe("Whose name to change. Omit for your own."),
  }),
  http: { method: "PUT" },
  run: async (args) => {
    const { orgId, userEmail } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    if (!userEmail) throw new Error("No signed-in user.");
    const db = getDb();

    const name = args.name.trim().replace(/\s+/g, " ");
    if (!name) throw new Error("A name cannot be empty.");
    if (name.length > 80) {
      throw new Error("That name is too long — 80 characters at most.");
    }
    // Control characters would break every list and printed page the name
    // appears on.
    // eslint-disable-next-line no-control-regex
    if (/[\u0000-\u001f\u007f]/.test(name)) {
      throw new Error("A name cannot contain control characters.");
    }

    const actor = await actorForEmail(userEmail);
    if (!actor) throw new Error("You are not a member of this school.");
    const targetId = args.userId ?? actor.userId;

    if (targetId !== actor.userId) {
      if (
        actor.schoolRole !== "school_admin" &&
        actor.schoolRole !== "subject_coordinator"
      ) {
        throw new Error("You can only change your own name.");
      }
      // The target must belong to this school — a user id is not a licence to
      // rename someone in another one.
      const [profile] = await db
        .select({ id: schema.schoolProfiles.id })
        .from(schema.schoolProfiles)
        .where(
          and(
            eq(schema.schoolProfiles.userId, targetId),
            eq(schema.schoolProfiles.schoolId, orgId),
          ),
        )
        .limit(1);
      if (!profile) throw new Error("That person was not found.");
    }

    const before = (await db.get(
      sql`SELECT name, email FROM "user" WHERE id = ${targetId} LIMIT 1`,
    )) as { name: string | null; email: string | null } | undefined;
    if (!before) throw new Error("That person was not found.");

    await db.run(sql`UPDATE "user" SET name = ${name} WHERE id = ${targetId}`);
    await writeAppState("refresh-signal", { ts: Date.now() });

    return {
      userId: targetId,
      email: before.email,
      previousName: before.name,
      name,
      message:
        targetId === actor.userId
          ? `Your name is now "${name}".`
          : `${before.email ?? "That person"} is now shown as "${name}". Report cards already issued keep the name they were issued with.`,
    };
  },
});
