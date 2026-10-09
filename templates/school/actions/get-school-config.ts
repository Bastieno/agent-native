import { defineAction } from "@agent-native/core";
import { isEmailConfigured } from "@agent-native/core/server";
import { getOrgSetting } from "@agent-native/core/settings";
import { currentAccess } from "@agent-native/core/sharing";
import { z } from "zod";

export default defineAction({
  description:
    "Read the school's grading scale, term structure, grade prefix, terminology, and other config, plus whether the school can send email (emailConfigured).",
  schema: z.object({}),
  http: { method: "GET" },
  run: async () => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const config = await getOrgSetting(orgId, "school-config");
    // Whether an invitation will actually be emailed is part of what an agent
    // needs before it promises one. Without this it could only hedge — "if the
    // school has email set up" — about something the app already knows.
    const emailConfigured = isEmailConfigured();
    return {
      emailConfigured,
      ...((config as Record<string, unknown> | null) ?? {
        gradingScale: { type: "letter", levels: [] },
        termStructure: "terms",
        gradePrefix: "Grade",
        passMark: 50,
        assessmentTerminology: "assessment",
        assessmentTerminologyPlural: "assessments",
      }),
    };
  },
});
