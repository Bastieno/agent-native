# Books Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build `templates/books/`, an agent-native app that imports Moniebook exports (sales summary, payment method, sales by item), Moniepoint payment events and WhatsApp receipts, reconciles them per day with cost and gross profit, and sends daily, weekly and monthly digests with trends to the owner and a read-only partner.

**Architecture:** A template scaffolded from `templates/starter` and laid out like `templates/school`: Drizzle tables with additive `runMigrations`, `defineAction` operations shared by UI, agent and WhatsApp, pure calculation modules in `server/lib/` checked by `test/*.check.ts`, and a simulation in `test/sim/`. Receipts reach the agent through the framework WhatsApp integration, extended in `packages/core` to carry images and documents. Figures are computed in code; the agent only writes commentary.

**Tech Stack:** TypeScript, React Router + Nitro (agent-native core), Drizzle (SQLite locally, Postgres in prod), zod, h3, Tailwind + shadcn/ui, Tabler icons, tsx checks, vitest (core only).

**Spec:** [books-design.md](./books-design.md)

## Global Constraints

- All code `.ts`/`.tsx`; run `npx prettier --write <files>` after each edit.
- Money is integer **kobo** everywhere below the UI (`₦1 = 100`); never floats.
- Dates and day boundaries are **Africa/Lagos** (UTC+1, no DST). A "day" is 00:00–23:59:59 Lagos time. The export's `orderDate` is already Lagos local time.
- Migrations are additive only (`CREATE TABLE IF NOT EXISTS`, `ALTER TABLE … ADD COLUMN`). No `DROP`, no rename, no `drizzle-kit push`.
- Every ownable table uses `...ownableColumns()`; reads use `accessFilter`/org scoping, writes check the owner role (Task 2).
- No LLM calls from server or UI code. Receipt reading and commentary happen in the agent loop.
- UI uses shadcn/ui from `app/components/ui/`, Tabler icons, no emojis, no `window.confirm`. Mutations are optimistic.
- Customer names, sender names and account digits never appear in digests, WhatsApp or email.
- The raw sales summary in `~/Downloads` is never committed. Tests use the anonymised fixture from Task 3. The payment method and item reports carry no personal data and are copied as fixtures unchanged.
- Moniebook range files: the end date in the file name is **exclusive** (`…-2026-11-01-2026-11-10.csv` covers 1–9 Nov). The sales summary is dated by its rows, not its name.
- Category → business seed: `Subscription` → `hub`; `Drinks`, `Shawarma`, `Meals`, `Water` → `lounge`.
- Unit cost = cost of items × 100 ÷ units sold, rounded to the nearest kobo; line cost = quantity × unit cost.
- Trend thresholds: income/gross profit/expense category ±10%; category margin ±2 points; flag-free run ≥ 3 days; at most 3 "going well" and 3 "to watch" lines per digest.
- `packages/core` changes ship with `.changeset/books-whatsapp-media.md` (`"@agent-native/core": minor`).
- Template is private: do not add `books` to `packages/shared-app-config/templates.ts`, `templates-meta.ts`, docs or the homepage.
- Digest times (Lagos): daily 08:00 for the previous day; weekly Monday 08:00 for Mon–Sun just ended; monthly 1st 08:00 for the previous month.
- Default thresholds: The House + Leakages per day ₦20,000; large expense ₦100,000; category spike 30% above the 4-week daily average; Accepted-manually match window ±2 hours.

## Review Focus

1. **The same export sent twice, or overlapping ranges** — totals must not change; a status that changed to `CANCELLED` must drop the order from totals. (Task 4 `reimport is idempotent`, `later cancellation updates`.)
2. **A Moniepoint event arriving before the export that names it**, or days later — the day must re-reconcile and the flag must clear. (Task 6 `late event clears flag`.)
3. **A payment method or item report exported with the end date set one day short** — totals must not be silently counted against the wrong days; a "files don't agree" flag names both figures. (Task 4 `short range flagged`, Task 5 `daily files disagree`.)
4. **A WhatsApp message from a number not on the allow-list** — ignored, nothing written, no reply. (Task 10 `stranger ignored`.)
5. **A digest run when the export hasn't arrived** — reminder sent, no digest saved for that day, digest sent once the export lands. (Task 12 `missing export reminds`.)

---

## File Structure

```
templates/books/
  package.json, vite.config.ts, react-router.config.ts, ssr-entry.ts, tsconfig.json, AGENTS.md
  server/
    db/schema.ts, db/index.ts            # tables, getDb, shareable registration
    plugins/db.ts                        # runMigrations (additive)
    plugins/integrations.ts              # WhatsApp: allow-list, owner resolution
    plugins/onboarding.ts                # secrets + setup steps
    routes/api/moniepoint/webhook.post.ts
    routes/api/books/cron/tick.get.ts    # CRON_SECRET safety net
    routes/[...page].get.ts, [...page].head.ts  # SSR catch-all (as school)
    lib/
      money.ts            # kobo helpers, ₦ formatting
      lagos-time.ts       # day/week/month boundaries
      access.ts           # requireOrg(), assertOwner()
      sales-export.ts     # sales summary CSV → ParsedOrder[]
      moniebook-reports.ts # detectReport, payment method + item report parsers, file-name ranges
      import-sales.ts     # upsert parsed orders into SQL
      import-reports.ts   # payment method totals, item categories and unit costs
      moniepoint.ts       # signature check + event parsing
      reconcile.ts        # pure day reconciliation
      expense-dupes.ts    # duplicate detection
      digest-figures.ts   # pure figures per period
      trends.ts           # going well / to watch signals
      digest-render.ts    # WhatsApp text + email HTML from figures
      whatsapp-send.ts    # template + text sends via Graph API
      chat-export.ts      # WhatsApp chat-export zip reader
      setup.ts            # ensureBooksSetup(orgId): businesses, categories, settings
  actions/                # one file per action in the spec's table
  app/routes/             # today, expenses, sales, reports, settings
  jobs/                   # books-daily-digest.md, books-weekly-digest.md, books-monthly-digest.md
  ops/anonymise-export.ts # makes the committed fixture from a real export
  test/
    fixtures/sales-sample.csv, payment-method-sample.csv, item-sample.csv, moniepoint-events.json
    *.check.ts
    sim/run.ts
packages/core/src/integrations/
  types.ts, adapters/whatsapp.ts, webhook-handler.ts   # media attachments (Task 9)
```

---

### Task 1: Scaffold the template

**Files:**

