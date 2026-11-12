# Books — design

A template for a small business owner who runs more than one business from
one till, records sales in the Moniepoint inventory app, and pays expenses
from receipts sent to WhatsApp. Books brings both in every day, reconciles
money in against money out, and sends a daily, weekly and monthly digest to
the owner and a business partner.

Built as `templates/books/`, following the layout of `templates/school/`:
domain tables in `server/db/schema.ts` with additive migrations in
`server/plugins/db.ts`, operations in `actions/`, design notes in `docs/`,
checks in `test/*.check.ts` and a simulation in `test/sim/`.

## The problem

The owner runs two businesses from one Moniepoint inventory app and one
branch:

- **Restaurant & Lounge** — food and drink.
- **Hub** — a co-working space sold as daily, night, weekly, half-month and
  monthly subscriptions, extra hours and room usage.

Sales are recorded in the inventory app. Expenses are paid by the owner, and
the receipts are pasted into a WhatsApp group (now only the owner is in it).
Nothing puts the two side by side, so the owner cannot see, day to day,
whether money recorded as received actually arrived, where cash went, what
was given away, or which costs are growing. The partner, who co-owns both
businesses, sees none of it.

### What Moniebook exports

Moniebook (the inventory app's web dashboard, `moniebook.moniepoint.com`)
exports several reports as CSV. Three are used:

| Report             | Grain                         | Gives Books                                                    | Sent                                        |
| ------------------ | ----------------------------- | -------------------------------------------------------------- | ------------------------------------------- |
| **Sales summary**  | One row per order             | Every sale, its items, payment parts, references, change       | Daily                                       |
| **Payment method** | One row per method, for range | Amount and count per method, with split parts counted per part | Daily                                       |
| **Sales by item**  | One row per item, for range   | Each item's **category** and **cost of items**                 | Weekly, and whenever items or prices change |

Sales by category is not needed: it is the item report summed by category.

**Date ranges end at the start of the end date.** A range of "Nov 1, 12:00
AM → Nov 10, 12:00 AM" covers 1–9 Nov. One day is exported as that day
12:00 AM → the next day 12:00 AM. The file name carries the range
(`payment-method-report-2026-11-01-2026-11-10.csv`); Books reads the end as
exclusive and then checks the file against the sales summary for the same
days (see Reconciliation), so a mis-set range is caught, not counted.

Checked on 1–9 Nov: the payment method report's Bank Transfer row (105
payments, ₦524,300) is the 59 single-method transfers (₦309,900) plus the 46
transfer parts of split orders (₦214,400); its Cash row (34, ₦34,500) is 17
cash sales (₦28,400) plus 17 cash parts of splits (₦6,100). The item report's
units (465) and gross sales (₦1,062,900) equal the sales summary's completed
orders exactly, and include The House, Subscription Perk and Leakages.

### What the sales summary contains

A sample export (1–10 Nov 2026, 175 orders) settles the shape. It is one row
per order with these columns, among others:

| Column               | Use                                                                            |
| -------------------- | ------------------------------------------------------------------------------ |
| `orderNumber`        | Unique per order — the key for re-imports                                      |
| `orderDate`          | Local date and time of the sale                                                |
| `status`             | `COMPLETED` or `CANCELLED` (with `cancelledBy`, `cancelledAt`)                 |
| `refundStatus`       | `NOT_REFUNDED` or a refund, with `refundAmount`                                |
| `staffName`          | Who rang the sale                                                              |
| `customerName`       | Sometimes set (hub subscribers)                                                |
| `total`              | Order total in naira                                                           |
| `collectedAmount`    | What the customer paid; more than `total` when they overpaid                   |
| `change`             | Cash handed back from the till for an overpayment                              |
| `paymentMode`        | `REGULAR` (one method) or `SPLIT` (several)                                    |
| `paymentMethodNames` | Comma-separated, e.g. `Bank Transfer, Cash`                                    |
| `paymentDetails`     | `\|\|`-separated per payment: transfer reference, bank, sender; card RRN, etc. |
| `itemNames`          | `\|`-separated `N x Item`                                                      |
| `unitPrice`          | `\|`-separated `Item - price`                                                  |

Payment methods seen, and what each means:

