# Timetable — design

Follows [timetable-brief.md](./timetable-brief.md). Covers the school's week,
rooms, arms, clash detection and the admin timetable. The learner's own week
is a separate, later piece; it is easy once this exists.

## What a school's week looks like (the problem)

A Nigerian senior school, as the pilot runs it:

- **A year group splits into arms.** SS1 has SS1A, SS1B, SS1C. An arm is a
  group of learners who move through the week together, usually with one
  stream — SS1A science, SS1B commercial, SS1C art — and a home classroom.
- **Common subjects are taught to each arm separately.** SS1A Mathematics,
  SS1B Mathematics and SS1C Mathematics are three classes with their own
  periods and possibly their own teachers.
- **Stream subjects belong to the arms that take them.** Physics, Chemistry
  and Biology for SS1A; Literature in English for SS1C.
- **Some subjects draw learners from several arms at once.** Further
  Mathematics taken by a few learners from SS1A and SS1B together, while the
  rest of those arms do something else in the same period — an option block.
- **Most lessons happen in the arm's own room; some move.** The Physics Lab,
  the Food & Nutrition Lab, the ICT room.
- **The school prints a timetable per arm.** Teachers and rooms are the other
  two ways of reading the same grid.

None of the shape — which days, how many periods, the bell times, what an arm
is called, which rooms exist — is the same from school to school, and none of
it is written into the code.

## Decisions taken

| Question                              | Answer                                                                                         |
| ------------------------------------- | ---------------------------------------------------------------------------------------------- |
| Scope of this piece                   | School week, rooms, arms, clashes, admin grid. Learner week view follows separately            |
| Week shape                            | Any days (Saturday included), any number of periods, per-day bell times and breaks             |
| Rotating (Week A / Week B) timetables | Not built. `cycleLength` is stored, always 1, so a rotation can be added without reshaping     |
| Terms                                 | A timetable belongs to a term; "copy from last term" seeds a new one                           |
| A clashing period                     | Saved and flagged, never refused — timetables are built in passes                              |
| Learner clash                         | Same arm (whole-arm classes), or a learner enrolled in both (everything else)                  |
| Rooms                                 | A list the school keeps; ordinary classrooms and special rooms. Old free-text rooms still read |

## Data

All schema changes are additive, in `server/plugins/db.ts` from version 79.

### School config (no migration — merged JSON, like `paperSize`)

```ts
schoolWeek?: {
  cycleLength: 1;
  days: Array<{
    day: 1 | 2 | 3 | 4 | 5 | 6 | 7;      // ISO weekday, 1 = Monday
    periods: Array<{
      number: number;                     // the school's own numbering for that day
      start: string;                      // "08:00"
      end: string;                        // "08:40"
      kind: "lesson" | "break";
      label?: string;                     // "Long break", "Assembly" — the school's words
    }>;
  }>;
}

rooms?: Array<{
  name: string;                           // "SS1A classroom", "Physics Lab"
  kind: "classroom" | "special";
}>
```

- Days a school does not teach are simply absent. A short Friday is a Friday
  with fewer periods.
- Validation in `update-school-config`: times are `HH:MM`, `start < end`,
  periods within a day do not overlap and are numbered uniquely, `cycleLength`
  is 1. A break carries a number like any period, so "period 4" means the same
  thing on the grid, in a reply and on paper.
- Room names are compared trimmed and case-insensitively. Two rooms whose names
  differ only in case are refused.
- **There is no default week.** Until a school sets one, `check-school-setup`
  reports it and the timetable page asks for it first (see _Setup gaps_).

Day names are never stored or listed in code. They are rendered from the day
number through `Intl.DateTimeFormat(locale, { weekday: "long" })` against a
fixed reference week — `schoolWeekdayName(day, config)` in `shared/`, used by
client and server alike.

### New table: `arms` (v79)

| Column                         | Notes                                              |
| ------------------------------ | -------------------------------------------------- |
| `id`                           |                                                    |
| `school_id`                    |                                                    |
| `grade_level_id`               | The year group it belongs to                       |
| `name`                         | "SS1A" — the school's own                          |
| `stream`                       | Nullable free text: "Science", "Commercial", "Art" |
| `home_room`                    | Nullable; a room name from `rooms`                 |
| `form_teacher_user_id`         | Nullable                                           |
| `sequence`                     | For ordering within a year group                   |
| `status`                       | `active` / `archived`                              |
| timestamps, `ownableColumns()` |                                                    |

