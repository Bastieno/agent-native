import { defineAction } from "@agent-native/core";
import { z } from "zod";
import { ownerOrg } from "../server/lib/access.js";
import { businessIdBySlug } from "../server/lib/catalog.js";
import { withNote } from "../server/lib/expense-note.js";
import { expenseCategoryId } from "../server/lib/expenses.js";
import { toKobo } from "../server/lib/money.js";
import { reconcileDays } from "../server/lib/reconcile-days.js";
import { NO_BUSINESS } from "../server/lib/setup.js";
import { rows, run } from "../server/lib/sql.js";

export default defineAction({
  description:
    "Change an expense by its code (E-12): business, category, amount (naira), date, how it was paid, who was paid (vendor), what it was for (note, e.g. to correct a misread slip), or confirm it.",
  schema: z.object({
    code: z.string(),
    business: z.enum(["lounge", "hub"]).optional(),
    category: z.string().optional(),
    amount: z.number().positive().optional(),
    occurredOn: z.string().optional(),
    vendor: z.string().optional(),
    note: z.string().optional().describe("What it was for"),
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
    note,
  }) => {
    const orgId = await ownerOrg();
    const [e] = await rows(
      `SELECT e.id, e.occurred_on, e.raw_text, c.name AS category FROM expenses e
         LEFT JOIN expense_categories c ON c.id = e.category_id
        WHERE e.org_id = ? AND e.code = ?`,
      [orgId, code],
    );
    if (!e) throw new Error(`No expense ${code}.`);
    const sets: string[] = [];
    const args: unknown[] = [];
    const set = (col: string, v: unknown) => {
      sets.push(`${col} = ?`);
      args.push(v);
    };
    // Owner's pay and money moved belong to no business: the category wins.
    const finalCategory = category ?? (e.category as string | null);
    if (finalCategory && NO_BUSINESS.includes(finalCategory)) {
      if (category || business) set("business_id", null);
    } else if (business)
      set("business_id", await businessIdBySlug(orgId, business));
    if (category) set("category_id", await expenseCategoryId(orgId, category));
    if (amount != null) set("amount", toKobo(amount));
    if (occurredOn) set("occurred_on", occurredOn);
    if (vendor) set("vendor", vendor.trim());
    if (paidWith) set("paid_with", paidWith);
    if (status) set("status", status);
    if (note != null && note.trim())
      set("raw_text", withNote(e.raw_text, note));
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
