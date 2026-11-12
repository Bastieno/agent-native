/**
 * Ten simulated days for Books. Run: pnpm sim
 *
 * A fresh database; the real 1–10 Nov fixtures; a one-day payment method
 * report built for each day; a Moniepoint event for every transfer and card
 * payment except three planted gaps; twelve expenses with planted problems.
 * Every digest figure is checked against totals computed here, independently
 * of Books' own code. Writes test-runs/<run>/report.md.
 */
import assert from "node:assert/strict";
import { mkdirSync, writeFileSync } from "node:fs";
import { bootBooks, fixture, ORG } from "../helpers.js";
import { parseCsv } from "../../server/lib/csv.js";

const RUN = `sim-${new Date().toISOString().replace(/[:.]/g, "-")}`;
const findings: string[] = [];
const passed: string[] = [];
async function expect(name: string, fn: () => void | Promise<void>) {
  try {
    await fn();
    passed.push(name);
    console.log(`PASS ${name}`);
  } catch (err) {
    findings.push(`${name}: ${(err as Error).message}`);
    console.log(`FAIL ${name}\n  ${(err as Error).message}`);
  }
}

const { asOwner } = await bootBooks("sim");
const { importMoniebookFile } = await import("../../server/lib/import-file.js");
const { storeMoniepointEvent } =
  await import("../../server/lib/moniepoint-store.js");
const { reconcileDays } = await import("../../server/lib/reconcile-days.js");
const act = async (name: string) =>
  (await import(`../../actions/${name}.js`)).default;
const [setItemCategory, recordExpense, buildDigest, reconcileDay, listSales] =
  await Promise.all(
    [
      "set-item-category",
      "record-expense",
      "build-digest",
      "reconcile-day",
      "list-sales",
    ].map(act),
  );

// ── Independent reading of the fixture ─────────────────────────────────────
const [header, ...raw] = parseCsv(fixture("sales-sample.csv"));
const col = (r: string[], name: string) => r[header.indexOf(name)];
const kobo = (v: string) => Math.round(Number(v || 0) * 100);
const GIFTS = new Set(["The House", "Subscription Perk", "Leakages"]);
type Order = {
  no: string;
  at: string;
  day: string;
  total: number;
  collected: number;
  methods: string[];
  refs: string[];
  cash: boolean;
};
const orders: Order[] = raw
  .filter((r) => col(r, "status") === "COMPLETED")
  .map((r) => {
    const details = col(r, "paymentDetails").split(" || ");
    return {
      no: col(r, "orderNumber"),
      at: col(r, "orderDate"),
      day: col(r, "orderDate").slice(0, 10),
      total: kobo(col(r, "total")),
      collected: kobo(col(r, "collectedAmount")),
      methods: col(r, "paymentMethodNames").split(", "),
      refs: details
        .map(
          (d) =>
            d.match(/AP_TRSF\|[^|]*\|(\d+)/)?.[1] ?? d.match(/RRN: (\d+)/)?.[1],
        )
        .filter(Boolean) as string[],
      cash: details.some((d) => d.startsWith("Cash Payment")),
    };
  });
const days = [...new Set(orders.map((o) => o.day))].sort();
const incomeOn = (day: string) =>
  orders
    .filter((o) => o.day === day && !o.methods.every((m) => GIFTS.has(m)))
    .reduce((a, o) => a + o.total, 0);

// ── The planted gaps ───────────────────────────────────────────────────────
const plainTransfer = orders.find(
  (o) =>
    o.day === "2026-11-05" &&
    o.methods.join() === "Bank Transfer" &&
    o.refs.length === 1,
)!;
const splitWithGap = orders.find(
  (o) => o.day === "2026-11-08" && o.refs.length === 2,
)!;
const manual = orders.find((o) => o.methods.includes("Accepted manually"))!;
const gapRef = splitWithGap.refs[1];

// ── Split amounts and a payment method report per day ──────────────────────
const lagosIso = (local: string) =>
  new Date(`${local.replace(" ", "T")}+01:00`).toISOString();
