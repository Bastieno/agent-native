import assert from "node:assert/strict";
import { bootBooks, check, finish } from "./helpers.js";

const { asOwner, asPartner, query } = await bootBooks("check-read-receipts");
const queue = (await import("../actions/queue-history-receipts.js")).default;
const listPending = (await import("../actions/list-pending-receipts.js"))
  .default;
const fromText = (await import("../actions/record-expenses-from-text.js"))
  .default;

const slip = (amount: string, narration: string, weekday: string) => [
  "Moniepoint",
  "DEBIT",
  amount,
  "Transaction Type",
  "TRANSFER",
  "Transaction Status",
  "Successful",
  "Beneficiary",
  "ADA OKORO 0123456789",
  "Business Name",
  "ACME LTD",
  "Transaction Date",
  `${weekday}, November 11th, 2026 | 9:05 AM`,
  "Narration",
  narration,
];
const receipt = (n: number) => ({
  sentAt: "2026-11-11T09:30:00.000Z",
  note: null,
  fileName: `r${n}.jpg`,
  mimeType: "image/jpeg",
  dataBase64: Buffer.from(`receipt ${n}`).toString("base64"),
});

await asOwner(() => queue.run({ receipts: [1, 2, 3, 4].map(receipt) }));
const ids: string[] = (await asOwner(() => listPending.run({}))).receipts.map(
  (r: any) => r.id,
);

await check("records readable slips as needs_review with a guess", async () => {
  const r = await asOwner(() =>
    fromText.run({
      receipts: [
        {
          pendingReceiptId: ids[0],
          lines: slip("N23,000.00", "5 packs of chicken", "Wednesday"),
        },
        {
          pendingReceiptId: ids[1],
          lines: slip("N500,000.00", "Part payment for loan", "Wednesday"),
        },
        { pendingReceiptId: ids[2], lines: ["a photo of a plate of rice"] },
      ],
    }),
  );
  assert.deepEqual(
    [r.recorded, r.notExpenses, r.unreadable, r.duplicates],
    [1, 1, 1, 0],
  );
  const [e] = await query(
    `SELECT e.vendor, e.amount, e.status, e.source, e.occurred_on, e.paid_with, c.name AS category, b.slug AS business
     FROM expenses e JOIN expense_categories c ON c.id = e.category_id JOIN businesses b ON b.id = e.business_id`,
  );
  assert.equal(e.vendor, "ADA OKORO 0123456789");
  assert.equal(Number(e.amount), 2_300_000);
  assert.equal(e.status, "needs_review");
  assert.equal(e.source, "history");
  assert.equal(e.occurred_on, "2026-11-11");
  assert.equal(e.paid_with, "transfer");
  assert.equal(e.category, "Food & drink stock");
  assert.equal(e.business, "lounge");
});

await check("what was not recorded stays pending", async () => {
  const left = (await asOwner(() => listPending.run({}))).receipts;
  assert.equal(left.length, 3);
});

await check(
  "a category that can't be guessed is left blank for review",
  async () => {
    const r = await asOwner(() =>
      fromText.run({
        receipts: [
          {
            pendingReceiptId: ids[3],
            lines: slip("N4,000.00", "zzz", "Wednesday"),
          },
        ],
      }),
    );
    assert.equal(r.recorded, 1);
    const [e] = await query(
      `SELECT category_id, business_id FROM expenses WHERE amount = 400000`,
    );
    assert.equal(e.category_id, null);
    assert.equal(e.business_id, null);
  },
);

await check(
  "the same slip twice is a duplicate, not a second expense",
  async () => {
    await asOwner(() => queue.run({ receipts: [receipt(5)] }));
    const again = (await asOwner(() => listPending.run({}))).receipts.find(
      (r: any) => !ids.includes(r.id),
    );
    const r = await asOwner(() =>
      fromText.run({
        receipts: [
          {
            pendingReceiptId: again.id,
            lines: slip("N4,000.00", "zzz", "Wednesday"),
          },
        ],
      }),
    );
    assert.equal(r.duplicates, 1);
    assert.equal(r.recorded, 0);
  },
);

await check("an already-recorded receipt is refused", async () => {
  const r = await asOwner(() =>
    fromText.run({
      receipts: [
        {
          pendingReceiptId: ids[0],
          lines: slip("N23,000.00", "chicken", "Wednesday"),
        },
      ],
    }),
  );
  assert.equal(r.outcomes[0].result, "unreadable");
});

await check("the partner can't record from text", async () => {
  const { guardActions } = await import("../server/lib/action-policy.js");
  const guarded = guardActions({
    "record-expenses-from-text": fromText,
  } as any);
  await assert.rejects(
    () =>
      asPartner(() =>
        guarded["record-expenses-from-text"].run({ receipts: [] }),
      ),
    /Only the owner can change Books\./,
  );
});

await finish();
