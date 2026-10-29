# Yellow View showcase: a whole American high school, one quarter in

**Status:** built (2026-10-26); the decisions below were agreed with the owner. Agreed so far (2026-10-26): grades 9 to 12, about 180 learners, Columbus Ohio, full breadth of content, GPA with honors and AP weighting, quarters as the school's terms, no sub-agents while writing content.

## What this is for

Crestfield College (Nigeria) and Yellow View High School (United States) side by side, each fully populated, to show a customer that the platform is agnostic: the same app, the same code, only settings and data differ. Anything Yellow View needed that the platform could not do was fixed in the platform (see "Platform changes"), not worked around.

## The school

- **Yellow View High School**, Columbus, Ohio. Public high school, grades 9 to 12.
- `en-US`, `America/New_York`, Letter paper, `MM/DD/YYYY`, Fahrenheit, miles and pounds in content.
- **Words** (`customLabels`): Grade 9 to 12 (`gradePrefix: Grade`), homeroom (for arm), homeroom teacher, student, quarter, "assignment" for a piece of work.
- **Year:** 2026-27 school year. Four quarters; Fall semester is Q1 + Q2, Spring is Q3 + Q4.
  - Q1: Mon 08/17/2026 to Fri 10/23/2026, 10 weeks. Taught: weeks 1 to 8 (Labor Day, Mon 09/07, falls in week 4 and is a day off, not a week), week 9 review, week 10 quarter assessments, grades posted.
  - Q2: 10/26 to 12/18. Q3: 01/11/2027 to 03/19. Q4: 03/29 to 06/04. Dates only; nothing taught.
- **Grading:** A+ to F with plus and minus, whole-number bands. A 93 to 100 (4.0), A- 90 to 92 (3.7), B+ 87 to 89 (3.3), B 83 to 86 (3.0), B- 80 to 82 (2.7), C+ 77 to 79 (2.3), C 73 to 76 (2.0), C- 70 to 72 (1.7), D+ 67 to 69 (1.3), D 63 to 66 (1.0), D- 60 to 62 (0.7), F 0 to 59 (0). Pass mark 60. Honors +0.5, AP +1.0 (only when the course earned points). Missed work counts as zero. Positions on report cards off (US schools do not rank on the card).
- **Day:** Monday to Friday, 7:30 to 2:20. Homeroom 7:30 to 7:48, seven periods of 48 minutes with four minutes between, a 30-minute lunch after period 4. Friday is the same. Rooms by subject (labs, gym, fitness room, art room, band and choir rooms, auditorium, library) plus a classroom for each homeroom.
- **People:** one principal (admin), four department heads as coordinators (English and Social Studies, Math and Computer Science, Science, Electives and World Languages), about 28 teachers, one counselor and one assistant principal on the staff list. Students are 45 per grade in three homerooms of 15. Every student signs in with a school email (`firstname.lastname@yellowview.k12.oh.us` style), teachers likewise. Names are a realistic US mix (Anglo, Black, Hispanic and Latino, Asian American, Somali and Nepali families, as Columbus has).
- **Ability and diligence** hidden per student, as at Crestfield.

## How classes are organised

The platform places classes by homeroom (an "arm") plus one **option block** per grade, where each student picks one course from a list taken at the same time. Yellow View is organised to fit that, which is also how a small US high school really works:

- **Three homerooms per grade.** Two standard (A, B) and one **Honors** homeroom (C), 15 students each, 180 in all. In grades 9 and 10 the Honors homeroom takes Honors English, math, science and social studies (course level Honors, +0.5 in the weighted GPA). In grades 11 and 12 it is the **Honors/AP** homeroom: AP replaces the core English and social studies (course level AP, +1.0), while math and science stay Honors. Everyone in a homeroom shares its core classes.
- **Six core classes** per homeroom: English, math, science, social studies, world language, PE or health.
- **One elective block per grade:** each student chooses one course. In grades 11 and 12 the block also offers the extra AP courses (Biology, Computer Science A, Statistics, Psychology, Environmental Science, Calculus AB). That is the seventh period of the student's day.
- Lessons per week: English 5, math 5, science 5 (one a lab double), social studies 5, world language 4, PE 3, elective block 5: 32 of the 35 lesson periods in the week, leaving the generator some room.
- **Credits:** PE and health 0.5, everything else 1, so the GPA weights them.

