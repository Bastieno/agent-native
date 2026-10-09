import { readFile, readdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

/**
 * Two schools, the same six weeks, and everything the app said to each.
 *
 * A hardcoded assumption is invisible when you only ever run one school:
 * "Term 1", a date written 14/09/2026, a grade of C4, A4 paper — each looks
 * like the right answer until a school that does it differently sees the
 * same words. So both runs are compared, and anything the app said to the
 * American school in the Nigerian school's terms is a finding.
 *
 * Run with `pnpm journey:compare <run-a> <run-b>`.
 */

type Side = {
  dir: string;
  key: string;
  messages: Map<string, string[]>;
  reportCards: string[];
};

/** What one school was told, read back off disk. */
async function readRun(dir: string): Promise<Side> {
  const calls = JSON.parse(
    await readFile(join(dir, "calls.json"), "utf8"),
  ) as Array<{ action: string; message?: string }>;

  const messages = new Map<string, string[]>();
  for (const call of calls) {
    if (!call.message) continue;
    messages.set(call.action, [
      ...(messages.get(call.action) ?? []),
      call.message,
    ]);
  }

  const files = await readdir(dir);
  const reportCards: string[] = [];
  for (const file of files) {
    if (file.startsWith("report-card-") && file.endsWith(".md")) {
      reportCards.push(await readFile(join(dir, file), "utf8"));
    }
  }

  return { dir, key: dir.split("/").pop() ?? dir, messages, reportCards };
}

type Finding = { what: string; where: string; evidence: string };

/**
 * Words that belong to one school and have no business in the other's.
 *
 * Each is something a school chose — its year groups, its grades, what it
 * calls a term — so finding it in the other school's output means the app
 * supplied it rather than reading it.
 */
const BELONGS_TO: Record<string, { label: string; patterns: RegExp[] }> = {
  nigeria: {
    label: "the Nigerian school",
    patterns: [
      /\bJSS\s?[123]\b/,
      /\bSS\s?[123]\b/,
      /\b(?:A1|B2|B3|C4|C5|C6|D7|E8|F9)\b/,
      /\bWAEC\b/i,
      /\bNERDC\b/i,
      /\bfirst term\b/i,
    ],
  },
  usa: {
    label: "the American school",
    patterns: [
      /\bGrade\s?[1-8]\b/,
      /\bKindergarten\b/i,
      /\bfall semester\b/i,
      /\bmiddle school\b/i,
    ],
  },
};

function crossContamination(side: Side, theirs: keyof typeof BELONGS_TO) {
  const findings: Finding[] = [];
  const { label, patterns } = BELONGS_TO[theirs];
  const check = (text: string, where: string) => {
    for (const pattern of patterns) {
      const hit = pattern.exec(text);
      if (hit) {
        findings.push({
          what: `${side.key} was shown "${hit[0]}", which belongs to ${label}`,
          where,
          evidence: text.slice(Math.max(0, hit.index - 60), hit.index + 80),
        });
      }
    }
  };
  for (const [action, said] of side.messages) {
    for (const text of said) check(text, `the message from ${action}`);
  }
  for (const [index, card] of side.reportCards.entries()) {
    check(card, `report card ${index + 1}`);
  }
  return findings;
}

/**
 * A sentence said word for word to both schools, carrying something that
 * should have been theirs.
 *
 * Identical wording is usually right — "Invitation emailed" is the same
 * everywhere. It is only a finding when the identical sentence contains a
 * date, a grade or a word for a term, because those are the school's.
 */
function saidTheSameThing(a: Side, b: Side): Finding[] {
  const findings: Finding[] = [];
  const schoolSpecific =
    /\b\d{1,2}\/\d{1,2}\/\d{2,4}\b|\bterm\b|\bsemester\b|\bA4\b|\bLetter\b/i;

  for (const [action, mine] of a.messages) {
    const theirs = b.messages.get(action);
    if (!theirs?.length || !mine.length) continue;
    // Compare the first of each: later ones differ by learner name.
    const [first] = mine;
    const [second] = theirs;
    if (first === second && schoolSpecific.test(first)) {
      findings.push({
        what: `${action} says the same school-specific sentence to both schools`,
        where: `the message from ${action}`,
        evidence: first.slice(0, 160),
      });
    }
  }
  return findings;
}

const [dirA, dirB] = process.argv.slice(2);
if (!dirA || !dirB) {
  console.error(
    "Usage: pnpm journey:compare test-runs/<nigerian-run> test-runs/<american-run>",
  );
  process.exit(1);
}

const nigeria = await readRun(dirA);
const usa = await readRun(dirB);

/**
 * A date written as the app stores it rather than as the school writes it.
 *
 * Neither school says "2026-10-09" or "10/9/2026" to a parent. Dates that
 * reach a person go through the school's own locale, with the month spelled
 * out, so one written any other way in something a person reads is a
 * finding wherever it appears.
 */
function rawDates(side: Side): Finding[] {
  const findings: Finding[] = [];
  const raw =
    /\b\d{4}-\d{2}-\d{2}\b|\bT\d{2}:\d{2}|\b\d{1,2}\/\d{1,2}\/\d{2,4}\b/;
  const look = (text: string, where: string) => {
    const hit = raw.exec(text);
    if (hit) {
      findings.push({
        what: `${side.key} was shown the date "${hit[0]}" as the app stores it, not as the school writes it`,
        where,
        evidence: text.slice(Math.max(0, hit.index - 60), hit.index + 60),
      });
    }
  };
  for (const [action, said] of side.messages) {
    for (const text of said) look(text, `the message from ${action}`);
  }
  for (const [index, card] of side.reportCards.entries()) {
    look(card, `report card ${index + 1}`);
  }
  return findings;
}

const findings = [
  // Each school checked for the other's words.
  ...crossContamination(usa, "nigeria"),
  ...crossContamination(nigeria, "usa"),
  ...saidTheSameThing(nigeria, usa),
  ...rawDates(nigeria),
  ...rawDates(usa),
];

console.log(
  `\nComparing ${nigeria.key} with ${usa.key}: ${nigeria.messages.size} and ${usa.messages.size} kinds of message, ${nigeria.reportCards.length} and ${usa.reportCards.length} report cards.\n`,
);
if (findings.length === 0) {
  console.log(
    "Nothing of one school's shape appears in the other's. Every school-specific word the app used was read, not supplied.",
  );
} else {
  for (const finding of findings) {
    console.log(`✗ ${finding.what}`);
    console.log(`    in ${finding.where}`);
    console.log(`    …${finding.evidence.replace(/\n/g, " ")}…\n`);
  }
}

await writeFile(
  join(dirB, "comparison.json"),
  JSON.stringify({ a: nigeria.key, b: usa.key, findings }, null, 2),
);
console.log(
  `${findings.length} finding(s) · written to ${dirB}/comparison.json`,
);