- Create: `templates/books/` copied from `templates/starter/` (rename `_gitignore` → `.gitignore`)
- Create: `templates/books/server/routes/[...page].get.ts`, `[...page].head.ts` copied from `templates/school/server/routes/` on the `school` branch (`git show school:templates/school/server/routes/[...page].get.ts`)
- Modify: `templates/books/package.json` — `"name": "books"`, `"displayName": "Books"`, add scripts `"check": "for f in test/*.check.ts; do tsx $f || exit 1; done"`, `"sim": "tsx test/sim/run.ts"`, `"anonymise": "tsx ops/anonymise-export.ts"`
- Modify: `templates/books/AGENTS.md` — what Books is (two businesses, one till), the agent's job on receipts and commentary, and "never do arithmetic; quote figures from `build-digest`"

- [ ] **Step 1:** Copy starter, apply the edits above, `pnpm install` at repo root.
- [ ] **Step 2:** Run `pnpm --filter books typecheck` — expect no errors.
- [ ] **Step 3:** Run `pnpm --filter books dev`, open the URL — expect the starter page to render.
- [ ] **Step 4:** Commit `feat(books): scaffold template from starter`.

### Task 2: Schema, migrations, setup and roles

**Files:**

- Create: `server/db/schema.ts`, `server/db/index.ts`, `server/plugins/db.ts`, `server/lib/setup.ts`, `server/lib/access.ts`, `server/lib/money.ts`, `server/lib/lagos-time.ts`
- Test: `test/money-time.check.ts`, `test/access.check.ts`

**Interfaces:**

- Produces tables (all with `id TEXT PRIMARY KEY`, `created_at`, `...ownableColumns()`; amounts `INTEGER` kobo):
  - `businesses(name, slug)`
  - `item_categories(name UNIQUE per org, business_id NULL)`
  - `items(name UNIQUE per org, category_id NULL, category_source 'moniebook'|'agent'|'owner' NULL, confirmed BOOLEAN)`
  - `item_costs(item_id, unit_cost, effective_from, import_id)`
  - `sales(order_number UNIQUE per org, ordered_at, day, branch_name, status, refund_amount, staff_name, customer_name, total, collected_amount, change_amount, payment_mode, import_id)`
  - `sale_lines(sale_id, item_id, quantity, unit_price, line_total)`
  - `payment_method_totals(range_start, range_end_exclusive, method, payments, collected, refunded, net, import_id)`
  - `sale_payments(sale_id, leg_index, method, reference NULL, amount NULL, bank, sender_name, sender_account_masked)`
  - `moniepoint_events(webhook_id UNIQUE, received_at, type, reference, amount, occurred_at, payload)`
  - `expenses(code, occurred_on, vendor, amount, business_id, category_id, paid_with, status, receipt_file_id NULL, image_hash NULL, raw_text, line_items, source, message_id)`
  - `receipt_files(mime_type, data_base64, byte_size)`
  - `expense_categories(name, sort)`
  - `imports(kind, file_name, range_start, range_end, rows_added, rows_updated, received_via, check_result NULL)`
  - `reconciliations(day UNIQUE per org, figures, flags, computed_at)`
  - `digests(period, start_day, end_day, figures, commentary NULL, status 'draft'|'sent'|'failed', sent_at, delivery)`
  - `books_settings(org_id PRIMARY KEY, thresholds JSON, recipients JSON, allowed_numbers JSON)`
- `toKobo(naira: string | number): number`, `formatNaira(kobo: number): string` (`₦45,000`; kobo shown only when non-zero)
- `lagosDay(iso: string): string` (`YYYY-MM-DD`), `periodBounds(period: 'daily'|'weekly'|'monthly', now: Date): { start: string; end: string }` — the period that just ended
- `requireOrg(): string`, `assertOwner(): void` — owner = org role `owner`/`admin`; partner = org `member`. Throws `"Only the owner can change Books."`
- `ensureBooksSetup(orgId: string): Promise<void>` — idempotent; seeds businesses `Restaurant & Lounge`/`lounge`, `Hub`/`hub`, the item categories from Global Constraints, the eight expense categories in the spec's order, and default settings from Global Constraints.

- [ ] **Step 1: Write the failing checks** (school `check()` helper style):

```ts
check("kobo", () => {
  assert.equal(toKobo("4000.00"), 400000);
  assert.equal(formatNaira(4500000), "₦45,000");
});
check("lagos day", () =>
  assert.equal(lagosDay("2026-11-10T23:30:00Z"), "2026-11-11"),
);
check("weekly bounds", () =>
  assert.deepEqual(periodBounds("weekly", new Date("2026-11-16T07:00:00Z")), {
    start: "2026-11-09",
    end: "2026-11-15",
  }),
);
check("monthly bounds", () =>
  assert.deepEqual(periodBounds("monthly", new Date("2026-12-01T07:00:00Z")), {
    start: "2026-11-01",
    end: "2026-11-30",
  }),
);
```

`test/access.check.ts`: with a request context of a `member`, `assertOwner()` throws the exact message; with `owner` it does not.

- [ ] **Step 2:** `npx tsx test/money-time.check.ts` → FAIL (modules missing).
- [ ] **Step 3:** Implement the files. Migrations: one `version` per table, in the order above.
- [ ] **Step 4:** Both checks PASS; `pnpm --filter books dev` boots and creates the tables.
- [ ] **Step 5:** Commit `feat(books): tables, setup and owner role`.

### Task 3: Moniebook parsers and fixtures

**Files:**

- Create: `server/lib/sales-export.ts`, `server/lib/moniebook-reports.ts`, `ops/anonymise-export.ts`, `test/fixtures/sales-sample.csv`, `test/fixtures/payment-method-sample.csv` (copy of `~/Downloads/payment-method-report-2026-11-01-2026-11-10.csv`), `test/fixtures/item-sample.csv` (copy of `~/Downloads/item-sales-report-2026-11-01-2026-11-10.csv`)
- Test: `test/sales-export.check.ts`, `test/moniebook-reports.check.ts`

**Interfaces (reports):**

```ts
export type ReportKind = "sales-summary" | "payment-method" | "item-sales";
export function detectReport(csv: string): ReportKind | null; // by header row
export function rangeFromFileName(
  name: string,
): { start: string; endExclusive: string } | null; // two YYYY-MM-DD dates, sorted
export interface PaymentMethodRow {
  method: string;
  payments: number;
  refundedCount: number;
  collected: number;
  refunded: number;
  net: number;
} // kobo
export function parsePaymentMethodReport(csv: string): {
  rows: PaymentMethodRow[];
  missingColumns: string[];
};
export interface ItemRow {
  name: string;
  category: string | null;
  totalSold: number;
  gross: number;
  costOfItems: number;
  unitCost: number | null;
} // kobo; unitCost null when totalSold = 0
export function parseItemReport(csv: string): {
  rows: ItemRow[];
  missingColumns: string[];
};
```

