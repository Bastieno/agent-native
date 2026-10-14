# Showcase school — a whole Nigerian school, ten weeks in

**Status:** questions answered by the owner on 2026-10-12 (see "Confirmed decisions" at the end).

## What this is for

The owner wants to walk through the app as a school would use it, and judge
every feature together, without setting a school up by hand. So the app
builds a realistic Nigerian secondary school, staffs and enrols it, teaches it
for ten weeks, and sets its examinations. The owner then signs in as anyone in
it — the admin, any teacher, any learner — and looks around.

Success means:

- every feature the app has holds real data that looks like a real term;
- the owner can pick any person from a list and sign in as them;
- every setting and decision made while building the school is written down,
  so the owner can tell what the app did from what the run chose.

## Where it runs

Against its own local server and database, `pnpm dev:showcase` (port 8131,
`data/showcase.db`), so simulated schools never pile into the dev database
beside the pilot, and the owner can sign in straight afterwards. A run on a
database that already holds Crestfield is refused: stop the server, run
`pnpm showcase:reset`, start it again. Journeys have their own too,
`pnpm dev:journeys` (port 8132, `data/journeys.db`). Putting the app online
is a separate task and not part of this one.

The teaching content (questions, mark schemes, model answers, what learners
of each ability write and the feedback they get, lesson notes, readings,
cards and practicals) is written by hand, one file per subject and year
group, in `test/fixtures/showcase/`. See the README there. A week with no
written content falls back to the generator.

It is built as a new scenario of the existing simulation harness
(`test/sim/`, `pnpm journey:school`). The harness drives the app through its
own actions, the same ones the screens and the agent use, so whatever the
showcase builds is what a school using the app would have built. It is
repeatable: the same command builds the same school again, under a new run id.

## The school

Every value below is a proposal recorded in the decisions file. Any of them
can be changed before the build.

**Identity.**

- Name: Crestfield College, Ibadan.
- Type: secondary.
- Locale `en-NG`, timezone `Africa/Lagos`.
- What the school calls things: "student", "teacher", "arm", "class work".

**Session and terms.**

- 2026/2027 session.
- First Term: 14 September – 11 December 2026, 13 weeks.
- Week 7 is mid-term.
- Weeks 11–12 are revision and examinations.
- Second and Third Terms exist with dates, but nothing is taught in them.

**The week.** Monday to Friday, modelled on a typical Nigerian timetable:

- 7:45–8:00 Assembly;
- eight 40-minute periods from 8:00;
- Short Break 10:40–11:15;
- Long Break 12:35–1:15;
- Friday ends early, with its last periods named "Jumat / Fellowship" and "Clubs / Societies".

**Rooms.**

- One classroom for each arm.
- Physics Lab, Chemistry Lab, Biology Lab, ICT Room, Library, Home Economics Room.

**Grading.**

