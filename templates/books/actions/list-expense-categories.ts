import { offeredCategories } from "../server/lib/setup.js";
import { defineAction } from "@agent-native/core";
import { z } from "zod";
import { memberOrg } from "../server/lib/access.js";
import { rows } from "../server/lib/sql.js";

export default defineAction({
  description:
    "The expense categories to choose from when recording an expense.",
  schema: z.object({}),
  http: { method: "GET" },
  run: async () => {
    const orgId = await memberOrg();
    const found = await rows<{ name: string }>(
      `SELECT name FROM expense_categories WHERE org_id = ? ORDER BY sort`,
      [orgId],
    ).then((found) =>
      // Retired categories are kept for old data but not offered; the kinds
      // of owner's pay follow Owner's pay.
      offeredCategories(found.map((c) => String(c.name))).map((name) => ({
        name,
      })),
    );
    return { categories: found.map((c) => c.name) };
  },
});
