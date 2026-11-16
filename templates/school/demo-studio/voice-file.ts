import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { alignLines } from "./align.js";
import { transcribe } from "./transcribe.js";
import type { VoiceLine } from "./types.js";
import { durationMs } from "./voice.js";

/** Where a demo's recorded voice goes: `demo-studio/voice/<slug>.(mp3|wav|m4a)`. */
export const VOICE_DIR = path.join(import.meta.dirname, "voice");

const EXTS = /\.(mp3|wav|m4a)$/;

/**
 * Your recording of a demo: `<slug>.mp3`, or several parts in name order
 * (`<slug>-01.mp3`, `<slug>-02.mp3`) when the voice tool caps how much it will
 * read at once. Nothing found gives an empty list.
 */
export function findVoiceFiles(
  slug: string,
  dir: string = VOICE_DIR,
): string[] {
  if (!fs.existsSync(dir)) return [];
  const names = fs.readdirSync(dir).filter((n) => EXTS.test(n));
  const whole = names.filter((n) => n.replace(EXTS, "") === slug);
  if (whole.length) return [path.join(dir, whole[0])];
  return names
    .filter((n) => new RegExp(`^${slug}-\\d+$`).test(n.replace(EXTS, "")))
    .sort((x, y) => x.localeCompare(y, undefined, { numeric: true }))
    .map((n) => path.join(dir, n));
}

/** One audio file for the pipeline: the only part as it is, or all parts joined end to end. */
export function joinVoiceParts(files: string[], workDir: string): string {
  if (files.length === 1) return files[0];
  fs.mkdirSync(workDir, { recursive: true });
  const list = path.join(workDir, "voice-parts.txt");
  fs.writeFileSync(list, files.map((f) => `file '${f}'`).join("\n"));
  const out = path.join(workDir, "voice-joined.wav");
  execFileSync("ffmpeg", [
    "-v",
    "error",
    "-y",
    "-f",
    "concat",
    "-safe",
    "0",
    "-i",
    list,
    "-ar",
    "24000",
    "-ac",
    "1",
    out,
  ]);
  return out;
}

/**
 * One audio file of the whole script in, one clean clip per line out, in the
 * shape the video plan already takes from the synthetic voice. Pauses longer
 * than 0.7 s inside a line are cut down to 0.3 s; the gaps between lines,
 * filler and earlier takes are not in the clips at all.
 */
export async function voiceFromFile(
  audioPath: string,
  lines: string[],
  workDir: string,
): Promise<VoiceLine[]> {
  const words = await transcribe(audioPath, workDir);
  let spans;
  try {
    spans = alignLines(lines, words);
  } catch (e) {
    // Show what was heard, so a mismatch can be read off rather than guessed.
    throw new Error(
      `${(e as Error).message}\nThe audio says: ${words.map((w) => w.text).join(" ")}`,
    );
  }
  return spans.map((s, i) => {
    const file = path.join(workDir, `voice-${s.index}.wav`);
    // Whisper's word ends run early, so give each line room to finish, but never into the next.
    const prev = spans[i - 1];
    const next = spans[i + 1];
    const from = Math.max(prev ? prev.endMs : 0, s.startMs - 120) / 1000;
    const to =
      Math.min(s.endMs + 350, next ? next.startMs - 60 : Infinity) / 1000;
    execFileSync("ffmpeg", [
      "-v",
      "error",
      "-y",
      "-ss",
      String(from),
      "-to",
      String(to),
      "-i",
      audioPath,
      "-af",
      "silenceremove=stop_periods=-1:stop_duration=0.7:stop_threshold=-40dB:stop_silence=0.3,afade=t=in:d=0.01,areverse,afade=t=in:d=0.05,areverse",
      "-ar",
      "24000",
      "-ac",
      "1",
      file,
    ]);
    return { index: s.index, file, durationMs: durationMs(file) };
  });
}
