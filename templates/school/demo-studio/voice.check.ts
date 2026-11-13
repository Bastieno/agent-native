import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { speak } from "./voice.js";

const dir = fs.mkdtempSync(path.join(os.tmpdir(), "demo-voice-"));
const probe = (f: string) =>
  Number(
    execFileSync("ffprobe", [
      "-v",
      "error",
      "-show_entries",
      "format=duration",
      "-of",
      "csv=p=0",
      f,
    ]).toString(),
  ) * 1000;

const [line] = await speak(["Hello from Crestfield."], "bm_george", dir);
assert.ok(fs.existsSync(line.file));
assert.ok(
  line.durationMs > 800 && line.durationMs < 4000,
  `duration ${line.durationMs}`,
);
assert.ok(Math.abs(probe(line.file) - line.durationMs) < 50);
assert.ok(fs.existsSync(path.join(dir, "voice.json")));

// Same text and voice again: served from the cache, file untouched.
const before = fs.statSync(line.file).mtimeMs;
await speak(["Hello from Crestfield."], "bm_george", dir);
assert.equal(fs.statSync(line.file).mtimeMs, before);

await assert.rejects(() => speak(["Hi."], "af_heart", dir), /British/);
fs.rmSync(dir, { recursive: true });
console.log("voice: ok");
