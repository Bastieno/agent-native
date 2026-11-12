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

### What the inventory export contains

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

Two facts in the sample shape the design:

1. **Payment method does not decide the business.** A Hub night subscription
   was paid by Bank Transfer to Moniepoint. The business comes from the item.
2. **Split payments carry no per-leg amounts.** A `SPLIT` order is paid in
   several parts: two or three bank transfers adding up to the sale, or
   transfers plus cash. The export gives the order total and each
   transfer's reference, but not how much each part was. The Moniepoint feed
   supplies each transfer's amount. In the sample, 33 of 175 orders are
   split: 14 by two or three transfers with no cash (₦109,400), 17 by one
   transfer plus cash, and 2 by two transfers plus cash.

## Decisions taken

| Question                          | Answer                                                                                                          |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| Where it lives                    | New template `templates/books/`, same structure as `templates/school/`                                          |
| Who uses it                       | One org: owner (edits) and partner (reads everything, changes nothing)                                          |
| Businesses                        | Restaurant & Lounge, Hub — stored as rows, editable, not hardcoded                                              |
| Business of a sale                | From the item, via an item → business map; new items are asked about once                                       |
| Sales source                      | The inventory CSV export, sent to the WhatsApp number or uploaded in the app                                    |
| Re-sending an export              | Safe: orders upsert by `orderNumber`; later files update status (cancellations, refunds)                        |
| Logging in to Moniepoint as a bot | Not built — OTP and device checks break it, it needs the banking password, and likely breaks Moniepoint's terms |
| Moniepoint data                   | Moniepoint's official signed webhook feed, matched to sales by reference                                        |
| If transfers aren't in the feed   | Fallback: Moniepoint account statement export sent to the WhatsApp number weekly, parsed the same way           |
| Expense source                    | Photos/PDFs/short texts sent to a WhatsApp Business (Cloud API) number                                          |
| Expense business and category     | Agent guesses from the receipt; owner corrects by reply or in the app                                           |
| Subscription Perk                 | Valued at menu price and charged to the Hub as a cost                                                           |
| Accepted manually                 | Moniepoint income; matched to an unlinked Moniepoint transfer by amount and time, else flagged                  |
| Opay                              | Reported as recorded; no feed. A statement upload can be added later like the Moniepoint fallback               |
| Who computes figures              | Code. The agent writes commentary from computed figures and never does arithmetic of its own                    |
| Digest delivery                   | WhatsApp summary + link, email, and a Reports page in the app                                                   |
| Digest times (Africa/Lagos)       | Daily 08:00 for the previous day; weekly Monday 08:00; monthly on the 1st at 08:00                              |
| History                           | Older exports uploaded once; old WhatsApp group exported once (with media) and read as receipts                 |
| Customer data                     | Stored in the app; never shown in digests                                                                       |

## Data

All tables are ownable (`...ownableColumns()`), scoped to the org, read
through `accessFilter` / `resolveAccess`, and written through
`assertAccess`. Amounts are stored as integer kobo to avoid rounding.

- **`businesses`** — `id`, `name`, `slug` (`lounge`, `hub`).
- **`items`** — every item name ever seen: `name` (as in the export),
  `businessId` (null until known), `source` (`rule` / `agent` / `owner`).
  Seeded rules: names containing _subscription_, _hub_, _hour_, _full day_,
  _weekend plan_, _weekly plan_ → Hub. Any other new name goes to the agent,
  which assigns obvious food and drink to the Lounge (`source = agent`) and
  leaves the rest unassigned for the owner.
- **`sales`** — one row per order: `orderNumber` (unique), `orderedAt`, `branchName`,
  `status`, `refundAmount`, `staffName`, `customerName`, `total`,
  `paymentMode`, `importId`. Cancelled orders are kept but excluded from
  totals.
- **`sale_lines`** — `saleId`, `itemId`, `quantity`, `unitPrice`,
  `lineTotal`, `businessId` (copied from the item at import, re-resolved when
  the item is assigned later).
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
- **`categories`** — editable list, seeded: Food & drink stock, Diesel /
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
4. Books replies: _"Diesel ₦45,000 · Hub · Power. Reply to change."_ A reply
   ("lounge", "that's salaries") is routed to the same expense by quoted
   message id and updates it.
