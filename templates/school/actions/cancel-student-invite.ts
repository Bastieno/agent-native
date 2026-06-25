import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getOrgSetting, putOrgSetting } from "@agent-native/core/settings";
import { z } from "zod";

export default defineAction({
  description:
    "Cancel a pending student invitation. Use this before re-inviting if the email was wrong or the invite needs to be resent fresh.",
  schema: z.object({
    email: z.string().email().describe("Email address of the pending invite to cancel"),
  }),
  http: { method: "POST" },
  run: async (args) => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No org context. Are you logged in?");

    const email = args.email.trim().toLowerCase();

    const list = ((await getOrgSetting(orgId, "pending-student-invites")) ??
      []) as Array<{ id: string; email: string; name: string }>;

    const filtered = list.filter((inv) => inv.email !== email);

    if (filtered.length === list.length) {
      throw new Error(
        `No pending invitation found for ${email}. They may have already signed in.`,
      );
    }

    await putOrgSetting(orgId, "pending-student-invites", filtered as any);

    return {
      success: true,
      message: `Invitation for ${email} cancelled. You can now run invite-student again to send a fresh invite.`,
    };
  },
});