| Method            | Meaning                                                                 | Counts as            |
| ----------------- | ----------------------------------------------------------------------- | -------------------- |
| Bank Transfer     | Transfer into the Moniepoint account, with an `AP_TRSF\|…\|<id>` ref    | Income → Moniepoint  |
| Card              | Card on the Moniepoint POS, with RRN and `PUR\|…` ref                   | Income → Moniepoint  |
| Accepted manually | A transfer to Moniepoint the cashier accepted without linking to a sale | Income → Moniepoint  |
| Cash              | Cash at the till                                                        | Income → Cash        |
| Transfer to Opay  | Transfer to the Opay account (mostly Hub)                               | Income → Opay        |
| The House         | Given away, or taken by the owner                                       | Not income           |
| Subscription Perk | Free meal for a monthly Hub subscriber                                  | Not income; Hub cost |
| Leakages          | Recorded loss                                                           | Not income           |

Four facts in the samples shape the design:

1. **Payment method does not decide the business.** A Hub night subscription
   was paid by Bank Transfer to Moniepoint. The business comes from the
   item's category: `Subscription` is the Hub; Drinks, Shawarma, Meals and
   Water are the Lounge.
2. **Split payments carry no per-part amounts per order.** A `SPLIT` order is
   paid in several parts: two or three bank transfers adding up to the sale,
   or transfers plus cash. The sales summary gives the order total and each
   transfer's reference, but not how much each part was. In the sample, 33
   of 175 orders are split: 14 by two or three transfers with no cash
   (₦109,400), 17 by one transfer plus cash, and 2 by two transfers plus cash.
   The **payment method report** gives the day's totals per method with
   split parts included, so the day's cash is exact without the feed; the
   **Moniepoint feed** gives each transfer's amount, so each order can be
   checked.
3. **Overpayments are returned in cash.** When a customer transfers more than
   the bill, the cashier hands the difference back from the till, recorded
   in `change`. In 1–9 Nov: ₦4,900 on 2 Nov and ₦300 on 6 Nov, both on
   transfer-paid orders. Cash left in the till is cash collected minus change.
4. **Cost is known per item.** The item report's cost of items divided by
   units sold gives each item's unit cost, so free items, leakages and gross
   profit can be valued at cost. Hub items carry a cost too (e.g. ₦20,000 per
   monthly plan); Books treats it as the Hub's direct cost, as Moniebook does.

## Decisions taken

| Question                          | Answer                                                                                                            |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| Where it lives                    | New template `templates/books/`, same structure as `templates/school/`                                            |
| Who uses it                       | One org: owner (edits) and partner (reads everything, changes nothing)                                            |
| Businesses                        | Restaurant & Lounge, Hub — stored as rows, editable, not hardcoded                                                |
| Business of a sale                | From the item's Moniebook category, via an editable category → business map (Subscription → Hub, others → Lounge) |
| Item with no category             | The agent picks a category from the name (e.g. Heineken Can → Drinks); counted at once, shown for confirmation    |
| Item not yet in any item report   | Same as no category; its cost is unknown until the next item report, and gross profit says so                     |
| Sales sources                     | Sales summary and payment method report daily; Sales by item weekly — sent to WhatsApp or uploaded                |
| Date ranges                       | End date is exclusive; every file is checked against the sales summary for the same days                          |
| Cost of goods                     | Unit cost from the latest item report on or before the sale's day                                                 |
| Change                            | Paid from the till; subtracted from cash                                                                          |
| Scheduled email from Moniebook    | Unknown whether Moniebook can; not built. If it can, an email intake can be added later                           |
| Re-sending an export              | Safe: orders upsert by `orderNumber`; later files update status (cancellations, refunds)                          |
| Logging in to Moniepoint as a bot | Not built — OTP and device checks break it, it needs the banking password, and likely breaks Moniepoint's terms   |
| Moniepoint data                   | Moniepoint's official signed webhook feed, matched to sales by reference                                          |
| If transfers aren't in the feed   | Fallback: Moniepoint account statement export sent to the WhatsApp number weekly, parsed the same way             |
| Expense source                    | Photos/PDFs/short texts sent to a WhatsApp Business (Cloud API) number                                            |
| Expense business and category     | Agent guesses from the receipt; owner corrects by reply or in the app                                             |
| Subscription Perk                 | Valued at cost and charged to the Hub as a cost; menu value shown alongside                                       |
| The House, Leakages               | Not income; valued at cost, with menu value shown alongside                                                       |
| Trends                            | Every digest has "Going well" and "To watch", computed in code, written up by the agent                           |
| Accepted manually                 | Moniepoint income; matched to an unlinked Moniepoint transfer by amount and time, else flagged                    |
| Opay                              | Reported as recorded; no feed. A statement upload can be added later like the Moniepoint fallback                 |
| Who computes figures              | Code. The agent writes commentary from computed figures and never does arithmetic of its own                      |
| Digest delivery                   | WhatsApp summary + link, email, and a Reports page in the app                                                     |
| Digest times (Africa/Lagos)       | Daily 08:00 for the previous day; weekly Monday 08:00; monthly on the 1st at 08:00                                |
| History                           | Older exports uploaded once; old WhatsApp group exported once (with media) and read as receipts                   |
| Customer data                     | Stored in the app; never shown in digests                                                                         |

