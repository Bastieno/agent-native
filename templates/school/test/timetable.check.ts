/**
 * Checks for the school's week and rooms. Run: npx tsx test/timetable.check.ts
 */
import assert from "node:assert/strict";
import {
  doubleSecondPeriod,
  validPairs,
  findPeriod,
  placementSlot,
  roomKey,
  roomProblems,
  schoolWeekdayName,
  schoolWeekdayShortName,
  timesOverlap,
  weekProblems,
  type SchoolWeek,
  type WeekPeriod,
  type Weekday,
} from "../shared/school-week.js";
import { countsProblem } from "../shared/lesson-counts.js";
import { countCoverage } from "../server/lib/timetable-coverage.js";
import { isShort, shortInWords } from "../shared/timetable-coverage.js";
import { gridSpans } from "../shared/timetable-grid.js";
import {
  findClashes,
  type ResolvedPeriod,
} from "../server/lib/timetable-clashes.js";

function check(name: string, fn: () => void) {
  try {
    fn();
    console.log(`PASS ${name}`);
  } catch (err) {
    console.log(`FAIL ${name}\n  ${(err as Error).message}`);
    process.exitCode = 1;
  }
}

const lesson = (number: number, start: string, end: string): WeekPeriod => ({
  number,
  start,
  end,
  kind: "lesson",
});

const fiveLessons = (): WeekPeriod[] => [
  lesson(1, "08:00", "08:40"),
  lesson(2, "08:40", "09:20"),
  lesson(3, "09:20", "10:00"),
  { number: 4, start: "10:00", end: "10:20", kind: "break", label: "Break" },
  lesson(5, "10:20", "11:00"),
  lesson(6, "11:00", "11:40"),
];

function validWeek(): SchoolWeek {
  const days: SchoolWeek["days"] = ([1, 2, 3, 4] as Weekday[]).map((day) => ({
    day,
    periods: fiveLessons(),
  }));
  days.push({ day: 5, periods: fiveLessons() });
  days.push({
    day: 6,
    periods: [lesson(1, "09:00", "09:40"), lesson(2, "09:40", "10:20")],
  });
  return { cycleLength: 1, days };
}

check("a valid week has no problems", () => {
  assert.deepEqual(weekProblems(validWeek()), []);
});

check("a period that ends before it starts names the day and number", () => {
  const week = validWeek();
  week.days[4].periods[2] = lesson(3, "09:00", "08:40");
  const problems = weekProblems(week);
  assert.equal(problems.length, 1);
  assert.equal(problems[0].day, 5);
  assert.match(problems[0].message, /Friday/);
  assert.match(problems[0].message, /period 3/);
});

check("duplicate period numbers on a day are a problem", () => {
  const week = validWeek();
  week.days[0].periods[3].number = 3;
  assert.ok(
    weekProblems(week).some(
      (p) => /Monday/.test(p.message) && /3/.test(p.message),
    ),
  );
});

check("overlapping periods are a problem", () => {
  const week = validWeek();
  week.days[1].periods = [
    lesson(1, "08:00", "08:40"),
    lesson(2, "08:30", "09:10"),
  ];
  assert.ok(weekProblems(week).some((p) => /Tuesday/.test(p.message)));
});

check("a cycle length other than 1 is a problem", () => {
  const week = { ...validWeek(), cycleLength: 2 } as unknown as SchoolWeek;
  assert.ok(weekProblems(week).length >= 1);
});

check("a malformed time is a problem", () => {
  const week = validWeek();
  week.days[0].periods[0] = lesson(1, "8am", "08:40");
  assert.ok(
    weekProblems(week).some((p) => p.day === 1 && /Monday/.test(p.message)),
  );
});

check("a day listed twice is a problem", () => {
  const week = validWeek();
  week.days.push({ day: 1, periods: [lesson(1, "08:00", "08:40")] });
  assert.ok(
    weekProblems(week).some((p) => p.day === 1 && /Monday/.test(p.message)),
  );
});

check("rooms differing only in case and spacing are one problem", () => {
  const problems = roomProblems([
    { name: "Physics Lab", kind: "special" },
    { name: " physics  lab", kind: "special" },
  ]);
  assert.equal(problems.length, 1);
});

check("a blank room name is a problem", () => {
  assert.equal(roomProblems([{ name: "  ", kind: "classroom" }]).length, 1);
});

check("roomKey trims, collapses spaces and lowercases", () => {
  assert.equal(roomKey(" Physics  Lab "), "physics lab");
});

check("findPeriod returns the period or null", () => {
  const week = validWeek();
  week.days[4].periods = week.days[4].periods.slice(0, 6);
  assert.equal(findPeriod(week, 5, 7), null);
  assert.equal(findPeriod(week, 1, 3)?.start, "09:20");
  assert.equal(findPeriod(null, 1, 3), null);
  assert.equal(findPeriod(week, 7, 1), null);
});

check("timesOverlap is half-open", () => {
  assert.equal(timesOverlap("08:00", "08:40", "08:40", "09:20"), false);
  assert.equal(timesOverlap("08:00", "08:40", "08:39", "09:00"), true);
});

check("schoolWeekdayName comes from the locale", () => {
  assert.equal(schoolWeekdayName(1, "en-GB"), "Monday");
  assert.equal(schoolWeekdayName(6, "fr-FR"), "samedi");
});

check("schoolWeekdayShortName comes from the locale", () => {
  assert.equal(schoolWeekdayShortName(1, "en-GB"), "Mon");
  assert.equal(schoolWeekdayShortName(6, "fr-FR"), "sam.");
});

