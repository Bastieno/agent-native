# Simulating a school

`pnpm journey` stands up a school of its own, teaches a term in it, and writes
down what it found. It exists because reading a test plan screen by screen
takes a week and tells you less: a term of real marks is the only thing that
shows whether the app's own judgements — who is struggling, who improved,
what a report card says — follow from the work.

```bash
pnpm dev            # the simulation talks to a running dev server
pnpm journey        # ~15 seconds for 20 learners and 6 weeks
```

Everything lands in `test-runs/<scenario>-<run>/`: the report, the gradebook
as JSON and CSV, report cards for the strongest, middling and weakest learner,
what a learner sees of their own term, the printed copies of a worksheet, and
the full call transcript.

## What it is

- **`scenarios/`** — the test plan, as a file. A school's year groups, term
  dates, grading scale, subject, class size and the questions set each week.
  A second school is a second file, not a second simulation.
- **`sim/population.ts`** — the learners. Each carries a hidden ability, a
  trajectory and a diligence. None of it is ever told to the app.
- **`sim/answers.ts`** — what a learner writes, given how able they are. No
  model is called: an answer is assembled from the question and its mark
  scheme, so a run costs nothing and is identical every time.
- **`sim/term.ts`** — a week: the teacher sets work, the class sits it, the
  teacher marks what cannot mark itself, grades are published.
- **`sim/close.ts`** — the end of term, and the things that must never be
  true.
- **`sim/report.ts`** — the report.

## Rules it keeps

- **Its own school every run.** Nothing it does touches a school anyone is
  using, so it can be run against a live dev database.
- **Through the front door.** Every step is an HTTP request as the person who
  would really make it, so the role guard and class scoping are exercised
  rather than bypassed. Only agent-only actions (`http: false`) go over MCP,
  and still without a model.
- **Nothing is told to the app.** The simulation knows each learner's real
  ability; the app only ever sees their work. Where the two disagree, that is
  the finding.
- **It does not stop at the first surprise.** Findings are collected and the
  term carries on, so one run covers a term rather than its first ten minutes.
