import { defineAction } from "@agent-native/core";
import { z } from "zod";
import { ownerOrg } from "../server/lib/access.js";
import { expenseFields } from "../server/lib/action-fields.js";
import { createExpense } from "../server/lib/expenses.js";
import { toKobo } from "../server/lib/money.js";
import { rows, run } from "../server/lib/sql.js";
import { fetchWhatsAppFile } from "../server/lib/whatsapp-files.js";

export default defineAction({
  description:
    "Record an expense you read from a receipt image or PDF. Identify the receipt by its WhatsApp mediaId, a pendingReceiptId from list-pending-receipts, or the file itself. Pass confident: false if any field was a guess; it then waits in the owner's review queue. If it looks like an earlier expense, nothing is saved and duplicateOf names it.",
  schema: z.object({
    ...expenseFields,
    occurredOn: expenseFields.occurredOn
      .optional()
      .describe(
        "Date on the receipt, YYYY-MM-DD. For a pending receipt, defaults to the day it was sent.",
      ),
    mediaId: z
      .string()
      .optional()
      .describe(
        "The receipt's WhatsApp mediaId, from the '[Attached image: …, mediaId …]' line",
      ),
    pendingReceiptId: z
      .string()
      .optional()
      .describe("An old receipt from list-pending-receipts"),
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
  run: async ({
    amount,
    confident,
    lineItems,
    mediaId,
    pendingReceiptId,
    receipt,
    occurredOn,
    ...rest
  }) => {
    const orgId = await ownerOrg();
    let file = receipt;
    let existingFile: { id: string; imageHash: string } | undefined;
    let day = occurredOn;
    let source = rest.source;
    if (pendingReceiptId) {
      const [p] = await rows(
        `SELECT occurred_on, receipt_file_id, image_hash, status FROM pending_receipts WHERE org_id = ? AND id = ?`,
        [orgId, pendingReceiptId],
      );
      if (!p) throw new Error("No such pending receipt.");
      if (p.status !== "pending")
        throw new Error("That receipt has already been recorded.");
      existingFile = { id: p.receipt_file_id, imageHash: p.image_hash };
      day ??= p.occurred_on;
      source = "history";
    } else if (!file && mediaId) {
      file = await fetchWhatsAppFile(mediaId);
    }
    if (!file && !existingFile)
      throw new Error(
        "Pass the receipt's mediaId, a pendingReceiptId or the receipt file.",
      );
    if (!day) throw new Error("Which day is this receipt from?");
    const result = await createExpense(orgId, {
      ...rest,
      source,
      occurredOn: day,
      receipt: file,
      existingFile,
      messageId: rest.messageId ?? mediaId,
      amount: toKobo(amount),
      lineItems: lineItems?.map((l) => ({
        name: l.name,
        amount: toKobo(l.amount),
      })),
      status: confident ? "confirmed" : "needs_review",
    });
    if (pendingReceiptId && "code" in result) {
      await run(
        `UPDATE pending_receipts SET status = 'recorded', expense_code = ? WHERE org_id = ? AND id = ?`,
        [result.code, orgId, pendingReceiptId],
      );
    }
    return result;
  },
});
