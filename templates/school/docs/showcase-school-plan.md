# Showcase school — implementation plan

Builds the school in `showcase-school-spec.md` as a new scenario of the
simulation harness. One command, `pnpm showcase:school`, builds a fresh copy
under a new run id and exits non-zero if any checklist feature ends empty.

## Shape

The school is data; the run is code that drives the app's actions with it.

| File                                    | What it holds                                                                                                                                                                                                                                                                                                             |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `test/scenarios/showcase-crestfield.ts` | Every choice in the spec: identity, terms, bells, rooms, grading, labels, subjects by year group and stream (with the library name each is planned from), lesson counts, departments, staff and their loads, class sizes, activity mix, differentiation classes, exam timetable. The decisions file is written from this. |
| `test/sim/showcase/people.ts`           | Deterministic Nigerian names for staff and 180 learners, each learner with a hidden ability, trajectory and diligence (reusing `population.ts`).                                                                                                                                                                          |
| `test/sim/showcase/build.ts`            | Setup, staff, arms, classes, learners, enrolment.                                                                                                                                                                                                                                                                         |
| `test/sim/showcase/curriculum.ts`       | Schemes of work from the libraries, lesson notes, readiness, an admin edit, a reopened note.                                                                                                                                                                                                                              |
| `test/sim/showcase/timetable.ts`        | Lesson counts, generate, accept, hand placement of what did not fit, lab practicals, clash and coverage checks.                                                                                                                                                                                                           |
| `test/sim/showcase/questions.ts`        | Questions from library objectives (and the existing bank where a subject has one), with mark schemes. No model.                                                                                                                                                                                                           |
| `test/sim/showcase/teaching.ts`         | Weeks 1–10: the activity mix, sitting, marking, differentiation, struggling learners, announcements.                                                                                                                                                                                                                      |
| `test/sim/showcase/exams.ts`            | Week 11 revision, week 12 papers in the school's exam style, exam timetable.                                                                                                                                                                                                                                              |
| `test/sim/showcase/outputs.ts`          | Roster (md + csv), decisions, where-to-look guide, the checklist.                                                                                                                                                                                                                                                         |
| `test/sim/run-showcase.ts`              | Runs the phases in order and writes `test-runs/showcase-<run>/`, copied to `docs/showcase/`.                                                                                                                                                                                                                              |

## Steps

1. **Scenario data.** Write the scenario file from the spec, including the
   bells (Assembly, eight 40-minute periods, Short and Long Break, short
   Friday with Jumat / Fellowship and Clubs / Societies as named non-lesson
   periods), rooms, lesson counts that fit 38 lesson periods a week, ~30
   teachers with realistic loads, and form and support teachers.
2. **Build.** As the admin: `setup-school`, `manage-grade-levels`,
   `update-school-config` (grading, labels, terminology, week, rooms,
   reserved weeks, exam weeks, ranking, missed work), academic year and three
   terms, departments with coordinators, subjects with year groups,
   blueprints for every subject, assessment styles for SS, the school guide.
   Staff invited and signed in; coordinators given their role. Arms with
   streams, home rooms and form teachers. Whole-arm classes per arm and the
   option block (`optionArmIds` of all three arms, so the generator places it
   as a block). Learners invited, signed in, placed in arms; option learners
   enrolled. `check-school-setup` read back and recorded.
3. **Curriculum.** For each subject and year group, read the library through
   `list-framework-objectives`, take that year's share (WAEC spans SS1–SS3, so
   a third each), and call `generate-scheme-of-work` with explicit units over
   the teaching weeks and `weekNotes` for mid-term, revision and exams.
   Finalise most notes for weeks 1–10, leave a few classes behind, have the
   admin edit one note and reopen another.
4. **Timetable.** `set-lesson-counts` per subject, year group and stream;
   `generate-timetable`, read the proposal, accept; place anything not fitted
   by hand into free periods; move science doubles into their lab with a
   "Practical" lesson name where the lab is free. Check zero clashes, full
   coverage, every learner's week and every teacher's day filled.
5. **Teaching, weeks 1–10 (not 7).** Each class each week: the week's reading
   page published, plus one marked piece rotating through worksheet, problem
   set (handwritten working in Mathematics and sciences), timed one-at-a-time
   quiz, practical write-up (sciences) and a card deck. Learners sit by
   ability and diligence. Closed questions mark themselves; open answers are
   marked with evidence and confidence, low confidence flagged; grades
   published. Fortnightly from week 3: differentiation in one class per year
   group (group, three variants, assign, track movement) and struggling lists
   per class, gathered per year group. Announcements school-wide and per
   class.
6. **Weeks 11–12.** Revision reading and card decks published in week 11.
   Week 12 papers per class in the subject's exam style, opening on their
   exam-timetable slot, published and unsat; the exam timetable announced.
7. **Outputs and checklist.** Roster, decisions file, where-to-look guide,
   the usual report. Each checklist row is checked against what the app now
   holds; any empty row fails the run.
8. **Run it** against the local dev server, fix what breaks in the harness,
   record what breaks in the app as findings (not fixed here), and hand the
   files to the owner.

## Not changed

No app code. Gaps found (per-year-group grading scales, year-group struggling
lists, lateness) are recorded in the decisions file and proposed as
follow-ups.
