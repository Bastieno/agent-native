import type { Demo } from "../types.js";

const proposal = '[data-testid="proposal-bar"]';

export const timetable: Demo = {
  slug: "timetable",
  title: "A timetable with zero clashes",
  signInAs: "principal@crestfield.test",
  voice: "bf_emma",
  start: [
    { do: "goto", path: "/admin/timetable" },
    { do: "waitFor", selector: 'role=button[name="Generate"]' },
    { do: "move", x: 900, y: 1040 },
  ],
  steps: [
    {
      line: "Building a school timetable usually eats a whole week of someone's holiday.",
      actions: [
        { do: "hold", ms: 600 },
        { do: "move", x: 760, y: 420 },
        { do: "hold", ms: 1200 },
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
        // Off the grid, so no lesson's tooltip covers the closing shot.
        { do: "move", x: 900, y: 1040 },
        { do: "hold", ms: 1500 },
      ],
    },
    {
      line: "That's Ellai. Your school's timetable, done before your tea gets cold.",
      actions: [{ do: "hold", ms: 2000 }],
    },
  ],
};
