import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import type { Timeline } from "./types.js";

/** One recorded stretch of screen and when its steps happened in it. */
export interface Part {
  videoPath: string;
  timeline: Timeline;
}

const ffmpeg = (...a: string[]) =>
  execFileSync("ffmpeg", ["-v", "error", "-y", ...a]);
const seconds = (file: string) =>
  Number(
    execFileSync("ffprobe", [
      "-v",
      "error",
      "-show_entries",
      "format=duration",
      "-of",
      "csv=p=0",
      file,
    ])
      .toString()
      .trim(),
  );

/** A screen recording the user made themselves, as a scene with one step spanning all of it. */
export async function clipPart(file: string): Promise<Part> {
  return {
    videoPath: file,
    timeline: {
      width: 1920,
      height: 1080,
      videoOffsetMs: 0,
      flashAtMs: 0,
      steps: [
        {
          index: 0,
          startMs: 0,
          endMs: Math.round(seconds(file) * 1000),
          clicks: [],
        },
      ],
    },
  };
}

/**
 * Join scenes into one `screen.webm` and one timeline, so the rest of the
 * pipeline sees a single recording. Each scene is trimmed to start at its first
 * step (the sign-in and page loads before it are dropped) and scaled to
 * 1920x1080 with bars if it is another shape.
 */
export async function mergeScenes(
  parts: Part[],
  workDir: string,
): Promise<Part> {
  fs.mkdirSync(workDir, { recursive: true });
  const scale =
    "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2,setsar=1,fps=30";
  const files: string[] = [];
  const steps: Timeline["steps"] = [];
  let offsetMs = 0;
  for (const [i, part] of parts.entries()) {
    const first = part.timeline.steps[0].startMs;
    const total = seconds(part.videoPath) * 1000;
    const last = Math.min(total, part.timeline.steps.at(-1)!.endMs + 300);
    const out = path.join(workDir, `scene-${i}.webm`);
    ffmpeg(
      "-ss",
      String(first / 1000),
      "-to",
      String(last / 1000),
      "-i",
      part.videoPath,
      "-vf",
      scale,
      "-an",
      "-c:v",
      "libvpx-vp9",
      "-b:v",
      "0",
      "-crf",
      "30",
      "-deadline",
      "realtime",
      "-cpu-used",
      "8",
      "-row-mt",
      "1",
      out,
    );
    const delta = offsetMs - first;
    for (const s of part.timeline.steps) {
      steps.push({
        index: steps.length,
        startMs: s.startMs + delta,
        endMs: s.endMs + delta,
        clicks: s.clicks.map((c) => ({ ...c, atMs: c.atMs + delta })),
      });
    }
    offsetMs += seconds(out) * 1000;
    files.push(out);
  }
  const list = path.join(workDir, "scenes.txt");
  fs.writeFileSync(list, files.map((f) => `file '${f}'`).join("\n"));
  const videoPath = path.join(workDir, "screen.webm");
  ffmpeg("-f", "concat", "-safe", "0", "-i", list, "-c", "copy", videoPath);
  return {
    videoPath,
    timeline: {
      width: 1920,
      height: 1080,
      videoOffsetMs: 0,
      flashAtMs: 0,
      steps,
    },
  };
}
