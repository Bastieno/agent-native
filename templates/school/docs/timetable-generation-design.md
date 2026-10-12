# Timetable generation — design

Follows [timetable-design.md](./timetable-design.md). An admin who has set up
the school's week, rooms, arms, classes and lesson counts asks for a term's
timetable and gets a **proposal**: clash-free, meeting every lesson count it
can, explaining in plain words whatever it could not fit. They review it on the
grid and accept it, or discard it and adjust.

## Decisions taken

| Question                                                          | Answer                                                                                                                                                                             |
| ----------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| What it starts from                                               | Lessons already on the term's grid stay exactly where they are; the generator fills every remaining shortfall around them. Works on an empty term too                              |
| Where the result goes                                             | A proposal, previewed on the grid, saved only when the admin accepts it — all at once                                                                                              |
| Rules it never breaks                                             | The clash rules (teacher, room, arm, learner), lesson counts including doubles, doubles in two consecutive lesson periods with no break between, option blocks sharing their slots |
| Other hard rules (teacher availability, room needs, per-day caps) | Not in this version                                                                                                                                                                |
| Preferences                                                       | One: spread a class's lessons across different days. Best effort, never at the cost of a lesson count                                                                              |
| Option classes                                                    | Option classes drawing from the same arms are placed as a **block**, side by side in the same slots                                                                                |
| Scope of one run                                                  | The whole school, every arm, in one run                                                                                                                                            |
| Teachers not yet assigned                                         | Allowed, with a warning: their teacher clashes can't be avoided, and assigning teachers later may create some                                                                      |
| Who solves it                                                     | Deterministic code. The agent gathers counts, runs it, reads the summary back and explains shortfalls; it never places lessons itself                                              |

## Who can do what

- **Admin:** generate, accept, discard; sees the proposal on the grid.
- **Staff:** may read the open proposal (the agent answers "what was proposed?"
  for them); cannot generate or accept.
- **Learners and teachers in their own views** never see a proposal — only
  accepted lessons.

## How generation works

### Input

Built once per run from the same loader everything else uses
(`loadTimetable`), for one term:

- the school week (`schoolWeek`) — days, lesson periods and their order;
- every lesson already placed in the term — fixed, never moved;
- every active class of the term's academic year with its lesson counts
  (`periodsPerWeek`, `doublesPerWeek`), arm (whole-arm), option arms, teachers
  (primary + support), and room (class room, else the arm's home room, else
  none);
- the learners actively enrolled in each class (for learner clashes).

### Units

Each class's shortfall — required minus placed, computed by the existing
`countCoverage` rule — becomes **units** to place:

- a **double** unit covers two consecutive lesson periods
  (`doubleSecondPeriod`);
- a **single** unit covers one period.

Whole-arm and unattached classes produce their own units. **Option classes
drawing from exactly the same set of arms form one block.** A block's units are
placed together and reserve slots for the whole block:

- the block reserves as many **double slots** as the member needing the most
  doubles, and enough **single slots** that its total periods equal the member
  needing the most periods;
- each member then fills the block's slots: its doubles go into double slots;
  its singles go into single slots and, where it needs no double there, into
  either period of a double slot;
- any reserved period a member does not need is a free period for that member's
  learners.

So a block of members needing (5 periods, 1 double) and (3 periods, no double)
reserves one double slot and three single slots; the second member uses three of
those five periods.

Classes with no lesson counts produce no units and are listed as "not set".
Classes with counts already met produce none.

### The rules

**Never broken** (checked for every candidate slot with the existing
`findClashes`, against everything fixed plus everything placed so far):

- no teacher, room, arm or learner clash;
- a double sits in two consecutive lesson periods of the same day;
- block members share their slots.

**Preferred, best effort:**

- spread: a class's units on different days where it can; when it can't, as few
  per day as possible.

A class with **no teacher** never causes a teacher clash (existing rule), so it
places freely; this is why the run warns about it.

### The search

A pure module, `server/lib/timetable-generator.ts`, no database access:

1. **Order units, hardest first** — blocks, then doubles, then units of
   classes whose teachers or arms have the fewest free slots. Ties broken by
   class id, so the same input always gives the same output.
2. **Place each unit** in the best legal slot: legal by the rules; best by the
   spread preference, then earliest day, then earliest period.
3. **When a unit has no legal slot,** try a bounded repair: take back up to a
   small fixed number of earlier generated units that block it, place this
   one, re-place those. Never touch fixed lessons. If repair fails within its
   bound, record the unit as unplaced with the reason.
4. **Improve spread** with a short pass that moves generated units to
   less-crowded days when a legal move exists. Never unplaces anything.
5. **Stop at a time budget** (a named constant, a few seconds) and return the
   best result found.

Result: the proposed lessons (class, day, period, room, double pairing; no
lesson name — the admin adds names after accepting) and the unplaced units
with reasons.

### Explaining what did not fit

Each unplaced unit gets one reason, worked out from what blocked it, in plain
words with the school's own names:

