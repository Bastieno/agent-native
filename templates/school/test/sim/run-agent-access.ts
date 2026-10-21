import { Client } from "./client.js";
import { Findings } from "./findings.js";
import { standUpSchool } from "./setup.js";
import { checkAgentAccess } from "./agent-access.js";
import scenario from "../scenarios/nigeria-secondary.js";

/**
 * The admin's controls over the assistant, end to end: the switch, a year
 * group that differs from it, a learner sitting a paper, the day's limit and
 * the model each role runs on. Run with `pnpm journey:agent-access`; it
 * stands up its own small school and calls no model.
 */
const runId = process.env.RUN_ID ?? `a${Date.now().toString(36)}`;
const client = new Client();
const findings = new Findings();

if (!(await client.healthy())) {
  console.error("The dev server is not answering on", client.baseUrl);
  process.exit(1);
}

console.log(`\n=== Assistant controls — run ${runId} ===\n`);
const started = Date.now();
const school = await standUpSchool(
  client,
  { ...scenario, studentCount: 2 },
  findings,
  runId,
);
console.log("\n· checking who has the assistant");
await checkAgentAccess(client, school, findings);

const seconds = (Date.now() - started) / 1000;
const broken = findings.count("broken");
console.log(
  `\nDone in ${seconds.toFixed(1)}s · ${client.calls.length} calls · ${broken} broken`,
);
process.exit(broken ? 1 : 0);
