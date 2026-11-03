import { describe, expect, it } from "vitest";
import {
  builderCreditsFromCostCents,
  calculateCost,
  LONG_PROMPT_TOKENS,
  stepCostCenticents,
  usageBillingForEngine,
} from "./store.js";

describe("usage billing", () => {
  it("maps Builder hard costs to agent credits with margin", () => {
    expect(builderCreditsFromCostCents(100)).toBe(25);
    expect(builderCreditsFromCostCents(1)).toBe(0.25);
  });

  it("rounds Builder credits up to the same precision as ai-services", () => {
    expect(builderCreditsFromCostCents(0.001)).toBe(0.001);
  });

  it("uses Builder credit display only for the Builder engine", () => {
    expect(usageBillingForEngine("builder").unit).toBe("builder-credits");
    expect(usageBillingForEngine("anthropic").unit).toBe("usd");
    expect(usageBillingForEngine(null).unit).toBe("usd");
  });

  it("does not round tiny completed calls down to zero spend", () => {
    expect(calculateCost(10, 2, "claude-sonnet-4-5")).toBe(1);
  });

  describe("long prompts", () => {
    it("prices a Haiku 5.5 step at the base price up to 100k prompt tokens", () => {
      // 100k in at $0.10/M = 1 cent = 100 centicents; 1k out at $0.50/M = 5 cc.
      expect(
        stepCostCenticents(LONG_PROMPT_TOKENS, 1000, "claude-haiku-5-5"),
      ).toBeCloseTo(100 + 5, 5);
    });

    it("prices a step over 100k at the long-prompt price, counting cached tokens", () => {
      // 60k uncached + 41k cache read = 101k prompt tokens: long price.
      // in 60k * $0.50/M = 3c = 300cc; read 41k * $0.05/M = 0.205c = 20.5cc;
      // out 1k * $2.50/M = 0.25c = 25cc.
      expect(
        stepCostCenticents(60_000, 1000, "claude-haiku-5-5", 41_000),
      ).toBeCloseTo(300 + 20.5 + 25, 5);
    });

    it("chooses the price per step, not from a run's totals", () => {
      // Two short steps summing past 100k are still two short steps.
      const steps = [
        stepCostCenticents(60_000, 500, "claude-haiku-5-5"),
        stepCostCenticents(60_000, 500, "claude-haiku-5-5"),
      ];
      const asOneRequest = stepCostCenticents(
        120_000,
        1000,
        "claude-haiku-5-5",
      );
      expect(steps[0] + steps[1]).toBeLessThan(asOneRequest);
    });

    it("leaves other models on one price however long the prompt", () => {
      // $2.00/M input: 150k tokens = 30 cents = 3000 centicents, no long-prompt tier.
      expect(stepCostCenticents(150_000, 0, "claude-sonnet-5-5")).toBeCloseTo(
        3000,
        5,
      );
    });
  });
});
