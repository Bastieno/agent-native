# Bringing schools online, and paying for the assistant with credits

Status: plan for Francis to approve. Nothing here is built yet.
Written 2026-11-03 against the `school` branch, including the uncommitted
per-school usage work (`token_usage.org_id`, `getUsageSummary({ orgId })`,
`get-school-usage`).

## Recommendation

1. **Hold one Anthropic key and sell credits.** Each school gets a credit
   balance. The balance is worked out from what the school actually used, as
   recorded in `token_usage`, plus a margin. Top-ups are manual at first:
   the school pays by bank transfer and Francis records a grant with the
   payment reference. Paystack comes later, once there are enough schools for
   chasing transfers to cost real time. A school's own key stays as an
   option under Advanced.
2. **Create schools from a founder console, not a public sign-up.** It is a
   small page only Francis can open, with a "New school" form that does
   exactly what `pnpm provision:school` does today. A public "request a
   school" form that Francis approves comes after that. Fully self-serve
   creation stays off until payment is automated and paid up front. These
   are children's records, and every school is a running AI bill.
3. **Credits first, console second.** The key friction schools feel is the
   API key. Removing it needs no new operator surface: in phase 1 the grants
   and reports run as `pnpm` scripts, the same way provisioning does now.

## Decisions (2026-11-03) and Phase 1 status

Francis decided: credits are sold separately from the per-learner fee; margin
1.5x; packs of 10,000 / 50,000 / 200,000 credits at about N15,000 / N70,000 /
N270,000 (about N1,500 to the dollar, to be confirmed at each payment); every
new school gets a one-off 5,000-credit starter grant; manual top-ups first;
`ellai.dev` stays on Cloudflare until Phase 2.

Phase 1 is built (uncommitted): the core managed-credential hook, the billing
and ledger tables (migrations 112-115), the `credits` gate block, the balance
and Top up screen in Settings, `get-school-credit`, `request-credit-top-up`,
`switch-assistant-billing`, `pnpm credits:grant | credits:report |
credits:set-mode`, daily settlement and an email to `ELLAI_OPERATOR_EMAILS`
when a school runs low. Differences from the design above:

- The credit maths lives in the school (`shared/credits.ts`), not in core's
  `usage/store.ts`, which another session was editing; the generic core
  function can follow later.
- A school with no billing row is on its own key, so existing schools needed no
  migration of data.
- Low-balance warnings go to the operator by email and show in the school's
  settings; there is no in-app notification to admins yet.
- Settlement leaves the last minute of use unsettled, so up to a minute of use
  is not charged when a school switches between its own key and credit.
- Needs on the deployment: `ELLAI_MANAGED_ANTHROPIC_KEY`,
  `ELLAI_OPERATOR_EMAILS`, optionally `ELLAI_TOPUP_INSTRUCTIONS` (the bank
  details shown in Top up).

## What exists today, and what it constrains

- **Provisioning** is `ops/provision-school.ts`. It creates the org with the
  head as owner, writes a pending `school_admin` invitation, optionally
  assigns `<slug>.ellai.dev` in `school_domains`, and emails the head. It is a
  script on purpose: every action becomes an agent and MCP tool (AGENTS.md
  A0).
- **Sign-up** is by invitation (`server/plugins/signup-policy.ts`,
  `server/lib/signup-access.ts`). A provisioned head can sign up because the
  org already counts them as a member. Nothing here needs to change.
- **School addresses** still need two manual steps per school: a Cloudflare
  CNAME and `vercel domains add` (`docs/school-domains.md`). Multi-host
  sign-in links in a production build are still unverified, and that matters
  more once schools are created without a developer present.
- **Keys.** `save-assistant-key` writes `ANTHROPIC_API_KEY` as an org-scoped
  app secret. In hosted production, `resolveSecret` and
  `canUseDeployCredentialFallbackForRequest` deliberately refuse the
  deployment's env key for a signed-in user (it would power every tenant). So
  **a managed key needs a small core change**, below. Setting the plugin's
  `apiKey` option does not work. It is static, it powers every school
  whatever their balance, and its precedence against an org's own key
  differs between paths: chat, A2A, `ask_app` (`resolveCallerAgentEngine`)
  and sub-agents (`getEngine` prefers `runCtx.userApiKey`).
