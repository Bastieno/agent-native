process.env.DATABASE_URL = "file:./data/app.db";
const { readFileSync } = await import("node:fs");
const { getDbExec } = await import("@agent-native/core/db");
const { runWithRequestContext } = await import("@agent-native/core/server");
const { importMoniebookFile } = await import("./server/lib/import-file.ts");
const { setItemCategory } = await import("./server/lib/catalog.ts");
const { reconcileDays } = await import("./server/lib/reconcile-days.ts");
const { ensureBooksSetup } = await import("./server/lib/setup.ts");
const D = "/Users/francisnduamaka/Downloads/Books-data/";
const exec = getDbExec();
const q = async (sql: string, args: any[] = []) => (await exec.execute({ sql, args })).rows as any[];
const [m] = await q("SELECT org_id FROM org_members WHERE email = 'owner@books.test'");
const org = m.org_id;
await runWithRequestContext({ userEmail: "owner@books.test", orgId: org }, async () => {
  await ensureBooksSetup(org);
  // My test data from checking the screens: one made-up expense and the digests built from it.
  await q("DELETE FROM expenses WHERE org_id = ? AND code = 'E-1' AND vendor = 'Total Ikeja'", [org]);
  await q("DELETE FROM digests WHERE org_id = ?", [org]);
  const t0 = Date.now();
  const item: any = await importMoniebookFile(org, readFileSync(D + "item-sales-report-2025-10-06-2026-11-11.csv", "utf8"), { fileName: "item-sales-report-2025-10-06-2026-11-11.csv", receivedVia: "upload" });
  console.log("item report", { categorised: item.categorised, costs: item.costsAdded, needing: item.needingCategory, check: item.check });
  for (const [name, cat] of [["Heineken Can", "Drinks"], ["Satibo", "Drinks"], ["Hub Space Per hour", "Subscription"], ["Cederking 1-yr a hub part payment", "Subscription"], ["More", "Drinks"]]) {
    await setItemCategory(org, name, cat, "owner", true);
  }
  for (const f of ["sales-summary2026-05-31-2025-10-06.csv", "sales-summary2026-11-11-2026-06-01.csv"]) {
    const r: any = await importMoniebookFile(org, readFileSync(D + f, "utf8"), { fileName: f, receivedVia: "upload" });
    console.log(f, { added: r.added, updated: r.updated, unchanged: r.unchanged, newItems: r.newItems.length });
  }
  const pm: any = await importMoniebookFile(org, readFileSync(D + "payment-method-report-2025-10-06-2026-11-11.csv", "utf8"), { fileName: "payment-method-report-2025-10-06-2026-11-11.csv", receivedVia: "upload" });
  console.log("payment report (end date read as exclusive)", pm.check);
  console.log("seconds", Math.round((Date.now() - t0) / 1000));
});
process.exit(0);
