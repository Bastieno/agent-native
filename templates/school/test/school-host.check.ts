/**
 * The rules for a school's own address: which names may be taken and how a
 * host is read.
 *
 *   pnpm exec tsx test/school-host.check.ts
 */
import { normalizeHost, slugProblem } from "../server/lib/school-host.ts";

let failures = 0;
const ok = (cond: unknown, msg: string) => {
  if (cond) console.log(`  ok    ${msg}`);
  else {
    failures++;
    console.log(`  FAIL  ${msg}`);
  }
};

ok(slugProblem("greenvalley") === null, "an ordinary name is allowed");
ok(slugProblem("st-marys-2") === null, "hyphens and digits are allowed");
ok(slugProblem("ab") !== null, "too short is refused");
ok(slugProblem("-lead") !== null, "a leading hyphen is refused");
ok(
  slugProblem("Green_Valley") !== null,
  "underscores and capitals are refused",
);
ok(slugProblem("admin") !== null, "a reserved name is refused");
ok(slugProblem("demo") !== null, "demo is reserved for the operator");
ok(
  normalizeHost("GreenValley.ELLAI.dev:443") === "greenvalley.ellai.dev",
  "a host is lower-cased and loses its port",
);
ok(normalizeHost("a.dev.") === "a.dev", "a trailing dot is dropped");
ok(normalizeHost(undefined) === "", "no host is empty");

if (failures) {
  console.log(`\n${failures} failed`);
  process.exit(1);
}
console.log("\nall passed");
