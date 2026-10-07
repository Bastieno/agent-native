import { join } from "node:path";
import { mkdir, writeFile } from "node:fs/promises";
import { Client } from "./client.js";
import { Findings } from "./findings.js";
import { standUpFullSchool, buildAllCurricula } from "./school-setup.js";
import {
  teachClassWeek,
  checkTeacherIsolation,
  checkCohortIsolation,
  checkGroupingAcrossSchool,
  checkMissedWorkIsVisible,
  checkTodaysSchedule,
  type ClassWeek,
} from "./school-term.js";
import { asList } from "./shapes.js";
import {
  checkArms,
  checkLearnerWeek,
  checkScheduleReadsTheWeek,
  checkTimetable,
} from "./timetable.js";
import {
  teachDifferentiatedWeek,
  checkMovementBetweenGroups,
  measureDifferentiationEffect,
  snapshotGroups,
  type DifferentiatedWeek,
} from "./differentiation.js";
import nigeria from "../scenarios/nigeria-full-school.js";
import usa from "../scenarios/usa-k12.js";

// Which school this run is. The harness is the same either way; everything
// that differs lives in the scenario file, which is the point.
const scenarios = { "nigeria-full-school": nigeria, "usa-k12": usa };
const scenario =
  scenarios[
    (process.env.SCENARIO ?? "nigeria-full-school") as keyof typeof scenarios
  ] ?? nigeria;

/**
 * Phase B: a whole school for a term.
 *
 * Ten classes, ten teachers, two cohorts of learners taking five subjects
 * each. Run with `pnpm journey:school`.
 */
const runId = process.env.RUN_ID ?? `s${Date.now().toString(36)}`;
const client = new Client();
const findings = new Findings();

if (!(await client.healthy())) {
  console.error("The dev server is not answering on", client.baseUrl);
  process.exit(1);
}

console.log(`\n=== ${scenario.schoolName} — whole school, run ${runId} ===\n`);
const started = Date.now();
const timings: Record<string, number> = {};
const time = async <T>(label: string, work: () => Promise<T>): Promise<T> => {
  const at = Date.now();
  const result = await work();
  timings[label] = (Date.now() - at) / 1000;
  return result;
};

const run = await time("setup", () =>
  standUpFullSchool(client, scenario, findings, runId),
);
console.log(`  setup took ${timings.setup.toFixed(1)}s\n`);

console.log("· building ten curricula");
await time("curriculum", () =>
  buildAllCurricula(client, run, scenario, findings),
);
console.log(`  curriculum took ${timings.curriculum.toFixed(1)}s\n`);

console.log("· teaching the term");
const weeks: ClassWeek[] = [];
const differentiated: DifferentiatedWeek[] = [];
// One class teaches the second half of the term at three standards, which is
// what a teacher does once they have marks to group on. The rest carry on
// undifferentiated, so both paths are exercised in one run.
const differentiatedClass = run.classes[0];
const differentiateFrom = 3;
let groupsBefore = new Map<string, string>();

await time("term", async () => {
  for (let weekIndex = 0; weekIndex < scenario.weeksTaught; weekIndex++) {
    const at = Date.now();
    // Grouping is only meaningful once there are marks to group on, and the
    // categories recorded here are what later movement is measured against.
    if (weekIndex === differentiateFrom) {
      groupsBefore = await snapshotGroups(client, differentiatedClass);
      console.log(
        `  grouping ${differentiatedClass.name} before differentiating: ${[...groupsBefore.values()].join(", ")}`,
      );
    }
    for (const cls of run.classes) {
      if (cls.id === differentiatedClass.id && weekIndex >= differentiateFrom) {
        const result = await teachDifferentiatedWeek(
          client,
          run,
          cls,
          weekIndex,
          findings,
        );
        if (result) differentiated.push(result);
        continue;
      }
      const result = await teachClassWeek(
        client,
        run,
        cls,
        weekIndex,
        findings,
      );
      if (result) weeks.push(result);
    }
    const thisWeek = weeks.filter((w) => w.week === weekIndex + 1);
    const handed = thisWeek.reduce((n, w) => n + w.submitted, 0);
    const averages = thisWeek
      .map((w) => w.average)
      .filter((a): a is number => a !== null);
    console.log(
      `  week ${weekIndex + 1}: ${run.classes.length} classes, ${handed} papers handed in, average ${
        averages.length
          ? `${Math.round(averages.reduce((a, b) => a + b, 0) / averages.length)}%`
          : "—"
      } (${((Date.now() - at) / 1000).toFixed(1)}s)`,
    );
    // A wedged dev server looks like a slow one; say so rather than
    // producing a report full of failures that mean nothing.
    if (!(await client.healthy())) {
      findings.add(
        "broken",
        "infrastructure",
        "the dev server stopped answering mid-term",
        `after week ${weekIndex + 1}`,
      );
      break;
    }
  }
});

