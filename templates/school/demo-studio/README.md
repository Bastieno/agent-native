# Demo studio

Turns a short demo file into finished Ellai demo videos: a 16:9 MP4 for YouTube
and a 9:16 MP4 for Shorts, TikTok and Reels. Free to run, no API keys.

Playwright records Crestfield (a private copy on port 8134, never the pilot),
Kokoro speaks the lines in a British voice, and Remotion adds zooms, captions
and the intro and outro cards.

## First time

```bash
pnpm install
pnpm exec playwright install chromium
pnpm demo:snapshot   # builds Crestfield up to the moment before its timetable (~1 min)
```

## Make a video

```bash
pnpm demo timetable
```

Output: `demo-studio/out/timetable/timetable-16x9.mp4` and `-9x16.mp4`.
Every take starts from the same snapshot, so re-running gives the same video.

## Write a new demo

Add `demos/<slug>.ts` and list it in `demos/index.ts`. A demo has:

- `signInAs`: a Crestfield account (e.g. `principal@crestfield.test`)
- `start`: setup actions done before the first line (page loads), left out of the edit
- `steps`: each one is a spoken `line` plus the `actions` shown while it's said
  (`goto`, `click`, `type`, `waitFor`, `hold`, `move`). Mark `cut: true` to skip a slow wait.
- `voice`: a British Kokoro voice (`bf_emma` default; `bm_george`, `bm_fable` also fine)

If a selector stops matching, the take fails naming the step and saves
`work/<slug>/fail-<n>.png`.

`pnpm demo:check` runs every check.