## Data

All tables are ownable (`...ownableColumns()`), scoped to the org, read
through `accessFilter` / `resolveAccess`, and written through
`assertAccess`. Amounts are stored as integer kobo to avoid rounding.

- **`businesses`** — `id`, `name`, `slug` (`lounge`, `hub`).
- **`item_categories`** — `name` (as in Moniebook), `businessId`. Seeded:
  Subscription → Hub; Drinks, Shawarma, Meals, Water → Lounge. A new
  category name is assigned by the agent and shown for confirmation.
- **`items`** — every item name ever seen: `name` (as in the export),
  `categoryId` (null until known), `categorySource` (`moniebook` / `agent` /
  `owner`), `confirmed` (false for agent guesses until the owner confirms).
  Business follows from the category.
- **`item_costs`** — `itemId`, `unitCost`, `effectiveFrom` (the item
  report's start day), `importId`. A sale line's cost is the latest row with
  `effectiveFrom` ≤ the sale's day.
- **`sales`** — one row per order: `orderNumber` (unique), `orderedAt`, `branchName`,
  `status`, `refundAmount`, `staffName`, `customerName`, `total`,
  `collectedAmount`, `change`, `paymentMode`, `importId`. Cancelled orders
  are kept but excluded from totals.
- **`payment_method_totals`** — one row per method per imported range:
  `rangeStart`, `rangeEnd` (exclusive), `method`, `payments`, `collected`,
  `refunded`, `net`, `importId`. Only single-day ranges feed the daily cash
  figure; longer ranges are used for checks only.
- **`sale_lines`** — `saleId`, `itemId`, `quantity`, `unitPrice`,
  `lineTotal`. Business and cost are resolved at reconciliation time from
  the item's category and `item_costs`, so a later category change or item
  report re-prices past days on the next reconciliation.
- **`sale_payments`** — one row per payment inside an order: `saleId`,
  `method`, `reference` (transfer `<id>` or card RRN), `amount` (known for
  single-method orders; null for split legs until reconciled), `bank`,
  `senderName`, `senderAccountMasked`.
- **`moniepoint_events`** — raw signed webhook events: `webhookId` (unique),
  `receivedAt`, `type`, `reference`, `amount`, `occurredAt`, `payload`.
- **`expenses`** — `occurredOn`, `vendor`, `amount`, `businessId`,
  `categoryId`, `paidWith` (`cash` / `transfer` / `card` / `unknown`),
  `status` (`needs_review` / `confirmed`), `receiptMediaId`, `imageHash`,
  `rawText`, `lineItems` (JSON), `source` (`whatsapp` / `upload` /
  `history`), `messageId`.
- **`expense_categories`** — editable list, seeded: Food & drink stock, Diesel /
  power, Salaries, Rent, Repairs, Internet, Supplies, Other.
- **`imports`** — each export or statement file: `kind`, `fileName`,
  `rangeStart`, `rangeEnd`, `rowsAdded`, `rowsUpdated`, `receivedVia`.
- **`reconciliations`** — one row per day: computed figures (JSON) and the
  list of flags.
- **`digests`** — `period` (`daily` / `weekly` / `monthly`), `start`, `end`,
  `figures` (JSON), `commentary` (markdown), `sentAt`, delivery results.
- **`settings`** — thresholds (The House / Leakages per day, large expense,
  category spike %), recipients, digest times.

Every migration is additive (`CREATE TABLE IF NOT EXISTS`, new columns only).

## Getting data in

### Receipts via WhatsApp

Uses the framework WhatsApp Cloud API adapter
(`packages/core/src/integrations/adapters/whatsapp.ts`) and the
integration queue pattern (verify → enqueue to `integration_pending_tasks`
→ return 200 → process in a fresh execution). The adapter is text-only
today; it is extended to accept `image` and `document` messages and fetch
their media from the Graph API. That is a framework change and ships with a
changeset for `@agent-native/core`.

1. Only messages from allow-listed numbers (the owner's; the partner's if
   enabled) are processed. Others are ignored.
2. An image or PDF is stored, hashed, and handed to the agent with the
   `record-expense-from-receipt` action. The agent reads vendor, date,
   amount, line items and payment method, picks a business and category,
   and saves the expense as `needs_review` unless confident on all fields.
3. A short text with an amount ("gateman 5000 cash") becomes an expense with
   no receipt.
4. Books replies: _"Power ₦45,000 · Hub · E-12. Reply to change."_ A reply
   ("lounge", "that's salaries") is matched to the expense by its code from
   the conversation, and updates it.
5. Duplicate check before saving: same image hash, or same vendor + amount +
   date. On a match Books asks before adding.

### The inventory export

Sent to the same number as a document, or dropped on the Sales page. The
upload calls `import-sales-export`; on WhatsApp the agent calls
`import-sales-from-whatsapp`, which fetches the file and takes the same path.
The webhook only queues the message; nothing is imported inside it.

- Parse with a CSV parser that handles quoted fields; split
  `paymentMethodNames`, `paymentDetails`, `itemNames` and `unitPrice` on
  their separators.
- Upsert each order by `orderNumber`. A changed `status` or refund updates
  the existing row.
- Single-method orders get one `sale_payments` row with `amount = total`.
  Split orders get one row per leg with the reference where present and
  `amount` null.
- An item name not yet known is created without a category. The agent picks
  one from the name (Heineken Can → Drinks) as an unconfirmed guess, which
  counts at once and appears in the review queue. A name it cannot place
  ("More") is asked about on WhatsApp; until answered its sales count under
  "Unassigned".
- A file whose headers don't match is rejected with a message naming the
  missing columns.

### The payment method and item reports

Sent the same way. Books tells the three files apart by their header row,
not their name. `import-payment-method-report` and `import-item-report`
read the range from the file name (end exclusive); if the name carries no
range, the agent asks for it.

- **Payment method report**: one `payment_method_totals` row per method.
- **Item report**: for each item, set its category (`categorySource =
moniebook`, confirmed — overriding an agent guess) and add an `item_costs`
  row with `unitCost = cost of items ÷ total sold` when units sold > 0. An
  item with an empty category gets an agent guess as above. Category names
  not in `item_categories` are added and assigned by the agent.
- After either import, the covered days are re-reconciled.

### Moniepoint feed

`POST /api/moniepoint/webhook` (an `/api` route because it is a webhook):
verify the HMAC-SHA256 signature over webhook id + timestamp + raw body,
drop repeats by `webhookId`, store in `moniepoint_events`, enqueue
reconciliation for that day. The secret is registered with the `secrets`
pattern and shown as an onboarding step.

Open risk, settled at setup: the published webhook catalogue describes POS
purchase events. If incoming bank transfers are not delivered, the weekly
statement fallback (`import-moniepoint-statement`) fills
`moniepoint_events` from the account statement export instead.

### History

- `import-sales-export` accepts any date range, so past months load the
  same way.
- `import-whatsapp-history` takes a WhatsApp chat export (zip with media),
  reads each image as a receipt with `source = history`, and dates it from
  the message timestamp.

## Reconciliation

Runs per day once that day's export is in, and again when late Moniepoint
events arrive. Implemented as pure functions in `server/lib/reconcile.ts`
over the day's rows, so it is testable without a database.

1. **Moniepoint match.** Every `sale_payments` row with a Moniepoint method
   and a reference is matched to a `moniepoint_events` row by reference.
   Matched split legs take the event's amount.
2. **Split orders.** Once every transfer leg is matched, the legs are
   summed:
   - **Transfers only** (no Cash method): the legs should add up to the
     order total. A shortfall is flagged as money short on that sale; an
     excess is flagged as an overpayment (often change owed or a transfer
     meant for another order).
   - **Transfers plus cash**: cash is the total minus the matched legs. A
     negative result is flagged the same way as an excess.
   - **Any leg unmatched**: the order is flagged and its cash share or
     shortfall is shown as unknown rather than guessed.
   - **One reference on two orders**: allowed (one transfer paying for two
     orders). The event's amount is shared across them, and flagged if their
     unpaid amounts don't add up to it.
3. **Accepted manually.** Each is matched to an unlinked Moniepoint event of
   the same amount within ±2 hours; ties pick the nearest time.
4. **Cash collected.** From the day's payment method report when one covers
   exactly that day: its Cash `collected`. Otherwise cash sales plus the cash
   part of split orders from step 2 (unknown if any part is unknown).
5. **Expected cash in till** = cash collected − the day's `change` (sales
   summary) − expenses with `paidWith = cash`.
