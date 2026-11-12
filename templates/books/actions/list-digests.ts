import { defineAction } from "@agent-native/core";
import { z } from "zod";
import { memberOrg } from "../server/lib/access.js";
import { num, rows } from "../server/lib/sql.js";

export default defineAction({
  description: "Saved digests, newest first, with each one's headline figures.",
  schema: z.object({
    limit: z.coerce.number().int().min(1).max(200).default(60),
  }),
  http: { method: "GET" },
  run: async ({ limit }) => {
    const orgId = await memberOrg();
    const found = await rows(
      `SELECT id, period, start_day, end_day, status, sent_at, figures FROM digests WHERE org_id = ? ORDER BY end_day DESC, created_at DESC LIMIT ?`,
      [orgId, limit],
    );
    return {
      digests: found.map((d) => {
        const f = JSON.parse(d.figures);
        return {
          digestId: d.id,
          period: d.period,
          start: d.start_day,
          end: d.end_day,
          status: d.status,
          sentAt: d.sent_at ?? null,
          income: num(f.combined?.income),
          net: num(f.combined?.net),
          flags: (f.flags ?? []).length,
        };
      }),
    };
  },
});
