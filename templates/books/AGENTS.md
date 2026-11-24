# Books — Agent Guide

This app follows the agent-native core philosophy: the agent and UI are equal partners. Everything the UI can do, the agent can do via actions. The agent always knows what you're looking at via application state. See the root AGENTS.md for full framework documentation.

This is an **@agent-native/core** application -- the AI agent and UI share state through a SQL database, with SSE for in-process live sync and polling as the cross-process/serverless fallback. **When you (the agent) write data, the UI must reflect the change without a manual refresh.** This is non-negotiable. Use `useActionQuery` / `useActionMutation` for action-backed data (preferred). If you use raw `useQuery`, fold `useChangeVersions([<source>, "action"])` into the key for targeted refreshes. See the `real-time-sync` and `adding-a-feature` skills.

## Resources

Resources are SQL-backed persistent files for storing notes, learnings, and context.

**At the start of every conversation, read these resources (both personal and shared scopes):**

1. **`AGENTS.md`** — user-specific context. Read both `--scope personal` and `--scope shared`.
2. **`LEARNINGS.md`** — app memory with user preferences and corrections. Read both scopes.

**Update `LEARNINGS.md` when you learn something important.**

### Resource scripts

| Action            | Args                                           | Purpose                 |
| ----------------- | ---------------------------------------------- | ----------------------- |
| `resource-read`   | `--name <name> [--scope personal\|shared]`     | Read a resource         |
| `resource-write`  | `--name <name> --content <text> [--scope ...]` | Write/update a resource |
| `resource-list`   | `[--scope personal\|shared]`                   | List all resources      |
| `resource-delete` | `--name <name> [--scope personal\|shared]`     | Delete a resource       |

## Application State

Ephemeral UI state is stored in the SQL `application_state` table, accessed via `readAppState(key)` and `writeAppState(key, value)` from `@agent-native/core/application-state`.

| State Key    | Purpose                                                                                                                                      | Direction                  |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| `navigation` | Current view (`overview`, `review`, `money-in`, `money-out`, `reports`, `settings`), plus `expenseCode`, `digestId`, `start`, `end` when set | UI -> Agent (read-only)    |
| `navigate`   | Navigate command (one-shot, auto-deleted)                                                                                                    | Agent -> UI (auto-deleted) |

## Where money goes (the owner's answers)

- Work someone did for a business that is not a repair or a salary (cleaners, security, a photographer, a consultant, an accountant) is Services, for that business.
- DSTV (subscriptions: TV & subscriptions; fixes and decoders: Repairs) is the Lounge's.
- Diesel / power and Repairs are the Hub's; Internet (Starlink, Canal+) is the Hub's; other running costs are the Lounge's.
- "For fuel" paid to someone on the staff list is generator fuel (Diesel / power, Hub); paid to anyone else (a filling station) it is the owner's car: Owner's pay.
- A salary goes to the business its person works for (`list-staff`, `set-staff-business`; Settings → Categories → Staff).
- Refunds to customers (a subscription, hub usage, part of what they paid) are their own category and come off that business's income. Paying someone back for stock they bought is that stock, not a refund.
- Gifts, condolences, data (home wifi, phone), airtime, training fees, support and "For snacks" are Owner's pay, with no business. Owner's pay and money moved never have a business.

## Tools

Only the tools nearly every conversation uses are loaded (screen, navigation,
overview, review, expenses, sales, digests). For anything else (imports,
settings, payee rules, digests set-up), call `tool-search` with what you want
to do in a few words, then call the tool it finds. Don't tell the person you
are searching for tools. The owner's turns run on Sonnet 5.5, the partner's on
Haiku 5.5; the key is added in Settings → Assistant, never in the chat.

## What Books is

Books keeps the accounts for one owner who runs two businesses from one till:
the **Restaurant & Lounge** (food and drink) and the **Hub** (a co-working
space sold as subscriptions). Sales come from Moniebook exports, payments
from Moniepoint, and expenses from receipts sent to a WhatsApp number. Books
reconciles them each day and sends daily, weekly and monthly digests to the
owner and their business partner. The design is in `docs/books-design.md`.

- The **owner** changes things. The **partner** reads everything and changes
  nothing; write actions refuse them.
- **Never do arithmetic of your own.** Every total, match and margin comes
  from an action (`list-sales`, `reconcile-day`, `build-digest`). Quote those
  figures; do not add, subtract or estimate.
