import { defineAction } from "@agent-native/core";
import { z } from "zod";
import { ownerOrg } from "../server/lib/access.js";
import { buildDigest } from "../server/lib/digests.js";
import { periodBounds } from "../server/lib/lagos-time.js";

export default defineAction({
  description:
    "Work out a digest's figures and save it as a draft: income, cost of goods, gross profit, expenses and net per business; cash in the till; value given away; checks; sellers; and trends (figures.trends: 'good' and 'watch' signals). Without start/end, daily/weekly/monthly cover the period that just ended. Quote only these figures.",
  schema: z.object({
    period: z.enum(["daily", "weekly", "monthly", "range"]),
    start: z.string().optional().describe("YYYY-MM-DD"),
    end: z.string().optional().describe("YYYY-MM-DD, included"),
  }),
  run: async ({ period, start, end }) => {
    const orgId = await ownerOrg();
    let s = start;
    let e = end;
    if (!s || !e) {
      if (period === "range") throw new Error("A range needs start and end.");
      ({ start: s, end: e } = periodBounds(period, new Date()));
    }
    return buildDigest(orgId, period, s, e);
  },
});
