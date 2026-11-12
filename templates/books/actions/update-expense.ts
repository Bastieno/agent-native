import { defineAction } from "@agent-native/core";
import { z } from "zod";
import { ownerOrg } from "../server/lib/access.js";
import { businessIdBySlug } from "../server/lib/catalog.js";
import { expenseCategoryId } from "../server/lib/expenses.js";
import { toKobo } from "../server/lib/money.js";
import { reconcileDays } from "../server/lib/reconcile-days.js";
import { rows, run } from "../server/lib/sql.js";

export default defineAction({
  description:
    "Change an expense by its code (E-12): business, category, amount (naira), date, how it was paid, or confirm it.",
  schema: z.object({
    code: z.string(),
    business: z.enum(["lounge", "hub"]).optional(),
    category: z.string().optional(),
    amount: z.number().positive().optional(),
    occurredOn: z.string().optional(),
    vendor: z.string().optional(),
    paidWith: z.enum(["cash", "transfer", "card", "unknown"]).optional(),
    status: z.enum(["confirmed", "needs_review"]).optional(),
  }),
  run: async ({
    code,
    business,
    category,
    amount,
    occurredOn,
    vendor,
    paidWith,
    status,
  }) => {
    const orgId = await ownerOrg();
    const [e] = await rows(
      `SELECT id, occurred_on FROM expenses WHERE org_id = ? AND code = ?`,
      [orgId, code],
    );
    if (!e) throw new Error(`No expense ${code}.`);
    const sets: string[] = [];
    const args: unknown[] = [];
    const set = (col: string, v: unknown) => {
      sets.push(`${col} = ?`);
      args.push(v);
    };
    if (business) set("business_id", await businessIdBySlug(orgId, business));
    if (category) set("category_id", await expenseCategoryId(orgId, category));
    if (amount != null) set("amount", toKobo(amount));
    if (occurredOn) set("occurred_on", occurredOn);
    if (vendor) set("vendor", vendor.trim());
    if (paidWith) set("paid_with", paidWith);
    if (status) set("status", status);
    if (sets.length)
      await run(
        `UPDATE expenses SET ${sets.join(", ")} WHERE org_id = ? AND id = ?`,
        [...args, orgId, e.id],
      );
    await reconcileDays(orgId, [
      e.occurred_on,
      ...(occurredOn ? [occurredOn] : []),
    ]);
    return { code, updated: sets.length };
  },
});
