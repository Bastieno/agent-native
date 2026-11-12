import { defineAction } from "@agent-native/core";
import { z } from "zod";
import { ownerOrg } from "../server/lib/access.js";
import { expenseFields } from "../server/lib/action-fields.js";
import { createExpense } from "../server/lib/expenses.js";
import { toKobo } from "../server/lib/money.js";
import { fetchWhatsAppFile } from "../server/lib/whatsapp-files.js";

export default defineAction({
  description:
    "Record an expense you read from a receipt image or PDF. Pass confident: false if any field was a guess; it then waits in the owner's review queue. If it looks like an earlier expense, nothing is saved and duplicateOf names it.",
  schema: z.object({
    ...expenseFields,
    mediaId: z
      .string()
      .optional()
      .describe(
        "The receipt's WhatsApp mediaId, from the '[Attached image: …, mediaId …]' line",
      ),
    receipt: z
      .object({ mimeType: z.string(), dataBase64: z.string() })
      .optional()
      .describe(
        "The receipt file itself, when it was uploaded rather than sent on WhatsApp",
      ),
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
  run: async ({ amount, confident, lineItems, mediaId, receipt, ...rest }) => {
    const orgId = await ownerOrg();
    const file =
      receipt ?? (mediaId ? await fetchWhatsAppFile(mediaId) : undefined);
    if (!file)
      throw new Error("Pass the receipt's mediaId or the receipt file.");
    return createExpense(orgId, {
      ...rest,
      receipt: file,
      messageId: rest.messageId ?? mediaId,
      amount: toKobo(amount),
      lineItems: lineItems?.map((l) => ({
        name: l.name,
        amount: toKobo(l.amount),
      })),
      status: confident ? "confirmed" : "needs_review",
    });
  },
});
