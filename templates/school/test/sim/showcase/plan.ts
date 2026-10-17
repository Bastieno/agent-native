import { writeFile } from "node:fs/promises";
import { join } from "node:path";
import type { ShowcaseRun } from "./context.js";
import { CONTENT_DIR, contentFile } from "./content.js";
import { kindFor } from "./teaching.js";

/**
 * What each content file has to cover: for every subject and year group, the
 * topic and objectives of each teaching week (from the scheme of work the
 * run builds), and which weeks need a practical. The people writing content
 * read this; `pnpm showcase:check-content` checks the content against it.
 *
 * Written by `SHOWCASE_EXPORT_PLAN=1 SHOWCASE_STOP_AFTER=curriculum pnpm
 * showcase:school` on a fresh showcase database.
 */
export async function exportPlan(run: ShowcaseRun): Promise<void> {
  const { scenario } = run;
  // A differentiation class sets its three-level worksheet in place of the
  // week's usual piece, as teaching.ts does.
  const pieceOf = (cls: (typeof run.classes)[number], week: number) =>
    scenario.differentiationWeeks.includes(week) &&
    scenario.differentiationClasses.some(
      (d) => d.arm === cls.arm?.name && d.subject === cls.subject.name,
    )
      ? "differentiated worksheet"
      : kindFor(run, cls, week);
  const pairs = new Map<string, typeof run.classes>();
  for (const cls of run.classes) {
    const key = `${cls.subject.name}|${cls.yearGroup}`;
    pairs.set(key, [...(pairs.get(key) ?? []), cls]);
  }
  const files = [...pairs.entries()].map(([key, classes]) => {
    const [subject, yearGroup] = key.split("|");
    const plan = run.weekPlan.get(key)!;
    const weeks = Object.fromEntries(
      scenario.teachingWeeks.map((week) => {
        const objectives = plan.byWeek.get(week) ?? [];
        return [
          String(week),
          {
            subStrand: objectives[0]?.subStrand ?? "",
            objectives: objectives.map((o) => o.description),
            pieces: [...new Set(classes.map((c) => pieceOf(c, week)))],
          },
        ];
      }),
    );
    const practicalWeeks = scenario.teachingWeeks.filter((week) =>
      classes.some((c) => pieceOf(c, week) === "practical"),
    );
    return {
      file: contentFile(subject, yearGroup).replace(`${CONTENT_DIR}/`, ""),
      subject,
      yearGroup,
      department: classes[0].subject.department,
      library: `${classes[0].library.framework} ${classes[0].library.subject}`,
      classes: classes.map((c) => c.name),
      handwritten: !!classes[0].subject.handwritten,
      practicalWeeks,
      weeks,
    };
  });
  files.sort(
    (a, b) =>
      a.department.localeCompare(b.department) ||
      a.subject.localeCompare(b.subject) ||
      a.yearGroup.localeCompare(b.yearGroup),
  );
  await writeFile(
    join(CONTENT_DIR, "plan.json"),
    JSON.stringify({ teachingWeeks: scenario.teachingWeeks, files }, null, 2) +
      "\n",
  );
  console.log(`  plan for ${files.length} content files written`);
}
