import { defineAction } from "@agent-native/core";
import { z } from "zod";
import { ownerOrg } from "../server/lib/access.js";
import { recordRepayment } from "../server/lib/loans.js";

export default defineAction({
  description:
    "Record money paid back on a loan the owner gave (code is the loan's Money out code, E-12). amount is in naira; full: true pays whatever is still owed. More than the balance is refused. The loan's status becomes part paid or paid. Repayments are not sales and never count as Money in. Owner only.",
  schema: z.object({
    code: z.string(),
    amount: z.number().positive().optional().describe("Naira"),
    full: z.boolean().optional(),
    paidOn: z.string().describe("YYYY-MM-DD"),
    note: z.string().optional(),
  }),
  run: async (input) => recordRepayment(await ownerOrg(), input),
});
