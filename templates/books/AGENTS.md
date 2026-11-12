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

| State Key    | Purpose                                                                                                                     | Direction                  |
| ------------ | --------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| `navigation` | Current view (`today`, `expenses`, `sales`, `reports`, `settings`), plus `expenseCode`, `digestId`, `start`, `end` when set | UI -> Agent (read-only)    |
| `navigate`   | Navigate command (one-shot, auto-deleted)                                                                                   | Agent -> UI (auto-deleted) |

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

| View       | Path            | What it shows                                                             | Read with                    |
| ---------- | --------------- | ------------------------------------------------------------------------- | ---------------------------- |
| `today`    | `/`             | Latest day per business, checks, the review queue                         | `get-today`                  |
| `expenses` | `/expenses`     | Expenses for a range; `?expense=E-12` opens one with its receipt          | `list-expenses`              |
| `sales`    | `/sales`        | Income, cost of goods, given away and gross profit by business; uploads   | `list-sales`, `list-imports` |
| `reports`  | `/reports/<id>` | Saved digests                                                             | `list-digests`, `get-digest` |
| `settings` | `/settings`     | People (recipients and WhatsApp numbers), categories, limits, connections | `get-settings`               |

Move the screen with `navigate --view <view>` or `--path`. When the owner
asks to read old receipts, the Today screen sends them to you as images with
their `pendingReceiptId`s; record each with `record-expense-from-receipt`.

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
- **A reply that changes an expense** ("lounge", "that's salaries"): call
  `update-expense` with the code from your earlier reply in this chat.
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
