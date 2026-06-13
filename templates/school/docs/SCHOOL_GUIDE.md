# School Guide

This document teaches the agent about your school's specific context. The agent reads it at the
start of curriculum, grading, analytics, and lesson-planning sessions. Keep it updated as your
school's structure evolves.

**How to update**: Settings → School Guide tab → edit and save. Or tell the agent: "Update the
school guide to note …"

---

## School Profile

- **Name**: [Your School Name]
- **Location**: [City, State, Nigeria]
- **Type**: Secondary school (JSS + SSS)
- **Regulatory body**: WAEC (West African Examinations Council) for SSS terminal exams; NECO as
  alternative. Internal assessments follow school grading policy.

---

## Grade Structure

| School stage | Nigerian label | Approx. US equivalent |
|---|---|---|
| Junior Secondary 1 | JSS 1 | Grade 7 |
| Junior Secondary 2 | JSS 2 | Grade 8 |
| Junior Secondary 3 | JSS 3 | Grade 9 |
| Senior Secondary 1 | SS1 / SSS1 | Grade 10 |
| Senior Secondary 2 | SS2 / SSS2 | Grade 11 |
| Senior Secondary 3 | SS3 / SSS3 | Grade 12 |

JSS3 students sit the Basic Education Certificate Examination (BECE / Junior WAEC).
SSS3 students sit the West African Senior School Certificate Examination (WASSCE).

---

## Term Structure

3 terms per academic year. Each term is approximately 13 weeks.

| Term | Typical dates |
|---|---|
| Term 1 | September – December |
| Term 2 | January – April |
| Term 3 | April – July |

---

## Curriculum Frameworks

| Stage | Framework | Exam | Database query |
| --- | --- | --- | --- |
| JSS1–JSS3 | NERDC | BECE (Junior WAEC) | `list-framework-objectives --framework "NERDC"` |
| SS1–SS3 | WAEC | WASSCE | `list-framework-objectives --framework "WAEC"` |

- **JSS curriculum**: Governed by the NERDC (National Educational Research and Development Council)
  basic education curriculum. 22 subjects seeded covering all JSS levels.
- **SSS curriculum**: Governed by the WAEC syllabus for terminal exams. 61 subjects seeded.
- **Mathematics**: WAEC General Mathematics (SS) + WAEC Further Mathematics (SS, optional).
  NERDC Mathematics for JSS.
- **Languages**: English Studies (JSS) / English Language (SS) compulsory, plus one Nigerian
  language. French is optional at both stages.
- **US framework adoption**: [Specify if adopting Common Core, NGSS, or similar — e.g.
  "We align Science units to NGSS in addition to WAEC/NERDC"]

---

## NERDC Curriculum Pacing (JSS1–JSS3)

9-term structure across JSS1–JSS3. Distribute NERDC objectives in this proportion.
**Never assign new objectives to JSS3 Term 2 or JSS3 Term 3.**

| Term | Grade | Focus | New syllabus coverage |
| --- | --- | --- | --- |
| 1 | JSS1 | Foundational basics | ~10% |
| 2 | JSS1 | Core concepts phase 1 | ~15% |
| 3 | JSS1 | Intermediate concepts | ~15% |
| 4 | JSS2 | Advanced core (heaviest term) | ~20% |
| 5 | JSS2 | Practical and applied skills | ~15% |
| 6 | JSS2 | High-weight exam topics | ~15% |
| 7 | JSS3 | Syllabus wrap-up (final 10%) | ~10% |
| 8 | JSS3 | BECE mock exams and past questions | 0% new topics |
| 9 | JSS3 | BECE examinations (Junior WAEC) | No classes |

**JSS3 Term 2** units are revision units — BECE past-question walkthroughs, topic summaries,
exam technique. They reference previously taught objectives, not new ones.

**JSS3 Term 3** has no curriculum units. Students are sitting the Basic Education Certificate
Examination (BECE / Junior WAEC).

---

## WAEC Curriculum Pacing (SS1–SS3)

