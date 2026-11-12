import assert from "node:assert/strict";
import {
  bootBooks,
  check,
  finish,
  fixture,
  ORG,
  OWNER,
  PARTNER,
} from "./helpers.js";

const { asOwner, asPartner } = await bootBooks("check-screens-data");
const importFile = (await import("../actions/import-moniebook-file.js"))
  .default;
const updateSettings = (await import("../actions/update-settings.js")).default;
const getSettings = (await import("../actions/get-settings.js")).default;
const getToday = (await import("../actions/get-today.js")).default;

await check("upload detects the report", async () => {
  const s = await asOwner(() =>
    importFile.run({
      csv: fixture("sales-sample.csv"),
      fileName: "sales-summary2026-11-10-2026-11-01.csv",
    }),
  );
  assert.equal(s.kind, "sales-summary");
  const i = await asOwner(() =>
    importFile.run({
      csv: fixture("item-sample.csv"),
      fileName: "item-sales-report-2026-11-01-2026-11-10.csv",
    }),
  );
  assert.equal(i.kind, "item-sales");
});
await check("people become recipients and allowed numbers", async () => {
  await asOwner(() =>
    updateSettings.run({
      people: [
        {
          name: "Owner",
          email: OWNER,
          whatsapp: "0803 000 0000",
          role: "owner",
        },
        {
          name: "Partner",
          email: PARTNER,
          whatsapp: "+234 805 111 2222",
          role: "partner",
        },
      ],
      thresholds: { largeExpense: 150000 },
    }),
  );
  const s = await asPartner(() => getSettings.run({}));
  assert.deepEqual(s.allowedNumbers, {
    "2348030000000": OWNER,
    "2348051112222": PARTNER,
  });
  assert.equal(s.thresholds.largeExpense, 15000000);
  assert.equal(s.canEdit, false);
  assert.ok(
    s.itemCategories.some(
      (c: any) => c.name === "Subscription" && c.business === "hub",
    ),
  );
});
await check("partner cannot change settings", async () => {
  await assert.rejects(
    () => asPartner(() => updateSettings.run({ thresholds: { spikePct: 5 } })),
    /Only the owner/,
  );
});
await check("today shows the latest day and the review queue", async () => {
  const t = await asOwner(() => getToday.run({}));
  assert.equal(t.canEdit, true);
  assert.equal(t.day, "2026-11-10");
  assert.ok(t.figures.income > 0);
  assert.deepEqual(t.review.uncategorised, ["Heineken Can", "More"]);
});
await finish();