- **Gate.** `gateAgentMessage` (`server/lib/agent-gate.ts`) runs before every
  chat message and, through `runGate`, every sub-agent, job, A2A and `ask_app`
  run. It already returns a calm `{ reply }` for `off`, `sitting`, `limit` and
  `school-limit`. Credits slot in as one more block.
- **Usage.** `recordUsage` writes one row per run after it finishes: the
  whole loop's tokens, priced at the run's model, in centicents
  (`cost_cents_x100`). Sub-agents get their own rows. Each row now carries
  `org_id`, falling back to the request's org. Rows from before early
  November 2026 have no org.
- **Framework credits.** `BUILDER_AGENT_CREDITS_PER_USD` (20),
  `BUILDER_AGENT_CREDIT_MARGIN_MULTIPLIER` (1.25) and
  `builderCreditsFromCostCents` are Builder.io's own billing, chosen by
  `usageBillingForEngine("builder")`. The numbers and the name are Builder's,
  so the school should not borrow them. The shape is worth reusing:
  `UsageBillingMode` already has `unit`, `label`, `creditsPerUsd` and
  `hardCostMarginMultiplier`. Proposal: add a generic
  `creditsFromCostCents(cents, { margin, creditsPerUsd })` to
  `packages/core/src/usage/store.ts` and have `builderCreditsFromCostCents`
  call it. That is a small additive change and needs a changeset. The school
  then uses the same function with its own constants, and the Usage panel can
  show "credits" through a `UsageBillingMode` of the school's.

## Part 1: credits

### The unit

- **1 credit = US$0.001 of retail value.** Retail value = estimated provider
  cost × margin.
- **Margin: 1.5× to start.** It covers the cost table's known
  underestimates (below), FX movement between when a school pays in naira
  and when the Anthropic bill is paid in dollars, payment fees once Paystack
  is in, and failed runs that still cost tokens. Francis can change it. Each
  debit records the margin it used, so a change never reprices the past.
- **What a school sees**, from today's measured costs:
  - a staff working request (about $0.027) costs about **40 credits**;
  - a learner question (under $0.001) costs **1–2 credits**;
  - 10,000 credits is $10 retail, or about 250 staff requests or 7,000+
    learner questions.

  The balance is shown in credits, with a plain estimate beside it: "about
  1,000 staff requests".

- **Storage is integer.** Ledger amounts are kept in retail centicents, the
  same unit as `cost_cents_x100`, so there is no floating point.
  Credits = retail centicents ÷ 10. A naira price per pack is Francis's
  decision and lives in config, not in the unit.

### Data model (additive only, through `runMigrations` in `server/plugins/db.ts`)

`school_billing`: one row per school, written only by operator code and never
by school actions, so a school admin cannot change it through
`update-school-config`.

| column                     | meaning                                                |
| -------------------------- | ------------------------------------------------------ |
| `school_id` (pk)           | the org                                                |
| `mode`                     | `managed` \| `byo` \| `off`                            |
| `margin_bp`                | margin override in basis points; null uses the default |
| `low_balance_notified_at`  | so a warning goes once per dip, not on every message   |
| `created_at`, `updated_at` |                                                        |

`school_credit_ledger` is append-only. Code inserts and never updates or
deletes.

| column                   | meaning                                                                           |
| ------------------------ | --------------------------------------------------------------------------------- |
| `id` (pk)                | for a debit, `debit:<school>:<day>`, so a re-run of the daily close is idempotent |
| `school_id`              |                                                                                   |
| `kind`                   | `grant`, `debit`, `adjustment`, `refund`, `mode`                                  |
| `amount_cc`              | signed retail centicents (+ grant, − debit)                                       |
| `provider_cost_cc`       | debits: the summed `cost_cents_x100` behind it                                    |
| `margin_bp`              | debits: the margin applied                                                        |
| `usage_from`, `usage_to` | debits: the window of `token_usage` rows it covers                                |
| `mode`                   | `mode` rows: the mode the school moved to                                         |
| `payment_ref`, `note`    | grants: bank reference or Paystack reference, and why                             |
| `created_by`             | operator email, or `system` for debits                                            |
| `created_at`             |                                                                                   |

