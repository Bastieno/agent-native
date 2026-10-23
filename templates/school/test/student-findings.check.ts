/**
 * Checks for what a learner is doing well and what needs attention.
 * Run: npx tsx test/student-findings.check.ts
 */
import assert from "node:assert/strict";
import {
  findingsFor,
  type FindingPiece,
  type FindingSubject,
} from "../shared/student-findings.js";

const summary = {
  percentage: 55,
  passMark: 40,
  handedIn: 10,
  set: 10,
  missed: 0,
  earlier: null as number | null,
  later: null as number | null,
};
const piece = (
  title: string,
  state: FindingPiece["state"],
  percentage: number | null = null,
): FindingPiece => ({ title, topic: title, state, percentage });
const subject = (
  name: string,
  percentage: number | null,
  over: Partial<FindingSubject> = {},
): FindingSubject => ({
  classId: name,
  subject: name,
  teacher: `Teacher of ${name}`,
  percentage,
  belowPassMark: percentage !== null && percentage < 40,
  marked: percentage === null ? 0 : 4,
  missed: 0,
  pieces: [],
  classAverage: null,
  ...over,
});

// Nothing to say without a summary.
assert.deepEqual(findingsFor({ subjects: [], summary: null }), {
  strengths: [],
  concerns: [],
  next: [],
});

// A subject under the pass mark is a concern, with the class gap said.
{
  const f = findingsFor({
    subjects: [subject("Maths", 31, { classAverage: 50 })],
    summary: { ...summary, percentage: 31 },
  });
  assert.equal(f.concerns.length, 1);
  assert.match(
    f.concerns[0].text,
    /Maths: 31%, below the 40% pass mark and 19 points under the class average/,
  );
  assert.equal(f.concerns[0].kind, "below-pass-mark");
  assert.match(f.next[0], /Teacher of Maths/);
}

// Well above the class is a strength; just above it, without a gap, is not.
{
  const f = findingsFor({
    subjects: [
      subject("Yoruba", 66, { classAverage: 45 }),
      subject("History", 45, { classAverage: 44 }),
    ],
    summary,
  });
  assert.equal(f.strengths.filter((s) => s.subject === "Yoruba").length, 1);
  assert.equal(f.strengths.filter((s) => s.subject === "History").length, 0);
  assert.equal(f.concerns.length, 0);
}

// Missed work is named, and it is a concern even when marks are fine.
{
  const f = findingsFor({
    subjects: [
      subject("Science", 62, {
        missed: 1,
        pieces: [piece("Week 4 worksheet", "missed")],
      }),
    ],
    summary: { ...summary, missed: 1, handedIn: 9 },
  });
  assert.equal(f.concerns.length, 1);
  assert.equal(f.concerns[0].kind, "missed-work");
  assert.match(f.concerns[0].text, /Week 4 worksheet/);
  assert.match(f.next[0], /Week 4 worksheet/);
  // Having missed something rules out "handed in everything".
  assert.equal(
    f.strengths.some((s) => s.kind === "all-handed-in"),
    false,
  );
}

// A zero mark counts: a learner with a real 0% is below the pass mark.
{
  const f = findingsFor({
    subjects: [subject("Art", 0)],
    summary: { ...summary, percentage: 0 },
  });
  assert.equal(f.concerns[0].kind, "below-pass-mark");
}

// Trend needs a real gap, and only then is it said, in the right direction.
{
  const up = findingsFor({
    subjects: [],
    summary: { ...summary, earlier: 50, later: 60 },
  });
  assert.equal(
    up.strengths.some((s) => s.kind === "trend-up"),
    true,
  );
  const down = findingsFor({
    subjects: [],
    summary: { ...summary, earlier: 60, later: 50 },
  });
  assert.equal(
    down.concerns.some((c) => c.kind === "trend-down"),
    true,
  );
  const flat = findingsFor({
    subjects: [],
    summary: { ...summary, earlier: 55, later: 58 },
  });
  assert.equal(
    [...flat.strengths, ...flat.concerns].some((f) =>
      f.kind.startsWith("trend"),
    ),
    false,
  );
}

// A trend names what was counted, so it can be checked: the dates, how much
// was not handed in, and the marks actually earned on their own.
{
  const f = findingsFor({
    subjects: [],
    summary: {
      ...summary,
      earlier: 22,
      later: 38,
      missedCountsAsZero: true,
      trend: {
        earlier: {
          count: 59,
          missed: 17,
          from: "2026-09-18",
          to: "2026-10-16",
          average: 22,
          averageOfMarked: 31,
        },
        later: {
          count: 60,
          missed: 16,
          from: "2026-10-16",
          to: "2026-12-03",
          average: 38,
          averageOfMarked: 52,
        },
      },
    },
  });
  const trend = f.strengths.find((x) => x.kind === "trend-up")!;
  assert.match(trend.text, /work due 18 Sep to 16 Oct averaged 22%/);
  assert.match(trend.text, /31% rising to 52%/);
  assert.match(trend.basis, /not handed in counts as zero/);
  assert.ok(
    trend.evidence.some((e) => /17 not handed in \(counted as zero\)/.test(e)),
  );
  // Every finding says how it was counted.
  for (const x of [...f.strengths, ...f.concerns])
    assert.ok(x.basis.length > 0);
}

// Struggling everywhere is one line, with the rest kept as evidence.
{
  const many = ["A", "B", "C", "D", "E", "F"].map((n, i) =>
    subject(n, 20 + i, { classAverage: 45 }),
  );
  const f = findingsFor({
    subjects: many,
    summary: { ...summary, percentage: 22 },
  });
  const below = f.concerns.filter((c) => c.kind === "below-pass-mark");
  assert.equal(below.length, 1);
  assert.match(below[0].text, /Below the 40% pass mark in 6 of 6 subjects/);
  assert.equal(below[0].evidence.length, 6);
  // Next steps still name teachers, since they come from the detail.
  assert.ok(f.next.length > 0 && f.next.length <= 4);
}

// Nothing marked yet is said as that, not as a low mark.
{
  const f = findingsFor({
    subjects: [subject("Biology", null, { pieces: [piece("Quiz", "open")] })],
    summary,
  });
  assert.equal(f.concerns[0].kind, "nothing-marked");
}

console.log("student findings: ok");
