import { defineAction } from "@agent-native/core";
import { isEmailConfigured } from "@agent-native/core/server";
import { getOrgSetting } from "@agent-native/core/settings";
import { currentAccess } from "@agent-native/core/sharing";
import { z } from "zod";
import { ensureAgentSettings } from "../server/lib/agent-settings-store.js";
import { agentModelChoices } from "../server/lib/agent-models.js";

export default defineAction({
  description:
    "Read the school's grading scale, term structure, grade prefix, terminology, and other config, plus whether the school can send email (emailConfigured). `agent` is the assistant's settings as this school has them stored — learnerAgentEnabled, learnerAgentByYearGroup (grade level id → on/off), models and dailyMessageLimits per learner/teacher/admin (null: no limit) — and agentModelChoices lists the models an admin may pick.",
  schema: z.object({}),
  http: { method: "GET" },
  run: async () => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    // An older school gets the assistant's settings written into its config
    // the first time they are read; from then on they are its own values.
    const agent = await ensureAgentSettings(orgId);
    const config = await getOrgSetting(orgId, "school-config");
    // Whether an invitation will actually be emailed is part of what an agent
    // needs before it promises one. Without this it could only hedge — "if the
    // school has email set up" — about something the app already knows.
    const emailConfigured = isEmailConfigured();
    const stored = (config as Record<string, unknown> | null) ?? null;
    return {
      emailConfigured,
      ...(stored ?? {
        gradingScale: { type: "letter", levels: [] },
        termStructure: "terms",
        gradePrefix: "Grade",
        passMark: 50,
        assessmentTerminology: "assessment",
        assessmentTerminologyPlural: "assessments",
      }),
      agent,
      agentModelChoices: agentModelChoices(),
    };
  },
});
