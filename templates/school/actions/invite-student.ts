import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { putOrgSetting, getOrgSetting } from "@agent-native/core/settings";
import {
  sendEmail,
  isEmailConfigured,
  getAppProductionUrl,
  renderEmail,
  emailStrong,
} from "@agent-native/core/server";
import { nanoid } from "nanoid";
import { z } from "zod";

interface PendingStudentInvite {
  id: string;
  email: string;
  name: string;
  invitedAt: number;
}

export default defineAction({
  description:
    "Invite a student by email. Sends an invitation email if an email provider is configured. Once they sign in, their student profile is automatically activated.",
  schema: z.object({
    email: z.string().email().describe("Student's email address"),
    name: z.string().describe("Student's full name, e.g. 'John Doe'"),
  }),
  http: { method: "POST" },
  run: async (args) => {
    const { orgId, userEmail } = currentAccess();
    if (!orgId) throw new Error("No org context. Are you logged in?");

    const email = args.email.trim().toLowerCase();

    const existingList = ((await getOrgSetting(
      orgId,
      "pending-student-invites",
    )) ?? []) as PendingStudentInvite[];

    if (existingList.some((inv) => inv.email === email)) {
      throw new Error(
        `An invitation is already pending for ${email}. They should check their inbox (or spam folder).`,
      );
    }

    const invite: PendingStudentInvite = {
      id: nanoid(),
      email,
      name: args.name,
      invitedAt: Date.now(),
    };
    await putOrgSetting(orgId, "pending-student-invites", [
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
        const { html, text } = renderEmail({
          heading: `You've been invited to join ${schoolName}`,
          paragraphs: [
            `${emailStrong(userEmail ?? "Your school admin")} has invited you to join ${emailStrong(schoolName)} as a student.`,
            `Sign in with ${emailStrong(email)} to accept the invitation and access the student portal.`,
          ],
          cta: { label: "Accept invitation", url: appUrl },
          footer: `If you weren't expecting this, you can safely ignore this email.`,
        });
        await sendEmail({
          to: email,
          subject: `You've been invited to join ${schoolName}`,
          html,
          text,
        });
        emailSent = true;
      } catch (err) {
        emailError = err instanceof Error ? err.message : String(err);
        console.error("[invite-student] failed to send email:", err);
      }
    }

    return {
      success: true,
      email,
      name: args.name,
      emailSent,
      emailError: emailError ?? null,
      inviteUrl: appUrl,
      message: emailSent
        ? `Invitation sent to ${args.name} (${email}). They'll be automatically activated as a student when they sign in.`
        : emailError
          ? `Invite recorded but email delivery failed: ${emailError}. Share this link manually: ${appUrl}`
          : `No email provider configured. Share this link manually: ${appUrl}`,
    };
  },
});
