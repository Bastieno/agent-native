# Yellow View showcase content

The teaching content of Yellow View High School, the second showcase school
(`pnpm yellowview:school`, see `docs/showcase-yellowview-spec.md`). One JSON
file per course and grade, read by `test/sim/showcase/content.ts` when
`SHOWCASE=yellowview`. Written once and checked in, so a run calls no model
and builds the same school every time.

The owner signs in as teachers and students to critique the app's screens.
Everything here is what they will read on those screens, so it has to look like
a real American high school's quarter: real questions, real answers from real
fourteen-to-eighteen-year-olds at different abilities, and a teacher's real
feedback. It sits beside Crestfield's (`test/fixtures/showcase/`) to show the
same app serving a different country, so write for Columbus, Ohio, not for
a generic "English-speaking" school.

## What to write, and from what

`plan.json` lists every file (`file`), its course and grade, the library it
comes from, and for each teaching week (1 to 8; week 9 is review, week 10 is
the quarter exam) the **objectives** the scheme of work teaches and the
**pieces** of work the class gets. Write each week to its objectives.
`practicalWeeks` names the weeks that need a practical (labs, studios,
performance tasks). The libraries are in `libraries/` (Common Core, NGSS, C3,
ACTFL and others, in the school's own wording, with the standards' codes where
they have one).

Check a file with:

```bash
pnpm yellowview:check-content algebra-i-grade-9
```

It must report no problems before the file is committed. The file name is
the course and grade in lower case with hyphens, as `plan.json` says.

## The format

```jsonc
{
  "subject": "Physics", // exactly as plan.json says
  "yearGroup": "SS1",
  "weeks": {
    "1": {
      "topic": "States of matter and the kinetic theory", // the learner-facing title for the week
      "lessonNote": "markdown, 150–350 words",
      "reading": { "title": "...", "content": "markdown, 250–450 words" },
      "cards": [{ "front": "...", "back": "..." }], // 6–10
      "closed": [
        // 5, each with 4 options; "answer" is the right option's letter
        {
          "prompt": "...",
          "options": ["...", "...", "...", "..."],
          "answer": "B",
        },
      ],
      "open": [
        // 2
        {
          "prompt": "...",
          "markScheme": ["one point per mark", "..."], // 2–6 points; worth that many marks
          "modelAnswer": "what full marks need, written for the learner",
          "answers": [
            // 6: two full, two partial, two weak
            {
              "tier": "partial",
              "text": "the learner's own answer",
              "meets": [
                {
                  "point": 0,
                  "quote": "exact words from text that earn point 0",
                },
              ],
              "feedback": "what the teacher writes back to this learner",
              "unsure": true, // optional: a marker would want a second look
            },
          ],
        },
      ],
      "practical": {
        // only in plan.json's practicalWeeks
        "title": "...",
        "instructions": "...",
        "steps": [{ "text": "...", "note": "optional caution" }], // 4–8
        "rubric": [{ "description": "...", "maxPoints": 4 }], // 2–4 criteria
        "writeUps": [
          // 6: two per tier
          {
            "tier": "full",
            "text": "method, results, conclusion",
            "scores": [4, 2, 4],
            "feedback": "...",
          },
        ],
      },
    },
  },
}
```

How the run uses it: a quiz is closed questions 1–5; a worksheet is closed
1–3 and open 1; a problem set is closed 4–5 and open 1–2; differentiated
papers draw on the same set. The examination takes one closed question from
each week and open question 2 from a few weeks. So **closed 1–3 are the
week's core, and open 2 is the harder of the two.**

## The standard

**Questions.**

- Ask about the week's objectives the way a good American teacher sets class
  work, not the standard's wording turned into a question. Never "Which of
  these is studied under ...?", never "Explain X" with nothing else.
- Use American, and where it fits natural Ohio, contexts: a COTA bus route, a
  Kroger receipt, Buckeye Lake, a high school football Friday, a lake-effect
  snow day, a state fair, the Scioto River, Fahrenheit and inches and miles and
  dollars, Letter paper, standardized-test prep (ACT, SAT, AP exam practice
  where the course is AP).