Item names are trimmed. An empty `Category` is `null`.

**Interfaces:**

```ts
export type PaymentMethod =
  | "Bank Transfer"
  | "Card"
  | "Cash"
  | "Transfer to Opay"
  | "The House"
  | "Subscription Perk"
  | "Leakages"
  | "Accepted manually"
  | (string & {});
export interface ParsedLeg {
  method: PaymentMethod;
  reference: string | null;
  bank: string | null;
  senderName: string | null;
  senderAccountMasked: string | null;
}
export interface ParsedLine {
  name: string;
  quantity: number;
  unitPrice: number; /* kobo */
}
export interface ParsedOrder {
  orderNumber: string;
  orderedAt: string /* 'YYYY-MM-DD HH:mm:ss' Lagos */;
  day: string;
  branchName: string;
  status: "COMPLETED" | "CANCELLED";
  refundAmount: number;
  staffName: string;
  customerName: string | null;
  total: number;
  collectedAmount: number;
  change: number;
  paymentMode: "REGULAR" | "SPLIT";
  methods: PaymentMethod[];
  legs: ParsedLeg[];
  lines: ParsedLine[];
}
export function parseSalesExport(csv: string): {
  orders: ParsedOrder[];
  missingColumns: string[];
};
```

Parsing rules: RFC 4180 CSV (quoted fields with commas). `paymentMethodNames` split on `, `. `paymentDetails` split on `||`; a segment starting `Cash Payment` is a Cash leg; `Ref: AP_TRSF|…|<id>` gives `reference = <id>`; `Card: … | RRN: <rrn>` gives `reference = <rrn>`; `Bank:`/`Sender:`/`Sender Account:` fill the rest; `<Method> Reference: N/A` gives a leg with `reference = null`. `itemNames` split on `|` then `/^(\d+) x (.+)$/`; unit prices from `unitPrice` by name. `staffName` collapses double spaces.

`ops/anonymise-export.ts <in.csv> <out.csv>`: replaces `customerName`, `Sender:` names with `Customer N`/`Sender N` (stable per original), account digits with `******0000`, keeps everything else.

- [ ] **Step 1:** Run `pnpm --filter books anonymise ~/Downloads/sales-summary2026-11-10-2026-11-01.csv test/fixtures/sales-sample.csv` once the script exists (Step 3); `grep -c "Sender Account: \*\*\*\*\*\*[1-9]" test/fixtures/sales-sample.csv` must print `0`.
- [ ] **Step 2: Write the failing check** against the fixture:

```ts
const { orders, missingColumns } = parseSalesExport(fixture);
check("columns", () => assert.deepEqual(missingColumns, []));
check("count", () => {
  assert.equal(orders.length, 175);
  assert.equal(orders.filter((o) => o.status === "CANCELLED").length, 1);
  assert.equal(orders.filter((o) => o.paymentMode === "SPLIT").length, 33);
});
check("completed totals by method set", () => {
  const t = totalsByMethodSet(orders.filter((o) => o.status === "COMPLETED"));
  assert.equal(t["Bank Transfer"], 45180000);
  assert.equal(t["Transfer to Opay"], 41300000);
  assert.equal(t["Bank Transfer, Cash"], 12400000);
  assert.equal(t["Card"], 6540000);
  assert.equal(t["Cash"], 2840000);
  assert.equal(t["The House"], 3400000);
  assert.equal(t["Subscription Perk"], 1250000);
  assert.equal(t["Leakages"], 100000);
  assert.equal(t["Accepted manually"], 30000);
});
check("transfer refs and cards", () => {
  const legs = orders
    .filter((o) => o.status === "COMPLETED")
    .flatMap((o) => o.legs);
  assert.equal(
    legs.filter((l) => l.method === "Bank Transfer" && l.reference).length,
    112,
  );
  assert.equal(legs.filter((l) => l.method === "Card").length, 14);
});
check("three-transfer split", () => {
  const o = orders.find(
    (o) =>
      o.paymentMode === "SPLIT" &&
      o.legs.filter((l) => l.method === "Bank Transfer").length === 3,
  )!;
  assert.ok(o.legs.every((l) => l.reference));
});
check("missing column reported", () =>
  assert.deepEqual(
    parseSalesExport("orderNumber,total\n").missingColumns.includes(
      "paymentDetails",
    ),
    true,
  ),
);
```

(`totalsByMethodSet` is a test-local helper keyed by `methods.join(", ")`.)

Also in `test/sales-export.check.ts`:

```ts
check("change", () => {
  const upTo9 = orders.filter(
    (o) => o.status === "COMPLETED" && o.day <= "2026-11-09",
  );
  assert.equal(sum(upTo9.map((o) => o.change)), 520000);
  assert.equal(sum(upTo9.map((o) => o.collectedAmount)), 106810000);
});
```

`test/moniebook-reports.check.ts`:

```ts
check("detect", () => {
  assert.equal(detectReport(salesFixture), "sales-summary");
  assert.equal(detectReport(paymentFixture), "payment-method");
  assert.equal(detectReport(itemFixture), "item-sales");
  assert.equal(detectReport("a,b\n1,2\n"), null);
});
check("range is end-exclusive", () =>
  assert.deepEqual(
    rangeFromFileName("payment-method-report-2026-11-01-2026-11-10.csv"),
    { start: "2026-11-01", endExclusive: "2026-11-10" },
  ),
);
check("reversed name", () =>
  assert.deepEqual(
    rangeFromFileName("sales-summary2026-11-10-2026-11-01.csv"),
    { start: "2026-11-01", endExclusive: "2026-11-10" },
  ),
);
check("payment method rows", () => {
  const { rows } = parsePaymentMethodReport(paymentFixture);
  const by = Object.fromEntries(rows.map((r) => [r.method, r]));
  assert.equal(rows.length, 8);
  assert.equal(by["Bank Transfer"].payments, 105);
  assert.equal(by["Bank Transfer"].collected, 52430000);
  assert.equal(by["Cash"].collected, 3450000);
  assert.equal(sum(rows.map((r) => r.collected)), 106810000);
});
check("item rows", () => {
  const { rows } = parseItemReport(itemFixture);
  const by = Object.fromEntries(rows.map((r) => [r.name, r]));
  assert.equal(rows.length, 52);
  assert.equal(by["WATER"].unitCost, 13000);
  assert.equal(by["BUDWEISER"].unitCost, 82895);
  assert.equal(by["Heineken Can"].category, null);
  assert.equal(by["HUB MONTHLY SUBSCRIPTION PREMIUM"].category, "Subscription");
  assert.equal(sum(rows.map((r) => r.gross)), 106290000);
});
```

