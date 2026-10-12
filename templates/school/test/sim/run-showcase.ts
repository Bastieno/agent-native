import { Client } from "./client.js";
import { Findings } from "./findings.js";
import scenario from "../scenarios/showcase-crestfield.js";
import { buildSchool } from "./showcase/build.js";
import { buildCurricula, lessonNoteHistory } from "./showcase/curriculum.js";
import { buildTimetable } from "./showcase/timetable.js";
import { prepareWeek } from "./showcase/curriculum.js";
import {
  findReadings,
  teachSchoolWeek,
  type PieceResult,
} from "./showcase/teaching.js";
import { examWeek, revisionWeek } from "./showcase/exams.js";
import { checklist, writeOutputs } from "./showcase/outputs.js";

/**
 * The showcase school: a whole Nigerian secondary school built, staffed,
 * timetabled and taught for ten weeks through the app's own actions, so the
 * owner can sign in as anyone in it and look around.
 *
 * Run with `pnpm showcase:school` against a running dev server. Each run
 * builds a fresh school under its own run id and fails if any feature on the
 * spec's checklist ends empty. See docs/showcase-school-spec.md.
 *
 * SHOWCASE_STOP_AFTER=<phase> stops early, for working on one phase.
 */
const runId = process.env.RUN_ID ?? `c${Date.now().toString(36)}`;
const stopAfter = process.env.SHOWCASE_STOP_AFTER;
const client = new Client();
const findings = new Findings();

if (!(await client.healthy())) {
  console.error("The dev server is not answering on", client.baseUrl);
  process.exit(1);
}

console.log(
  `\n=== ${scenario.schoolName}, ${scenario.city} — showcase run ${runId} ===\n`,
);
const started = Date.now();
const timings: Record<string, number> = {};
const phase = async <T>(label: string, work: () => Promise<T>): Promise<T> => {
  const at = Date.now();
  const result = await work();
  timings[label] = (Date.now() - at) / 1000;
  console.log(`  ${label} took ${timings[label].toFixed(1)}s\n`);
  return result;
};

const run = await phase("build", () =>
  buildSchool(client, scenario, findings, runId),
);
const setup = await client.as(run.admin, "check-school-setup", {});
console.log(
  "  setup gaps:",
  JSON.stringify(setup?.gaps ?? [], null, 1).slice(0, 2000),
);
const stop = (label: string) => {
  if (stopAfter !== label) return;
  console.log(
    `\nstopped after ${label} in ${((Date.now() - started) / 1000).toFixed(1)}s, ${client.calls.length} calls; ${findings.all.length} findings`,
  );
  process.exit(0);
};
stop("build");

await phase("curriculum", () => buildCurricula(run));
stop("curriculum");
await phase("timetable", () => buildTimetable(run));
stop("timetable");

// ── Weeks 1 to 10 ────────────────────────────────────────────────────────
const readings = await findReadings(run);
const pieces: PieceResult[] = [];
const weeksToTeach = scenario.teachingWeeks.slice(
  0,
  Number(process.env.SHOWCASE_WEEKS ?? scenario.teachingWeeks.length),
);
await phase("teaching", async () => {
  for (const week of weeksToTeach) {
    const at = Date.now();
    await prepareWeek(run, week);
    if (week === 8) await lessonNoteHistory(run);
    const results = await teachSchoolWeek(run, week, readings);
    pieces.push(...results);
    const handed = results.reduce((n, r) => n + r.handedIn, 0);
    const set = results.reduce((n, r) => n + r.set, 0);
    const averages = results
      .map((r) => r.average)
      .filter((a): a is number => a !== null);
    console.log(
      `  week ${week}: ${results.length} pieces, ${handed} of ${set} handed in, average ${averages.length ? Math.round(averages.reduce((a, b) => a + b, 0) / averages.length) : "—"}%, ${results.reduce((n, r) => n + r.flagged, 0)} marks flagged (${((Date.now() - at) / 1000).toFixed(1)}s)`,
    );
    if (!(await client.healthy())) {
      findings.add(
        "broken",
        "infrastructure",
        "the dev server stopped answering mid-term",
        `after week ${week}`,
      );
      break;
    }
  }
});
run.record.pieces = pieces;
stop("teaching");

// ── Weeks 11 and 12 ──────────────────────────────────────────────────────
await phase("revision and exams", async () => {
  await revisionWeek(run);
  await examWeek(run);
});

// What was deliberately left out, so nobody mistakes it for something missed.
const unset: [string, string][] = [
  [
    "Assessment styles",
    "the app ships styles for five SS subjects only (English Language, Mathematics, Physics, Chemistry, Biology); every other subject's questions are worded plainly, which check-school-setup reports",
  ],
  [
    "A separate JSS grading scale",
    "the app holds one scale per school, so JSS uses the WAEC A1–F9 scale too",
  ],
  [
    "Late hand-ins",
    "the app records only handed in or not, so lateness is not modelled; work not handed in counts as zero",
  ],
  [
    "Year-group struggling lists",
    'the app answers "who is struggling?" per class only; the year-group lists here are the learners flagged in at least a third of their classes',
  ],
  [
    "Report cards",
    "end-of-term report cards come after the examinations are sat, and the examinations are left unsat",
  ],
  ["Second and Third Terms", "dates only; nothing is taught in them"],
  ["Attendance", "the app has no attendance feature"],
  [
    "Lateness of lesson notes by teachers",
    `the ${scenario.behindOnNotes.arms.join(" and ")} classes stop marking notes ready from week ${scenario.behindOnNotes.fromWeek}, on purpose, so "who hasn't prepared?" has an answer`,
  ],
];
for (const [what, why] of unset)
  run.decisions.add("Left unset, and why", what, why);
run.decisions.add(
  "Differentiation classes",
  "Classes",
  scenario.differentiationClasses
    .map((d) => `${d.arm} ${d.subject}`)
    .join(", "),
);
run.decisions.add(
  "Differentiation classes",
  "When",
  `weeks ${scenario.differentiationWeeks.join(", ")}: the class is grouped from its marks, then sits one worksheet at three standards assigned by group`,
);
run.decisions.add(
  "Differentiation classes",
  "Struggling learners listed",
  `after weeks ${scenario.strugglingWeeks.join(", ")}, for every class`,
);
run.decisions.add(
  "Activity mix per subject",
  "Each week",
  `every class gets the week's reading and one marked piece in rotation (${scenario.activityRotation.join(", ")}; a practical only where the subject has a lab), plus a card deck every other week; quizzes are one question at a time with a 10-minute limit and per-question limits`,
);

const rows = await phase("checklist", () => checklist(run, pieces));
const dir = await writeOutputs(run, rows, timings);
const empty = rows.filter((r) => !r.ok);
const seconds = (Date.now() - started) / 1000;
console.log(`\nDone in ${seconds.toFixed(1)}s · ${client.calls.length} calls`);
for (const r of rows)
  console.log(`  ${r.ok ? "ok   " : "EMPTY"} ${r.area}: ${r.evidence}`);
console.log(
  `findings: ${findings.count("broken")} broken, ${findings.count("wrong")} wrong, ${findings.count("missing")} missing`,
);
console.log(`files: ${dir} (copied to docs/showcase/)`);
if (empty.length) {
  console.error(
    `\n${empty.length} checklist feature(s) ended empty: ${empty.map((r) => r.area).join(", ")}`,
  );
  process.exit(1);
}