function rp(id: string, over: Partial<ResolvedPeriod> = {}): ResolvedPeriod {
  return {
    scheduleId: id,
    classId: `c-${id}`,
    className: `Class ${id}`,
    subjectName: "Subject",
    termId: null,
    day: 1,
    periodNumber: 1,
    start: "08:00",
    end: "08:40",
    room: null,
    teachers: [],
    armId: null,
    optionArmIds: [],
    learnerUserIds: [],
    pairId: null,
    lessonLabel: null,
    ...over,
  };
}
const clashCtx = { locale: "en-GB", armNames: { A: "Year 7A", B: "Year 7B" } };
const ada = { userId: "t1", name: "Ada Obi" };

check("a shared teacher on overlapping periods is one teacher clash", () => {
  const out = findClashes(
    [rp("1", { teachers: [ada] }), rp("2", { teachers: [ada] })],
    clashCtx,
  );
  assert.equal(out.length, 1);
  assert.equal(out[0].kind, "teacher");
  assert.match(out[0].message, /Ada Obi/);
  assert.match(out[0].message, /Class 1/);
  assert.match(out[0].message, /Class 2/);
  assert.match(out[0].message, /Monday, period 1/);
});

check("touching periods do not clash", () => {
  const out = findClashes(
    [
      rp("1", { teachers: [ada] }),
      rp("2", { teachers: [ada], start: "08:40", end: "09:20" }),
    ],
    clashCtx,
  );
  assert.deepEqual(out, []);
});

check("rooms compare through roomKey", () => {
  const out = findClashes(
    [rp("1", { room: "Physics Lab" }), rp("2", { room: " physics lab" })],
    clashCtx,
  );
  assert.equal(out.length, 1);
  assert.equal(out[0].kind, "room");
});

check("two whole-arm classes clash once as arm, not learner", () => {
  const out = findClashes(
    [
      rp("1", { armId: "A", learnerUserIds: ["u1"] }),
      rp("2", { armId: "A", learnerUserIds: ["u1"] }),
    ],
    clashCtx,
  );
  assert.equal(out.length, 1);
  assert.equal(out[0].kind, "arm");
  assert.match(out[0].message, /Year 7A/);
});

check("a whole-arm class and an option class from that arm clash", () => {
  const out = findClashes(
    [rp("1", { armId: "A" }), rp("2", { optionArmIds: ["A", "B"] })],
    clashCtx,
  );
  assert.deepEqual(
    out.map((c) => c.kind),
    ["arm"],
  );
});

check("option classes sharing arms with disjoint learners are a block", () => {
  const out = findClashes(
    [
      rp("1", { optionArmIds: ["A", "B"], learnerUserIds: ["u1"] }),
      rp("2", { optionArmIds: ["A", "B"], learnerUserIds: ["u2"] }),
    ],
    clashCtx,
  );
  assert.deepEqual(out, []);
});

check("a shared learner is a learner clash with a count only", () => {
  const out = findClashes(
    [
      rp("1", { optionArmIds: ["A", "B"], learnerUserIds: ["u-secret", "u2"] }),
      rp("2", { optionArmIds: ["A", "B"], learnerUserIds: ["u-secret", "u3"] }),
    ],
    clashCtx,
  );
  assert.equal(out.length, 1);
  assert.equal(out[0].kind, "learner");
  assert.match(out[0].message, /^1 learner/);
  assert.ok(!out[0].message.includes("u-secret"));
});

check("unassigned classes never clash on teacher", () => {
  assert.deepEqual(findClashes([rp("1"), rp("2")], clashCtx), []);
});

check("different days never clash", () => {
  const out = findClashes(
    [
      rp("1", { teachers: [ada], room: "Lab", armId: "A" }),
      rp("2", { teachers: [ada], room: "Lab", armId: "A", day: 2 }),
    ],
    clashCtx,
  );
  assert.deepEqual(out, []);
});

check("input order does not matter: unsorted placements clash the same", () => {
  const a = rp("1", { teachers: [ada], start: "09:00", end: "09:40" });
  const b = rp("2", { teachers: [ada], start: "08:30", end: "09:10" });
  const c = rp("3", { teachers: [ada], start: "10:00", end: "10:40" });
  const forward = findClashes([a, b, c], clashCtx);
  const backward = findClashes([c, b, a], clashCtx);
  assert.equal(forward.length, 1);
  assert.deepEqual(
    forward.map((x) => x.kind),
    backward.map((x) => x.kind),
  );
});

check("equal start times clash", () => {
  const out = findClashes(
    [
      rp("1", { teachers: [ada], end: "08:40" }),
      rp("2", { teachers: [ada], end: "09:00" }),
    ],
    clashCtx,
  );
  assert.equal(out.length, 1);
  assert.equal(out[0].kind, "teacher");
});

check("one long period clashes with each later period it overlaps", () => {
  const out = findClashes(
    [
      rp("1", { teachers: [ada], start: "08:00", end: "10:00" }),
      rp("2", { teachers: [ada], start: "08:30", end: "09:00" }),
      rp("3", { teachers: [ada], start: "09:00", end: "09:30" }),
      rp("4", { teachers: [ada], start: "09:40", end: "10:20" }),
      rp("5", { teachers: [ada], start: "10:00", end: "10:40" }),
    ],
    clashCtx,
  );
  // 1 overlaps 2, 3 and 4; 4 overlaps 5. 1 and 5 only touch; 2 and 3 touch.
  assert.equal(out.length, 4);
});

check("a whole-arm class clashes with an option class listed before it", () => {
  const out = findClashes(
    [rp("1", { optionArmIds: ["A", "B"] }), rp("2", { armId: "B" })],
    clashCtx,
  );
  assert.deepEqual(
    out.map((c) => c.kind),
    ["arm"],
  );
});

