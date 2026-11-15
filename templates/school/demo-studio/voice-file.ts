import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { alignLines } from "./align.js";
import { transcribe } from "./transcribe.js";
import type { VoiceLine } from "./types.js";
import { durationMs } from "./voice.js";

/** Where a demo's recorded voice goes: `demo-studio/voice/<slug>.(mp3|wav|m4a)`. */
export const VOICE_DIR = path.join(import.meta.dirname, "voice");

export function findVoiceFile(slug: string): string | undefined {
  for (const ext of ["mp3", "wav", "m4a"]) {
    const f = path.join(VOICE_DIR, `${slug}.${ext}`);
    if (fs.existsSync(f)) return f;
  }
  return undefined;
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
  return spans.map((s) => {
    const file = path.join(workDir, `voice-${s.index}.wav`);
    const from = Math.max(0, s.startMs - 80) / 1000;
    const to = (s.endMs + 120) / 1000;
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
      "silenceremove=stop_periods=-1:stop_duration=0.7:stop_threshold=-40dB:stop_silence=0.3",
      "-ar",
      "24000",
      "-ac",
      "1",
      file,
    ]);
    return { index: s.index, file, durationMs: durationMs(file) };
  });
}
