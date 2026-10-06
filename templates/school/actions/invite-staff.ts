import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { putOrgSetting, getOrgSetting } from "@agent-native/core/settings";
import { getDbExec } from "@agent-native/core/db";
import {
  sendEmail,
  isEmailConfigured,
  getAppProductionUrl,
  renderEmail,
  emailStrong,
} from "@agent-native/core/server";
import { nanoid } from "nanoid";
import { realNameOrNull, userByEmail } from "../server/lib/user-names.js";
import { z } from "zod";

interface PendingInvite {
  id: string;
  email: string;
  name: string;
  schoolRole: string;
  invitedAt: number;
}

export default defineAction({
  description:
    "Invite a staff member (teacher, subject coordinator, or school admin) by email. Sends an invitation email if an email provider is configured (RESEND_API_KEY or SENDGRID_API_KEY), otherwise returns the invite link for manual sharing.",
  schema: z.object({
    email: z.string().email().describe("Staff member's email address"),
    name: z.string().describe("Staff member's full name, e.g. 'Ms Adaeze Obi'"),
    schoolRole: z
      .enum(["teacher", "subject_coordinator", "school_admin"])
      .describe("Role within the school"),
  }),
  http: { method: "POST" },
  run: async (args) => {
    const { orgId, userEmail } = currentAccess();
    if (!orgId) throw new Error("No org context. Are you logged in?");
    if (!userEmail) throw new Error("No user email in context.");

    const email = args.email.trim().toLowerCase();

    // Check for duplicate in our own pending list
    const existingList = ((await getOrgSetting(
      orgId,
      "pending-staff-invites",
    )) ?? []) as PendingInvite[];
    if (existingList.some((inv) => inv.email === email)) {
      throw new Error(
        `An invitation is already pending for ${email}. They should check their inbox (or spam folder).`,
      );
    }

    // Try to insert into the framework org_invitations table (best-effort)
    try {
      const exec = getDbExec();
      await exec.execute({
        sql: `INSERT INTO org_invitations (id, org_id, email, invited_by, created_at, status, role) VALUES (?, ?, ?, ?, ?, 'pending', 'member')`,
        args: [nanoid(), orgId, email, userEmail, Date.now()],
      });
    } catch {
      // Non-fatal — our own pending list is the source of truth for the UI
    }

    // Store in our pending invites list (source of truth for the staff page)
    const invite: PendingInvite = {
      id: nanoid(),
      email,
      name: args.name,
      schoolRole: args.schoolRole,
      invitedAt: Date.now(),
    };
    await putOrgSetting(orgId, "pending-staff-invites", [
      ...existingList,
      invite,
    ] as any);

    const schoolConfig = (await getOrgSetting(orgId, "school-config")) as {
      name?: string;
    } | null;
    const schoolName = schoolConfig?.name ?? "your school";
    const appUrl = getAppProductionUrl();
    const emailConfigured = isEmailConfigured();

    let emailSent = false;
    let emailError: string | undefined;

    if (emailConfigured) {
      try {
        // The school does the inviting, because that is the part always
        // true. The person who sent it goes at the foot as what is actually
        // recorded — a name only when someone gave one, otherwise the
        // address alone. Signing up derives a name from the address, so
        // leading with it would introduce "admin" as a colleague.
        const inviter = await userByEmail(userEmail);
        const inviterName = realNameOrNull(inviter?.name, userEmail);
        const role = args.schoolRole.replace(/_/g, " ");
        const article = /^[aeiou]/i.test(role) ? "an" : "a";

        const { html, text } = renderEmail({
          heading: `You're invited to join ${schoolName}`,
          paragraphs: [
            `${emailStrong(schoolName)} has invited you to join as ${article} ${emailStrong(role)}.`,
            // There is no account yet: the first visit creates one, and the
            // invitation is matched by the address it was sent to.
            `Create your account with ${emailStrong(email)} to accept. That address is how the invitation reaches you, so use it exactly.`,
          ],
          cta: { label: "Accept invitation", url: appUrl },
          footer: `Invited by ${
            inviterName ? `${inviterName} (${userEmail})` : userEmail
          }. If you weren't expecting this, you can safely ignore this email.`,
        });
        await sendEmail({
          to: email,
          subject: `You're invited to join ${schoolName}`,
          html,
          text,
        });
        emailSent = true;
      } catch (err) {
        emailError = err instanceof Error ? err.message : String(err);
        console.error("[invite-staff] failed to send email:", err);
      }
    }

    return {
      success: true,
      email,
      name: args.name,
      schoolRole: args.schoolRole,
      emailSent,
      emailError: emailError ?? null,
      inviteUrl: appUrl,
      // This used to promise to run finalize-staff-invite after sign-in, which
      // the guide forbids in the normal flow: the account activates itself.
      // inviteUrl is the school's sign-in address, the same for everyone —
      // an invitation is matched by the email address it was sent to, not by
      // a token in the link. Saying so stops an agent reporting a missing
      // token as a fault, and stops anyone expecting a personal link.
      inviteUrlNote: `This is the school's sign-in address, the same for everyone. The invitation is matched by email address, so ${args.name} must sign in with ${email} for it to apply.`,
      message: emailSent
        ? `Invitation emailed to ${args.name} (${email}). They must sign in with that address for the invitation to apply. Their account activates on first sign-in; after that they can be given classes.`
        : emailError
          ? `Invite recorded, but the email failed to send: ${emailError}. Nobody has been told — send ${args.name} the school's sign-in address yourself: ${appUrl}, and tell them to sign in with ${email}.`
          : `Invite recorded, but no email was sent — the school has no email provider set up. Send ${args.name} the school's sign-in address yourself: ${appUrl}, and tell them to sign in with ${email}. Their account activates on first sign-in; after that they can be given classes.`,
    };
  },
});
