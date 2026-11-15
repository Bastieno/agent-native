import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { chromium, type Page } from "playwright";
import { TEST_PASSWORD } from "../test/sim/client.js";
import { assertDemoUrl } from "./guard.js";
import type { Action, RecordInput, StepTiming, Timeline } from "./types.js";

const W = 1920;
const H = 1080;

/**
 * Playwright's video has no mouse pointer, so the page draws one: a dot that
 * follows the mouse and pulses on click. It's part of the footage.
 */
const CURSOR = `
addEventListener("DOMContentLoaded", () => {
  const c = document.createElement("div");
  c.style.cssText = "position:fixed;left:0;top:0;width:22px;height:22px;margin:-11px 0 0 -11px;border-radius:50%;background:rgba(17,17,17,.85);border:3px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,.35);z-index:2147483647;pointer-events:none;transition:transform .15s";
  document.body.appendChild(c);
  addEventListener("mousemove", (e) => { c.style.left = e.clientX + "px"; c.style.top = e.clientY + "px"; }, true);
  addEventListener("mousedown", () => { c.style.transform = "scale(.7)"; }, true);
  addEventListener("mouseup", () => { c.style.transform = ""; }, true);
});`;

async function signInCookies(baseUrl: string, email: string) {
  const res = await fetch(`${baseUrl}/_agent-native/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password: TEST_PASSWORD }),
  });
  if (!res.ok)
    throw new Error(
      `Signing in as ${email} failed: ${res.status} ${await res.text()}`,
    );
  return res.headers
    .getSetCookie()
    .map((c) => c.split(";")[0])
    .filter((c) => !c.endsWith("="))
    .map((c) => {
      const i = c.indexOf("=");
      return { name: c.slice(0, i), value: c.slice(i + 1), url: baseUrl };
    });
}

/** Seconds into the video of the first frame of the red calibration flash. */
function firstRedFrame(video: string): number {
  const out = execFileSync("ffprobe", [
    "-v",
    "error",
    "-f",
    "lavfi",
    "-i",
    `movie=${video},signalstats`,
    "-show_entries",
    "frame=pts_time:frame_tags=lavfi.signalstats.VAVG",
    "-of",
    "csv=p=0",
  ]).toString();
  for (const row of out.trim().split("\n")) {
    const [t, vavg] = row.split(",").map(Number);
    if (vavg > 200) return t;
  }
  throw new Error("Couldn't find the calibration flash in the recording.");
}

async function perform(
  page: Page,
  baseUrl: string,
  a: Action,
  clicks: { atMs: number; x: number; y: number }[],
) {
  switch (a.do) {
    case "goto":
      await page.goto(baseUrl + a.path, { waitUntil: "load" });
      await page
        .waitForLoadState("networkidle", { timeout: 15_000 })
        .catch(() => {});
      return;
    case "hold":
      return page.waitForTimeout(a.ms);
    case "press":
      return page.keyboard.press(a.key);
    case "move":
      return page.mouse.move(a.x, a.y, { steps: 20 });
    case "waitFor":
      return page
        .locator(a.selector)
        .nth((a.nth ?? 1) - 1)
        .waitFor({
          state: a.gone ? "hidden" : "visible",
          timeout: a.timeoutMs ?? 15_000,
        });
    case "click":
    case "type": {
      const el = page.locator(a.selector).first();
      await el.waitFor({ state: "visible", timeout: 15_000 });
      const box = (await el.boundingBox())!;
      const x = box.x + box.width / 2;
      const y = box.y + box.height / 2;
      await page.mouse.move(x, y, { steps: 20 });
      clicks.push({ atMs: Date.now(), x, y });
      await page.mouse.click(x, y);
      if (a.do === "type") await page.keyboard.type(a.text, { delay: 60 });
      return;
    }
  }
}

const describe = (a: Action) =>
  "selector" in a
    ? a.selector
    : "path" in a
      ? a.path
      : "key" in a
        ? a.key
        : a.do;

export async function record(
  demo: RecordInput,
  baseUrl: string,
  workDir: string,
): Promise<{ videoPath: string; timeline: Timeline }> {
  assertDemoUrl(baseUrl);
  fs.mkdirSync(workDir, { recursive: true });
  const cookies = await signInCookies(baseUrl, demo.signInAs);
  const rawDir = fs.mkdtempSync(path.join(os.tmpdir(), "demo-raw-"));
  const browser = await chromium.launch({ slowMo: 300 });
  const context = await browser.newContext({
    viewport: { width: W, height: H },
    deviceScaleFactor: 1,
    recordVideo: { dir: rawDir, size: { width: W, height: H } },
  });
  await context.addCookies(cookies);
  await context.addInitScript(CURSOR);
  const page = await context.newPage();

  // Calibration: a red frame whose clock time we know, so we can find it in the video.
  await page.goto(
    "data:text/html,<body style='margin:0;background:%23f00;height:100vh'></body>",
  );
  // Read the clock in the page once red has painted: Playwright's slow-motion
  // pause after goto would make a reading here ~300 ms late.
  const redAt: number = await page.evaluate(() => {
    const paint = performance.getEntriesByType("paint")[0];
    const nav = performance.getEntriesByType("navigation")[0] as
      | PerformanceNavigationTiming
      | undefined;
    return performance.timeOrigin + (paint?.startTime ?? nav?.responseEnd ?? 0);
  });
  await page.waitForTimeout(600);

  const steps: {
    startMs: number;
    endMs: number;
    clicks: { atMs: number; x: number; y: number }[];
  }[] = [];
  let failure: Error | null = null;
  for (const a of demo.start ?? []) {
    try {
      await perform(page, baseUrl, a, []);
    } catch (e) {
      await page
        .screenshot({ path: path.join(workDir, "fail-start.png") })
        .catch(() => {});
      failure = new Error(
        `Setup failed at ${a.do} ${describe(a)}: ${(e as Error).message.split("\n")[0]}`,
      );
      break;
    }
  }
  for (const [i, step] of failure ? [] : demo.steps.entries()) {
    const clicks: { atMs: number; x: number; y: number }[] = [];
    const startMs = Date.now();
    for (const a of step.actions) {
      try {
        await perform(page, baseUrl, a, clicks);
      } catch (e) {
        await page
          .screenshot({ path: path.join(workDir, `fail-${i}.png`) })
          .catch(() => {});
        failure = new Error(
          `Step ${i} ("${step.line}") failed at ${a.do} ${describe(a)}: ${(e as Error).message.split("\n")[0]}`,
        );
        break;
      }
    }
    if (failure) break;
    steps.push({ startMs, endMs: Date.now(), clicks });
  }
  await page.waitForTimeout(300);
  const video = page.video()!;
  await context.close();
  await browser.close();
  const raw = await video.path();
  if (failure) {
    fs.rmSync(rawDir, { recursive: true, force: true });
    throw failure;
  }

  const videoPath = path.join(workDir, "screen.webm");
  fs.renameSync(raw, videoPath);
  fs.rmSync(rawDir, { recursive: true, force: true });

  // Clock time → video time.
  const flashAtMs = Math.round(firstRedFrame(videoPath) * 1000);
  const shift = flashAtMs - redAt;
  const toVideo = (ms: number) => ms + shift;
  const timeline: Timeline = {
    width: W,
    height: H,
    videoOffsetMs: shift,
    flashAtMs,
    steps: steps.map(
      (s, index): StepTiming => ({
        index,
        startMs: toVideo(s.startMs),
        endMs: toVideo(s.endMs),
        clicks: s.clicks.map((c) => ({ ...c, atMs: toVideo(c.atMs) })),
      }),
    ),
  };
  fs.writeFileSync(
    path.join(workDir, "timeline.json"),
    JSON.stringify(timeline, null, 2),
  );
  return { videoPath, timeline };
}
