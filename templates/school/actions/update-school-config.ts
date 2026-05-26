import { defineAction } from "@agent-native/core";
import { getOrgSetting, putOrgSetting } from "@agent-native/core/settings";
import { currentAccess } from "@agent-native/core/sharing";
import { z } from "zod";

export default defineAction({
  description:
    "Update the school's configuration: grading scale, term structure, grade prefix, pass mark, assessment terminology, timezone, locale, or custom label overrides. Pass only the fields you want to change — others are merged.",
  schema: z.object({
    gradingScale: z
      .object({
        type: z.enum(["letter", "percentage", "points", "proficiency"]),
        levels: z.array(
          z.object({
            grade: z.string(),
            min: z.number(),
            max: z.number(),
            label: z.string().optional(),
          }),
        ),
      })
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
    passMark: z.number().optional().describe("Minimum passing percentage"),
    lateSubmissionPolicy: z
      .enum(["accepted", "penalty", "not_accepted"])
      .optional(),
    assessmentTerminology: z
      .enum(["assignment", "assessment", "task", "homework"])
      .optional(),
    schoolTimezone: z.string().optional(),
    locale: z.string().optional(),
    customLabels: z
      .record(z.string(), z.string())
      .optional()
      .describe(
        'Override terminology — e.g. {"student": "Learner", "teacher": "Educator"}',
      ),
  }),
  http: { method: "PUT" },
  run: async (args) => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const existing = (await getOrgSetting(orgId, "school-config") as Record<string, unknown> | null) ?? {};
    const merged = { ...existing, ...args } as Record<string, unknown>;
    if (args.customLabels) {
      merged.customLabels = {
        ...(existing.customLabels as Record<string, string> ?? {}),
        ...args.customLabels,
      };
    }
    await putOrgSetting(orgId, "school-config", merged);
    return { success: true, config: merged };
  },
});
