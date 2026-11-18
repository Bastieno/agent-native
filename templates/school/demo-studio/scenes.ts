import path from "node:path";
import type { Mark } from "./plan.js";
import type { ClipScene, Demo, RecordedScene, Scene, Step } from "./types.js";

/** Every demo as a list of scenes; a one-school demo is a single Crestfield scene. */
export function scenesOf(demo: Demo): Scene[] {
  if (demo.scenes) return demo.scenes;
  return [
    {
      school: "crestfield",
      signInAs: demo.signInAs,
      start: demo.start,
      steps: demo.steps,
    },
  ];
}

export const isClip = (s: Scene): s is ClipScene => "clip" in s;
export const isRecorded = (s: Scene): s is RecordedScene => !isClip(s);

/** The steps of all scenes, in spoken order. */
export function stepsOf(scenes: Scene[]): Step[] {
  return scenes.flatMap((s) => (isClip(s) ? [s.step] : s.steps));
}

export const clipPath = (s: ClipScene) =>
  path.resolve(import.meta.dirname, s.clip);

/** Where each titled scene begins in the edit, given the planned segments (one per step, in order). */
export function sceneMarks(
  scenes: Scene[],
  segments: { fromFrame: number }[],
): Mark[] {
  const marks: Mark[] = [];
  let step = 0;
  for (const sc of scenes) {
    if (sc.title) {
      marks.push({
        fromFrame:
          segments[step + (isClip(sc) ? 0 : (sc.titleStep ?? 0))].fromFrame,
        title: sc.title,
        number: marks.length + 1,
      });
    }
    step += isClip(sc) ? 1 : sc.steps.length;
  }
  return marks;
}

/** Where each scene after the first begins in the edit: the frames the picture slides over. */
export function sceneStarts(
  scenes: Scene[],
  segments: { fromFrame: number }[],
): number[] {
  const out: number[] = [];
  let step = 0;
  scenes.forEach((sc, i) => {
    if (i > 0) out.push(segments[step].fromFrame);
    step += isClip(sc) ? 1 : sc.steps.length;
  });
  return out;
}
