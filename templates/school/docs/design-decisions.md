# School Template — Design Decisions & Architecture Notes

This document captures key architectural decisions, identified gaps, and planned work discussed
during development sessions. Use it as a reference when revisiting open questions.

---

## Agent Strategy: Agent-First with Haiku

**Decision**: Keep the application fully agent-first. Do not add UI forms to replace agent
workflows. Instead, optimize the agent to be cheap and fast enough that users prefer it.

**Rationale**:

- The agent already uses `claude-haiku-4-5` — the cheapest Anthropic model (~8× cheaper than
  Sonnet, ~30× cheaper than Opus)
- A typical agent turn costs $0.001–0.003 (1,000–3,000 tokens total)
- The real cost driver was unnecessary `view-screen` calls at the start of every turn — fixed by
  pre-injecting navigation context via `extraContext` in `agent-chat.ts`

**Model configuration**:

- `model: "claude-haiku-4-5"` in `server/plugins/agent-chat.ts` — unversioned alias so it
  auto-tracks the latest Haiku without code changes when new versions ship
- This is a **default**, not a hard lock. Users can override it via the chat UI model picker
  (stored in `agent-engine` setting). Resolution order: user setting → env → app secrets →
  plugin default
- **Exception**: curriculum co-authoring, differentiated assessment writing, bulk grading, and
  narrative report card generation all benefit significantly from Sonnet or Opus. Consider
  prompting users to switch models before starting these workflows

**Destructive actions (suspend, remove staff)**:

- These no longer show AlertDialogs in the UI
- Clicking "Suspend" or "Remove" in the staff `⋯` menu calls `sendToAgentChat` — the agent opens,
  sees the request with the userId in context, and asks the admin to confirm before executing
- This keeps the agent as the confirmation gate without extra UI cost

**Dynamic suggestions**:

- `app/lib/school-suggestions.ts` generates contextual chips per role/view
- Every view has a "What can you help me with here?" discovery chip as a fallback
- Teacher assessment view shows variant-specific suggestions when a variant is active
- Student assessment view differentiates based on whether a submission exists

---

## Navigation Context Pre-Injection

**Problem**: The agent was calling `view-screen` on every turn to learn the user's role and
current view — wasting 1–2 tool round trips before doing any real work.

**Fix**: `extraContext` in `server/plugins/agent-chat.ts` reads the `navigation` app-state key
on every request and injects a `<current-screen>` block into the system prompt:

```xml
<current-screen>
role: teacher
view: class
classId: cls-abc123
className: JSS3 Mathematics
</current-screen>
```

**Result**: The agent already knows role, view, and active entity IDs before the first token. It
only needs to call `view-screen` when it wants a full data snapshot (entity details, live content,
submission drafts).

**Where this lives**: `server/plugins/agent-chat.ts` — `extraContext` option, reads via
`readAppState("navigation")` which works because `runCtx.owner` is set before `extraContext` runs.

---

## Curriculum System Architecture

### Data model layers

```text
Academic Year (e.g. "2025-2026")
  └── Terms (Term 1, Term 2, Term 3) — startDate, endDate, sequence
       └── (linked to classes)

Subjects (Mathematics, Biology, English)
  └── Units — linked to subjectId + gradeLevelId + optional termId
       ├── weekStart / weekEnd  (integer week numbers within the term)
       ├── sequence             (ordering)
       ├── standardsJson        (array of { framework, code, description })
       └── Learning Objectives  (with Bloom's taxonomy level)

Classes (Subject × GradeLevel × AcademicYear × optional Term)
  └── Class Schedules — day_of_week + start_time + end_time + period_number
  └── Lesson Notes — linked to classId + unitId, optional lessonDate
       └── Resources (files, URLs)
       └── Assessments → Variants → Submissions → Grades
```

### Curriculum co-authoring flow

1. `start-curriculum-draft` — creates a `curriculum_drafts` SQL row + `curriculum-draft-{id}`
   app-state key for the live workspace UI
