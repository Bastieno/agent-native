import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { demos } from "./demos/index.js";
import { findVoiceFiles, voiceFromFile } from "./voice-file.js";
import { durationMs, speak } from "./voice.js";

const dir = fs.mkdtempSync(path.join(os.tmpdir(), "demo-vf-"));
const lines = demos.timetable.steps.map((s) => s.line);
const ref = await speak([...lines, "Um, so."], "bf_emma", dir);

const ff = (...a: string[]) =>
  execFileSync("ffmpeg", ["-v", "error", "-y", ...a]);
const gap = (s: number, name: string) => {
  const f = path.join(dir, name);
  ff(
    "-f",
    "lavfi",
    "-i",
    "anullsrc=r=24000:cl=mono",
    "-t",
    String(s),
    "-c:a",
    "pcm_f32le",
    f,
  );
  return f;
};
const concat = (files: string[], out: string) => {
  const list = path.join(dir, "list.txt");
  fs.writeFileSync(list, files.map((f) => `file '${f}'`).join("\n"));
  ff("-f", "concat", "-safe", "0", "-i", list, "-c", "copy", out);
};

// Five lines with 1.5 s gaps, line 2 said twice, and an "um" before line 3.
const g = gap(1.5, "gap.wav");
const um = ref[5].file;
const file = path.join(dir, "take.wav");
concat(
  [
    ref[0].file,
    g,
    ref[1].file,
    g,
    ref[1].file,
    g,
    um,
    g,
    ref[2].file,
    g,
    ref[3].file,
    g,
    ref[4].file,
  ],
  file,
);
const got = await voiceFromFile(file, lines, dir);
assert.equal(got.length, 5);
got.forEach((v, i) => {
  assert.equal(v.index, i);
  assert.ok(fs.existsSync(v.file));
  assert.ok(
    Math.abs(v.durationMs - ref[i].durationMs) < ref[i].durationMs * 0.25 + 500,
    `line ${i}: ${v.durationMs}ms against ${ref[i].durationMs}ms`,
  );
});

// A 2 s pause inside a line is shortened.
{
  const one = "Every class gets its lessons, and nothing clashes.";
  const [a, b] = (
    await speak(
      ["Every class gets its lessons,", "and nothing clashes."],
      "bf_emma",
      path.join(dir, "p"),
    )
  ).map((x) => x.file);
  const slow = path.join(dir, "slow.wav");
  concat([a, gap(2, "pause.wav"), b], slow);
  const [v] = await voiceFromFile(slow, [one], path.join(dir, "slow"));
  assert.ok(
    v.durationMs < durationMs(a) + durationMs(b) + 700,
    `${v.durationMs}ms still has the pause`,
  );
}

assert.deepEqual(findVoiceFiles("no-such-demo"), []);
fs.rmSync(dir, { recursive: true });
console.log("voice-file: ok");
