import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { idlePollDelay, isIdle } from "./idle-poll.js";

describe("idlePollDelay", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("keeps the normal delay while someone is active", () => {
    expect(isIdle()).toBe(false);
    expect(idlePollDelay(2_000)).toBe(2_000);
  });

  it("waits longer once the page has been left alone for a minute", () => {
    vi.advanceTimersByTime(61_000);
    expect(isIdle()).toBe(true);
    expect(idlePollDelay(2_000)).toBe(16_000);
  });

  it("never waits more than thirty seconds", () => {
    vi.advanceTimersByTime(61_000);
    expect(idlePollDelay(10_000)).toBe(30_000);
  });
});
