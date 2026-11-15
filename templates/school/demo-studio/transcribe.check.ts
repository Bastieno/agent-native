import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { tokens } from "./align.js";
import { transcribe } from "./transcribe.js";
import { speak } from "./voice.js";

const dir = fs.mkdtempSync(path.join(os.tmpdir(), "demo-asr-"));
const line = "Every class gets its lessons, and there isn't a single clash.";
const [v] = await speak([line], "bf_emma", dir);
const words = await transcribe(v.file, dir);
assert.equal(
  tokens(words.map((w) => w.text).join(" ")).join(" "),
  tokens(line).join(" "),
);
assert.ok(words.every((w, i) => i === 0 || w.startMs >= words[i - 1].startMs));
assert.ok(words.at(-1)!.endMs <= v.durationMs + 300);
const t = Date.now();
await transcribe(v.file, dir);
assert.ok(Date.now() - t < 1000, "second call is cached");
fs.rmSync(dir, { recursive: true });
console.log("transcribe: ok");
