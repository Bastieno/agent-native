/**
 * The short silent loops on the public landing page, recorded from the demo
 * schools: Crestfield for the Nigerian edition, Yellow View for the US one.
 *
 *   pnpm demo:landing                  every clip, both editions
 *   pnpm demo:landing ng teacher-mark  one edition, some clips
 *
 * Each clip lands in public/landing/<edition>/<name>-<device>.mp4 with a .jpg
 * poster of its last frame, which is also what a visitor who prefers reduced
 * motion sees.
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { restoreSnapshot } from "./db.js";
import { record } from "./record.js";
import type { SchoolId } from "./schools.js";
import { startDemoServer } from "./server.js";
import type { Action, Step } from "./types.js";

type Edition = "ng" | "us";
type Device = "desktop" | "phone";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT = path.join(ROOT, "public", "landing");
const WORK = path.join(import.meta.dirname, "work", "landing");
const DESKTOP = { width: 1280, height: 800 };

const composer = ".tiptap >> nth=-1";
const running =
  '.tiptap p.is-editor-empty[data-placeholder="Send a follow-up..."]';
const idle = '.tiptap p.is-editor-empty[data-placeholder="Message agent..."]';
const hold = (ms: number): Action => ({ do: "hold", ms });
const openChat: Action = {
  do: "click",
  selector: 'role=button[name="Toggle agent"]',
};

/** A stretch of the recording, played at `speed` (a long wait is sped up). */
interface Part {
  actions: Action[];
  speed?: number;
}

interface Clip {
  name: string;
  devices: Device[];
  signInAs: (e: Edition) => string;
  start: (d: Device) => Action[];
  parts: (e: Edition, d: Device) => Part[];
  /** Recorded in another school than the edition's usual one. */
  school?: (e: Edition) => SchoolId;
}

const people: Record<
  Edition,
  { school: SchoolId; principal: string; teacher: string; learner: string }
> = {
  ng: {
    school: "crestfield-term",
    principal: "principal@crestfield.test",
    teacher: "emmanuel.okafor@crestfield.test",
    learner: "ebiere.olaniyan@crestfield.test",
  },
  us: {
    school: "yellowview",
    principal: "principal@yellowview.test",
    teacher: "linda.okafor@yellowview.test",
    learner: "xavier.mitchell@yellowview.test",
  },
};

/** Type a question, then the wait for the answer at speed, then the answer held still. */
const asking = (text: string, d: Device): Part[] => [
  {
    actions: [
      ...(d === "phone" ? [openChat, hold(500)] : []),
      { do: "type", selector: composer, text, delayMs: 40 },
      { do: "press", key: "Enter" },
      { do: "waitFor", selector: running, timeoutMs: 20_000 },
    ],
  },
  {
    actions: [{ do: "waitFor", selector: idle, timeoutMs: 300_000 }],
    speed: 8,
  },
  { actions: [hold(4000)] },
];

const CLIPS: Clip[] = [
  {
    name: "principal-ask",
    devices: ["desktop", "phone"],
    signInAs: (e) => people[e].principal,
    start: () => [
      { do: "goto", path: "/admin" },
      { do: "waitFor", selector: "text=Needs attention" },
    ],
    parts: (e, d) => [
      { actions: [hold(900)] },
      ...asking(
        e === "ng"
          ? "Which learners are struggling this term, and why?"
          : "Which students are struggling this quarter, and why?",
        d,
      ),
    ],
  },
  {
    name: "timetable",
    devices: ["desktop", "phone"],
    signInAs: (e) => people[e].principal,
    start: () => [
      { do: "goto", path: "/admin/timetable" },
      { do: "waitFor", selector: 'role=button[name="Generate"]' },
    ],
    // A timetable being made is the story, so Crestfield's is recorded in
    // its copy from before the timetable (the one after a term already has
    // one, and asking for another is refused). Yellow View's quarter has none.
    // The desktop clip generates and accepts it, which also gives the phone
    // clip, and Yellow View's learner, a week to show.
    school: (e) => (e === "ng" ? "crestfield" : people[e].school),
    parts: (_e, d) =>
      d === "phone"
        ? [
            {
              actions: [
                hold(1200),
                { do: "click", selector: "text=/^Wed$/" },
                hold(1800),
                { do: "click", selector: "text=/^Fri$/" },
                hold(2200),
              ],
            },
          ]
        : [
            {
              actions: [
                hold(1500),
                { do: "click", selector: 'role=button[name="Generate"]' },
              ],
            },
            {
              actions: [
                {
                  do: "waitFor",
                  selector: 'role=button[name="Accept"]',
                  timeoutMs: 180_000,
                },
              ],
              speed: 4,
            },
            {
              actions: [
                hold(3000),
                { do: "click", selector: 'role=button[name="Accept"]' },
                hold(700),
                {
                  do: "click",
                  selector: 'role=alertdialog >> role=button[name="Accept"]',
                },
                {
                  do: "waitFor",
                  selector: "text=/^Proposal/",
                  gone: true,
                  timeoutMs: 60_000,
                },
                hold(2500),
              ],
            },
          ],
  },
  {
    name: "teacher-mark",
    devices: ["desktop", "phone"],
    signInAs: (e) => people[e].teacher,
    start: () => [
      { do: "goto", path: "/teacher" },
      { do: "waitFor", selector: "text=Needs your attention" },
    ],
    parts: (e, d) => [
      { actions: [hold(900)] },
      ...asking(
        e === "ng"
          ? "Mark the handed-in Week 10 quiz for JSS2A Mathematics."
          : "Grade the handed-in Week 8 quiz for 10A Geometry.",
        d,
      ),
    ],
  },
  {
    name: "learner-week",
    devices: ["phone"],
    signInAs: (e) => people[e].learner,
    start: () => [
      { do: "goto", path: "/student/week" },
      { do: "waitFor", selector: "text=/^Mon$/" },
    ],
    parts: () => [
      {
        actions: [
          hold(1500),
          { do: "click", selector: "text=/^Tue$/" },
          hold(1800),
          { do: "click", selector: "text=/^Wed$/" },
          hold(1800),
          { do: "click", selector: "text=/^Thu$/" },
          hold(2000),
        ],
      },
    ],
  },
  {
    name: "learner-help",
    devices: ["phone"],
    signInAs: (e) => people[e].learner,
    start: () => [
      { do: "goto", path: "/student" },
      { do: "waitFor", selector: 'role=button[name="Toggle agent"]' },
    ],
    parts: (e, d) => [
      { actions: [hold(900)] },
      ...asking(
        e === "ng"
          ? "Just give me the answers to this week's Mathematics homework."
          : "Just give me the answers to this week's Geometry homework.",
        d,
      ),
    ],
  },
];