const perDay = new Map<string, Map<string, { n: number; collected: number }>>();
let eventNo = 0;
for (const o of orders) {
  const day = perDay.get(o.day) ?? new Map();
  perDay.set(o.day, day);
  const put = (method: string, amount: number) => {
    const m = day.get(method) ?? { n: 0, collected: 0 };
    m.n++;
    m.collected += amount;
    day.set(method, m);
  };
  // What each part was: transfers share the collected amount; with cash, transfers take 60%.
  const transferTotal =
    o.refs.length === 0
      ? 0
      : o.cash
        ? Math.round((o.collected * 0.6) / 10000) * 10000
        : o.collected;
  const parts = o.refs.map((_, i) =>
    i < o.refs.length - 1
      ? Math.round(transferTotal / o.refs.length / 100) * 100
      : transferTotal -
        Math.round(transferTotal / o.refs.length / 100) *
          100 *
          (o.refs.length - 1),
  );
  if (o.refs.length === 0) put(o.methods[0], o.collected);
  else {
    const method = o.methods.includes("Card") ? "Card" : "Bank Transfer";
    parts.forEach((p) => put(method, p));
    if (o.cash) put("Cash", o.collected - transferTotal);
  }
  for (const [i, ref] of o.refs.entries()) {
    if (o === plainTransfer || ref === gapRef) continue;
    await storeMoniepointEvent(ORG, {
      webhookId: `sim-${++eventNo}`,
      type: "V1_TRANSFER_TRANSACTION",
      reference: ref,
      altReference: null,
      amount: parts[i],
      occurredAt: lagosIso(o.at),
      payload: "{}",
    });
  }
}
const nextDay = (d: string) =>
  new Date(Date.parse(`${d}T00:00:00Z`) + 86_400_000)
    .toISOString()
    .slice(0, 10);

