// guard:allow-unscoped — creates a school; the caller is an operator (script or requireOperator route).
import { getDbExec } from "@agent-native/core/db";
import { createOrganization } from "@agent-native/core/org";
import { putOrgSetting } from "@agent-native/core/settings";
import {
  emailStrong,
  getAppProductionUrl,
  isEmailConfigured,
  renderEmail,
  sendEmail,
  fromWithName,
} from "@agent-native/core/server";
import { nanoid } from "nanoid";
import { grantCredit, setBillingMode } from "../credits.js";
import { STARTER_CREDITS, creditsToCc } from "../../../shared/credits.js";
import {
  assignHost,
  hostTaken,
  inviteLink,
  slugProblem,
} from "../school-host.js";

/**
 * Create a school for its head to set up. Used by the operator console and by
 * `pnpm provision:school`, so the two cannot drift apart.
 *
 * It creates the organisation with the head as owner, records the head's
 * invitation as a school admin, starts the school on Ellai's credit with the
 * starter grant (unless `ownKey`), gives it its address, and emails the
 * invitation when email is configured.
 */

export interface ProvisionInput {
  name: string;
  headEmail: string;
  headName?: string;
  /** The school's own address: `<slug>.<SCHOOL_BASE_DOMAIN>`. */
  slug?: string;
  /** Local test schools only: no address of their own. */
  noAddress?: boolean;
  /** Leave the school on its own key instead of Ellai's credit. */
  ownKey?: boolean;
  /** Who is doing this, for the ledger. */
  by: string;
}

export interface ProvisionResult {
  orgId: string;
  name: string;
  host: string | null;
  appUrl: string;
  inviteUrl: string;
  mcpUrl: string;
  emailed: boolean;
  emailError: string | null;
  starterCredits: number;
}

/** A refusal the operator can read and fix; not a crash. */
export class ProvisionError extends Error {}

const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export function baseDomainName(): string {
  return process.env.SCHOOL_BASE_DOMAIN?.trim() || "ellai.dev";
}

/** Why an address cannot be used, or null when it is free. */
export async function addressProblem(slug: string): Promise<string | null> {
  const clean = slug.trim().toLowerCase();
  const problem = slugProblem(clean);
  if (problem) return problem;
  if (await hostTaken(`${clean}.${baseDomainName()}`)) {
    return `${clean}.${baseDomainName()} already belongs to a school.`;
  }
  return null;
}

export async function provisionSchool(
  input: ProvisionInput,
): Promise<ProvisionResult> {
  const name = input.name?.trim();
  const headEmail = input.headEmail?.trim().toLowerCase();
  const headName = input.headName?.trim() ?? "";
  if (!name || name.length < 2 || name.length > 120) {
    throw new ProvisionError("Give the school a name (2 to 120 characters).");
  }
  if (!headEmail || !EMAIL.test(headEmail)) {
    throw new ProvisionError(
      `"${input.headEmail ?? ""}" is not an email address.`,
    );
  }
  const slug = input.slug?.trim().toLowerCase() || undefined;
  if (slug) {
    const problem = await addressProblem(slug);
    if (problem) throw new ProvisionError(`Address: ${problem}`);
  } else if (!input.noAddress) {
    // The shared address has no sign-in page for a school, and a school
    // without its own address would send its invitations there.
    throw new ProvisionError(
      "Give the school an address (<name>.ellai.dev); its invitations point there.",
    );
  }

  const exec = getDbExec();
  const { rows } = await exec.execute({
    sql: `SELECT o.id FROM organizations o
          INNER JOIN org_members m ON m.org_id = o.id
          WHERE LOWER(o.name) = ? AND LOWER(m.email) = ?`,
    args: [name.toLowerCase(), headEmail],
  });
  if (rows.length > 0) {
    throw new ProvisionError(
      `${headEmail} already heads a school called "${name}". Nothing was created.`,
    );
  }

  const org = await createOrganization(name, headEmail, "owner");
  await putOrgSetting(org.id, "pending-staff-invites", [
    {
      id: nanoid(),
      email: headEmail,
      name: headName,
      schoolRole: "school_admin",
      invitedAt: Date.now(),
    },
  ] as any);

  if (!input.ownKey) {
    await setBillingMode(org.id, "managed", input.by);
    await grantCredit({
      schoolId: org.id,
      amountCc: creditsToCc(STARTER_CREDITS),
      note: "Starter credit",
      by: input.by,
    });
  }

  let appUrl = getAppProductionUrl();
  let host: string | null = null;
  if (slug) {
    host = await assignHost(org.id, `${slug}.${baseDomainName()}`);
    appUrl = `https://${host}`;
  }
  const inviteUrl = inviteLink(appUrl, headEmail);
  const mcpUrl = `${appUrl.replace(/\/$/, "")}/_agent-native/mcp`;

  let emailed = false;
  let emailError: string | null = null;
  if (isEmailConfigured()) {
    try {
      const { html, text } = renderEmail({
        heading: `Set up ${name}`,
        paragraphs: [
          `${emailStrong(name)} is ready for you to set up.`,
          `Create your account with ${emailStrong(headEmail)}. That address is how the school knows you, so use it exactly.`,
          `You can set the school up with the assistant in the app, or from Claude or another AI app by connecting it to ${emailStrong(mcpUrl)}.`,
        ],
        cta: { label: "Open the app", url: inviteUrl },
        footer:
          "If you weren't expecting this, you can safely ignore this email.",
      });
      await sendEmail({
        to: headEmail,
        subject: `Set up ${name}`,
        html,
        text,
        from: fromWithName(name),
      });
      emailed = true;
    } catch (err) {
      emailError = err instanceof Error ? err.message : String(err);
    }
  }

  return {
    orgId: org.id,
    name,
    host,
    appUrl,
    inviteUrl,
    mcpUrl,
    emailed,
    emailError,
    starterCredits: input.ownKey ? 0 : STARTER_CREDITS,
  };
}
