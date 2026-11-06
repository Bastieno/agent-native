import assert from "node:assert/strict";
import { findUnmarkedNotation as f } from "../shared/notation";

assert.equal(f("Simplify (3^2)^3").length, 0 + 1);
assert.equal(f("Simplify $(3^2)^3$").length, 0);
assert.equal(f("Solve $2^x = 32$ and $\\frac{1}{2}$").length, 0);
assert.equal(f("Find 5^-2 as a fraction").length, 1);
assert.equal(f("Write it as \\frac{1}{2}").length, 1);
assert.equal(f("Type powers like `2^5`").length, 0);
assert.equal(f({ prompt: "a^2", answer: "2^5" }).length, 1);
assert.equal(
  f({ prompt: "x squared", answer: "2^5", acceptableAnswers: ["2^5"] }).length,
  0,
);
assert.equal(
  f({ instructions: "Write powers with ^, for example 2^5." }).length,
  0,
);
assert.equal(f("a ^ b caret in prose", "snake_case and 5 + 3").length, 0);
console.log("notation: ok");
