import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { setUserPassword } from "@agent-native/core/server";
import { getUserIdByEmail } from "../server/lib/student-access.js";
import { z } from "zod";
import { hostForOrg } from "../server/lib/school-host.js";
import {
  generatePassword,
  normalizeUsername,
  usernameEmail,
} from "../server/lib/student-login.js";

export default defineAction({
  description:
    "Give a learner who signs in with an ID a new password, for one who has forgotten theirs. Only for accounts made with create-student-accounts; a learner with an email address resets their own. The new password is in the result and kept nowhere else.",
  schema: z.object({
    username: z.string().describe("The learner's sign-in ID"),
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
    const email = usernameEmail(normalizeUsername(args.username), host);
    const userId = await getUserIdByEmail(email);
    if (!userId) {
      throw new Error(
        `No learner here signs in with the ID "${args.username}". Check it with list-students.`,
      );
    }
    const password = args.password ?? generatePassword();
    await setUserPassword(userId, password);
    return {
      username: normalizeUsername(args.username),
      password,
      message:
        "Password changed. Give it to the learner; it is shown once and kept nowhere else.",
    };
  },
});
