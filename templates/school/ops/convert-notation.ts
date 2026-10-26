/**
 * Mark chemistry in stored content as notation.
 *
 *   pnpm convert:notation <file.json>...           # dry run: what would change
 *   pnpm convert:notation --write <file.json>...
 *
 * Operators only. Reads JSON course files, rewrites every string value whose
 * chemistry is plain-typed ("MgCl2", "Mg2+") to `$\ce{MgCl2}$`, and prints
 * each change so it can be read before it is kept. Text already inside
 * `$...$` is left alone, so running it again changes nothing.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { markChemistry } from "./lib/chemistry-markup";

const args = process.argv.slice(2);
const write = args.includes("--write");
const files = args.filter((a) => !a.startsWith("--"));
if (!files.length) {
  console.error("Usage: pnpm convert:notation [--write] <file.json>...");
  process.exit(1);
}

let total = 0;

/**
 * String literals are rewritten where they stand, so the file keeps its own
 * layout and a diff shows only the values that changed.
 */
const LITERAL = /"(?:[^"\\\n]|\\.)*"/g;

for (const file of files) {
  const before = readFileSync(file, "utf8");
  JSON.parse(before); // refuse anything that is not JSON
  const after = before.replace(LITERAL, (literal) => {
    const value = JSON.parse(literal) as string;
    const next = markChemistry(value);
    if (next === value) return literal;
    total++;
    if (!write) console.log(`${file}\n  - ${value}\n  + ${next}`);
    return JSON.stringify(next);
  });
  if (write && after !== before) writeFileSync(file, after);
}
console.log(
  `${total} value(s) ${write ? "rewritten" : "would change"} in ${files.length} file(s).`,
);
