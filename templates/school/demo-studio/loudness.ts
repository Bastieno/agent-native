import { execFileSync, spawnSync } from "node:child_process";
import fs from "node:fs";

/** What YouTube, Shorts, TikTok and Reels play at; louder is turned down, quieter is not turned up by them. */
export const TARGET_LUFS = -14;
const TRUE_PEAK = -1.5;

type Measured = {
  input_i: string;
  input_tp: string;
  input_lra: string;
  input_thresh: string;
  target_offset: string;
};

function run(file: string, filter: string): string {
  const r = spawnSync(
    "ffmpeg",
    [
      "-hide_banner",
      "-nostats",
      "-i",
      file,
      "-vn",
      "-af",
      filter,
      "-f",
      "null",
      "-",
    ],
    { encoding: "utf8" },
  );
  return r.stderr ?? "";
}

/** Loudness of a file's audio in LUFS (integrated), read with ffmpeg. */
export function measureLufs(file: string): number {
  const log = run(file, "ebur128=peak=true");
  const at = log.lastIndexOf("I:");
  return parseFloat(log.slice(at + 2));
}

/**
 * Even out a finished video's sound to the platforms' level, in two passes:
 * measure, then correct with those measurements. The picture is not re-encoded.
 */
export function normaliseLoudness(file: string): void {
  const base = `loudnorm=I=${TARGET_LUFS}:TP=${TRUE_PEAK}:LRA=11`;
  const log = run(file, `${base}:print_format=json`);
  const json = log.slice(log.lastIndexOf("{"), log.lastIndexOf("}") + 1);
  const m = JSON.parse(json) as Measured;
  const tmp = file.replace(/\.mp4$/, ".norm.mp4");
  execFileSync("ffmpeg", [
    "-v",
    "error",
    "-y",
    "-i",
    file,
    "-c:v",
    "copy",
    "-af",
    `${base}:measured_I=${m.input_i}:measured_TP=${m.input_tp}:measured_LRA=${m.input_lra}:measured_thresh=${m.input_thresh}:offset=${m.target_offset}:linear=true`,
    "-ar",
    "48000",
    "-c:a",
    "aac",
    "-b:a",
    "192k",
    tmp,
  ]);
  fs.renameSync(tmp, file);
}
