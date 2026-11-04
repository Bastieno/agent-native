/**
 * A school on Ellai's credit, end to end.
 *
 *   pnpm journey:credits
 *
 * Against the journeys server (`pnpm dev:journeys`, port 8132). A school is
 * provisioned the way an operator does it, so it starts on credit with a
 * starter grant; the operator's own scripts then take that credit away and
 * give it back, and a real chat message shows what the server did each time.
 * No model is called: a message the server lets through is read from the
 * model header and dropped.
 */
import { spawnSync } from "node:child_process";
import { Client } from "./client.js";

const DATABASE_URL =
  process.env.JOURNEY_DATABASE_URL ?? "file:./data/journeys.db";
const client = new Client();
const run = Date.now().toString(36);
let failures = 0;

function check(ok: unknown, what: string): void {
  if (ok) console.log(`  ok  ${what}`);
  else {
    failures++;
    console.log(`  FAILED  ${what}`);
  }
}

function script(file: string, args: string[]) {
  const result = spawnSync("npx", ["tsx", file, ...args], {
    encoding: "utf8",
    env: {
      ...process.env,
      DATABASE_URL,
      RESEND_API_KEY: "",
      SENDGRID_API_KEY: "",
    },
  });
  if (result.status !== 0) {
    throw new Error(`${file} ${args.join(" ")} failed: ${result.stderr}`);
  }
  return result.stdout;
}

async function main() {
  if (!(await client.healthy())) {
    console.error("The dev server is not answering on", client.baseUrl);
    process.exit(1);
  }
  console.log(`\n=== Assistant credit — run ${run} ===\n`);

  const name = `Credit School ${run}`;
  const headEmail = `head.${run}@credit-sim.test`;
  const out = script("ops/provision-school.ts", [
    "--name",
    name,
    "--headEmail",
    headEmail,
    "--no-address",
  ]);
  const orgId = /\(([^)]+)\) with /.exec(out)?.[1];
  if (!orgId) throw new Error(`could not read the school id from: ${out}`);
  const head = await client.signUp(headEmail, "Head", "admin");
  await client.as(head, "setup-school", { name, type: "secondary" });

  console.log("A new school starts on credit");
  let credit = await client.as(head, "get-school-credit");
  check(credit.mode === "managed", "it is on Ellai's credit");
  check(
    credit.credits === 5000,
    `it has the 5,000 starter credits (${credit.credits})`,
  );
  check(
    credit.history?.[0]?.kind === "grant" &&
      credit.history[0].note === "Starter credit",
    "the starter grant is in its ledger",
  );
  let reply = await client.chat(head, "hello");
  check(!!reply.model, "its admin gets the assistant");

  console.log("\nWhen the credit runs out");
  script("ops/credits.ts", [
    "grant",
    "--school",
    orgId,
    "--credits",
    "-5000",
    "--note",
    "simulate running out",
  ]);
  credit = await client.as(head, "get-school-credit");
  check(credit.out === true && credit.credits === 0, "the balance is zero");
  reply = await client.chat(head, "hello");
  check(
    !reply.model && /used up its credit/.test(reply.reply),
    `no model runs and the admin is told calmly (${reply.reply.slice(0, 60)})`,
  );

  console.log("\nA top-up restores it at once");
  await client.as(head, "request-credit-top-up", {
    credits: 10000,
    reference: "SIM-1",
  });
  script("ops/credits.ts", [
    "grant",
    "--school",
    orgId,
    "--credits",
    "10000",
    "--ref",
    "SIM-1",
  ]);
  credit = await client.as(head, "get-school-credit");
  // The first message really ran, and what it cost is already taken off.
  check(
    credit.credits > 9000 && credit.credits <= 10000,
    `the grant is added, less what the first message used (${credit.credits})`,
  );
  check(
    credit.history.some((e: any) => e.reference === "SIM-1"),
    "the payment reference is kept",
  );
  reply = await client.chat(head, "hello");
  check(!!reply.model, "the assistant is back");

  console.log("\nA school's own key");
  await client.as(head, "save-assistant-key", {
    key: "sk-ant-" + "a".repeat(30),
  });
  credit = await client.as(head, "get-school-credit");
  check(credit.mode === "byo", "saving its own key moves it off the credit");
  check(credit.credits > 9000, "the credit left is kept");
  await client.as(head, "switch-assistant-billing", { mode: "managed" });
  credit = await client.as(head, "get-school-credit");
  check(credit.mode === "managed", "it can switch back to the credit");

  console.log(failures ? `\n${failures} failed` : "\nAll passed");
  process.exit(failures ? 1 : 0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
