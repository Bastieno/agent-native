import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getOrgSetting } from "@agent-native/core/settings";
import { z } from "zod";

/** Students invited who have not signed in yet. */
export default defineAction({
  description:
    "Students who have been invited but have not yet signed in and activated their account.",
  schema: z.object({}),
  http: { method: "GET" },
  run: async () => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    return ((await getOrgSetting(orgId, "pending-student-invites")) ??
      []) as unknown[];
  },
});
