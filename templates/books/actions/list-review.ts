import { defineAction } from "@agent-native/core";
import { z } from "zod";
import { currentRole, memberOrg } from "../server/lib/access.js";
import { expenseNote } from "../server/lib/expense-note.js";
import { num, rows } from "../server/lib/sql.js";

export default defineAction({
  description:
    "What the Review screen shows: expenses waiting for review grouped by their guessed category and business (count, total, a few example notes), items with a guessed or missing category, categories with no business, and old receipts not yet read. Amounts are kobo. Confirm a whole group with confirm-expenses.",
  schema: z.object({}),
  http: { method: "GET" },
  run: async () => {
    const orgId = await memberOrg();
    const role = await currentRole();
    const waiting = await rows(
      `SELECT e.code, e.amount, e.raw_text, e.occurred_on, b.slug AS business, c.name AS category, c.is_cost
         FROM expenses e
         LEFT JOIN businesses b ON b.id = e.business_id
         LEFT JOIN expense_categories c ON c.id = e.category_id
        WHERE e.org_id = ? AND e.status = 'needs_review'
        ORDER BY e.occurred_on DESC`,
      [orgId],
    );
    type Group = {
      category: string | null;
      business: string | null;
      isCost: boolean;
      count: number;
      total: number;
      first: string;
      last: string;
      examples: string[];
    };
    const groups = new Map<string, Group>();
    for (const e of waiting) {
      const key = `${e.category ?? ""}|${e.business ?? ""}`;
      const g =
        groups.get(key) ??
        ({
          category: (e.category as string) ?? null,
          business: (e.business as string) ?? null,
          isCost: e.is_cost == null ? true : num(e.is_cost) !== 0,
          count: 0,
          total: 0,
          first: e.occurred_on as string,
          last: e.occurred_on as string,
          examples: [],
        } satisfies Group);
      g.count += 1;
      g.total += num(e.amount);
      if ((e.occurred_on as string) < g.first)
        g.first = e.occurred_on as string;
      if ((e.occurred_on as string) > g.last) g.last = e.occurred_on as string;
      const note = expenseNote(e.raw_text as string)
        ?.split("\n")
        .join(", ");
      if (note && g.examples.length < 3 && !g.examples.includes(note))
        g.examples.push(note);
      groups.set(key, g);
    }
    // Uncategorised first (they need a decision), then largest totals.
    const expenseGroups = [...groups.values()].sort((a, b) =>
      !a.category !== !b.category ? (a.category ? 1 : -1) : b.total - a.total,
    );

    const guesses = await rows(
      `SELECT i.name, c.name AS category FROM items i JOIN item_categories c ON c.id = i.category_id WHERE i.org_id = ? AND i.confirmed = 0 ORDER BY i.name`,
      [orgId],
    );
    const uncategorised = await rows(
      `SELECT i.name FROM items i WHERE i.org_id = ? AND i.category_id IS NULL AND EXISTS (SELECT 1 FROM sale_lines l WHERE l.item_id = i.id) ORDER BY i.name`,
      [orgId],
    );
    const unmapped = await rows(
      `SELECT name FROM item_categories WHERE org_id = ? AND business_id IS NULL ORDER BY name`,
      [orgId],
    );
    const [pending] = await rows(
      `SELECT COUNT(*) AS n FROM pending_receipts WHERE org_id = ? AND status = 'pending'`,
      [orgId],
    );
    return {
      canEdit: role === "owner" || role === "admin",
      expensesWaiting: waiting.length,
      expenseGroups,
      categoryGuesses: guesses.map((g) => ({
        item: g.name as string,
        category: g.category as string,
      })),
      uncategorisedItems: uncategorised.map((u) => u.name as string),
      unmappedCategories: unmapped.map((u) => u.name as string),
      pendingReceipts: num(pending?.n),
    };
  },
});