check("whole-arm classes of different arms do not clash", () => {
  const out = findClashes(
    [
      rp("1", { armId: "A", learnerUserIds: ["u1"] }),
      rp("2", { armId: "B", learnerUserIds: ["u2"] }),
    ],
    clashCtx,
  );
  assert.deepEqual(out, []);
});

check("a day outside 1 to 7 is a problem, not an exception", () => {
  const week = validWeek();
  week.days.push({ day: Number.NaN as Weekday, periods: [] });
  week.days.push({ day: 9 as Weekday, periods: [] });
  const problems = weekProblems(week);
  assert.equal(problems.length, 2);
  assert.ok(problems.every((p) => p.day === undefined));
});

check("a period number must be a whole number from 1", () => {
  const week = validWeek();
  week.days[0].periods[0].number = 0;
  week.days[1].periods[0].number = 1.5;
  week.days[2].periods[0].number = -2;
  const problems = weekProblems(week);
  assert.deepEqual(
    problems.map((p) => p.day),
    [1, 2, 3],
  );
});

check("problems name days in the given locale", () => {
  const week = validWeek();
  week.days[0].periods[0] = lesson(1, "09:00", "08:40");
  const [problem] = weekProblems(week, "fr");
  assert.equal(problem.day, 1);
  assert.match(problem.message, /lundi/);
});

check("one pair can clash on several kinds; null period uses the time", () => {
  const out = findClashes(
    [
      rp("1", { teachers: [ada], room: "Lab", periodNumber: null }),
      rp("2", { teachers: [ada], room: "lab", periodNumber: null }),
    ],
    clashCtx,
  );
  assert.deepEqual(out.map((c) => c.kind).sort(), ["room", "teacher"]);
  assert.match(out[0].message, /at 08:00/);
});

// ── Slotting a placement into the week (grid and learner week share it) ──

check("a placement goes to the lesson period with its number", () => {
  const slot = placementSlot(validWeek(), {
    day: 1,
    periodNumber: 3,
    start: "13:00",
    end: "13:40",
  });
  assert.equal(slot?.number, 3);
});

check(
  "a placement numbered as a break falls back to the lesson its times overlap",
  () => {
    // Period 4 is a break; the row's stored times sit in period 5.
    const slot = placementSlot(validWeek(), {
      day: 2,
      periodNumber: 4,
      start: "10:30",
      end: "11:00",
    });
    assert.equal(slot?.number, 5);
    assert.equal(slot?.kind, "lesson");
  },
);

check("a placement with a number the day lacks falls back to overlap", () => {
  const slot = placementSlot(validWeek(), {
    day: 6,
    periodNumber: 5,
    start: "09:00",
    end: "09:40",
  });
  assert.equal(slot?.number, 1);
});

check("a placement that fits no lesson is not on this week's bells", () => {
  const week = validWeek();
  // A break number, and times inside the break only.
  assert.equal(
    placementSlot(week, {
      day: 1,
      periodNumber: 4,
      start: "10:00",
      end: "10:20",
    }),
    null,
  );
  // A day the school does not teach.
  assert.equal(
    placementSlot(week, {
      day: 7,
      periodNumber: 1,
      start: "08:00",
      end: "08:40",
    }),
    null,
  );
  // After the last bell.
  assert.equal(
    placementSlot(week, {
      day: 3,
      periodNumber: null,
      start: "15:00",
      end: "15:40",
    }),
    null,
  );
});

// ── Lesson counts and what is still missing ────────────────────────────────
const cov = (
  classId: string,
  periodsPerWeek: number | null,
  doublesPerWeek: number | null = null,
) => ({
  classId,
  className: `Class ${classId}`,
  subjectName: `Subject ${classId}`,
  armId: null,
  periodsPerWeek,
  doublesPerWeek,
});
const row = (classId: string, n: number) =>
  rp(`s${classId}${n}`, { classId, periodNumber: n });

check("coverage counts each class's placed rows against what it needs", () => {
  const out = countCoverage(
    [row("a", 1), row("a", 2), row("a", 3), row("b", 1)],
    [cov("a", 5), cov("b", 2, 1)],
    null,
  );
  const [a, b] = out.classes;
  assert.deepEqual(a.required, { periods: 5, doubles: 0 });
  assert.equal(a.placed.periods, 3);
  assert.equal(a.short.periods, 2);
  assert.deepEqual(b.required, { periods: 2, doubles: 1 });
  assert.equal(b.short.periods, 1);
  assert.equal(out.unset, 0);
});

check("a class with no counts is unset and short of nothing", () => {
  const out = countCoverage([row("a", 1)], [cov("a", null), cov("b", 3)], null);
  assert.equal(out.unset, 1);
  assert.equal(out.classes[0].required, null);
  assert.deepEqual(out.classes[0].short, { periods: 0, doubles: 0 });
  assert.equal(out.classes[1].short.periods, 3);
});

check("a shortfall is never negative", () => {
  const out = countCoverage(
    [row("a", 1), row("a", 2), row("a", 3)],
    [cov("a", 2), cov("b", 0)],
    null,
  );
  assert.equal(out.classes[0].short.periods, 0);
  assert.equal(out.classes[1].short.periods, 0);
});

check("counts that cannot stand are refused in words", () => {
  assert.equal(countsProblem(5, 2), null);
  assert.equal(countsProblem(null, null), null);
  assert.match(countsProblem(3, 2) ?? "", /more than the 3 a week/);
  assert.match(countsProblem(null, 1) ?? "", /how many periods first/);
  assert.match(countsProblem(-1, null) ?? "", /whole number/);
  assert.match(countsProblem(2.5, null) ?? "", /whole number/);
});

