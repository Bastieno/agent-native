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

## Use your own voice

1. Write the script in `scripts/<name>.md` (see `scripts/grant.md`): spoken paragraphs, with
   `[brackets]` for what is on screen.
2. Make one audio file of the whole script in ElevenLabs (or record it yourself).
3. Save it as `demo-studio/voice/<slug>.mp3` (or `.wav`, `.m4a`) and run `pnpm demo <slug>`.

The audio is transcribed on your Mac (Whisper, free, no key). Each script line is found in it; pauses
over 0.7 s are shortened, a line said twice keeps its last take, and filler between lines is cut. If a
line can't be found, the run stops and says which line and what the audio says. Without an audio file
the built-in British voice is used.

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
