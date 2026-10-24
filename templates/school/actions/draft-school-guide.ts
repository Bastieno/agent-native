import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getOrgSetting } from "@agent-native/core/settings";
import { resourceGetByPath, SHARED_OWNER } from "@agent-native/core/resources";
import { getDb, schema } from "../server/db/index.js";
import { and, asc, eq } from "drizzle-orm";
import { z } from "zod";
import { parseGradeLevelIds } from "../server/lib/subject-year-groups.js";
import { workWords } from "../shared/terminology.js";

/**
 * A first draft of the school's guide, for the school to correct.
 *
 * SCHOOL_GUIDE.md is what tells the agent how this school works — its
 * vocabulary, its pacing, how each subject is assessed — and every answer the
 * agent gives is shaped by it. Yet nothing ever proposed one, so a school
 * either dictated it from nothing or ended up with whatever the agent
 * improvised. Correcting a draft takes minutes; writing one from a blank page
 * does not happen.
 *
 * Nothing here is saved, and nothing is invented. Everything stated is read
 * back from the school's own settings and data — its year groups, its term
 * dates, its grading scale, the syllabus libraries actually seeded for it. What
 * the app cannot know is left as a question, marked so plainly that sending it
 * back unanswered is obvious. A school on two semesters with no exam weeks and
 * its own words for everything gets a draft that says so, or asks.
 */

const ASK = "**→ tell me:**";
// Facts copied from Settings are marked, because a guide is a document: it
// does not change when a setting does. The app computes with the setting, so
// an edited line here would change what the agent says and nothing else.
const FROM_SETTINGS = "_(from Settings)_";