// ── Doubles ────────────────────────────────────────────────────────────────
const dayWithBreak: SchoolWeek = {
  cycleLength: 1,
  days: [
    {
      day: 2,
      periods: [
        // Listed out of order on purpose: the rule follows the bells.
        lesson(2, "08:40", "09:20"),
        lesson(1, "08:00", "08:40"),
        { number: 3, start: "09:20", end: "09:40", kind: "break" },
        lesson(4, "09:40", "10:20"),
        lesson(5, "10:20", "11:00"),
      ],
    },
  ],
};

check("a double takes the next lesson period of the day", () => {
  const out = doubleSecondPeriod(dayWithBreak, 2, 1);
  assert.equal(out.second?.number, 2);
  assert.equal(out.blocker, null);
});

check("a break straight after means no double, and names the break", () => {
  const out = doubleSecondPeriod(dayWithBreak, 2, 2);
  assert.equal(out.second, null);
  assert.equal(out.blocker?.number, 3);
});

check("the day's last period has no second half", () => {
  const out = doubleSecondPeriod(dayWithBreak, 2, 5);
  assert.equal(out.second, null);
  assert.equal(out.blocker, null);
  assert.equal(doubleSecondPeriod(dayWithBreak, 4, 1).second, null);
});

const half = (id: string, n: number, pairId: string | null, day = 2) => {
  const p = findPeriod(dayWithBreak, 2, n)!;
  return rp(id, {
    classId: "a",
    day,
    periodNumber: n,
    start: p.start,
    end: p.end,
    pairId,
  });
};

check("a pair counts as two periods and one double", () => {
  const out = countCoverage(
    [half("p1", 1, "x"), half("p2", 2, "x"), half("s", 5, null)],
    [cov("a", 5, 1)],
    dayWithBreak,
  );
  assert.deepEqual(out.classes[0].placed, { periods: 3, doubles: 1 });
  assert.deepEqual(out.classes[0].short, { periods: 2, doubles: 0 });
});

check("four singles are short of 4 periods with 1 double, in words", () => {
  const out = countCoverage(
    [1, 2, 4, 5].map((n) => half(`s${n}`, n, null)),
    [cov("a", 4, 1)],
    dayWithBreak,
  );
  const c = out.classes[0];
  assert.equal(isShort(c), true);
  assert.deepEqual(c.short, { periods: 0, doubles: 1 });
  assert.equal(shortInWords(c.required!, c.placed), "4 of 4, 0 of 1 double");
});

check("a class with every period and double is not short", () => {
  const out = countCoverage(
    [half("p1", 1, "x"), half("p2", 2, "x"), half("s", 5, null)],
    [cov("a", 3, 1)],
    dayWithBreak,
  );
  assert.equal(isShort(out.classes[0]), false);
  assert.equal(
    shortInWords(out.classes[0].required!, out.classes[0].placed),
    "3 of 3, 1 of 1 double",
  );
});

check("one half on its own is not a double", () => {
  const out = countCoverage(
    [half("p1", 1, "x")],
    [cov("a", 2, 1)],
    dayWithBreak,
  );
  assert.deepEqual(out.classes[0].placed, { periods: 1, doubles: 0 });
});

check(
  "only a real double is valid: two rows, one day, next lesson period",
  () => {
    const rows = [
      half("ok1", 1, "ok"),
      half("ok2", 2, "ok"),
      // A gap: period 4 does not follow period 2 (a break sits between).
      half("gap1", 2, "gap"),
      half("gap2", 4, "gap"),
      // Three rows of one pair, and a lone half.
      half("t1", 4, "three"),
      half("t2", 5, "three"),
      half("t3", 5, "three"),
      half("lone", 4, "lone"),
    ];
    const pairs = validPairs(dayWithBreak, rows);
    assert.deepEqual([...pairs.keys()], ["ok"]);
    assert.deepEqual(
      pairs.get("ok")!.map((p) => p.scheduleId),
      ["ok1", "ok2"],
    );
    const out = countCoverage(rows, [cov("a", 8, 1)], dayWithBreak);
    assert.deepEqual(out.classes[0].placed, { periods: 8, doubles: 1 });
  },
);

check("halves on different days are not a double", () => {
  const rows = [half("d1", 1, "x", 2), half("d2", 2, "x", 3)];
  assert.equal(validPairs(dayWithBreak, rows).size, 0);
});

// The admin grid's rows for dayWithBreak: 1, 2, break 3, 4, 5.
const gridRows = [1, 2, 3, 4, 5];
const gridWeek: SchoolWeek = {
  cycleLength: 1,
  days: [
    {
      day: 2,
      periods: [
        lesson(1, "08:00", "08:40"),
        lesson(2, "08:40", "09:20"),
        lesson(3, "09:20", "10:00"),
        lesson(4, "10:00", "10:40"),
      ],
    },
  ],
};
const g = (id: string, n: number, pairId: string | null) => {
  const p = findPeriod(gridWeek, 2, n)!;
  return rp(id, {
    day: 2,
    periodNumber: n,
    start: p.start,
    end: p.end,
    pairId,
  });
};

check("a double spans its two grid rows", () => {
  const out = gridSpans(
    gridWeek,
    [1, 2, 3, 4],
    [g("x1", 1, "x"), g("x2", 2, "x")],
  );
  assert.deepEqual([...out.spans], ["2:0"]);
  assert.deepEqual([...out.hidden], ["x2"]);
});