6. **File cross-checks.** For a day with a payment method report: the sum of
   its methods' `collected` must equal the sales summary's completed
   `collectedAmount`; single-method totals per method must not exceed the
   report's figure for that method; and where the Moniepoint feed has every
   transfer of the day, the report's Bank Transfer total must equal them.
   For an item report: its gross sales must equal the sales summary's
   completed totals over the same days. Any mismatch is flagged as "files
   don't agree" with both figures — usually a wrong date range.
7. **Cost and gross profit.** Each completed line's cost = quantity × unit
   cost. Gross profit per business = income − cost of goods sold (paid lines
   only) − cost of The House, Leakages and Subscription Perk lines. Lines
   whose item has no cost yet are counted with cost unknown, and the figure
   says how much revenue that covers.
8. **Not income.** The House, Subscription Perk and Leakages at cost and at
   menu value, per business and per staff member. Perk cost is charged to
   the Hub.
9. **Flags.**
   - Moniepoint money with no sale against it (possible unrecorded sale).
   - A sale whose transfer reference never arrived (possible fake or failed
     transfer).
   - Accepted manually with no matching transfer.
   - Split orders whose transfers fall short of, or exceed, the total.
   - Files that don't agree (step 6).
   - Unconfirmed category guesses and items with no cost.
   - Orders cancelled after completion, with who cancelled.
   - The House or Leakages above the daily threshold.
   - Any expense above the large-expense threshold.
   - A category more than the spike % above its 4-week daily average.
   - Possible duplicate receipts.
   - Expenses still `needs_review`.

