import path from "node:path";
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