- WAEC-style A1–F9 for the whole school. The app holds one scale per school,
  so JSS cannot have a percentage-band scale of its own (see "Confirmed
  decisions").
- Pass mark 40.
- Missed work counts as zero.
- Positions shown on report cards.

**Year groups and arms.** 15 students in every arm, 180 in all.

| Year group       | Arms                                                           |
| ---------------- | -------------------------------------------------------------- |
| JSS1, JSS2, JSS3 | one arm each: JSS1A, JSS2A, JSS3A                              |
| SS1, SS2, SS3    | three streamed arms each: Science (A), Commercial (B), Art (C) |

**Subjects.** Taken from the NERDC (JSS) and WAEC (SS) libraries already in
the app, under the libraries' own names, so every scheme of work comes from a
library and nothing is invented.

- **JSS (all arms), the 2025 NERDC list:**
  - English Studies, Mathematics, Intermediate Science, Digital Technologies;
  - Social and Citizenship Studies, Nigerian History, Christian Religious Studies;
  - Business Studies, Cultural and Creative Arts, Physical and Health Education;
  - Yoruba, Livestock Farming.
- **SS, every stream:** English Language, Mathematics, Civic Education, Data Processing.
- **SS Science:** Physics, Chemistry, Biology, Agricultural Science.
- **SS Commercial:** Economics, Commerce, Financial Accounting, Marketing.
- **SS Art:** Literature in English, Government, Christian Religious Studies, History.
- **One option block in SS1 and SS2:** Further Mathematics (Science and
  Commercial learners only) alongside Geography. Each learner takes one; every
  Art learner takes Geography.

**People.**

- One admin, who is the principal.
- One subject coordinator per department: Sciences, Arts, Commercial, JSS.
- About 30 teachers, each teaching their subject across several arms, with the load a real school would give them. Some classes also have a support teacher.
- Every arm has a form teacher.
- Every name is a realistic Nigerian name.
- Learners are given a spread of ability (strong, middling, struggling) and diligence, which the app is never told. So "who is struggling?", differentiation and grouping have something real to find.

## What happens, in order

Everything is done as the right person: the admin sets up, teachers teach,
learners sit and hand in.

1. **Setup (admin).** The school, its settings, year groups, terms, the week,
   rooms, departments, subjects (with their year groups), arms and streams,
   activity blueprints and the school guide. `check-school-setup` is then
   clear apart from anything deliberately left unset.
2. **Staff.** Every staff member is invited and signs in. Classes are created
   — whole-arm classes per arm, and the option block — with primary and
   support teachers and form teachers.
3. **Learners.** All 180 are invited and sign in. Each is placed in their arm,
   so enrolment follows, and the option-block learners are enrolled in their
   option.
4. **Curriculum.** A scheme of work for every subject and year group for the
   First Term is built from the seeded libraries, using the school's mid-term
   and exam weeks. Weekly lesson notes are planned and finalised, and some are
   left in draft so the "who hasn't prepared?" view has something to show.
5. **Timetable.** Lesson counts are set for every class (periods and doubles,
   with practicals as named doubles in labs). The timetable is generated,
   reviewed, accepted, and adjusted by hand where generation left something
   unplaced. Every learner then has a week, and every teacher a day.
6. **Weeks 1–10 of teaching**, mid-term week excepted:
   - Every class gets its week's work, varied the way a school varies it:
     worksheets, reading, card decks, problem sets, practicals, and
     one-question-at-a-time quizzes with time limits.
   - Learners sit and hand in, according to their ability and diligence. Some
     never hand in. (The app records no lateness, only handed in or not, so
     "late" is not modelled.) Handwritten working is used where a subject
     needs it.
   - Teachers mark:
     - closed questions mark themselves;
     - open answers are marked against mark schemes, with evidence and
       confidence, and low-confidence marks are flagged for review;
     - grades are published.
   - **Differentiation**, in a chosen set of classes each fortnight:
     1. learners are grouped by their marks;
     2. three-level variants (advanced, developing, foundational) are set and
        assigned by group;
     3. movement between groups is tracked across the term.
   - **Struggling learners** are identified each fortnight, per class. The app
     answers this per class only, so the year-group lists are the class lists
     gathered by year group, and the run records that gap.
   - Announcements go out, school-wide and per class.
   - A few lesson notes are written by an admin on a teacher's behalf, and one
     is reopened, so that history shows up.
7. **Week 11.** Revision material is published.
8. **Week 12.** Examinations are set and published, with a timetable of exam
   papers, drawn from the term's written questions. Every learner sits them,
   and they are marked and published.
9. **Week 13.** Every learner's report card is issued, with the form
   teacher's remark and the principal's, both written from the learner's own
   results.
10. **One class's last piece is left open** (JSS2A Mathematics, week 10):
    some have handed it in, some have started, some have not, and none of it
    is marked, so learners' status words and a teacher's waiting work show.

## What the owner gets

Two files, written to `test-runs/<run>/` and copied to `docs/showcase/` (or
wherever the owner chooses):

- **`school-roster.md`** (plus `school-roster.csv`): everyone in the school,
  with the shared sign-in password.
  - **Admin and coordinators:** name, role, email.
  - **Teachers:** name, email, subjects, classes (primary or support), form
    arm.
  - **Learners, by year group and arm:** name, email, stream, option, and a
    one-word profile (strong, middling or struggling) for picking someone
    interesting to sign in as.
- **`school-decisions.md`:** every setting and choice the run made, grouped by
  area:
  - identity;
  - terms and weeks;
  - the week's bells;
  - rooms;
  - grading;
  - terminology;
  - subjects by year group and stream;
  - option blocks;
  - staffing and loads;
  - lesson counts per subject;
  - the generation summary and what was placed by hand;
  - the activity mix per subject;
  - differentiation classes;
  - exams;
  - anything left deliberately unset, and why.

Alongside these sit the harness's usual report (findings, gradebook, report-card samples) and a short **"where to look"** guide: for each feature, which person to sign in as and which page to open.

## Feature checklist

The run fails if any of these ends empty.

| Area                | Must show                                                                         |
| ------------------- | --------------------------------------------------------------------------------- |
| Setup and settings  | All settings filled, with setup checks clear                                      |
| Staff and learners  | Invitations accepted, names correct, arms with learners                           |
| Curriculum          | Schemes for every subject and year group; coverage; library                       |
| Lesson notes        | Weekly notes, readiness per class, an admin edit, a reopened note                 |
| Timetable           | Generated and accepted; no clashes; every learner's week and teacher's day filled |
| Activities          | Every format, quizzes with time limits, practicals, drawings                      |
| Marking             | Auto-marked, AI-marked with evidence, flagged for review, published               |
| Differentiation     | Groups, variants, assignment, movement over time                                  |
| Struggling learners | Lists per class and year group                                                    |
| Analytics           | School, class, learner and paper insights with real spread                        |
| Gradebook           | Ten weeks of marks per class                                                      |
| Announcements       | School-wide and per class                                                         |
| Exams               | Sat, marked and published for week 12                                             |
| Report cards        | One issued for every learner                                                      |
| Work left open      | One class's last piece handed in by some, started by some, unmarked               |

## Not in this

- **The AI agent itself.** The run uses the app's actions directly, with no
  language model in the loop, so it is fast, free and repeatable. Open-answer
  marking is done by the harness against mark schemes, as the simulation
  already does. The owner can talk to the agent inside the school afterwards.
- **Second and Third Terms**, and attendance (the app has no attendance
  feature).

## Confirmed decisions

Answered by the owner on 2026-10-12.

1. **JSS arms:** one arm per JSS year group (JSS1A, JSS2A, JSS3A), 45 JSS
   learners and 180 in the school.
2. **Exams:** set and published for week 12 and left unsat. No report cards.
   _Revised 2026-10-14:_ exams are sat and marked and report cards issued;
   term dates stay fixed (the papers carry no opening time, so they can be
   sat now).
3. **Where it runs:** locally only. Deploying is a separate task.
4. **Name and place:** Crestfield College, Ibadan.
5. **The agent:** not used in the run. Everything goes through the app's
   actions; the owner talks to the agent inside the school afterwards.
6. **JSS subjects:** the 2025 NERDC list as it stands in the app's library
   (English Studies, Intermediate Science, Digital Technologies, Social and
   Citizenship Studies, Nigerian History and Livestock Farming in place of the
   older subject names).
7. **Option block:** Geography beside Further Mathematics. The app has no WAEC
   library for Technical Drawing.
8. **Grading:** WAEC A1–F9 for the whole school. A separate JSS scale needs
   per-year-group scales, which the app does not have yet.
