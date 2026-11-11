import assert from "node:assert/strict";
import { isGated, missingFor, type ReadinessFacts } from "../shared/readiness";

const none: ReadinessFacts = {
  yearGroups: false,
  terms: false,
  schoolWeek: false,
  classes: false,
};
const all: ReadinessFacts = {
  yearGroups: true,
  terms: true,
  schoolWeek: true,
  classes: true,
};

// A school with nothing set up: dependent pages wait, in the order to do it.
assert.deepEqual(missingFor("/admin/calendar", none), ["yearGroups", "terms"]);
assert.deepEqual(missingFor("/admin/timetable", none), [
  "yearGroups",
  "terms",
  "schoolWeek",
  "classes",
]);

// Pages where setup is done, and people, never wait.
for (const p of [
  "/admin",
  "/admin/staff",
  "/admin/students",
  "/admin/settings",
  "/admin/announcements",
  "/teacher",
  "/teacher/students",
]) {
  assert.deepEqual(missingFor(p, none), [], p);
  assert.ok(!isGated(p), p);
}

// Each page asks only for what it needs: a school that does not use the
// timetable is never held back elsewhere by the missing school week.
const noWeek = { ...all, schoolWeek: false };
assert.deepEqual(missingFor("/admin/timetable", noWeek), ["schoolWeek"]);
assert.deepEqual(missingFor("/admin/lessons", noWeek), []);
assert.deepEqual(missingFor("/admin/curriculum/abc", noWeek), []);

// Sub-pages and query strings follow their section; look-alike paths do not.
assert.deepEqual(missingFor("/admin/classes/xyz?tab=arms", none), [
  "yearGroups",
]);
assert.deepEqual(missingFor("/admin/classesfoo", none), []);

// Everything done: nothing waits.
for (const p of ["/admin/timetable", "/teacher/week", "/admin/curriculum"]) {
  assert.deepEqual(missingFor(p, all), [], p);
}
console.log("readiness ok");

// Every action held back for setup exists and belongs to a page that waits.
import { existsSync } from "node:fs";
import { ACTION_PAGE } from "../shared/readiness";
for (const [action, page] of Object.entries(ACTION_PAGE)) {
  assert.ok(existsSync(`actions/${action}.ts`), `no action ${action}`);
  assert.ok(isGated(page), `${page} does not wait for setup`);
}
console.log("readiness actions ok");

// The checklist an outside assistant shows: ticks, the next step, what it opens.
import { checklistText, nextStep, progressSummary } from "../shared/readiness";
const partway = { ...none, yearGroups: true };
assert.equal(nextStep(partway), "terms");
assert.equal(nextStep(all), null);
assert.equal(progressSummary(partway), "1 of 4 first steps done");
const text = checklistText(partway);
// A task list, one step per line: a ticked box for what is done, an empty one
// for the rest, the next step marked and what it opens.
assert.ok(text.startsWith("- [x] Year groups"));
assert.equal(text.split("\n").length, 4, "one line per step");
assert.ok(text.split("\n").every((l) => /^- \[[ x]\] /.test(l)));
assert.ok(
  text.includes(
    "- [ ] Terms for this academic year (next) — opens the Calendar",
  ),
);
assert.ok(!checklistText(all).includes("[ ]"));

console.log("readiness checklist ok");
