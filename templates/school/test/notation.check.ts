import assert from "node:assert/strict";
import {
  findUnmarkedNotation as f,
  plainNotationAllowed,
} from "../shared/notation";

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
assert.equal(f("Simplify 6a³ × 2a⁴.").length, 1);
assert.equal(f("a³ × a⁴ = a³⁺⁴ = a⁷").length, 1);
assert.equal(f("a² + b² = c²").length, 1);
assert.equal(f("The room is 12 m² and the tank 3 m³.").length, 0);
assert.equal(f("Simplify $6a^3 \\times 2a^4$.").length, 0);
// Subscripts draw alike, so they pass: water, carbon dioxide, a binary number.
assert.equal(f("Water is H₂O and carbon dioxide is CO₂.").length, 0);
assert.equal(f("Convert 1011₂ to decimal: 1011₂ = 11.").length, 0);
// The switch the local demo-building servers set, and a hosted school never does.
assert.equal(plainNotationAllowed(), false);
process.env.ALLOW_PLAIN_NOTATION = "true";
assert.equal(plainNotationAllowed(), true);
delete process.env.ALLOW_PLAIN_NOTATION;
console.log("notation: ok");