check(
  "staggered doubles: the second is drawn as two cells, every row kept",
  () => {
    // X in 1–2, Y in 2–3 (an option block, or a clash).
    const out = gridSpans(
      gridWeek,
      [1, 2, 3, 4],
      [g("x1", 1, "x"), g("x2", 2, "x"), g("y1", 2, "y"), g("y2", 3, "y")],
    );
    assert.deepEqual([...out.spans], ["2:0"]);
    assert.deepEqual([...out.hidden], ["x2"]);
    assert.equal(out.partnerOf.has("y1"), false);
    // No row is covered by a span other than the one directly below a span's top.
    const covered = [...out.spans].map((k) => Number(k.split(":")[1]) + 1);
    assert.ok(!covered.some((r) => out.spans.has(`2:${r}`)));
  },
);

check("two doubles over the same two rows share one span", () => {
  const out = gridSpans(
    gridWeek,
    [1, 2, 3, 4],
    [g("x1", 3, "x"), g("x2", 4, "x"), g("y1", 3, "y"), g("y2", 4, "y")],
  );
  assert.deepEqual([...out.spans], ["2:2"]);
  assert.deepEqual([...out.hidden].sort(), ["x2", "y2"]);
});

check("a double split by a break row does not span", () => {
  const out = gridSpans(dayWithBreak, gridRows, [
    half("a1", 2, "a"),
    half("a2", 4, "a"),
  ]);
  assert.equal(out.spans.size, 0);
});

// ── timetable generator: units ──
import {
  buildUnits,
  type GenClass,
  type GenInput,
} from "../server/lib/timetable-generator.js";

function genClass(over: Partial<GenClass> & { classId: string }): GenClass {
  return {
    className: over.classId,
    subjectName: "s",
    armId: "arm-1",
    optionArmIds: [],
    teacherIds: ["t1"],
    teacherNames: { t1: "T" },
    room: null,
    learnerUserIds: [],
    required: { periods: 5, doubles: 1 },
    placed: { periods: 0, doubles: 0 },
    ...over,
  };
}
function genInput(classes: GenClass[]): GenInput {
  return { week: gridWeek, armNames: {}, fixed: [], classes };
}
const countKind = (u: { kind: string }[], k: string) =>
  u.filter((x) => x.kind === k).length;

check(
  "units: a class short 5 periods with 1 double gives 1 double + 3 singles",
  () => {
    const out = buildUnits(genInput([genClass({ classId: "a" })]));
    assert.equal(countKind(out.units, "double"), 1);
    assert.equal(countKind(out.units, "single"), 3);
    assert.deepEqual(
      out.units.map((u) => u.id),
      ["a:double:0", "a:single:0", "a:single:1", "a:single:2"],
    );
  },
);

check("units: one valid pair and one single placed leaves 2 singles", () => {
  const out = buildUnits(
    genInput([genClass({ classId: "a", placed: { periods: 3, doubles: 1 } })]),
  );
  assert.equal(countKind(out.units, "double"), 0);
  assert.equal(countKind(out.units, "single"), 2);
});

check("units: required null gives no units and is not set", () => {
  const out = buildUnits(
    genInput([genClass({ classId: "a", required: null })]),
  );
  assert.equal(out.units.length, 0);
  assert.deepEqual(out.notSet, ["a"]);
});

check("units: a block reserves the most-needing member's slots", () => {
  const arms = ["x", "y"];
  const out = buildUnits(
    genInput([
      genClass({ classId: "a", armId: null, optionArmIds: arms }),
      genClass({
        classId: "b",
        armId: null,
        optionArmIds: [...arms].reverse(),
        required: { periods: 3, doubles: 0 },
      }),
    ]),
  );
  assert.equal(countKind(out.units, "double"), 1);
  assert.equal(countKind(out.units, "single"), 3);
  assert.ok(out.units.every((u) => u.blockKey === "x,y"));
  let free = 0;
  for (const u of out.units) {
    const m = u.members.find((x) => x.classId === "b")!;
    free += (u.kind === "double" ? 2 : 1) - m.periods;
  }
  assert.equal(free, 2);
});

check("units: a class with no teachers and units is listed", () => {
  const out = buildUnits(
    genInput([
      genClass({ classId: "a", teacherIds: [] }),
      genClass({ classId: "b", teacherIds: [], required: null }),
    ]),
  );
  assert.deepEqual(out.noTeacher, ["a"]);
});

check("units: the same input gives identical output", () => {
  const input = genInput([
    genClass({ classId: "b" }),
    genClass({ classId: "a", required: { periods: 2, doubles: 0 } }),
  ]);
  assert.equal(
    JSON.stringify(buildUnits(input)),
    JSON.stringify(buildUnits(input)),
  );
});

function memberTotals(
  units: ReturnType<typeof buildUnits>["units"],
  classId: string,
) {
  let periods = 0;
  let doubles = 0;
  for (const u of units)
    for (const m of u.members)
      if (m.classId === classId) {
        periods += m.periods;
        if (m.use === "double") doubles++;
      }
  return { periods, doubles };
}
const blockArms = ["x", "y"];
const blockOf = (id: string, req: { periods: number; doubles: number }) =>
  genClass({
    classId: id,
    armId: null,
    optionArmIds: blockArms,
    required: req,
  });

check("units: block A(4,2)+B(4,0) represents all of B", () => {
  const out = buildUnits(
    genInput([
      blockOf("a", { periods: 4, doubles: 2 }),
      blockOf("b", { periods: 4, doubles: 0 }),
    ]),
  );
  assert.deepEqual(memberTotals(out.units, "b"), { periods: 4, doubles: 0 });
  assert.deepEqual(memberTotals(out.units, "a"), { periods: 4, doubles: 2 });
});

