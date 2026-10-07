import { defineAction } from "@agent-native/core";
import { getOrgSetting, putOrgSetting } from "@agent-native/core/settings";
import { currentAccess } from "@agent-native/core/sharing";
import { z } from "zod";
import { looksUncountable, naivePlural } from "../shared/terminology.js";
import { jsonish } from "../shared/zod-json.js";
import { getDb, schema } from "../server/db/index.js";
import { eq } from "drizzle-orm";
import { roomProblems, weekProblems } from "../shared/school-week.js";
import { reservedWeeksForTerm, termWeekCount } from "../shared/term-weeks.js";

export default defineAction({
  description:
    "Update the school's configuration: grading scale, term structure, grade prefix, pass mark, assessment terminology, timezone, locale, or custom label overrides. Pass only the fields you want to change — others are merged.",
  schema: z.object({
    gradingScale: jsonish(
      z.object({
        type: z.enum(["letter", "percentage", "points", "proficiency"]),
        levels: z.array(
          z.object({
            grade: z.string(),
            min: z.number(),
            max: z.number(),
            label: z.string().optional(),
          }),
        ),
      }),
    )
      .optional()
      .describe("Grading scale definition"),
    termStructure: z
      .enum(["semesters", "terms", "quarters"])
      .optional()
      .describe("How the academic year is divided"),
    gradePrefix: z
      .string()
      .optional()
      .describe('Grade level prefix — "Grade", "Form", "Year", "Class", etc.'),
    passMark: z.coerce
      .number()
      .optional()
      .describe("Minimum passing percentage"),
    categoryThresholds: jsonish(
      z.object({
        advanced: z.coerce.number(),
        developing: z.coerce.number(),
      }),
    )
      .optional()
      .describe(
        "Where a student's average places them as advanced or developing (below the developing figure is foundational). Only set this when the school wants different lines from its own grading scale and pass mark — those are used otherwise.",
      ),
    lateSubmissionPolicy: z
      .enum(["accepted", "penalty", "not_accepted"])
      .optional(),
    assessmentTerminology: z
      .string()
      .optional()
      .describe(
        "What this school calls one piece of work — 'assignment', 'task', 'homework', 'class work'. Its own word, not a fixed list.",
      ),
    assessmentTerminologyPlural: z
      .string()
      .optional()
      .describe(
        "The plural of that word. Give it whenever the plural is not the word plus 's' — 'homework' stays 'homework'. Without it the app shows the word plus 's'.",
      ),
    examWeeksPerTerm: z
      .number()
      .optional()
      .describe(
        "Weeks at the end of each term the school reserves for examinations, if any. Used when laying out a term and when checking a curriculum draft.",
      ),
    reservedWeeks: jsonish(
      z.array(
        z.object({
          week: z.number().describe("Which week of the term, counting from 1"),
          label: z
            .string()
            .describe(
              "What the school calls it, in its own words — 'Mid-term test', 'Contrôle continu', 'Half-term', 'Practical week'",
            ),
          termId: z
            .string()
            .optional()
            .describe(
              "Only this term. Omit when the week falls the same way in every term.",
            ),
        }),
      ),
    )
      .optional()
      .describe(
        "Weeks the school keeps for something other than new material, in the school's own words and at the school's own positions. Nothing is assumed: a school that holds no mid-term tests leaves this unset and no week is reserved. Exam weeks are counted separately from the end of term by examWeeksPerTerm.",
      ),
    schoolWeek: jsonish(
      z.object({
        cycleLength: z
          .literal(1)
          .describe("The week repeats every week. Only 1 is supported."),
        days: z.array(
          z.object({
            day: z
              .number()
              .int()
              .min(1)
              .max(7)
              .describe("Which day, 1 = Monday … 7 = Sunday"),
            periods: z.array(
              z.object({
                number: z
                  .number()
                  .describe(
                    "The school's own numbering for that day. A break has a number like any period.",
                  ),
                start: z.string().describe('24-hour time, e.g. "08:00"'),
                end: z.string().describe('24-hour time, e.g. "08:40"'),
                kind: z.enum(["lesson", "break"]),
                label: z
                  .string()
                  .optional()
                  .describe(
                    "What the school calls it — 'Long break', 'Assembly'",
                  ),
              }),
            ),
          }),
        ),
      }),
    )
      .optional()
      .describe(
        "The school's own week: the days it teaches and the periods and breaks in each, with times. Nothing is assumed — a day the school does not teach is left out, and a short Friday simply has fewer periods. Replaces the whole week when given.",
      ),
    rooms: jsonish(
      z.array(
        z.object({
          name: z.string().describe('"SS1A classroom", "Physics Lab"'),
          kind: z
            .enum(["classroom", "special"])
            .describe(
              "A classroom is a form room; special is a lab, hall or field used by many classes",
            ),
        }),
      ),
    )
      .optional()
      .describe(
        "The rooms the school has, in its own names. Nothing is assumed. Replaces the whole list when given; names that differ only in case or spacing count as one room.",
      ),
    curriculumPacing: jsonish(
      z.object({
        maxUnitWeeks: z
          .number()
          .optional()
          .describe("Longest a unit normally runs, in weeks"),
        minUnitsPerTerm: z
          .number()
          .optional()
          .describe("Fewest units a term normally holds"),
      }),
    )
      .optional()
      .describe(
        "This school's own conventions for how a term is broken up. Set only what the school states; checks stay silent about anything it has not.",
      ),
    theme: jsonish(
      z.object({
        // HSL triples, matching the CSS variables the app already uses:
        // "221 83% 53%". Stored per school so one deployment can carry many.
        primary: z.string().optional().describe('e.g. "221 83% 53%"'),
        primaryForeground: z.string().optional(),
        logoUrl: z.string().optional().describe("Shown in the portal header"),
        displayName: z
          .string()
          .optional()
          .describe("Overrides the school name shown in the header"),
      }),
    )
      .optional()
      .describe("Per-school branding"),
    rankLearners: z.coerce
      .boolean()
      .optional()
      .describe(
        "Whether a report card shows a learner's position in their year group. Many schools publish it; others hold that ranking children is harmful. Off until the school says.",
      ),
    missedWorkPolicy: z
      .enum(["zero", "excluded"])
      .optional()
      .describe(
        'What a piece of work nobody handed in counts for: "zero" marks it as a nought, "excluded" leaves it out of the average. Either way the report card shows how many of the pieces set were actually sat. Unset behaves as "excluded".',
      ),
    paperSize: z
      .enum(["a4", "letter"])
      .optional()
      .describe(
        'What the school prints on — "a4" (most of the world) or "letter" (US, Canada, Mexico, the Philippines). Every print view is laid out for it.',
      ),
    schoolTimezone: z
      .string()
      .optional()
      .describe(
        'The school\'s own timezone, e.g. "Africa/Lagos" — anything that happened at a moment in time is shown in it.',
      ),
    locale: z
      .string()
      .optional()
      .describe(
        'How dates and numbers are written — a BCP 47 tag such as "en-NG", "en-GB", "fr-CI". Months are always spelled out, so this decides the order, not whether a date can be misread.',
      ),
    customLabels: jsonish(z.record(z.string(), z.string()))
      .optional()
      .describe(
        'Override terminology — e.g. {"student": "Learner", "teacher": "Educator"}',
      ),
  }),
  http: { method: "PUT" },
  run: async (args) => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const db = getDb();
    const existing =
      ((await getOrgSetting(orgId, "school-config")) as Record<
        string,
        unknown
      > | null) ?? {};
    const problems = [
      ...(args.schoolWeek ? weekProblems(args.schoolWeek as any) : []),
      ...(args.rooms ? roomProblems(args.rooms as any) : []),
    ];
    if (problems.length) {
      throw new Error(`Nothing was saved. ${problems.join(" ")}`);
    }
    const merged = { ...existing, ...args } as Record<string, unknown>;
    if (args.theme) {
      // Merge, so setting a logo does not clear a colour set earlier.
      merged.theme = {
        ...((existing.theme as Record<string, unknown>) ?? {}),
        ...args.theme,
      };
    }
    if (args.customLabels) {
      merged.customLabels = {
        ...((existing.customLabels as Record<string, string>) ?? {}),
        ...args.customLabels,
      };
    }
    // A new word cannot keep the old word's plural: setting the word to
    // "homework" while "assessments" stayed behind would have written
    // "3 assessments" under the heading "homework", and said nothing.
    if (
      args.assessmentTerminology !== undefined &&
      args.assessmentTerminologyPlural === undefined
    ) {
      delete merged.assessmentTerminologyPlural;
    }
    await putOrgSetting(orgId, "school-config", merged);
    // Ask at the moment the word is set, rather than leaving someone to
    // notice "3 homeworks" on a child's dashboard weeks later.
    const term = (merged as any).assessmentTerminology as string | undefined;
    const plural = (merged as any).assessmentTerminologyPlural as
      | string
      | undefined;
    const warning =
      term && !plural && (looksUncountable(term) || term.includes(" "))
        ? `The app will write "${naivePlural(term)}" when there is more than one piece of work. If that is wrong — "homework" usually stays "homework" — set assessmentTerminologyPlural.`
        : null;

    // Two ways to set a week aside, and one way to do it twice.
    //
    // Examination weeks are counted from the end of term, because terms here
    // are 13, 12 and 13 weeks and "the last week" is the only description
    // that holds for all three. Reserved weeks are counted from the start.
    // Naming the exam week in both — "week 13" and one week from the end —
    // reserves it twice and makes a term look a week shorter than it is, so
    // it is worth saying out loud rather than quietly ignoring.
    const notes: string[] = [];
    const reserved = Array.isArray(merged.reservedWeeks)
      ? (merged.reservedWeeks as any[])
      : [];
    const examWeeks =
      typeof merged.examWeeksPerTerm === "number"
        ? merged.examWeeksPerTerm
        : null;
    if (reserved.length && examWeeks && examWeeks > 0) {
      const terms = await db
        .select({
          id: schema.terms.id,
          name: schema.terms.name,
          startDate: schema.terms.startDate,
          endDate: schema.terms.endDate,
        })
        .from(schema.terms)
        .where(eq(schema.terms.schoolId, orgId));
      for (const term of terms as any[]) {
        const length = termWeekCount(term.startDate, term.endDate);
        if (!length) continue;
        const firstExamWeek = length - examWeeks + 1;
        for (const r of reservedWeeksForTerm(reserved as any, term.id)) {
          if (r.week >= firstExamWeek) {
            notes.push(
              `"${r.label}" is set for week ${r.week} of ${term.name}, which is already kept for examinations (${term.name} runs ${length} weeks and the last ${examWeeks} ${examWeeks === 1 ? "is" : "are"} exam weeks). Remove it, or lower examWeeksPerTerm.`,
            );
          }
          if (r.week > length) {
            notes.push(
              `"${r.label}" is set for week ${r.week}, but ${term.name} only runs ${length} weeks. Give that term its own entry with termId.`,
            );
          }
        }
      }
    }

    return {
      success: true,
      config: merged,
      ...(notes.length ? { notes } : {}),
      ...(warning ? { warning, message: warning } : {}),
    };
  },
});