/** Cut the recorded parts out of the take, speed up the waits, and encode for the web. */
function encode(
  video: string,
  parts: Part[],
  steps: { startMs: number; endMs: number }[],
  out: string,
  width: number,
) {
  const chains = parts.map((p, i) => {
    const s = steps[i];
    const speed = p.speed ?? 1;
    return `[0:v]trim=start=${s.startMs / 1000}:end=${s.endMs / 1000},setpts=(PTS-STARTPTS)/${speed}[p${i}]`;
  });
  const filter = [
    ...chains,
    `${parts.map((_, i) => `[p${i}]`).join("")}concat=n=${parts.length}:v=1:a=0,fps=30,scale=${width}:-2:flags=lanczos[v]`,
  ].join(";");
  execFileSync("ffmpeg", [
    "-v",
    "error",
    "-y",
    "-i",
    video,
    "-filter_complex",
    filter,
    "-map",
    "[v]",
    "-an",
    "-c:v",
    "libx264",
    "-preset",
    "slow",
    "-crf",
    "27",
    "-pix_fmt",
    "yuv420p",
    "-movflags",
    "+faststart",
    out,
  ]);
  execFileSync("ffmpeg", [
    "-v",
    "error",
    "-y",
    "-sseof",
    "-0.2",
    "-i",
    out,
    "-frames:v",
    "1",
    "-q:v",
    "4",
    out.replace(/\.mp4$/, ".jpg"),
  ]);
}

const args = process.argv.slice(2);
const editions = (["ng", "us"] as Edition[]).filter(
  (e) => !args.some((a) => a === "ng" || a === "us") || args.includes(e),
);
const names = args.filter((a) => a !== "ng" && a !== "us");
const clips = CLIPS.filter((c) => !names.length || names.includes(c.name));
if (names.some((n) => !CLIPS.find((c) => c.name === n))) {
  throw new Error(
    `Unknown clip. The clips are: ${CLIPS.map((c) => c.name).join(", ")}`,
  );
}

// Each school starts once from its snapshot and records its clips in order,
// so a clip can rely on what an earlier one in the same school did.
for (const edition of editions) {
  const schoolOf = (c: Clip) => c.school?.(edition) ?? people[edition].school;
  for (const school of [...new Set(clips.map(schoolOf))]) {
    restoreSnapshot(undefined, school);
    const server = await startDemoServer(school);
    try {
      for (const clip of clips.filter((c) => schoolOf(c) === school)) {
        for (const device of clip.devices) {
          const label = `${edition}/${clip.name}-${device}`;
          console.log(`· ${label}`);
          const parts = clip.parts(edition, device);
          const steps: Step[] = parts.map((p, i) => ({
            line: `${clip.name} part ${i + 1}`,
            actions: p.actions,
          }));
          const work = path.join(WORK, edition, `${clip.name}-${device}`);
          const { videoPath, timeline } = await record(
            {
              slug: clip.name,
              title: clip.name,
              signInAs: clip.signInAs(edition),
              start: clip.start(device),
              steps,
              ...(device === "phone"
                ? { device: "phone" as const }
                : { viewport: DESKTOP }),
            },
            server.url,
            work,
          );
          const dir = path.join(OUT, edition);
          fs.mkdirSync(dir, { recursive: true });
          const out = path.join(dir, `${clip.name}-${device}.mp4`);
          encode(
            videoPath,
            parts,
            timeline.steps,
            out,
            device === "phone" ? 780 : 1920,
          );
          const kb = Math.round(fs.statSync(out).size / 1024);
          console.log(`  ${path.relative(ROOT, out)} (${kb} KB)`);
        }
      }
    } finally {
      await server.stop();
    }
  }
}
