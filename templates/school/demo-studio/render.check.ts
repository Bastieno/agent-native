import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { FPS, INTRO_FRAMES, OUTRO_FRAMES, type EditPlan } from "./plan.js";
import { render } from "./render.js";
import { timetable } from "./demos/timetable.js";

const work = fs.mkdtempSync(path.join(os.tmpdir(), "demo-render-"));
const out = path.join(work, "out");
const ff = (...a: string[]) =>
  execFileSync("ffmpeg", ["-v", "error", "-y", ...a]);
ff(
  "-f",
  "lavfi",
  "-i",
  "testsrc=size=1920x1080:rate=25:duration=3",
  "-c:v",
  "libvpx",
  path.join(work, "screen.webm"),
);
ff(
  "-f",
  "lavfi",
  "-i",
  "sine=frequency=440:duration=2",
  path.join(work, "voice-0.wav"),
);

const seg = 90;
const plan: EditPlan = {
  width: 1920,
  height: 1080,
  totalFrames: INTRO_FRAMES + seg + OUTRO_FRAMES,
  segments: [
    {
      index: 0,
      fromFrame: INTRO_FRAMES,
      frames: seg,
      videoStartMs: 0,
      playbackRate: 1,
      holdFrames: 15,
      voiceFile: path.join(work, "voice-0.wav"),
    },
  ],
  zooms: [{ atFrame: INTRO_FRAMES + 30, x: 1800, y: 100 }],
  captions: [
    {
      fromFrame: INTRO_FRAMES,
      toFrame: INTRO_FRAMES + seg,
      text: "A test caption.",
    },
  ],
};

const { wide, tall } = await render(plan, timetable, work, out);
const probe = (f: string, entries: string, stream = "v:0") =>
  execFileSync("ffprobe", [
    "-v",
    "error",
    "-select_streams",
    stream,
    "-show_entries",
    entries,
    "-of",
    "csv=p=0",
    f,
  ])
    .toString()
    .trim();
assert.equal(probe(wide, "stream=width,height"), "1920,1080");
assert.equal(probe(tall, "stream=width,height"), "1080,1920");
for (const f of [wide, tall]) {
  const secs = Number(
    execFileSync("ffprobe", [
      "-v",
      "error",
      "-show_entries",
      "format=duration",
      "-of",
      "csv=p=0",
      f,
    ]).toString(),
  );
  assert.ok(
    Math.abs(secs - plan.totalFrames / FPS) <= 1 / FPS + 0.05,
    `${f}: ${secs}s`,
  );
  assert.equal(probe(f, "stream=codec_type", "a:0"), "audio");
  assert.equal(probe(f, "stream=codec_name"), "h264");
}
fs.rmSync(work, { recursive: true });
console.log("render: ok");