- the class's arm (or block's arms) had no free slot left that day/week;
- its teacher is teaching in every slot the arm has free (naming the teacher
  and, where it helps, the days);
- no two consecutive lesson periods were free together (doubles);
- the block's members' teachers are never free at the same time as its arms;
- its room is in use in every slot that is otherwise free.

Plus: classes with **no lesson counts** ("not set, so not generated") and
classes with **no teacher yet** ("placed without a teacher; clashes may appear
when one is assigned").

Every sentence is composed from data; no subject, day or school words in code.
Day names through `schoolWeekdayName`; the school's words for arm, year group
and stream through `schoolWord`.

## The proposal

### Data (additive migration, version 89)

`timetable_proposals`: `id`, `school_id`, `term_id`, `created_by_user_id`,
`created_at`, `base_fingerprint` (a hash of the term's own rows when the
proposal was made), `lessons_json` (proposed lessons), `unplaced_json`
(unplaced units with their reasons), `summary_json` (counts and lists for the
summary), `status` (`open` / `accepted` / `discarded`), ownable columns.
At most one `open` proposal per term; generating again discards the old one.

### Actions (each in `server/lib/action-policy.ts`)

| Action                       | Audience         | What it does                                                                                                                                                                                                                                                                                                                                                                 |
| ---------------------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `generate-timetable`         | ADMIN            | `{ termId, confirm? }`. Refuses in words when the school has no week, when no class has lesson counts, or when the term is still showing the earlier timetable (copy it in first — the existing rule). When classes have no teacher, previews the warning and the count unless `confirm: true`. Otherwise builds and stores the proposal and replies with a summary in words |
| `get-timetable-proposal`     | STAFF, read-only | The open proposal for a term, or none                                                                                                                                                                                                                                                                                                                                        |
| `accept-timetable-proposal`  | ADMIN            | `{ proposalId }`. Refuses if the term's rows no longer match `base_fingerprint` ("the timetable changed after this was proposed — generate again"). Otherwise writes every proposed lesson in **one** insert (doubles as pairs with fresh pair ids), marks the proposal accepted, replies with what was added                                                                |
| `discard-timetable-proposal` | ADMIN            | `{ proposalId }`                                                                                                                                                                                                                                                                                                                                                             |

`get-timetable` is unchanged; the grid fetches the proposal separately.

### On the grid

- **Generate** beside the term picker (admin). Opens a short confirm with the
  no-teacher warning when it applies.
- While a proposal is open: proposed lessons appear in a distinct dashed style
  beside the real ones, in arm, teacher and room views. A slim bar: "Proposal ·
  N lessons · M not fitted", with **Accept** (asks to confirm) and **Discard**;
  "not fitted" opens the list of reasons.
- Proposed lessons are not editable one by one. Accept, then adjust with the
  normal tools — or discard, change something (a count, a teacher, a hand
  placement), and generate again.
- Coverage and the "N short" badge read accepted lessons only; the bar shows
  what the proposal would add.
- `view-screen` (timetable) carries the open proposal's summary and unplaced
  reasons, so the agent sees what the admin sees.

## Agent guide

`AGENTS.md` gains, in A2c: generating comes after lesson counts, and is best
after teachers are assigned; run `generate-timetable`, read the summary back;
accept only when the admin says so; explain each unplaced unit from its reason
and suggest what the school could change (split a double into singles, give a
class a second teacher, free a period by moving a hand-placed lesson) —
changing nothing without asking. Actions reference gains the four actions.

## Also in this piece

- **The school's word for a double.** Shortfall wording ("0 of 1 double") and
  the arm line use `schoolWord(orgId, "double", …)` with a plural, so a school
  that says something else is honoured. Document `customLabels.double` with the
  other label keys.
- **Document the double-anchoring rule.** Moving a double by its second half
  places the double's first half at the target; say so in
  `set-timetable-period`'s description and in AGENTS.md.

## Testing

**Pure checks** (`test/timetable.check.ts`) on small built-up schools:

- a feasible school is fully placed with zero clashes (verified by
  `findClashes`);
- fixed lessons are never moved or removed;
- a double is never placed across a break or a non-lesson period;
- an option block's members share every slot;
- spread: five singles go on five days when five are free;
- an infeasible case returns the expected unplaced unit and reason;
- the same input twice gives byte-identical output;
- a class with no teacher is placed and listed.

**Simulation** (`test/sim/timetable.ts`, timetable phase, in a fresh term):
set lesson counts for the JSS1 arms; generate; assert zero clashes, counts met
or explained, existing lessons untouched; accept → rows written, coverage full;
generate, then edit a lesson, then accept → refused; generate on a term still
showing the earlier timetable → refused; time the run and record it.

`npx tsc --noEmit` clean; `npx prettier --write` on touched files; the
unscoped-queries guard flags none of the touched files.

## Not in this piece

- Teacher availability, room needs, per-day caps, other preferences.
- Generating part of the school (selected year groups).
- Placeholder teachers for posts not yet filled.
- Two-week rotations.
- Editing a proposal lesson by lesson before accepting.
