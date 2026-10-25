import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { setUserPassword } from "@agent-native/core/server";
import { sql } from "drizzle-orm";
import { z } from "zod";
import { hostForOrg } from "../server/lib/school-host.js";
import { rowsOf } from "../server/lib/raw-sql.js";
import {
  generatePassword,
  normalizeUsername,
  usernameEmail,
} from "../server/lib/student-login.js";

export default defineAction({
  description:
    "Give a learner who signs in with an ID a new password, for one who has forgotten theirs. Say who by name or by sign-in ID; a name that matches more than one learner is refused with the matches listed, so ask which. Only for accounts made with create-student-accounts; a learner with an email address resets their own. The new password is in the result and kept nowhere else.",
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
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const host = await hostForOrg(orgId);
    if (!host) throw new Error("This school has no address of its own.");
    const suffix = `@${host.toLowerCase()}.invalid`;

    // Only this school's ID accounts are candidates: their made-up address
    // ends with this school's own address.
    const asId = normalizeUsername(args.learner);
    let matches = await rowsOf<{ id: string; name: string; email: string }>(
      sql`SELECT id, name, email FROM "user" WHERE email = ${usernameEmail(asId, host)}`,
    );
    if (matches.length === 0) {
      const like = `%${args.learner.toLowerCase().replace(/[%_\\]/g, "")}%`;
      matches = await rowsOf(
        sql`SELECT id, name, email FROM "user" WHERE email LIKE ${"%" + suffix} AND lower(name) LIKE ${like} ORDER BY name LIMIT 8`,
      );
    }
    const idOf = (email: string) => email.slice(0, -suffix.length);
    if (matches.length === 0) {
      throw new Error(
        `No learner here who signs in with an ID matches "${args.learner}". A learner with an email address resets their own password by email.`,
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
    return {
      name: who.name,
      username: idOf(who.email),
      password,
      message: `Password changed for ${who.name}. Give it to the learner; it is shown once and kept nowhere else.`,
    };
  },
});