await asOwner(async () => {
  await importMoniebookFile(ORG, fixture("item-sample.csv"), {
    fileName: "item-sales-report-2026-11-01-2026-11-10.csv",
    receivedVia: "upload",
  });
  await setItemCategory.run({ itemName: "Heineken Can", category: "Drinks" });
  for (const day of days) {
    // The day's sales file, then its payment report — the way the owner sends them.
    const dayRows = raw.filter((r) => col(r, "orderDate").startsWith(day));
    const csv = [header, ...dayRows]
      .map((r) =>
        r
          .map((f) => (/[",\n]/.test(f) ? `"${f.replace(/"/g, '""')}"` : f))
          .join(","),
      )
      .join("\n");
    await importMoniebookFile(ORG, csv, {
      fileName: `sales-summary${day}-${day}.csv`,
      receivedVia: "whatsapp",
    });
    if (day === "2026-11-10") continue; // the last day's report "hasn't arrived"
    const report = [
      "Payment Method,Number of Payments,Refunded Count,Amount Collected,Amount Refunded,Net Amount",
      ...[...perDay.get(day)!].map(
        ([m, v]) =>
          `${m},${v.n},0,${(v.collected / 100).toFixed(2)},0.00,${(v.collected / 100).toFixed(2)}`,
      ),
    ].join("\n");
    const r: any = await importMoniebookFile(ORG, report, {
      fileName: `payment-method-report-${day}-${nextDay(day)}.csv`,
      receivedVia: "whatsapp",
    });
    if (!r.check.agrees)
      findings.push(
        `payment report for ${day} disagrees: ${JSON.stringify(r.check)}`,
      );
  }
});

// ── Twelve expenses ────────────────────────────────────────────────────────
const duplicates: string[] = [];
await asOwner(async () => {
  for (let i = 1; i <= 8; i++) {
    await recordExpense.run({
      occurredOn: `2026-11-0${i}`,
      vendor: "Total Ikeja",
      amount: 20000,
      business: "hub",
      category: "Diesel / power",
      paidWith: "cash",
    });
  }
  await recordExpense.run({
    occurredOn: "2026-11-09",
    vendor: "Total Ikeja",
    amount: 60000,
    business: "hub",
    category: "Diesel / power",
    paidWith: "cash",
  });
  await recordExpense.run({
    occurredOn: "2026-11-07",
    vendor: "Generator repairs",
    amount: 150000,
    business: "lounge",
    category: "Repairs",
    paidWith: "transfer",
  });
  for (let i = 0; i < 2; i++) {
    const r = await recordExpense.run({
      occurredOn: "2026-11-06",
      vendor: "Total Ikeja",
      amount: 20000,
      business: "hub",
      category: "Diesel / power",
      paidWith: "cash",
    });
    if ("duplicateOf" in r) duplicates.push(r.duplicateOf);
  }
});
await reconcileDays(ORG, days);

// ── Checks ─────────────────────────────────────────────────────────────────
const flagsOn = async (day: string) =>
  ((await asOwner(() => reconcileDay.run({ day }))) as any).flags as any[];
const allFlags: { day: string; kind: string; [k: string]: unknown }[] = [];
for (const day of days)
  for (const f of await flagsOn(day)) allFlags.push({ day, ...f });
const of = (kind: string) => allFlags.filter((f) => f.kind === kind);

await expect("daily digests match the fixture", async () => {
  for (const day of days) {
    const { figures } = (await asOwner(() =>
      buildDigest.run({ period: "daily", start: day, end: day }),
    )) as any;
    assert.equal(figures.combined.income, incomeOn(day), `income on ${day}`);
  }
});
await expect("weekly digest 2–8 Nov matches and has a trend", async () => {
  const { figures } = (await asOwner(() =>
    buildDigest.run({
      period: "weekly",
      start: "2026-11-02",
      end: "2026-11-08",
    }),
  )) as any;
  const want = [
    "2026-11-02",
    "2026-11-03",
    "2026-11-04",
    "2026-11-05",
    "2026-11-06",
    "2026-11-07",
    "2026-11-08",
  ].reduce((a, d) => a + incomeOn(d), 0);
  assert.equal(figures.combined.income, want);
  assert.ok(figures.trends.length >= 1, "no trend signals");
});
await expect("gross profit 1–9 Nov", async () => {
  const s = (await asOwner(() =>
    listSales.run({ start: "2026-11-01", end: "2026-11-09" }),
  )) as any;
  assert.equal(s.grossProfit.hub, 20390000);
  assert.equal(s.grossProfit.lounge, 22754120);
});
await expect("exactly the planted transfer gaps", () => {
  assert.deepEqual(
    of("transfer_missing")
      .map((f) => f.orderNumber)
      .sort(),
    [plainTransfer.no, splitWithGap.no].sort(),
  );
  assert.deepEqual(
    of("split_unknown").map((f) => f.orderNumber),
    [splitWithGap.no],
  );
  assert.deepEqual(
    of("manual_unmatched").map((f) => f.orderNumber),
    [manual.no],
  );
  assert.equal(
    of("moniepoint_without_sale").length,
    0,
    "every planted event matched a sale",
  );
  assert.equal(
    of("split_short").length +
      of("split_over").length +
      of("shared_reference_mismatch").length,
    0,
  );
});
await expect("files agree every day", () =>
  assert.equal(of("files_disagree").length, 0),
);
await expect("planted expense problems", () => {
  assert.deepEqual(
    of("large_expense").map((f) => f.day),
    ["2026-11-07"],
  );
  assert.deepEqual(
    of("category_spike").map((f) => f.day),
    ["2026-11-09"],
  );
  assert.deepEqual(duplicates, ["E-6", "E-6"]);
});
await expect("cash in the till on 9 Nov", async () => {
  const r = (await asOwner(() =>
    reconcileDay.run({ day: "2026-11-09" }),
  )) as any;
  const cash = perDay.get("2026-11-09")!.get("Cash")?.collected ?? 0;
  const change = orders
    .filter((o) => o.day === "2026-11-09")
    .reduce((a, o) => a + (o.collected - o.total), 0);
  assert.equal(r.cash.source, "payment-report");
  assert.equal(r.cashInTill, cash - change - 6000000);
});

// ── Report ─────────────────────────────────────────────────────────────────
const dir = `test-runs/${RUN}`;
mkdirSync(dir, { recursive: true });
const lines = [
  `# Books simulation · ${RUN}`,
  "",
  `${days.length} days, ${orders.length} completed orders, ${eventNo} Moniepoint events, 12 expenses.`,
  "",
  `Planted: transfer gap on ${plainTransfer.no}, split gap on ${splitWithGap.no} (${gapRef}), no transfer for "Accepted manually" ${manual.no}, a ₦150,000 repair, a diesel spike on 9 Nov, a receipt sent three times.`,
  "",
  "## Checks",
  ...passed.map((p) => `- PASS ${p}`),
  ...findings.map((f) => `- FAIL ${f}`),
  "",
  "## Flags raised",
  ...Object.entries(
    allFlags.reduce<Record<string, number>>(
      (a, f) => ((a[f.kind] = (a[f.kind] ?? 0) + 1), a),
      {},
    ),
  ).map(([k, n]) => `- ${k}: ${n}`),
];
writeFileSync(`${dir}/report.md`, lines.join("\n") + "\n");
console.log(`\nReport: ${dir}/report.md`);
process.exit(findings.length ? 1 : 0);
