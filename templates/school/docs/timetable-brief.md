# Timetable — what exists, and what it needs

A brief for picking this up cold. Read `AGENTS.md` first for how the app
works; this covers only the timetable.

## What exists today

| Piece                                                                                          | Where                                             |
| ---------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| `class_schedules` table — one row per period                                                   | `server/db/schema.ts`                             |
| `create-class-schedule` — classId, dayOfWeek (1=Mon…7), startTime, endTime, periodNumber, room | `actions/create-class-schedule.ts`                |
| `get-my-schedule` — a teacher's day, with `lessonPrepared` per slot. **POST, not GET**         | `actions/get-my-schedule.ts`                      |
| "Today" on the teacher's dashboard                                                             | `app/routes/teacher._index.tsx` → `Today()`       |
| `todaySchedule` in the agent's screen context                                                  | `actions/view-screen.ts`                          |
| One period per class, created by the simulation                                                | `test/sim/school-setup.ts`                        |
| A run checks a teacher's day holds only their classes                                          | `test/sim/school-term.ts` → `checkTodaysSchedule` |

## What is missing

- **No way to build a timetable in the app.** Periods can only be created one
  action call at a time, by the agent. There is no admin screen, no grid, no
  bulk entry.
- **Nothing detects a clash.** A teacher can be put in two rooms at once, a
  class can be given two subjects in one period, and a room can be
  double-booked. Nothing complains.
- **No learner view.** A student cannot see their own week; `get-my-schedule`
  is staff-only.
- **No notion of a school's own week.** Periods are free text times and a day
  number. A school with eight periods, a different bell schedule, a Saturday
  morning, or a two-week rotating timetable has nowhere to say so.
- **Not term-aware.** A schedule row has no term, so last term's timetable and
  this term's are the same rows.

## Rules that apply here

- **Nothing hardcoded.** Day names come from the school's locale, not an
  English array. Period count, bell times and the length of the week are the
  school's answers — a setting with a named fallback that
  `check-school-setup` reports, the way `paperSize` and `missedWorkPolicy`
  do. Do not assume Monday–Friday or 8 periods.
- **Every action names its audience** in `server/lib/action-policy.ts`, or the
  build fails.
- **Migrations are additive only** — `server/plugins/db.ts`, next version
  number. Never rename or drop.
- **Dates and times through the school's own locale** —
  `useSchoolDates()` on the client, `schoolDateStyle()` on the server.
- **shadcn/ui and Tabler icons**, no browser dialogs, no custom dropdowns.
- Run `npx prettier --write` on what you touch; `npx tsc --noEmit` must pass.

## How to test it

`pnpm journey:school` stands up a school and teaches a term in about 30
seconds (see `test/README.md`). Extend `checkTodaysSchedule` rather than
writing unit tests: a clash the simulation can create is worth more than an
assertion about a function.

When driving the UI in the browser pane, verify in the DOM — screenshots miss
portalled dialogs, `.click()` does not drive Radix tabs, and reads race the
render. Sign in by POSTing to `/_agent-native/auth/login` with a simulated
school's admin (`admin@<run>.sim.test`, password in `test/sim/client.ts`).

## Not about the timetable

Other things found and left undone are in [open-items.md](./open-items.md) —
extensions having no affordances, a sweep for run-together text, the agent
-behaviour test suite, and the dev server's hourly wedge.

## Where I would start

A timetable is a grid: day × period × class. The useful first move is to
decide what a school's week _is_ — periods and bell times as a setting —
because every screen and every clash check depends on it. Build that, then
the admin grid, then clash detection, then the learner's week.
