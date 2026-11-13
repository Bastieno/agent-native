/** One thing the recorder does on screen. Selectors are Playwright selectors. */
export type Action =
  | { do: "goto"; path: string }
  | { do: "click"; selector: string }
  | { do: "type"; selector: string; text: string }
  | { do: "waitFor"; selector: string; timeoutMs?: number; gone?: boolean }
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

export interface Demo {
  slug: string;
  title: string;
  /** Showcase account to sign in as. */
  signInAs: string;
  /** Kokoro voice id; British voices only (bf_ / bm_). */
  voice?: string;
  /** Done before the first line and left out of the edit: page loads, setup. */
  start?: Action[];
  steps: Step[];
}

/** What the recorder saw: when each step ran and where it clicked, in video time. */
export interface StepTiming {
  index: number;
  startMs: number;
  endMs: number;
  clicks: { atMs: number; x: number; y: number }[];
}
export interface Timeline {
  width: 1920;
  height: 1080;
  videoOffsetMs: number;
  steps: StepTiming[];
}

/** One spoken line on disk. */
export interface VoiceLine {
  index: number;
  file: string;
  durationMs: number;
}