- [ ] **Step 3:** Implement `parseSalesExport`, the report parsers and the anonymiser; regenerate the sales fixture; copy the two report fixtures.
- [ ] **Step 4:** `npx tsx test/sales-export.check.ts` and `npx tsx test/moniebook-reports.check.ts` → all PASS.
- [ ] **Step 5:** Commit `feat(books): read Moniebook exports` (fixtures included, raw sales summary not).

### Task 4: Imports, categories and costs

**Files:**

- Create: `server/lib/import-sales.ts`, `server/lib/import-reports.ts`, `actions/import-sales-export.ts`, `actions/import-payment-method-report.ts`, `actions/import-item-report.ts`, `actions/set-item-category.ts`, `actions/set-category-business.ts`, `actions/list-items-needing-category.ts`, `actions/list-sales.ts`
- Test: `test/import-sales.check.ts`, `test/import-reports.check.ts`

**Interfaces:**

- `importParsedOrders(orgId: string, orders: ParsedOrder[], meta: { fileName: string; receivedVia: 'whatsapp'|'upload' }): Promise<{ importId: string; added: number; updated: number; unchanged: number; newItems: string[]; days: string[] }>` — upsert by `order_number`; on update replace that sale's lines and legs; single-method orders get `amount = total` on their one leg, split legs `amount = null`. New item names insert with `category_id = null`.
- `importPaymentMethodReport(orgId, rows: PaymentMethodRow[], range: { start; endExclusive }, meta)` → `{ importId; days: string[]; check: RangeCheck }` — replaces any earlier rows for the identical range.
- `type RangeCheck = { agrees: boolean; reportTotal: number; salesTotal: number }` — payment method: sum of `collected` vs completed `collectedAmount` in the range; item report: sum of `gross` vs completed `total` in the range. Stored on the `imports` row (`check_result` JSON); when `agrees` is false the action's reply says so with both figures, and the agent tells the owner the dates are probably off.
- `importItemReport(orgId, rows: ItemRow[], range, meta)` → `{ importId; categorised: number; needingCategory: string[]; costsAdded: number; days: string[]; check: RangeCheck }` — a non-null category sets the item's category (`moniebook`, `confirmed = true`), creating the `item_categories` row if new (business null); `unitCost` non-null adds an `item_costs` row with `effective_from = range.start`, replacing one with the same item and day. `days` = every day that has sales from `range.start` onward (re-priced).
- Action `import-sales-export`: `{ csv; fileName; receivedVia? }` → the import result plus `missingColumns`; rejects non-empty `missingColumns` with `"This file is missing: <cols>"`.
- Actions `import-payment-method-report` / `import-item-report`: `{ csv; fileName; range?: { start; endExclusive }; receivedVia? }`; range from `rangeFromFileName` unless given; rejects with `"Which dates does this file cover?"` when neither exists.
- All imports `assertOwner()`, then `reconcileDays(orgId, days)` (Task 6; until then a no-op stub in `server/lib/reconcile-days.ts`).
- `set-item-category`: `{ itemName; category; confirmed?: boolean }` (agent guesses pass `confirmed: false`, source `agent`; owner calls default `true`, source `owner`); re-reconciles days with that item.
- `set-category-business`: `{ category; business: 'lounge'|'hub' }`; re-reconciles all days with that category.
- `list-items-needing-category`: `{}` → `{ uncategorised: string[]; unconfirmed: string[]; unmappedCategories: string[] }`. AGENTS.md: after any import, call this; give each uncategorised item a category guessed from its name with `confirmed: false`; ask the owner only about names you can't place.
- `list-sales`: `{ start; end }` (inclusive days) → completed totals by business (from category; `unassigned` when none) and by method, plus cost of goods per business (`null` parts reported as `uncostedRevenue`).

- [ ] **Step 1: Failing checks** against a fresh SQLite file (`DATABASE_URL=file:./data/check.db`, deleted first):

`test/import-sales.check.ts`:

- `first import` → `added 175, updated 0`
- `reimport is idempotent` → importing again gives `added 0, updated 0, unchanged 175`; `list-sales` 1–10 Nov unchanged
- `later cancellation updates` → one COMPLETED row flipped to CANCELLED gives `updated 1` and that total leaves `list-sales`
- `completed income` → `list-sales` 1–10 Nov total excluding The House, Subscription Perk and Leakages equals `108290000`
- `before item report everything is unassigned` → `list-sales` 1–9 Nov `byBusiness.unassigned` equals `101540000`

`test/import-reports.check.ts` (sales fixture imported first):

- `item report sets categories` → after `import-item-report` with the item fixture: `needingCategory` is `["Heineken Can"]`; `list-sales` 1–9 Nov `byBusiness.hub = 40200000`, `byBusiness.lounge = 61220000`, `byBusiness.unassigned = 120000`
- `costs` → `list-sales` 1–9 Nov `costOfGoods.hub = 19000000`, `costOfGoods.lounge = 36585880`, and `uncostedRevenue = 0` once `set-item-category {itemName: "Heineken Can", category: "Drinks", confirmed: false}` runs, after which `byBusiness.lounge = 61340000`, `costOfGoods.lounge = 36660880`
- `guess stays unconfirmed` → `list-items-needing-category().unconfirmed` is `["Heineken Can"]`
- `payment method range` → `import-payment-method-report` with the fixture and name `payment-method-report-2026-11-01-2026-11-10.csv` stores 8 rows with `range_end_exclusive = '2026-11-10'`
- `full range agrees` → payment fixture with 1–9 Nov: `check.agrees` true, both totals `106810000`; item fixture with 1–9 Nov: `check.agrees` true, both `106290000`
- `short range flagged` → the payment fixture imported with `endExclusive: '2026-11-09'` (1–8 Nov): `check.agrees` false, `reportTotal 106810000`, `salesTotal` lower
- `no range asks` → name `report.csv`, no `range` → rejects with the exact message

- [ ] **Step 2:** Run both → FAIL.
- [ ] **Step 3:** Implement.
- [ ] **Step 4:** Run both → PASS.
- [ ] **Step 5:** Commit `feat(books): import reports, categories and costs`.

### Task 5: Reconciliation (pure)

**Files:**

- Create: `server/lib/reconcile.ts`
- Test: `test/reconcile.check.ts`

**Interfaces:**