This table is the audit trail of grants. Every credit a school ever received
has a row naming who granted it, when, why and against which payment.
Corrections are new `adjustment` rows, never edits.

### Charging a run against the balance

Charges come from real usage. The plan adds no estimate of its own:

- **Live balance**, read by the gate and the settings screen:
  `SUM(ledger.amount_cc)` minus margin × `SUM(token_usage.cost_cents_x100)`
  for the school's rows since the last debit's `usage_to`, counted only
  while the school was `managed`. The query uses the new
  `(org_id, created_at)` index. That makes the balance correct to the last
  finished run, with no cron needed for correctness.
- **Daily close.** This is a scheduled job, using the same pattern as the
  existing `server/routes/api/school/cron/` routes. For each managed school
  and each finished school day, it writes one `debit` row that freezes the
  provider cost, margin and window. Debits stay a summary, one row per
  school per day: the per-run detail already lives in `token_usage`, and
  `get-school-usage` reads it.
- **Only managed time is charged.** The `mode` ledger rows give the times a
  school switched between managed and BYO. The close and the live balance
  count only `token_usage` rows inside managed windows. Runs on a school's
  own key are never charged.
- **Overdraft.** The gate checks before a run, and a run's cost is known only
  afterwards, so a balance can go slightly below zero. That is accepted:
  - the next message is refused;
  - a learner question is a fraction of a credit;
  - a long staff run is the worst case, a few hundred credits. The low
    balance warning exists to catch that before it happens.

### At zero

- A new gate block `credits` returns a calm reply. No model runs, nothing is
  counted, and the message is in the existing style:
  - **learner:** "The school's assistant is resting for now. Have another go
    on your own, or ask your teacher."
  - **teacher:** "The school's assistant has used up its credit. Your admin
    can top it up from Settings → Assistant."
  - **admin:** "The school's assistant has used up its credit. Top it up from
    Settings → Assistant, and it works again straight away."
- **Order in the gate:** no school → off → sitting → **credits** → school
  limit → personal limit. Being off or sitting a paper is the more specific
  reason, and should be the one people hear.
- **Continuations.** Like `limit`, an answer already under way may finish
  when the credit runs out mid-answer, so nobody is left with half a reply.
- **Low balance.** Below 20% of the last grant, or under about 3 days at the
  school's recent rate (whichever comes first), admins get one in-app
  notification and Francis gets one email. `low_balance_notified_at` stops
  repeats, and it clears on the next grant.
- **Not affected:** staff working from their own Claude or ChatGPT call
  the school's tools directly at no cost to the school. Only `ask_app`
  uses credits. Free Help answers (`freeHelpReply`) use none.

### Using the managed key (core change, needs a changeset)

- **The hook:** a new `createAgentChatPlugin` option,
  `resolveManagedCredential?: ({ orgId, ownerEmail }) => Promise<string | null>`.
- **When it is asked:** only after the user-scope and org-scope secrets
  miss, and before the multi-tenant "no env fallback" refusal.
- **Where it must be wired:** every engine resolution path. That is
  `resolveEngine` (chat, A2A), `resolveCallerAgentEngine` (`ask_app`),
  sub-agent `getEngine`, and `external-agent-run`. Each path gets a test
  that an org's own key still wins.
- **What the school returns:** `process.env.ELLAI_MANAGED_ANTHROPIC_KEY` when
  `school_billing.mode = 'managed'`, and null otherwise. The gate has
  already refused a school with no credit.
- **Hard backstop:** the managed key lives in its own Anthropic workspace
  with a monthly spend limit. That also makes Anthropic's invoice for that
  workspace equal to managed spend, which gives the reconciliation below.

### BYO key stays optional

