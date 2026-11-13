import { spawn } from "node:child_process";
import net from "node:net";
import path from "node:path";
import { DEMO_DB, DEMO_PORT } from "./guard.js";

const ROOT = path.resolve(import.meta.dirname, "..");

export function portTaken(port: number): Promise<boolean> {
  return new Promise((resolve) => {
    const s = net.connect(port, "127.0.0.1");
    s.once("connect", () => (s.destroy(), resolve(true)));
    s.once("error", () => resolve(false));
  });
}

/** Start the school on the demo port and database, and wait until it answers. */
export async function startDemoServer(): Promise<{
  url: string;
  stop(): Promise<void>;
}> {
  const url = `http://localhost:${DEMO_PORT}`;
  if (await portTaken(DEMO_PORT)) {
    throw new Error(
      `Port ${DEMO_PORT} is already in use. Stop whatever is on it (a previous demo server?) and try again.`,
    );
  }
  const child = spawn(
    "pnpm",
    [
      "exec",
      "agent-native",
      "dev",
      "--port",
      String(DEMO_PORT),
      "--strictPort",
    ],
    {
      cwd: ROOT,
      detached: true,
      stdio: ["ignore", "ignore", "pipe"],
      env: {
        ...process.env,
        AUTO_CREATE_DEFAULT_ORG: "true",
        ALLOW_PLAIN_NOTATION: "true",
        DATABASE_URL: `file:${DEMO_DB}`,
        BETTER_AUTH_URL: url,
      },
    },
  );
  let stderr = "";
  child.stderr?.on("data", (d) => (stderr = (stderr + d).slice(-4000)));
  const exited = new Promise<void>((r) => child.once("exit", () => r()));

  const killGroup = (signal: NodeJS.Signals) => {
    try {
      process.kill(-child.pid!, signal);
    } catch {}
  };
  // The server runs in its own process group, so Ctrl+C in the terminal never
  // reaches it. Take it down with us.
  const onSignal = (signal: NodeJS.Signals) => {
    killGroup("SIGTERM");
    setTimeout(() => {
      killGroup("SIGKILL");
      process.exit(signal === "SIGINT" ? 130 : 143);
    }, 3_000);
  };
  process.once("SIGINT", onSignal);
  process.once("SIGTERM", onSignal);

  let stopped = false;
  const stop = async () => {
    if (stopped) return;
    stopped = true;
    process.off("SIGINT", onSignal);
    process.off("SIGTERM", onSignal);
    killGroup("SIGTERM");
    await Promise.race([exited, new Promise((r) => setTimeout(r, 10_000))]);
    // pnpm leading the group can exit before the server under it; finish them all.
    await new Promise((r) => setTimeout(r, 1_000));
    killGroup("SIGKILL");
  };

  const deadline = Date.now() + 180_000;
  while (Date.now() < deadline) {
    if (child.exitCode !== null || child.signalCode !== null) {
      throw new Error(`The demo server exited on start:\n${stderr}`);
    }
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(15_000) });
      if (res.ok) return { url, stop };
    } catch {}
    await new Promise((r) => setTimeout(r, 1000));
  }
  await stop();
  throw new Error(
    `The demo server did not answer on ${url} within 3 minutes.\n${stderr}`,
  );
}