```ts
export interface DayInput {
  day: string;
  sales: {
    id: string;
    orderNumber: string;
    orderedAt: string;
    status: string;
    total: number;
    collectedAmount: number;
    change: number;
    staffName: string;
    methods: string[];
    legs: {
      index: number;
      method: string;
      reference: string | null;
      amount: number | null;
    }[];
    lines: {
      itemName: string;
      businessSlug: string | null;
      categoryConfirmed: boolean;
      quantity: number;
      lineTotal: number;
      unitCost: number | null;
    }[];
  }[];
  paymentReport: { method: string; collected: number }[] | null; // only a report covering exactly this day
  events: {
    webhookId: string;
    reference: string | null;
    amount: number;
    occurredAt: string;
  }[]; // that day ±1 day
  expenses: {
    id: string;
    amount: number;
    paidWith: string;
    categoryId: string;
    businessSlug: string | null;
    status: string;
    vendor: string;
    occurredOn: string;
    imageHash: string | null;
  }[];
  categoryHistory: Record<string, number>; // categoryId → 4-week daily average (kobo)
  thresholds: {
    houseLeakagesPerDay: number;
    largeExpense: number;
    spikePct: number;
    manualWindowMinutes: number;
  };
}
export type Flag =
  | { kind: "moniepoint_without_sale"; webhookId: string; amount: number }
  | { kind: "transfer_missing"; orderNumber: string; reference: string }
  | { kind: "manual_unmatched"; orderNumber: string; amount: number }
  | {
      kind: "split_short" | "split_over";
      orderNumber: string;
      difference: number;
    }
  | { kind: "split_unknown"; orderNumber: string }
  | {
      kind: "shared_reference_mismatch";
      reference: string;
      orderNumbers: string[];
    }
  | { kind: "cancelled"; orderNumber: string; total: number }
  | { kind: "house_leakages_high"; total: number }
  | { kind: "large_expense"; expenseId: string; amount: number }
  | {
      kind: "category_spike";
      categoryId: string;
      today: number;
      average: number;
    }
  | { kind: "duplicate_receipt"; expenseIds: [string, string] }
  | { kind: "needs_review"; count: number }
  | { kind: "files_disagree"; reportTotal: number; salesTotal: number }
  | { kind: "unconfirmed_category"; items: string[] }
  | { kind: "no_cost"; items: string[]; revenue: number };
export interface DayResult {
  incomeByMethod: Record<"moniepoint" | "opay" | "cash", number>;
  incomeByBusiness: Record<string, number>; // 'lounge' | 'hub' | 'unassigned'
  costOfGoodsByBusiness: Record<string, number>; // paid lines only
  grossProfitByBusiness: Record<string, number>; // income − cost of goods − not-income cost charged to it
  uncostedRevenue: number;
  notIncome: {
    atCost: { house: number; perk: number; leakages: number };
    atMenu: { house: number; perk: number; leakages: number };
    byStaff: Record<string, number>; // at cost
  };
  cash: {
    collected: number | null;
    source: "payment-report" | "orders";
    change: number;
  };
  cashInTill: number | null;
  expensesByBusiness: Record<string, number>;
  expensesByCategory: Record<string, number>;
  matchedEventIds: string[];
  flags: Flag[];
}
export function reconcileDay(input: DayInput): DayResult;
```

Matching order: (1) legs with references to events by reference; one event may serve several legs, its amount allocated to them in order of each order's remaining balance, and `shared_reference_mismatch` when the sum differs. (2) For each `Accepted manually` sale, the nearest unmatched event with equal amount within the window. (3) Split orders per the spec's four rules, comparing matched transfers with **`collectedAmount`** (total + change), so an overpayment returned as change is not a flag. Moniepoint methods: Bank Transfer, Card, Accepted manually.

Cash: `collected` = the payment report's Cash row when `paymentReport` is set, else cash sales + cash parts of splits (`null` if any part unknown). `cashInTill = collected − change − cash expenses`, `null` when `collected` is null. With a payment report, `files_disagree` when the sum of its `collected` ≠ the completed orders' `collectedAmount`.

Cost: line cost = `quantity × unitCost`; lines with `unitCost` null add their `lineTotal` to `uncostedRevenue` and their names to `no_cost`. Not-income lines (The House, Subscription Perk, Leakages) are costed the same way; Perk cost is charged to `hub` gross profit whatever the item's business, The House and Leakages to the item's business. A line with a null business counts under `unassigned`; lines with `categoryConfirmed = false` produce one `unconfirmed_category` flag listing the names.

- [ ] **Step 1: Failing checks** — one hand-built `DayInput` per case, each asserting `flags` and figures exactly:
  - `reference match` (Bank Transfer ₦4,500 + event 450000 → no flag, moniepoint 450000)
  - `two-transfer split exact` (total 600 = 300 + 300, no Cash method → no flag)
  - `two-transfer split short` (total 4500, events 2000 + 2000 → `split_short` difference 50000)
  - `transfer plus cash` (total 13500, collected 13500, event 6000, no payment report → `cash.collected` 750000)
  - `overpaid with change` (total 53700, collected 58600, change 4900, events summing 58600 → no flag)
  - `transfer plus cash over` (total 4000, collected 4000, event 4500 → `split_over` 50000)
  - `unmatched leg is unknown` (two legs, one event missing → `transfer_missing` + `split_unknown`, `cashInTill` null)
  - `cash from payment report` (report Cash 3450000, change 520000, cash expenses 100000 → `cashInTill` 2830000, `source` "payment-report")
  - `daily files disagree` (report collected sum 106810000, orders 106700000 → `files_disagree`)
  - `gross profit` (hub line 4000000 cost 2000000; lounge line 450000 cost 280000; Perk line menu 450000 cost 270000 on a lounge item → hub GP 1730000, lounge GP 170000, `atMenu.perk` 450000)
  - `no cost` (line unitCost null, 120000 → `uncostedRevenue` 120000, `no_cost` flag)
  - `unconfirmed category` (one line `categoryConfirmed: false` → flag with its name)
  - `one reference two orders` (two orders 1000 + 2000, one event 3000 → no flag; event 2500 → `shared_reference_mismatch`)
  - `accepted manually matched` (300 at 22:38, event 300 at 22:10 → matched) and `…unmatched` (event at 19:00 → `manual_unmatched`)
  - `money without sale` (event with unknown reference → `moniepoint_without_sale`)
  - `cancelled excluded` (CANCELLED order → not in income, `cancelled` flag)
  - `house above threshold` (at cost), `large expense`, `category spike` (today 130 vs average 100 → flag; 129 → none), `needs review`
- [ ] **Step 2:** Run → FAIL.
- [ ] **Step 3:** Implement `reconcileDay`.
- [ ] **Step 4:** Run → PASS.
- [ ] **Step 5:** Commit `feat(books): reconcile a day`.

### Task 6: Moniepoint feed and persisted reconciliation

**Files:**

