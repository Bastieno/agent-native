/**
 * Create a school for its head to set up.
 *
 *   pnpm provision:school --name "Green Valley Academy" --headEmail head@example.com [--headName "Mrs Okafor"] --slug greenvalley [--byo]
 *
 * The operator console (`/operator` on the shared address) does the same thing
 * from a page; both call `server/lib/operator/provision-school.ts`.
 *
 * The school starts on Ellai's credit with a starter grant, so its head has an
 * assistant with no key to find. `--byo` leaves it on its own key instead.
 * `--slug` is required: it gives the school its own address,
 * `<slug>.<SCHOOL_BASE_DOMAIN>` (ellai.dev unless set). On the server a
 * wildcard DNS record and Caddy's on-demand certificates bring the address
 * up by themselves; see docs/vps-plan.md.
 *
 * Operators only. Run it on the server, against the deployment's own
 * `DATABASE_URL`. Open sign-up never gives anyone a school (see
 * `server/plugins/signup-policy.ts`), so this is how a school comes to exist.
 *
 * It is a script, and the console's routes are not actions, on purpose: every
 * action is a tool the agent and every MCP client can call, and creating
 * schools must not be one.
 */
import { loadEnv } from "@agent-native/core/scripts";
import { closeDbExec } from "@agent-native/core/db";
import {
  ProvisionError,
  provisionSchool,
} from "../server/lib/operator/provision-school.js";

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
  const headEmail = arg("headEmail");
  if (!name || !headEmail) {
    fail(
      'Usage: pnpm provision:school --name "School name" --headEmail head@example.com --slug address [--headName "Their name"] [--byo]',
    );
  }
  const byo = process.argv.includes("--byo");
  const by =
    (process.env.ELLAI_OPERATOR_EMAILS ?? "").split(",")[0]?.trim() ||
    "provision";

  const r = await provisionSchool({
    name,
    headEmail,
    headName: arg("headName"),
    slug: arg("slug"),
    noAddress: process.argv.includes("--no-address"),
    ownKey: byo,
    by,
  });

  console.log(
    `Created "${r.name}" (${r.orgId}) with ${headEmail} as its head.`,
  );
  console.log(
    r.emailed
      ? `Invitation emailed to ${headEmail}.`
      : `No email was sent${r.emailError ? ` (${r.emailError})` : ""}. Tell ${headEmail} to create an account at ${r.inviteUrl} with that address.`,
  );
  console.log(`To set up from an MCP client, connect it to ${r.mcpUrl}.`);
  if (!byo) {
    console.log(
      `It starts with ${r.starterCredits.toLocaleString("en")} credits. The deployment needs ELLAI_MANAGED_ANTHROPIC_KEY set for the assistant to run on them.`,
    );
  }
}

main()
  .catch((err) => {
    console.error(
      err instanceof ProvisionError || err instanceof Error ? err.message : err,
    );
    process.exitCode = 1;
  })
  .finally(() => closeDbExec());
