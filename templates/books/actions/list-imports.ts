import { defineAction } from "@agent-native/core";
import { z } from "zod";
import { memberOrg } from "../server/lib/access.js";
import { num, rows } from "../server/lib/sql.js";

export default defineAction({
  description:
    "Files imported recently: which report, its dates, how it came in, and whether it agreed with the sales summary.",
  schema: z.object({
    limit: z.coerce.number().int().min(1).max(100).default(15),
  }),
  http: { method: "GET" },
  run: async ({ limit }) => {
    const orgId = await memberOrg();
    const found = await rows(
      `SELECT kind, file_name, range_start, range_end, rows_added, rows_updated, received_via, check_result, created_at FROM imports WHERE org_id = ? ORDER BY created_at DESC LIMIT ?`,
      [orgId, limit],
    );
    return {
      imports: found.map((r) => ({
        kind: r.kind,
        fileName: r.file_name,
        rangeStart: r.range_start ?? null,
        rangeEnd: r.range_end ?? null,
        added: num(r.rows_added),
        updated: num(r.rows_updated),
        receivedVia: r.received_via,
        check: r.check_result ? JSON.parse(r.check_result) : null,
        at: r.created_at,
      })),
    };
  },
});
