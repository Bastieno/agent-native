/**
 * Checks for which parts of AGENTS.md each role's assistant is sent.
 * Run: npx tsx test/prompt-guide.check.ts
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { guideForRole } from "../server/lib/prompt-guide.js";

const full = readFileSync(new URL("../AGENTS.md", import.meta.url), "utf8");
const admin = guideForRole(full, "school_admin");
const teacher = guideForRole(full, "teacher");
const coordinator = guideForRole(full, "subject_coordinator");
const student = guideForRole(full, "student");

const has = (text: string, s: string) => text.includes(s);

// Everyone keeps the shared basics.
for (const [who, text] of Object.entries({ admin, teacher, student })) {
  assert.ok(has(text, "## Shaping an answer"), `${who}: shaping an answer`);
  assert.ok(has(text, "## Talking to people"), `${who}: talking to people`);
  assert.ok(has(text, "## Destructive Actions"), `${who}: destructive`);
}

// Each role gets its own section and not the others'.
assert.ok(has(admin, "## Section A"), "admin has Section A");
assert.ok(!has(admin, "## Section B") && !has(admin, "## Section C"));
assert.ok(has(teacher, "## Section B"), "teacher has Section B");
assert.ok(!has(teacher, "## Section C"), "teacher has no learner section");
assert.ok(has(student, "## Section C"), "student has Section C");
assert.ok(!has(student, "## Section A") && !has(student, "## Section B"));
assert.ok(
  !has(student, "A1. School Onboarding"),
  "no admin onboarding for a learner",
);

// A teacher still gets subject work from the admin's section, and no more.
assert.ok(has(teacher, "### A2. Curriculum Co-Authoring"));
assert.ok(has(teacher, "### A2b."));
assert.ok(!has(teacher, "### A3. Staff Management"));
assert.ok(!has(teacher, "### A2c."), "no timetable building for a teacher");
assert.ok(has(coordinator, "### A2. Curriculum Co-Authoring"));

// The action table is left out for everyone.
for (const [who, text] of Object.entries({ admin, teacher, student })) {
  assert.ok(!has(text, "## Complete Actions Reference"), `${who}: no table`);
}

// Unknown role: everything, rather than a guess.
assert.equal(guideForRole(full, null), full);

const kb = (t: string) => Math.round(t.length / 1024);
console.log(
  `full ${kb(full)} KB; admin ${kb(admin)} KB; teacher ${kb(teacher)} KB; student ${kb(student)} KB`,
);
console.log("ok");
