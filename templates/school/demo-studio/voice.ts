import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import type { VoiceLine } from "./types.js";

/**
 * Speak each line with Kokoro, locally and free. British voices only: the
 * videos are for Nigerian schools, and British sits better over Nigerian names.
 * Lines whose text and voice haven't changed are reused from the cache.
 */
const MODEL = "onnx-community/Kokoro-82M-v1.0-ONNX";

interface CacheEntry extends VoiceLine {
  text: string;
  voice: string;
}

let tts: Promise<any> | null = null;
function model() {
  tts ??= import("kokoro-js").then(({ KokoroTTS }) =>
    KokoroTTS.from_pretrained(MODEL, { dtype: "q8", device: "cpu" }),
  );
  return tts;
}

function durationMs(file: string): number {
  const out = execFileSync("ffprobe", [
    "-v",
    "error",
    "-show_entries",
    "format=duration",
    "-of",
    "csv=p=0",
    file,
  ]).toString();
  return Math.round(Number(out) * 1000);
}

export async function speak(
  lines: string[],
  voice: string,
  workDir: string,
): Promise<VoiceLine[]> {
  if (!/^b[fm]_/.test(voice)) {
    throw new Error(`"${voice}" is not a British Kokoro voice (bf_… or bm_…).`);
  }
  fs.mkdirSync(workDir, { recursive: true });
  const index = path.join(workDir, "voice.json");
  const cached: CacheEntry[] = fs.existsSync(index)
    ? JSON.parse(fs.readFileSync(index, "utf8"))
    : [];
  const out: CacheEntry[] = [];
  for (const [i, text] of lines.entries()) {
    const file = path.join(workDir, `voice-${i}.wav`);
    const hit = cached.find(
      (c) => c.index === i && c.text === text && c.voice === voice,
    );
    if (hit && fs.existsSync(file)) {
      out.push(hit);
      continue;
    }
    const audio = await (await model()).generate(text, { voice });
    await audio.save(file);
    out.push({ index: i, file, durationMs: durationMs(file), text, voice });
  }
  fs.writeFileSync(index, JSON.stringify(out, null, 2));
  return out.map(({ index, file, durationMs }) => ({
    index,
    file,
    durationMs,
  }));
}
