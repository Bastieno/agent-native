import { defineAction } from "@agent-native/core";
import { z } from "zod";
import { currentRole, memberOrg } from "../server/lib/access.js";
import { listLoans } from "../server/lib/loans.js";

export default defineAction({
  description:
    "Loans the owner gave out: every Money out entry filed under Loans & repayments (borrower = payee). Each has its amount, what has been repaid, the balance, its repayments and a status: outstanding, part_paid, paid, or not_a_loan (marked as the business paying back a lender). status: owed (default: outstanding and part paid), paid, not_a_loan or all. Totals are over every loan given. Amounts are kobo.",
  schema: z.object({
    status: z.enum(["owed", "paid", "not_a_loan", "all"]).optional(),
  }),
  http: { method: "GET" },
  run: async ({ status }) => {
    const found = await listLoans(await memberOrg(), status ?? "owed");
    const role = await currentRole();
    return { ...found, canEdit: role === "owner" || role === "admin" };
  },
});
