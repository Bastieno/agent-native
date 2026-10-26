/**
 * Where a date falls in a term, and what that week is for.
 *
 *   pnpm exec tsx test/calendar-position.check.ts
 */
import {
  calendarPosition,
  kindFromLabel,
} from "../shared/calendar-position.ts";

let failures = 0;
const ok = (cond: unknown, msg: string) => {
  if (cond) console.log(`  ok    ${msg}`);
  else {
    failures++;
    console.log(`  FAIL  ${msg}`);
  }
};

// Crestfield's First Term, as it is set.
const term = {
  id: "t1",
  name: "First Term",
  startDate: "2026-09-14",
  endDate: "2026-12-11",
};
const cfg = {
  reservedWeeks: [
    { week: 7, label: "Mid-term break" },
    { week: 11, label: "Revision" },
  ],
  examWeeksPerTerm: 2,
};
const at = (today: string) => calendarPosition({ term, today, ...cfg })!;

ok(at("2026-09-14").week === 1, "the first Monday is week 1");
ok(at("2026-09-20").week === 1, "the Sunday after is still week 1");
ok(at("2026-09-21").week === 2, "the next Monday is week 2");
ok(at("2026-09-21").kind === "teaching", "an ordinary week is teaching");
ok(at("2026-09-21").lessonNotesExpected, "notes are expected in teaching");

const mid = at("2026-10-26");
ok(mid.week === 7, "26 Oct is week 7");
ok(mid.kind === "break", "week 7 'Mid-term break' is a break (from its label)");
ok(!mid.lessonNotesExpected, "no lesson notes expected in a break");
ok(/No lessons are expected/.test(mid.message), "the message says why");
ok(
  mid.next?.kind === "revision" && mid.next.inWeeks === 4,
  "revision is 4 weeks on",
);

ok(at("2026-11-23").kind === "revision", "week 11 is revision");
ok(at("2026-11-30").kind === "exam", "week 12 is an exam week");
ok(at("2026-12-07").kind === "exam", "the last week is an exam week");
ok(
  calendarPosition({ term, today: "2026-09-13", ...cfg }) === null,
  "before the term: none",
);
ok(
  calendarPosition({ term, today: "2026-12-20", ...cfg }) === null,
  "after the term: none",
);

const explicit = calendarPosition({
  term,
  today: "2026-10-26",
  reservedWeeks: [{ week: 7, label: "Mid-term test", kind: "assessment" }],
});
ok(explicit?.kind === "assessment", "an explicit kind wins over the label");

const termOnly = calendarPosition({
  term,
  today: "2026-10-26",
  reservedWeeks: [
    { week: 7, label: "Mid-term break" },
    { week: 7, label: "Mid-term break", termId: "other" },
  ],
});
ok(termOnly?.kind === "break", "another term's entry does not interfere");

ok(kindFromLabel("Half-term") === "break", "half-term is a break");
ok(
  kindFromLabel("Contrôle continu") === "assessment",
  "continuous assessment is an assessment week",
);
ok(kindFromLabel("Finals week") === "exam", "finals are exams");
ok(kindFromLabel("Spring break") === "break", "spring break is a break");
ok(
  kindFromLabel("Founders week") === "reserved",
  "an unknown label is reserved",
);

const none = calendarPosition({ term, today: "2026-09-21" });
ok(
  none?.kind === "teaching" && none.next === null,
  "no settings: every week teaches",
);

if (failures) {
  console.log(`\n${failures} failed`);
  process.exit(1);
}
console.log("\nall passed");
