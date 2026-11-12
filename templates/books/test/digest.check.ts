import assert from "node:assert/strict";
import { bootBooks, check, finish, fixture } from "./helpers.js";

const { asOwner, asPartner } = await bootBooks("check-digest");
const importFile = (await import("../server/lib/import-file.js"))
  .importMoniebookFile;
const setItemCategory = (await import("../actions/set-item-category.js"))
  .default;
const listSales = (await import("../actions/list-sales.js")).default;
const buildDigest = (await import("../actions/build-digest.js")).default;
const getDigest = (await import("../actions/get-digest.js")).default;
const { renderWhatsApp } = await import("../server/lib/digest-render.js");

await check("daily refused without export", async () => {
  await assert.rejects(
    () =>
      asOwner(() =>
        buildDigest.run({
          period: "daily",
          start: "2026-11-09",
          end: "2026-11-09",
        }),
      ),
    {
      message: "No sales file for 2026-11-09 yet.",
    },
  );
});
await asOwner(async () => {
  await importFile("org1", fixture("sales-sample.csv"), {
    fileName: "sales-summary2026-11-10-2026-11-01.csv",
    receivedVia: "upload",
  });
  await importFile("org1", fixture("item-sample.csv"), {
    fileName: "item-sales-report-2026-11-01-2026-11-10.csv",
    receivedVia: "upload",
  });
  await setItemCategory.run({ itemName: "Heineken Can", category: "Drinks" });
});

await check("daily 9 Nov figures", async () => {
  const { figures } = await asOwner(() =>
    buildDigest.run({
      period: "daily",
      start: "2026-11-09",
      end: "2026-11-09",
    }),
  );
  const s = await asOwner(() =>
    listSales.run({ start: "2026-11-09", end: "2026-11-09" }),
  );
  assert.equal(figures.businesses.lounge.income, s.byBusiness.lounge);
  assert.equal(figures.businesses.hub.income, s.byBusiness.hub);
  assert.equal(figures.combined.income, s.income);
});
await check("weekly 2–8 Nov", async () => {
  const { figures } = await asOwner(() =>
    buildDigest.run({
      period: "weekly",
      start: "2026-11-02",
      end: "2026-11-08",
    }),
  );
  assert.equal(figures.start, "2026-11-02");
  assert.equal(figures.end, "2026-11-08");
  const s = await asOwner(() =>
    listSales.run({ start: "2026-11-02", end: "2026-11-08" }),
  );
  assert.equal(figures.combined.income, s.income);
  assert.ok(figures.sellers.lounge.best.length > 0);
});
await check("no trends against a partial week", async () => {
  const { figures } = await asOwner(() =>
    buildDigest.run({
      period: "weekly",
      start: "2026-11-02",
      end: "2026-11-08",
    }),
  );
  const kinds = figures.trends.map((t: any) => t.kind);
  for (const k of [
    "income",
    "gross_profit",
    "best_ever",
    "category_margin",
    "house_leakages",
  ]) {
    assert.ok(
      !kinds.includes(k),
      `compared with a week holding one day of sales: ${k}`,
    );
  }
});
await check("no new subscribers claimed without history", async () => {
  const { figures } = await asOwner(() =>
    buildDigest.run({
      period: "weekly",
      start: "2026-11-02",
      end: "2026-11-08",
    }),
  );
  assert.ok(
    !figures.trends.some((t: any) => t.kind === "new_subscribers"),
    "no sales before 1 Nov to tell new from returning",
  );
});
let rangeId = "";
await check("gross profit 1–9 Nov", async () => {
  const r = await asOwner(() =>
    buildDigest.run({
      period: "range",
      start: "2026-11-01",
      end: "2026-11-09",
    }),
  );
  rangeId = r.digestId;
  assert.equal(r.figures.businesses.hub.grossProfit, 20390000);
  assert.equal(r.figures.businesses.lounge.grossProfit, 22754120);
  assert.equal(r.figures.notIncome.atCost.house, 1925000);
  assert.equal(r.figures.notIncome.atCost.perk, 810000);
  assert.equal(r.figures.notIncome.atMenu.leakages, 100000);
  const s = await asOwner(() =>
    listSales.run({ start: "2026-11-01", end: "2026-11-09" }),
  );
  assert.equal(s.grossProfit.lounge, 22754120, "Sales page and digest agree");
  assert.equal(s.grossProfit.hub, 20390000);
});
await check("whatsapp text has no customer or sender names", async () => {
  const { figures } = await asPartner(() =>
    getDigest.run({ digestId: rangeId }),
  );
  const text = renderWhatsApp(figures, "https://books.test/reports/x");
  assert.doesNotMatch(text, /Customer \d+|Sender \d+|Staff \d+/);
  assert.ok(text.length < 1000, `too long: ${text.length}`);
  assert.match(text, /Hub/);
  assert.match(text, /₦/);
});
await check("partner cannot build", async () => {
  await assert.rejects(
    () =>
      asPartner(() =>
        buildDigest.run({
          period: "range",
          start: "2026-11-01",
          end: "2026-11-09",
        }),
      ),
    /Only the owner/,
  );
});
await finish();
