import { defineAction } from "@agent-native/core";
import { z } from "zod";
import { currentRole, memberOrg } from "../server/lib/access.js";
import type { DayResult } from "../server/lib/reconcile.js";
import { num, rows } from "../server/lib/sql.js";

export default defineAction({
  description:
    "What the Today screen shows: the latest reconciled day with its figures and flags, the latest digest, and the review queue (receipts to confirm, category guesses, uncategorised items, categories with no business, old receipts waiting to be read).",
  schema: z.object({}),
  http: { method: "GET" },
  run: async () => {
    const orgId = await memberOrg();
    const role = await currentRole();
    const [latest] = await rows(
      `SELECT r.day, r.figures FROM reconciliations r WHERE r.org_id = ? AND EXISTS (SELECT 1 FROM sales s WHERE s.org_id = r.org_id AND s.day = r.day) ORDER BY r.day DESC LIMIT 1`,
      [orgId],
    );
    const [digest] = await rows(
      `SELECT id, period, start_day, end_day, status, commentary FROM digests WHERE org_id = ? ORDER BY end_day DESC, created_at DESC LIMIT 1`,
      [orgId],
    );
    const receipts = await rows(
      `SELECT e.code, e.vendor, e.amount, e.occurred_on FROM expenses e WHERE e.org_id = ? AND e.status = 'needs_review' ORDER BY e.occurred_on DESC LIMIT 20`,
      [orgId],
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
      day: latest ? (latest.day as string) : null,
      figures: latest ? (JSON.parse(latest.figures) as DayResult) : null,
      digest: digest
        ? {
            digestId: digest.id,
            period: digest.period,
            start: digest.start_day,
            end: digest.end_day,
            status: digest.status,
            commentary: digest.commentary ?? null,
          }
        : null,
      review: {
        receipts: receipts.map((r) => ({
          code: r.code,
          vendor: r.vendor,
          amount: num(r.amount),
          occurredOn: r.occurred_on,
        })),
        categoryGuesses: guesses.map((g) => ({
          item: g.name,
          category: g.category,
        })),
        uncategorised: uncategorised.map((u) => u.name as string),
        unmappedCategories: unmapped.map((u) => u.name as string),
        pendingHistory: num(pending?.n),
      },
    };
  },
});
