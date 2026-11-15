import assert from "node:assert/strict";
import { scenesOf, stepsOf } from "./scenes.js";
import type { Demo } from "./types.js";

const step = (line: string) => ({ line, actions: [] });
const single: Demo = {
  slug: "a",
  title: "a",
  signInAs: "p@x.test",
  steps: [step("one"), step("two")],
};
const scenes = scenesOf(single);
assert.equal(scenes.length, 1);
assert.equal((scenes[0] as any).school, "crestfield");
assert.deepEqual(
  stepsOf(scenes).map((s) => s.line),
  ["one", "two"],
);

const multi: Demo = {
  slug: "b",
  title: "b",
  scenes: [
    { school: "empty", signInAs: "h@x.test", steps: [step("a"), step("b")] },
    { clip: "clips/claude.mp4", step: step("c") },
    { school: "yellowview", signInAs: "p@y.test", steps: [step("d")] },
  ],
};
assert.deepEqual(
  stepsOf(scenesOf(multi)).map((s) => s.line),
  ["a", "b", "c", "d"],
);
console.log("scenes: ok");
