import { defineAction } from "@agent-native/core";
import { z } from "zod";
import { STOCK_KEYS, type StockKey } from "../shared/stock-groups.js";
import { ownerOrg } from "../server/lib/access.js";
import { setStockSplit } from "../server/lib/stock-groups.js";

const key = z.enum(STOCK_KEYS as [StockKey, ...StockKey[]]);

export default defineAction({
  description:
    "File a stock purchase (Food & drink stock or a manager float, by code E-12) under the Lounge's menu groups: `group` for all of it (water, soft, energy, beer, bitters, liquor, meals, shawarma, shared, unsorted), or `parts` with amounts in naira adding up to what was paid. Empty `parts` goes back to reading it from the note. Owner only.",
  schema: z.object({
    code: z.string(),
    group: key.optional(),
    parts: z
      .array(z.object({ group: key, amount: z.number().nonnegative() }))
      .optional(),
  }),
  run: async ({ code, group, parts }) =>
    setStockSplit(await ownerOrg(), code, { group, parts }),
});
