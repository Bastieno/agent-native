import { defineAction } from "@agent-native/core";
import { z } from "zod";
import { ownerOrg } from "../server/lib/access.js";
import { expenseFields } from "../server/lib/action-fields.js";
import { createExpense } from "../server/lib/expenses.js";
import { toKobo } from "../server/lib/money.js";

export default defineAction({
  description:
    "Record an expense with no receipt image, e.g. from a short note like 'gateman 5000 cash'. If it looks like an earlier expense, nothing is saved and duplicateOf names it: ask the owner, then resend with confirmDuplicate.",
  schema: z.object(expenseFields),
  run: async ({ amount, confirmDuplicate, ...rest }) => {
    const orgId = await ownerOrg();
    return createExpense(orgId, {
      ...rest,
      amount: toKobo(amount),
      confirmDuplicate,
      status: "confirmed",
      source: "app",
    });
  },
});