- Create: `server/lib/moniepoint.ts`, `server/routes/api/moniepoint/webhook.post.ts`, `server/lib/reconcile-days.ts` (replace stub), `actions/reconcile-day.ts`, `test/fixtures/moniepoint-events.json`
- Test: `test/moniepoint.check.ts`, `test/reconcile-days.check.ts`

**Interfaces:**

- `verifyMoniepointSignature(rawBody: string, headers: { id: string; timestamp: string; signature: string }, secret: string): boolean` — HMAC-SHA256 over `${id}.${timestamp}.${rawBody}`, compared with `timingSafeEqual`. Confirm the exact string format and header names against https://docs.pos.moniepoint.com/ before implementing; the check pins whatever the docs say.
- `parseMoniepointEvent(body: unknown): { type: string; reference: string | null; amount: number; occurredAt: string } | null` — fixture built from the documented POS purchase payload.
- Webhook route: secret from `MONIEPOINT_WEBHOOK_SECRET`; org from `MONIEPOINT_ORG_ID` (single-tenant deployment); 401 on bad signature; insert ignoring duplicate `webhook_id`; call `reconcileDays(orgId, [lagosDay(occurredAt)])`; return 200 quickly.
- `reconcileDays(orgId: string, days: string[]): Promise<void>` — loads `DayInput` for each day, calls `reconcileDay`, upserts `reconciliations`.
- `reconcile-day` action: `{ day: string }` → `DayResult`.

- [ ] **Step 1: Failing checks:** `good signature`, `bad signature` (one byte changed → false), `duplicate webhook stored once`, `parse purchase fixture` (amount in kobo, reference), and in `reconcile-days.check.ts`: `late event clears flag` — import fixture, `transfer_missing` present for an order; insert its event; `reconcileDays` → flag gone.
- [ ] **Step 2:** Run → FAIL.
- [ ] **Step 3:** Implement.
- [ ] **Step 4:** Run → PASS.
- [ ] **Step 5:** Commit `feat(books): Moniepoint feed and daily reconciliation`.

### Task 7: Expenses

**Files:**

- Create: `server/lib/expense-dupes.ts`, `actions/record-expense.ts`, `actions/record-expense-from-receipt.ts`, `actions/update-expense.ts`, `actions/list-expenses.ts`, `actions/list-categories.ts`
- Test: `test/expenses.check.ts`

**Interfaces:**

- `findDuplicate(candidate: { imageHash: string | null; vendor: string; amount: number; occurredOn: string }, existing: …[]): string | null` — same `imageHash`, or same lower-cased trimmed vendor + amount + date.
- `record-expense`: `{ occurredOn; vendor; amount /* naira */; business?: 'lounge'|'hub'; category?: string; paidWith?; note?; confirmDuplicate?: boolean }` → `{ code: string; status; duplicateOf?: string }`. `code` is `E-` + per-org sequence (`E-1`, `E-2`, …). A duplicate without `confirmDuplicate` is not saved and returns `duplicateOf`.
- `record-expense-from-receipt`: same fields plus `{ receipt: { mimeType: string; dataBase64: string }; confident: boolean; lineItems?: {name; amount}[] }` — stores `receipt_files`, `imageHash = sha256(data)`, `status = confident ? 'confirmed' : 'needs_review'`, `source` defaults `whatsapp`.
- `update-expense`: `{ code: string; business?; category?; amount?; occurredOn?; status? }`.
- All three writes `assertOwner()` and re-reconcile the expense's day.

- [ ] **Step 1: Failing checks:** `sequence codes`, `duplicate by hash blocked`, `duplicate by vendor/amount/date blocked`, `confirmDuplicate saves`, `not confident needs review`, `partner cannot record` (member context → throws owner message).
- [ ] **Step 2:** Run → FAIL. **Step 3:** Implement. **Step 4:** Run → PASS.
- [ ] **Step 5:** Commit `feat(books): expenses with duplicate checks`.

### Task 8: Owner-only action policy

**Files:**

