import { defineAction } from "@agent-native/core";
import { z } from "zod";
import { memberOrg } from "../server/lib/access.js";
import { salesSummary } from "../server/lib/sales-query.js";

export default defineAction({
  description:
    "Completed sales for days start..end (inclusive): income by business and payment method, cost of goods by business, revenue with no known cost, and value given away (The House, Subscription Perk, Leakages). Amounts are kobo.",
  schema: z.object({
    start: z.string().describe("YYYY-MM-DD"),
    end: z.string().describe("YYYY-MM-DD, included"),
  }),
  http: { method: "GET" },
  run: async ({ start, end }) => salesSummary(await memberOrg(), start, end),
});
