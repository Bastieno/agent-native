import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { setUserPassword } from "@agent-native/core/server";
import { and, eq, inArray, sql } from "drizzle-orm";
import { nanoid } from "nanoid";
import { z } from "zod";
import { getDb, schema } from "../server/db/index.js";
import { actorForEmail } from "../server/lib/class-access.js";
import { hostForOrg } from "../server/lib/school-host.js";
import { rowsOf } from "../server/lib/raw-sql.js";
import {
  generatePassword,
  normalizeUsername,
  usernameEmail,
} from "../server/lib/student-login.js";
import { realNameOrNull, userByEmail } from "../server/lib/user-names.js";

export default defineAction({
  description:
    "Give a learner who signs in with an ID a new password, for one who has forgotten theirs. Say who by name or by sign-in ID; a name that matches more than one learner is refused with the matches listed, so ask which. An admin may do this for any such learner; a teacher only for learners in an arm they are the form teacher of. Only for accounts made with create-student-accounts; a learner with an email address resets their own by email. Every reset is recorded (who, for whom, when), never the password. The new password is in the result and kept nowhere else.",
  schema: z.object({
    learner: z
      .string()
      .describe("The learner's name (or part of it) or their sign-in ID"),
    password: z
      .string()
      .min(8)
      .optional()
      .describe("Only when the school chose one; otherwise one is made."),
  }),
  http: { method: "POST" },
  run: async (args) => {
    const { orgId, userEmail } = currentAccess();
    if (!orgId || !userEmail) throw new Error("No school context.");
    const actor = await actorForEmail(userEmail);
    if (!actor) throw new Error("No school context.");
    const isAdmin = actor.schoolRole === "school_admin";
    if (!isAdmin && actor.schoolRole !== "teacher") {
      throw new Error("Only an admin or a form teacher can reset a password.");
    }
    const host = await hostForOrg(orgId);
    if (!host) throw new Error("This school has no address of its own.");
    const suffix = `@${host.toLowerCase()}.invalid`;
    const db = getDb();

    // A teacher sees only the learners of arms they are form teacher of, so
    // the names and IDs of everyone else stay out of reach.
    let allowed: Set<string> | null = null;
    if (!isAdmin) {
      const arms = await db
        .select({ id: schema.arms.id })
        .from(schema.arms)
        .where(
          and(
            eq(schema.arms.schoolId, orgId),
            eq(schema.arms.formTeacherUserId, actor.userId),
          ),
        );
      const rows = arms.length
        ? await db
            .select({ userId: schema.students.userId })
            .from(schema.students)
            .where(
              inArray(
                schema.students.armId,
                arms.map((a: any) => a.id),
              ),
            )
        : [];
      allowed = new Set(rows.map((r: any) => r.userId));
    }

    const asId = normalizeUsername(args.learner);
    let matches = await rowsOf<{ id: string; name: string; email: string }>(
      sql`SELECT id, name, email FROM "user" WHERE email = ${usernameEmail(asId, host)}`,
    );
    if (matches.length === 0) {
      const like = `%${args.learner.toLowerCase().replace(/[%_\\]/g, "")}%`;
      matches = await rowsOf(
        sql`SELECT id, name, email FROM "user" WHERE email LIKE ${"%" + suffix} AND lower(name) LIKE ${like} ORDER BY name LIMIT 30`,
      );
    }
    if (allowed) matches = matches.filter((m) => allowed!.has(m.id));
    matches = matches.slice(0, 8);

    const idOf = (email: string) => email.slice(0, -suffix.length);
    if (matches.length === 0) {
      throw new Error(
        isAdmin
          ? `No learner here who signs in with an ID matches "${args.learner}". A learner with an email address resets their own password by email.`
          : `No learner in your arm matches "${args.learner}". You can reset the password of a learner in an arm you are the form teacher of; otherwise ask an admin.`,
      );
    }
    if (matches.length > 1) {
      throw new Error(
        `More than one learner matches "${args.learner}": ${matches
          .map((m) => `${m.name} (${idOf(m.email)})`)
          .join(", ")}. Ask which, then use their ID.`,
      );
    }
    const [who] = matches;
    const password = args.password ?? generatePassword();
    await setUserPassword(who.id, password);

    const me = await userByEmail(userEmail);
    await db.insert(schema.passwordResets).values({
      id: nanoid(),
      schoolId: orgId,
      learnerUserId: who.id,
      learnerName: who.name,
      resetByUserId: actor.userId,
      resetByName: realNameOrNull(me?.name, userEmail) ?? userEmail,
      resetByRole: actor.schoolRole,
      createdAt: new Date().toISOString(),
    });
    return {
      name: who.name,
      username: idOf(who.email),
      password,
      message: `Password changed for ${who.name}. Give it to the learner; it is shown once and kept nowhere else.`,
    };
  },
});
