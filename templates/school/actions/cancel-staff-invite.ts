import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getOrgSetting, putOrgSetting } from "@agent-native/core/settings";
import { getDbExec } from "@agent-native/core/db";
import { z } from "zod";

export default defineAction({
  description:
    "Cancel a pending staff invitation. Use this before re-inviting if the email was wrong or the invite needs to be resent fresh.",
  schema: z.object({
    email: z.string().email().describe("Email address of the pending invite to cancel"),
  }),
  http: { method: "POST" },
  run: async (args) => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No org context. Are you logged in?");

    const email = args.email.trim().toLowerCase();

    const list = ((await getOrgSetting(orgId, "pending-staff-invites")) ??
      []) as Array<{ id: string; email: string; name: string; schoolRole: string }>;

    const filtered = list.filter((inv) => inv.email !== email);

    if (filtered.length === list.length) {
      throw new Error(
        `No pending invitation found for ${email}. They may have already signed in — use finalize-staff-invite instead.`,
      );
    }

    await putOrgSetting(orgId, "pending-staff-invites", filtered);

    // Best-effort: mark cancelled in the framework invitations table
    try {
      const exec = getDbExec();
      await exec.execute({
        sql: `UPDATE org_invitations SET status = 'cancelled' WHERE org_id = ? AND LOWER(email) = ? AND status = 'pending'`,
        args: [orgId, email],
      });
    } catch {
      // Non-fatal
    }

    return {
      success: true,
      message: `Invitation for ${email} cancelled. You can now run invite-staff again to send a fresh invite.`,
    };
  },
});
