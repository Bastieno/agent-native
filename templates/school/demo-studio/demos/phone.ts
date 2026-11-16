import path from "node:path";
import { readScript } from "../script.js";
import type { Action, Demo, Note, RecordedScene, Step } from "../types.js";

/** The short phone video. Spoken lines are the paragraphs of scripts/phone.md, in order. */
const L = readScript(
  path.join(import.meta.dirname, "..", "scripts", "phone.md"),
);

const composer = ".tiptap >> nth=-1";
const running =
  '.tiptap p.is-editor-empty[data-placeholder="Send a follow-up..."]';
const idle = '.tiptap p.is-editor-empty[data-placeholder="Message agent..."]';
const hold = (ms: number): Action => ({ do: "hold", ms });
const openChat: Action = {
  do: "click",
  selector: 'role=button[name="Toggle agent"]',
};
const ask = (text: string): Action[] => [
  { do: "type", selector: composer, text, delayMs: 45 },
  { do: "press", key: "Enter" },
  { do: "waitFor", selector: running, timeoutMs: 20_000 },
];
const answered: Action = { do: "waitFor", selector: idle, timeoutMs: 300_000 };
const s = (line: number, actions: Action[], cut = false): Step => ({
  line: L[line],
  actions,
  ...(cut ? { cut: true } : {}),
});

const principal: RecordedScene = {
  school: "crestfield-term",
  signInAs: "principal@crestfield.test",
  start: [
    { do: "goto", path: "/admin" },
    { do: "waitFor", selector: "text=Staff Members" },
  ],
  steps: [
    s(0, [
      hold(800),
      openChat,
      hold(600),
      ...ask("What needs my attention this week?"),
    ]),
    s(1, [answered, hold(3500)], true),
    s(
      2,
      [
        { do: "goto", path: "/admin/timetable" },
        { do: "waitFor", selector: 'role=button[name="Generate"]' },
        { do: "click", selector: "text=/^Wed$/" },
        hold(1800),
        { do: "click", selector: "text=/^Fri$/" },
        hold(2200),
      ],
      true,
    ),
  ],
};

const teacher: RecordedScene = {
  school: "crestfield-term",
  signInAs: "emmanuel.okafor@crestfield.test",
  start: [
    { do: "goto", path: "/teacher" },
    { do: "waitFor", selector: "text=Needs your attention" },
  ],
  steps: [
    s(3, [
      hold(3500),
      openChat,
      hold(500),
      ...ask("Mark the handed-in Week 10 quiz for JSS2A Mathematics."),
    ]),
    s(4, [answered, hold(4000)], true),
    s(5, [hold(3500)]),
    s(6, [hold(2000)]),
  ],
};

/**
 * Marks that direct the eye, by the line they go with. Areas are the phone's
 * own CSS pixels (390x844), read off the recording.
 */
const NOTES: Record<number, Note[]> = {
  // The answer: the one thing that needs attention.
  1: [
    {
      rect: { x: 76, y: 366, w: 284, h: 68 },
      kind: "highlight",
      atMs: 900,
    },
  ],
  // The teacher's list: the quiz with papers waiting (the list is on screen for the first ~4 seconds).
  3: [
    {
      rect: { x: 24, y: 660, w: 342, h: 58 },
      kind: "box",
      atMs: 2200,
      forMs: 2000,
    },
  ],
  // The marking answer: the marks, then who has not handed in.
  4: [
    {
      rect: { x: 74, y: 138, w: 286, h: 182 },
      kind: "box",
      atMs: 600,
      forMs: 2600,
    },
    {
      rect: { x: 74, y: 378, w: 288, h: 132 },
      kind: "highlight",
      atMs: 3500,
    },
  ],
  // The assistant waits to be told before it publishes.
  5: [{ rect: { x: 74, y: 594, w: 288, h: 62 }, kind: "box", atMs: 300 }],
};
for (const sc of [principal, teacher]) {
  for (const st of sc.steps) {
    const n = NOTES[L.indexOf(st.line)];
    if (n) st.notes = n;
  }
}

export const phone: Demo = {
  slug: "phone",
  title: "Ellai, on your phone",
  device: "phone",
  voice: "bm_george",
  scenes: [principal, teacher],
};
