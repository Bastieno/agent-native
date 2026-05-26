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
    const existingList = ((await getOrgSetting(orgId, "pending-staff-invites")) ??
      []) as PendingInvite[];
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
    ]);

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
        const { html, text } = renderEmail({
          heading: `You're invited to join ${schoolName}`,
          paragraphs: [
            `${emailStrong(userEmail)} has invited you to join their school as ${emailStrong(args.schoolRole.replace(/_/g, " "))}.`,
            `Sign in with ${emailStrong(email)} to accept the invitation and access the school portal.`,
          ],
          cta: { label: "Accept invitation", url: appUrl },
          footer: `If you weren't expecting this, you can safely ignore this email.`,
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
      message: emailSent
        ? `Invitation sent to ${args.name} (${email}). Once they sign in, tell me and I'll run finalize-staff-invite to activate their account.`
        : emailError
          ? `Invite recorded but email delivery failed: ${emailError}. Share this link manually: ${appUrl}`
          : `No email provider configured. Share this link manually: ${appUrl}. Once they sign in, tell me and I'll run finalize-staff-invite to activate their account.`,
    };
  },
});
