import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { restoreSnapshot } from "./db.js";
import { DEMO_PORT } from "./guard.js";
import { portTaken, startDemoServer } from "./server.js";

// Child mode: start the server and wait to be interrupted, like a take in progress.
if (process.argv[2] === "child") {
  await startDemoServer();
  console.log("ready");
  await new Promise(() => {});
}

restoreSnapshot();
const child = spawn("npx", ["tsx", import.meta.filename, "child"], {
  stdio: ["ignore", "pipe", "inherit"],
});
await new Promise<void>((resolve, reject) => {
  child.stdout.on("data", (d) => String(d).includes("ready") && resolve());
  child.once("exit", () =>
    reject(new Error("child exited before the server was ready")),
  );
});
assert.ok(await portTaken(DEMO_PORT));

// Ctrl+C on the take: the demo server must go with it.
child.kill("SIGINT");
const deadline = Date.now() + 20_000;
while ((await portTaken(DEMO_PORT)) && Date.now() < deadline)
  await new Promise((r) => setTimeout(r, 250));
const leftOver = await portTaken(DEMO_PORT);
if (leftOver) spawn("sh", ["-c", `lsof -ti tcp:${DEMO_PORT} | xargs kill -9`]);
assert.ok(!leftOver, "the demo server outlived Ctrl+C");
console.log("server: ok");
process.exit(0);
