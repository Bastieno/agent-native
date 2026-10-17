/**
 * Create a school for its head to set up.
 *
 *   pnpm provision:school --name "Green Valley Academy" --headEmail head@example.com [--headName "Mrs Okafor"]
 *
 * Operators only. Run it on the server, against the deployment's own
 * `DATABASE_URL`. Open sign-up never gives anyone a school (see
 * `server/plugins/signup-policy.ts`), so this is how a school comes to exist.
 *
 * It is a script rather than an action on purpose: every action is a tool the
 * agent and every MCP client can call, and creating schools must not be one.
 *
 * What it does:
 * - creates the school's organisation, with the head as its owner, so the
 *   head acts in it from the web app and from an MCP client alike;
 * - records the head's invitation as a school admin, so their first sign-in
 *   activates them like an invited teacher;
 * - emails the invitation when email is configured, and prints what to send
 *   otherwise.
 *
 * The head then runs `setup-school` — from the in-app agent or over MCP —
 * which makes them the school's admin and starts the setup sheet.
 */
import { loadEnv } from "@agent-native/core/scripts";
import { closeDbExec, getDbExec } from "@agent-native/core/db";
import { createOrganization } from "@agent-native/core/org";
import { putOrgSetting } from "@agent-native/core/settings";
import {
  emailStrong,
  getAppProductionUrl,
  isEmailConfigured,
  renderEmail,
  sendEmail,
} from "@agent-native/core/server";
import { nanoid } from "nanoid";

function arg(name: string): string | undefined {
  const i = process.argv.indexOf(`--${name}`);
  const value = i >= 0 ? process.argv[i + 1] : undefined;
  return value && !value.startsWith("--") ? value.trim() : undefined;
}

function fail(message: string): never {
  console.error(message);
  process.exit(1);
}

async function main() {
  loadEnv();

  const name = arg("name");
  const headEmail = arg("headEmail")?.toLowerCase();
  const headName = arg("headName") ?? "";
  if (!name || !headEmail) {
    fail(
      'Usage: pnpm provision:school --name "School name" --headEmail head@example.com [--headName "Their name"]',
    );
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(headEmail)) {
    fail(`"${headEmail}" is not an email address.`);
  }

  const exec = getDbExec();
  let existing: Array<Record<string, unknown>>;
  try {
    const { rows } = await exec.execute({
      sql: `SELECT o.id FROM organizations o
            INNER JOIN org_members m ON m.org_id = o.id
            WHERE LOWER(o.name) = ? AND LOWER(m.email) = ?`,
      args: [name.toLowerCase(), headEmail],
    });
    existing = rows as Array<Record<string, unknown>>;
  } catch {
    fail(
      "This database has no organisations table yet. Start the app against it once, so its tables are created, then run this again.",
    );
  }
  if (existing.length > 0) {
    fail(
      `${headEmail} already heads a school called "${name}" (${String(existing[0].id)}). Nothing was created.`,
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

  const appUrl = getAppProductionUrl();
  const mcpUrl = `${appUrl.replace(/\/$/, "")}/_agent-native/mcp`;

  let emailed = false;
  if (isEmailConfigured()) {
    try {
      const { html, text } = renderEmail({
        heading: `Set up ${name}`,
        paragraphs: [
          `${emailStrong(name)} is ready for you to set up.`,
          `Create your account with ${emailStrong(headEmail)}. That address is how the school knows you, so use it exactly.`,
          `You can set the school up with the assistant in the app, or from Claude or another AI app by connecting it to ${emailStrong(mcpUrl)}.`,
        ],
        cta: { label: "Open the app", url: appUrl },
        footer:
          "If you weren't expecting this, you can safely ignore this email.",
      });
      await sendEmail({
        to: headEmail,
        subject: `Set up ${name}`,
        html,
        text,
      });
      emailed = true;
    } catch (err) {
      console.error(
        `The email to ${headEmail} failed: ${err instanceof Error ? err.message : String(err)}`,
      );
    }
  }

  console.log(`Created "${name}" (${org.id}) with ${headEmail} as its head.`);
  console.log(
    emailed
      ? `Invitation emailed to ${headEmail}.`
      : `No email was sent. Tell ${headEmail} to create an account at ${appUrl} with that address.`,
  );
  console.log(`To set up from an MCP client, connect it to ${mcpUrl}.`);
}

main()
  .catch((err) => {
    console.error(err instanceof Error ? err.message : err);
    process.exitCode = 1;
  })
  .finally(() => closeDbExec());