check("units: block A(2,1)+B(2,0) represents all of B", () => {
  const out = buildUnits(
    genInput([
      blockOf("a", { periods: 2, doubles: 1 }),
      blockOf("b", { periods: 2, doubles: 0 }),
    ]),
  );
  assert.deepEqual(memberTotals(out.units, "b"), { periods: 2, doubles: 0 });
});

check("units: a covered block member is free throughout", () => {
  const out = buildUnits(
    genInput([
      blockOf("a", { periods: 3, doubles: 0 }),
      {
        ...blockOf("b", { periods: 3, doubles: 0 }),
        placed: { periods: 3, doubles: 0 },
      },
    ]),
  );
  assert.ok(out.units.length > 0);
  for (const u of out.units)
    assert.deepEqual(
      u.members.find((m) => m.classId === "b"),
      {
        classId: "b",
        use: "free",
        periods: 0,
      },
    );
});

check("units: block members with different doubles are all represented", () => {
  const out = buildUnits(
    genInput([
      blockOf("a", { periods: 6, doubles: 3 }),
      blockOf("b", { periods: 5, doubles: 1 }),
      blockOf("c", { periods: 4, doubles: 2 }),
    ]),
  );
  assert.deepEqual(memberTotals(out.units, "a"), { periods: 6, doubles: 3 });
  assert.deepEqual(memberTotals(out.units, "b"), { periods: 5, doubles: 1 });
  assert.deepEqual(memberTotals(out.units, "c"), { periods: 4, doubles: 2 });
});

check(
  "units: (5,1)+(3,0) gives B three single periods and a free double",
  () => {
    const out = buildUnits(
      genInput([
        blockOf("a", { periods: 5, doubles: 1 }),
        blockOf("b", { periods: 3, doubles: 0 }),
      ]),
    );
    assert.deepEqual(memberTotals(out.units, "b"), { periods: 3, doubles: 0 });
    const d = out.units.find((u) => u.kind === "double")!;
    assert.deepEqual(
      d.members.find((m) => m.classId === "a"),
      {
        classId: "a",
        use: "double",
        periods: 2,
      },
    );
  },
);

// ── timetable generator: the solver ──
import {
  generateTimetable,
  type ProposedLesson,
} from "../server/lib/timetable-generator.js";

/** Five lessons a day around one break, on days 1 to 5. */
const solverDay = (): WeekPeriod[] => [
  lesson(1, "08:00", "08:40"),
  lesson(2, "08:40", "09:20"),
  { number: 3, start: "09:20", end: "09:40", kind: "break" },
  lesson(4, "09:40", "10:20"),
  lesson(5, "10:20", "11:00"),
  lesson(6, "11:00", "11:40"),
];
const solverWeek: SchoolWeek = {
  cycleLength: 1,
  days: ([1, 2, 3, 4, 5] as Weekday[]).map((day) => ({
    day,
    periods: solverDay(),
  })),
};
const fixedNow = () => 1000;
const solverIn = (classes: GenClass[], fixed: ResolvedPeriod[] = []) => ({
  week: solverWeek,
  armNames: {},
  fixed,
  classes,
});

/** Proposed lessons as the clash finder reads them, ids `gen-<n>`. */
function asResolved(
  lessons: ProposedLesson[],
  input: GenInput,
): ResolvedPeriod[] {
  const byId = new Map(input.classes.map((c) => [c.classId, c]));
  return lessons.map((l, i) => {
    const c = byId.get(l.classId)!;
    return {
      scheduleId: `gen-${i}`,
      classId: c.classId,
      className: c.className,
      subjectName: c.subjectName,
      termId: null,
      day: l.day,
      periodNumber: l.periodNumber,
      start: l.start,
      end: l.end,
      room: l.room,
      teachers: c.teacherIds.map((id) => ({
        userId: id,
        name: c.teacherNames[id] ?? id,
      })),
      armId: c.armId,
      optionArmIds: c.optionArmIds,
      learnerUserIds: c.learnerUserIds,
      pairId: l.pairKey,
      lessonLabel: null,
    };
  });
}
const newClashes = (input: GenInput, lessons: ProposedLesson[]) =>
  findClashes([...input.fixed, ...asResolved(lessons, input)], {
    armNames: {},
  }).filter((c) => c.scheduleIds.some((id) => id.startsWith("gen-")));
const fixedAt = (
  id: string,
  classId: string,
  day: number,
  n: number,
  over: Partial<ResolvedPeriod> = {},
) => {
  const p = findPeriod(solverWeek, day, n)!;
  return rp(id, {
    classId,
    day,
    periodNumber: n,
    start: p.start,
    end: p.end,
    ...over,
  });
};
const learners = (prefix: string, n: number) =>
  Array.from({ length: n }, (_, i) => `${prefix}${i}`);

