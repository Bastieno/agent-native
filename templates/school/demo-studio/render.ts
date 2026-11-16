import fs from "node:fs";
import path from "node:path";
import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition } from "@remotion/renderer";
import { makeMusic } from "./music.js";
import { whoosh, mouseClick } from "@remotion/sfx";
import type { EditPlan } from "./plan.js";
import type { DemoBase } from "./types.js";

/**
 * Render the edit twice: 16:9 for YouTube, 9:16 for Shorts, TikTok and Reels.
 * The work dir (screen.webm, voice-*.wav) is served to Remotion as its public dir.
 */
/** Fetch a sound effect into the work dir; a failed download just means no effect. */
async function fetchSfx(url: string, workDir: string, name: string) {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(20_000) });
    if (!res.ok) throw new Error(`${res.status}`);
    fs.writeFileSync(
      path.join(workDir, name),
      Buffer.from(await res.arrayBuffer()),
    );
    return name;
  } catch (e) {
    console.warn(
      `  ! could not fetch ${name}: ${(e as Error).message}. Rendering without it.`,
    );
    return undefined;
  }
}

export async function render(
  plan: EditPlan,
  demo: Pick<DemoBase, "slug" | "title">,
  workDir: string,
  outDir: string,
  options: { music?: boolean; sfx?: boolean; phone?: boolean } = {},
): Promise<{ wide?: string; tall?: string; phone?: string }> {
  fs.mkdirSync(outDir, { recursive: true });
  const music =
    options.music === false
      ? undefined
      : makeMusic(workDir, plan.totalFrames / 30);
  const sfx =
    options.sfx === false
      ? undefined
      : {
          whoosh: await fetchSfx(whoosh, workDir, "sfx-whoosh.wav"),
          click: await fetchSfx(mouseClick, workDir, "sfx-click.wav"),
        };
  const serveUrl = await bundle({
    entryPoint: path.resolve(import.meta.dirname, "video", "index.ts"),
    publicDir: workDir,
  });
  const inputProps = {
    plan,
    title: demo.title,
    music,
    sfx,
    phone: options.phone,
  };
  if (options.phone) {
    const file = path.join(outDir, `${demo.slug}-phone.mp4`);
    const composition = await selectComposition({
      serveUrl,
      id: "Phone",
      inputProps,
    });
    await renderMedia({
      composition,
      serveUrl,
      codec: "h264",
      audioCodec: "aac",
      outputLocation: file,
      inputProps,
    });
    return { phone: file };
  }
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
