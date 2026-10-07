import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getOrgSetting } from "@agent-native/core/settings";
import { resourceGetByPath, SHARED_OWNER } from "@agent-native/core/resources";
import { getDb, schema } from "../server/db/index.js";
import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { parseGradeLevelIds } from "../server/lib/subject-year-groups.js";

/**
 * Which of the school's settings are still empty, and what the app does
 * instead until they are filled.
 *
 * A school can describe itself perfectly in SCHOOL_GUIDE.md and still have the
 * app computing with defaults: the guide is prose the agent reads, while
 * report cards, week counts and pacing checks read the settings. An empty
 * setting is not a neutral state — it is the app quietly using a fallback
 * nobody chose, and nothing says so until a report card goes home with the
 * wrong bands on it.
 *
 * Each gap names the fallback in force, so the consequence is visible before
 * it reaches a parent.
 */

type Gap = {
  setting: string;
  meanwhile: string;
  fix: string;
};

export default defineAction({
  description:
    "Which school settings are still empty, and what the app falls back to until they are set — grading scale, terms, year groups, subjects' year groups, the school's own words. Run it during setup, after writing the school guide, and whenever an answer in the guide has no matching setting: the guide is prose the agent reads, but the app computes with the settings.",
  schema: z.object({}),
  http: { method: "GET" },
  run: async () => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const db = getDb();
    const config = ((await getOrgSetting(orgId, "school-config")) ??
      {}) as Record<string, any>;
    const gaps: Gap[] = [];

    if (!config.name) {
      gaps.push({
        setting: "School name",
        meanwhile: "Pages and printed pages have no school name on them.",
        fix: "setup-school",
      });
    }

    const levels = await db
      .select()
      .from(schema.gradeLevels)
      .where(eq(schema.gradeLevels.schoolId, orgId));
    if (levels.length === 0) {
      gaps.push({
        setting: "Year groups",
        meanwhile:
          "Nothing can be planned or taught: classes, units and curricula all belong to a year group.",
        fix: "manage-grade-levels",
      });
    }

    const terms = await db
      .select()
      .from(schema.terms)
      .where(eq(schema.terms.schoolId, orgId));
    if (terms.length === 0) {
      gaps.push({
        setting: "Terms",
        meanwhile:
          "A term has no length, so schemes of work, the calendar and the curriculum checks have no weeks to count.",
        fix: "create-academic-year then create-term",
      });
    }

    if (!config.gradingScale?.levels?.length) {
      gaps.push({
        setting: "Grading scale",
        meanwhile:
          "Report cards and gradebooks fall back to a generic A–F scale, whatever the school's guide says.",
        fix: "update-school-config --gradingScale",
      });
    }
    if (config.passMark == null) {
      gaps.push({
        setting: "Pass mark",
        meanwhile:
          "50% is assumed when deciding who is struggling and what counts as a pass.",
        fix: "update-school-config --passMark",
      });
    }
    if (typeof config.examWeeksPerTerm !== "number") {
      gaps.push({
        setting: "Examination weeks per term",
        meanwhile:
          "One week at the end of each term is assumed when laying out a scheme of work, and curriculum checks stay silent about work set in exam weeks.",
        fix: "update-school-config --examWeeksPerTerm",
      });
    }
    // Not a gap with an assumption behind it: a school that holds no
    // mid-term tests is not missing a setting. But while nobody has said,
    // each subject's curriculum decides for itself — which is how one
    // subject came to test in week 7 and another in week 6.
    if (!Array.isArray(config.reservedWeeks)) {
      gaps.push({
        setting: "Weeks kept for something other than new material",
        meanwhile:
          "Nothing is reserved, so each curriculum decides its own mid-term, revision and practical weeks — and two subjects in the same year group can disagree. A school that keeps no such weeks can say so and this stops being asked.",
        fix: 'update-school-config --reservedWeeks \'[{"week":7,"label":"Mid-term test"}]\'',
      });
    }
    if (!config.missedWorkPolicy) {
      gaps.push({
        setting: "What a missed piece of work counts for",
        meanwhile:
          "Work nobody handed in is left out of the average, so a learner who sat two papers of six is marked on two. Report cards say how many were sat either way, but the average flatters whoever handed least in. Set it to zero if a missed piece counts as a nought here.",
        fix: "update-school-config --missedWorkPolicy zero",
      });
    }
    if (!config.paperSize) {
      gaps.push({
        setting: "Paper size",
        meanwhile:
          "Everything prints laid out for A4. A school printing on Letter gets a page that is scaled down or runs onto a second sheet.",
        fix: "update-school-config --paperSize letter",
      });
    }
    if (!config.locale) {
      gaps.push({
        setting: "Locale",
        meanwhile:
          'Dates are written the way the "en" locale writes them — "September 14, 2026" rather than "14 September 2026". Months are always spelled out, so nothing is ambiguous, but the order may not be the school\'s own.',
        fix: "update-school-config --locale en-NG",
      });
    }
    if (!config.assessmentTerminology) {
      gaps.push({
        setting: "The school's word for a piece of work",
        meanwhile: '"Assessment" is used throughout.',
        fix: "update-school-config --assessmentTerminology",
      });
    }

    const subjects = await db
      .select()
      .from(schema.subjects)
      .where(
        and(
          eq(schema.subjects.schoolId, orgId),
          eq(schema.subjects.status, "active"),
        ),
      );
    if (subjects.length === 0) {
      gaps.push({
        setting: "Subjects",
        meanwhile: "There is nothing to build a curriculum for.",
        fix: "create-subject",
      });
    } else {
      const withoutYears = subjects.filter(
        (s: any) => !parseGradeLevelIds(s.gradeLevelsJson)?.length,
      );
      if (withoutYears.length) {
        gaps.push({
          setting: `Year groups for ${withoutYears.length} subject(s)`,
          meanwhile:
            "Those subjects cannot be counted as missing from a year group's plan, so the curriculum and calendar pages leave them out of their gaps.",
          fix: "update-subject --yearGroups",
        });
      }
    }

    // A subject with no assessment style still gets questions — they just
    // sound like nobody's exam. The gap is invisible until a teacher reads a
    // test and finds it does not resemble what the class will actually sit.
    const activeSubjects = await db
      .select({
        name: schema.subjects.name,
        styleId: schema.subjects.assessmentStyleId,
      })
      .from(schema.subjects)
      .where(
        and(
          eq(schema.subjects.schoolId, orgId),
          eq(schema.subjects.status, "active"),
        ),
      );
    const noStyle = activeSubjects.filter((s: any) => !s.styleId);
    if (activeSubjects.length > 0 && noStyle.length > 0) {
      const named = noStyle
        .slice(0, 4)
        .map((s: any) => s.name)
        .join(", ");
      const more = noStyle.length > 4 ? `, and ${noStyle.length - 4} more` : "";
      gaps.push({
        setting: `Assessment style for ${noStyle.length} of ${activeSubjects.length} subject(s) — ${named}${more}`,
        meanwhile:
          "Questions for those subjects are written without any house habits: the wording, the number of options and the way wrong answers are built will not resemble the exam the class actually sits.",
        fix: "list-assessment-styles to see what is available, then set-subject-assessment-style --subjectId --styleName; or derive one from the school's own past papers",
      });
    }

    const guide = await resourceGetByPath(SHARED_OWNER, "SCHOOL_GUIDE.md");
    if (!guide?.content?.trim()) {
      gaps.push({
        setting: "School guide",
        meanwhile:
          "The agent works from its own assumptions about how this school teaches, marks and speaks.",
        fix: "draft-school-guide, then update-school-resource",
      });
    }

    return {
      ready: gaps.length === 0,
      gaps,
      message: gaps.length
        ? `${gaps.length} setting(s) still empty. Until each is set the app uses a fallback: ${gaps
            .map((g) => `${g.setting} — ${g.meanwhile}`)
            .join(" ")}`
        : "Every school setting the app computes with has been set.",
    };
  },
});