Name unique per year group within a school. What the school calls an arm —
"arm", "class", "form", "stream" — is `customLabels.arm`, shown wherever the
word appears; "Arm" is the fallback.

### New columns and table

| Version | Change                                                                                    |
| ------- | ----------------------------------------------------------------------------------------- |
| 80      | `students.arm_id` — the learner's arm, nullable                                           |
| 81      | `classes.arm_id` — set on a **whole-arm class**, nullable                                 |
| 82      | `class_arms (id, class_id, arm_id, created_at)` — the arms an **option class** draws from |
| 83      | `class_schedules.term_id` — nullable                                                      |
| 84      | Index on `class_schedules (org_id, term_id, day_of_week)`                                 |

A class is exactly one of:

- **Whole-arm** — `classes.arm_id` set. Everyone in that arm takes it.
- **Option** — rows in `class_arms`. Learners come from enrolment.
- **Unattached** — neither. Every class that exists today. Treated like an
  option class drawing from nowhere: learner clashes come from enrolment only.

Setting `arm_id` and option arms on the same class is refused.

### Times and terms on a timetable row

- **Times come from the week.** A row's `period_number` is looked up in
  `schoolWeek` for its day. The row's own `start_time`/`end_time` are used only
  when there is no week, or the week has no such period — which keeps every
  existing row and `create-class-schedule` working. New rows still write the
  times they were placed at, so nothing that reads the columns directly breaks.
  If a school changes its bells, every lesson moves with them.
- **Terms.** For term T, the timetable is the rows with `term_id = T`. If the
  school has **none** for T, it is the rows with no term — today's data. This
  is decided per school, not per class, so a half-copied term never mixes with
  the old one.
- **Room** of a period = its own `room`, else the class's `room_number`, else
  the arm's `home_room`.

## Clash detection

One pure module, `server/lib/timetable-clashes.ts`. It takes the resolved
periods of one term and returns the clashes; every action, the grid and
`check-school-setup` call it, so all three always agree.

Two periods are compared when they fall on the same day and their resolved
times overlap. They clash when:

| Kind      | Rule                                                                                                                                     |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `teacher` | They share a teacher — primary or any `class_teachers` row with role primary or support. A class with no teacher yet clashes with nobody |
| `room`    | They resolve to the same room                                                                                                            |
| `arm`     | Either is a whole-arm class for an arm the other is attached to (whole-arm or option)                                                    |
| `learner` | They share an actively enrolled learner, and are not already an `arm` clash                                                              |

Two option classes drawing from the same arm in one period are an **option
block**, not a clash — unless a learner is enrolled in both.

Each clash carries its kind, the period ids, day, period number, and a sentence
in the school's own words: "Mr Adeyemi is down for SS1A Mathematics and SS2B
Physics on Tuesday, period 3." Ids and kind codes are for the agent and the
grid; the sentence is what a person reads.

## Enrolment follows the arm

Without this, an arm's grid and its learners' own weeks disagree.

- Setting a learner's arm enrols them in that arm's whole-arm classes, and
  withdraws them (`status = withdrawn`, never deleted) from the whole-arm
  classes of the arm they left.
- Creating a whole-arm class, or giving a class an arm, enrols the arm's
  learners.
- Option and unattached classes are never touched — who takes Further
  Mathematics is a choice someone makes.
- Every reply says what changed: "Tolu is now in SS1B. Enrolled in 9 classes,
  withdrawn from 9."

## Actions

Every action is named in `server/lib/action-policy.ts`.

| Action                    | Audience | What it does                                                                                                         |
| ------------------------- | -------- | -------------------------------------------------------------------------------------------------------------------- |
| `list-arms`               | STAFF    | Arms by year group, with stream, home room, form teacher and learner count                                           |
| `create-arm`              | ADMIN    | Year group, name, stream?, home room?, form teacher?                                                                 |
| `update-arm`              | ADMIN    | Any of the above; archive                                                                                            |
| `set-learner-arm`         | ADMIN    | One or many learners into an arm; enrolment follows (above)                                                          |
| `get-timetable`           | STAFF    | One term: the week, every period resolved, and its clashes. Optional `armId` / `teacherUserId` / `room` narrows it   |
| `set-timetable-period`    | ADMIN    | Put a class in a day + period of a term, optionally in a room; `scheduleId` to move one. Returns any clash it causes |
| `remove-timetable-period` | ADMIN    | Clear one                                                                                                            |
| `copy-timetable`          | ADMIN    | Copy one term's periods to another. Previews unless `confirm: true`; refuses onto a term that has periods            |

