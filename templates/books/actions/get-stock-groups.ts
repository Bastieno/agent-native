import { defineAction } from "@agent-native/core";
import { z } from "zod";
import { memberOrg } from "../server/lib/access.js";
import { stockGroups } from "../server/lib/stock-groups.js";

export default defineAction({
  description:
    "Lounge menu groups (Water, Soft drinks, Energy drinks, Beer, Bitters, Liquors, Meals, Shawarma) for days start..end (inclusive): each group's sales, the stock bought for it and the difference; Shared (nylon, serviette, transport) and Not sorted (stock that could not be placed, floats included) as their own lines; and how many purchases' note lines don't add up to what was paid. Stock is split from each purchase's note unless the owner set a split. Amounts are kobo.",
  schema: z.object({
    start: z.string().describe("YYYY-MM-DD"),
    end: z.string().describe("YYYY-MM-DD, included"),
  }),
  http: { method: "GET" },
  run: async ({ start, end }) => stockGroups(await memberOrg(), start, end),
});
