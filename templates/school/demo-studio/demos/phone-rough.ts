import type { Action, Demo, Step } from "../types.js";

/** A short phone-view sample, to see how the phone frame looks. No assistant runs in it. */
const hold = (ms: number): Action => ({ do: "hold", ms });
const s = (line: string, actions: Action[], cut = false): Step => ({
  line,
  actions,
  ...(cut ? { cut: true } : {}),
});

export const phoneRough: Demo = {
  slug: "phone-rough",
  title: "Ellai, on your phone",
  device: "phone",
  voice: "bm_george",
  scenes: [
    {
      school: "crestfield-term",
      signInAs: "principal@crestfield.test",
      start: [
        { do: "goto", path: "/admin" },
        { do: "waitFor", selector: "text=Staff Members" },
      ],
      steps: [
        s("What needs your attention at school this week?", [hold(2500)]),
        s(
          "The timetable is on the phone too.",
          [
            { do: "click", selector: 'role=button[name="Open navigation"]' },
            hold(900),
            { do: "click", selector: 'role=link[name="Timetable"]' },
            { do: "waitFor", selector: 'role=button[name="Generate"]' },
            { do: "press", key: "Escape" },
            hold(1500),
          ],
          true,
        ),
        s("Tap a day, and see its lessons.", [
          { do: "click", selector: "text=/^Wed$/" },
          hold(1800),
          { do: "click", selector: "text=/^Fri$/" },
          hold(1800),
        ]),
        s("And the assistant is one tap away.", [
          { do: "click", selector: 'role=button[name="Toggle agent"]' },
          hold(3000),
        ]),
        s("That's Ellai.", [hold(2000)]),
      ],
    },
  ],
};
