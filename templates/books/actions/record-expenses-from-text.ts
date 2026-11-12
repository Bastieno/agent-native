import { defineAction } from "@agent-native/core";
import { z } from "zod";
import { ownerOrg } from "../server/lib/access.js";
import { recordReceiptsFromText } from "../server/lib/read-receipts.js";

export default defineAction({
  description:
    "Record old pending receipts from the text read off their pictures (bank transfer slips from Moniepoint or Opay). Each becomes an expense waiting for the owner's review, with a guessed category and business. Slips it can't read, and payments that aren't running costs (loans, profit payouts, commissions), stay pending and are reported back.",
  schema: z.object({
    receipts: z
      .array(
        z.object({
          pendingReceiptId: z.string(),
          lines: z.array(z.string()),
        }),
      )
      .max(100),
  }),
  run: async ({ receipts }) => {
    const orgId = await ownerOrg();
    const outcomes = await recordReceiptsFromText(orgId, receipts);
    const count = (r: string) => outcomes.filter((o) => o.result === r).length;
    return {
      recorded: count("recorded"),
      duplicates: count("duplicate"),
      notExpenses: count("not-an-expense"),
      unreadable: count("unreadable"),
      outcomes,
    };
  },
});
