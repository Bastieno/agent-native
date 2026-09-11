import { defineAction } from "@agent-native/core";
import { getOrgSetting } from "@agent-native/core/settings";
import { currentAccess } from "@agent-native/core/sharing";
import { z } from "zod";

export default defineAction({
  description:
    "Read the school's grading scale, term structure, grade prefix, terminology, and other config.",
  schema: z.object({}),
  http: { method: "GET" },
  run: async () => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const config = await getOrgSetting(orgId, "school-config");
    return (
      config ?? {
        gradingScale: { type: "letter", levels: [] },
        termStructure: "terms",
        gradePrefix: "Grade",
        passMark: 50,
        assessmentTerminology: "assessment",
      }
    );
  },
});