9-term structure across SS1–SS3. Distribute WAEC objectives in this proportion.
**Never assign new objectives to SS3 Term 2 or SS3 Term 3.**

| Term | Grade | Focus | New syllabus coverage |
|---|---|---|---|
| 1 | SS1 | Foundational basics | ~10% |
| 2 | SS1 | Core concepts phase 1 | ~15% |
| 3 | SS1 | Intermediate concepts | ~15% |
| 4 | SS2 | Advanced core (heaviest term) | ~20% |
| 5 | SS2 | Practical and deep theory | ~15% |
| 6 | SS2 | High-weight exam topics | ~15% |
| 7 | SS3 | Syllabus wrap-up (final 10%) | ~10% |
| 8 | SS3 | Mock exams and past questions | 0% new topics |
| 9 | SS3 | WASSCE examinations | No classes |

**SS3 Term 2** units are revision units — past-question walkthroughs, topic summaries, exam
technique. They reference previously taught objectives, not new ones.

**SS3 Term 3** has no curriculum units at all. Students are sitting external exams.

---

## Grading Convention

| Grade | Range | Meaning |
|---|---|---|
| A1 | 75–100 | Excellent |
| B2 | 70–74 | Very good |
| B3 | 65–69 | Good |
| C4 | 60–64 | Credit |
| C5 | 55–59 | Credit |
| C6 | 50–54 | Credit |
| D7 | 45–49 | Pass |
| E8 | 40–44 | Pass |
| F9 | 0–39 | Fail |

Minimum pass mark for internal assessments: **40%**.
WAEC requires C6 (50%) or above for university entry in most subjects.

---

## Curriculum Co-authoring Instructions for the Agent

When an admin asks to create or update curriculum, first determine whether the request is for
JSS (NERDC) or SS (WAEC), then follow the appropriate path:

**For JSS1–JSS3 (NERDC):**

1. Read this guide to apply the JSS pacing percentages.
2. Call `list-framework-objectives --framework "NERDC" --subject "<subject>"` to get the full
   canonical list of objectives.
3. Follow the NERDC pacing table above (JSS3 T2 = revision only, JSS3 T3 = no units).

**For SS1–SS3 (WAEC):**

1. Read this guide to apply the SS pacing percentages.
2. Call `list-framework-objectives --framework "WAEC" --subject "<subject>"` to get the full
   canonical list of objectives.
3. Follow the WAEC pacing table above (SS3 T2 = revision only, SS3 T3 = no units).

**For both stages:**

1. Group objectives into units by strand coherence and natural learning sequence (foundational
   → intermediate → advanced).
2. Distribute units across the 9 terms using the pacing percentages for the relevant stage.
3. For Term 8 (JSS3 or SS3): create "Revision" units pointing back to the highest-weight
   objectives across all three years. Do not introduce any new objectives.
4. Skip Term 9 entirely — create no units.
5. Each unit must have:
   - A clear title
   - `termId` set to the correct term
   - `weekStart` / `weekEnd` within that term
   - `standardsJson` listing the NERDC or WAEC objective codes it covers
   - 3–5 Bloom's-taxonomy learning objectives
6. Present the full unit tree for admin review before calling `commit-curriculum-draft`.

**Model to use**: Switch to Sonnet or Opus before starting a curriculum session. Haiku lacks
the depth for writing pedagogically sound, differentiated curriculum content across multiple
subjects and grade levels.

---

## Subject-Specific Notes

Add any subject-specific context here as you build out the curriculum. Examples:

- "Further Mathematics is optional; only offered to students planning STEM degrees"
- "Agricultural Science has a practical component — assessments must include field work tasks"
- "English Language: the school uses the Oxford Secondary English series as the set text"

---

## School-Specific Terminology

| Standard term | This school's label |
|---|---|
| Class | [e.g. "Set" or "Stream"] |
| Term | [e.g. "Semester"] |
| Grade | [e.g. "Score"] |

Leave blank if the standard terms apply.