## Courses (about 54 content files)

- **Grade 9:** English 9, Algebra I, Biology, World History, Spanish I, PE and Health 9; Honors English 9, Honors Algebra I, Honors Biology, Honors World History. Elective block: Art I, Band, Choir, Computer Science Principles, Intro to Business, Journalism, French I.
- **Grade 10:** English 10, Geometry, Chemistry, US History, Spanish II, PE 10; Honors English 10, Honors Geometry, Honors Chemistry, Honors US History. Elective block: Art II, Band, Choir, Theater, Digital Photography, Personal Finance, French II.
- **Grade 11:** English 11, Algebra II, Physics, US Government, Spanish III, PE 11; Honors/AP homeroom: AP English Language, Honors Algebra II, Honors Physics, AP US Government. Elective block: AP Biology, AP Computer Science A, AP Psychology, AP Environmental Science, Band, Choir.
- **Grade 12:** English 12, Precalculus, Anatomy and Physiology, Economics, Spanish IV, PE 12; Honors/AP homeroom: AP English Literature, Honors Precalculus, Honors Anatomy and Physiology, AP Macroeconomics. Elective block: AP Calculus AB, AP Biology, AP Statistics, Statistics, Journalism, Band.

Band and Choir run across grades, so they are one course per grade file set. Courses taught in more than one grade (Band, Choir) share a file per grade.

## Standards

Real codes, cited, never copied. Courses are planned from three libraries imported through the app's own syllabus import (the same path a customer would use) so every scheme of work comes from a library:

- English and math: Common Core State Standards (corestandards.org).
- Science: Next Generation Science Standards (nextgenscience.org); Ohio's Learning Standards for science follow NGSS-aligned performance expectations.
- Social studies: C3 Framework (socialstudies.org) with Ohio's Learning Standards for Social Studies.
- Languages and arts: ACTFL World-Readiness and the National Core Arts Standards, by code only.
Objective wording is written fresh against each code; only the code and strand are the standard's.

## Platform changes made for this school

1. **GPA** with grade points per grade and Honors/AP course levels. On report cards, a learner's Grades page and the staff view of a learner. Schools without points see nothing new.
2. **Quarters and semesters** as the school's term words. Quarters stay one flat level of terms (Q1 to Q4); the semester is not stored. A school that wants nesting would need a further change.
3. **The school's words in fixed text:** the term word on screens, and arm, form teacher, term and learner in Help and `get-help`.

4. **Credit hours:** a subject earns credits (one unless set), which weight the GPA, so half-credit PE counts for half.
5. **No silent timezone:** the default is UTC instead of Lagos, and setup checks name a missing timezone.

Known gaps listed, not fixed (the owner chose to leave them): no alternating A/B day or block schedule, no per-year-group grading scale.

## How it is built

Same as Crestfield: `pnpm showcase:school` drives the app's actions against its own database, from a scenario file and hand-written content, with content checks. The harness takes the school from `SHOWCASE=yellowview`; Crestfield stays the default and does not change.

- `test/scenarios/showcase-yellowview.ts`: every choice above as data.
- `test/fixtures/showcase-yellowview/`: one JSON per course, same format as Crestfield's, plus `plan.json`; checked by `showcase:check-content`.
- `test/fixtures/frameworks-us/`: the three libraries, imported through the app.
- PDF handouts: some weeks' readings are also made as a PDF learning resource (`create-document-resource`), attached to the week, so the PDF route is shown too.
- A content review pass like the Yoruba review, for Spanish and French.

## Confirmed decisions

Answered by the owner on 2026-10-26: grades 9 to 12; full breadth; GPA with honors and AP; quarters as terms; platform fixes 1 to 3; no sub-agents; use PDF learning resources where they help.