## Digests

Figures are built by `server/lib/digest-figures.ts` from sales, expenses and
reconciliations. The agent receives the figures and writes the commentary —
what happened, what to look at — quoting only numbers it was given. The
digest is saved before it is sent, so a failed delivery never loses a
report.

- **Daily** (08:00, previous day): income, gross profit and net (after
  expenses) per business and combined; income by method; expected cash in
  till; the 5 largest expenses; reconciliation results and flags; count of
  items awaiting review.
- **Weekly** (Monday 08:00): the same for the week; change on the previous
  week; best and worst sellers per business by gross profit; sales and The
  House / Leakages per staff member; categories that rose.
- **Monthly** (1st, 08:00): P&L per business and combined (income, cost of
  goods, gross profit, expenses, net); margin by Moniebook category; expense
  category trend over 3 months; Hub subscription income by plan; margin
  trend.

### Trends: going well and to watch

Every digest ends with two short lists. The signals are computed in
`server/lib/trends.ts`; the agent words them and picks at most three of each,
largest first. Comparisons: daily against the same weekday's 4-week average;
weekly against the previous week and the 4-week average; monthly against the
previous month.

- **Going well**: a business's income or gross profit up by 10% or more; a
  category's margin up by 2 points or more (e.g. Shawarma 34.4% in 1–9 Nov
  against 32.6% over 30 days); a best day, week or month since records
  began; new Hub subscribers or renewals (customers on Subscription items
  not seen in the previous 30 days, and those seen again); an expense
  category down by 10% or more; a run of 3+ days with no reconciliation
  flags.
- **To watch**: the same measures moving the other way by the same amounts;
  The House or Leakages up on the comparison; expenses growing faster than
  income; the weakest weekday by income for the period; an item selling
  more while its margin falls.

Customer names are used only to count new and returning subscribers; the
digest shows counts, never names.

If no export covering the previous day has arrived by 08:00, the owner gets a
reminder instead of a daily digest, and the digest is sent when the export
arrives.

Scheduling uses the framework recurring-jobs mechanism.

