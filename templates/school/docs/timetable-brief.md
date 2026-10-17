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

## What was missing, and what exists now

The design is in [timetable-design.md](./timetable-design.md).

- **Building a timetable** is now an admin page (`/admin/timetable`) and the
  actions `get-timetable`, `set-timetable-period`, `remove-timetable-period`
  and `copy-timetable`.
- **Clash detection** is `server/lib/timetable-clashes.ts`: teacher, room,
  arm and learner clashes, saved and flagged, never refused. Option blocks are
  not clashes.
- **A learner's week** is `get-my-week` and `/student/week`. `get-my-schedule`
  is still the teacher's day.
- **The school's own week** is `schoolWeek` and `rooms` in the school config,
  set with `update-school-config`. There is no default; `check-school-setup`
  reports it. Rotating timetables are not built (`cycleLength` is always 1).
- **Terms**: a timetable belongs to a term, and a term with none of its own
  shows the earlier, term-less one until it is copied in.
- **Arms** (`list-arms`, `create-arm`, `update-arm`, `set-learner-arm`) and the
  agent's guide to all of it (AGENTS.md, A2c) were added with it.

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

Read the design, then `AGENTS.md` A2c. Not built: rotating timetables,
automatic generation, double periods as one object.
