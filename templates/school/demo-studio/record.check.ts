import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { restoreSnapshot } from "./db.js";
import { record } from "./record.js";
import { startDemoServer } from "./server.js";
import type { Demo } from "./types.js";

const dir = fs.mkdtempSync(path.join(os.tmpdir(), "demo-rec-"));
const signInAs = "principal@crestfield.test";
restoreSnapshot();
const server = await startDemoServer();
try {
  const ok: Demo = {
    slug: "t",
    title: "t",
    signInAs,
    steps: [
      { line: "a", actions: [{ do: "goto", path: "/admin/timetable" }] },
      { line: "b", actions: [{ do: "hold", ms: 500 }] },
    ],
  };
  const { videoPath, timeline } = await record(ok, server.url, dir);
  assert.equal(timeline.steps.length, 2);
  // Step 0 starts after the flash has shown for its 600 ms plus Playwright's 300 ms
  // slow-motion pause; a clock read late makes every step (and zoom) land early.
  const gap = timeline.steps[0].startMs - timeline.flashAtMs;
  assert.ok(
    gap >= 800 && gap <= 1200,
    `step 0 starts ${gap}ms after the flash`,
  );
  assert.ok(timeline.steps[1].startMs > timeline.steps[0].startMs);
  assert.ok(
    timeline.steps.every((s) => s.endMs >= s.startMs && s.startMs >= 0),
  );
  assert.ok(fs.existsSync(path.join(dir, "timeline.json")));
  const secs = Number(
    execFileSync("ffprobe", [
      "-v",
      "error",
      "-show_entries",
      "format=duration",
      "-of",
      "csv=p=0",
      videoPath,
    ]).toString(),
  );
  assert.ok(secs > 1, `video ${secs}s`);
  assert.ok(
    timeline.steps[1].endMs <= secs * 1000 + 100,
    "step times are in video time",
  );

  // Setup runs before the first line, so page loads aren't in any step.
  const setUp: Demo = {
    ...ok,
    start: [{ do: "goto", path: "/admin/timetable" }],
    steps: [
      {
        line: "a",
        actions: [
          // Only on the page if `start` ran.
          {
            do: "waitFor",
            selector: 'role=button[name="Generate"]',
            timeoutMs: 2000,
          },
          { do: "move", x: 1700, y: 1000 },
        ],
      },
    ],
  };
  const s2 = await record(setUp, server.url, dir);
  const only = s2.timeline.steps[0];
  assert.ok(
    only.endMs - only.startMs < 2500,
    `step took ${only.endMs - only.startMs}ms`,
  );
  assert.equal(only.clicks.length, 0);

  const bad: Demo = {
    ...ok,
    steps: [
      {
        line: "c",
        actions: [{ do: "click", selector: '[data-demo="does-not-exist"]' }],
      },
    ],
  };
  await assert.rejects(() => record(bad, server.url, dir), /does-not-exist/);
  assert.ok(fs.existsSync(path.join(dir, "fail-0.png")));

  // Never the pilot.
  await assert.rejects(() => record(ok, "http://localhost:8130", dir), /pilot/);
} finally {
  await server.stop();
}
fs.rmSync(dir, { recursive: true });
console.log("record: ok");
