import fs from "node:fs";
import path from "node:path";
import { restoreSnapshot } from "./db.js";
import { demos } from "./demos/index.js";
import { fitSteps } from "./plan.js";
import { record } from "./record.js";
import { render } from "./render.js";
import { portTaken, startDemoServer } from "./server.js";
import { DEMO_PORT } from "./guard.js";
import { speak } from "./voice.js";

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

if (await portTaken(DEMO_PORT)) {
  console.error(
    `Port ${DEMO_PORT} is already in use (a demo server left running?). Stop it, then try again.`,
  );
  process.exit(1);
}
console.log("· restoring the demo school");
restoreSnapshot();
const server = await startDemoServer();
let timeline;
try {
  console.log("· recording");
  ({ timeline } = await record(demo, server.url, work));
} finally {
  await server.stop();
}
console.log("· voice");
const lines = demo.steps.map((s) => s.line);
const voice = await speak(lines, demo.voice ?? "bf_emma", work);
const plan = fitSteps(
  timeline,
  voice,
  demo.steps.map((s) => !!s.cut),
  lines,
);
fs.writeFileSync(path.join(work, "plan.json"), JSON.stringify(plan, null, 2));
for (const s of plan.segments) {
  if (s.silentFrames > 15) {
    console.warn(
      `  ! step ${s.index} plays ${(s.silentFrames / 30).toFixed(1)}s with no voice after its line ("${demo.steps[s.index].line}"). Mark it cut: true or give it a longer line.`,
    );
  }
}
console.log("· rendering");
const { wide, tall } = await render(plan, demo, work, out);
console.log(
  `\nDone in ${Math.round((Date.now() - started) / 1000)}s (${(plan.totalFrames / 30).toFixed(1)}s of video)\n  ${wide}\n  ${tall}`,
);
