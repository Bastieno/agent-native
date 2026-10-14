# Showcase content

The teaching content of Crestfield College, the showcase school
(`pnpm showcase:school`, see `docs/showcase-school-spec.md`). One JSON file per
subject and year group, read by `test/sim/showcase/content.ts`. Written once
and checked in, so a run calls no model and builds the same school every time.

The owner signs in as teachers and learners to critique the app's screens.
Everything here is what they will read on those screens, so it has to look
like a real Nigerian secondary school's term: real questions, real answers
from real children at different abilities, and a teacher's real feedback.

## What to write, and from what

`plan.json` lists every file (`file`), its subject and year group, the
library it comes from, and for each teaching week (1–6 and 8–10; week 7 is
mid-term) the **objectives** the scheme of work teaches and the **pieces** of
work the class gets. Write each week to its objectives. `practicalWeeks` names
the weeks that need a practical.

Check a file with:

```bash
pnpm showcase:check-content physics-ss1
```

It must report no problems before the file is committed.

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

- Ask about the week's objectives, the way a Nigerian teacher sets class work,
  not the syllabus wording turned into a question. Never "Which of these is
  studied under …?", never "Explain X" with nothing else.
- Use Nigerian contexts where they fit naturally: Bodija market, a NEPA bill,
  the Ogun river, a danfo, a farm in Oyo, harmattan.
- Pitch to the year group. JSS1 is 10–11 years old; SS3 is sitting WASSCE
  next year.
- Each wrong option is a real misconception, not filler. Vary which letter is
  right across the week.
- In Mathematics, Further Mathematics, Physics, Chemistry and Financial
  Accounting, calculations carry real numbers that work out. Check every
  answer.

**Mark schemes and model answers.**

- One point per mark, worded the way a teacher marks: "States that pressure
  increases with depth", "Correct substitution into P = F/A".
- The model answer is what a learner who earns every mark would write, at
  their level, in about the words a good learner uses. It covers every point.
  Not an essay.

**Learners' answers.** Two at each ability, different from each other.

- **Full** meets every point, in the learner's own words, not the model
  answer's. A strong learner may still write plainly.
- **Partial** meets some points and misses or gets wrong the rest, the way a
  learner who half-knows the topic does: a step skipped, a unit dropped, the
  right idea put vaguely, a common misconception.
- **Weak** meets at most one point. It is an attempt, not a refusal: a
  misconception stated with confidence, a definition remembered wrongly, a
  calculation with the wrong formula.
- Write like a Nigerian secondary-school learner of that age: plain, sometimes
  run-on, the odd spelling slip in JSS. No slang, nothing mocking.
- `meets` lists each point the answer earns with the exact words that earn it
  (a substring of `text`). The marks follow from it, so it must be honest: if
  a partial answer gets point 2 wrong, it does not meet point 2.
- Mark `unsure` on one or two answers per file that a careful marker would
  want to look at again (right idea, ambiguous wording).

**Feedback.** Written to the learner ("You…"), one or two sentences. Say what
earned the marks and the one thing that would earn more, naming the point:
"You explained why the gas pressure rises, but not what the particles do to
the walls. Say they hit the walls more often." Never "Good" alone, never the
mark scheme pasted back.

**Lesson notes.** For the teacher, not the class: objectives, materials, a
starter, the development in steps, a class activity, evaluation questions,
and the assignment. Headings in markdown.

**Readings.** For the learner: a clear explanation of the week's topic with a
worked example or two, in the textbook voice of a good Nigerian secondary
text. Markdown headings, short paragraphs, lists where they help.

**Cards.** A term or question on the front; a short definition or answer on
the back.

**Practicals.** Real apparatus a Nigerian school lab has, steps a teacher
would give, and write-ups at each ability whose scores follow the rubric.

## Names and people

Answers are anonymous: no names, and no "he" or "she" about the learner.
