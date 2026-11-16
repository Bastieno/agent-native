import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { alignLines, type LineSpan } from "./align.js";
import { speechSegments, transcribe } from "./transcribe.js";
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
 * Where to cut a line out of the recording, in seconds. The transcript's word
 * times are rough (a misheard first word, an end that comes early), so the cut
 * snaps to the stretch of speech the line sits in, as long as that stretch holds
 * no neighbouring line.
 */
export function cutWindow(
  s: LineSpan,
  prev: LineSpan | undefined,
  next: LineSpan | undefined,
  segs: { startS: number; endS: number }[],
): { fromS: number; toS: number } {
  const at = (ms: number) =>
    segs.find(
      (g) => ms / 1000 >= g.startS - 0.05 && ms / 1000 <= g.endS + 0.05,
    );
  const prevEndS = prev ? prev.endMs / 1000 : 0;
  const nextStartS = next ? next.startMs / 1000 : Infinity;
  let fromS = Math.max(prevEndS, (s.startMs - 120) / 1000);
  let toS = Math.min((s.endMs + 350) / 1000, nextStartS - 0.06);
  const a = at(s.startMs);
  if (a && s.startMs / 1000 - a.startS < 1.5 && prevEndS <= a.startS + 0.05)
    fromS = Math.max(a.startS - 0.05, prevEndS);
  const b = at(s.endMs);
  if (b && b.endS - s.endMs / 1000 < 1.5 && nextStartS >= b.endS - 0.05)
    toS = Math.min(b.endS + 0.12, nextStartS - 0.03);
  return { fromS, toS };
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
  const segs = speechSegments(audioPath);
  return spans.map((s, i) => {
    const file = path.join(workDir, `voice-${s.index}.wav`);
    const { fromS: from, toS: to } = cutWindow(
      s,
      spans[i - 1],
      spans[i + 1],
      segs,
    );
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
