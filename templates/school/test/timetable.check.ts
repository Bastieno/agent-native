/**
 * Checks for the school's week and rooms. Run: npx tsx test/timetable.check.ts
 */
import assert from "node:assert/strict";
import {
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
