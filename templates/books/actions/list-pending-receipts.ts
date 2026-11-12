import { defineAction } from "@agent-native/core";
import { z } from "zod";
import { memberOrg } from "../server/lib/access.js";
import { rows } from "../server/lib/sql.js";

export default defineAction({
  description:
    "Old receipts from a chat export that haven't been read yet, oldest first.",
  schema: z.object({ limit: z.number().int().min(1).max(200).default(50) }),
  http: { method: "GET" },
  run: async ({ limit }) => {
    const orgId = await memberOrg();
    const found = await rows(
      `SELECT p.id, p.occurred_on, p.note, p.receipt_file_id, f.mime_type FROM pending_receipts p JOIN receipt_files f ON f.id = p.receipt_file_id
        WHERE p.org_id = ? AND p.status = 'pending' ORDER BY p.sent_at LIMIT ?`,
      [orgId, limit],
    );
    return {
      receipts: found.map((r) => ({
        id: r.id,
        occurredOn: r.occurred_on,
        note: r.note ?? null,
        mimeType: r.mime_type,
        receiptFileId: r.receipt_file_id,
      })),
    };
  },
});
