# Timetable Generation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** An admin generates a whole-school, clash-free timetable proposal for a term around the lessons already placed, previews it on the grid, and accepts or discards it.

**Architecture:** A pure solver (`server/lib/timetable-generator.ts`) takes plain data and returns proposed lessons plus unplaced units with reasons. A server module builds the solver's input from the existing loader and stores proposals in a new table. Four admin/staff actions drive it, and the grid overlays the open proposal.

**Tech Stack:** TypeScript, Drizzle + additive SQL migrations, `defineAction` + zod, React Router + React Query, shadcn/ui, Tabler icons, `npx tsx` checks, the `pnpm journey:school` simulation.

**Spec:** `templates/school/docs/timetable-generation-design.md`. Read it before any task. It builds on `templates/school/docs/timetable-design.md`.

All paths are relative to `templates/school/`.

## Global Constraints

- **Agnostic:** no subject, day, stream, year-group or school words in code or copy. Day names come only from `schoolWeekdayName(day, locale)`, and school words only from `schoolWord(orgId, key, fallback)` (`server/lib/arm-enrolment.ts`).
- **The solver is pure:** no database access, no clock reads except through an injected `now()`, and no randomness. The same input gives byte-identical output.
- **Lessons already placed in the term are never moved or removed.**
- **The solver must not introduce clashes:** `findClashes` (`server/lib/timetable-clashes.ts`) over fixed + proposed lessons reports **no clash involving a proposed lesson**.
- **Time budget:** `GENERATION_BUDGET_MS = 4000`. The solver stops at the budget and returns the best result so far.
- **Repair bound:** `REPAIR_DEPTH = 3` (at most 3 generated units taken back per repair).
- **Migrations are additive only;** the next version is **89**.
- **Every new action is in `server/lib/action-policy.ts`.** Every query is scoped to the school.
- **Every `useQuery` calls a GET or `readOnly: true` action only.** A non-read-only POST in a query loops through `useDbSync`.
- **UI:** shadcn/ui and Tabler icons only; no browser dialogs; no `SelectItem value=""`; clean and minimal.
- **Reply `message`s** are sentences for people with no ids in them.
- **After every task:** `npx tsc --noEmit` clean, `npx prettier --write` on touched files, and `npx tsx test/timetable.check.ts` all PASS.
- **Simulation:** `COREPACK_ENABLE_STRICT=0 pnpm journey:school` against the dev server on :8130 ends 0 broken / 0 wrong / 0 missing.

## Review Focus

1. **Fixed lessons that already clash.** Generation still runs, and proposed lessons add no new clash. Pinned in Task 2.
2. **A day with no two consecutive lesson periods.** Doubles go unplaced with the "no two periods in a row" reason; nothing throws. Pinned in Task 2.
3. **More periods required than the week holds.** The solver ends within budget with unplaced units, and never loops. Pinned in Task 2.
4. **Fixed lessons off the bells** (stored times not matching any week period). Generated lessons still avoid them by time overlap. Pinned in Task 2.
5. **A class archived, or a fixed lesson removed, between proposing and accepting.** Accept refuses with "generate again"; it never writes a lesson for an archived class. Pinned in Task 4.

---

## File map

| File                                                                                                                                | Responsibility                                                             |
| ----------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| `server/lib/timetable-generator.ts` (new)                                                                                           | Pure: types, `buildUnits`, `generateTimetable`, `explainUnplaced`          |
| `server/lib/timetable-generation.ts` (new)                                                                                          | Server: `buildGeneratorInput`, `termFingerprint`, proposal storage helpers |
| `actions/generate-timetable.ts`, `get-timetable-proposal.ts`, `accept-timetable-proposal.ts`, `discard-timetable-proposal.ts` (new) | The four actions                                                           |
| `app/components/timetable/ProposalBar.tsx` (new)                                                                                    | Proposal bar, generate confirm, not-fitted list                            |
| `test/timetable.check.ts`, `test/sim/timetable.ts`                                                                                  | Pure checks; simulation                                                    |

---

### Task 1: Units from shortfalls

**Files:**

- Create: `server/lib/timetable-generator.ts`
- Modify: `test/timetable.check.ts`

**Interfaces — Produces:**

