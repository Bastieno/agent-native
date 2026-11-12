import { defineAction } from "@agent-native/core";
import { z } from "zod";
import { memberOrg } from "../server/lib/access.js";
import { reconcileOne } from "../server/lib/reconcile-days.js";

export default defineAction({
  description:
    "Reconcile one day: income by business and method, gross profit, cash in the till, value given away, expenses, and flags (missing transfers, split payments that don't add up, files that disagree, large or spiking expenses). Amounts are kobo.",
  schema: z.object({ day: z.string().describe("YYYY-MM-DD") }),
  run: async ({ day }) => reconcileOne(await memberOrg(), day),
});
