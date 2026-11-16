import path from "node:path";
import { readScript } from "../script.js";
import type { Action, Demo, RecordedScene, Step } from "../types.js";

/**
 * The 6-8 minute grant demo. The spoken lines are the paragraphs of
 * scripts/grant.md, in order; each step below says which one it speaks over.
 */
const L = readScript(
  path.join(import.meta.dirname, "..", "scripts", "grant.md"),
);

const composer = ".tiptap >> nth=-1";
// The composer's hint says whether the assistant is working: "Send a follow-up..."
// while it runs, "Message agent..." once its whole answer is in.
const running =
  '.tiptap p.is-editor-empty[data-placeholder="Send a follow-up..."]';
const idle = '.tiptap p.is-editor-empty[data-placeholder="Message agent..."]';
/** Type a question to the assistant, send it, and see it start. */
const ask = (text: string, delayMs = 60): Action[] => [
  { do: "type", selector: composer, text, delayMs },
  { do: "press", key: "Enter" },
  { do: "waitFor", selector: running, timeoutMs: 20_000 },
];
/** Wait until the assistant has finished its whole answer. */
const answered = (_nth?: number, timeoutMs = 300_000): Action => ({
  do: "waitFor",
  selector: idle,
  timeoutMs,
});
const hold = (ms: number): Action => ({ do: "hold", ms });
const park: Action = { do: "move", x: 760, y: 980 };
const s = (line: number, actions: Action[], cut = false): Step => ({
  line: L[line],
  actions,
  ...(cut ? { cut: true } : {}),
});

const lagos = "head@lagos.test";
const principal = "principal@crestfield.test";

/** 0-9: a new school, set up by asking. */
const setup: RecordedScene = {
  school: "empty",
  signInAs: lagos,
  start: [
    { do: "goto", path: "/admin" },
    { do: "waitFor", selector: "text=Set up your school" },
    park,
  ],
  steps: [
    s(0, [hold(2500)]),
    s(1, [hold(2500)]),
    s(2, [hold(2000)]),
    s(3, [{ do: "move", x: 700, y: 300 }, hold(2000)]),
    s(
      4,
      ask(
        "We're a secondary school in Lagos, JSS1 to SS3, three terms, WAEC grading, pass mark 40.",
        40,
      ),
    ),
    s(5, [answered(1), hold(2500)], true),
    s(
      6,
      ask(
        "Call it Lagos Grammar School. The WAEC scale is right. Terms: 14 September to 18 December, 11 January to 2 April, 26 April to 16 July. Monday to Friday, first period at 8:00, 40 minutes each, breaks at 10:00 and 12:30.",
        25,
      ),
    ),
    s(7, [answered(2), hold(3000)], true),
    s(8, [...ask("What is still missing?", 40), answered(3)], true),
    s(9, [
      { do: "goto", path: "/admin/settings" },
      { do: "waitFor", selector: "text=Grading Scale" },
      park,
      hold(3500),
    ]),
  ],
};

/** 10-17: Crestfield as the principal. */
const crestfield: RecordedScene = {
  title: "A school after a term",
  // The first two lines are about the curriculum; the title comes with "a school that has run a whole term".
  titleStep: 2,
  school: "crestfield-term",
  signInAs: principal,
  start: [{ do: "goto", path: "/admin/curriculum/library" }, park],
  steps: [
    s(10, [hold(3500)]),
    s(11, [{ do: "goto", path: "/admin/curriculum/import" }, park, hold(3500)]),
    s(12, [{ do: "goto", path: "/admin" }, park, hold(3000)]),
    s(13, ask("What needs my attention this week?", 50)),
    s(14, [answered(1), hold(4000)], true),
    s(15, [
      { do: "goto", path: "/admin/timetable" },
      { do: "waitFor", selector: 'role=button[name="Generate"]' },
      park,
      hold(3000),
    ]),
    s(16, [
      { do: "click", selector: "role=combobox >> nth=2" },
      { do: "click", selector: 'role=option[name="JSS2A"]' },
      park,
      hold(3500),
    ]),
    s(17, [hold(2500)]),
  ],
};

