import { defineAction } from "@agent-native/core";
import { z } from "zod";
import { memberOrg } from "../server/lib/access.js";
import { rows, num } from "../server/lib/sql.js";

export default defineAction({
  description:
    "The payee rules: who money is usually sent to, and what it is for.",
  schema: z.object({}),
  http: { method: "GET" },
  run: async () => {
    const orgId = await memberOrg();
    const found = await rows(
      `SELECT r.match_key, r.min_amount, c.name AS category, b.slug AS business
         FROM payee_rules r JOIN expense_categories c ON c.id = r.category_id
         LEFT JOIN businesses b ON b.id = r.business_id WHERE r.org_id = ? ORDER BY r.match_key`,
      [orgId],
    );
    return {
      rules: found.map((r) => ({
        payee: r.match_key,
        category: r.category,
        business: r.business ?? null,
        minAmount: r.min_amount == null ? null : num(r.min_amount),
      })),
    };
  },
});
