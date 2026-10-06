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
  type ClassWeek,
} from "./school-term.js";
import { asList } from "./shapes.js";
import scenario from "../scenarios/nigeria-full-school.js";

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
await time("term", async () => {
  for (let weekIndex = 0; weekIndex < scenario.weeksTaught; weekIndex++) {
    const at = Date.now();
    for (const cls of run.classes) {
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

console.log("\n· checking what one teacher can reach of another's class");
await time("isolation", async () => {
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
  const theirClasses = run.classes.filter(
    (c) => c.yearGroup === student.yearGroup,
  );
  const cards = [];
  for (const cls of theirClasses) {
    cards.push(
      await client.as(cls.teacher, "generate-report-card", {
        studentId: student.studentId,
        classId: cls.id,
        termId: run.termId,
      }),
    );
  }
  findings.expect(
    "report cards",
    cards.every((c) => !!c?.student?.name),
    `${student.profile.name}'s report cards all carry their name`,
  );
  await writeFile(
    join(
      dir,
      `report-cards-${student.profile.name.replace(/\s+/g, "-").toLowerCase()}.json`,
    ),
    JSON.stringify(cards, null, 2),
  );
}

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