/** 18-29: a maths teacher, a worksheet, and marking. */
const teacher: RecordedScene = {
  title: "A teacher's week",
  school: "crestfield-term",
  signInAs: "emmanuel.okafor@crestfield.test",
  start: [
    { do: "goto", path: "/teacher" },
    { do: "waitFor", selector: "text=Needs your attention" },
    park,
  ],
  steps: [
    s(18, [hold(5000)]),
    s(19, [
      { do: "click", selector: 'role=link[name="My Week"]' },
      park,
      hold(3500),
    ]),
    s(
      20,
      ask(
        "Make a three-level worksheet on fractions for JSS1A Mathematics.",
        40,
      ),
    ),
    s(21, [answered(1, 300_000), hold(3000)], true),
    s(22, [
      { do: "goto", path: "/teacher" },
      {
        do: "click",
        selector: "text=/Read and share: Week 3: Working with fractions/",
      },
      { do: "waitFor", selector: "text=Share with class" },
      { do: "move", x: 684, y: 168 },
      hold(3500),
    ]),
    s(23, [{ do: "move", x: 1700, y: 760 }, hold(5000)]),
    s(24, [hold(2500)]),
    s(25, [
      { do: "goto", path: "/teacher" },
      { do: "waitFor", selector: "text=Needs your attention" },
      park,
      hold(2500),
    ]),
    s(26, ask("Mark the handed-in Week 10 quiz for JSS2A Mathematics.", 40)),
    s(27, [answered(2, 300_000), hold(4000)], true),
    s(28, [hold(4500)]),
    s(29, [hold(2500)]),
  ],
};

/** 30-31: a learner. */
const learner: RecordedScene = {
  title: "The learner's view",
  school: "crestfield-term",
  signInAs: "ebiere.olaniyan@crestfield.test",
  start: [
    { do: "goto", path: "/student" },
    { do: "waitFor", selector: "text=Welcome back" },
    park,
  ],
  steps: [
    s(30, [hold(6000)]),
    s(31, [
      { do: "click", selector: 'role=link[name="Grades"]' },
      { do: "waitFor", selector: "text=My Grades" },
      park,
      hold(5000),
    ]),
  ],
};

const reportCrestfield: RecordedScene = {
  title: "Report cards",
  school: "crestfield-term",
  signInAs: principal,
  start: [{ do: "goto", path: "/print/report/wV1_-fxkOlipqrK819fVs" }, park],
  steps: [s(32, [hold(9000)])],
};

const reportYellowView: RecordedScene = {
  title: "Same code, another country",
  school: "yellowview",
  signInAs: "principal@yellowview.test",
  start: [{ do: "goto", path: "/print/report/J66TzZxaeWGAMsLtOxhdK" }, park],
  steps: [s(33, [hold(6000)]), s(34, [hold(3500)])],
};

/** 35-37: the learner's assistant says no. */
const safety: RecordedScene = {
  title: "Safe in a school",
  school: "crestfield-term",
  signInAs: "ebiere.olaniyan@crestfield.test",
  start: [
    { do: "goto", path: "/student/grades" },
    { do: "waitFor", selector: "text=My Grades" },
    park,
  ],
  steps: [
    s(
      35,
      ask(
        "What marks did the other learners in my class get on the Week 10 quiz?",
        40,
      ),
    ),
    s(36, [answered(1), hold(3000)], true),
    s(37, [hold(3000)]),
  ],
};

const signOff: RecordedScene = {
  school: "crestfield-term",
  signInAs: principal,
  start: [{ do: "goto", path: "/admin" }, park],
  steps: [s(39, [hold(4000)])],
};

export const grant: Demo = {
  slug: "grant",
  title: "Ellai: a school that runs by asking",
  voice: "bm_george",
  scenes: [
    setup,
    crestfield,
    teacher,
    learner,
    reportCrestfield,
    reportYellowView,
    safety,
    // Your own Claude over MCP, recorded by you (see scripts/grant.md, scene 12).
    { title: "Your own AI", clip: "clips/claude.mp4", step: s(38, []) },
    signOff,
  ],
};
