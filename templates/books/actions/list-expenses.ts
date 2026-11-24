import { defineAction } from "@agent-native/core";
import { z } from "zod";
import { memberOrg } from "../server/lib/access.js";
import { expenseNote } from "../server/lib/expense-note.js";
import { num, rows } from "../server/lib/sql.js";
import { STOCK_KEYS, type StockKey } from "../shared/stock-groups.js";
import { purchaseSplits } from "../server/lib/stock-groups.js";

export default defineAction({
  description:
    "Expenses for days start..end (inclusive), newest first, optionally only those awaiting review, in one category ('Uncategorised' for none) for one business, or with some of it in one Lounge menu group (`stockGroup`: water, soft, energy, beer, bitters, liquor, meals, shawarma, shared, unsorted). Each has `note`, what it was for, and a stock purchase its `stockSplit` among the groups (byOwner when the owner set it, mismatch when its note lines don't add up). `q` searches: an entry's code (E-12, or 12) finds it on any date; words find entries in the period by who was paid or what it was for. Amounts are kobo.",
  schema: z.object({
    start: z.string(),
    end: z.string(),
    status: z.enum(["confirmed", "needs_review"]).optional(),
    category: z.string().optional(),
    business: z.enum(["lounge", "hub", "both"]).optional(),
    stockGroup: z.enum(STOCK_KEYS as [StockKey, ...StockKey[]]).optional(),
    q: z
      .string()
      .optional()
      .describe(
        "An entry's code (E-12) on any date, or words in the payee or note",
      ),
  }),
  http: { method: "GET" },
  run: async ({ start, end, status, category, business, stockGroup, q }) => {
    const orgId = await memberOrg();
    const filters = { sql: "", args: [] as unknown[] };
    const search = q?.trim() ?? "";
    // "E-1190", "e1190", "E 1190" or "1190": that entry, whatever the period.
    const codeAsked = /^(e\s*-?\s*)?(\d+)$/i.exec(search);
    if (codeAsked) {
      filters.sql += " AND e.code = ?";
      filters.args.push(`E-${Number(codeAsked[2])}`);
    }
    if (status) {
      filters.sql += " AND e.status = ?";
      filters.args.push(status);
    }
    if (category === "Uncategorised")
      filters.sql += " AND e.category_id IS NULL";
    else if (category) {
      filters.sql += " AND c.name = ?";
      filters.args.push(category);
    }
    if (business) {
      filters.sql += " AND b.slug = ?";
      filters.args.push(business);
    }
    let found = await rows(
      `SELECT e.id, e.code, e.occurred_on, e.vendor, e.raw_text, e.amount, e.paid_with, e.status, e.source, e.receipt_file_id, b.slug AS business, c.name AS category, c.is_cost
         FROM expenses e
         LEFT JOIN businesses b ON b.id = e.business_id
         LEFT JOIN expense_categories c ON c.id = e.category_id
        WHERE e.org_id = ?${codeAsked ? "" : " AND e.occurred_on >= ? AND e.occurred_on <= ?"}${filters.sql}
        ORDER BY e.occurred_on DESC`,
      [orgId, ...(codeAsked ? [] : [start, end]), ...filters.args],
    );
    // Words: every one must appear in the payee or the note as shown.
    if (search && !codeAsked) {
      const words = search.toLowerCase().split(/\s+/);
      found = found.filter((e) => {
        const text =
          `${e.vendor} ${expenseNote(e.raw_text as string) ?? ""}`.toLowerCase();
        return words.every((w) => text.includes(w));
      });
    }
    const splits = await purchaseSplits(orgId, found as any);
    if (stockGroup)
      found = found.filter((e) =>
        splits.get(e.id as string)?.parts.some((p) => p.group === stockGroup),
      );
    const codeNo = (c: string) => Number(c.replace(/^E-/, "")) || 0;
    found.sort((a, b) =>
      a.occurred_on === b.occurred_on ? codeNo(b.code) - codeNo(a.code) : 0,
    );
    let total = 0;
    let moved = 0;
    for (const e of found)
      if (e.is_cost == null || num(e.is_cost) !== 0) total += num(e.amount);
      else moved += num(e.amount);
    // With a menu group asked for: what of these purchases went to it.
    const stockTotal = stockGroup
      ? found.reduce(
          (a, e) =>
            a +
            (splits
              .get(e.id as string)
              ?.parts.filter((p) => p.group === stockGroup)
              .reduce((x, p) => x + p.amount, 0) ?? 0),
          0,
        )
      : null;
    return {
      /** Counted as costs, and money moved (not costs), over the expenses listed. */
      total,
      moved,
      stockTotal,
      expenses: found.map((e) => ({
        code: e.code,
        occurredOn: e.occurred_on,
        vendor: e.vendor,
        note: expenseNote(e.raw_text as string),
        amount: num(e.amount),
        business: e.business ?? null,
        category: e.category ?? null,
        isCost: e.is_cost == null ? true : num(e.is_cost) !== 0,
        paidWith: e.paid_with,
        status: e.status,
        source: e.source,
        receiptFileId: e.receipt_file_id ?? null,
        stockSplit: splits.get(e.id as string) ?? null,
      })),
    };
  },
});