if (differentiated.length) {
  const served = differentiated[differentiated.length - 1].served;
  console.log(
    `\n· ${differentiatedClass.name} ran ${differentiated.length} weeks at three standards; last week served ${JSON.stringify(served)}`,
  );
  const effect = await measureDifferentiationEffect(
    client,
    run,
    differentiatedClass,
    groupsBefore,
    differentiateFrom,
    findings,
  );
  if (effect.before !== null && effect.after !== null) {
    console.log(
      `  the group given the easier paper: ${effect.before}% on the common paper → ${effect.after}% on theirs`,
    );
  }
  const movement = await checkMovementBetweenGroups(
    client,
    run,
    differentiatedClass,
    groupsBefore,
    findings,
  );
  console.log(
    `  after the term: ${movement.movedUp} moved up, ${movement.movedDown} moved down`,
  );
}

console.log("\n· checking what one teacher can reach of another's class");
await time("isolation", async () => {
  await checkMissedWorkIsVisible(client, run, findings);
  await checkTodaysSchedule(client, run, findings);
  await checkTeacherIsolation(client, run, findings);
  await checkCohortIsolation(client, run, weeks, findings);
});

console.log("· grouping every class from its own marks");
const grouping = await time("grouping", () =>
  checkGroupingAcrossSchool(client, run, findings),
);
console.log(
  `  ${grouping.agreed} of ${grouping.placed} placements match real ability (${Math.round(
    (grouping.agreed / Math.max(1, grouping.placed)) * 100,
  )}%)`,
);

// ── Artifacts ────────────────────────────────────────────────────────────
const dir = join("test-runs", `${scenario.key}-${runId}`);
await mkdir(dir, { recursive: true });

console.log("\n· report cards across the school");
const ranked = [...run.students].sort(
  (a, b) => b.profile.ability - a.profile.ability,
);
for (const student of [
  ranked[0],
  ranked[Math.floor(ranked.length / 2)],
  ranked[ranked.length - 1],
]) {
  // The document that goes home is one sheet covering every subject, not a
  // statement per class. The simulation was issuing five per learner and
  // calling them report cards, which is how a per-subject view passed for
  // the real thing without anyone noticing.
  const issued = await client.as(run.admin, "issue-report-card", {
    studentId: student.studentId,
    termId: run.termId,
    attendance: { present: 58, outOf: 62 },
    comments: {
      "Class teacher": "A steady term. Keep up the reading.",
      Principal: "Well done.",
    },
    confirm: true,
  });

  // Issuing answers with a receipt; the document itself is read back, which
  // is also the path a parent's reprint takes.
  const stored = await client.as(run.admin, "get-report-card", {
    id: issued.reportCardId,
  });
  const slug = student.profile.name.replace(/\s+/g, "-").toLowerCase();
  await writeFile(
    join(dir, `report-card-${slug}.json`),
    JSON.stringify(stored, null, 2),
  );
  if (stored?.documentMarkdown) {
    await writeFile(
      join(dir, `report-card-${slug}.md`),
      stored.documentMarkdown,
    );
  }

  const snapshot = stored?.snapshot ?? {};
  const rows = asList(snapshot?.subjects ?? []);
  const theirClasses = run.classes.filter(
    (c) => c.yearGroup === student.yearGroup,
  );
  findings.expect(
    "report cards",
    rows.length === theirClasses.length,
    `${student.profile.name}'s report covers every subject they take`,
    `${rows.length} rows for ${theirClasses.length} classes`,
  );
  findings.expect(
    "report cards",
    rows.every((r: any) => r.percentage !== null),
    `every subject on ${student.profile.name}'s report carries a mark`,
    rows
      .filter((r: any) => r.percentage === null)
      .map((r: any) => r.subject)
      .join(", "),
  );
  // Every mark on the page must carry the grade the school's own scale gives
  // it. A row showing a score and a dash is the thing a parent rings about.
  const ungraded = rows.filter(
    (r: any) => typeof r.percentage === "number" && !r.grade,
  );
  findings.expect(
    "report cards",
    ungraded.length === 0,
    `every mark on ${student.profile.name}'s report has a grade beside it`,
    ungraded.map((r: any) => `${r.subject} ${r.percentage}%`).join(", "),
  );

  // A mark from two papers and a mark from six are not the same claim, so
  // the page has to say which it is.
  findings.expect(
    "report cards",
    rows.every((r: any) => typeof r.assessmentsSet === "number"),
    `${student.profile.name}'s report says how much work was set, not only how much was marked`,
  );
  const markdown = stored?.documentMarkdown ?? "";
  const missedOnReport = rows.reduce(
    (n: number, r: any) => n + (r.missed ?? 0),
    0,
  );
  if (missedOnReport > 0) {
    findings.expect(
      "report cards",
      /not handed in/i.test(markdown),
      `${student.profile.name}'s report says plainly that work was missed`,
      `${missedOnReport} pieces missing, and the document does not mention it`,
    );
  }

  // The overall must be the subjects' own average, or a parent querying it
  // gets a different answer from the one printed above it.
  const marks = rows
    .map((r: any) => r.percentage)
    .filter((p: any) => typeof p === "number");
  const expected = marks.length
    ? Math.round(
        marks.reduce((a: number, b: number) => a + b, 0) / marks.length,
      )
    : null;
  findings.expect(
    "report cards",
    snapshot?.overall === expected,
    `${student.profile.name}'s overall matches the subjects above it`,
    `the report says ${snapshot?.overall}, the rows average ${expected}`,
  );
}

