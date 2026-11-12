import { defineAction } from "@agent-native/core";
import { z } from "zod";
import { ownerOrg } from "../server/lib/access.js";
import { expenseFields } from "../server/lib/action-fields.js";
import { createExpense } from "../server/lib/expenses.js";
import { toKobo } from "../server/lib/money.js";

export default defineAction({
  description:
    "Record an expense you read from a receipt image or PDF. Pass confident: false if any field was a guess; it then waits in the owner's review queue. If it looks like an earlier expense, nothing is saved and duplicateOf names it.",
  schema: z.object({
    ...expenseFields,
    receipt: z
      .object({ mimeType: z.string(), dataBase64: z.string() })
      .describe("The receipt file"),
    confident: z
      .boolean()
      .describe(
        "True only if vendor, date, amount, business and category are all clear",
      ),
    lineItems: z
      .array(z.object({ name: z.string(), amount: z.number() }))
      .optional(),
    source: z.enum(["whatsapp", "upload", "history"]).default("whatsapp"),
    messageId: z.string().optional(),
  }),
  run: async ({ amount, confident, lineItems, ...rest }) => {
    const orgId = await ownerOrg();
    return createExpense(orgId, {
      ...rest,
      amount: toKobo(amount),
      lineItems: lineItems?.map((l) => ({
        name: l.name,
        amount: toKobo(l.amount),
      })),
      status: confident ? "confirmed" : "needs_review",
    });
  },
});
