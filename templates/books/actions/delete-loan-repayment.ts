import { defineAction } from "@agent-native/core";
import { z } from "zod";
import { ownerOrg } from "../server/lib/access.js";
import { deleteRepayment } from "../server/lib/loans.js";

export default defineAction({
  description:
    "Remove a loan repayment entered by mistake (its id from list-loans). The loan's balance and status follow. Owner only.",
  schema: z.object({ id: z.string() }),
  run: async ({ id }) => deleteRepayment(await ownerOrg(), id),
});