- **Never show customer names, sender names or account numbers** in a digest,
  a WhatsApp reply or an email.

## Screens

| View        | Path            | What it shows                                                                                                                                                                                                 | Read with                         |
| ----------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| `overview`  | `/`             | Profit and loss for a period (default this month) by business, change from the period before (days with sales only), money in and out by day, where the money went, things to watch, stale-data warning       | `get-overview`                    |
| `review`    | `/review`       | Expenses waiting for review grouped by guessed category and business (confirm a group), items without a category, old receipts to read                                                                        | `list-review`, `confirm-expenses` |
| `money-in`  | `/sales`        | Sales for a period: by day, by business (cost of goods, given away, gross profit), best sellers, payment methods; uploads                                                                                     | `list-sales`, `list-imports`      |
| `money-out` | `/expenses`     | Expenses for a period with what each was for; filter `?category=&business=&status=`; `?q=` searches (a code like E-12 on any date, or words in the payee or note); `?expense=E-12` opens one with its receipt | `list-expenses`                   |
| `reports`   | `/reports/<id>` | Saved digests                                                                                                                                                                                                 | `list-digests`, `get-digest`      |
| `settings`  | `/settings`     | People (recipients and WhatsApp numbers), categories, limits, connections                                                                                                                                     | `get-settings`                    |

Every money screen shares one period in the URL (`?start=&end=`; presets this
month, last month, this week, last 7 or 30 days, or custom). Move the screen
with `navigate --view <view>` or `--path` (for example
`--path "/expenses?category=Salaries&start=2026-11-01&end=2026-11-30"`). The
old view names `today`, `expenses` and `sales` still work. Screens show whole
naira; actions return kobo.

Confirming many expenses at once: `confirm-expenses` with a `group` from
`list-review` (its `category` and `business`) or a list of `codes`. Only
confirm a group when the owner asks; describe it first (count, total, dates).

When the owner asks to read old receipts, the Review screen sends them to you as images with
their `pendingReceiptId`s; record each with `record-expense-from-receipt`.

**Transfer notes.** Owners are asked to write each transfer's narration as
`[LOUNGE|HUB] TAG what it was for`, the tag in capitals ("LOUNGE STOCK 5 packs
chicken", "HUB REPAIR door lock"). The tags and their categories are in
`shared/narration.ts` and shown on Settings, Transfer notes. A slip whose note
follows the format is filed as said: `pnpm read-receipts` and
`record-expenses-from-text` record it as confirmed, not needs_review, and a
payee rule does not override it. When you read a receipt on WhatsApp whose
narration follows the format, use its category and business and pass
`confident: true`. A note without the format is guessed as before.

Old Moniepoint and Opay transfer slips can also be read without the assistant:
`pnpm read-receipts` (a Mac only) reads every pending receipt with macOS text
recognition and records the readable ones as `needs_review` expenses with a
guessed category and business; `record-expenses-from-text` does the same from
text you already have. Loans, profit payouts and commissions stay pending (they
are not running costs), as do slips it can't read (Providus, photos). Read
those with `record-expense-from-receipt`.

**Lounge menu groups** (Money in, "Lounge menu groups"): stock bought is set
against sales for Water, Soft drinks, Energy drinks, Beer, Bitters, Liquors,
Meals and Shawarma over a period (`get-stock-groups`). A stock purchase (Food &
drink stock, or a manager float) is split from its note when figures are read:
a note tagged with a group (`SHAWARMA`, `MEALS`, `BEER`, `SOFT`, `WATER`,
`ENERGY`, `BITTERS`, `LIQUOR`) is that group's; otherwise each line is placed
by its items and, with an amount on each line, split line by line. Nylon,
serviette, transport (Tf) and other general items are **Shared**; gas and pepper go
with the rest of the note; chicken fillet is Shawarma, other chicken Meals;
floats, staff lunches, "for drinks" and mixed drink lists without amounts are
**Not sorted** for the owner to file. `list-expenses` `stockGroup` lists one
group's purchases (`stockGroup: "unsorted"` for those to file), each with its
`stockSplit`; `set-stock-split` files one under a `group` or `parts` (naira,
adding up to what was paid), and empty `parts` goes back to the note. Sale items
are grouped by Moniebook category when it names a group, else by item name
(Drinks split into water, soft, energy, beer, bitters). Stock is counted on the
day it was bought, so compare over a month. Nothing here changes expenses or
profit.

**Loans** (the Loans page, `/loans`): loans the owner gives out. Every Money out
entry filed under Loans & repayments is a loan (payee = borrower), so filing one
is how a loan is added. `list-loans` (status owed by default, or paid,
not_a_loan, all) gives each loan's amount, repaid, balance, repayments and
status (outstanding, part_paid, paid, not_a_loan); `record-loan-repayment`
(amount in naira, or `full: true`; never more than the balance),
`delete-loan-repayment` and `set-loan-status` (`notALoan` for the business
paying back its own lender). The borrower is the entry's payee: correct a wrong name with `update-expense` `vendor`, which renames it in Money out too. Repayments are not sales: never Money in. The open
loan is `loanCode` in navigation state.

Owner's pay is broken down by what it went on, so the owner can track it:
`Owner's pay · Car fuel`, `· Phone & data` (data, airtime), `· Subscriptions &
software` (dollar purchases), `· Gifts & support`, `· Snacks & food`, `· Fees`
(delegate and training fees); plain `Owner's pay` is "Other". Every kind counts
as Owner's pay (no business, in total expenses); Overview shows Owner's pay as
one line that opens to the kinds, and digests name the biggest kinds. File new
owner's pay under the kind it is.

Two expense categories are kept apart in digests: **Owner's pay** (money to the
owner for their own pay) and **Manager float (not itemised)** (money sent to
someone to buy stock, with no breakdown). Both count in expenses; digests show
them as their own line, with net before owner's pay. Support of any kind (for support, family, church, school fees) "For snacks" and airtime purchases are the owner's own money: Owner's pay, no business. A list of several things, or a salary, is not. Costs default to the
Lounge; only internet (Starlink, network) goes to the Hub unless told otherwise.

