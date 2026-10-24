# Timetable Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A school sets its own week and rooms, splits year groups into arms, builds a clash-checked timetable per term, and every learner sees their own week.

**Architecture:** The week and rooms are school-config settings; arms are a new table, with whole-arm and option classes. Timetable rows (`class_schedules`) gain a term and take their times from the week by period number. One pure module finds clashes, and every action, the grid and setup checks call it.

**Tech Stack:** Drizzle + raw additive SQL migrations (`server/plugins/db.ts`), `defineAction` + zod, React Router + React Query, shadcn/ui, Tabler icons, `tsx` scripts for checks.

**Spec:** `templates/school/docs/timetable-design.md` — read it before starting any task.

All paths below are relative to `templates/school/`.

## Global Constraints

- Nothing hardcoded: no English day-name arrays, no default week, no assumed Monday–Friday or period count. Day names only via `schoolWeekdayName(day, locale)`.
- Every new action is listed in `server/lib/action-policy.ts` (`ADMIN`, `STAFF`, `EVERYONE`, `STUDENT_ONLY`) or the build fails.
- Migrations additive only, versions 79–84, never rename or drop.
- Dates/times through the school's locale: `useSchoolDates()` on the client, `schoolDateStyle()` / `schoolLocale(config)` on the server.
- shadcn/ui components, `@tabler/icons-react`, no `window.confirm/alert/prompt`, no custom dropdowns, optimistic updates on edits.
- Replies and UI copy say what happened in the school's words; ids and kind codes are for the agent, the `message` sentence is for people.
- `customLabels.arm` is the school's word for an arm; the fallback is "Arm".
- After each task: `npx prettier --write <touched files>` and `npx tsc --noEmit` (from `templates/school`) both clean.
- Simulation checks need the dev server running (`pnpm dev` via the preview tool's launch config); `pnpm journey:school` then runs against it.

## Review Focus

1. **A school with no week set** — every timetable action, `get-my-schedule` and `get-my-week` must answer in words, never throw or show an empty grid with no explanation. Pinned in Task 6 (checked before the week is set) and Task 8.
2. **Existing rows with no term and free-typed times** — today's data must keep showing on the teacher's dashboard after migration. Pinned in Tasks 5 and 7.
3. **A period that touches but does not overlap** (08:40 end, 08:40 start) is not a clash. Pinned in Task 4.
4. **Room names differing only in case or spacing** ("Physics Lab" vs " physics lab") are one room for clashes. Pinned in Tasks 1 and 4.
5. **A learner moved between arms twice** ends enrolled only in the current arm's whole-arm classes, with no duplicate enrolment rows. Pinned in Task 3.

---

## File map

| File                                                                           | Responsibility                                                                               |
| ------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------- |
| `shared/school-week.ts` (new)                                                  | Week/room types, validation, period lookup, overlap, locale day names. Pure; client + server |
| `server/lib/timetable-clashes.ts` (new)                                        | `findClashes` — pure                                                                         |
| `server/lib/timetable.ts` (new)                                                | Load config, pick the term, resolve rows into `ResolvedPeriod[]`                             |
| `server/lib/arm-enrolment.ts` (new)                                            | Enrolment that follows an arm                                                                |
| `test/timetable.check.ts` (new)                                                | Pure checks for the two pure modules, `node:assert`, run with `npx tsx`                      |
| `test/sim/timetable.ts` (new)                                                  | Simulation: week, rooms, arms, timetable, clashes, learner week                              |
| `actions/*-arm*.ts`, `actions/*-timetable*.ts`, `actions/get-my-week.ts` (new) | Actions per spec                                                                             |
| `app/routes/admin.timetable.tsx`, `app/routes/student.week.tsx` (new)          | Pages                                                                                        |
| `app/components/timetable/*` (new)                                             | Grid, cell popover, week editor, rooms editor, arms tab                                      |

---

### Task 1: The school's week and rooms (shared helpers + config)

**Files:**

- Create: `shared/school-week.ts`, `test/timetable.check.ts`
- Modify: `actions/update-school-config.ts` (schema + validation), `actions/check-school-setup.ts` (two gaps)

**Interfaces — Produces:**

```ts
export type Weekday = 1 | 2 | 3 | 4 | 5 | 6 | 7;
export interface WeekPeriod {
  number: number;
  start: string;
  end: string;
  kind: "lesson" | "break";
  label?: string;
}
export interface WeekDay {
  day: Weekday;
  periods: WeekPeriod[];
}
export interface SchoolWeek {
  cycleLength: 1;
  days: WeekDay[];
}
export type RoomKind = "classroom" | "special";
export interface Room {
  name: string;
  kind: RoomKind;
}

export function weekProblems(week: SchoolWeek): string[]; // [] = valid; each a sentence
export function roomProblems(rooms: Room[]): string[];
export function roomKey(name: string): string; // trim, collapse spaces, lowercase
export function findPeriod(
  week: SchoolWeek | null | undefined,
  day: number,
  number: number,
): WeekPeriod | null;
export function timesOverlap(
  aStart: string,
  aEnd: string,
  bStart: string,
  bEnd: string,
): boolean; // half-open
export function schoolWeekdayName(day: number, locale?: string): string; // Intl weekday:"long" on the ISO week of 2024-01-01 (a Monday)
```

- [ ] **Step 1: Write the failing checks** in `test/timetable.check.ts` (plain `node:assert/strict`, one `check(name, fn)` helper that prints PASS/FAIL and sets `process.exitCode = 1` on failure):
  - `weekProblems` on a valid Mon–Fri + Saturday-morning week → `[]`.
  - `weekProblems` with `start: "09:00", end: "08:40"` → one problem mentioning the day name and period number.
  - Two periods numbered 3 on one day → a problem; periods 08:00–08:40 and 08:30–09:10 → a problem; `cycleLength: 2` → a problem.
  - `roomProblems([{name:"Physics Lab",kind:"special"},{name:" physics  lab",kind:"special"}])` → one problem.
  - `roomKey(" Physics  Lab ") === "physics lab"`.
  - `findPeriod(week, 5, 7)` → `null` when Friday has 6 periods; `findPeriod(week, 1, 3)` → the period.
  - `timesOverlap("08:00","08:40","08:40","09:20") === false`; `("08:00","08:40","08:39","09:00") === true`.
  - `schoolWeekdayName(1, "en-GB") === "Monday"`, `schoolWeekdayName(6, "fr-FR") === "samedi"`.

- [ ] **Step 2: Run** `npx tsx test/timetable.check.ts` — expected: fails to import `shared/school-week.ts`.

- [ ] **Step 3: Implement `shared/school-week.ts`** per the interfaces. Problem sentences name the day with `schoolWeekdayName(day, "en")` and the period number, e.g. "Friday, period 3 ends before it starts."

- [ ] **Step 4: Run** `npx tsx test/timetable.check.ts` — expected: all PASS.

- [ ] **Step 5: Accept `schoolWeek` and `rooms` in `update-school-config`.** Add both to the zod schema with `jsonish(...)` like `reservedWeeks`, with descriptions saying nothing is assumed. In `run`, after merging, refuse with all of `weekProblems` / `roomProblems` joined when non-empty. Room names in `arms.home_room` are not checked here.

- [ ] **Step 6: Add two gaps to `check-school-setup`**, worded exactly as the spec's _Setup gaps_ table; `fix` values `update-school-config --schoolWeek '{...}'` and `update-school-config --rooms '[...]'`.

- [ ] **Step 7: Verify** `npx tsc --noEmit` clean; `npx prettier --write` the touched files.

- [ ] **Step 8: Commit** — `feat(school): a school's own week and rooms as settings`

---

### Task 2: Migrations and schema

**Files:**

- Modify: `server/plugins/db.ts` (append versions 79–84), `server/db/schema.ts`

**Interfaces — Produces:** Drizzle exports `arms`, `classArms`; new columns `students.armId`, `classes.armId`, `classSchedules.termId`.

- [ ] **Step 1: Append migrations**, each its own version, with a one-line comment above in the file's style:
  - 79 `CREATE TABLE IF NOT EXISTS arms (id TEXT PRIMARY KEY, school_id TEXT NOT NULL, grade_level_id TEXT NOT NULL, name TEXT NOT NULL, stream TEXT, home_room TEXT, form_teacher_user_id TEXT, sequence INTEGER NOT NULL DEFAULT 1, status TEXT NOT NULL DEFAULT 'active', created_at …, updated_at …, owner_email TEXT, org_id TEXT, visibility TEXT NOT NULL DEFAULT 'private')`
  - 80 `ALTER TABLE students ADD COLUMN arm_id TEXT`
  - 81 `ALTER TABLE classes ADD COLUMN arm_id TEXT`
  - 82 `CREATE TABLE IF NOT EXISTS class_arms (id TEXT PRIMARY KEY, class_id TEXT NOT NULL, arm_id TEXT NOT NULL, created_at TEXT NOT NULL DEFAULT (datetime('now')))`
  - 83 `ALTER TABLE class_schedules ADD COLUMN term_id TEXT`
  - 84 `CREATE INDEX IF NOT EXISTS class_schedules_term_day ON class_schedules (org_id, term_id, day_of_week)`

- [ ] **Step 2: Mirror in `schema.ts`.** `arms` with `...ownableColumns()`; comment on `classes.armId` and `classArms` stating the three kinds of class (whole-arm / option / unattached) and that a class may not be both.

- [ ] **Step 3: Verify** the dev server starts cleanly and the log shows migrations through 84 applied; `npx tsc --noEmit` clean.

- [ ] **Step 4: Commit** — `feat(school): arms, option classes and a term on each timetable row`

---

### Task 3: Arms, and enrolment that follows them

**Files:**

- Create: `server/lib/arm-enrolment.ts`, `actions/list-arms.ts`, `actions/create-arm.ts`, `actions/update-arm.ts`, `actions/set-learner-arm.ts`, `test/sim/timetable.ts`
- Modify: `actions/create-class.ts`, `actions/update-class.ts`, `server/lib/action-policy.ts`, `test/sim/run-school.ts`

**Interfaces — Produces:**

```ts
// server/lib/arm-enrolment.ts
export async function enrolArmInClass(
  orgId: string,
  classId: string,
  armId: string,
): Promise<number>; // newly enrolled
export async function moveLearnerArm(
  orgId: string,
  studentUserId: string,
  toArmId: string | null,
): Promise<{ fromArmId: string | null; enrolled: number; withdrawn: number }>;
```

Actions (all return `message` in words):

- `list-arms` STAFF — `{ gradeLevelId? }` → `{ arms: [{ id, name, gradeLevelId, gradeLevelName, stream, homeRoom, formTeacherUserId, learnerCount }] }`, ordered by year-group sequence then arm sequence.
- `create-arm` ADMIN — `{ gradeLevelId, name, stream?, homeRoom?, formTeacherUserId?, sequence? }` → `{ id, ... }`. Refuses a duplicate name in the year group.
- `update-arm` ADMIN — `{ id, name?, stream?, homeRoom?, formTeacherUserId?, sequence?, status? }`.
- `set-learner-arm` ADMIN — `{ armId: string | null, studentUserIds: string[] }` → `{ moved, enrolled, withdrawn, message }`. Refuses a learner whose year group differs from the arm's.
- `create-class` / `update-class` gain `armId?: string | null`, `optionArmIds?: string[]`; both set → refused; `optionArmIds` replaces the `class_arms` rows; setting `armId` calls `enrolArmInClass`. The arm(s) must be in the class's year group.

Consumes: nothing from earlier tasks except the schema (Task 2).

- [ ] **Step 1: Write the simulation check** `checkArms(client, run, findings)` in `test/sim/timetable.ts` and call it from `run-school.ts` after setup. Using the first cohort's year group and its learners:
  - create arms A, B, C (`stream` "Science", "Commercial", "Art"); split the cohort's learners into three with `set-learner-arm`;
  - create a whole-arm class per arm for an existing subject; expect each class's roll (`list-class-students`) to equal its arm's learners exactly;
  - move one learner A→B, then B→A; expect them enrolled once in A's class (no duplicate row), withdrawn from B's;
  - `create-class` with both `armId` and `optionArmIds` → refused;
  - `set-learner-arm` for a learner of another year group → refused.

- [ ] **Step 2: Run** `pnpm journey:school` — expected: the arms checks FAIL (actions do not exist).

- [ ] **Step 3: Implement `arm-enrolment.ts`.** Withdraw = `status = 'withdrawn'` on the existing enrolment; enrolling reactivates a withdrawn row rather than inserting a second. Only whole-arm classes (`classes.arm_id`) are touched.

- [ ] **Step 4: Implement the four actions and the `create-class` / `update-class` changes**; add all four names to `action-policy.ts` with the audiences above. Every query filters by `orgId`.

- [ ] **Step 5: Run** `pnpm journey:school` — expected: arms checks PASS; no earlier check regresses.

- [ ] **Step 6: Commit** — `feat(school): arms, and enrolment that follows a learner's arm`

---

### Task 4: Clash detection (pure)

**Files:**

- Create: `server/lib/timetable-clashes.ts`
- Modify: `test/timetable.check.ts`

**Interfaces — Produces:**

```ts
export interface ResolvedPeriod {
  scheduleId: string;
  classId: string;
  className: string;
  subjectName: string;
  termId: string | null;
  day: number;
  periodNumber: number | null;
  start: string;
  end: string;
  room: string | null;
  teachers: { userId: string; name: string }[]; // primary + support; [] when unassigned
  armId: string | null;
  optionArmIds: string[];
  learnerUserIds: string[]; // active enrolments
}
export type ClashKind = "teacher" | "room" | "arm" | "learner";
export interface Clash {
  kind: ClashKind;
  scheduleIds: [string, string];
  day: number;
  periodNumber: number | null;
  message: string;
}
export function findClashes(
  periods: ResolvedPeriod[],
  ctx: { locale?: string; armNames: Record<string, string> },
): Clash[];
```

Consumes: `timesOverlap`, `roomKey`, `schoolWeekdayName` (Task 1).

Rules exactly as the spec's _Clash detection_ table. One clash per pair per kind; `learner` is not reported for a pair already reported as `arm`. Messages:

- teacher: `"{name} is down for {classA} and {classB} on {Day}, period {n}."`
- room: `"{room} is booked for {classA} and {classB} on {Day}, period {n}."`
- arm: `"{arm} has {classA} and {classB} at the same time on {Day}, period {n}."`
- learner: `"{count} learner(s) are in both {classA} and {classB} on {Day}, period {n}."` (count only, never names)
  When `periodNumber` is null, `"period {n}"` becomes `"at {start}"`.

- [ ] **Step 1: Add failing checks** to `test/timetable.check.ts`, each building two or three `ResolvedPeriod`s:
  - shared teacher, overlapping → one `teacher` clash; message contains the teacher's name and both class names.
  - touching periods (08:00–08:40, 08:40–09:20), same teacher → `[]`.
  - rooms `"Physics Lab"` and `" physics lab"` overlapping → one `room` clash.
  - two whole-arm classes of arm A → one `arm` clash, and no `learner` clash even with shared learners.
  - whole-arm class of A + option class drawing from A,B → one `arm` clash.
  - two option classes from A,B, disjoint learners → `[]` (option block).
  - same, one shared learner → one `learner` clash; message has the count and no user id.
  - a class with `teachers: []` overlapping another unassigned class → `[]`.
  - different days, same everything → `[]`.

- [ ] **Step 2: Run** `npx tsx test/timetable.check.ts` — expected: new checks FAIL.

- [ ] **Step 3: Implement `findClashes`.** Group by `day`, compare each pair once (sort by `start`, break the inner loop when `b.start >= a.end`).

- [ ] **Step 4: Run** `npx tsx test/timetable.check.ts` — expected: all PASS.

- [ ] **Step 5: Commit** — `feat(school): find timetable clashes — teacher, room, arm and learner`

---

### Task 5: Loading a term's timetable

**Files:**

- Create: `server/lib/timetable.ts`

**Interfaces — Produces:**

```ts
export async function loadSchoolConfig(
  orgId: string,
): Promise<Record<string, any>>; // getOrgSetting(orgId, "school-config") ?? {}
export async function resolveTerm(
  orgId: string,
  date?: string,
): Promise<{
  termId: string | null;
  termName: string | null;
  status: "current" | "next" | "none";
}>;
export async function loadTimetable(
  orgId: string,
  termId: string | null,
): Promise<{
  week: SchoolWeek | null;
  locale?: string;
  periods: ResolvedPeriod[];
  fromUntermedRows: boolean;
  armNames: Record<string, string>;
}>;
export async function previousTerm(
  orgId: string,
  termId: string,
): Promise<{ id: string; name: string } | null>;
```

Consumes: Tasks 1, 2, 4.

- `resolveTerm`: same rule as `actions/get-current-term.ts` (active year, date within term, else next term, else none). Extract the shared logic rather than copying it; `get-current-term` then calls `resolveTerm`.
- `loadTimetable`: rows with `term_id = termId`; if the school has none for that term, rows with `term_id IS NULL` (`fromUntermedRows: true`). Times via `findPeriod` when the week has the period, else the row's own. Room = row `room` ?? class `room_number` ?? arm `home_room`. Teachers from `classes.primary_teacher_user_id` (skip `isUnassignedTeacher`) plus `class_teachers` with role primary/support, names via the existing person-name helper. Learners from active `class_enrollments`. No N+1: one query per table, joined in memory.

- [ ] **Step 1: Implement**, then confirm `get-current-term` returns the same reply as before for the sim school (run `pnpm journey:school`; the existing current-term checks pass).
- [ ] **Step 2: `npx tsc --noEmit` clean.**
- [ ] **Step 3: Commit** — `feat(school): load a term's timetable with times from the school's week`

---

### Task 6: Timetable actions

**Files:**

- Create: `actions/get-timetable.ts`, `actions/set-timetable-period.ts`, `actions/remove-timetable-period.ts`, `actions/copy-timetable.ts`
- Modify: `actions/create-class-schedule.ts`, `actions/check-school-setup.ts`, `server/lib/action-policy.ts`, `test/sim/timetable.ts`

**Interfaces — Produces:**

- `get-timetable` STAFF — `{ termId?, armId?, teacherUserId?, room? }` → `{ term: { id, name } | null, week: SchoolWeek | null, dayNames: Record<number,string>, periods: ResolvedPeriod[], clashes: Clash[], fromUntermedRows, message }`. Filters narrow `periods` and keep only clashes touching them. Teachers calling it see the whole school (they need the room and colleague picture) — same as STAFF elsewhere.
- `set-timetable-period` ADMIN — `{ termId, classId, day, periodNumber, room?, scheduleId? }` → `{ scheduleId, clashes: Clash[], message }`. With `scheduleId` it moves that row. Writes `start_time`/`end_time` from the week. Refuses: no week ("…hasn't set its week yet — Settings → School week"), a day the school does not teach, a period that does not exist or is a break (naming the lesson periods that day has), a room not on the room list when the list is set.
- `remove-timetable-period` ADMIN — `{ scheduleId }` → `{ removed: true, message }`.
- `copy-timetable` ADMIN — `{ fromTermId, toTermId, confirm? }` → preview `{ periods: n, clashes: n, message }`; with `confirm: true` writes copies. Refuses when `toTermId` already has rows.
- `create-class-schedule` gains `termId?` and returns `clashes`; drops its `dayNames` array in favour of `schoolWeekdayName`.
- `check-school-setup` adds the clashes gap for the current term (one sentence per clash, absent when none).

Consumes: Tasks 1, 4, 5.

- [ ] **Step 1: Write the simulation check** `checkTimetable(client, run, findings)` in `test/sim/timetable.ts`, after `checkArms`. It works in **two new terms** it creates after the run's term (`T2`, `T3`), never the run's own term: the seed rows from `school-setup.ts` have no term and must keep serving the current term, which they stop doing once that term has rows of its own.
  - **before** setting a week: `set-timetable-period` → refused, message names Settings → School week; `get-timetable` → `week: null` and a message, no throw;
  - set a week: Mon–Thu 8 periods with a break as period 4, Friday 6 periods, Saturday 3 periods; rooms list with three arm classrooms and `"Physics Lab"` (special);
  - option classes "Further Mathematics" and "Technical Drawing" drawing from A and B, each with disjoint learners from A and B;
  - in `T2`, place a clean timetable for the three arms' whole-arm classes; expect `get-timetable` → `clashes: []`;
  - place the option block (both options, same slot) → still `[]`;
  - add one of each deliberate clash: same teacher in A and B Maths in one slot; two classes of different arms in Physics Lab in one slot; two A classes in one slot; enrol one learner in both options and place them in one slot → expect exactly four clashes, kinds `teacher`, `room`, `arm`, `learner`, each `message` a non-empty sentence with no id in it;
  - `set-timetable-period` on a break period → refused; on Sunday → refused;
  - `copy-timetable` `T2 → T3` preview then confirm → same period count and four clashes in `T3`; copying again → refused;
  - `check-school-setup` lists clashes only for the current term — the run's term, which has none — so it must **not** list `T2`'s.

- [ ] **Step 2: Run** `pnpm journey:school` — expected: timetable checks FAIL.

- [ ] **Step 3: Implement the four actions and the changes; add the names to `action-policy.ts`.**

- [ ] **Step 4: Run** `pnpm journey:school` — expected: PASS, no regressions.

- [ ] **Step 5: Commit** — `feat(school): build a term's timetable, with clashes reported in words`

---

### Task 7: A teacher's day, from the week

**Files:**

- Modify: `actions/get-my-schedule.ts`, `actions/view-screen.ts` (its `todaySchedule`), `test/sim/school-term.ts` (`checkTodaysSchedule`)

Consumes: `resolveTerm`, `loadTimetable` (Task 5), `schoolWeekdayName` (Task 1).

`get-my-schedule` keeps its argument and reply shape (`date, dayOfWeek, dayName, slots[], unpreparedCount, message`), and:

- picks the term with `resolveTerm(orgId, date)` and loads it with `loadTimetable`;
- includes periods where the caller is among `teachers` (primary or support);
- names the day with `schoolWeekdayName(dayOfWeek, schoolLocale(config))`;
- keeps `lessonPrepared` / `lesson` per slot exactly as now;
- with no week and no rows, says so in words.

- [ ] **Step 1: Extend `checkTodaysSchedule`** (it runs after Task 6's check, so the week is set and the current term is still served by the untermed seed rows): each slot whose period exists in the week on that day has `startTime`/`endTime` equal to that period's bells, not the times typed into the seed row; `dayName` equals `new Intl.DateTimeFormat(locale, { weekday: "long" })` of today; a support teacher added with `add-teacher-to-class` sees the class. The existing assertions remain, and the original seed rows (no term) still appear for their teachers.
- [ ] **Step 2: Run** `pnpm journey:school` — expected: new assertions FAIL.
- [ ] **Step 3: Implement.**
- [ ] **Step 4: Run** `pnpm journey:school` — expected: PASS.
- [ ] **Step 5: Commit** — `feat(school): a teacher's day reads its times from the school's week`

---

### Task 8: A learner's own week (server)

**Files:**

- Create: `actions/get-my-week.ts`
- Modify: `server/lib/action-policy.ts`, `actions/view-screen.ts` (student branch, `view === "week"`), `test/sim/timetable.ts`

**Interfaces — Produces:**
`get-my-week` EVERYONE — `{ date? }` →

```ts
{
  term: { id: string; name: string } | null;
  termStatus: "current" | "next" | "none";
  days: Array<{
    day: number; dayName: string; isToday: boolean;
    periods: Array<{
      number: number; start: string; end: string; kind: "lesson" | "break"; label?: string;
      lessons: Array<{ classId: string; className: string; subjectName: string; teacherName: string | null; room: string | null }>;
    }>;
  }>;
  next: { dayName: string; start: string; className: string; room: string | null } | null;
  message: string;
}
```

Learner → periods for classes they are actively enrolled in; staff → classes they teach. `lessons` is empty for a free period and holds two entries only for an unresolved clash. The reply carries no `clashes`, no learner ids, no arm ids, no option-class arm lists. No week → `days: []`, message "Your school hasn't set its timetable yet." No lessons → message "Nothing is on your timetable yet." Between terms → next term, and the message says it is next term's.

Consumes: Tasks 1, 5.

- [ ] **Step 1: Write the simulation check** `checkLearnerWeek` in `test/sim/timetable.ts`, calling `get-my-week` with a `date` inside `T2` from Task 6: an A learner taking Further Mathematics sees every A whole-arm lesson placed in Task 6, sees Further Mathematics and **not** Technical Drawing in the option slot, and `JSON.stringify(reply)` contains no other learner's user id, no arm id and the substring `clash` nowhere; a learner of an unscheduled year group gets "Nothing is on your timetable yet."
- [ ] **Step 2: Run** `pnpm journey:school` — expected: FAIL.
- [ ] **Step 3: Implement `get-my-week`, its policy entry, and the `view-screen` student `week` branch** (returns the same object).
- [ ] **Step 4: Run** `pnpm journey:school` — expected: PASS.
- [ ] **Step 5: Commit** — `feat(school): every learner sees their own week`

---

### Task 9: Settings — School week and Rooms tabs

**Files:**

- Create: `app/components/timetable/SchoolWeekEditor.tsx`, `app/components/timetable/RoomsEditor.tsx`
- Modify: `app/routes/admin.settings.tsx` (two `TabsTrigger`s after "Terms": `school-week` "School week", `rooms` "Rooms")

Consumes: `SchoolWeek`, `Room`, `weekProblems`, `roomProblems`, `schoolWeekdayName` (Task 1); saves through `update-school-config` the way the Grading tab saves.

- Week editor: one `Card` per taught day in order; rows of period number, start, end (`Input type="time"`), lesson/break (`Select`), label. "Add a day" `DropdownMenu` listing the seven `schoolWeekdayName`s not yet used; "Copy these bells to…" `DropdownMenu` per day. Problems from `weekProblems` shown inline under the day they name, and Save disabled while any exist. Optimistic save with rollback + `toast` on error.
- Rooms editor: a list of name + kind (`Select`: "Classroom" / "Special room"), add/remove; `roomProblems` inline.

- [ ] **Step 1: Build both editors and the tabs.**
- [ ] **Step 2: Verify in the browser pane** (admin of a sim school, signed in per `docs/timetable-brief.md`): create a Saturday with 3 periods, save, reload, confirm in the DOM it persisted; enter an end before a start and confirm the problem text appears and Save is disabled. Switch tabs by dispatching pointer events, not `.click()` (Radix).
- [ ] **Step 3: `npx tsc --noEmit` clean; prettier.**
- [ ] **Step 4: Commit** — `feat(school): set the school's week and rooms in Settings`

---

### Task 10: Arms on the Classes page

**Files:**

- Create: `app/components/timetable/ArmsTab.tsx`
- Modify: `app/routes/admin.classes.tsx` (tabs: existing list as "Classes", new "{arm label}s" tab), its create-class form, `app/routes/admin.tsx` (`viewMap.arms → /admin/classes?tab=arms`)

Consumes: `list-arms`, `create-arm`, `update-arm`, `set-learner-arm`, `create-class` / `update-class` arm fields (Task 3).

- Arms grouped by year group; each row: name, stream, home room, learner count. Row opens a `Sheet` with details (editable) and its learners; "Move learners here" opens a `Dialog` with a searchable checklist (`Command`) of that year group's learners; confirming shows the reply's `message` as a toast.
- Create-class form gains a "Who takes it" `RadioGroup`: "A whole {arm}" (`Select` of the year group's arms) / "Learners from several {arm}s" (checkboxes) / "Not tied to an {arm}". `{arm}` is `customLabels.arm ?? "Arm"`, lower-cased in running text.

- [ ] **Step 1: Build.**
- [ ] **Step 2: Verify in the browser pane:** create SS1D, move two learners into it, confirm the count in the DOM and the toast text; create a class "Learners from several arms" and confirm `list-arms`/class reply carries the option arms.
- [ ] **Step 3: tsc + prettier.**
- [ ] **Step 4: Commit** — `feat(school): manage arms from the Classes page`

---

### Task 11: The timetable page

**Files:**

- Create: `app/routes/admin.timetable.tsx`, `app/components/timetable/TimetableGrid.tsx`, `app/components/timetable/PeriodCellPopover.tsx`
- Modify: `app/components/layout/AdminSidebar.tsx` (item "Timetable", `IconCalendarTime`, after "Classes"), `app/routes/admin.tsx` (`viewMap.timetable` with `termId`/`armId`/`teacherUserId`/`room` as search params), `app/hooks/use-navigation-state.ts` (`AdminNav` gains `termId?`, `timetableView?: "arm" | "teacher" | "room"`, `armId?`, `teacherUserId?`, `room?`, `selectedCell?: { day: number; periodNumber: number }`), `actions/view-screen.ts` (admin `timetable` branch: the `get-timetable` reply for what is in view)

Consumes: `get-timetable`, `set-timetable-period`, `remove-timetable-period`, `copy-timetable`, `list-arms`, `previousTerm` via `copy-timetable`'s preview.

- Header: term `Select` (default current), view `Select` (arm / teacher / room) and the matching entity `Select`, a clash count `Badge` that opens a `Popover` listing clash messages.
- Grid: days (locale names from the reply's `dayNames`) as columns, periods as rows; break rows thin with their label. A lesson cell shows class, teacher, room; an option block shows its classes side by side. Clashing cells outlined with the destructive token, `HoverCard` with the message(s).
- Cell click → `PeriodCellPopover`: class `Select` (narrowed to the arm in arm view), room `Select` from the room list (default: the resolved room), Save / Remove. Optimistic: write the period into the `get-timetable` cache, then call; on reply replace `clashes` from the reply; on error roll back + toast.
- Empty term → single CTA "Copy from {previous term}" → `AlertDialog` showing the preview counts → confirm.
- No week → single CTA to Settings → School week.
- Writes `navigation` application state on every view/selection change.

- [ ] **Step 1: Build.**
- [ ] **Step 2: Verify in the browser pane** on a sim school after the journey: pick the sim's `T2` in the term picker, open SS1A, confirm in the DOM the four sim clashes are outlined and the badge reads 4; place a class in a free cell and confirm it appears without a reload; remove it; switch to teacher view for the clashing teacher and confirm both classes show in one cell. Check `view-screen` returns the selected cell.
- [ ] **Step 3: tsc + prettier.**
- [ ] **Step 4: Commit** — `feat(school): build the timetable on a grid, by arm, teacher or room`

---

### Task 12: The learner's week page

**Files:**

- Create: `app/routes/student.week.tsx`
- Modify: `app/components/layout/StudentNav.tsx` (item "My week", `IconCalendarWeek`, after Dashboard), `app/routes/student._index.tsx` (one line from `get-my-week`'s `next`), `app/routes/student.tsx` (`viewMap.week → /student/week`), `app/hooks/use-navigation-state.ts` (`StudentNav` view `"week"`)

Consumes: `get-my-week` (Task 8).

- Wide screens (`md:` and up): grid of days × periods, today's column marked. Phones: one day at a time with a `Tabs` row of short day names, opening on today (`isToday`). Free periods shown as "Free". Breaks as thin labelled rows. The reply's `message` is the empty state when `days` or all `lessons` are empty.
- Dashboard: "Next: {className}, {room}, {start}" when `next` is set; nothing otherwise.

- [ ] **Step 1: Build.**
- [ ] **Step 2: Verify in the browser pane** as an SS1A learner from the journey (and with `resize_window` preset `mobile`): their option shows, the other option does not; today is marked; the mobile view opens on today. Reset the viewport to desktop afterwards.
- [ ] **Step 3: tsc + prettier.**
- [ ] **Step 4: Commit** — `feat(school): a learner's week, on their own page`

---

### Task 13: Agent guide and final verification

**Files:**

- Modify: `AGENTS.md`, `docs/timetable-brief.md` (point "What is missing" at the design, mark what is done)

- [ ] **Step 1: Update `AGENTS.md`** per the spec's _Agent guide_ section: Section A gains "A2c. The school's week, arms and the timetable" (setting the week and rooms from what the school says — propose, never assume; whole-arm vs option classes; building and copying a term; reading clashes back as their sentences; never resolving a clash by moving someone's lesson without asking). B6 rewritten for the new `get-my-schedule`. Section C gains "what do I have tomorrow?" from `get-my-week`. Navigation maps gain `timetable`, `arms`, `week`. Actions reference gains every new action with its arguments. All in the file's own voice: outcomes to the user, action names only for the agent.
- [ ] **Step 2: Run the full checks:** `npx tsx test/timetable.check.ts` (all PASS), `npx tsc --noEmit` (clean), `pnpm journey:school` (no failed findings), `pnpm journey:assumptions` (no new day-name, period-count or Monday–Friday assumptions in `actions`, `app`, `server`, `shared`).
- [ ] **Step 3: Commit** — `docs(school): the agent's guide to the week, arms and timetable`
