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

// Steps that open a page fast-forward the loading and speak over the finished page.
const opens = steps.filter((st) => st.actions.some((a) => a.do === "goto"));
assert.ok(
  opens.length > 5 && opens.every((st) => st.cut),
  "page-opening steps are cut",
);
console.log("grant: ok");