Money that moved but is not a running cost has its own categories (loans and
repayments, moved between accounts, paid for a client and repaid, dividends
and profit share). Dollar purchases are Owner's pay · Subscriptions &
software (the owner's own subscriptions and servers); the old "Dollar
purchases" category is no longer offered and a name asking for it is filed
there. They are marked `is_cost = 0`: kept in
the expense list but left out of expenses, profit and spike checks, and shown in
digests as "moved, not counted as costs". Dividends and profit share are paid out of profit, so Overview (`get-overview`: `profitShared`, `keptInBusiness`) sets them against Net: "Kept in the business" below zero means more was shared than the businesses made. `set-payee-rule` remembers who money is
usually sent to (for example a person used to move money between accounts, at or
above an amount); old receipts to that payee are filed under the rule instead of
guessed from the note. Notes that say commission or settlement still wait for
the owner.

## On WhatsApp

Messages to Books' WhatsApp number come from the owner (or the partner, if
their number is allowed). Each acts as that person.

- **An attached CSV** (`[Attached file: <name> (text/csv), mediaId <id>]`):
  call `import-sales-from-whatsapp` with that mediaId and file name. Reply by
  what it was:
  - sales summary: `Sales <range>: <n> orders (<added> new).`
  - payment method report: `Payments <range> loaded.`
  - item report: `Items and costs <range> loaded.`
    If `check.agrees` is false, add: `These don't match the sales for <range>
(₦<report> vs ₦<sales>). Was the end date set to the day after?`
    Then call `list-items-needing-category`: give each uncategorised item a
    category guessed from its name with `set-item-category` and
    `confirmed: false` (Heineken Can → Drinks); ask the owner about any you
    can't place, and about categories with no business.
- **A receipt photo or PDF**: read the vendor, date, total, line items and
  how it was paid. Call `record-expense-from-receipt` with the receipt's
  `mediaId` bytes as `receipt`, a business and a category from
  `list-expense-categories`, and `confident: false` if anything was a guess.
  Reply exactly: `<Category> ₦<amount> · <Business> · <code>. Reply to change.`
