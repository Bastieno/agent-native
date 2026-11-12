import assert from "node:assert/strict";
import { bootBooks, check, finish, fixture, ORG, OWNER } from "./helpers.js";

const { asOwner, query, exec } = await bootBooks("check-whatsapp-books");
const { normaliseNumber, beforeBooksMessage, ownerForMessage } =
  await import("../server/lib/whatsapp-books.js");
const { setAttachmentFetcherForChecks } =
  await import("../server/lib/whatsapp-files.js");
const fromWhatsApp = (await import("../actions/import-sales-from-whatsapp.js"))
  .default;

await exec.execute({
  sql: `UPDATE books_settings SET allowed_numbers = ? WHERE org_id = ?`,
  args: [JSON.stringify({ "2348030000000": OWNER }), ORG],
});
const msg = (senderId: string) =>
  ({
    platform: "whatsapp",
    externalThreadId: senderId,
    text: "hi",
    senderId,
    platformContext: {},
    timestamp: 0,
  }) as any;

await check("numbers normalised", () => {
  assert.equal(normaliseNumber("0803 000 0000"), "2348030000000");
  assert.equal(normaliseNumber("+234 803 000 0000"), "2348030000000");
  assert.equal(normaliseNumber("2348030000000"), "2348030000000");
});
await check("stranger ignored", async () => {
  const r = await beforeBooksMessage(msg("2349999999999"));
  assert.deepEqual(r, { handled: true });
  assert.equal((await query(`SELECT id FROM expenses`)).length, 0);
});
await check("allowed number passes to the agent as the owner", async () => {
  assert.deepEqual(await beforeBooksMessage(msg("2348030000000")), {
    handled: false,
  });
  assert.equal(await ownerForMessage(msg("2348030000000")), OWNER);
});
const files: Record<string, string> = {
  SALES: fixture("sales-sample.csv"),
  PAY: fixture("payment-method-sample.csv"),
  JUNK: "a,b\n1,2\n",
};
setAttachmentFetcherForChecks(async (mediaId: string) => ({
  mimeType: "text/csv",
  dataBase64: Buffer.from(files[mediaId]).toString("base64"),
}));
await check("import from whatsapp media", async () => {
  const s = await asOwner(() =>
    fromWhatsApp.run({
      mediaId: "SALES",
      fileName: "sales-summary2026-11-10-2026-11-01.csv",
    }),
  );
  assert.equal(s.kind, "sales-summary");
  assert.equal(s.added, 175);
  const p = await asOwner(() =>
    fromWhatsApp.run({
      mediaId: "PAY",
      fileName: "payment-method-report-2026-11-01-2026-11-10.csv",
    }),
  );
  assert.equal(p.kind, "payment-method");
  assert.equal(p.check.agrees, true);
  const [imp] = await query(
    `SELECT received_via FROM imports WHERE kind = 'payment-method'`,
  );
  assert.equal(imp.received_via, "whatsapp");
});
await check("receipt by media id", async () => {
  files.RECEIPT = "jpeg bytes";
  const fromReceipt = (
    await import("../actions/record-expense-from-receipt.js")
  ).default;
  const r = await asOwner(() =>
    fromReceipt.run({
      occurredOn: "2026-11-09",
      vendor: "Total",
      amount: 45000,
      business: "hub",
      category: "Diesel / power",
      mediaId: "RECEIPT",
      confident: true,
    }),
  );
  assert.equal(r.code, "E-1");
  const [row] = await query(
    `SELECT f.byte_size, e.message_id FROM expenses e JOIN receipt_files f ON f.id = e.receipt_file_id`,
  );
  assert.equal(Number(row.byte_size), 10);
  assert.equal(row.message_id, "RECEIPT");
});
await check("unknown file rejected", async () => {
  await assert.rejects(
    () =>
      asOwner(() => fromWhatsApp.run({ mediaId: "JUNK", fileName: "x.csv" })),
    {
      message:
        "This doesn't look like a Moniebook sales summary, payment method or item report.",
    },
  );
});
await check(
  "a number mapped to someone outside the org is ignored",
  async () => {
    await exec.execute({
      sql: `UPDATE books_settings SET allowed_numbers = ? WHERE org_id = ?`,
      args: [
        JSON.stringify({
          "2348030000000": OWNER,
          "2347000000000": "outsider@else.test",
        }),
        ORG,
      ],
    });
    assert.deepEqual(await beforeBooksMessage(msg("2347000000000")), {
      handled: true,
    });
    assert.deepEqual(await beforeBooksMessage(msg("2348030000000")), {
      handled: false,
    });
  },
);
await check("a number claimed by two orgs is ignored", async () => {
  await exec.execute({
    sql: `INSERT INTO books_settings (org_id, thresholds, recipients, allowed_numbers, reminders, created_at) VALUES ('org2', '{}', '[]', ?, '{}', 'x')`,
    args: [JSON.stringify({ "2348030000000": "intruder@org2.test" })],
  });
  await exec.execute({
    sql: `INSERT INTO org_members (id, org_id, email, role, joined_at) VALUES ('m9', 'org2', 'intruder@org2.test', 'owner', 0)`,
    args: [],
  });
  assert.deepEqual(await beforeBooksMessage(msg("2348030000000")), {
    handled: true,
  });
});
await check(
  "settings refuse outsiders and numbers another org uses",
  async () => {
    const updateSettings = (await import("../actions/update-settings.js"))
      .default;
    await assert.rejects(
      () =>
        asOwner(() =>
          updateSettings.run({
            people: [
              {
                name: "X",
                email: "outsider@else.test",
                whatsapp: "07000000001",
                role: "partner",
              },
            ],
          }),
        ),
      /outsider@else\.test isn't a member of this Books workspace/,
    );
    await assert.rejects(
      () =>
        asOwner(() =>
          updateSettings.run({
            people: [
              {
                name: "Me",
                email: OWNER,
                whatsapp: "08030000000",
                role: "owner",
              },
            ],
          }),
        ),
      /2348030000000 is already used by another Books workspace/,
    );
  },
);
await finish();
