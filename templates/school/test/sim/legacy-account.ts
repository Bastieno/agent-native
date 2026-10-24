/**
 * Make an account the way anyone could before sign-up was invitation-only.
 *
 *   DATABASE_URL=file:./data/journeys.db tsx test/sim/legacy-account.ts <email>
 *
 * For the invite-only journey only: it needs an account that belongs to no
 * school, and an invitation-only server will not make one. This calls Better
 * Auth's own sign-up directly, with no sign-up rule registered, against the
 * server's database — exactly what the email form did before the rule.
 */
import { loadEnv } from "@agent-native/core/scripts";
import { closeDbExec } from "@agent-native/core/db";
// The framework does not export its Better Auth instance to templates; this is
// test tooling inside the monorepo, so it reaches for the source directly.
import { getBetterAuth } from "../../../../packages/core/src/server/better-auth-instance.js";
import { TEST_PASSWORD } from "./client.js";

async function main() {
  loadEnv();
  const email = process.argv[2]?.trim().toLowerCase();
  if (!email) throw new Error("usage: legacy-account.ts <email>");
  const auth = await getBetterAuth();
  await auth.api.signUpEmail({
    body: { email, password: TEST_PASSWORD, name: email.split("@")[0] },
  });
  console.log(`made ${email}`);
  await closeDbExec();
  process.exit(0);
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
