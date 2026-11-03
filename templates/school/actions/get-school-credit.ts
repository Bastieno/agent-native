import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { z } from "zod";
import { creditStatus, ledgerFor } from "../server/lib/credits.js";
import { ccToCredits } from "../shared/credits.js";

/**
 * The school's assistant credit: whether it runs on Ellai's credit or its own
 * key, what is left, and the history of top-ups and use. The balance is worked
 * out from the same recorded runs as `get-school-usage`, plus Ellai's margin.
 */
export default defineAction({
  description:
    "The school's assistant credit: whether the assistant runs on Ellai's credit or the school's own key, how many credits are left (and roughly how many staff requests that is), whether it is low, and recent top-ups and use. Use it for 'how much credit do we have left?' or 'will it last the term?'. Admin only.",
  schema: z.object({
    history: z.coerce.number().int().min(0).max(100).default(15),
  }),
  http: { method: "GET" },
  run: async ({ history }) => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const status = await creditStatus(orgId);
    const entries =
      status.mode === "none" ? [] : await ledgerFor(orgId, history);
    return {
      mode: status.mode,
      credits: status.credits,
      staffRequests: status.staffRequests,
      low: status.low,
      // How to pay, in the operator's words (bank details and the reference to use).
      payInstructions: process.env.ELLAI_TOPUP_INSTRUCTIONS?.trim() || null,
      out: status.out,
      history: entries.map((e) => ({
        kind: e.kind,
        credits: ccToCredits(Math.abs(e.amountCc)) * (e.amountCc < 0 ? -1 : 1),
        at: e.createdAt,
        note: e.note,
        reference: e.paymentRef,
      })),
    };
  },
});
