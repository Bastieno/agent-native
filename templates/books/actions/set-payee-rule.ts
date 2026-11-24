import { defineAction } from "@agent-native/core";
import { z } from "zod";
import { ownerOrg } from "../server/lib/access.js";
import { toKobo } from "../server/lib/money.js";
import { savePayeeRule } from "../server/lib/payee-rules.js";

export default defineAction({
  description:
    "Remember what money to a payee is for. When old receipts are read, a transfer to this payee (at or above minAmount, if given) is filed under this category instead of guessed from its note. Use it for people who move money for you, loan repayments, the owner's dollar purchases (Owner's pay). Replaces any earlier rule for the same payee.",
  schema: z.object({
    payee: z.string().describe("The payee's name, as on the transfer"),
    category: z.string().describe("Expense category name"),
    business: z.enum(["lounge", "hub", "both"]).optional(),
    minAmount: z
      .number()
      .positive()
      .optional()
      .describe("Naira. Only transfers at or above this follow the rule."),
  }),
  run: async ({ payee, category, business, minAmount }) =>
    savePayeeRule(await ownerOrg(), {
      payee,
      category,
      business,
      minAmount: minAmount == null ? undefined : toKobo(minAmount),
    }),
});
