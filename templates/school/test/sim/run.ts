import { Client } from "./client.js";
import { Findings } from "./findings.js";
import { standUpSchool } from "./setup.js";
import { buildCurriculum, teachWeek, checkGrouping } from "./term.js";
import { closeTerm, checkInvariants, keepPrintedPaper } from "./close.js";
import { writeReport } from "./report.js";
import { join } from "node:path";
import scenario from "../scenarios/nigeria-secondary.js";

/**
 * Phase A: one class, one term, start to finish.
 *
 * Run with `pnpm journey`. It creates its own school every time, so nothing
 * it does touches a school anyone is using.
 */
const runId = process.env.RUN_ID ?? `r${Date.now().toString(36)}`;

const client = new Client();
const findings = new Findings();

if (!(await client.healthy())) {
  console.error("The dev server is not answering on", client.baseUrl);
  process.exit(1);
}

console.log(`\n=== ${scenario.schoolName} — run ${runId} ===\n`);
const started = Date.now();
const school = await standUpSchool(client, scenario, findings, runId);
console.log(
  `\nSchool ${school.schoolId} ready in ${((Date.now() - started) / 1000).toFixed(1)}s`,
);
console.log(
  `${school.students.length} students, class ${school.classId}, ${client.calls.length} calls`,
);

console.log("\n· building the curriculum");
await buildCurriculum(client, school, scenario, findings);

console.log("\n· teaching the term");
const weeks: Awaited<ReturnType<typeof teachWeek>>[] = [];
for (const week of scenario.weeks) {
  weeks.push(await teachWeek(client, school, scenario, week, findings));
  // Grouping is only meaningful once there are marks to group on.
  if (week.week === 3) await checkGrouping(client, school, findings);
}
await checkGrouping(client, school, findings);

console.log("\n· closing the term");
const dir = join("test-runs", `${scenario.key}-${runId}`);
await closeTerm(client, school, findings, dir);
await keepPrintedPaper(client, school, weeks[0].assessmentId, dir, findings);

// Did teaching show? The class should be doing better at the end than at
// the start — and if the app cannot show that, a term of marking is wasted.
const early = weeks.slice(0, 2).map((w) => w.averagePercent ?? 0);
const late = weeks.slice(-2).map((w) => w.averagePercent ?? 0);
const lift =
  late.reduce((a, b) => a + b, 0) / late.length -
  early.reduce((a, b) => a + b, 0) / early.length;
console.log(
  `  improvement across the term: ${lift >= 0 ? "+" : ""}${lift.toFixed(1)} points`,
);
findings.expect(
  "improvement",
  lift > 0,
  "the class average rises across a term in which most learners improve",
  `${lift.toFixed(1)} points between the first two weeks and the last two`,
  "wrong",
);

console.log("\n· checking what must never be true");
await checkInvariants(client, school, findings);

const seconds = (Date.now() - started) / 1000;
const report = await writeReport({
  dir,
  runId,
  scenario,
  school,
  weeks,
  findings,
  client,
  seconds,
});
console.log(`\nDone in ${seconds.toFixed(1)}s · ${client.calls.length} calls`);
console.log(`report: ${report}`);
console.log(
  `findings: ${findings.count("broken")} broken, ${findings.count("wrong")} wrong, ${findings.count("missing")} missing, ${findings.count("wording")} wording`,
);
