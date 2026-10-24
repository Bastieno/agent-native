import { defineAction } from "@agent-native/core";
import { getOrgSetting } from "@agent-native/core/settings";
import { currentAccess } from "@agent-native/core/sharing";
import { z } from "zod";

export default defineAction({
  description:
    "Get the custom field definitions for school entities (student, lesson_note, assessment, class).",
  schema: z.object({}),
  http: { method: "GET" },
  run: async () => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const schema = await getOrgSetting(orgId, "custom-fields-schema");
    return (
      schema ?? { student: [], lesson_note: [], assessment: [], class: [] }
    );
  },
});
