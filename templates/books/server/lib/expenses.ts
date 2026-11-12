import { createHash } from "node:crypto";
import { businessIdBySlug } from "./catalog.js";
import { newId, nowIso } from "./ids.js";
import { reconcileDays } from "./reconcile-days.js";
import { num, rows, run } from "./sql.js";

export interface DuplicateCandidate {
  code: string;
  imageHash: string | null;
  vendor: string;
  amount: number;
  occurredOn: string;
}

const vendorKey = (v: string) => v.trim().toLowerCase().replace(/\s+/g, " ");

/** Same receipt image, or same vendor + amount + date. Returns the earlier expense's code. */
export function findDuplicate(
  candidate: Omit<DuplicateCandidate, "code">,
  existing: DuplicateCandidate[],
): string | null {
  for (const e of existing) {
    if (candidate.imageHash && e.imageHash === candidate.imageHash)
      return e.code;
    if (
      vendorKey(e.vendor) === vendorKey(candidate.vendor) &&
      e.amount === candidate.amount &&
      e.occurredOn === candidate.occurredOn
    )
      return e.code;
  }
  return null;
}

export async function expenseCategoryId(
  orgId: string,
  name: string,
): Promise<string> {
  const [c] = await rows(
    `SELECT id FROM expense_categories WHERE org_id = ? AND LOWER(name) = LOWER(?)`,
    [orgId, name.trim()],
  );
  if (!c) throw new Error(`Unknown expense category: ${name}`);
  return c.id;
}

async function nextCode(orgId: string): Promise<string> {
  const found = await rows<{ code: string }>(
    `SELECT code FROM expenses WHERE org_id = ?`,
    [orgId],
  );
  const max = found.reduce(
    (m, r) => Math.max(m, Number(r.code.replace(/^E-/, "")) || 0),
    0,
  );
  return `E-${max + 1}`;
}

export interface NewExpense {
  occurredOn: string;
  vendor: string;
  amount: number; // kobo
  business?: "lounge" | "hub";
  category?: string;
  paidWith?: "cash" | "transfer" | "card" | "unknown";
  note?: string;
  status: "confirmed" | "needs_review";
  source: "whatsapp" | "upload" | "history" | "app";
  receipt?: { mimeType: string; dataBase64: string };
  lineItems?: { name: string; amount: number }[];
  messageId?: string;
  confirmDuplicate?: boolean;
}

export async function createExpense(orgId: string, e: NewExpense) {
  const imageHash = e.receipt
    ? createHash("sha256")
        .update(Buffer.from(e.receipt.dataBase64, "base64"))
        .digest("hex")
    : null;
  if (!e.confirmDuplicate) {
    const existing = (
      await rows(
        `SELECT code, image_hash, vendor, amount, occurred_on FROM expenses WHERE org_id = ?`,
        [orgId],
      )
    ).map((r) => ({
      code: r.code,
      imageHash: r.image_hash ?? null,
      vendor: r.vendor,
      amount: num(r.amount),
      occurredOn: r.occurred_on,
    }));
    const twin = findDuplicate(
      {
        imageHash,
        vendor: e.vendor,
        amount: e.amount,
        occurredOn: e.occurredOn,
      },
      existing,
    );
    if (twin) return { duplicateOf: twin } as const;
  }
  const businessId = e.business
    ? await businessIdBySlug(orgId, e.business)
    : null;
  const categoryId = e.category
    ? await expenseCategoryId(orgId, e.category)
    : null;
  const at = nowIso();
  let receiptFileId: string | null = null;
  if (e.receipt) {
    receiptFileId = newId();
    await run(
      `INSERT INTO receipt_files (id, mime_type, data_base64, byte_size, created_at, org_id, visibility) VALUES (?, ?, ?, ?, ?, ?, 'org')`,
      [
        receiptFileId,
        e.receipt.mimeType,
        e.receipt.dataBase64,
        Buffer.from(e.receipt.dataBase64, "base64").length,
        at,
        orgId,
      ],
    );
  }
  const code = await nextCode(orgId);
  await run(
    `INSERT INTO expenses (id, code, occurred_on, vendor, amount, business_id, category_id, paid_with, status, receipt_file_id, image_hash, raw_text, line_items, source, message_id, created_at, org_id, visibility)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'org')`,
    [
      newId(),
      code,
      e.occurredOn,
      e.vendor.trim(),
      e.amount,
      businessId,
      categoryId,
      e.paidWith ?? "unknown",
      e.status,
      receiptFileId,
      imageHash,
      e.note ?? null,
      e.lineItems ? JSON.stringify(e.lineItems) : null,
      e.source,
      e.messageId ?? null,
      at,
      orgId,
    ],
  );
  await reconcileDays(orgId, [e.occurredOn]);
  return { code, status: e.status } as const;
}