2. Agent accumulates subjects/units/objectives across multiple turns via
   `update-curriculum-draft --id {id} --stateJson {...}`
3. `commit-curriculum-draft --id {id}` — materializes the draft JSON into real `subjects`,
   `units`, and `learning_objectives` rows

The draft `stateJson` structure expected by `commit-curriculum-draft`:

```json
{
  "subjects": [
    {
      "name": "Mathematics",
      "code": "MATH",
      "gradeLevels": [
        {
          "gradeLevelId": "...",
          "units": [
            {
              "title": "Algebra: Linear Equations",
              "termId": "...",
              "weekStart": 3,
              "weekEnd": 6,
              "sequence": 1,
              "standards": [
                { "framework": "Common Core", "code": "8.EE.C.7", "description": "Solve linear equations" },
                { "framework": "WAEC", "code": "MATH-ALG-2.1", "description": "Linear equations" }
              ],
              "objectives": [
                { "description": "Solve linear equations in one variable", "bloomsLevel": "apply" }
              ]
            }
          ]
        }
      ]
    }
  ]
}
```

### Making curriculum co-authoring effective for a Nigerian school adopting US curriculum

Before starting any curriculum draft, the admin should update `SCHOOL_GUIDE.md` with:

- School location and regulatory context ("Lagos-based, WAEC/NECO for certification")
- Grade structure ("JSS1–3 and SSS1–3; JSS3 ≈ US Grade 8, SSS3 ≈ US Grade 12")
- Which US framework is being adopted ("Common Core Mathematics, NGSS for Sciences")
- Term structure ("3 terms per year, ~13 weeks each")
- Any exam-board specific requirements ("All SSS3 assessments must cover WAEC Paper 1 objectives")

With this in `SCHOOL_GUIDE.md`, the agent reads it at the start of curriculum sessions and can:

- Ask targeted clarifying questions per subject area
- Map Nigerian grade levels to US standards correctly
- Dual-align units to both WAEC and Common Core simultaneously
- Flag units that are exam-critical

**Important**: Use **Sonnet or Opus** for curriculum co-authoring. Haiku lacks the reasoning
depth for writing pedagogically sound, differentiated curriculum content across multiple subjects
and grade levels. Switch the model in the chat UI before starting a curriculum session.

---

## Standards Alignment

Standards alignment tags each curriculum unit with official reference codes from a recognized
educational framework (Common Core, WAEC, NECO, IGCSE, NERDC, NGSS, etc.).

**Schema**: `standardsJson TEXT` on the `units` table — JSON array:

```json
[
  { "framework": "Common Core", "code": "8.EE.C.7", "description": "Solve linear equations in one variable" },
  { "framework": "WAEC", "code": "MATH-ALG-2.1", "description": "Linear equations and inequalities" }
]
```

### What the agent actually knows — honest assessment

The agent's standards knowledge comes entirely from its training data. Reliability varies by framework:

| Framework | Agent reliability | Notes |
| --- | --- | --- |
| Common Core (US Math/ELA) | High | Widely published online; Sonnet/Opus know specific codes accurately |
| NGSS (US Science) | Medium-high | Well-documented publicly |
| Cambridge IGCSE | Medium-high | Cambridge publishes syllabuses publicly |
| WAEC / NECO | Medium on topics; low on codes | Agent knows general exam structure and topic areas, but specific internal code numbering (e.g. `MATH-ALG-2.1`) is unreliable — those codes in this doc were illustrative, not real WAEC codes |
| NERDC (Nigerian national) | Low | Limited internet coverage; changes periodically |

### What works today (with `standardsJson` implemented)

- During curriculum co-authoring the agent can suggest Common Core-aligned objectives per unit,
  drawing on its solid training knowledge of that framework
- When a lesson note or assessment is created for a unit, the agent reads the unit's stored
  `standardsJson` and references those objectives in the content — reliable because the data
  is right there in the database
- The agent can dual-align units to two frameworks simultaneously during co-authoring, writing
  standards tags for both — useful quality for Common Core + WAEC topic areas

### What does NOT work today

