import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import type { Word } from "./align.js";

/**
 * Words and their times in an audio file, from Whisper running on this
 * machine. Free, no key. The result is cached beside the take, keyed by the
 * audio file's size and modified time.
 */
const MODEL = "Xenova/whisper-base.en";

let asr: Promise<any> | null = null;
function recogniser() {
  asr ??= import("@huggingface/transformers").then(({ pipeline }) =>
    pipeline("automatic-speech-recognition", MODEL),
  );
  return asr;
}

/** 16 kHz mono samples, which is what Whisper reads. */
function samples(audioPath: string): Float32Array {
  const raw = execFileSync(
    "ffmpeg",
    [
      "-v",
      "error",
      "-i",
      audioPath,
      "-ar",
      "16000",
      "-ac",
      "1",
      "-f",
      "f32le",
      "-",
    ],
    { maxBuffer: 1024 * 1024 * 1024 },
  );
  return new Float32Array(raw.buffer, raw.byteOffset, raw.byteLength / 4);
}

export async function transcribe(
  audioPath: string,
  workDir: string,
): Promise<Word[]> {
  fs.mkdirSync(workDir, { recursive: true });
  const st = fs.statSync(audioPath);
  const key = `${path.resolve(audioPath)}:${st.size}:${Math.round(st.mtimeMs)}`;
  const cache = path.join(workDir, "transcript.json");
  if (fs.existsSync(cache)) {
    const c = JSON.parse(fs.readFileSync(cache, "utf8"));
    if (c.key === key) return c.words;
  }
  const out = await (
    await recogniser()
  )(samples(audioPath), {
    return_timestamps: "word",
    chunk_length_s: 30,
    stride_length_s: 5,
  });
  const words: Word[] = (out.chunks as any[])
    .map((c) => ({
      text: String(c.text).trim(),
      startMs: Math.round(c.timestamp[0] * 1000),
      endMs: Math.round((c.timestamp[1] ?? c.timestamp[0] + 0.2) * 1000),
    }))
    .filter((w) => w.text);
  fs.writeFileSync(cache, JSON.stringify({ key, words }));
  return words;
}
