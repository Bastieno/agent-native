/**
 * Every page with tabs keeps the chosen tab in the address.
 *
 * A tab held in component state is forgotten on reload and when someone leaves
 * the page and returns. A file that renders `<Tabs` must read the tab from
 * the address: through `useUrlTab`, or `useSearchParams` where it already
 * does. A tab that really should reset (say, one inside a dialog) says so with
 * a `// tabs:local — <why>` comment, and a piece that only draws tabs for a page
 * that owns the state says `// tabs:controlled — <which page>`.
 *
 * Run: npx tsx test/tabs-in-url.check.ts
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../app",
);
const found: string[] = [];

function walk(dir: string) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== "ui") walk(full);
    } else if (entry.name.endsWith(".tsx")) {
      found.push(full);
    }
  }
}
walk(root);

const offenders: string[] = [];
let withTabs = 0;
for (const file of found) {
  const src = fs.readFileSync(file, "utf8");
  if (!/<Tabs\b/.test(src)) continue;
  withTabs++;
  const inUrl = /useUrlTab\b|useSearchParams\b/.test(src);
  const optedOut = /\/\/\s*tabs:(local|controlled)\s+—/.test(src);
  if (!inUrl && !optedOut) offenders.push(path.relative(root, file));
}

if (offenders.length) {
  console.error(
    `Tabs held only in memory (use useUrlTab, or say why with "// tabs:local — <why>" / "// tabs:controlled — <page>"):\n  ${offenders.join("\n  ")}`,
  );
  process.exit(1);
}
console.log(`tabs in url: ok (${withTabs} files with tabs)`);