These use cases require a canonical list of all objectives stored somewhere. Without that list,
the agent has nothing to count against or compare to:

- "We've taught 14 of 22 WAEC Algebra objectives this term" — there is no list of all 22
- "Which Common Core standards haven't been covered in Grade 8?" — no master list in the DB
- "Which units prepare students for WAEC Paper 1 Section 3?" — works approximately via agent
  reasoning, not via a reliable SQL query

### The path to making those use cases work

**Option A — Standards library tables** (reliable, permanent; see "Future Work" section below).
Requires sourcing and importing actual syllabus data. Common Core can be done immediately —
freely available as structured JSON. WAEC/NECO requires parsing their published PDFs.

#### What the library looks like

Two tables:

```sql
CREATE TABLE curriculum_frameworks (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,       -- "Common Core", "WAEC", "Cambridge IGCSE"
  subject TEXT,             -- "Mathematics", NULL for cross-subject
  grade_range TEXT,         -- "Grade 6-8", "SSS1-3"
  version TEXT,             -- "2010", "2024-2025 syllabus"
  source_url TEXT,          -- where the data was sourced
  org_id TEXT               -- NULL = built-in, orgId = school-custom
);

CREATE TABLE framework_objectives (
  id TEXT PRIMARY KEY,
  framework_id TEXT NOT NULL REFERENCES curriculum_frameworks(id),
  code TEXT NOT NULL,       -- "8.EE.C.7", "ALG-2.1"
  strand TEXT,              -- "Algebra", "Number and Numeration"
  sub_strand TEXT,
  description TEXT NOT NULL,
  grade_level TEXT,
  sequence INTEGER
);
```

#### Where the data comes from

- **Common Core** — free structured JSON at `corestandards.org`. Can be seeded today with a
  one-time import script. Covers ~500 Math + ELA standards.
- **Cambridge IGCSE** — published as PDFs (e.g. syllabus 0580 for Mathematics). Requires
  PDF parsing + manual structuring before import.
- **WAEC / NECO** — official syllabuses published on their websites as PDFs. Extract the
  topic/objective list, assign short codes, import. Most valuable for Nigerian schools but
  requires the most preparation work.

#### What SQL queries become possible after seeding

```sql
-- Which Common Core Grade 8 Algebra objectives haven't been taught this term?
SELECT fo.code, fo.description
FROM framework_objectives fo
JOIN curriculum_frameworks cf ON fo.framework_id = cf.id
WHERE cf.name = 'Common Core'
  AND fo.grade_level = 'Grade 8'
  AND fo.strand = 'Algebra'
  AND fo.code NOT IN (
    SELECT json_extract(value, '$.code')
    FROM units, json_each(units.standards_json)
    WHERE units.term_id = 'term-xyz'
  );
```

The agent can then answer reliably:

- "We've covered 14 of 22 WAEC Algebra objectives this term — here are the 8 remaining"
- "This assessment covers 4 Common Core standards; 2 haven't appeared in any lesson note yet"
- "Grade 8 is strong on linear equations but hasn't touched `8.EE.C.8` (systems of equations)
  — that's on the exam syllabus"

#### Practical path for a Nigerian school

1. **Seed Common Core first** — free JSON, immediate. Works for Math + ELA.
2. **Use SCHOOL_GUIDE.md for WAEC in the interim** — paste relevant topic areas from the
   WAEC PDF syllabus directly into the School Guide. The agent reads this every session and
   can use it as a reference for writing aligned content and noticing gaps.
3. **Seed WAEC later** — once the school decides which papers matter (e.g. WAEC Mathematics
   Paper 1 for SSS3), parse that syllabus section and import it. Full coverage tracking
   becomes possible at that point.

**Option B — SCHOOL_GUIDE.md as the standards reference** (practical shortcut, works now).
The admin pastes the relevant syllabus sections directly into SCHOOL_GUIDE.md. For example:

