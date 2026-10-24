import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

/**
 * One school's shape, written into the code.
 *
 * The run-time comparison can only see what the app said during a run.
 * Plenty of assumptions never reach a message: a default in a form, a
 * fallback in a component, an example in an action's description that the
 * agent then follows. So this reads the source for the words that belong to
 * a particular school — year groups, examination boards, a term structure, a
 * paper size — and asks whether each one is read from the school or supplied
 * by us.
 *
 * It cannot know intent, so it reports rather than fails. Several of these
 * are legitimate: the NERDC and WAEC seed files exist to carry those
 * syllabuses, and a scenario file is a school by definition.
 *
 * Run with `pnpm journey:assumptions`.
 */

const ROOTS = ["actions", "app", "server", "shared"];

/** Files whose whole purpose is one school's or one country's data. */
const ALLOWED = [
  /seed-nerdc/,
  /seed-waec/,
  /seed-assessment-styles/,
  /test\/scenarios/,
  /syllabus-import/,
  /\.spec\./,
];

const SUSPECTS: { label: string; pattern: RegExp; why: string }[] = [
  {
    label: "Nigerian year groups",
    pattern: /["'`](?:JSS|SSS?)\s?[123]["'`]/g,
    why: "year groups are the school's own names",
  },
  {
    label: "an examination board",
    pattern: /["'`](?:WAEC|NERDC|BECE|WASSCE)["'`]/g,
    why: "a framework is a school's choice, not a default",
  },
  {
    label: "a Nigerian grade",
    pattern: /["'`](?:A1|B2|B3|C4|C5|C6|D7|E8|F9)["'`]/g,
    why: "grades come from the school's own scale",
  },
  {
    label: "a hardcoded paper size",
    pattern: /@page[^}]*\b(?:A4|Letter)\b/g,
    why: "paper size is a school setting",
  },
  {
    label: "a term word in prose",
    pattern: /\b(?:Term\s[123]|First Term|Second Term|Third Term)\b/g,
    why: "a school may run semesters or quarters",
  },
  {
    label: "a locale-less date format",
    pattern: /toLocaleDateString\(\s*\)|toLocaleString\(\s*\)/g,
    why: "dates go through the school's own locale",
  },
];

async function* walk(dir: string): AsyncGenerator<string> {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "node_modules" || entry.name.startsWith(".")) continue;
      yield* walk(path);
      continue;
    }
    if (/\.(ts|tsx|css)$/.test(entry.name)) yield path;
  }
}

let found = 0;
for (const root of ROOTS) {
  for await (const path of walk(root)) {
    if (ALLOWED.some((a) => a.test(path))) continue;
    const text = await readFile(path, "utf8");
    for (const suspect of SUSPECTS) {
      for (const match of text.matchAll(suspect.pattern)) {
        // A line that is clearly an example in prose is still worth seeing,
        // so nothing is filtered by context — a reader decides.
        const line = text.slice(0, match.index).split("\n").length;
        console.log(
          `${path}:${line}  ${suspect.label}: ${match[0].trim()}\n    ${suspect.why}`,
        );
        found++;
      }
    }
  }
}

console.log(
  found === 0
    ? "\nNothing in the source assumes a particular school's shape."
    : `\n${found} place(s) worth a look. Each is either read from the school or written in by us.`,
);
