import { defineAction } from "@agent-native/core";
import { z } from "zod";
import { memberOrg } from "../server/lib/access.js";
import { rows } from "../server/lib/sql.js";

export default defineAction({
  description:
    "Items that have been sold but have no category, items whose category is an unconfirmed guess, and categories with no business. Call after any import.",
  schema: z.object({}),
  http: { method: "GET" },
  run: async () => {
    const orgId = await memberOrg();
    const sold = `EXISTS (SELECT 1 FROM sale_lines l WHERE l.item_id = i.id)`;
    const uncategorised = await rows<{ name: string }>(
      `SELECT i.name FROM items i WHERE i.org_id = ? AND i.category_id IS NULL AND ${sold} ORDER BY i.name`,
      [orgId],
    );
    const unconfirmed = await rows<{ name: string }>(
      `SELECT i.name FROM items i WHERE i.org_id = ? AND i.category_id IS NOT NULL AND i.confirmed = 0 ORDER BY i.name`,
      [orgId],
    );
    const unmapped = await rows<{ name: string }>(
      `SELECT name FROM item_categories WHERE org_id = ? AND business_id IS NULL ORDER BY name`,
      [orgId],
    );
    return {
      uncategorised: uncategorised.map((r) => r.name),
      unconfirmed: unconfirmed.map((r) => r.name),
      unmappedCategories: unmapped.map((r) => r.name),
    };
  },
});