```markdown
## WAEC Mathematics Objectives (Paper 1: Algebra)
- ALG-1: Number and Numeration
- ALG-2: Algebraic Processes
  - ALG-2.1: Linear equations in one variable
  - ALG-2.2: Simultaneous linear equations
  - ALG-2.3: Quadratic equations
```

The agent reads this at the start of curriculum sessions and uses it as its reference. This
does not enable SQL count queries but does enable the agent to write accurately aligned content
and notice gaps during conversation. For WAEC/NECO specifically, this is the recommended
approach until the standards library is built.

---

## Class Scheduling (Timetable)

**Schema**: `class_schedules` table — `class_id`, `day_of_week` (1=Mon–7=Sun), `period_number`,
`start_time` (HH:MM), `end_time` (HH:MM), `room`.

**Actions**:

- `create-class-schedule` — add a recurring weekly slot to a class
- `get-my-schedule` — returns today's (or a given date's) ordered schedule for the teacher,
  with each slot indicating whether a lesson note has been prepared for that date

**`view-screen` on the teacher dashboard** also includes `todaySchedule` — a pre-fetched
snapshot of the same data so the agent doesn't need to call `get-my-schedule` if it already
called `view-screen`.

---

## SCHOOL_GUIDE.md

`SCHOOL_GUIDE.md` is an org-scoped markdown resource the agent reads at the start of curriculum,
grading, and analytics sessions. It is the primary way schools teach the agent about their
specific context.

**How it is updated**:

- **Admin UI**: Settings → "School Guide" tab — markdown textarea with Save button
- **Agent**: Tell the agent to update it ("Update the school guide to note we use WAEC for SSS")
  — the agent calls `update-school-resource` which writes via `resourcePut(SHARED_OWNER, ...)`
- **Read**: `get-school-resource` action or `GET /api/school/guide`

**What to include**:

- School name, location, type
- Grade structure and mapping to international equivalents
- Term structure and exam schedule
- Curriculum frameworks and exam boards
- Grading conventions and pass marks
- School-specific terminology

---

## Open Questions / Future Considerations

- **Timetable grid UI**: A weekly Mon–Fri × periods grid for the teacher dashboard. The data
  model and actions exist — this is a UI-only addition.

- **Timetable conflict detection**: Check that a teacher is not double-booked when creating
  a new schedule slot.

- **Standards library**: A built-in table of Common Core, WAEC, NECO, IGCSE codes so the agent
  can look them up rather than relying on training data. See "WAEC Syllabus Pipeline" section
  below for the full implementation plan.

- **Term-aware lesson planning**: Lesson-to-term is currently indirect (lesson → unit → optional
  term). Consider adding `termId` directly to `lesson_notes` for clearer queries.

- **Exam results**: `generate-report-card` exists but there is no concept of external exam
  scores (WAEC/NECO results) separate from internal assessment grades. Schools that want to
  track both need an `exam_results` table.

- **Parent portal**: No parent-facing role exists yet. Parents may want to view their child's
  grades, attendance, and announcements without a full student login.

---

## Standards Library Pipeline (Completed)

The standards library is **fully seeded** in the database. This section documents how it was
built for reference if new frameworks need to be added.

### What was seeded

| Framework | Stage | Subjects | Objectives | Source |
| --- | --- | --- | --- | --- |
| WAEC | SS1–SS3 | 61 | ~3,000+ | Official WAEC PDFs |
| NERDC | JSS1–JSS3 | 22 | ~430 | Official NERDC PDFs |

All objectives live in `curriculum_frameworks` + `framework_objectives`. `orgId = null` means
available to all schools (global reference data, not per-school). `grade_level` spans the full
cycle (`"SS1-SS3"` or `"JSS1-JSS3"`) — WAEC and BECE are terminal exams that test everything
from three years in one sitting. The school decides when to teach each objective; the library
just provides the canonical list to align against.

### How the data was sourced

