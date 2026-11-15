import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { makeMusic } from "./music.js";

const dir = fs.mkdtempSync(path.join(os.tmpdir(), "demo-music-"));
const name = makeMusic(dir, 10);
const file = path.join(dir, name);
const secs = Number(
  execFileSync("ffprobe", [
    "-v",
    "error",
    "-show_entries",
    "format=duration",
    "-of",
    "csv=p=0",
    file,
  ]).toString(),
);
assert.ok(secs >= 10 && secs <= 12.5, `${secs}s`);
// Audible, but quiet: not silence, and well under full scale.
const r = spawnSync(
  "ffmpeg",
  ["-i", file, "-af", "volumedetect", "-f", "null", "-"],
  { encoding: "utf8" },
);
const max = Number(/max_volume: (-?[\d.]+) dB/.exec(r.stderr)![1]);
assert.ok(max < -3 && max > -40, `peak ${max} dB`);
fs.rmSync(dir, { recursive: true });
console.log("music: ok");