- Pitch to the grade. Grade 9 is 14 to 15 years old; Grade 12 AP is writing
  the exam in May.
- Each wrong option is a real misconception, not filler. Vary which letter is
  right across the week.
- In math, chemistry, physics and AP science, calculations carry real numbers
  that work out. Check every answer.
- Honors and AP versions go deeper and faster than the standard course of the
  same grade, and AP ones are framed the way the College Board frames them
  (free-response, data analysis, argument essays). Do not copy released AP
  questions or any copyrighted text; write fresh.

**Mark schemes and model answers.**

- One point per mark, worded the way a teacher marks: "States that the
  gradient is the rate of change", "Correct substitution into the formula".
- The model answer is what a student who earns every mark would write, at
  their level, in about the words a good student uses. It covers every point.
  Not an essay.

**Students' answers.** Two at each ability, different from each other.

- **Full** meets every point, in the student's own words, not the model
  answer's. A strong student may still write plainly.
- **Partial** meets some points and misses or gets wrong the rest, the way a
  student who half-knows the topic does: a step skipped, a unit dropped, the
  right idea put vaguely, a common misconception.
- **Weak** meets at most one point. It is an attempt, not a refusal: a
  misconception stated with confidence, a definition remembered wrongly, a
  calculation with the wrong formula.
- Write like an American teenager of that grade: plain, sometimes run-on, the
  odd spelling slip in Grade 9. No slang that dates quickly, nothing mocking.
  In Spanish and French courses, the answers are in the language with the
  slips a learner at that level makes (agreement, accents, verb endings), and
  the prompt gives English where a beginner needs it.
- `meets` lists each point the answer earns with the exact words that earn it
  (a substring of `text`). The marks follow from it, so it must be honest: if
  a partial answer gets point 2 wrong, it does not meet point 2.
- Mark `unsure` on one or two answers per file that a careful marker would
  want to look at again (right idea, ambiguous wording).

**Lesson notes, readings and cards.**

- The lesson note is the teacher's plan for the week: starter questions, the
  main activity, how to check understanding, what to collect. 150 to 350 words.
- The reading is what the students read: a page of real content, 250 to 450
  words, in the voice of a good textbook or a teacher's handout. Not a list of
  headings.
- Cards are a term and its meaning, or a question and its answer. 6 to 10.

**Standards and copyright.** The libraries cite the standards by code. Never
paste the standards' own sentences, a textbook's, a released exam's or another
school's handout into a reading or a question. Write fresh.

## How a course is written

Courses are written as TypeScript in `src/<file>.ts` with the helpers in
`test/sim/showcase/author.ts`, and the JSON is generated from them. The
helper takes each learner's answer with the words that earn a mark wrapped in
`[[point|words]]`, so a quote can never drift from its answer.

```bash
pnpm exec tsx test/fixtures/showcase-yellowview/src/algebra-i-grade-9.ts   # writes algebra-i-grade-9.json
pnpm yellowview:check-content algebra-i-grade-9                           # must say 0 problems
```

`src/algebra-i-grade-9.ts` is the finished example: read it for the level of
detail, the length of a reading and a lesson note, how an answer at each ability
sounds, and how feedback addresses the learner. Write every week of
`plan.json` for the file, to that week's objectives (and `practicalWeeks`, where
the file lists some, needs a `practical`). Where a plan week lists a
"differentiated worksheet", the same closed and open questions are used, so
nothing extra is needed.

A course and its Honors twin (`honors-algebra-i-grade-9`) share objectives but
are different books: the Honors one goes deeper and faster, uses harder
numbers and longer reasoning, and its students write more fully. Do not copy
text between them.

Two courses with the same name in two grades (AP Biology, AP Psychology) are
written as two files with different examples and readings.

Standards: cite nothing in the learner-facing text; the objectives already
carry the codes. Never paste text from a standard, a textbook or an exam.
