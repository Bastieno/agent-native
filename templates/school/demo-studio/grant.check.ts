import assert from "node:assert/strict";
import { demos } from "./demos/index.js";
import { scenesOf, stepsOf } from "./scenes.js";
import { readScript } from "./script.js";

// Every spoken paragraph of the grant script is spoken over exactly one step, in order.
const lines = readScript(
  new URL("./scripts/grant.md", import.meta.url).pathname,
);
const steps = stepsOf(scenesOf(demos.grant));
assert.deepEqual(
  steps.map((s) => s.line),
  lines,
);
console.log("grant: ok");
