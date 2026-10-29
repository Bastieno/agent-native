import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

/**
 * `ops/add-school-db.ts` adds a school to a database other schools live in, so
 * it must only ever insert. This fails if a statement that changes or removes
 * existing rows appears in it or in the row-copying it shares, comments aside.
 */
const strip = (source: string) =>
  source.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");

for (const file of ["ops/add-school-db.ts", "ops/lib/load-common.ts"]) {
  const code = strip(readFileSync(file, "utf8"));
  for (const verb of [
    "UPDATE",
    "DELETE",
    "TRUNCATE",
    "DROP",
    "ALTER",
    "REPLACE",
  ]) {
    assert.ok(
      !new RegExp(`\\b${verb}\\b`).test(code),
      `${file} contains ${verb}; the school loader must only insert`,
    );
  }
}
const add = strip(readFileSync("ops/add-school-db.ts", "utf8"));
assert.ok(/ON CONFLICT DO NOTHING/.test(add) || /copyPlan/.test(add));
const common = strip(readFileSync("ops/lib/load-common.ts", "utf8"));
assert.ok(
  /ON CONFLICT DO NOTHING/.test(common),
  "copies must be insert-or-skip",
);

console.log("add-school: only inserts");
