import { defineAction } from "@agent-native/core";
import { z } from "zod";
import { ownerOrg } from "../server/lib/access.js";
import { reconcileDays } from "../server/lib/reconcile-days.js";
import { NO_BUSINESS } from "../server/lib/setup.js";
import { rows, run } from "../server/lib/sql.js";

export default defineAction({
  description:
    "Confirm expenses waiting for review in one go: either the given codes, or every waiting expense in one group from list-review (its category and business; null means none). Owner only.",
  schema: z.object({
    codes: z.array(z.string()).optional(),
    group: z
      .object({
        category: z.string().nullable(),
        business: z.enum(["lounge", "hub"]).nullable(),
      })
      .optional(),
  }),
  run: async ({ codes, group }) => {
    if (!codes?.length && !group)
      throw new Error("Give the codes or a group to confirm.");
    if (group && !group.category)
      throw new Error(
        "These expenses have no category yet: choose one for each before confirming.",
      );
    const orgId = await ownerOrg();
    // Only filed expenses are confirmed: a category, and a business unless the
    // category belongs to none.
    const where: string[] = [
      "e.org_id = ?",
      "e.status = 'needs_review'",
      "e.category_id IS NOT NULL",
      `(e.business_id IS NOT NULL OR c.name IN (${NO_BUSINESS.map(() => "?").join(",")}))`,
    ];
    const args: unknown[] = [orgId, ...NO_BUSINESS];
    if (codes?.length) {
      where.push(`e.code IN (${codes.map(() => "?").join(",")})`);
      args.push(...codes);
    }
    if (group) {
      if (group.category) {
        where.push("c.name = ?");
        args.push(group.category);
      } else where.push("e.category_id IS NULL");
      if (group.business) {
        where.push("b.slug = ?");
        args.push(group.business);
      } else where.push("e.business_id IS NULL");
    }
    const found = await rows<{ id: string; occurred_on: string }>(
      `SELECT e.id, e.occurred_on FROM expenses e
         LEFT JOIN businesses b ON b.id = e.business_id
         LEFT JOIN expense_categories c ON c.id = e.category_id
        WHERE ${where.join(" AND ")}`,
      args,
    );
    for (const e of found)
      await run(
        `UPDATE expenses SET status = 'confirmed' WHERE org_id = ? AND id = ?`,
        [orgId, e.id],
      );
    await reconcileDays(orgId, [...new Set(found.map((e) => e.occurred_on))]);
    return { confirmed: found.length };
  },
});