function twoArmSchool(): GenInput {
  const armA = learners("la", 6);
  const armB = learners("lb", 6);
  return solverIn(
    [
      genClass({
        classId: "a1",
        armId: "A",
        teacherIds: ["t1"],
        room: "Lab",
        learnerUserIds: armA,
        placed: { periods: 1, doubles: 0 },
        required: { periods: 5, doubles: 1 },
      }),
      genClass({
        classId: "a2",
        armId: "A",
        teacherIds: ["t2"],
        learnerUserIds: armA,
        required: { periods: 4, doubles: 0 },
      }),
      genClass({
        classId: "b1",
        armId: "B",
        teacherIds: ["t1"],
        room: " lab ",
        learnerUserIds: armB,
        required: { periods: 5, doubles: 1 },
      }),
      genClass({
        classId: "b2",
        armId: "B",
        teacherIds: ["t3", "t2"],
        learnerUserIds: armB,
        required: { periods: 4, doubles: 1 },
      }),
      genClass({
        classId: "o1",
        armId: null,
        optionArmIds: ["A", "B"],
        teacherIds: ["t4"],
        learnerUserIds: [...armA.slice(0, 3), ...armB.slice(0, 3)],
        required: { periods: 3, doubles: 1 },
      }),
      genClass({
        classId: "o2",
        armId: null,
        optionArmIds: ["B", "A"],
        teacherIds: ["t5"],
        learnerUserIds: [...armA.slice(3), ...armB.slice(3)],
        required: { periods: 3, doubles: 0 },
      }),
    ],
    [
      fixedAt("f1", "a1", 1, 1, {
        armId: "A",
        teachers: [{ userId: "t1", name: "T" }],
        room: "Lab",
        learnerUserIds: armA,
      }),
      fixedAt("f2", "x", 2, 4, {
        teachers: [{ userId: "t2", name: "T" }],
      }),
    ],
  );
}
const periodsOf = (lessons: ProposedLesson[], classId: string) =>
  lessons.filter((l) => l.classId === classId);
const slotsOf = (lessons: ProposedLesson[], classId: string) =>
  periodsOf(lessons, classId)
    .map((l) => `${l.day}:${l.periodNumber}`)
    .sort();

check(
  "solver: a feasible two-arm school is fully placed without clashes",
  () => {
    const input = twoArmSchool();
    const out = generateTimetable(input, { now: fixedNow });
    assert.deepEqual(out.unplaced, []);
    assert.deepEqual(newClashes(input, out.lessons), []);
    const want: Record<string, [number, number]> = {
      a1: [4, 1],
      a2: [4, 0],
      b1: [5, 1],
      b2: [4, 1],
      o1: [3, 1],
      o2: [3, 0],
    };
    for (const [id, [periods, doubles]] of Object.entries(want)) {
      const mine = periodsOf(out.lessons, id);
      assert.equal(mine.length, periods, `${id} periods`);
      const pairs = new Set(mine.map((l) => l.pairKey).filter(Boolean));
      assert.equal(pairs.size, doubles, `${id} doubles`);
    }
  },
);

check(
  "solver: fixed lessons are unchanged and nothing is placed on them",
  () => {
    const input = twoArmSchool();
    const before = JSON.stringify(input.fixed);
    const out = generateTimetable(input, { now: fixedNow });
    assert.equal(JSON.stringify(input.fixed), before);
    assert.ok(
      !out.lessons.some(
        (l) => l.classId === "a1" && l.day === 1 && l.periodNumber === 1,
      ),
    );
    assert.ok(
      !out.lessons.some(
        (l) =>
          ["a2", "b2"].includes(l.classId) &&
          l.day === 2 &&
          l.periodNumber === 4,
      ),
    );
  },
);

check("solver: a double never straddles a break", () => {
  const input = twoArmSchool();
  const out = generateTimetable(input, { now: fixedNow });
  const rows = asResolved(out.lessons, input);
  const keys = new Set(out.lessons.map((l) => l.pairKey).filter(Boolean));
  assert.ok(keys.size > 0);
  assert.equal(validPairs(solverWeek, rows).size, keys.size);
});

check("solver: a block's members share every slot they use", () => {
  const input = twoArmSchool();
  const out = generateTimetable(input, { now: fixedNow });
  assert.deepEqual(slotsOf(out.lessons, "o1"), slotsOf(out.lessons, "o2"));
});

check(
  "solver: R3 — a member's singles in a double slot take its periods",
  () => {
    const input = solverIn([
      blockOf("a", { periods: 4, doubles: 2 }),
      blockOf("b", { periods: 4, doubles: 0 }),
      genClass({
        classId: "c",
        armId: null,
        optionArmIds: ["p", "q"],
        teacherIds: ["tc"],
        required: { periods: 2, doubles: 1 },
      }),
      genClass({
        classId: "d",
        armId: null,
        optionArmIds: ["p", "q"],
        teacherIds: ["td"],
        required: { periods: 1, doubles: 0 },
      }),
    ]).classes;
    for (const c of input) if (c.classId === "b") c.teacherIds = ["tb"];
    const gi = solverIn(input);
    const out = generateTimetable(gi, { now: fixedNow });
    assert.deepEqual(out.unplaced, []);
    const b = periodsOf(out.lessons, "b");
    assert.equal(b.length, 4);
    assert.ok(b.every((l) => l.pairKey === null));
    assert.deepEqual(slotsOf(out.lessons, "b"), slotsOf(out.lessons, "a"));
    const c = periodsOf(out.lessons, "c");
    const d = periodsOf(out.lessons, "d");
    assert.equal(d.length, 1);
    assert.equal(d[0].pairKey, null);
    const first = [...c].sort((x, y) => x.start.localeCompare(y.start))[0];
    assert.equal(
      `${d[0].day}:${d[0].periodNumber}`,
      `${first.day}:${first.periodNumber}`,
    );
    assert.deepEqual(newClashes(gi, out.lessons), []);
  },
);

check("solver: five singles over a five-day week land on five days", () => {
  const input = solverIn([
    genClass({ classId: "a", required: { periods: 5, doubles: 0 } }),
  ]);
  const out = generateTimetable(input, { now: fixedNow });
  assert.equal(new Set(out.lessons.map((l) => l.day)).size, 5);
});

