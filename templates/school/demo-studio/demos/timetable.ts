import type { Demo } from "../types.js";

const proposal = '[data-testid="proposal-bar"]';

export const timetable: Demo = {
  slug: "timetable",
  title: "A timetable with zero clashes",
  signInAs: "principal@crestfield.test",
  voice: "bm_george",
  steps: [
    {
      line: "Building a school timetable usually eats a whole week of someone's holiday.",
      actions: [
        { do: "goto", path: "/admin/timetable" },
        { do: "waitFor", selector: 'role=button[name="Generate"]' },
        { do: "hold", ms: 1500 },
      ],
    },
    {
      line: "In Ellai, you press one button.",
      cut: true,
      actions: [
        { do: "click", selector: 'role=button[name="Generate"]' },
        { do: "waitFor", selector: proposal, timeoutMs: 120_000 },
      ],
    },
    {
      line: "Every class gets its lessons, every teacher is in one room at a time, and there isn't a single clash.",
      actions: [{ do: "hold", ms: 4000 }],
    },
    {
      line: "Happy with it? Accept, and the whole school has its week.",
      actions: [
        { do: "click", selector: `${proposal} >> role=button[name="Accept"]` },
        {
          do: "click",
          selector: 'role=alertdialog >> role=button[name="Accept"]',
        },
        { do: "waitFor", selector: proposal, timeoutMs: 30_000, gone: true },
        { do: "hold", ms: 1500 },
      ],
    },
    {
      line: "That's Ellai. Your school's timetable, done before your tea gets cold.",
      actions: [{ do: "hold", ms: 2000 }],
    },
  ],
};
