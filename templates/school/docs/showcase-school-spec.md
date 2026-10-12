# Showcase school — a whole Nigerian school, ten weeks in

**Status:** draft for the owner to confirm (see "Questions to confirm" at the end) before any build.

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

Against the app running locally (the dev server and its database), so the
owner can sign in straight afterwards. Putting the app online is a separate
step — see "Questions to confirm".

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

- WAEC-style A1–F9 for SS.
- A percentage-band scale for JSS.
- Pass mark 40.
- Missed work counts as zero.
- Positions shown on report cards.

**Year groups and arms.** 15 students in every arm, 180 in all.

| Year group       | Arms                                                           |
| ---------------- | -------------------------------------------------------------- |
| JSS1, JSS2, JSS3 | one arm each: JSS1A, JSS2A, JSS3A                              |
| SS1, SS2, SS3    | three streamed arms each: Science (A), Commercial (B), Art (C) |

**Subjects.** Taken from the NERDC (JSS) and WAEC (SS) libraries already in the app.

- **JSS (all arms):**
  - English Language, Mathematics, Basic Science, Basic Technology;
  - Social Studies, Civic Education, CRS/IRS;
  - Business Studies, Cultural & Creative Arts, Computer Studies;
  - Physical & Health Education, Yoruba.
- **SS, every stream:** English Language, Mathematics, Civic Education, Data Processing.
- **SS Science:** Physics, Chemistry, Biology, Agricultural Science.
- **SS Commercial:** Economics, Commerce, Financial Accounting, Marketing.
- **SS Art:** Literature in English, Government, CRS, History.
- **One option block in SS1 and SS2:** Further Mathematics (Science and Commercial learners) alongside Technical Drawing. Each learner takes one.

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
     hand in late, some never. Handwritten working is used where a subject
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
   - **Struggling learners** are identified each fortnight, per class and per
     year group.
   - Announcements go out, school-wide and per class.
   - A few lesson notes are written by an admin on a teacher's behalf, and one
     is reopened, so that history shows up.
7. **Week 11.** Revision material is published.
8. **Week 12.** Examinations are set and published, with a timetable of exam
   papers and the school's own exam style (WAEC style for SS). Learners have
   not sat them yet, so the owner can see an exam from both sides.

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
| Exams               | Set and published for week 12, unsat                                              |

## Not in this

- **The AI agent itself.** The run uses the app's actions directly, with no
  language model in the loop, so it is fast, free and repeatable. Open-answer
  marking is done by the harness against mark schemes, as the simulation
  already does. The owner can talk to the agent inside the school afterwards.
- **Report cards.** End-of-term report cards come after the exams are sat.
  See "Questions to confirm".
- **Second and Third Terms**, and attendance (the app has no attendance
  feature).

## Questions to confirm

1. **JSS arms:** one arm per JSS year group (45 JSS learners), or two, which
   would give 90?
2. **Exams:** set and left unsat at week 12, as above? Or sat, marked and
   report cards issued, so the end of term is visible too?
3. **"Go live":** is local enough for this run? Or should the app also be
   deployed (for example to Netlify with a Neon database) so others can sign
   in? Deploying is its own task. The roster file must not be committed or
   shared publicly if it holds a working password on a public site.
4. **Name and place:** is "Crestfield College, Ibadan" fine, or do you have a
   school name and city in mind?
5. **The agent:** should a few things go through the real AI agent (e.g. it
   drafting a scheme or marking a batch), so you can see it work? This costs
   model usage and isn't repeatable.