The original plan was an HTML web-scraper + Claude API pipeline. That approach was **abandoned**
in favour of Co-work (Claude's PDF-native subscription tool), which is zero API-credit cost:

1. **Download PDFs** — official syllabuses downloaded from WAEC/NERDC as PDFs via Co-work.
2. **Parse PDFs via Co-work** — Co-work reads PDFs natively (no API credits). A structured
   prompt instructed it to output JSON per subject with strands/subStrands/objectives and
   assign short codes: `{SUBJECT_CODE}-{STRAND_ABBREV}-{NUMBER}` (e.g. `MATH-ALG-1`).
3. **Seed into the database** — `pnpm action seed-waec` / `pnpm action seed-nerdc` reads the
   parsed JSON from `scripts/waec/parsed/` or `scripts/nerdc/parsed/` and inserts rows.
   Both actions are idempotent (skip already-seeded subjects).

The 61 WAEC JSON files live in `scripts/waec/parsed/`. The 22 NERDC JSON files live in
`scripts/nerdc/parsed/`. Both are committed to git so any fresh clone can reseed with one command.

### Adding a new framework (e.g. Cambridge IGCSE)

1. Download the official PDF syllabuses.
2. Use Co-work (or Claude API) to parse into the same JSON shape:

```json
{
  "found": true,
  "subject": "Mathematics",
  "subjectCode": "MATH",
  "framework": "Cambridge IGCSE",
  "gradeRange": "Grade 9-10",
  "strands": [
    {
      "name": "Algebra",
      "abbreviation": "ALG",
      "subStrands": [
        {
          "name": "Linear Equations",
          "objectives": [
            { "code": "MATH-ALG-1", "description": "Solve linear equations in one variable" }
          ]
        }
      ]
    }
  ]
}
```

1. Save to `scripts/cambridge/parsed/{slug}.json`.
2. Create `actions/seed-cambridge.ts` — copy `seed-waec.ts`, change `PARSED_DIR` to
   `../scripts/cambridge/parsed`.
3. Run `pnpm action seed-cambridge`.
4. The `list-framework-objectives` action works immediately with no changes.

---

## WAEC Curriculum Creation Workflow (Nigerian SSS)

### The 9-term pacing model

Based on how Nigerian schools structure SSS instruction, the WAEC syllabus is distributed
across 9 terms (3 years × 3 terms). SS3 Term 3 is exam sitting only — no instruction. This
pacing should be recorded in `SCHOOL_GUIDE.md` so the agent applies it automatically:

```markdown
## WAEC Curriculum Pacing

9-term structure across SS1–SS3. Distribute WAEC objectives in this proportion.
Never assign new objectives to SS3 Term 2 or SS3 Term 3.

| Term | Grade | Focus                          | New syllabus coverage |
| ---- | ----- | ------------------------------ | --------------------- |
| 1    | SS1   | Foundational basics            | ~10%                  |
| 2    | SS1   | Core concepts phase 1          | ~15%                  |
| 3    | SS1   | Intermediate concepts          | ~15%                  |
| 4    | SS2   | Advanced core (heaviest term)  | ~20%                  |
| 5    | SS2   | Practical & deep theory        | ~15%                  |
| 6    | SS2   | High-weight exam topics        | ~15%                  |
| 7    | SS3   | Syllabus wrap-up (last 10%)    | ~10%                  |
| 8    | SS3   | Mock exams & past questions    | 0% new topics         |
| 9    | SS3   | WASSCE examinations            | No classes            |

SS3 Term 2 units are revision units referencing previously taught objectives.
SS3 Term 3 has no curriculum units at all.
```

### Prerequisites before curriculum co-authoring

1. Academic Year created (`create-academic-year`)
2. All 9 terms created (`create-term`) with correct `startDate`, `endDate`, `sequence`
3. Grade levels created for SS1, SS2, SS3 (`manage-grade-levels`)
4. SCHOOL_GUIDE.md updated with the pacing table above
5. WAEC objectives seeded into `framework_objectives` (or SCHOOL_GUIDE.md used as interim)

### Curriculum co-authoring session flow

```text
Admin: "Create the Mathematics curriculum for SS1 through SS3 using the WAEC syllabus"

Agent:
1. Reads SCHOOL_GUIDE.md → knows the 9-term pacing
2. Calls list-framework-objectives --framework "WAEC" --subject "Mathematics"
   → ~120 objectives across strands
3. Groups into units respecting:
   - Natural learning sequence (arithmetic before algebra, algebra before calculus)
   - Pacing percentages per term
   - Strand coherence (keep related objectives in the same unit)
4. For SS3 Term 2: creates "Revision" units pointing back to the highest-weight objectives
5. Skips SS3 Term 3 entirely
6. Builds stateJson for the curriculum draft
7. Shows the tree in curriculum workspace UI for admin review

Admin adjusts ("move statistics to SS2 Term 2", "split this geometry unit")
→ agent calls update-curriculum-draft tool with revised stateJson
→ admin confirms
→ agent calls commit-curriculum-draft tool → materialises units + objectives into DB
```

### What the agent produces per unit

Each committed unit has:

- `termId` — links to the specific term (SS1 Term 1, SS2 Term 2, etc.)
- `weekStart` / `weekEnd` — which weeks within that term
- `standardsJson` — the WAEC objective codes this unit covers
- `learning_objectives` rows — Bloom's-level teaching objectives derived from the WAEC objectives

When a teacher creates a lesson note for a unit, the agent reads `standardsJson` and aligns
the lesson content to those exact WAEC objectives automatically.

### SS3 Term 2 revision units

These are not empty — they are deliberately structured revision:

- Point back to the highest-weight WAEC objectives across all years
- Lesson notes attached to them are past-question walkthroughs, exam technique guides,
  topic summaries
- The agent recognises the revision context and writes differently (practice-focused, not
  new-concept-introduction)

Consider adding `unitType: "revision" | "teaching"` to the `units` table schema to make
this distinction explicit in queries.

### End-to-end verification checklist

After completing this workflow for one subject, confirm:

- [ ] All 9 terms exist in DB with correct dates
- [ ] SS1, SS2, SS3 grade levels exist and are linked to the academic year
- [ ] `framework_objectives` has WAEC Mathematics rows (or SCHOOL_GUIDE.md has the syllabus)
- [ ] SCHOOL_GUIDE.md includes the 9-term pacing table
- [ ] Curriculum draft committed — units appear in `units` table with `termId` and `standardsJson`
- [ ] SS3 Term 2 units are revision type (no `standardsJson` pointing to new objectives)
- [ ] SS3 Term 3 has zero curriculum units
- [ ] Teacher can open a class, see units per term, create lesson notes aligned to WAEC objectives
- [ ] Agent can answer: "Which WAEC objectives haven't been covered in SS2 this term?"

---

## Implementation Log

| Session | What was built | Key files |
|---|---|---|
| 1 | SSR setup (React Router v7 + Nitro) | `ssr-entry.ts`, `vite.config.ts` |
| 2 | Auth flow, staff invite auto-activation, portal polish | Multiple |
| 3 | G1–G10 gap fixes: progress names, layout guards, reactivate actions, analytics, announcements, student IDs | `get-my-progress.ts`, `teacher.tsx`, `student.tsx`, `reactivate-staff.ts`, `reactivate-student.ts`, `school.ts`, `admin.announcements.tsx`, `view-screen.ts` |
| 4 | Agent-first optimizations: pre-injected nav context, improved suggestions, sendToAgentChat for destructive actions, unversioned model alias | `agent-chat.ts`, `school-suggestions.ts`, `admin.staff.tsx`, `AGENTS.md` |
| 5 | Fixed update-school-resource, added get-school-resource, class_schedules schema (migrations v30–v31), standardsJson on units, create-class-schedule, get-my-schedule, School Guide tab in settings, todaySchedule in view-screen, standards in commit-curriculum-draft, design doc | `update-school-resource.ts`, `get-school-resource.ts`, `create-class-schedule.ts`, `get-my-schedule.ts`, `schema.ts`, `db.ts`, `admin.settings.tsx`, `view-screen.ts`, `commit-curriculum-draft.ts`, `AGENTS.md`, `docs/design-decisions.md` |
