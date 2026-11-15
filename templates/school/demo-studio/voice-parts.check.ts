import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { findVoiceFiles, joinVoiceParts } from "./voice-file.js";

const dir = fs.mkdtempSync(path.join(os.tmpdir(), "demo-parts-"));
const tone = (name: string, secs: number) =>
  execFileSync("ffmpeg", [
    "-v",
    "error",
    "-y",
    "-f",
    "lavfi",
    "-i",
    `sine=f=440:d=${secs}`,
    path.join(dir, name),
  ]);
tone("demo-02.mp3", 1);
tone("demo-01.mp3", 2);
tone("other.mp3", 1);

// One file, or several in name order; never another demo's.
assert.deepEqual(
  findVoiceFiles("demo", dir).map((f) => path.basename(f)),
  ["demo-01.mp3", "demo-02.mp3"],
);
assert.deepEqual(
  findVoiceFiles("other", dir).map((f) => path.basename(f)),
  ["other.mp3"],
);
assert.deepEqual(findVoiceFiles("none", dir), []);

const joined = joinVoiceParts(findVoiceFiles("demo", dir), dir);
const secs = Number(
  execFileSync("ffprobe", [
    "-v",
    "error",
    "-show_entries",
    "format=duration",
    "-of",
    "csv=p=0",
    joined,
  ]).toString(),
);
assert.ok(Math.abs(secs - 3) < 0.2, `joined is ${secs}s`);
fs.rmSync(dir, { recursive: true });
console.log("voice-parts: ok");
