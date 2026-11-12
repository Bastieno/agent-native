import { defineAction } from "@agent-native/core";
import { z } from "zod";
import { memberOrg } from "../server/lib/access.js";
import { num, rows } from "../server/lib/sql.js";

export default defineAction({
  description:
    "Expenses for days start..end (inclusive), newest first, optionally only those awaiting review. Amounts are kobo.",
  schema: z.object({
    start: z.string(),
    end: z.string(),
    status: z.enum(["confirmed", "needs_review"]).optional(),
  }),
  http: { method: "GET" },
  run: async ({ start, end, status }) => {
    const orgId = await memberOrg();
    const found = await rows(
      `SELECT e.code, e.occurred_on, e.vendor, e.amount, e.paid_with, e.status, e.source, e.receipt_file_id, b.slug AS business, c.name AS category
         FROM expenses e
         LEFT JOIN businesses b ON b.id = e.business_id
         LEFT JOIN expense_categories c ON c.id = e.category_id
        WHERE e.org_id = ? AND e.occurred_on >= ? AND e.occurred_on <= ?${status ? " AND e.status = ?" : ""}
        ORDER BY e.occurred_on DESC, e.created_at DESC`,
      status ? [orgId, start, end, status] : [orgId, start, end],
    );
    return {
      expenses: found.map((e) => ({
        code: e.code,
        occurredOn: e.occurred_on,
        vendor: e.vendor,
        amount: num(e.amount),
        business: e.business ?? null,
        category: e.category ?? null,
        paidWith: e.paid_with,
        status: e.status,
        source: e.source,
        hasReceipt: !!e.receipt_file_id,
      })),
    };
  },
});
