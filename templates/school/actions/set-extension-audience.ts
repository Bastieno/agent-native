import { defineAction } from "@agent-native/core";
import { putOrgSetting } from "@agent-native/core/settings";
import { currentAccess } from "@agent-native/core/sharing";
import { z } from "zod";
import {
  EXTENSION_AUDIENCE_KEY,
  teacherExtensionIds,
} from "./get-extension-audience.js";

export default defineAction({
  description:
    "Put an extension in front of teachers, or take it away from them. Teachers see it on their Extensions page. The extension must also be shared with the school, which the admin's Extensions page does when this is switched on.",
  schema: z.object({
    extensionId: z.string().describe("The extension"),
    forTeachers: z
      .boolean()
      .describe("true to show it to teachers, false to stop"),
  }),
  http: { method: "POST" },
  run: async (args) => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const current = await teacherExtensionIds(orgId);
    const next = args.forTeachers
      ? [...new Set([...current, args.extensionId])]
      : current.filter((id) => id !== args.extensionId);
    await putOrgSetting(orgId, EXTENSION_AUDIENCE_KEY, { teacherIds: next });
    return {
      teacherIds: next,
      message: args.forTeachers
        ? "Teachers can now open this extension."
        : "Teachers no longer see this extension.",
    };
  },
});
