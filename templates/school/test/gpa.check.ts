import assert from "node:assert/strict";
import { formatGpa, gpaOf } from "../shared/gpa";
import { inSchoolWords, schoolWords, termWord } from "../shared/school-words";
import { capabilitiesFor } from "../shared/capabilities";

const scale = {
  gradingScale: {
    levels: [
      { grade: "A", min: 90, max: 100, points: 4 },
      { grade: "B", min: 80, max: 89, points: 3 },
      { grade: "C", min: 70, max: 79, points: 2 },
      { grade: "F", min: 0, max: 69, points: 0 },
    ],
  },
  courseLevels: [
    { name: "Honors", bonus: 0.5 },
    { name: "AP", bonus: 1 },
  ],
};

// A scale with no points has no GPA, and nothing is made up.
assert.equal(
  gpaOf({ gradingScale: { levels: [{ grade: "A", min: 0, max: 100 }] } }, [
    { percentage: 95 },
  ]),
  null,
);

// Plain average of points; AP and Honors add their bonus when points were earned.
const g = gpaOf(scale, [
  { percentage: 95 }, // 4
  { percentage: 85, courseLevel: "Honors" }, // 3 + .5
  { percentage: 75, courseLevel: "AP" }, // 2 + 1
  { percentage: 40, courseLevel: "AP" }, // failed: no bonus
  { percentage: null }, // unmarked: left out
])!;
assert.equal(g.courses, 4);
assert.equal(g.unweighted, 2.25);
assert.equal(g.weighted, 2.63);
assert.equal(formatGpa(g), "2.25 (2.63 weighted)");
assert.equal(formatGpa({ unweighted: 3, weighted: 3, courses: 1 }), "3.00");

// Credits weight a course: a half-credit B beside a full-credit A.
const half = gpaOf(scale, [
  { percentage: 95 },
  { percentage: 85, credits: 0.5 },
])!;
assert.equal(half.unweighted, 3.67);
assert.equal(half.credits, 1.5);

// The school's own words.
const w = schoolWords({
  customLabels: { arm: "homeroom", formTeacher: "homeroom teacher" },
  termStructure: "quarters",
});
assert.equal(termWord({ termStructure: "quarters" }).Term, "Quarter");
assert.equal(termWord({ termStructure: "terms" }).Terms, "Terms");
assert.equal(
  inSchoolWords("Ask the form teacher about an arm and the terms.", w),
  "Ask the homeroom teacher about a homeroom and the quarters.",
);
const help = capabilitiesFor("admin", { words: w });
assert.ok(
  !help.some((c) => /\barms?\b/i.test(c.title + c.summary)),
  "no capability still says arm",
);

console.log("gpa and school words: ok");
