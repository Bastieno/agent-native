import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { createPasswordUser } from "@agent-native/core/server";
import { z } from "zod";
import { jsonish } from "../shared/zod-json.js";
import { hostForOrg, schoolAppUrl } from "../server/lib/school-host.js";
import { sheetPath } from "../shared/credentials-sheet.js";
import { recordStudentInvite } from "../server/lib/student-invite.js";
import {
  generatePassword,
  normalizeUsername,
  usernameEmail,
  usernameProblem,
} from "../server/lib/student-login.js";

export default defineAction({
  description:
    "Create learner accounts that sign in with an ID (their admission number) and a password, for learners who have no email address. Give each learner's name and ID, and their year group when known; a starting password is made for each unless one is given. The passwords are in the result and are not kept anywhere else, so hand them over (the result includes a link to a printable sheet of cards) and tell the learner to keep theirs. Needs the school to have its own address; get-school-config shows it. Use invite-student instead when the learner has an email address.",
  schema: z.object({
    students: jsonish(
      z
        .array(
          z.object({
            name: z.string().describe("Full name, e.g. 'Ada Obi'"),
            username: z
              .string()
              .describe(
                "Their sign-in ID, usually the admission number, e.g. '2026/0142'. Typed in any case; slashes become hyphens.",
              ),
            gradeLevel: z
              .string()
              .optional()
              .describe("Year group, by the school's own name or its id."),
            fields: z.record(z.string(), z.unknown()).optional(),
            password: z
              .string()
              .min(8)
              .optional()
              .describe("Only when the school chose one; otherwise made."),
          }),
        )
        .min(1)
        .max(200),
    ).describe("The learners to create, at most 200 at a time."),
  }),
  http: { method: "POST" },
  run: async (args) => {
    const { orgId, userEmail } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const host = await hostForOrg(orgId);
    if (!host) {
      throw new Error(
        "This school has no address of its own yet, and learner IDs are tied to it. Ask the operator to give the school one (provision with --slug), or invite learners by email with invite-student.",
      );
    }

    const created: {
      name: string;
      username: string;
      password: string;
      gradeLevel: string | null;
    }[] = [];
    const failed: { name: string; username: string; reason: string }[] = [];
    const seen = new Set<string>();

    // One at a time: each writes the school's pending list under a lock.
    for (const s of args.students as {
      name: string;
      username: string;
      gradeLevel?: string;
      fields?: Record<string, unknown>;
      password?: string;
    }[]) {
      const username = normalizeUsername(s.username);
      const fail = (reason: string) =>
        failed.push({ name: s.name, username: s.username, reason });
      const problem = usernameProblem(username);
      if (problem) {
        fail(problem);
        continue;
      }
      if (seen.has(username)) {
        fail("The same ID appears twice in this list.");
        continue;
      }
      seen.add(username);
      const email = usernameEmail(username, host);
      const password = s.password ?? generatePassword();
      try {
        const invite = await recordStudentInvite({
          orgId,
          userEmail,
          email,
          name: s.name,
          gradeLevel: s.gradeLevel,
          fields: s.fields,
        });
        await createPasswordUser({ email, name: s.name, password });
        created.push({
          name: s.name,
          username,
          password,
          gradeLevel: invite.gradeLevelName ?? null,
        });
      } catch (err) {
        fail(err instanceof Error ? err.message : String(err));
      }
    }

    const base = await schoolAppUrl(orgId, "");
    const signInAddress = `${base}/login`;
    // The credentials ride in the link's fragment, which a browser never sends
    // to a server, so the printable sheet needs nothing stored.
    const printSheetUrl = created.length
      ? `${base}${sheetPath({
          address: signInAddress,
          rows: created.map((c) => ({
            n: c.name,
            u: c.username,
            p: c.password,
            g: c.gradeLevel,
          })),
        })}`
      : null;
    return {
      signInAddress,
      printSheetUrl,
      created,
      failed,
      message: `${created.length} account${created.length === 1 ? "" : "s"} created${
        failed.length ? `, ${failed.length} not` : ""
      }. Each learner signs in at the address above with their ID and the password given; their record is made on first sign-in. These passwords are shown once and kept nowhere else. Open printSheetUrl for a printable sheet of cards to cut up and hand out; keep that link private, because it carries the passwords.`,
    };
  },
});
