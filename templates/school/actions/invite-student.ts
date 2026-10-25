import { recordStudentInvite } from "../server/lib/student-invite.js";
import { inviteLink, schoolAppUrl } from "../server/lib/school-host.js";
import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { putOrgSetting, getOrgSetting } from "@agent-native/core/settings";
import {
  sendEmail,
  fromWithName,
  isEmailConfigured,
  getAppProductionUrl,
  renderEmail,
  emailStrong,
} from "@agent-native/core/server";
import { getDbExec } from "@agent-native/core/db";
import { nanoid } from "nanoid";
import { realNameOrNull, userByEmail } from "../server/lib/user-names.js";
import { z } from "zod";
import { withOrgSettingLock } from "../server/lib/org-setting-lock.js";
import { getDb, schema } from "../server/db/index.js";
import { and, eq, isNull, or } from "drizzle-orm";
import { jsonish } from "../shared/zod-json.js";
import {
  checkFieldValues,
  studentFieldDefs,
} from "../server/lib/custom-field-values.js";

interface PendingStudentInvite {
  id: string;
  email: string;
  name: string;
  invitedAt: number;
  /** The year group they are joining, when it is already settled. */
  gradeLevelId?: string;
  gradeLevelName?: string;
  /** Values for the school's own student fields, checked when given. */
  fields?: Record<string, unknown>;
}

export default defineAction({
  description:
    "Invite a student by email, with their year group and anything else the school records about a student. Sends an invitation email if an email provider is configured. Their record is created on first sign-in, carrying whatever was given here. Run get-custom-fields-schema first to see what this school records; ask the person inviting rather than guessing.",
  schema: z.object({
    email: z.string().email().describe("Student's email address"),
    name: z.string().describe("Student's full name, e.g. 'John Doe'"),
    gradeLevel: z
      .string()
      .optional()
      .describe(
        "The year group they are joining, by the school's own name for it or its id. Optional — a school may invite before placement is settled.",
      ),
    fields: jsonish(z.record(z.string(), z.unknown()))
      .optional()
      .describe(
        'Values for this school\'s own student fields, by field name, e.g. {"stream":"Science"}. Refused if a name or an option is not one the school defined.',
      ),
  }),
  http: { method: "POST" },
  run: async (args) => {
    const { orgId, userEmail } = currentAccess();
    if (!orgId) throw new Error("No org context. Are you logged in?");

    const email = args.email.trim().toLowerCase();

    const recorded = await recordStudentInvite({
      orgId,
      userEmail,
      email,
      name: args.name,
      gradeLevel: args.gradeLevel,
      fields: args.fields as Record<string, unknown> | undefined,
    });

    const schoolConfig = (await getOrgSetting(orgId, "school-config")) as {
      name?: string;
      replyToEmail?: string | null;
    } | null;
    const schoolName = schoolConfig?.name ?? "your school";
    const appUrl = await schoolAppUrl(orgId, getAppProductionUrl());
    const link = inviteLink(appUrl, email);
    const emailConfigured = isEmailConfigured();

    let emailSent = false;
    let emailError: string | undefined;

    if (emailConfigured) {
      try {
        // Same shape as the staff invitation: the school invites, the
        // sender is recorded at the foot, and the first visit creates the
        // account rather than signing in to one that does not exist.
        const inviter = userEmail ? await userByEmail(userEmail) : null;
        const inviterName = realNameOrNull(inviter?.name, userEmail);

        const { html, text } = renderEmail({
          heading: `You've been invited to join ${schoolName}`,
          paragraphs: [
            `${emailStrong(schoolName)} has invited you to join as a student.`,
            `Create your account with ${emailStrong(email)} to accept. That address is how the invitation reaches you, so use it exactly.`,
          ],
          cta: { label: "Accept invitation", url: link },
          footer: `${
            userEmail
              ? `Invited by ${inviterName ? `${inviterName} (${userEmail})` : userEmail}. `
              : ""
          }If you weren't expecting this, you can safely ignore this email.`,
        });
        await sendEmail({
          to: email,
          subject: `You've been invited to join ${schoolName}`,
          html,
          text,
          from: fromWithName(schoolName),
          // The school's own address, else whoever sent the invitation.
          replyTo: schoolConfig?.replyToEmail || userEmail || undefined,
        });
        emailSent = true;
      } catch (err) {
        emailError = err instanceof Error ? err.message : String(err);
        console.error("[invite-student] failed to send email:", err);
      }
    }

    const gradeLevelName = recorded.gradeLevelName;
    const fieldValues = recorded.fields ?? {};
    const defs = await studentFieldDefs(orgId);

    // Name the fields nobody answered, at the one moment someone could.
    // Left unsaid, a field added last month quietly stays empty for every
    // student invited since.
    const unanswered = defs
      .filter((d) => fieldValues[d.name] === undefined)
      .map((d) => d.label ?? d.name);

    return {
      success: true,
      email,
      name: args.name,
      gradeLevel: gradeLevelName ?? null,
      fields: Object.keys(fieldValues).length ? fieldValues : null,
      fieldsNotGiven: unanswered.length ? unanswered : null,
      emailSent,
      emailError: emailError ?? null,
      inviteUrl: link,
      message: emailSent
        ? `Invitation emailed to ${args.name} (${email})${gradeLevelName ? `, joining ${gradeLevelName}` : ""}. They must create their account with that address for the invitation to apply; they are activated as a student on first sign-in, and anything recorded here is written onto their record then.`
        : emailError
          ? `Invite recorded, but the email failed to send: ${emailError}. Nobody has been told — share this link with ${args.name} yourself: ${link}`
          : `Invite recorded, but no email was sent — the school has no email provider set up. Share this link with ${args.name} yourself: ${link}`,
    };
  },
});
