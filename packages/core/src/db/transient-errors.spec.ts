import { describe, it, expect } from "vitest";
import { isTransientConnectionError } from "./transient-errors.js";

describe("isTransientConnectionError", () => {
  it("treats the WebSocket driver's bare ErrorEvent as transient", () => {
    class ErrorEvent {
      type = "error";
    }
    expect(isTransientConnectionError(new ErrorEvent())).toBe(true);
    expect(isTransientConnectionError({ type: "error" })).toBe(true);
  });

  it("recognises dropped and timed-out connections", () => {
    expect(isTransientConnectionError(new Error("read ECONNRESET"))).toBe(true);
    expect(
      isTransientConnectionError(
        new Error("Connection terminated unexpectedly"),
      ),
    ).toBe(true);
    expect(isTransientConnectionError(new Error("fetch failed"))).toBe(true);
    expect(
      isTransientConnectionError(
        Object.assign(new Error("x"), { code: "57P03" }),
      ),
    ).toBe(true);
  });

  it("looks through a wrapped cause", () => {
    const err = new Error("query failed", {
      cause: new Error("socket hang up"),
    });
    expect(isTransientConnectionError(err)).toBe(true);
  });

  it("does not retry the database refusing something", () => {
    expect(
      isTransientConnectionError(new Error('syntax error at or near "FROM"')),
    ).toBe(false);
    expect(
      isTransientConnectionError(new Error('relation "user" already exists')),
    ).toBe(false);
    expect(
      isTransientConnectionError(
        Object.assign(new Error("duplicate key"), { code: "23505" }),
      ),
    ).toBe(false);
    expect(isTransientConnectionError(null)).toBe(false);
  });
});
