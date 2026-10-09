# Curriculum Co-Authoring Guide

Step-by-step walkthrough for creating a full subject curriculum using the agent and the
built-in WAEC / NERDC standards library.

---

## Prerequisites

These must exist in the database before starting a curriculum session. Run each command
from `templates/school/` as the admin user.

### 1. School identity

```bash
pnpm action setup-school --name "Sebande Schools" --type secondary
```

Verify: `pnpm action get-school`

### 2. Grade levels

For a full JSS + SSS school:

```bash
pnpm action manage-grade-levels --levels '[
  {"name":"JSS 1","sequence":1},
  {"name":"JSS 2","sequence":2},
  {"name":"JSS 3","sequence":3},
  {"name":"SS 1","sequence":4},
  {"name":"SS 2","sequence":5},
  {"name":"SS 3","sequence":6}
]'
```

Verify: `pnpm action manage-grade-levels` (no args lists current levels)

### 3. Academic year

```bash
pnpm action create-academic-year \
  --name "2025–2026" \
  --startDate "2025-09-01" \
  --endDate "2026-07-31"
```

Save the returned `id` — you need it for every term below.

### 4. Terms (9 per stage, or create one year at a time)

Create 3 terms for the current academic year. Repeat for each of the 3 years in the cycle.
Below is a single-year example for SS1 (adjust dates and names per year):

```bash
# SS1 Term 1
pnpm action create-term \
  --academicYearId <yearId> \
  --name "SS1 Term 1" \
  --startDate "2025-09-08" \
  --endDate "2025-12-12" \
  --sequence 1

# SS1 Term 2
pnpm action create-term \
  --academicYearId <yearId> \
  --name "SS1 Term 2" \
  --startDate "2026-01-12" \
  --endDate "2026-04-03" \
  --sequence 2

# SS1 Term 3
pnpm action create-term \
  --academicYearId <yearId> \
  --name "SS1 Term 3" \
  --startDate "2026-04-27" \
  --endDate "2026-07-18" \
  --sequence 3
```

For a full 9-term SS curriculum, create a second academic year for SS2 and a third for SS3,
each with 3 terms. Note: SS3 Term 3 gets no curriculum units (WASSCE exam sitting only).

Verify: `pnpm action list-terms --academicYearId <yearId>`

### 5. Save SCHOOL_GUIDE.md to the database

The agent reads `SCHOOL_GUIDE.md` from the database at the start of every curriculum session —
not from the file system. Copy the template and save it:

```bash
pnpm action update-school-resource --content "$(cat docs/SCHOOL_GUIDE.md)"
```

Verify the agent can read it: `pnpm action get-school-resource`

### 6. Create the subject (if it doesn't exist yet)

```bash
pnpm action create-subject \
  --name "Mathematics" \
  --code "MATH" \
  --color "#2563eb"
```

Verify: `pnpm action list-subjects`

---

## Running a Curriculum Co-Authoring Session

With prerequisites complete, open the agent chat as the admin user and switch the model
to **Sonnet or Opus** before starting. Haiku lacks the reasoning depth for multi-subject
curriculum distribution across 9 terms.

### Step 1 — Start the draft

Tell the agent:

> "Create the Mathematics curriculum for SS1 through SS3 using the WAEC syllabus."

The agent will:

1. Read `SCHOOL_GUIDE.md` to learn the 9-term WAEC pacing
2. Call `list-framework-objectives --framework "WAEC" --subject "Mathematics"` (~98 objectives)
3. Start a curriculum draft: `start-curriculum-draft --sessionTitle "Mathematics SS1–SS3"`
4. Navigate to the curriculum workspace: `navigate --view=curriculum-setup --curriculumDraftId=<id>`

You will see the workspace UI open in the browser.

### Step 2 — Agent distributes objectives

The agent works through all 98 WAEC Mathematics objectives and assigns them to units across
9 terms following the pacing percentages in `SCHOOL_GUIDE.md`:

| Terms | Coverage |
| --- | --- |
| SS1 T1–T3 | ~40% of objectives (foundational through intermediate) |
| SS2 T1–T3 | ~50% of objectives (advanced, heavy exam topics) |
| SS3 T1 | ~10% of objectives (syllabus wrap-up) |
| SS3 T2 | Revision units only (no new objectives) |
| SS3 T3 | No units |