5. Duplicate check before saving: same image hash, or same vendor + amount +
   date. On a match Books asks before adding.

### The inventory export

Sent to the same number as a document, or dropped on the Sales page. Both
call `import-sales-export`.

- Parse with a CSV parser that handles quoted fields; split
  `paymentMethodNames`, `paymentDetails`, `itemNames` and `unitPrice` on
  their separators.
- Upsert each order by `orderNumber`. A changed `status` or refund updates
  the existing row.
- Single-method orders get one `sale_payments` row with `amount = total`.
  Split orders get one row per leg with the reference where present and
  `amount` null.
- New item names are assigned by rule or by the agent. Any it cannot place
  stay unassigned, and Books messages the owner once per import listing them
  ("New items: _More_ — Hub or Lounge?"); the reply assigns them. Sales with
  unassigned items count under "Unassigned" until then.
- A file whose headers don't match is rejected with a message naming the
  missing columns.

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
4. **Cash.** Cash sales plus the cash part of split orders from step 2.
5. **Expected cash in hand** = day's cash income − expenses with
   `paidWith = cash`.
6. **Not income.** The House, Subscription Perk and Leakages totals per
   business and per staff member. Perk value is added to Hub costs.
7. **Flags.**
   - Moniepoint money with no sale against it (possible unrecorded sale).
   - A sale whose transfer reference never arrived (possible fake or failed
     transfer).
   - Accepted manually with no matching transfer.
   - Split orders whose transfers fall short of, or exceed, the total.
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

- **Daily** (08:00, previous day): net per business and combined; income by
  method; the 5 largest expenses; reconciliation results and flags; count of
  receipts awaiting review.
- **Weekly** (Monday 08:00): the same for the week; change on the previous
  week; best and worst sellers per business; sales and The House / Leakages
  per staff member; categories that rose.
- **Monthly** (1st, 08:00): P&L per business and combined; category trend
  over 3 months; Hub subscription income by plan; margin trend.

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
  confirm, items to assign).
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

| Action                         | Purpose                                              |
| ------------------------------ | ---------------------------------------------------- |
| `import-sales-export`          | Parse and upsert an inventory CSV                    |
| `import-moniepoint-statement`  | Fallback: load Moniepoint transfers from a statement |
| `import-whatsapp-history`      | Load past receipts from a chat export                |
| `record-expense-from-receipt`  | Save an expense read from a receipt                  |
| `record-expense`               | Save an expense from fields or a short text          |
| `update-expense`               | Change business, category, amount, status            |
| `list-expenses` / `list-sales` | Filtered lists                                       |
| `assign-item`                  | Set an item's business                               |
| `reconcile-day`                | Recompute a day's reconciliation                     |
| `build-digest`                 | Compute figures and commentary for a period          |
| `send-digest`                  | Deliver a saved digest                               |
| `get-digest` / `list-digests`  | Read reports                                         |
| `update-settings`              | Thresholds, recipients, times                        |
| `view-screen` / `navigate`     | Context and navigation                               |

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
5. First import: recent export and, optionally, the old WhatsApp group.

## Testing

- **Fixture**: the sample export with customer names, sender names and
  account digits replaced by fakes, at `test/fixtures/sales-sample.csv`. The
  raw export is never committed.
- **Checks** (`test/*.check.ts`): export parsing (quoted fields, split
  payments, multi-item orders, cancellations, re-import upsert); item →
  business rules; reconciliation (reference match, multi-transfer splits short and over, split cash, accepted
  manually, unmatched in both directions); digest figures to the naira for
  the fixture's ten days; webhook signature and dedupe; role refusal for the
  partner.
- **Simulation** (`test/sim/`): a week of exports, Moniepoint events and
  receipts fed through the actions against a fresh SQLite database, with the
  daily, weekly and monthly digests checked against known totals.

## Not in this version

- Stock levels and cost of goods (the export has no cost prices).
- Opay feed.
- More than one branch (the export has one; `branchName` is stored
  so a second can be added).
- Bot login to Moniepoint.
