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

// Long procedures are read on demand (get-school-guidance), not sent every
// step: each staff role gets an index of its topics in their place.
const indexOf = (text: string) =>
  text.split("### Guidance by topic")[1]?.split("\n\n")[1] ?? "";
assert.ok(!has(admin, "### A1. School Onboarding"), "admin: setup on demand");
assert.ok(!has(admin, "### A2c."), "admin: timetable on demand");
for (const topic of ["setup", "curriculum", "timetable", "staff"]) {
  assert.ok(indexOf(admin).includes(topic), `admin index names ${topic}`);
}
assert.ok(has(admin, "### A4b. The assistant's settings"), "no topic: kept");
assert.ok(has(admin, "### A6. Navigation Map"), "navigation map kept");
assert.ok(!has(teacher, "### B3b."), "teacher: marking on demand");
for (const topic of ["marking", "activities", "lesson-notes", "curriculum"]) {
  assert.ok(indexOf(teacher).includes(topic), `teacher index names ${topic}`);
}
assert.ok(has(teacher, "### B4. Student Categorization"), "no topic: kept");
assert.ok(!has(teacher, "### A3. Staff Management"));
assert.ok(!has(teacher, "### A2c."), "no timetable building for a teacher");
assert.ok(indexOf(coordinator).includes("curriculum"));

// A learner's section has no topics and is sent whole.
assert.ok(has(student, "### C1. Tutor Behavior"));
assert.ok(!has(student, "### Guidance by topic"));

// Written for people developing the app: sent to nobody with a role.
for (const [who, text] of Object.entries({ admin, teacher, student })) {
  assert.ok(!has(text, "## Running Actions"), `${who}: no terminal commands`);
  assert.ok(!has(text, "## UI Components"), `${who}: no UI rules`);
}

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
