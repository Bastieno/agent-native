import { defineAction } from "@agent-native/core";
import { getOrgSetting } from "@agent-native/core/settings";
import { currentAccess } from "@agent-native/core/sharing";
import { z } from "zod";

export default defineAction({
  description: "Get the current school's profile and settings.",
  schema: z.object({}),
  http: { method: "GET" },
  run: async () => {
    const { orgId } = currentAccess();
    if (!orgId)
      throw new Error("No school (org) context found. Are you logged in?");
    const config = await getOrgSetting(orgId, "school-config");
    const customFields = await getOrgSetting(orgId, "custom-fields-schema");
    return {
      schoolId: orgId,
      config: config ?? null,
      customFieldsSchema: customFields ?? null,
    };
  },
});
