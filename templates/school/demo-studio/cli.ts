import fs from "node:fs";
import path from "node:path";
import { restoreSnapshot } from "./db.js";
import { demos } from "./demos/index.js";
import { fitSteps } from "./plan.js";
import { record } from "./record.js";
import { render } from "./render.js";
import { startDemoServer } from "./server.js";
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
console.log("· rendering");
const { wide, tall } = await render(plan, demo, work, out);
console.log(
  `\nDone in ${Math.round((Date.now() - started) / 1000)}s (${(plan.totalFrames / 30).toFixed(1)}s of video)\n  ${wide}\n  ${tall}`,
);
