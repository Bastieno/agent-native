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
