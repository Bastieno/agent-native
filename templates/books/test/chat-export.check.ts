import assert from "node:assert/strict";
import { zipSync, strToU8 } from "fflate";
import { bootBooks, check, finish } from "./helpers.js";
import { readChatExport } from "../server/lib/chat-export.js";

const ios = zipSync({
  "_chat.txt": strToU8(
    [
      "[09/11/2026, 14:03:22] Owner: <attached: 00000012-PHOTO-2026-11-09-14-03-22.jpg>",
      "[09/11/2026, 14:05:01] Owner: diesel for the hub",
      "[10/11/2026, 09:12:45] Owner: Shoprite run",
      "<attached: 00000013-PHOTO-2026-11-10-09-12-45.jpg>",
      "[10/11/2026, 09:20:00] Owner: <attached: 00000014-receipt.pdf>",
    ].join("\n"),
  ),
  "00000012-PHOTO-2026-11-09-14-03-22.jpg": new Uint8Array([1, 2, 3]),
  "00000013-PHOTO-2026-11-10-09-12-45.jpg": new Uint8Array([4, 5]),
  "00000014-receipt.pdf": new Uint8Array([6]),
});
const android = zipSync({
  "WhatsApp Chat with Receipts.txt": strToU8(
    [
      "09/11/2026, 14:03 - Owner: IMG-20261109-WA0001.jpg (file attached)",
      "09/11/2026, 14:05 - Owner: gateman 5000",
    ].join("\n"),
  ),
  "IMG-20261109-WA0001.jpg": new Uint8Array([7, 8]),
});

check("ios messages and attachments", () => {
  const m = readChatExport(ios);
  assert.equal(m.length, 4);
  const withFiles = m.filter((x) => x.attachment);
  assert.equal(withFiles.length, 3);
  assert.equal(withFiles[0].at, "2026-11-09T13:03:22.000Z");
  assert.equal(withFiles[0].attachment!.mimeType, "image/jpeg");
  assert.equal(withFiles[1].text, "Shoprite run");
  assert.equal(withFiles[2].attachment!.mimeType, "application/pdf");
});
check("android messages and attachments", () => {
  const m = readChatExport(android);
  assert.equal(m.length, 2);
  assert.equal(m[0].attachment!.fileName, "IMG-20261109-WA0001.jpg");
  assert.equal(m[0].at, "2026-11-09T13:03:00.000Z");
  assert.equal(m[1].text, "gateman 5000");
});

const { asOwner, query } = await bootBooks("check-chat-export");
const importHistory = (await import("../actions/import-whatsapp-history.js"))
  .default;
const listPending = (await import("../actions/list-pending-receipts.js"))
  .default;
const fromReceipt = (await import("../actions/record-expense-from-receipt.js"))
  .default;

await check("queued as pending receipts with their dates", async () => {
  const r = await asOwner(() =>
    importHistory.run({ zipBase64: Buffer.from(ios).toString("base64") }),
  );
  assert.equal(r.queued, 3);
  const p = await asOwner(() => listPending.run({}));
  assert.deepEqual(
    p.receipts.map((x: any) => x.occurredOn),
    ["2026-11-09", "2026-11-10", "2026-11-10"],
  );
});
await check("reimport skips what was queued", async () => {
  const r = await asOwner(() =>
    importHistory.run({ zipBase64: Buffer.from(ios).toString("base64") }),
  );
  assert.equal(r.queued, 0);
  assert.equal(r.alreadyQueued, 3);
});
await check("a pending receipt becomes an expense", async () => {
  const [first] = (await asOwner(() => listPending.run({}))).receipts;
  const e = await asOwner(() =>
    fromReceipt.run({
      pendingReceiptId: first.id,
      vendor: "Total",
      amount: 45000,
      business: "hub",
      category: "Diesel / power",
      confident: true,
    }),
  );
  assert.equal(e.code, "E-1");
  const [row] = await query(
    `SELECT occurred_on, source FROM expenses WHERE code = 'E-1'`,
  );
  assert.equal(row.occurred_on, "2026-11-09");
  assert.equal(row.source, "history");
  assert.equal((await asOwner(() => listPending.run({}))).receipts.length, 2);
});
await check("receipts arrive in small batches", async () => {
  const queue = (await import("../actions/queue-history-receipts.js")).default;
  const receipt = (n: number) => ({
    sentAt: `2026-11-0${n}T10:00:00.000Z`,
    note: null,
    fileName: `r${n}.jpg`,
    mimeType: "image/jpeg",
    dataBase64: Buffer.from(`receipt ${n}`).toString("base64"),
  });
  const r = await asOwner(() =>
    queue.run({ receipts: [receipt(1), receipt(2)] }),
  );
  assert.equal(r.queued, 2);
  assert.equal(
    (await asOwner(() => queue.run({ receipts: [receipt(1)] }))).alreadyQueued,
    1,
  );
  await assert.rejects(() =>
    asOwner(() =>
      queue.run({
        receipts: Array.from({ length: 11 }, (_, i) => receipt((i % 9) + 1)),
      }),
    ),
  );
  await assert.rejects(
    () =>
      asOwner(() =>
        queue.run({ receipts: [{ ...receipt(3), mimeType: "text/html" }] }),
      ),
    /Only images and PDFs/,
  );
});
await check("the export reader runs without Node's Buffer", async () => {
  const src = (await import("node:fs")).readFileSync(
    "shared/chat-export.ts",
    "utf8",
  );
  assert.doesNotMatch(src, /Buffer\./);
});
await finish();
