import fs from "node:fs";
import path from "node:path";
import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition } from "@remotion/renderer";
import { makeMusic } from "./music.js";
import type { EditPlan } from "./plan.js";
import type { DemoBase } from "./types.js";

/**
 * Render the edit twice: 16:9 for YouTube, 9:16 for Shorts, TikTok and Reels.
 * The work dir (screen.webm, voice-*.wav) is served to Remotion as its public dir.
 */
export async function render(
  plan: EditPlan,
  demo: Pick<DemoBase, "slug" | "title">,
  workDir: string,
  outDir: string,
  options: { music?: boolean } = {},
): Promise<{ wide: string; tall: string }> {
  fs.mkdirSync(outDir, { recursive: true });
  const music =
    options.music === false
      ? undefined
      : makeMusic(workDir, plan.totalFrames / 30);
  const serveUrl = await bundle({
    entryPoint: path.resolve(import.meta.dirname, "video", "index.ts"),
    publicDir: workDir,
  });
  const inputProps = { plan, title: demo.title, music };
  const out = {
    wide: path.join(outDir, `${demo.slug}-16x9.mp4`),
    tall: path.join(outDir, `${demo.slug}-9x16.mp4`),
  };
  for (const [id, file] of [
    ["Wide", out.wide],
    ["Tall", out.tall],
  ] as const) {
    const composition = await selectComposition({ serveUrl, id, inputProps });
    await renderMedia({
      composition,
      serveUrl,
      codec: "h264",
      audioCodec: "aac",
      outputLocation: file,
      inputProps,
    });
  }
  return out;
}
