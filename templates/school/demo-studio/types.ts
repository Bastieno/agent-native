import type { SchoolId } from "./schools.js";

/** One thing the recorder does on screen. Selectors are Playwright selectors. */
export type Action =
  | { do: "goto"; path: string }
  | { do: "click"; selector: string }
  | { do: "type"; selector: string; text: string; delayMs?: number }
  | {
      do: "waitFor";
      selector: string;
      timeoutMs?: number;
      gone?: boolean;
      /** Wait for the Nth match (1-based) instead of the first. */
      nth?: number;
    }
  /** Press a key, e.g. "Enter". */
  | { do: "press"; key: string }
  | { do: "hold"; ms: number }
  /** Move the pointer without clicking (e.g. off the content before the last shot). */
  | { do: "move"; x: number; y: number };

/** A voiceover line and what happens on screen while it is spoken. */
export interface Step {
  line: string;
  actions: Action[];
  /** Compress this step's footage to the length of its line (skip a slow wait). */
  cut?: boolean;
}

export interface DemoBase {
  slug: string;
  title: string;
  /** Kokoro voice id; British voices only (bf_ / bm_). Used when there is no recording of your own voice. */
  voice?: string;
}

/** Recorded in one school, one person signed in. */
export interface RecordedScene {
  /** Shown on screen as a title, by default when the scene begins. */
  title?: string;
  /** The step (0-based, within this scene) the title appears at. */
  titleStep?: number;
  school: SchoolId;
  /** Account to sign in as. */
  signInAs: string;
  /** Done before the first line and left out of the edit: page loads, setup. */
  start?: Action[];
  steps: Step[];
}
/** A screen recording the user made themselves, spoken over by one line. */
export interface ClipScene {
  /** Shown on screen as a title when the scene begins. */
  title?: string;
  /** Path to the video, absolute or relative to demo-studio/. */
  clip: string;
  step: Step;
}
export type Scene = RecordedScene | ClipScene;

/** One school, one person: `signInAs`, `start` and `steps` at the top level. */
export interface SingleDemo extends DemoBase {
  signInAs: string;
  start?: Action[];
  steps: Step[];
  scenes?: undefined;
}
/** Several scenes, in different schools and with different people. */
export interface SceneDemo extends DemoBase {
  scenes: Scene[];
}
export type Demo = SingleDemo | SceneDemo;

/** What the recorder needs for one scene. */
export interface RecordInput {
  slug: string;
  title: string;
  signInAs: string;
  start?: Action[];
  steps: Step[];
}

/** What the recorder saw: when each step ran and where it clicked, in video time. */
export interface StepTiming {
  index: number;
  startMs: number;
  endMs: number;
  clicks: { atMs: number; x: number; y: number }[];
  /** How much of the step's end was only holding still (known from the demo's own hold actions). */
  tailHoldMs?: number;
}
export interface Timeline {
  width: 1920;
  height: 1080;
  videoOffsetMs: number;
  /** Video time of the calibration flash. */
  flashAtMs: number;
  steps: StepTiming[];
}

/** One spoken line on disk. */
export interface VoiceLine {
  index: number;
  file: string;
  durationMs: number;
}
