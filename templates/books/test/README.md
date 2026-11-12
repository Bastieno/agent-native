# Testing Books

```bash
pnpm check   # every test/*.check.ts, each on a fresh SQLite file in data/
pnpm sim     # ten simulated days; writes test-runs/<run>/report.md
```

- **Checks** are plain `tsx` scripts with node's `assert` (see `helpers.ts`):
  `bootBooks(name)` gives a fresh database with Books' tables, an owner and a
  partner, and `asOwner` / `asPartner` run code as either.
- **Fixtures** in `fixtures/`: a Moniepoint webhook sample shaped like
  Moniepoint's documented payload is in git. The Moniebook exports the checks
  use (`sales-sample.csv`, made with `ops/anonymise-export.ts`,
  `payment-method-sample.csv`, `item-sample.csv`) hold real business figures,
  so they are git-ignored and kept on the owner's machine; checks that need
  them stop with a message naming the missing file.
- **The simulation** (`sim/run.ts`) loads the fixtures day by day as the owner
  would send them, builds a one-day payment method report per day, plants a
  Moniepoint event for every transfer and card payment except three gaps, adds
  twelve expenses with known problems, and checks every digest figure against
  totals it computes itself from the raw CSV. Nothing calls a model.
