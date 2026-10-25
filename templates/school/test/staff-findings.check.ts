import assert from "node:assert/strict";
import {
  classFindingsFor,
  teacherFindingsFor,
  type ClassFact,
} from "../shared/staff-findings";

const fact = (over: Partial<ClassFact>): ClassFact => ({
  classId: "c",
  name: "JSS1A Mathematics",
  subject: "Mathematics",
  yearGroup: "JSS1",
  learners: 15,
  average: 60,
  othersAverage: 60,
  othersCount: 2,
  othersWithOtherTeachers: 2,
  papersSet: 4,
  awaitingMarks: [],
  unpublished: [],
  notes: { expected: 10, written: 10, ready: 10 },
  ...over,
});

// All classes below the pass mark is one finding, with each class as evidence.
{
  const f = teacherFindingsFor({
    passMark: 50,
    classes: [
      fact({
        classId: "a",
        name: "JSS1A Maths",
        average: 38,
        othersAverage: 52,
      }),
      fact({
        classId: "b",
        name: "JSS2A Maths",
        average: 41,
        othersAverage: 55,
      }),
    ],
  });
  const all = f.concerns.find((c) => c.kind === "all-below-pass");
  assert.ok(all, "all-below-pass raised");
  assert.equal(all!.evidence.length, 2);
  assert.ok(
    !f.concerns.some((c) => c.kind === "below-pass"),
    "not repeated per class",
  );
  assert.ok(f.concerns.some((c) => c.kind === "behind-others"));
  assert.ok(f.next.some((n) => /ask the teacher/i.test(n)));
}

// One class below while others are fine is raised for that class only.
{
  const f = teacherFindingsFor({
    passMark: 50,
    classes: [
      fact({ name: "A", average: 40, othersAverage: 42 }),
      fact({ name: "B", average: 70, othersAverage: 68 }),
    ],
  });
  assert.equal(f.concerns.filter((c) => c.kind === "below-pass").length, 1);
  assert.ok(!f.concerns.some((c) => c.kind === "all-below-pass"));
}

// Marking waiting under a week is not raised; over a week is.
{
  const recent = teacherFindingsFor({
    passMark: 50,
    classes: [
      fact({ awaitingMarks: [{ title: "Test 1", count: 5, oldestDays: 3 }] }),
    ],
  });
  assert.ok(!recent.concerns.some((c) => c.kind === "marking-waiting"));
  const old = teacherFindingsFor({
    passMark: 50,
    classes: [
      fact({ awaitingMarks: [{ title: "Test 1", count: 5, oldestDays: 9 }] }),
    ],
  });
  const m = old.concerns.find((c) => c.kind === "marking-waiting");
  assert.ok(m && /9 days/.test(m.text));
}

// Nothing waiting and notes complete are strengths.
{
  const f = teacherFindingsFor({ passMark: 50, classes: [fact({})] });
  assert.ok(f.strengths.some((s) => s.kind === "marking-up-to-date"));
  assert.ok(f.strengths.some((s) => s.kind === "notes-ready"));
}

// A class page names the learners behind a number and never a cause.
{
  const f = classFindingsFor({
    passMark: 50,
    cls: fact({ average: 44, othersAverage: 58 }),
    learners: [
      { name: "Ada", percentage: 30, nothingHandedIn: false },
      { name: "Bayo", percentage: null, nothingHandedIn: true },
      { name: "Chi", percentage: 70, nothingHandedIn: false },
    ],
    papers: [
      { title: "Test 1", marked: 14, average: 31, handedIn: 14, enrolled: 15 },
    ],
  });
  const kinds = f.concerns.map((c) => c.kind);
  for (const k of [
    "below-pass",
    "behind-others",
    "learners-below-pass",
    "nothing-handed-in",
    "weak-papers",
  ]) {
    assert.ok(kinds.includes(k as any), `${k} raised`);
  }
  const text = JSON.stringify(f);
  assert.ok(
    !/because|due to|lazy|ability|struggl/i.test(text),
    "no causes or labels",
  );
}

console.log("staff-findings: ok");
