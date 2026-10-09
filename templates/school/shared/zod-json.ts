import { z } from "zod";

/**
 * Accept a JSON string wherever a structured value is expected.
 *
 * The same action is reached three ways, and they do not agree on types: the
 * agent and the browser send real JSON, but the CLI (`pnpm action … --blocks
 * '[…]'`) can only ever hand over a string. Without this, every documented
 * command-line example with an array in it fails validation — which is exactly
 * how the `--variants` examples in AGENTS.md came to be untested.
 *
 * Anything that is not a string is passed through untouched, so the agent's
 * and the UI's payloads are unaffected. A string that will not parse is passed
 * through too, so the caller gets Zod's own "expected array, received string"
 * rather than a confusing JSON syntax error.
 */
export function jsonish<T extends z.ZodTypeAny>(schema: T) {
  return z.preprocess((value) => {
    if (typeof value !== "string") return value;
    const text = value.trim();
    if (!text.startsWith("[") && !text.startsWith("{")) return value;
    try {
      return JSON.parse(text);
    } catch {
      return value;
    }
  }, schema);
}

/**
 * Accept "true"/"false" wherever a boolean is expected.
 *
 * A GET action reached from a page arrives as a query string, where every
 * value is text — so `?includeSamples=false` failed validation with "expected
 * boolean, received string" and the page showed an empty library. The agent
 * and the CLI send real booleans and pass through untouched.
 */
export function boolish(schema: z.ZodBoolean = z.boolean()) {
  return z.preprocess((value) => {
    if (typeof value !== "string") return value;
    const text = value.trim().toLowerCase();
    if (text === "true") return true;
    if (text === "false") return false;
    return value;
  }, schema);
}

/**
 * Accept "100" wherever a number is expected.
 *
 * The sibling of `boolish`, and the same trap: a GET action reached from a
 * page arrives as a query string, so `?limit=100` failed with "expected
 * number, received string" and the admin's list of a class's lesson notes came
 * back empty with no visible error. A string that is not a number is passed
 * through untouched, so Zod reports the real problem rather than NaN.
 */
export function numberish(schema: z.ZodNumber = z.number()) {
  return z.preprocess((value) => {
    if (typeof value !== "string") return value;
    const text = value.trim();
    if (!text) return value;
    const n = Number(text);
    return Number.isFinite(n) ? n : value;
  }, schema);
}