Each unit gets:

- A descriptive title (e.g. "Algebra: Linear and Simultaneous Equations")
- `termId` pointing to the correct term
- `weekStart` / `weekEnd` within that term
- `standardsJson` with the WAEC objective codes (e.g. `MATH-ALG-1`, `MATH-ALG-2`)
- 3–5 Bloom's-taxonomy learning objectives

The agent calls `update-curriculum-draft` after each batch to persist the state. The
workspace UI updates in real time via polling.

### Step 3 — Review and adjust

While the agent works, watch the curriculum tree appear in the browser. When it's done,
review the distribution. Common adjustments:

- "Move Statistics to SS2 Term 2 — it's too advanced for SS1"
- "Split the Geometry unit — it's covering too many weeks"
- "The Vectors unit should come before Matrices"

The agent calls `update-curriculum-draft` again with your adjustments. The workspace
reflects the change within 2 seconds.

### Step 4 — Commit

When you are happy with the tree:

> "Looks good — commit this curriculum."

The agent calls `commit-curriculum-draft --id <draftId>`. This materialises:

- `subjects` row for Mathematics (if it didn't already exist)
- `units` rows — one per unit, each with `termId`, `weekStart`, `weekEnd`, `standardsJson`
- `learning_objectives` rows — one per Bloom's objective, linked to the unit

Verify: `pnpm action list-units --subjectId <mathId>`

---

## JSS Curriculum (NERDC)

Identical flow, different framework. Tell the agent:

> "Create the Mathematics curriculum for JSS1 through JSS3 using the NERDC syllabus."

The agent calls `list-framework-objectives --framework "NERDC" --subject "Mathematics"`
(23 objectives) and applies the JSS 9-term pacing from `SCHOOL_GUIDE.md`:

- JSS3 Term 2 → revision units (BECE mock prep)
- JSS3 Term 3 → no units (BECE exam sitting)

---

## Doing Multiple Subjects

Run a separate curriculum session per subject. Each session is an independent draft.
You can run them sequentially in one conversation:

> "Now create the Biology curriculum for SS1–SS3."

The agent starts a new draft. Previous subjects' committed data is untouched.

Recommended order for a Nigerian secondary school:

**Core first (all grades need these):**
Mathematics → English Studies/Language → Intermediate Science/Biology → Chemistry → Physics

**Then electives:**
Economics → Government → Geography → Literature → Further Mathematics → etc.

---

## After Committing — Next Steps

Once units exist in the database:

1. **Create classes**: `create-class --subjectId <id> --gradeLevelId <id> --academicYearId <id> --name "SS1A Mathematics"`
2. **Enroll students**: `bulk-enroll-students --classId <id> --studentUserIds '[...]'`
3. **Assign teachers**: `add-teacher-to-class --classId <id> --teacherUserId <id> --role primary`
4. **Create timetable**: `create-class-schedule --classId <id> --dayOfWeek 1 --startTime "08:00" --endTime "08:45"`
5. **Teacher creates lesson notes**: Navigate to class → Lessons tab → agent drafts lesson aligned to the unit's `standardsJson`

---

## Resetting a Subject

If you want to redo a subject's curriculum:

1. Delete the existing units via `db-query` (admin-only escape hatch):

```bash
pnpm action db-query --sql "DELETE FROM units WHERE subject_id = '<subjectId>'"
```

2. Start a new curriculum draft for that subject.

Do **not** delete `curriculum_frameworks` or `framework_objectives` rows — those are the
global standards library and are shared across all subjects.

---

## Verification Checklist

After completing one subject end-to-end:

- [ ] Grade levels exist in DB
- [ ] Academic years and 9 terms created with correct dates
- [ ] `SCHOOL_GUIDE.md` saved to DB (not just on filesystem)
- [ ] Framework objectives visible: `pnpm action list-framework-objectives --framework "WAEC" --subject "Mathematics"`
- [ ] Units committed: `pnpm action list-units --subjectId <id>` returns rows with `standardsJson`
- [ ] SS3 Term 2 units have `unitType` or title indicating revision (no new WAEC codes)
- [ ] SS3 Term 3 has zero units
- [ ] Teacher can open a class → see units per term → create a lesson note aligned to WAEC objectives
- [ ] Agent can answer: "Which WAEC objectives haven't been covered in SS1 this term?"