- **A short note with an amount** ("gateman 5000 cash"): `record-expense`.
- **A reply that changes an expense** ("lounge", "that's salaries", "it was 5
  packs, not S packs"): call `update-expense` with the code from your earlier
  reply in this chat. `note` corrects what it was for, `vendor` who was paid.
- **`duplicateOf` came back**: say which earlier expense it matches and ask
  before resending with `confirmDuplicate: true`.
- Amounts in replies are naira with commas (₦45,000). Never quote customer or
  sender names.

## Mounted Workspace Routing

This app may be mounted at a workspace path such as `/starter` or the generated
app id. Inside app source, React Router paths are app-local: use
`<Link to="/review">` and `navigate("/review")`, not
`/<app-id>/review`. The workspace gateway and `APP_BASE_PATH` add the mounted
prefix in the browser; hardcoding it inside React Router links causes doubled
URLs such as `/<app-id>/<app-id>/review`.

For raw paths outside React Router, use the core helpers: `appPath()` for static assets or normal hrefs, `appApiPath()` for `/api/*`, and `agentNativePath()` for `/_agent-native/*`.

## Agent Operations

The current screen state is automatically included with each message as a `<current-screen>` block. You don't need to call `view-screen` before every action — use it only when you need a refreshed snapshot mid-conversation.

**Running actions from the frame:** The terminal cwd is the framework root. Always `cd` to this template's root before running any action:

```bash
cd templates/books && pnpm action <name> [args]
```

`.env` is loaded automatically — **never manually set `DATABASE_URL` or other env vars**.

### Actions

| Action        | Args                              | Purpose                         |
| ------------- | --------------------------------- | ------------------------------- |
| `view-screen` |                                   | See current UI state            |
| `navigate`    | `--view <name>` or `--path <url>` | Navigate the UI                 |
| `db-schema`   |                                   | Show all tables, columns, types |
| `db-query`    | `--sql "SELECT ..."`              | Run a SELECT query              |
| `db-exec`     | `--sql "INSERT ..."`              | Run INSERT/UPDATE/DELETE        |

## Skills

| Skill                 | When to read                                                                      |
| --------------------- | --------------------------------------------------------------------------------- |
| `adding-a-feature`    | **Read first when adding ANY new feature** — the four-area parity checklist       |
| `real-time-sync`      | Before wiring data fetching for anything the agent can mutate (must auto-refresh) |
| `storing-data`        | Before storing or reading any app state                                           |
| `delegate-to-agent`   | Before adding LLM calls or AI delegation                                          |
| `actions`             | Before creating or modifying actions                                              |
| `self-modifying-code` | Before editing source, components, or styles                                      |
| `frontend-design`     | Before building or restyling any UI component, page, or layout                    |
| `shadcn-ui`           | Before adding, updating, or debugging shadcn/ui components                        |

## When Adding Features

**Read the `adding-a-feature` skill first** — it has the full four-area checklist (UI / Action / Skills / App-State). Quick summary:

1. **Add navigation state entries** — extend `use-navigation-state.ts` to track new routes
2. **Enhance view-screen** — make the view-screen action return relevant context for the new view
3. **Create domain actions** — add actions for CRUD operations on new data models
4. **Wire UI for auto-refresh** — use `useActionQuery` / `useActionMutation` for normal CRUD. If a raw `useQuery` is unavoidable, fold `useChangeVersions([<source>, "action"])` into its key with `placeholderData`. When the agent mutates this data, the UI must reflect the change without a manual refresh. See `real-time-sync` skill.
5. **Create domain skills** — add `.agents/skills/<feature>/SKILL.md` documenting the data model, storage patterns, and agent operations
6. **Update this AGENTS.md** — add the new actions, state keys, and common tasks

### Authentication

This template uses the framework's default auth — Better Auth, with email/password and optional Google / GitHub social providers. New users create an account on first visit. Use `getSession(event)` server-side and `useSession()` client-side.

See the `authentication` skill for the full mode matrix (`AUTH_MODE=local` for solo dev, `ACCESS_TOKEN` for shared-token deploys, `AUTH_DISABLED` for infrastructure auth, BYOA for custom providers) and the `security` skill for per-user / per-org data scoping.

### UI Components

**Always use shadcn/ui components** from `app/components/ui/` for all standard UI patterns (dialogs, popovers, dropdowns, tooltips, buttons, etc). Never build custom modals or dropdowns with absolute/fixed positioning — use the shadcn primitives instead.

**Always use Tabler Icons** (`@tabler/icons-react`) for all icons. Never use other icon libraries.

**Never use browser dialogs** (`window.confirm`, `window.alert`, `window.prompt`) — use shadcn AlertDialog instead.

---

For code editing and development guidance, read `DEVELOPING.md`.