- **Where it lives:** Settings → Assistant → Advanced → "Use your own
  Anthropic key", which is the existing `AssistantKeyForm`.
- **Saving a key:** writes a `mode` ledger row and sets `mode = 'byo'`. The
  balance is kept, and no longer drawn on.
- **Removing it:** returns the school to `managed`, if it has credit.
- **Existing BYO schools** (the showcase and demo schools) are set to `byo` by
  the migration, so nothing changes for them.
- **New schools** start `managed`, with a starter grant if Francis wants one
  (open question).

### How credits sit with the daily limits

- **The daily limits stay** (`dailyMessageLimits`, `dailySchoolLimit`,
  `chatAppDailyLimit`). They spread a school's use fairly over people and
  days, and the school sets them itself.
- **Credits are the money ceiling.** Francis sets that one, and the school
  cannot change it.
- **Neither replaces the other.** A school with plenty of credit still stops
  at its own daily total. A school under its limits still stops at zero
  credit.
- **One setting changes.** Today `dailySchoolLimit` defaults to 500 as a
  bill ceiling. Under managed credits, the balance does that job, so the
  default could rise. Raising it is optional, and existing schools keep their
  stored value.

### Cost-table gaps to close before money depends on it

- **Haiku 5.5 above 100k input tokens** is priced at the ≤100k rate. Rows are
  one per run, summed over its steps, but the provider's tier applies per
  request. So the fix is to price each step and sum the costs, in
  `production-agent.ts` where `loopUsage` accumulates. Recording the total
  tokens and then pricing them once is wrong in both directions.
- **The 1-hour cache-write price** is not modelled. First check whether the
  framework requests 1h TTL at all. If it does, add a `cacheWrite1h` price
  and split the token counts.
- **Monthly reconciliation:** compare the managed workspace's Anthropic
  invoice with `SUM(provider_cost_cc)` of that month's debits. If the gap is
  more than a few percent, fix the table or raise the margin. `pnpm
credits:report --month 2026-11` prints both figures.

Until the first two are fixed, the 1.5× margin absorbs them. That is a
stopgap, not a fix.

## Part 2: bringing a school online

### Who may create a school

| Phase | Who                               | How                                                 |
| ----- | --------------------------------- | --------------------------------------------------- |
| now   | Francis, through Claude Code      | `pnpm provision:school` (unchanged)                 |
| 2     | Francis, signed in                | founder console → New school                        |
| 3     | anyone requests, Francis approves | public "Bring your school" form → console → Approve |
| later | self-serve, if ever               | only with payment up front and verified identity    |

- **The operator** is `ELLAI_OPERATOR_EMAILS`, an env allow-list on the
  deployment. It is not a role inside any school, so no school admin can
  grant it and the agent never sees it.
- **What the console requires:** a signed-in session whose email is on the
  list and verified. It is served only on the base host, never on a
  school's own address.

### What stays operator-only

These are deliberately not actions, so they never become agent or MCP tools:

- creating a school;
- granting or adjusting credit;
- changing a school's billing mode or margin;
- reading other schools' balances and usage;
- assigning an address.

The console calls hand-written `/api/operator/*` routes. This breaks
actions-first on purpose, as A0 already does for provisioning, and the
routes say so in a comment.

- **Routes:**
  - check the operator list themselves, before any work;
  - read across schools under a `// guard:allow-unscoped — operator console,
email allow-list checked above` marker;
  - write an `operator_audit` row on every write (who, what, which school,
    when). Credit grants also land in the ledger.
- **Scripts:** each operation also has a `pnpm` script, so Francis can still
  do everything through Claude Code:
  - `provision:school` (existing);
  - `credits:grant`, `credits:report`, `credits:set-mode` (new).

  Scripts and routes call one shared module in `server/lib/operator/`,
  starting with moving the body of `ops/provision-school.ts` into
  `server/lib/operator/provision-school.ts`.

### The school's address

- **Phase 2:** "New school" has a slug field, prefilled from the name and
  checked live with `slugProblem`. Saving writes `school_domains` through
  `assignHost`.
