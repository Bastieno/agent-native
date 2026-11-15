import assert from "node:assert/strict";
import { sceneMarks, scenesOf, stepsOf } from "./scenes.js";
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

// Titled scenes get a mark at their first step; untitled ones don't.
const titled: Demo = {
  slug: "c",
  title: "c",
  scenes: [
    {
      title: "First",
      school: "empty",
      signInAs: "h@x.test",
      steps: [step("a"), step("b")],
    },
    { school: "empty", signInAs: "h@x.test", steps: [step("c")] },
    { title: "Clip", clip: "x.mp4", step: step("d") },
  ],
};
const segs = [100, 200, 300, 400].map((fromFrame) => ({ fromFrame }));
assert.deepEqual(sceneMarks(scenesOf(titled), segs), [
  { fromFrame: 100, title: "First", number: 1 },
  { fromFrame: 400, title: "Clip", number: 2 },
]);
console.log("scenes: ok");
