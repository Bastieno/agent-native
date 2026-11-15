import { execFileSync } from "node:child_process";
import path from "node:path";

/**
 * A soft ambient pad for under the voice: four sine tones (A, E, A, C#) with a
 * slow swell and a little echo, faded in and out. Made here from nothing, so
 * there is no licence to worry about. Returns the file name inside workDir.
 */
export function makeMusic(workDir: string, seconds: number): string {
  const name = "music.wav";
  const d = Math.ceil(seconds) + 1;
  const tones = [110, 164.81, 220, 277.18];
  const inputs = tones.flatMap((f) => [
    "-f",
    "lavfi",
    "-i",
    `sine=f=${f}:d=${d}`,
  ]);
  const filter =
    "[0][1][2][3]amix=inputs=4:normalize=0," +
    "tremolo=f=0.15:d=0.4,lowpass=f=900,aecho=0.8:0.7:700:0.25,volume=0.6," +
    `afade=t=in:d=3,afade=t=out:st=${d - 3}:d=3`;
  execFileSync("ffmpeg", [
    "-v",
    "error",
    "-y",
    ...inputs,
    "-filter_complex",
    filter,
    "-ar",
    "48000",
    "-ac",
    "2",
    path.join(workDir, name),
  ]);
  return name;
}