- **The two manual steps** go away in one of two ways:
  - **(a) Recommended:** move `ellai.dev`'s nameservers to Vercel and add the
    wildcard `*.ellai.dev` to the project. Every slug then works the moment
    its row exists, with no tokens kept anywhere. Vercel only issues
    wildcard certificates for domains on its own nameservers.
  - **(b)** Keep Cloudflare. The console calls the Cloudflare DNS API and the
    Vercel domains API with scoped tokens, and shows "address ready" once
    the certificate is issued.
- **Before the first console-created school:** test sign-in,
  password-reset and email-verification links on a second host in a
  production build (the open item in `docs/school-domains.md`).

### How the head is invited

This is unchanged in substance. It is the same code as the script:

1. Create the org with the head as owner.
2. Write the pending `school_admin` invitation.
3. Assign the address.
4. Email the invitation from the school's name.
5. The console shows the invite link when email is not configured, as the
   script prints it today.

Invitation-only sign-up keeps working as it does now, because the head is
already an org member. The console row then shows the head as "invited"
until they sign in, and offers "Send again" and "Change head's email". Both
work through cancelling and re-inviting, never by editing.

### Phase 3: request form

- **The form:** a public page (SSR) on the base host asks for the school's
  name, country, rough size, the head's name and work email, and a phone
  number. It needs a CAPTCHA-free rate limit and email confirmation of the
  head's address before the request shows in the console.
- **Storage:** `school_requests` (additive), with status
  `pending | approved | declined`.
- **Approve** runs the same provisioning with the request's fields and a
  starter grant. **Decline** sends a short email.

## UI surfaces

All use shadcn/ui and Tabler icons, with secondary things behind a
disclosure.

**School admin: Settings → Assistant**

- One line at the top: "Credit: 41,200 left, about 1,000 staff
  requests", with **Top up**.
  - In phase 1, Top up opens a `Dialog` with how to pay (bank details from
    config) and a "Let Ellai know I've paid" button. The button writes a
    `top_up_requests` row and emails Francis.
  - In phase 4 it opens Paystack.
- Under the existing Usage section, a `Collapsible` "Credit history"
  lists grants and daily charges from the ledger.
- Advanced → "Use your own Anthropic key" (the existing form).

**Teachers and learners:** nothing new. They see only the calm reply at zero.

**Founder console (`/operator`):**

- **Schools table:** name, address, head (invited or active), mode, balance,
  30-day spend, days left at current rate, sorted by days left. Low or empty
  balances are shown with a quiet badge.
- **Row → `Sheet`:**
  - **Grant credit:** credits or a pack, payment reference, note, behind an
    `AlertDialog` confirm;
  - the ledger;
  - the same usage summary `get-school-usage` builds;
  - mode, margin and address under "More".
- **New school** (`Dialog`): name, head's email, head's name, address.
- **Requests** (phase 3) and **Top-up notices** tabs, kept in the URL with
  `useUrlTab`.

**Agent (four-area rule):**

- **`get-school-credit`**: an admin-only read action, so the assistant can
  answer "how much credit do we have left?" and "how long will it last?".
- **`request-credit-top-up`**: an admin action, the same as the button.
- **AGENTS.md:** a new A4b paragraph on credits. A0 now says the people
  running the app create schools from their console.
- **`shared/capabilities.ts`:** a Help entry for topping up.
- **The founder side has no agent parity, by design.** Francis's parity is
  the `pnpm` scripts through Claude Code.

## Phased rollout

**Phase 1: managed credits, manual top-ups (smallest useful).**

- **Core:**
  - `resolveManagedCredential` hook across all engine paths, with tests;
  - generic `creditsFromCostCents`;
  - changeset.
- **School:**
  - `school_billing` and `school_credit_ledger` migrations;
  - live balance;
  - `credits` gate block and replies;
  - low-balance notice;
  - daily close job;
  - balance line, Top up dialog and credit history in Settings;
  - `get-school-credit`, `request-credit-top-up`;
  - `pnpm credits:grant | credits:report | credits:set-mode`;
  - existing schools migrated to `byo`.