- Create: `server/lib/action-policy.ts` (modelled on school's), wired where school wires its guard
- Test: `test/action-policy.check.ts`

**Interfaces:** `ACTION_POLICY: Record<string, 'owner' | 'everyone'>` covering every file in `actions/`; `assertPolicyCoversAllActions()` throws naming any action missing. Read actions (`list-*`, `get-*`, `reconcile-day`, `view-screen`, `navigate`) are `everyone`; everything else `owner`. The partner's agent gets only `everyone` actions and no `db-query`/`db-exec`.

- [ ] **Step 1:** Failing checks: `every action classified`, `partner tools exclude writes and raw sql`.
- [ ] **Step 2–4:** FAIL → implement → PASS.
- [ ] **Step 5:** Commit `feat(books): partner reads, owner writes`.

### Task 9: WhatsApp media in the framework (`packages/core`)

**Files:**

- Modify: `packages/core/src/integrations/types.ts` — `IncomingMessage.attachments?: { kind: 'image' | 'document'; mediaId: string; mimeType: string; fileName?: string }[]`; `PlatformAdapter.fetchAttachment?(ref): Promise<{ mimeType: string; dataBase64: string }>`
- Modify: `packages/core/src/integrations/adapters/whatsapp.ts` — accept `image` and `document` messages (text = caption or `""`); `fetchAttachment` does `GET https://graph.facebook.com/v21.0/{mediaId}` then fetches the returned `url` with the bearer token; reject over 10 MB
- Modify: `packages/core/src/integrations/webhook-handler.ts` — at processing time (not in the webhook request), fetch each image/PDF attachment and pass it through `buildUserContentWithAttachments`. Any other document (e.g. CSV) is not fetched; the agent gets a text line `[Attached file: <fileName> (<mimeType>), mediaId <id>]` so an app action can fetch it. Attachment bytes are never written to `integration_pending_tasks`, only refs. Text-only behaviour unchanged.
- Add: export `fetchIntegrationAttachment(platform: string, mediaId: string): Promise<{ mimeType: string; dataBase64: string }>` from `@agent-native/core/integrations` so app actions can fetch a referenced file.
- Create: `.changeset/books-whatsapp-media.md`
- Test: `packages/core/src/integrations/adapters/whatsapp.spec.ts`, additions to `webhook-handler.spec.ts`

- [ ] **Step 1: Failing specs:** `parses image message with caption`, `parses document message with filename`, `still ignores stickers`, `fetchAttachment follows media url with token` (mocked fetch), `handler passes image content to the agent` (mocked engine receives an `image` part), `csv becomes a text reference`, `queue row holds refs not bytes`.
- [ ] **Step 2:** `pnpm --filter @agent-native/core test -- whatsapp webhook-handler` → FAIL.
- [ ] **Step 3:** Implement.
- [ ] **Step 4:** Same command → PASS; existing integration specs still PASS.
- [ ] **Step 5:** Commit `feat(core): WhatsApp images and documents reach the agent`.

### Task 10: Books on WhatsApp

**Files:**

- Create: `server/plugins/integrations.ts`, `server/lib/whatsapp-send.ts`, `actions/import-sales-from-whatsapp.ts`
- Modify: `AGENTS.md` — receipt handling instructions
- Test: `test/whatsapp-books.check.ts`

**Interfaces:**

- Plugin uses `createIntegrationsPlugin({ resolveOwner, beforeProcess, actions })`.
- `beforeProcess(incoming)`: runs inside the webhook request, so it only does one indexed read. Normalise `senderId` to E.164; if not in `books_settings.allowed_numbers` return `{ handled: true }` with no `responseText` (nothing queued, no reply). Otherwise `{ handled: false }`.
- `resolveOwner(incoming)`: the email mapped to that number.
- `import-sales-from-whatsapp` action: `{ mediaId: string; fileName: string; range?: { start; endExclusive } }` → fetches with `fetchIntegrationAttachment('whatsapp', mediaId)`, runs `detectReport`, and takes the matching import path (`receivedVia: 'whatsapp'`), returning `{ kind, ...result }`; an unrecognised file returns `"This doesn't look like a Moniebook sales summary, payment method or item report."`
- AGENTS.md instructions:
  - Attached CSV → `import-sales-from-whatsapp`. Reply by kind: sales summary `"Sales <range>: <n> orders (<added> new)."`; payment method `"Payments <range> loaded."`; item report `"Items and costs <range> loaded."`. If `check.agrees` is false, add `"These don't match the sales for <range> (₦<report> vs ₦<sales>). Was the end date set to the day after?"`. Then `list-items-needing-category`: guess categories with `confirmed: false`, ask about any you can't place.
  - Image/PDF → read vendor, date, total, line items, payment method; `record-expense-from-receipt`; reply exactly `"<Category> ₦<amount> · <Business> · <code>. Reply to change."`.
  - A reply changing something → `update-expense` with the code from the thread (the thread keeps history, so no quoted-message lookup is needed).
  - `duplicateOf` returned → ask before resending with `confirmDuplicate`.
- `sendWhatsAppText(to: string, text: string)`, `sendWhatsAppTemplate(to: string, template: 'books_digest', params: string[])`.

- [ ] **Step 1: Failing checks** (adapter and fetch mocked): `stranger ignored` (`beforeProcess` handled, no rows, no send), `allowed number passes to agent as owner`, `import from whatsapp media` (sales fixture bytes → kind `sales-summary`, `added 175`; payment fixture → kind `payment-method`), `unknown file rejected`, `bad csv returns missing columns`.
- [ ] **Step 2–4:** FAIL → implement → PASS.
- [ ] **Step 5:** Commit `feat(books): receipts and sales files over WhatsApp`.

### Task 11: Digest figures and rendering

**Files:**

- Create: `server/lib/digest-figures.ts`, `server/lib/trends.ts`, `server/lib/digest-render.ts`, `actions/build-digest.ts`, `actions/save-digest-commentary.ts`, `actions/send-digest.ts`, `actions/get-digest.ts`, `actions/list-digests.ts`
- Test: `test/digest.check.ts`, `test/trends.check.ts`

**Interfaces:**

- `digestFigures(period, days: DayResult[], previous: DayResult[] | null, extras: { topExpenses; sellers; subscriptionsByPlan; categoryMonths; marginByCategory }): DigestFigures` — daily: income, gross profit and net (gross profit − expenses) per business and combined, income by method, cash in till, top 5 expenses, flags, review count; weekly adds change vs previous, best/worst 3 sellers per business **by gross profit**, not-income by staff (at cost), rising expense categories; monthly adds P&L per business (income, cost of goods, gross profit, expenses, net), margin by Moniebook category, 3-month expense category trend, Hub subscription income by plan name, margin = gross profit ÷ income. Any figure resting on uncosted revenue carries `uncostedRevenue` so the render can say so.
- `type Signal = { direction: 'good' | 'watch'; kind: string; subject: string; now: number; before: number; change: number }` and `trendSignals(current: PeriodStats, comparison: PeriodStats, history: { flagFreeRun: number; bestEver: { day: number; week: number; month: number }; subscribers: { new: number; returning: number } }): Signal[]` — implements the spec's "Going well" / "To watch" list with Global Constraints thresholds; sorted by `|change|` descending; at most 3 of each. `PeriodStats` holds income and gross profit per business, margin per category, expense per category, The House + Leakages at cost, income per weekday, and units + margin per item. Subscriber counts use `customerName` on Subscription items and expose counts only.
- `DigestFigures.trends: Signal[]`; the job prompt (Task 12) asks the agent to word these, never to add its own.
- `renderWhatsApp(f: DigestFigures, link: string): string` (≤ 1,000 chars, no customer data); `renderEmail(f, commentary: string | null): string` (HTML via core `renderEmail`).
- `build-digest`: `{ period; start?; end? }` → `{ digestId; figures }`, saves `status 'draft'`; refuses daily when no import covers `end` with `"No sales file for <day> yet."`.
- `save-digest-commentary`: `{ digestId; commentary }` (markdown, ≤ 1,500 chars).
- `send-digest`: `{ digestId }` → sends WhatsApp template to each recipient and email; records per-recipient result; `status 'sent'` if any channel succeeded else `'failed'`.

- [ ] **Step 1: Failing checks.** `test/digest.check.ts`, all three fixtures imported, Heineken Can set to Drinks, no expenses:
  - `daily 9 Nov figures` (income per business equals `list-sales` for 9 Nov)
  - `weekly 2–8 Nov` (Mon–Sun bounds, compared with nothing earlier → no change figures)
  - `gross profit 1–9 Nov` (range build: hub `20390000`, lounge `22754120` — The House cost `1925000` charged to lounge, Perk cost `810000` to hub, Leakages "More" uncosted `100000` noted)
  - `whatsapp text has no customer or sender names` (regex `Customer \d+|Sender \d+` finds none)
  - `whatsapp under 1000 chars`
  - `daily refused without export`

  `test/trends.check.ts`, hand-built `PeriodStats`:
  - `margin up is good` (Shawarma margin 34.35 vs 32.61 → `good`, change 1.74 → **no** signal under the 2-point threshold; 35.0 vs 32.61 → signal)
  - `income up 10% is good`, `9% is nothing`
  - `house up is watch`
  - `expenses faster than income is watch`
  - `flag-free run of 3`
  - `new subscribers counted, names absent` (JSON of the result contains no customer name)
  - `three of each at most`

- [ ] **Step 2–4:** FAIL → implement → PASS.
- [ ] **Step 5:** Commit `feat(books): digest figures and delivery`.

### Task 12: Scheduling

**Files:**

- Create: `jobs/books-daily-digest.md` (`schedule: "0 7 * * *"` UTC = 08:00 Lagos), `jobs/books-weekly-digest.md` (`"0 7 * * 1"`), `jobs/books-monthly-digest.md` (`"0 7 1 * *"`), `server/routes/api/books/cron/tick.get.ts`, `vercel.json` crons `{"path": "/api/books/cron/tick", "schedule": "30 7 * * *"}`
- Test: `test/schedule.check.ts`

Job body (agent): call `build-digest` for the period; if it refuses for a missing file, call `send-reminder` and stop; read the figures; write 3–6 sentences on what changed, then "Going well" and "To watch" from `figures.trends` only (none → leave the list out), quoting only figures from the result; `save-digest-commentary`; `send-digest`.

`tick.get.ts`: `CRON_SECRET` bearer exactly as school's `daily.get.ts`; for each due period whose digest is not `sent` by 08:30 Lagos, build and send without commentary; if no export, send the reminder once per day (`reminders` key in `books_settings`). Also re-sends a pending daily digest when the export has since arrived. Add `actions/send-reminder.ts` (`"No sales file for <day> yet. Send it to this number and I'll send the report."`).

- [ ] **Step 1: Failing checks** (time injected): `missing export reminds` (reminder once, no digest saved), `export arrives later sends digest`, `already sent is not resent`, `monday sends weekly too`, `bad secret 401`.
- [ ] **Step 2–4:** FAIL → implement → PASS.
- [ ] **Step 5:** Commit `feat(books): scheduled digests with a safety net`.

### Task 13: Past receipts from a WhatsApp chat export

**Files:**

- Create: `server/lib/chat-export.ts`, `actions/import-whatsapp-history.ts`, `test/fixtures/chat-export.zip` (3 synthetic messages, 2 images)
- Test: `test/chat-export.check.ts`

**Interfaces:** `readChatExport(zip: Uint8Array): { at: string; sender: string; text: string; attachment?: { fileName; mimeType; dataBase64 } }[]` — parses `_chat.txt` lines `[DD/MM/YYYY, HH:MM:SS] Name: text` and `<attached: FILE>`; `import-whatsapp-history` (`{ zipBase64 }`, owner) returns the image messages for the agent to read one by one with `record-expense-from-receipt` `source: 'history'`, `occurredOn` from the message date unless the receipt shows one.

- [ ] **Step 1–4:** checks `three messages`, `two attachments with dates` → FAIL → implement (use `fflate`) → PASS.
- [ ] **Step 5:** Commit `feat(books): load past receipts from a chat export`.

### Task 14: Screens and application state

**Files:**

- Create: `app/routes/_app.tsx` (pathless layout with sidebar), `app/routes/_app._index.tsx` (Today), `_app.expenses.tsx`, `_app.sales.tsx`, `_app.reports.tsx`, `_app.reports.$id.tsx`, `_app.settings.tsx`, `app/components/expense-sheet.tsx`, `app/hooks/use-navigation-state.ts`, `actions/view-screen.ts`, `actions/navigate.ts`, `actions/update-settings.ts`

Screens per the spec's "Screens" section. Today: latest digest with its trends, flags, review queue (receipts `needs_review`, category guesses to confirm via `set-item-category`, items with no cost, categories with no business). Expenses: table, filters in a `Popover`, row opens `Sheet` with the receipt image and editable fields (optimistic `update-expense`). Sales: period picker, income, cost of goods and gross profit by business and method; a file drop runs `detectReport` client-side and calls the matching import action; import history (with each file's range check) in a `DropdownMenu`. Reports: list, detail renders the email HTML. Settings: `Tabs` for businesses, item categories (category → business), items (category, latest unit cost), expense categories, thresholds, recipients, connections. Partner sees no edit controls. Navigation state written to `application_state` (`page`, `period`, `expenseCode`, `digestId`); `view-screen` returns it.

