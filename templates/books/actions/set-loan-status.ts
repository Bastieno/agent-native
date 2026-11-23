import { defineAction } from "@agent-native/core";
import { z } from "zod";
import { ownerOrg } from "../server/lib/access.js";
import { setNotALoan } from "../server/lib/loans.js";

export default defineAction({
  description:
    "Mark a Money out entry under Loans & repayments as not a loan the owner gave (for example the business paying back its own lender), so it leaves the Loans list; notALoan: false makes it a loan again. Paid and part paid come from repayments, not from here. Owner only.",
  schema: z.object({ code: z.string(), notALoan: z.boolean() }),
  run: async ({ code, notALoan }) =>
    setNotALoan(await ownerOrg(), code, notALoan),
});
