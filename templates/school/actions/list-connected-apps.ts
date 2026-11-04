import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getDbExec } from "@agent-native/core/db";
import { z } from "zod";
import { getSchoolRole } from "../server/lib/student-access.js";

/**
 * The AI apps (Claude, ChatGPT and the like) currently allowed to act as
 * someone at this school. A person sees their own; an admin sees everyone's,
 * because the question "who can my school's data be reached by?" is theirs.
 */
export default defineAction({
  description:
    "The AI apps connected to the school, and whose account each acts as. Staff see their own; an admin sees everyone's. Use it for 'what is connected to my account?' or 'who has connected an AI app?'.",
  schema: z.object({}),
  http: { method: "GET" },
  readOnly: true,
  run: async () => {
    const { userEmail, orgId } = currentAccess();
    if (!userEmail || !orgId) throw new Error("No school context.");
    const isAdmin = (await getSchoolRole(userEmail)) === "school_admin";
    const me = userEmail.toLowerCase();

    let rows: any[] = [];
    try {
      const res = await getDbExec().execute({
        sql: `SELECT t.owner_email, t.client_id, t.created_at, c.client_name
              FROM mcp_oauth_refresh_tokens t
              LEFT JOIN mcp_oauth_clients c ON c.client_id = t.client_id
              WHERE t.org_id = ? AND t.revoked_at IS NULL AND t.expires_at > ?
              ORDER BY t.created_at DESC`,
        args: [orgId, Date.now()],
      });
      rows = res.rows as any[];
    } catch {
      // Nothing has ever been connected, so the tables do not exist yet.
      return { apps: [] };
    }

    const seen = new Set<string>();
    const apps: Array<{
      clientId: string;
      app: string;
      ownerEmail: string;
      mine: boolean;
      lastRenewedAt: string;
    }> = [];
    for (const r of rows) {
      const owner = String(r.owner_email ?? r.ownerEmail).toLowerCase();
      const clientId = String(r.client_id ?? r.clientId);
      if (!isAdmin && owner !== me) continue;
      const key = `${owner}|${clientId}`;
      if (seen.has(key)) continue;
      seen.add(key);
      apps.push({
        clientId,
        app: String(r.client_name ?? r.clientName ?? "An AI app"),
        ownerEmail: owner,
        mine: owner === me,
        lastRenewedAt: new Date(
          Number(r.created_at ?? r.createdAt),
        ).toISOString(),
      });
    }
    return { apps };
  },
});
