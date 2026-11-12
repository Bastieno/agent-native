import assert from "node:assert/strict";
import { check } from "./helpers.js";
import { toKobo, formatNaira } from "../server/lib/money.js";
import { lagosDay, periodBounds } from "../server/lib/lagos-time.js";

check("kobo", () => {
  assert.equal(toKobo("4000.00"), 400000);
  assert.equal(toKobo(290473.55), 29047355);
  assert.equal(formatNaira(4500000), "₦45,000");
  assert.equal(formatNaira(29047355), "₦290,473.55");
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
check("daily bounds", () =>
  assert.deepEqual(periodBounds("daily", new Date("2026-11-12T07:00:00Z")), {
    start: "2026-11-11",
    end: "2026-11-11",
  }),
);
