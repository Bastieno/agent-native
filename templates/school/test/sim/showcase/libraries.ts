import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import type { Client, Persona } from "../client.js";
import { idOf } from "../shapes.js";
import { fixtureName, scenario as selected } from "../../scenarios/index.js";
import type { Showcase } from "../../scenarios/showcase-types.js";
import type { Decisions } from "./context.js";

/**
 * A school's own standards libraries, brought in the way a customer would:
 * through the app's syllabus import, as the school's admin. Crestfield plans
 * from the NERDC and WAEC libraries that ship with the app, so it has none of
 * these; Yellow View's are files in test/fixtures/showcase-yellowview/libraries,
 * one per framework, each a whole import.
 */

type ImportFile = {
  framework: { name: string; version?: string; source?: string };
  subjects: {
    subject: string;
    strands: { objectives: { code?: string; description: string }[] }[];
  }[];
};

const dirOf = (scenario: Showcase) =>
  join("test", "fixtures", fixtureName(scenario), "libraries");

function filesOf(scenario: Showcase): { file: string; data: ImportFile }[] {
  const dir = dirOf(scenario);
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .sort()
    .map((f) => ({
      file: f,
      data: JSON.parse(readFileSync(join(dir, f), "utf8")),
    }));
}

/** Every library the school's subjects name must exist in its files, with enough objectives. */
export function libraryProblems(scenario: Showcase = selected): string[] {
  const files = filesOf(scenario);
  if (!files.length) return [];
  const have = new Map<string, number>();
  for (const { data } of files)
    for (const s of data.subjects)
      have.set(
        `${data.framework.name}|${s.subject}`,
        s.strands.reduce((n, st) => n + st.objectives.length, 0),
      );
  const problems: string[] = [];
  const needed = new Set(
    scenario.subjects.map((s) => `${s.library.framework}|${s.library.subject}`),
  );
  for (const key of needed) {
    const count = have.get(key);
    if (count === undefined)
      problems.push(`no library for ${key.replace("|", " / ")}`);
    else if (count < scenario.teachingWeeks.length)
      problems.push(
        `${key.replace("|", " / ")} has ${count} objectives, fewer than the ${scenario.teachingWeeks.length} teaching weeks`,
      );
  }
  return problems;
}

/** Start, fill and commit one import per library file. Returns how many objectives went in. */
export async function importSchoolLibraries(
  client: Client,
  admin: Persona,
  scenario: Showcase,
  decisions: Decisions,
): Promise<number> {
  let total = 0;
  for (const { file, data } of filesOf(scenario)) {
    const started = await client.as(admin, "start-syllabus-import", {
      title: data.framework.name,
      source: data.framework.source ?? file,
    });
    const id = idOf(started, "import") ?? started?.id;
    await client.as(admin, "update-syllabus-import", {
      id,
      stateJson: data,
      step: "reviewed",
    });
    const done = await client.as(admin, "commit-syllabus-import", {
      id,
      confirm: true,
    });
    total += Number(done?.objectivesCreated ?? 0);
    decisions.add(
      "Subjects by year group and stream",
      `Library: ${data.framework.name}`,
      `${done?.objectivesCreated ?? 0} objectives across ${done?.frameworksCreated ?? 0} courses, imported through the app (${file})`,
    );
  }
  return total;
}

if (process.argv[1]?.endsWith("libraries.ts")) {
  const problems = libraryProblems();
  if (problems.length) {
    console.error(problems.join("\n"));
    process.exit(1);
  }
  console.log("libraries: ok");
}