- **Ops:**
  - a separate Anthropic workspace with a spend limit;
  - `ELLAI_MANAGED_ANTHROPIC_KEY` in Vercel.
- **Done when:**
  - a new school runs on credit with no key entered;
  - its balance falls by what `get-school-usage` shows × margin;
  - at zero, every role gets its reply;
  - a grant brings it straight back.

  The simulation harness gets a term with a managed school running down and
  topped up.

**Phase 2: founder console and school creation.**

- `ELLAI_OPERATOR_EMAILS`, `/operator`, operator routes and `operator_audit`.
- Provisioning moved into a shared module.
- Address assignment, with the nameserver move or API automation.
- The multi-host auth links verified first.

**Phase 3: request-a-school form** with approval.

**Phase 4: Paystack** for Nigerian schools.

- **Flow:** a hosted checkout creates the payment. Paystack's webhook goes
  through the integration-queue pattern (verify signature, enqueue, return
  200), and the processor writes the `grant` with the Paystack reference.
- **Idempotency:** the reference is unique, so a replayed webhook cannot
  grant twice.
- **Alternatives:** Flutterwave works the same way, if its payout terms suit
  better. For US schools, Stripe or Paystack's international cards (open
  question).
- **Fees:** Paystack's local card fee is roughly 1.5% plus a small flat fee,
  with a cap. Check the current rates, and price packs so the fee sits
  inside the margin.

**Phase 5 (optional):**

- per-step pricing, to close the Haiku tier gap properly;
- a raised default `dailySchoolLimit` for managed schools.

## Risks

- **Mis-wired key paths.** If one engine path misses the hook, that path
  fails with "no key" for managed schools. If an ordering bug puts the
  managed key ahead of an org's own key, BYO schools are charged for runs on
  their own key. Tests on every path guard against both.
- **A personal key.** A staff member who saved a user-scope key runs on it,
  but their rows still count against the school's managed balance. Either
  exclude runs whose credential source was not managed (needs core to
  record the credential source on the usage row), or refuse user-scope keys
  in the school app. Recommend the second; it is simpler.
- **Underpricing.** The cost table underestimates in known places, and one
  heavy staff run can overdraw. The margin, the workspace spend limit and
  monthly reconciliation contain it.
- **Unrecorded runs.** `recordUsage` skips runs with no owner email, and it
  swallows its own errors. A run that fails to record is free to the school
  and paid by Francis. Reconciliation shows the size of this.
- **Operator console as a target.** It is one page that can create schools and
  mint credit. Mitigations:
  - the email allow-list, plus verified email;
  - base host only;
  - an audit row per write;
  - phase 2 could add a second factor.
- **Manual top-ups.** They depend on Francis noticing payments. The low
  balance email and the "I've paid" notice keep the gap short, but a school
  can sit at zero over a weekend.
- **Children's data at scale.** A request form makes it easier to bring a
  school on. Approval stays human until there is a better way to know a
  school is real.

## Open questions for Francis

1. **Credits and the per-learner fee:** are credits on top of the per-learner
   fee, or does the fee include a monthly allowance with top-ups beyond it?
   This decides whether learners' use is something the school pays for
   separately.
2. **Margin:** 1.5× to start, or something else? And should Nigerian and US
   schools have the same margin?
3. **Packs and prices:** naira prices per pack (for example 10k, 50k and 200k
   credits), and how often you will update them for the exchange rate.
4. **Starter grant:** should a new school get free credit, and how much?
   About 5,000 credits is roughly 125 staff requests, enough for setup.
5. **Payment details:** which bank account and reference format should the
   Top up dialog show in phase 1?
6. **Domain:** may `ellai.dev` move its nameservers to Vercel for the wildcard,
   or does something else on Cloudflare need it to stay?
7. **Existing schools:** should they stay on their own keys, or move to
   managed credits with an opening grant?
8. **Operators:** is anyone besides you an operator, now or soon?
9. **Low balance:** who should hear about a school's low balance besides its
   admins? Should it be just you, or the head too by email?
