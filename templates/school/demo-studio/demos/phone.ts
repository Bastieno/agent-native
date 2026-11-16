import path from "node:path";
import { readScript } from "../script.js";
import type { Action, Demo, RecordedScene, Step } from "../types.js";

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

export const phone: Demo = {
  slug: "phone",
  title: "Ellai, on your phone",
  device: "phone",
  voice: "bm_george",
  scenes: [principal, teacher],
};
