/**
 * Checks for the school's week and rooms. Run: npx tsx test/timetable.check.ts
 */
import assert from "node:assert/strict";
import {
  findPeriod,
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
  assert.match(problems[0], /Friday/);
  assert.match(problems[0], /period 3/);
});

check("duplicate period numbers on a day are a problem", () => {
  const week = validWeek();
  week.days[0].periods[3].number = 3;
  assert.ok(weekProblems(week).some((p) => /Monday/.test(p) && /3/.test(p)));
});

check("overlapping periods are a problem", () => {
  const week = validWeek();
  week.days[1].periods = [
    lesson(1, "08:00", "08:40"),
    lesson(2, "08:30", "09:10"),
  ];
  assert.ok(weekProblems(week).some((p) => /Tuesday/.test(p)));
});

check("a cycle length other than 1 is a problem", () => {
  const week = { ...validWeek(), cycleLength: 2 } as unknown as SchoolWeek;
  assert.ok(weekProblems(week).length >= 1);
});

check("a malformed time is a problem", () => {
  const week = validWeek();
  week.days[0].periods[0] = lesson(1, "8am", "08:40");
  assert.ok(weekProblems(week).some((p) => /Monday/.test(p)));
});

check("a day listed twice is a problem", () => {
  const week = validWeek();
  week.days.push({ day: 1, periods: [lesson(1, "08:00", "08:40")] });
  assert.ok(weekProblems(week).some((p) => /Monday/.test(p)));
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
