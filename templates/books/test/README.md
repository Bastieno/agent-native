# Testing Books

```bash
pnpm check   # every test/*.check.ts, each on a fresh SQLite file in data/
pnpm sim     # ten simulated days; writes test-runs/<run>/report.md
```

- **Checks** are plain `tsx` scripts with node's `assert` (see `helpers.ts`):
  `bootBooks(name)` gives a fresh database with Books' tables, an owner and a
  partner, and `asOwner` / `asPartner` run code as either.
- **Fixtures** in `fixtures/`: the real 1–10 Nov 2026 Moniebook sales summary,
  anonymised by `ops/anonymise-export.ts` (customers, senders, staff, account
  digits and the business name replaced); the payment method and sales-by-item
  reports for 1–9 Nov, which hold no personal data; a Moniepoint webhook
  sample shaped like Moniepoint's documented payload.
- **The simulation** (`sim/run.ts`) loads the fixtures day by day as the owner
  would send them, builds a one-day payment method report per day, plants a
  Moniepoint event for every transfer and card payment except three gaps, adds
  twelve expenses with known problems, and checks every digest figure against
  totals it computes itself from the raw CSV. Nothing calls a model.