// Last, because it adds classes to the first year group, and a report card
// covers every class a learner is in.
console.log("· arms within a year group");
const arms = await time("timetable", () => checkArms(client, run, findings));
console.log("· a term's timetable");
const timetable = await time("timetable clashes", () =>
  checkTimetable(client, run, arms, findings),
);
await time("schedule from the week", () =>
  checkScheduleReadsTheWeek(client, run, findings),
);
await time("learner's week", () =>
  checkLearnerWeek(client, run, arms, timetable, findings),
);

// What the head teacher sees of the whole school.
const analytics = await client.as(run.admin, "get-school-analytics", {});
await writeFile(
  join(dir, "school-analytics.json"),
  JSON.stringify(analytics, null, 2),
);
const coverage = await client.as(run.admin, "get-lesson-note-coverage", {});
await writeFile(
  join(dir, "lesson-note-coverage.json"),
  JSON.stringify(coverage, null, 2),
);

const seconds = (Date.now() - started) / 1000;
const handed = weeks.reduce((n, w) => n + w.submitted, 0);
const marked = weeks.reduce((n, w) => n + w.marked, 0);

const lines: string[] = [];
lines.push(`# ${scenario.schoolName} — whole-school run ${runId}`);
lines.push("");
lines.push(
  `${run.classes.length} classes, ${run.classes.length} teachers and ${run.students.length} learners across ${scenario.cohorts.length} year groups, taught for ${scenario.weeksTaught} weeks.`,
);
lines.push("");
lines.push("## Scale");
lines.push("");
lines.push("| | |");
lines.push("| --- | --- |");
lines.push(`| Classes | ${run.classes.length} |`);
lines.push(`| Teachers | ${run.classes.length} |`);
lines.push(`| Learners | ${run.students.length} |`);
lines.push(
  `| Enrolments | ${run.classes.length * (run.students.length / scenario.cohorts.length)} |`,
);
lines.push(`| Papers handed in | ${handed} |`);
lines.push(`| Open answers marked | ${marked} |`);
lines.push(`| Requests | ${client.calls.length} |`);
lines.push(`| Wall time | ${seconds.toFixed(1)}s |`);
lines.push(
  `| Requests per second | ${(client.calls.length / seconds).toFixed(0)} |`,
);
lines.push("");
lines.push("## Where the time went");
lines.push("");
lines.push("| Phase | Seconds |");
lines.push("| --- | --- |");
for (const [label, value] of Object.entries(timings)) {
  lines.push(`| ${label} | ${value.toFixed(1)} |`);
}
lines.push("");
lines.push("## Each class");
lines.push("");
lines.push("| Class | Teacher | Papers | Marked | Average |");
lines.push("| --- | --- | --- | --- | --- |");
for (const cls of run.classes) {
  const mine = weeks.filter((w) => w.classId === cls.id);
  const averages = mine
    .map((w) => w.average)
    .filter((a): a is number => a !== null);
  lines.push(
    `| ${cls.name} | ${cls.teacher.label} | ${mine.reduce((n, w) => n + w.submitted, 0)} | ${mine.reduce(
      (n, w) => n + w.marked,
      0,
    )} | ${
      averages.length
        ? `${Math.round(averages.reduce((a, b) => a + b, 0) / averages.length)}%`
        : "—"
    } |`,
  );
}
lines.push("");
lines.push("## Findings");
lines.push("");
if (findings.all.length === 0) {
  lines.push("Nothing to report: every expectation held.");
} else {
  for (const severity of ["broken", "wrong", "missing", "wording", "note"]) {
    const group = findings.all.filter((f) => f.severity === severity);
    if (!group.length) continue;
    lines.push(`### ${severity} (${group.length})`);
    lines.push("");
    for (const f of group) {
      lines.push(`- **${f.what}** — _${f.phase}_`);
      if (f.detail) lines.push(`  - ${f.detail}`);
    }
    lines.push("");
  }
}
lines.push("## Grouping");
lines.push("");
lines.push(
  `The app placed ${grouping.placed} learners from their marks alone; ${grouping.agreed} match the ability the simulation gave them (${Math.round(
    (grouping.agreed / Math.max(1, grouping.placed)) * 100,
  )}%).`,
);
lines.push("");
lines.push(`_School id ${run.schoolId}, left in place._`);

await writeFile(join(dir, "report.md"), lines.join("\n"));
await writeFile(join(dir, "calls.json"), JSON.stringify(client.calls, null, 2));
await writeFile(
  join(dir, "findings.json"),
  JSON.stringify(findings.all, null, 2),
);

console.log(`\nDone in ${seconds.toFixed(1)}s · ${client.calls.length} calls`);
console.log(
  `findings: ${findings.count("broken")} broken, ${findings.count("wrong")} wrong, ${findings.count("missing")} missing`,
);
console.log(`report: ${join(dir, "report.md")}`);
