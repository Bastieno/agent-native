# Open items

Things found and deliberately not done, so they are not rediscovered from
scratch. Each says what it is and why it was left.

## Product

- **Extensions has no affordances.** The page lists extensions and nothing
  else: no button to create one, no way to open the agent from there, no
  per-extension menu (open full size, edit, delete), and a created extension
  can only be viewed in a 192px box. Creating one requires asking the agent,
  which the empty state tells you to do without helping you do it. Suggested:
  a "Describe one to the agent" button that prefills the composer without
  sending (`submit: false` works since the core fix), plus an overflow menu
  per extension.
- **No admin gradebook route.** The teacher has `/teacher/gradebook/:classId`;
  an admin following analytics down to a class can reach its lesson notes but
  not its marks.
- **The Overview fetches `get-school-stats` three times per render.** Harmless
  but wasteful, and it triples the wait on a slow connection.

## Wording and layout

- **Missing space where a margin was used instead.** Three instances found and
  fixed this way (`Civic Educationand 8 more`, `place valueWeeks 1`,
  `Wednesday1 without a lesson note`). The pattern is a `ml-1`/`ml-2` span
  beside adjacent text: it looks spaced on screen and runs together when read
  aloud, copied, or extracted. Worth one sweep rather than fixing them as
  they are noticed.

## Testing

- **The simulation does not attach activities to their week.** It creates work
  with a `classId` and no `lessonNoteId`, so lesson pages show only the
  reading page and the attachment path — which `AGENTS.md` tells the agent to
  use — is never exercised. One argument on `create-activity`.
- **The agent-behaviour suite is not written.** Everything the simulation does
  is free and deterministic; testing the agent's own judgement (tutor mode
  refusing to give answers, curriculum quality, confirming before publishing
  to another teacher's class) needs real model calls on the school's key.
  Intended as a small, explicitly triggered suite of eight to ten prompts,
  not part of a normal run.

## Infrastructure

- **The dev server wedges.** Roughly hourly it stops answering while the
  process stays alive. A watchdog captured it twice: thread stacks idle in
  `uv__io_poll`, CPU near zero, and about 550 accumulated established sockets
  both times — connections opened and never closed, most likely the 2-second
  `useDbSync` poll from open tabs and SSE streams.
  `nitro@3.0.260903-beta` rewrites exactly this code path and adds a backstop
  so a stalled reload answers rather than hanging; the repo is pinned to
  `3.0.260415-beta` in `packages/core/package.json`. The upgrade needs a
  changeset and a pass over the other templates, so it was not folded into
  unrelated work.
