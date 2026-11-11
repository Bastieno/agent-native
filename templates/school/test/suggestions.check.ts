import assert from "node:assert/strict";
import { getSchoolSuggestions } from "../app/lib/school-suggestions";

const ctx = (navigation: Record<string, unknown>) =>
  ({ navigation }) as Parameters<typeof getSchoolSuggestions>[0];

const overview = (extra: Record<string, unknown>) =>
  getSchoolSuggestions(
    ctx({ role: "admin", view: "overview", isNewSchool: false, ...extra }),
  );

// A school with nothing to teach with is offered setup, never a question about
// learners it does not have.
const fresh = getSchoolSuggestions(
  ctx({ role: "admin", view: "overview", isNewSchool: true }),
);
assert.ok(fresh.includes("Set up my school"));
assert.ok(!fresh.some((s) => /struggling/i.test(s)));

// Counts of zero lead with the matching first steps, and no struggling chip.
const empty = overview({
  staffCount: 1,
  studentCount: 0,
  classCount: 0,
  subjectCount: 0,
});
assert.ok(empty.includes("Add students"));
assert.ok(!empty.some((s) => /struggling/i.test(s)));

// Classes but no learners yet: still nothing to find struggling among.
const noLearners = overview({
  staffCount: 3,
  studentCount: 0,
  classCount: 4,
  subjectCount: 5,
});
assert.ok(!noLearners.some((s) => /struggling/i.test(s)));

// A running school gets it.
const running = overview({
  staffCount: 12,
  studentCount: 180,
  classCount: 30,
  subjectCount: 18,
});
assert.ok(running.includes("Show me struggling students"));

console.log("suggestions: ok");
