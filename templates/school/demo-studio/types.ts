/** One thing the recorder does on screen. Selectors are Playwright selectors. */
export type Action =
  | { do: "goto"; path: string }
  | { do: "click"; selector: string }
  | { do: "type"; selector: string; text: string }
  | { do: "waitFor"; selector: string; timeoutMs?: number; gone?: boolean }
  | { do: "hold"; ms: number };

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
  steps: Step[];
}