```ts
export interface GenSlot {
  day: number;
  periodNumber: number;
  start: string;
  end: string;
} // a lesson period of the week
export interface GenClass {
  classId: string;
  className: string;
  subjectName: string;
  armId: string | null;
  optionArmIds: string[];
  teacherIds: string[];
  teacherNames: Record<string, string>;
  room: string | null;
  learnerUserIds: string[];
  required: { periods: number; doubles: number } | null; // null = no lesson count
  placed: { periods: number; doubles: number }; // from countCoverage
}
export interface GenInput {
  week: SchoolWeek;
  locale?: string;
  armNames: Record<string, string>;
  fixed: ResolvedPeriod[]; // the term's lessons, never moved
  classes: GenClass[];
}
export type UnitKind = "single" | "double";
export interface GenUnit {
  id: string; // deterministic: `${blockKey|classId}:${kind}:${n}`
  kind: UnitKind;
  members: { classId: string; needs: "lesson" | "free" }[]; // one member unless a block
  blockKey: string | null; // sorted option arm ids joined, for blocks
}
export function buildUnits(input: GenInput): {
  units: GenUnit[];
  notSet: string[];
  noTeacher: string[];
}; // notSet/noTeacher = classIds
```

Consumes: `ResolvedPeriod` (timetable-clashes.ts), `SchoolWeek` (shared/school-week.ts).