- [ ] **Step 1:** Implement screens; `pnpm --filter books typecheck` clean.
- [ ] **Step 2:** With the dev server and the fixture imported, verify in the browser pane: Today shows 10 Nov flags and the Heineken Can category guess; editing an expense's business in the sheet updates the row without a spinner; signed in as a member, no edit controls render and `update-expense` returns the owner message.
- [ ] **Step 3:** Commit `feat(books): screens`.

### Task 15: Onboarding and secrets

**Files:**

- Create: `server/plugins/onboarding.ts`

Register secrets (`registerRequiredSecret`): `WHATSAPP_ACCESS_TOKEN`, `WHATSAPP_VERIFY_TOKEN`, `WHATSAPP_PHONE_NUMBER_ID`, `WHATSAPP_APP_SECRET`, `MONIEPOINT_WEBHOOK_SECRET`, `CRON_SECRET`. Onboarding steps (`registerOnboardingStep`), in the spec's order: WhatsApp number + `books_digest` template, Moniepoint webhook, email sender, owner/partner numbers and emails (writes `books_settings` via `update-settings`), first import (item report first, then sales summaries and payment method reports).

- [ ] **Step 1:** Implement; dev server shows the five steps in the setup checklist; completing "numbers" persists to `books_settings`.
- [ ] **Step 2:** Commit `feat(books): setup checklist`.

### Task 16: Simulation

**Files:**

- Create: `test/sim/run.ts`, `test/sim/week.ts`, `test/README.md`

A fresh SQLite DB; imports the item fixture, then the sales fixture, then a one-day payment method report per day built from the fixture's orders (cash and transfer parts from the planted events), through the HTTP actions as the owner; posts signed Moniepoint events for every transfer and card reference except three chosen gaps (one plain transfer, one split leg, one accepted-manually); records 12 synthetic expenses (two duplicates, one over ₦100,000, one diesel spike); builds daily digests for 1–10 Nov and the weekly digest for 3–9 Nov; asserts each digest's figures against totals computed independently in the sim from the fixture; asserts exactly the three gaps and the planted expense issues appear as flags; asserts the 1–9 Nov gross profit figures from Task 11; asserts the weekly digest has at least one trend signal; writes `test-runs/<run>/report.md`.

- [ ] **Step 1:** `pnpm --filter books sim` → report written, exit 0, all assertions PASS.
- [ ] **Step 2:** Commit `test(books): a simulated ten days`.

---

## Not in this plan

- `import-moniepoint-statement` (spec fallback): needs a real Moniepoint statement export to parse. Add it as its own task once one is in hand, or once setup shows the feed lacks bank transfers.
- Opay statement upload, stock and cost of goods, a second branch (spec "Not in this version").
