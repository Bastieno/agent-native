import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import type { Client } from "./client.js";
import type { Findings } from "./findings.js";
import type { School } from "./setup.js";
import type { Scenario } from "../scenarios/nigeria-secondary.js";
import type { WeekResult } from "./term.js";

/**
 * What the run found, written for a person to read.
 *
 * The report is the product. A run that passed silently tells you nothing you
 * did not already assume, so this says what was simulated, what it produced,
 * and what it noticed — in that order, because "what did it actually do" is
 * the first question anyone asks of a test they did not watch.
 */
export async function writeReport(opts: {
  dir: string;
  runId: string;
  scenario: Scenario;
  school: School;
  weeks: WeekResult[];
  findings: Findings;
  client: Client;
  seconds: number;
}): Promise<string> {
  const { dir, runId, scenario, school, weeks, findings, client, seconds } =
    opts;
  await mkdir(dir, { recursive: true });

  const bySeverity = (s: string) =>
    findings.all.filter((f) => f.severity === s);
  const handed = weeks.reduce((n, w) => n + w.submitted, 0);
  const marked = weeks.reduce((n, w) => n + w.marked, 0);
  const failedCalls = client.calls.filter((c) => !c.ok);

  const lines: string[] = [];
  lines.push(`# ${scenario.schoolName} — simulation run ${runId}`);
  lines.push("");
  lines.push(
    `A ${scenario.termName.toLowerCase()} taught end to end against a school created for this run. ` +
      `Every step went through the app's own endpoints as the person who would really be doing it.`,
  );
  lines.push("");

  lines.push("## What was simulated");
  lines.push("");
  lines.push(`| | |`);
  lines.push(`| --- | --- |`);
  lines.push(`| School | ${scenario.schoolName} (${scenario.country}) |`);
  lines.push(`| Year group | ${scenario.subject.yearGroup} |`);
  lines.push(`| Class | ${scenario.className} |`);
  lines.push(`| Learners | ${school.students.length} |`);
  lines.push(`| Weeks taught | ${weeks.length} |`);
  lines.push(`| Pieces of work handed in | ${handed} |`);
  lines.push(`| Open answers marked by the teacher | ${marked} |`);
  lines.push(`| Requests made | ${client.calls.length} |`);
  lines.push(`| Wall time | ${seconds.toFixed(1)}s |`);
  lines.push("");

  lines.push("## The term, week by week");
  lines.push("");
  lines.push("| Week | Topic | Handed in | Marked | Class average |");
  lines.push("| --- | --- | --- | --- | --- |");
  for (const week of weeks) {
    const topic =
      scenario.weeks.find((w) => w.week === week.week)?.topic ?? "—";
    lines.push(
      `| ${week.week} | ${topic} | ${week.submitted}/${school.students.length} | ${week.marked} | ${
        week.averagePercent === null
          ? "—"
          : `${Math.round(week.averagePercent)}%`
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
      const group = bySeverity(severity);
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

  if (failedCalls.length) {
    lines.push("## Requests that failed");
    lines.push("");
    lines.push("| Action | As | Error |");
    lines.push("| --- | --- | --- |");
    for (const call of failedCalls.slice(0, 40)) {
      lines.push(
        `| \`${call.action}\` | ${call.persona} | ${(call.error ?? "").slice(0, 120).replace(/\|/g, "\\|")} |`,
      );
    }
    lines.push("");
  }

  lines.push("## Artifacts");
  lines.push("");
  lines.push(
    "Beside this report: the gradebook as JSON and CSV, report cards for the " +
      "strongest, middling and weakest learner, what one learner sees of their " +
      "own term, and the full call transcript.",
  );
  lines.push("");
  lines.push(
    `_School id ${school.schoolId}. It is left in place, so anything here can be opened in the app._`,
  );
  lines.push("");

  const path = join(dir, "report.md");
  await writeFile(path, lines.join("\n"));
  await writeFile(
    join(dir, "calls.json"),
    JSON.stringify(client.calls, null, 2),
  );
  await writeFile(
    join(dir, "findings.json"),
    JSON.stringify(findings.all, null, 2),
  );
  return path;
}