Changed:

- `update-school-config` — accepts `schoolWeek` and `rooms`, validated as above.
- `create-class` / `update-class` — accept `armId` or `optionArmIds`.
- `create-class-schedule` — unchanged arguments; gains optional `termId` and
  reports clashes it causes. Kept for free-time entry and compatibility.
- `get-my-schedule` — resolves the current term from the date, reads bell
  times from the week, names the day in the school's locale, and includes
  classes where the teacher is a support teacher, matching the clash rule.
- `check-school-setup` — new gaps (below).
- `view-screen` — on the timetable page, includes the term, the view
  (arm / teacher / room), what is selected, and the clashes in view.

`set-timetable-period` refuses a period number that is a break or does not
exist on that day, naming the periods that do; refuses when the school has no
week yet, saying so and how to set one.

### Setup gaps

| Setting           | Meanwhile                                                                                       |
| ----------------- | ----------------------------------------------------------------------------------------------- |
| School week       | Lessons show only the times typed against them; the timetable has no periods to offer           |
| Rooms             | Rooms are free text, so "Lab 1" and "lab 1" are two rooms and a double booking can go unnoticed |
| Timetable clashes | Listed, one sentence each, for the current term. Absent when there are none                     |

## UI

shadcn/ui and Tabler icons throughout; no browser dialogs; optimistic updates
on every edit.

- **Settings → School week.** A tab beside Terms. One card per day the school
  teaches, with its periods and breaks in order; add a day, add a period, copy
  one day's bells to the others. Day names from the locale.
- **Settings → Rooms.** A short list: name and kind.
- **Classes → Arms.** A tab on the existing Classes page rather than a new
  sidebar entry: arms grouped by year group, each opening a `Sheet` with its
  details and learners, and "Move learners here". Creating a class gains a
  choice of whole arm / option across arms / neither.
- **Timetable** — new page, `/admin/timetable`, in the admin sidebar.
  - Term picker, defaulting to the current term.
  - View by arm (default), teacher or room, picked with a `Select`.
  - Grid: days as columns, periods as rows, breaks as thin labelled rows.
  - Click a cell → `Popover` to choose a class (narrowed to the arm in view)
    and a room. Option blocks show their classes side by side in one cell.
  - A clashing cell is outlined in the destructive colour with a
    `HoverCard` giving the sentence; a count of clashes sits by the term
    picker and opens the list.
  - An empty term shows one action: "Copy from <previous term>".
  - No week set → one call to action pointing at Settings → School week.
- **Navigation.** `navigate --view=timetable [--termId] [--armId |
--teacherUserId | --room]` and `--view=arms`.

## Agent guide

`AGENTS.md` gains, in Section A, how to set up a week and rooms from what a
school says, how arms and option classes differ, building a timetable through
the actions, and reading clashes back in plain words. B6 is updated for the
new `get-my-schedule`. The navigation maps gain `timetable` and `arms`.

## Testing

`pnpm journey:school`, extended rather than unit tests:

1. Set a school week with a Saturday morning and a short Friday, and a room
   list including a lab.
2. Build SS1A/B/C with streams; whole-arm common and stream classes; one
   option block (Further Mathematics + another option, drawing from A and B).
3. Learners placed in arms; check enrolment followed.
4. Place a timetable that is clean, then add one deliberate clash of each kind
   — teacher, room, arm, learner — and check `get-timetable` reports exactly
   those four, each with a sentence.
5. Check the option block is **not** reported.
6. Copy the term; check the copy has the same periods and the same clashes.
7. Extend `checkTodaysSchedule`: slot times come from the bells, the day is
   named in the school's locale, a support teacher sees the class.

A small pure test of `timetable-clashes.ts` is allowed for the overlap and
option-block rules, which are the easiest place to be subtly wrong.

`npx tsc --noEmit` passes; `npx prettier --write` on every touched file.

## Not in this piece

- The learner's own week.
- Two-week rotations (`cycleLength > 1`).
- Generating a timetable automatically, or "SS1A needs five Maths periods a
  week" requirements.
- Double periods as one object — two adjacent periods of the same class are
  two rows, and the grid shows them joined.