Rules (from the spec's "Units"):

- **Shortfall:** periods short = required.periods − placed.periods, and doubles short = required.doubles − placed.doubles. Neither is ever negative. Single units = periods short − 2 × doubles short, and never negative.
- **Whole-arm and unattached classes:** one member each.
- **Option classes:** those with the same set of `optionArmIds` form one block.
  - The block reserves double units = the most doubles short of any member, and single units = (the most periods short of any member) − 2 × (double units).
  - Within each reserved unit, a member is `"lesson"` while it still needs that kind, and otherwise `"free"`. A member needing a single may use one period of a double unit (mark it `"lesson"` there and count it against its singles).
- **Not set and no teacher:** classes with `required: null` go to `notSet`; classes with an empty `teacherIds` that produced units go to `noTeacher`.
- **Order:** units are ordered by blockKey ?? classId, then double before single, then n.

- [ ] **Step 1: Write failing checks** in `test/timetable.check.ts` (existing `check` helper):
  - a class (5, 1) with nothing placed gives 1 double + 3 singles;
  - a class (5, 1) with one valid pair and 1 single placed gives 2 singles;
  - a class with `required: null` gives no units and appears in `notSet`;
  - a block of members (5, 1) and (3, 0) gives 1 double + 3 singles, and the second member is `"free"` in exactly two of the five reserved periods;
  - a class with no teachers and units is listed in `noTeacher`;
  - two runs give a `JSON.stringify`-equal result.
- [ ] **Step 2: Run** `npx tsx test/timetable.check.ts`. Expected: the new checks FAIL (module missing).
- [ ] **Step 3: Implement** `buildUnits` and the types.
- [ ] **Step 4: Run** the checks. Expected: all PASS.
- [ ] **Step 5: Commit:** `feat(school): turn lesson shortfalls into units to place`

---

### Task 2: The solver

**Files:**

- Modify: `server/lib/timetable-generator.ts`, `test/timetable.check.ts`

**Interfaces — Produces:**

```ts
export const GENERATION_BUDGET_MS = 4000;
export const REPAIR_DEPTH = 3;
export interface ProposedLesson {
  classId: string;
  day: number;
  periodNumber: number;
  start: string;
  end: string;
  room: string | null;
  pairKey: string | null;
} // pairKey shared by a double's two halves
export interface UnplacedUnit {
  unitId: string;
  classIds: string[];
  kind: UnitKind;
  blockers: Blocker[];
}
export type Blocker =
  | { kind: "arm-full"; armIds: string[] }
  | { kind: "teacher-busy"; teacherId: string; days: number[] }
  | { kind: "no-consecutive"; days: number[] }
  | { kind: "block-teachers"; teacherIds: string[] }
  | { kind: "room-busy"; room: string }
  | { kind: "budget" };
export function generateTimetable(
  input: GenInput,
  opts?: { now?: () => number; budgetMs?: number },
): {
  lessons: ProposedLesson[];
  unplaced: UnplacedUnit[];
  notSet: string[];
  noTeacher: string[];
  elapsedMs: number;
};
```

Consumes: `buildUnits` (Task 1), `findClashes`, `doubleSecondPeriod`, `timesOverlap`, `roomKey`.

Search (spec "The search"):

1. **Order units hardest first:** blocks, then doubles, then units whose members have the fewest legal slots at the start. Ties keep Task 1's order.
2. **Place each unit** in the best legal slot. A slot is legal when it causes no clash with fixed lessons or with lessons placed so far, by the same rules `findClashes` applies (teacher, room, arm, learner; overlap by time), and when a double's second period is `doubleSecondPeriod`. For speed, use occupancy indexes, but they must match `findClashes`. Best = fewest of the same class already on that day, then earliest day, then earliest period.
3. **Repair:** when no legal slot exists, take back up to `REPAIR_DEPTH` generated units that block it, place this one, and re-place those. If that fails, restore the previous state and record the unit unplaced with its blockers.
4. **Spread pass:** while budget remains, move generated units to days with fewer lessons of the same class when legal. Never unplace anything.
5. **Budget:** check `now()` between units. When the budget is reached, record the remaining units as unplaced with `{ kind: "budget" }`.

- [ ] **Step 1: Write failing checks:**
  - a feasible two-arm school is fully placed, and `findClashes([...fixed, ...asResolved(lessons)])` has no clash with a proposed lesson;
  - fixed lessons appear unchanged and none is moved (compare scheduleIds and slots);
  - a double never straddles a break or a non-lesson period;
  - a block's members share every slot they use;
  - five singles over a five-day week land on five different days;
  - **Review Focus 1:** fixed lessons that already clash: generation runs, and no new clash involves a proposed lesson;
  - **Review Focus 2:** a day with no two consecutive lesson periods: doubles there are unplaced with `no-consecutive`, and nothing throws;
  - **Review Focus 3:** required periods > the week's lesson periods: it returns within `budgetMs: 200` (injected `now`) with unplaced units;
  - **Review Focus 4:** a fixed lesson off the bells (stored times overlapping two week periods) blocks both by time;
  - an injected `now` that passes the budget immediately leaves all units unplaced with `budget`;
  - two runs give identical output.

  Add a small `asResolved(lessons, input)` helper in the check file that builds `ResolvedPeriod`s for `findClashes`.

- [ ] **Step 2: Run.** Expected: FAIL.
- [ ] **Step 3: Implement `generateTimetable`.**
- [ ] **Step 4: Run.** Expected: all PASS.
- [ ] **Step 5: Commit:** `feat(school): place lessons hardest first, repair, and spread across the week`

---

### Task 3: Explaining what did not fit

**Files:**

- Modify: `server/lib/timetable-generator.ts`, `test/timetable.check.ts`

**Interfaces — Produces:**

```ts
export interface Words {
  arm: string;
  double: string;
  doubles: string;
} // the school's words, passed in
export function explainUnplaced(
  result: ReturnType<typeof generateTimetable>,
  input: GenInput,
  words: Words,
): {
  reasons: { classIds: string[]; message: string }[];
  notSet: string[];
  noTeacher: string[];
}; // notSet/noTeacher as sentences
```

One sentence per unplaced unit, built from its blockers' data: class or block names, the teacher's name, day names via `schoolWeekdayName(day, input.locale)`, and `words`. Sentences follow the spec's examples in shape. The only fixed words are the sentence glue the spec's examples use; school nouns come from `words`.

- [ ] **Step 1: Failing checks:**
  - each blocker kind gives a sentence containing the class name and (where it applies) the teacher's name and a localised day name (`"fr"` gives "lundi");
  - no sentence contains an id;
  - `notSet` and `noTeacher` sentences name the classes.
- [ ] **Step 2: Run.** Expected: FAIL.
- [ ] **Step 3: Implement.**
- [ ] **Step 4: Run.** Expected: PASS.
- [ ] **Step 5: Commit:** `feat(school): say in words why a lesson could not be placed`

---

### Task 4: Proposals: storage and actions

**Files:**

- Create: `server/lib/timetable-generation.ts`, `actions/generate-timetable.ts`, `actions/get-timetable-proposal.ts`, `actions/accept-timetable-proposal.ts`, `actions/discard-timetable-proposal.ts`
- Modify: `server/plugins/db.ts` (v89), `server/db/schema.ts`, `server/lib/action-policy.ts`, `server/lib/arm-enrolment.ts` (only if `schoolWord` needs a plural form), `test/sim/timetable.ts`, `test/sim/run-school.ts` (if a new check function is added)

**Interfaces — Produces:**

```ts
// server/lib/timetable-generation.ts
export async function buildGeneratorInput(
  orgId: string,
  termId: string,
): Promise<GenInput>;
export async function termFingerprint(
  orgId: string,
  termId: string,
): Promise<string>; // sorted "classId|day|periodNumber|start|end|room|pairId" of the term's own active-class rows, hashed (sha256 hex)
export async function openProposal(
  orgId: string,
  termId: string,
): Promise<ProposalRow | null>;
```

Migration v89: `CREATE TABLE IF NOT EXISTS timetable_proposals (id TEXT PRIMARY KEY, school_id TEXT NOT NULL, term_id TEXT NOT NULL, created_by_user_id TEXT, created_at TEXT NOT NULL DEFAULT (datetime('now')), base_fingerprint TEXT NOT NULL, lessons_json TEXT NOT NULL DEFAULT '[]', unplaced_json TEXT NOT NULL DEFAULT '[]', summary_json TEXT NOT NULL DEFAULT '{}', status TEXT NOT NULL DEFAULT 'open', owner_email TEXT, org_id TEXT, visibility TEXT NOT NULL DEFAULT 'private')`. Schema export `timetableProposals` with `...ownableColumns()`.

Actions (spec table; replies always carry `message`):

- **`generate-timetable`** (ADMIN, POST): `{ termId, confirm? }`.
  - **Refusals, in order:** no week; no class with lesson counts; the term is still showing the earlier timetable (reuse the R8 helper's sentence).
  - **No-teacher classes and no `confirm`:** reply `{ needsConfirm: true, noTeacher: [...names], message }` and store nothing.
  - **Otherwise:** run `generateTimetable` and `explainUnplaced`; discard any open proposal for the term (status `discarded`); insert the new one with `base_fingerprint = termFingerprint(...)`.
  - **Reply:** `{ proposalId, lessons: n, notFitted: n, notSet: n, noTeacher: n, elapsedMs, message }`.
  - Pass `words` from `schoolWord(orgId, "arm", "arm")` and `schoolWord(orgId, "double", "double")`, plus a plural from the existing plural helper.
- **`get-timetable-proposal`** (STAFF, GET, `readOnly: true`): `{ termId }` → `{ proposal: { id, createdAt, lessons: ProposedLesson[] with className, reasons, notSet, noTeacher, summary } | null }`.
- **`accept-timetable-proposal`** (ADMIN, POST): `{ proposalId }`.
  - Refuse unless the proposal is open and in this school.
  - Refuse "The timetable changed after this was proposed — generate again." when `termFingerprint` differs, or when any proposed class is no longer active (**Review Focus 5**).
  - Otherwise insert every lesson in **one** `insert(...).values(rows)`: fresh ids, `term_id`, room, and for doubles a fresh `pair_id` per `pairKey`. Times come from the week. Then mark the proposal `accepted`.
  - Reply with the counts in words.
- **`discard-timetable-proposal`** (ADMIN, POST): `{ proposalId }` → status `discarded`.

- [ ] **Step 1: Write the simulation check** `checkGeneration(client, run, findings, ctx)` in `test/sim/timetable.ts`, called last in the timetable phase. In a fresh term of the run's year:
  1. set lesson counts for the JSS1 arms' classes (`set-lesson-counts`, confirm);
  2. place one lesson by hand;
  3. `generate-timetable`: if `needsConfirm`, call again with `confirm: true`. Assert `get-timetable-proposal` returns it, and its lessons plus the fixed one give `findClashes`-free `get-timetable` after accept;
  4. accept, then assert coverage `short` is zero for every class, or each short class appears in the reasons; and the hand-placed lesson is unchanged;
  5. generate again; remove one lesson; accept → refused with the "changed" sentence;
  6. generate again; archive one proposed class (`update-class status archived`, if supported, else skip and note it); accept → refused;
  7. generate on a fresh term still showing the earlier timetable → refused;
  8. record `elapsedMs` in a finding note.
- [ ] **Step 2: Run** the journey. Expected: `checkGeneration` FAILS (actions missing).
- [ ] **Step 3: Implement** the migration, schema, `timetable-generation.ts`, the four actions and the policy entries.
- [ ] **Step 4: Run** the journey. Expected: 0 broken / 0 wrong / 0 missing. Restart the dev server via the preview tool if the migration needs it.
- [ ] **Step 5: Commit:** `feat(school): propose a term's timetable, and accept or discard it`

---

### Task 5: The proposal on the grid

**Files:**

- Create: `app/components/timetable/ProposalBar.tsx`
- Modify: `app/routes/admin.timetable.tsx`, `app/components/timetable/TimetableGrid.tsx`, `app/components/timetable/use-timetable.ts` (proposal query), `actions/view-screen.ts` (timetable branch: `proposal: { summary, reasons } | null`)

**Interfaces — Consumes:** the Task 4 actions.

- **Generate.** A "Generate" button beside the term picker (admin, editable term only). If `needsConfirm`, an `AlertDialog` lists the classes without a teacher ("Generate anyway?"), then calls with `confirm: true`. The button shows a pending state while generating; this is the one deliberate wait.
- **Proposal query.** `get-timetable-proposal` (GET) under the key `["timetable", termId, "proposal"]`, so existing invalidation refreshes it.
- **Grid.** Proposed lessons render in each view (arm, teacher, room) beside the real ones, with a dashed border (Tailwind `border-dashed`), not clickable. Doubles span as real doubles do: reuse `gridSpans` by giving proposed lessons a `pairId` from `pairKey`.
- **ProposalBar.** One line, "Proposal · N lessons · M not fitted", plus **Accept** (`AlertDialog` confirm) and **Discard**. "M not fitted" opens a `Popover` listing the reasons, notSet and noTeacher sentences. On accept or discard: a toast with the reply `message`, then invalidate `["timetable", termId]`.
- **Coverage** keeps reading accepted lessons only.

- [ ] **Step 1: Build.**
- [ ] **Step 2: Verify in the browser pane** as the newest sim school's admin, with the pane forced visible.
  - **Generate:** the dashed lessons appear in arm view and in teacher view, and the bar counts match the reply.
  - **Not fitted:** the popover lists the sentences.
  - **Discard:** the dashed lessons go.
  - **Generate and accept:** the lessons become normal, and the "N short" badge drops.
  - **No loop:** over 20s with the page visible, no repeating requests.
  - Quote DOM evidence.
- [ ] **Step 3:** tsc, prettier, journey.
- [ ] **Step 4: Commit:** `feat(school): preview a generated timetable on the grid, then accept or discard`

---

### Task 6: Words, guide and final checks

**Files:**

- Modify: `shared/timetable-coverage.ts` (`shortInWords` takes the school's double/doubles words), its callers (`server/lib/timetable-coverage.ts`, `app/routes/admin.timetable.tsx`), `actions/set-timetable-period.ts` (description: the double-anchoring rule), `AGENTS.md`

- **The school's word for a double:** `customLabels.double` (with the plural from the existing plural helper). It's read once per request on the server (`schoolWord`) and once per page on the client (the same source the arm word uses). It's used in shortfall sentences, the arm line and Task 3's `words`.
- **`set-timetable-period` description:** "Moving a double by either half places the double's first half at the target."
- **AGENTS.md:**
  - in A2c, generating (counts first; best after teachers are assigned; generate → read the summary → accept only when the admin says; explain each not-fitted reason and suggest what to change, changing nothing without asking);
  - the double-anchoring rule;
  - `customLabels.double` beside the other label keys;
  - actions-reference rows for the four new actions.

- [ ] **Step 1: Add the failing pure check:** `shortInWords(required, placed, { double: "bloc", doubles: "blocs" })` gives a sentence containing "bloc".
- [ ] **Step 2: Implement** the words change and the docs.
- [ ] **Step 3: Final checks:** `npx tsx test/timetable.check.ts` all PASS; `npx tsc --noEmit` clean; `COREPACK_ENABLE_STRICT=0 pnpm journey:school` 0 broken / 0 wrong / 0 missing (quote `elapsedMs`); `node ../../scripts/guard-no-unscoped-queries.mjs` flags none of this plan's files; `COREPACK_ENABLE_STRICT=0 pnpm journey:assumptions` shows no new hits in this plan's files.
- [ ] **Step 4: Commit:** `docs(school): the agent's guide to generating a timetable, in the school's words`
