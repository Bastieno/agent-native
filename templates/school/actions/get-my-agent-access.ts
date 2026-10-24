import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { z } from "zod";
import { agentAccessFor } from "../server/lib/agent-gate.js";

export default defineAction({
  description:
    "Whether the signed-in person has the school's assistant right now. Returns available, and when it is not, why (off: the school switched it off for their year group; sitting: they are in the middle of a timed paper; limit: today's messages are used up; school-limit: the whole school has used its day's total) with the message they are shown, plus messages used today and the day's limit (null: no limit).",
  schema: z.object({}),
  http: { method: "GET" },
  readOnly: true,
  run: async () => {
    const { userEmail, orgId } = currentAccess();
    const access = await agentAccessFor(userEmail, orgId);
    return {
      available: access.blocked === null,
      blocked: access.blocked,
      message: access.message,
      used: access.used,
      limit: access.limit,
      ...(access.sittingTitle ? { sittingTitle: access.sittingTitle } : {}),
    };
  },
});