check("solver: fixed lessons that already clash add no new clash", () => {
  const t = [{ userId: "t1", name: "T" }];
  const input = solverIn(
    [
      genClass({
        classId: "a",
        armId: "A",
        required: { periods: 5, doubles: 1 },
      }),
    ],
    [
      fixedAt("f1", "x", 1, 1, { teachers: t, armId: "A" }),
      fixedAt("f2", "y", 1, 1, { teachers: t, armId: "A" }),
    ],
  );
  const out = generateTimetable(input, { now: fixedNow });
  const all = findClashes([...input.fixed, ...asResolved(out.lessons, input)], {
    armNames: {},
  });
  assert.ok(all.length > 0);
  assert.deepEqual(newClashes(input, out.lessons), []);
  assert.deepEqual(out.unplaced, []);
});

check(
  "solver: a day with no consecutive lessons leaves doubles unplaced",
  () => {
    const week: SchoolWeek = {
      cycleLength: 1,
      days: [
        {
          day: 3,
          periods: [
            lesson(1, "08:00", "08:40"),
            { number: 2, start: "08:40", end: "09:00", kind: "break" },
            lesson(3, "09:00", "09:40"),
            { number: 4, start: "09:40", end: "10:00", kind: "break" },
            lesson(5, "10:00", "10:40"),
          ],
        },
      ],
    };
    const input: GenInput = {
      week,
      armNames: {},
      fixed: [],
      classes: [
        genClass({ classId: "a", required: { periods: 3, doubles: 1 } }),
      ],
    };
    const out = generateTimetable(input, { now: fixedNow });
    const dbl = out.unplaced.find((u) => u.kind === "double")!;
    assert.ok(dbl);
    assert.deepEqual(dbl.blockers[0], { kind: "no-consecutive", days: [3] });
    assert.equal(out.lessons.length, 1);
  },
);

check(
  "solver: more periods than the week has returns within the budget",
  () => {
    let t = 0;
    const now = () => (t += 1);
    const classes = Array.from({ length: 8 }, (_, i) =>
      genClass({
        classId: `c${i}`,
        armId: "A",
        teacherIds: [`t${i}`],
        required: { periods: 7, doubles: 1 },
      }),
    );
    const out = generateTimetable(solverIn(classes), { now, budgetMs: 200 });
    assert.ok(out.unplaced.length > 0);
    assert.ok(out.elapsedMs >= 0);
    assert.ok(
      out.unplaced.every((u) =>
        u.blockers.some((b) => b.kind === "arm-full" || b.kind === "budget"),
      ),
    );
  },
);

check(
  "solver: an off-bell fixed lesson blocks both periods it overlaps",
  () => {
    const week: SchoolWeek = {
      cycleLength: 1,
      days: [
        {
          day: 1,
          periods: [
            lesson(1, "08:00", "08:40"),
            lesson(2, "08:40", "09:20"),
            lesson(3, "09:20", "10:00"),
          ],
        },
      ],
    };
    const input: GenInput = {
      week,
      armNames: {},
      fixed: [
        rp("f", {
          classId: "x",
          day: 1,
          periodNumber: null,
          start: "08:20",
          end: "09:00",
          teachers: [{ userId: "t1", name: "T" }],
        }),
      ],
      classes: [
        genClass({
          classId: "a",
          armId: "A",
          required: { periods: 1, doubles: 0 },
        }),
      ],
    };
    const out = generateTimetable(input, { now: fixedNow });
    assert.deepEqual(
      out.lessons.map((l) => l.periodNumber),
      [3],
    );
    assert.deepEqual(newClashes(input, out.lessons), []);
  },
);

check("solver: a passed budget leaves every unit unplaced as budget", () => {
  let calls = 0;
  const now = () => (calls++ === 0 ? 0 : 1e9);
  const out = generateTimetable(twoArmSchool(), { now });
  assert.equal(out.lessons.length, 0);
  assert.ok(out.unplaced.length > 0);
  assert.ok(
    out.unplaced.every(
      (u) => u.blockers.length === 1 && u.blockers[0].kind === "budget",
    ),
  );
});

check("solver: repair takes back a blocking unit and re-places it", () => {
  const week: SchoolWeek = {
    cycleLength: 1,
    days: [
      {
        day: 1,
        periods: [
          lesson(1, "08:00", "08:40"),
          lesson(2, "08:40", "09:20"),
          lesson(3, "09:20", "10:00"),
        ],
      },
    ],
  };
  const input: GenInput = {
    week,
    armNames: {},
    fixed: [
      rp("f", {
        classId: "x",
        day: 1,
        periodNumber: 3,
        start: "09:20",
        end: "10:00",
        teachers: [{ userId: "t2", name: "T" }],
      }),
    ],
    classes: [
      genClass({
        classId: "p",
        armId: "A",
        teacherIds: ["t1"],
        required: { periods: 2, doubles: 1 },
      }),
      genClass({
        classId: "q",
        armId: "A",
        teacherIds: ["t2"],
        required: { periods: 1, doubles: 0 },
      }),
    ],
  };
  const out = generateTimetable(input, { now: fixedNow });
  assert.deepEqual(out.unplaced, []);
  assert.deepEqual(slotsOf(out.lessons, "p"), ["1:2", "1:3"]);
  assert.deepEqual(slotsOf(out.lessons, "q"), ["1:1"]);
});

check("solver: two runs give identical output", () => {
  const a = generateTimetable(twoArmSchool(), { now: fixedNow });
  const b = generateTimetable(twoArmSchool(), { now: fixedNow });
  assert.equal(JSON.stringify(a), JSON.stringify(b));
});

check("solver: ties go to the earliest day, then the earliest period", () => {
  const input = solverIn([
    genClass({ classId: "a", required: { periods: 1, doubles: 0 } }),
  ]);
  const out = generateTimetable(input, { now: fixedNow });
  assert.deepEqual(slotsOf(out.lessons, "a"), ["1:1"]);
});
