# Crestfield and Yellow View side by side

One platform, two schools. Both are built by the same harness through the app's own actions; only the school's settings,
its data and its written content differ. No code is forked.

| | Crestfield College | Yellow View High School |
| --- | --- | --- |
| Where | Ibadan, Nigeria | Columbus, Ohio, United States |
| Address (hosted) | crestfield.ellai.dev | yellowview.ellai.dev (planned) |
| Locale, timezone, paper | en-NG, Africa/Lagos, A4 | en-US, America/New_York, Letter |
| Year groups | JSS1 to SS3 | Grade 9 to Grade 12 |
| Groups of learners | arms (JSS1A, SS2B), three streamed in SS | homerooms (9A, 11C), two standard and one Honors/AP |
| Terms | three terms, 13 weeks, First Term taught | four quarters, 10 weeks, Quarter 1 taught |
| What the school calls things | arm, term, student | homeroom, quarter, student |
| Grading | WAEC A1 to F9, pass 40, positions on report cards | A to F with plus and minus, pass 60, GPA 4.0 scale |
| Weighting | none | Honors +0.5, AP +1.0, credits (PE and Health half a credit) |
| Standards | NERDC and WAEC libraries that ship with the app | Common Core, NGSS, C3, ACTFL, AP, and others, imported through the app's syllabus import |
| The day | Assembly, eight 40-minute periods, two breaks, short Friday | Homeroom, seven 48-minute periods, lunch, same every day |
| Subjects | 28 (JSS list, SS streams and an option block) | 58 courses in 64 course-grade books |
| People | 31 staff, 180 learners | 30 staff, 180 students |
| Classes | 112 | 96 |
| Sign-in | school email addresses | school email addresses |
| Exams | Term examinations, week 12 | Quarter 1 exams, week 10 |
| Extra | | PDF study guides as learning material (weeks 2 and 5) |

## The same

- Every screen, every action and the agent: the same code serves both.
- The whole term is built, taught and marked through the app: timetable generated and accepted, lesson notes, every kind
  of activity, marking with evidence, differentiation, struggling-learner lists, announcements, exams and report cards.
- Both builds finish with every checklist feature filled and no findings.

## What Yellow View needed from the platform

Nothing Nigerian was removed and nothing American was hard-coded. These were fixed in the platform, once, for every school:

1. **GPA** with grade points per grade, Honors and AP course levels and credits (all optional; a school without grade
   points sees nothing new).
2. **Quarters and semesters** as the school's term words on screens, and the school's own words (homeroom, quarter, student)
   in Help.
3. **No Nigerian default timezone**: UTC until a school sets its own, and setup checks say so.

## Left out, on purpose

A/B or block scheduling, a different grading scale for each grade, a counselor role, and US assessment styles.
The first two are real limits for some US schools; the school runs seven periods a day so it does not need them.

## Rebuild either school

```bash
# Yellow View (local, port 8133)
pnpm yellowview:reset            # with the server stopped
pnpm dev:yellowview              # restart the server
pnpm yellowview:school           # about 2.5 minutes, no model calls

# Crestfield (local, port 8131)
pnpm showcase:reset
pnpm dev:showcase
pnpm showcase:school             # about 4 minutes
```
