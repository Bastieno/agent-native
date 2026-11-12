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

/** Queue every receipt image or PDF in a chat export, dated by its message. */
export async function queueChatExport(orgId: string, zip: Uint8Array) {
  const messages = readChatExport(zip);
  let queued = 0;
  let alreadyQueued = 0;
  for (const m of messages) {
    if (!m.attachment || !RECEIPT_TYPES.has(m.attachment.mimeType)) continue;
    const bytes = Buffer.from(m.attachment.dataBase64, "base64");
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
      [
        fileId,
        m.attachment.mimeType,
        m.attachment.dataBase64,
        bytes.length,
        at,
        orgId,
      ],
    );
    await run(
      `INSERT INTO pending_receipts (id, occurred_on, sent_at, receipt_file_id, image_hash, note, status, created_at, org_id, visibility) VALUES (?, ?, ?, ?, ?, ?, 'pending', ?, ?, 'org')`,
      [newId(), lagosDay(m.at), m.at, fileId, hash, m.text || null, at, orgId],
    );
    queued++;
  }
  return { messages: messages.length, queued, alreadyQueued };
}
