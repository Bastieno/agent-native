import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { clipPart, mergeScenes } from "./merge.js";
import type { Timeline } from "./types.js";

const dir = fs.mkdtempSync(path.join(os.tmpdir(), "demo-merge-"));
const ff = (...a: string[]) =>
  execFileSync("ffmpeg", ["-v", "error", "-y", ...a]);
const colour = (c: string, size: string, secs: number, name: string) => {
  const f = path.join(dir, name);
  ff(
    "-f",
    "lavfi",
    "-i",
    `color=c=${c}:s=${size}:r=30:d=${secs}`,
    "-c:v",
    "libvpx-vp9",
    "-b:v",
    "1M",
    f,
  );
  return f;
};
const probe = (f: string, what: string) =>
  execFileSync("ffprobe", [
    "-v",
    "error",
    "-show_entries",
    what,
    "-of",
    "csv=p=0",
    f,
  ])
    .toString()
    .trim();
const pixel = (f: string, atS: number) =>
  execFileSync("ffmpeg", [
    "-v",
    "error",
    "-ss",
    String(atS),
    "-i",
    f,
    "-frames:v",
    "1",
    "-vf",
    "scale=1:1",
    "-f",
    "rawvideo",
    "-pix_fmt",
    "rgb24",
    "-",
  ]);

const timeline = (
  startMs: number,
  endMs: number,
  click?: number,
): Timeline => ({
  width: 1920,
  height: 1080,
  videoOffsetMs: 0,
  flashAtMs: 0,
  steps: [
    {
      index: 0,
      startMs,
      endMs,
      clicks: click === undefined ? [] : [{ atMs: click, x: 100, y: 100 }],
    },
  ],
});

// Two scenes: a 1920x1080 recording (steps 0.5-2.0 s, click at 1.0 s) and a 1280x720 clip.
const red = {
  videoPath: colour("red", "1920x1080", 2, "red.webm"),
  timeline: timeline(500, 2000, 1000),
};
const blue = await clipPart(colour("blue", "1280x720", 3, "blue.webm"));
const merged = await mergeScenes([red, blue], dir);

assert.equal(merged.timeline.steps.length, 2);
assert.deepEqual(
  merged.timeline.steps.map((s) => s.index),
  [0, 1],
);
assert.ok(
  Math.abs(merged.timeline.steps[1].startMs - 1500) < 80,
  `second scene starts at ${merged.timeline.steps[1].startMs}`,
);
assert.ok(
  Math.abs(merged.timeline.steps[0].clicks[0].atMs - 500) < 80,
  "click moved with its scene",
);
assert.equal(probe(merged.videoPath, "stream=width,height"), "1920,1080");
const secs = Number(probe(merged.videoPath, "format=duration"));
assert.ok(Math.abs(secs - 4.5) < 0.3, `merged is ${secs}s`);
const early = pixel(merged.videoPath, 0.5);
const late = pixel(merged.videoPath, 3);
assert.ok(early[0] > early[2], "first scene is red");
assert.ok(late[2] > late[0], "second scene is blue");
fs.rmSync(dir, { recursive: true });
console.log("merge: ok");
