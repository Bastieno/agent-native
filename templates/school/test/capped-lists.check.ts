/**
 * A list that caps its rows must say how many there really are.
 *
 *   pnpm check:caps
 *
 * Why: a page that prints "20 total" from the length of a capped list is
 * wrong the day there are 21, and nothing looks broken. Announcements said 20
 * for a school with 58; a class's lesson tab said 20 for a year of lessons.
 * So any `list-*` action that applies a row limit (`.limit(` with anything
 * but 1) must either return a `total` (the real count, from the database) or
 * carry a marker saying why it does not need one:
 *
 *   // guard:capped-ok — <reason>
 *
 * A page shows the server's total; it never counts the rows it was sent.
 */
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const dir = join(import.meta.dirname, "..", "actions");
const problems: string[] = [];
let capped = 0;

for (const file of readdirSync(dir).filter((f) => /^list-.*\.ts$/.test(f))) {
  const src = readFileSync(join(dir, file), "utf8");
  // Row limits, not `.limit(1)` (find one) and not SQL `LIMIT 1`.
  if (!/\.limit\((?!\s*1\s*\))/.test(src)) continue;
  capped++;
  const returnsTotal = /\btotal\b/.test(src);
  const marked = /guard:capped-ok\s+—\s+\S/.test(src);
  if (!returnsTotal && !marked) {
    problems.push(
      `${file}: caps its rows but returns no \`total\`. Return the real count, or add "// guard:capped-ok — <reason>".`,
    );
  }
}

if (problems.length) {
  for (const p of problems) console.error(`  FAIL  ${p}`);
  console.error(`\n${problems.length} failed`);
  process.exit(1);
}
console.log(
  `  ok    ${capped} capped list actions each say how many there are`,
);
console.log("\nall passed");