### Delivery

- **WhatsApp**: a short summary with a link to the full report, sent to the
  owner and partner. Business-initiated messages need a Meta-approved
  template; one template (`daily_digest` with a summary and link parameter)
  is registered at setup. The partner messages the number once to opt in.
- **Email**: the full report, via the framework email sender.
- **App**: every digest is on the Reports page.

## Screens

Following the template UX rules — one focused surface each, secondary
actions behind menus.

- **Today** — latest digest, flags, and the review queue (receipts to
  confirm, category guesses to confirm, items with no cost).
- **Expenses** — list with filters; a row opens a sheet with the receipt
  image and editable fields.
- **Sales** — totals by business and method for a chosen period; import
  history behind a menu.
- **Reports** — past digests.
- **Settings** — businesses, categories, item map, thresholds, recipients,
  connections (WhatsApp, Moniepoint, email).

Application state exposes the current page, period and selected expense or
digest, so the agent knows what the user is looking at.

## Actions

All in `actions/` with `defineAction`, used by the agent, the UI and the
WhatsApp handler alike. Writes require the owner role.

| Action                         | Purpose                                                          |
| ------------------------------ | ---------------------------------------------------------------- |
| `import-sales-export`          | Parse and upsert an inventory CSV                                |
| `import-sales-from-whatsapp`   | Fetch a CSV sent on WhatsApp, detect which report, and import it |
| `import-payment-method-report` | Load a payment method report                                     |
| `import-item-report`           | Load categories and unit costs from Sales by item                |
| `set-item-category`            | Confirm or change an item's category                             |
| `set-category-business`        | Map a Moniebook category to a business                           |
| `import-moniepoint-statement`  | Fallback: load Moniepoint transfers from a statement             |
| `import-whatsapp-history`      | Load past receipts from a chat export                            |
| `record-expense-from-receipt`  | Save an expense read from a receipt                              |
| `record-expense`               | Save an expense from fields or a short text                      |
| `update-expense`               | Change business, category, amount, status                        |
| `list-expenses` / `list-sales` | Filtered lists                                                   |
| `reconcile-day`                | Recompute a day's reconciliation                                 |
| `build-digest`                 | Compute figures and commentary for a period                      |
| `send-digest`                  | Deliver a saved digest                                           |
| `get-digest` / `list-digests`  | Read reports                                                     |
| `update-settings`              | Thresholds, recipients, times                                    |
| `view-screen` / `navigate`     | Context and navigation                                           |

## Access

- Owner: full control. Partner: org member with a read-only role; write
  actions check the role and refuse.
- The agent acting for the partner gets only read actions, and no raw SQL
  tool.

## Setup (onboarding steps)

1. WhatsApp Business number on the Cloud API: access token, verify token,
   phone number id, app secret; webhook URL pasted into Meta; digest
   template submitted.
2. Moniepoint: POS developer access in the Moniepoint Business dashboard;
   webhook subscription to Books' URL; signing secret.
3. Email sender.
4. Owner and partner phone numbers and emails.
5. First import: a recent item report (categories and costs), then sales
   summaries and payment method reports, and optionally the old WhatsApp
   group.

## Testing

- **Fixtures**: the 1–10 Nov sales summary with customer names, sender names
  and account digits replaced by fakes (`test/fixtures/sales-sample.csv`),
  and the 1–9 Nov payment method and item reports, which carry no personal
  data (`payment-method-sample.csv`, `item-sample.csv`). Raw exports with
  personal data are never committed.
- **Checks** (`test/*.check.ts`): export parsing (quoted fields, split
  payments, multi-item orders, cancellations, re-import upsert, change);
  report detection by header; date-range cross-checks; categories and unit
  costs; gross profit; trends; reconciliation (reference match, multi-transfer splits short and over, split cash, accepted
  manually, unmatched in both directions); digest figures to the naira for
  the fixture's ten days; webhook signature and dedupe; role refusal for the
  partner.
- **Simulation** (`test/sim/`): a week of exports, Moniepoint events and
  receipts fed through the actions against a fresh SQLite database, with the
  daily, weekly and monthly digests checked against known totals.

## Not in this version

- Stock levels (Moniebook has inventory and stock-movement reports; not used
  yet).
- Opay feed.
- More than one branch (the export has one; `branchName` is stored
  so a second can be added).
- Bot login to Moniepoint.