export default defineAction({
  description:
    "Draft this school's SCHOOL_GUIDE.md from what the app already knows — year groups, terms, grading, subjects, seeded syllabus libraries — leaving what it cannot know as questions. Nothing is saved: show the draft to the admin, take their corrections, then save it with update-school-resource. Use it at setup, and whenever the guide is still empty.",
  schema: z.object({}),
  http: { method: "GET" },
  run: async () => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const db = getDb();

    const config = ((await getOrgSetting(orgId, "school-config")) ??
      {}) as Record<string, any>;
    const existing = await resourceGetByPath(SHARED_OWNER, "SCHOOL_GUIDE.md");

    const levels = await db
      .select()
      .from(schema.gradeLevels)
      .where(eq(schema.gradeLevels.schoolId, orgId))
      .orderBy(asc(schema.gradeLevels.sequence));
    const terms = await db
      .select()
      .from(schema.terms)
      .where(eq(schema.terms.schoolId, orgId))
      .orderBy(asc(schema.terms.sequence));
    const subjects = await db
      .select()
      .from(schema.subjects)
      .where(
        and(
          eq(schema.subjects.schoolId, orgId),
          eq(schema.subjects.status, "active"),
        ),
      )
      .orderBy(asc(schema.subjects.position));
    // Only libraries this school actually has. Naming a framework it has not
    // seeded would send the agent looking for objectives that do not exist.
    const frameworks = await db.select().from(schema.curriculumFrameworks);

    const levelName = new Map<string, string>(
      levels.map((l: any) => [l.id, l.name]),
    );
    const words = workWords(config as any);
    const lines: string[] = [];
    const missing: string[] = [];

    lines.push(`# ${config.name ?? "Your school"} — school guide`);
    lines.push("");
    lines.push(
      "This is what the app's agent reads before it answers anyone here. Correct anything that is wrong, answer the questions, and delete what does not apply.",
    );
    lines.push("");
    lines.push(
      `Lines marked ${FROM_SETTINGS} are copied from the school's settings, which is what the app itself computes with — change those in Settings, not here. Everything else is yours to write.`,
    );

    lines.push("", "## The school", "");
    lines.push(
      `- Name: ${config.name ? `${config.name} ${FROM_SETTINGS}` : `${ASK} the school's full name`}`,
    );
    if (!config.name) missing.push("name");
    lines.push(
      `- Type: ${config.type ? `${config.type} ${FROM_SETTINGS}` : `${ASK} primary, secondary, both, or something else`}`,
    );
    lines.push(
      `- Country and timezone: ${
        [config.country, config.timezone].filter(Boolean).join(", ") ||
        `${ASK} where the school is`
      }`,
    );
    lines.push(
      `- ${ASK} anything about the school an outsider would not guess — single-sex or mixed, boarding or day, religious character, languages of instruction.`,
    );
    missing.push("school character");

    lines.push("", "## Year groups", "");
    if (levels.length) {
      lines.push(
        `- ${levels.map((l: any) => l.name).join(", ")}. ${FROM_SETTINGS}`,
      );
      lines.push(
        `- Call them by these names, and never by another country's — no "Grade 7" if the school says "${levels[0].name}".`,
      );
    } else {
      lines.push(`- ${ASK} the year groups, in order, in the school's words.`);
      missing.push("year groups");
    }

    lines.push("", "## Terms", "");
    if (terms.length) {
      for (const t of terms) {
        lines.push(
          `- ${t.name}: ${t.startDate} to ${t.endDate} ${FROM_SETTINGS}`,
        );
      }
      lines.push(
        `- Examination weeks reserved at the end of each term: ${
          typeof config.examWeeksPerTerm === "number"
            ? config.examWeeksPerTerm
            : `${ASK} how many, or none`
        }`,
      );
      if (typeof config.examWeeksPerTerm !== "number") {
        missing.push("examination weeks");
      }
    } else {
      lines.push(
        `- ${ASK} how the year is divided, what each part is called, and when each runs.`,
      );
      missing.push("terms");
    }

    lines.push("", "## Marking", "");
    const scale = config.gradingScale;
    if (scale?.levels?.length) {
      lines.push(
        `- Scale: ${scale.levels
          .map(
            (l: any) =>
              `${l.grade} ${l.min}–${l.max}${l.label ? ` (${l.label})` : ""}`,
          )
          .join(", ")} ${FROM_SETTINGS}`,
      );
    } else {
      lines.push(`- ${ASK} the grading scale, with the bands the school uses.`);
      missing.push("grading scale");
    }
    lines.push(
      `- Pass mark: ${config.passMark != null ? `${config.passMark}% ${FROM_SETTINGS}` : `${ASK} the pass mark`}`,
    );
    lines.push(
      `- Reports show: ${ASK} letters, percentages, bands, comments — and what a parent should see.`,
    );
    missing.push("report format");

    lines.push("", "## Curriculum", "");
    if (frameworks.length) {
      const byName = new Map<string, string[]>();
      for (const f of frameworks) {
        byName.set(f.name, [...(byName.get(f.name) ?? []), f.gradeRange ?? ""]);
      }
      for (const [name, ranges] of byName) {
        const range = [...new Set(ranges.filter(Boolean))].join(", ");
        lines.push(
          `- ${name}${range ? ` (${range})` : ""} — seeded in this school's standards library.`,
        );
      }
      lines.push(
        `- ${ASK} which year groups follow which, and anything the school does differently from the syllabus.`,
      );
    } else {
      lines.push(
        `- ${ASK} which curriculum or syllabus each year group follows. Nothing is seeded in this school's standards library yet.`,
      );
      missing.push("curriculum framework");
    }
    lines.push(
      `- How a term is shaped: ${ASK} how long a unit usually runs, and how many units a term normally holds. The app checks drafts against this, so an answer here stops it guessing.`,
    );
    missing.push("unit shape");

    lines.push("", "## Subjects", "");
    if (subjects.length) {
      const byYears = new Map<string, string[]>();
      for (const s of subjects) {
        const ids = parseGradeLevelIds(s.gradeLevelsJson);
        const key = ids?.length
          ? ids.map((id) => levelName.get(id) ?? id).join(", ")
          : "year groups not recorded";
        byYears.set(key, [...(byYears.get(key) ?? []), s.name]);
      }
      for (const [years, names] of byYears) {
        lines.push(`- ${years}: ${names.join(", ")} ${FROM_SETTINGS}`);
      }
      lines.push(
        `- ${ASK} any subject a learner chooses between rather than takes — "CRS or IRS, never both" — and anything special about how a subject is taught or assessed here.`,
      );
    } else {
      lines.push(`- ${ASK} the subjects, and which year groups take each.`);
      missing.push("subjects");
    }

    lines.push("", "## Words", "");
    lines.push(
      `- A piece of work is called: ${words.one} (several: ${words.many}) ${FROM_SETTINGS}. ${ASK} if that is not what the school says.`,
    );
    const labels = config.customLabels ?? {};
    lines.push(
      `- Learners are called: ${labels.student ?? `${ASK} "students", "learners", "pupils"…`}`,
    );
    lines.push(
      `- Staff are called: ${labels.teacher ?? `${ASK} "teachers", "tutors", "educators"…`}`,
    );
    lines.push(
      `- ${ASK} how learners are identified — admission number, roll number, something else.`,
    );

    lines.push("", "## Writing for this school", "");
    lines.push(
      `- ${ASK} spelling (British or American), currency, and the names, places and examples that should feel local.`,
    );
    lines.push(
      `- ${ASK} anything the agent should never do here, and anything it should always do.`,
    );
    missing.push("tone and local context");

    const draft = lines.join("\n") + "\n";
    const questions = draft.split("\n").filter((l) => l.includes(ASK)).length;

    return {
      draft,
      saved: false,
      alreadyHasGuide: !!existing?.content?.trim(),
      questionCount: questions,
      needsAnswers: [...new Set(missing)],
      message: `${existing?.content?.trim() ? "This school already has a guide — show this draft only as a starting point for rewriting it. " : ""}A draft guide with ${questions} question(s) for the admin. Nothing is saved. Show it to them, ask them to correct it and answer what is marked, then save the result with update-school-resource. Do not answer the questions yourself.`,
    };
  },
});
