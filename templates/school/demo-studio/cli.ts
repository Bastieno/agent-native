import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { restoreSnapshot } from "./db.js";
import { demos } from "./demos/index.js";
import { fitSteps } from "./plan.js";
import { record } from "./record.js";
import { render } from "./render.js";
import { portTaken, startDemoServer } from "./server.js";
import { SCHOOLS } from "./schools.js";
import { isClip, isRecorded, clipPath, scenesOf, stepsOf } from "./scenes.js";
import { clipPart, mergeScenes, type Part } from "./merge.js";
import { speak } from "./voice.js";
import { findVoiceFiles, joinVoiceParts, voiceFromFile } from "./voice-file.js";

/** `pnpm demo <slug>`: record, voice, edit and render one demo video. */
const slug = process.argv[2];
const demo = slug ? demos[slug] : undefined;
if (!demo) {
  console.error(
    `${slug ? `No demo called "${slug}".` : "Which demo?"} Available: ${Object.keys(demos).join(", ")}\nUsage: pnpm demo <slug>`,
  );
  process.exit(1);
}
const started = Date.now();
const here = import.meta.dirname;
const work = path.join(here, "work", demo.slug);
const out = path.join(here, "out", demo.slug);
fs.mkdirSync(work, { recursive: true });

const reuse = process.argv.includes("--reuse");
// --only=1,3 records just those scenes (0-based) and stops: for fixing one scene at a time.
const onlyArg = process.argv.find((a) => a.startsWith("--only="));
const only = onlyArg ? onlyArg.slice(7).split(",").map(Number) : null;
const scenes = scenesOf(demo);
// Every school this demo visits must have its snapshot, and its port must be free.
for (const sc of scenes.filter(isRecorded)) {
  const port = SCHOOLS[sc.school].port;
  if (await portTaken(port)) {
    console.error(
      `Port ${port} (${sc.school}) is already in use (a demo server left running?). Stop it, then try again.`,
    );
    process.exit(1);
  }
}
const parts: Part[] = [];
for (const [i, sc] of scenes.entries()) {
  if (only && !only.includes(i)) continue;
  if (isClip(sc)) {
    console.log(`· scene ${i + 1}/${scenes.length}: your clip`);
    let clip = clipPath(sc);
    if (!fs.existsSync(clip)) {
      // A stand-in so a rough cut can be watched; the real clip must replace it.
      console.warn(
        `  ! ${path.relative(process.cwd(), clip)} is missing: using a blank stand-in. Record your clip and save it there before the final cut.`,
      );
      clip = path.join(work, "clip-standin.webm");
      execFileSync("ffmpeg", [
        "-v",
        "error",
        "-y",
        "-f",
        "lavfi",
        "-i",
        "color=c=0x16161d:s=1920x1080:r=30:d=8",
        "-c:v",
        "libvpx-vp9",
        clip,
      ]);
    }
    parts.push(await clipPart(clip));
    continue;
  }
  console.log(
    `· scene ${i + 1}/${scenes.length}: recording ${sc.school} as ${sc.signInAs}`,
  );
  const dir = scenes.length === 1 ? work : path.join(work, `scene-${i}`);
  // --reuse keeps a scene already recorded (and its live AI run) from last time.
  const saved = path.join(dir, "timeline.json");
  if (
    reuse &&
    fs.existsSync(saved) &&
    fs.existsSync(path.join(dir, "screen.webm"))
  ) {
    console.log("  reusing the earlier recording");
    parts.push({
      videoPath: path.join(dir, "screen.webm"),
      timeline: JSON.parse(fs.readFileSync(saved, "utf8")),
    });
    continue;
  }
  restoreSnapshot(undefined, sc.school);
  const server = await startDemoServer(sc.school);
  try {
    const { videoPath, timeline } = await record(
      { ...sc, slug: demo.slug, title: demo.title },
      server.url,
      dir,
    );
    parts.push({ videoPath, timeline });
  } finally {
    await server.stop();
  }
}
if (only) {
  console.log(
    `\nRecorded scene(s) ${only.join(", ")} into ${path.relative(process.cwd(), work)}/scene-N/. Stopping (--only).`,
  );
  process.exit(0);
}
let timeline = parts[0].timeline;
if (scenes.length > 1) {
  console.log(`· joining ${scenes.length} scenes`);
  ({ timeline } = await mergeScenes(parts, work));
}
const allSteps = stepsOf(scenes);
const lines = allSteps.map((s) => s.line);
const voiceParts = findVoiceFiles(demo.slug);
const voiceFile = voiceParts.length
  ? joinVoiceParts(voiceParts, work)
  : undefined;
console.log(
  voiceFile
    ? `· voice: your recording (${voiceParts.map((f) => path.basename(f)).join(", ")})`
    : "· voice: the built-in British voice (put your recording in demo-studio/voice/ to use it)",
);
const voice = voiceFile
  ? await voiceFromFile(voiceFile, lines, work)
  : await speak(lines, demo.voice ?? "bf_emma", work);
const plan = fitSteps(
  timeline,
  voice,
  allSteps.map((s) => !!s.cut),
  lines,
);
fs.writeFileSync(path.join(work, "plan.json"), JSON.stringify(plan, null, 2));
for (const s of plan.segments) {
  if (s.silentFrames > 15) {
    console.warn(
      `  ! step ${s.index} plays ${(s.silentFrames / 30).toFixed(1)}s with no voice after its line ("${allSteps[s.index].line}"). Mark it cut: true or give it a longer line.`,
    );
  }
}
console.log("· rendering");
const { wide, tall } = await render(plan, demo, work, out);
console.log(
  `\nDone in ${Math.round((Date.now() - started) / 1000)}s (${(plan.totalFrames / 30).toFixed(1)}s of video)\n  ${wide}\n  ${tall}`,
);
