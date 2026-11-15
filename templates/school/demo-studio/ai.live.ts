import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { askAssistant } from "./ai.js";
import { restoreSnapshot } from "./db.js";
import { record } from "./record.js";
import { startDemoServer } from "./server.js";

// Live: spends a little of the model key. `pnpm exec tsx demo-studio/ai.live.ts`.
const dir = fs.mkdtempSync(path.join(os.tmpdir(), "demo-ai-"));
restoreSnapshot(undefined, "empty");
const server = await startDemoServer("empty");
try {
  const { timeline } = await record(
    {
      slug: "ai",
      title: "ai",
      signInAs: "head@lagos.test",
      start: [{ do: "goto", path: "/admin" }],
      steps: [
        {
          line: "Ask.",
          actions: askAssistant(
            "What is still missing before teaching can start?",
            1,
          ),
        },
        {
          line: "Ask again.",
          actions: askAssistant("And what should I do first?", 2),
        },
      ],
    },
    server.url,
    dir,
  );
  assert.equal(timeline.steps.length, 2);
  const [a, b] = timeline.steps;
  assert.ok(b.startMs >= a.endMs);
  console.log(
    `assistant answered twice (${((b.endMs - a.startMs) / 1000).toFixed(0)}s)`,
  );
} finally {
  await server.stop();
}
fs.rmSync(dir, { recursive: true });
