import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getDbExec } from "@agent-native/core/db";
import { z } from "zod";
import { getSchoolRole } from "../server/lib/student-access.js";

export default defineAction({
  description:
    "Cut off an AI app so it can no longer act as the person it was connected for. Anyone may disconnect their own; an admin may disconnect anyone's at this school. The app is asked to sign in again the next time it tries, and an access it already holds ends within an hour. Confirm with the person first.",
  schema: z.object({
    clientId: z
      .string()
      .min(1)
      .describe("The app's id, from list-connected-apps"),
    ownerEmail: z
      .string()
      .email()
      .optional()
      .describe("Whose connection; omit for your own"),
  }),
  http: { method: "POST" },
  run: async (args) => {
    const { userEmail, orgId } = currentAccess();
    if (!userEmail || !orgId) throw new Error("No school context.");
    const me = userEmail.toLowerCase();
    const owner = (args.ownerEmail ?? me).toLowerCase();
    if (owner !== me) {
      const role = await getSchoolRole(userEmail);
      if (role !== "school_admin") {
        throw new Error("Only an admin can disconnect someone else's app.");
      }
    }
    const res = await getDbExec().execute({
      sql: `UPDATE mcp_oauth_refresh_tokens SET revoked_at = ?
            WHERE owner_email = ? AND client_id = ? AND org_id = ? AND revoked_at IS NULL`,
      args: [Date.now(), owner, args.clientId, orgId],
    });
    if (!res.rowsAffected) throw new Error("That app is not connected.");
    return {
      ok: true,
      message:
        "Disconnected. The app has to be connected again before it can act for them; anything it already holds stops working within an hour.",
    };
  },
});
