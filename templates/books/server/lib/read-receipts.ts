import { guessExpense } from "./expense-guess.js";
import { createExpense } from "./expenses.js";
import { readReceiptText } from "./receipt-text.js";
import { rows, run } from "./sql.js";

export interface ReceiptText {
  pendingReceiptId: string;
  /** Lines of text recognised on the receipt picture. */
  lines: string[];
}

export type ReceiptOutcome =
  | {
      pendingReceiptId: string;
      result: "recorded";
      code: string;
      category: string | null;
    }
  | { pendingReceiptId: string; result: "duplicate"; duplicateOf: string }
  | {
      pendingReceiptId: string;
      result: "not-an-expense";
      note: string | null;
      amount: number;
    }
  | { pendingReceiptId: string; result: "unreadable"; reason: string };

/**
 * Turns old pending receipts into needs_review expenses from the text read off
 * their pictures. What can't be read, or isn't a running cost, stays pending.
 */
export async function recordReceiptsFromText(
  orgId: string,
  items: ReceiptText[],
): Promise<ReceiptOutcome[]> {
  const out: ReceiptOutcome[] = [];
  for (const item of items) {
    const id = item.pendingReceiptId;
    const [p] = await rows(
      `SELECT occurred_on, receipt_file_id, image_hash, status FROM pending_receipts WHERE org_id = ? AND id = ?`,
      [orgId, id],
    );
    if (!p || p.status !== "pending") {
      out.push({
        pendingReceiptId: id,
        result: "unreadable",
        reason: "not a pending receipt",
      });
      continue;
    }
    const read = readReceiptText(item.lines, p.occurred_on);
    if ("reason" in read) {
      out.push({
        pendingReceiptId: id,
        result: "unreadable",
        reason: read.reason,
      });
      continue;
    }
    const r = read.receipt;
    const guess = guessExpense(r.note, r.kind);
    if (guess.notAnExpense) {
      out.push({
        pendingReceiptId: id,
        result: "not-an-expense",
        note: r.note,
        amount: r.amount,
      });
      continue;
    }
    const made = await createExpense(orgId, {
      occurredOn: r.date,
      vendor: r.payee ?? "Unknown",
      amount: r.amount * 100,
      business: guess.business ?? undefined,
      category: guess.category ?? undefined,
      paidWith: "transfer",
      note: [r.note, `Paid from ${r.account}`].filter(Boolean).join(" · "),
      status: "needs_review",
      source: "history",
      existingFile: { id: p.receipt_file_id, imageHash: p.image_hash },
    });
    if ("duplicateOf" in made) {
      out.push({
        pendingReceiptId: id,
        result: "duplicate",
        duplicateOf: made.duplicateOf,
      });
      continue;
    }
    await run(
      `UPDATE pending_receipts SET status = 'recorded', expense_code = ? WHERE org_id = ? AND id = ?`,
      [made.code, orgId, id],
    );
    out.push({
      pendingReceiptId: id,
      result: "recorded",
      code: made.code,
      category: guess.category,
    });
  }
  return out;
}
