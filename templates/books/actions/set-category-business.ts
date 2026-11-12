import { defineAction } from "@agent-native/core";
import { z } from "zod";
import { ownerOrg } from "../server/lib/access.js";
import { businessIdBySlug, categoryId } from "../server/lib/catalog.js";
import { reconcileDays } from "../server/lib/reconcile-days.js";
import { rows, run } from "../server/lib/sql.js";

export default defineAction({
  description:
    "Say which business a Moniebook category belongs to: lounge (Restaurant & Lounge) or hub.",
  schema: z.object({
    category: z.string(),
    business: z.enum(["lounge", "hub"]),
  }),
  run: async ({ category, business }) => {
    const orgId = await ownerOrg();
    const cid = await categoryId(orgId, category);
    await run(
      `UPDATE item_categories SET business_id = ? WHERE org_id = ? AND id = ?`,
      [await businessIdBySlug(orgId, business), orgId, cid],
    );
    const days = await rows<{ day: string }>(
      `SELECT DISTINCT s.day AS day FROM sales s JOIN sale_lines l ON l.sale_id = s.id JOIN items i ON i.id = l.item_id
        WHERE s.org_id = ? AND i.category_id = ? ORDER BY s.day`,
      [orgId, cid],
    );
    await reconcileDays(
      orgId,
      days.map((d) => d.day),
    );
    return { category, business };
  },
});
