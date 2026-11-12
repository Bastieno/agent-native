import { createHash } from "node:crypto";
import { readChatExport } from "./chat-export.js";
import { newId, nowIso } from "./ids.js";
import { lagosDay } from "./lagos-time.js";
import { rows, run } from "./sql.js";

const RECEIPT_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "application/pdf",
]);

export const RECEIPT_MIME_TYPES = RECEIPT_TYPES;

export interface HistoryReceipt {
  sentAt: string; // ISO instant the message was sent
  note: string | null;
  fileName: string;
  mimeType: string;
  dataBase64: string;
}

/** Queue old receipts, skipping any already queued or recorded. */
export async function queueReceipts(orgId: string, receipts: HistoryReceipt[]) {
  let queued = 0;
  let alreadyQueued = 0;
  for (const r of receipts) {
    if (!RECEIPT_TYPES.has(r.mimeType))
      throw new Error("Only images and PDFs can be receipts.");
    const bytes = Buffer.from(r.dataBase64, "base64");
    const hash = createHash("sha256").update(bytes).digest("hex");
    const seen = await rows(
      `SELECT id FROM pending_receipts WHERE org_id = ? AND image_hash = ? UNION SELECT id FROM expenses WHERE org_id = ? AND image_hash = ?`,
      [orgId, hash, orgId, hash],
    );
    if (seen.length) {
      alreadyQueued++;
      continue;
    }
    const at = nowIso();
    const fileId = newId();
    await run(
      `INSERT INTO receipt_files (id, mime_type, data_base64, byte_size, created_at, org_id, visibility) VALUES (?, ?, ?, ?, ?, ?, 'org')`,
      [fileId, r.mimeType, r.dataBase64, bytes.length, at, orgId],
    );
    await run(
      `INSERT INTO pending_receipts (id, occurred_on, sent_at, receipt_file_id, image_hash, note, status, created_at, org_id, visibility) VALUES (?, ?, ?, ?, ?, ?, 'pending', ?, ?, 'org')`,
      [
        newId(),
        lagosDay(r.sentAt),
        r.sentAt,
        fileId,
        hash,
        r.note || null,
        at,
        orgId,
      ],
    );
    queued++;
  }
  return { queued, alreadyQueued };
}

/** Queue every receipt image or PDF in a chat export, dated by its message. */
export async function queueChatExport(orgId: string, zip: Uint8Array) {
  const messages = readChatExport(zip);
  const receipts = messages
    .filter((m) => m.attachment && RECEIPT_TYPES.has(m.attachment.mimeType))
    .map((m) => ({ sentAt: m.at, note: m.text || null, ...m.attachment! }));
  return {
    messages: messages.length,
    ...(await queueReceipts(orgId, receipts)),
  };
}
