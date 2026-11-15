import { execFileSync, spawnSync } from "node:child_process";
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

/** Stretches of speech: what is left after silences of 0.4 s or more are taken out. */
export function speechSegments(
  audioPath: string,
): { startS: number; endS: number }[] {
  const r = spawnSync(
    "ffmpeg",
    [
      "-i",
      audioPath,
      "-af",
      "silencedetect=noise=-38dB:d=0.4",
      "-f",
      "null",
      "-",
    ],
    { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 },
  );
  const log = r.stderr;
  const total = Number(
    /Duration: (\d+):(\d+):([\d.]+)/
      .exec(log)
      ?.slice(1)
      .reduce((t, v) => t * 60 + Number(v), 0),
  );
  const starts = [...log.matchAll(/silence_start: ([\d.]+)/g)].map((m) =>
    Number(m[1]),
  );
  const ends = [...log.matchAll(/silence_end: ([\d.]+)/g)].map((m) =>
    Number(m[1]),
  );
  const out: { startS: number; endS: number }[] = [];
  let at = 0;
  starts.forEach((st, i) => {
    if (st - at > 0.15) out.push({ startS: at, endS: st });
    at = ends[i] ?? total;
  });
  if (total - at > 0.15) out.push({ startS: at, endS: total });
  return out;
}

export async function transcribe(
  audioPath: string,
  workDir: string,
): Promise<Word[]> {
  fs.mkdirSync(workDir, { recursive: true });
  const st = fs.statSync(audioPath);
  const key = `v2:${path.resolve(audioPath)}:${st.size}:${Math.round(st.mtimeMs)}`;
  const cache = path.join(workDir, "transcript.json");
  if (fs.existsSync(cache)) {
    const c = JSON.parse(fs.readFileSync(cache, "utf8"));
    if (c.key === key) return c.words;
  }
  // Each stretch of speech is read on its own: Whisper skips short lines when
  // it is handed minutes of audio with silences in between.
  const all = samples(audioPath);
  const run = await recogniser();
  const words: Word[] = [];
  for (const seg of speechSegments(audioPath)) {
    const from = Math.max(0, seg.startS - 0.2);
    const part = all.slice(
      Math.floor(from * 16000),
      Math.min(all.length, Math.ceil((seg.endS + 0.2) * 16000)),
    );
    const out = await run(part, {
      return_timestamps: "word",
      chunk_length_s: 30,
      stride_length_s: 5,
    });
    for (const c of out.chunks as any[]) {
      const text = String(c.text).trim();
      if (!text) continue;
      const t0 = c.timestamp[0] ?? 0;
      words.push({
        text,
        startMs: Math.round((from + t0) * 1000),
        endMs: Math.round((from + (c.timestamp[1] ?? t0 + 0.2)) * 1000),
      });
    }
  }
  fs.writeFileSync(cache, JSON.stringify({ key, words }));
  return words;
}
