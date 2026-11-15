import { SCHOOLS } from "./schools.js";

/** The demo school runs on its own server and database, never the pilot's or the showcase's. */
export const DEMO_PORT = 8134;
export const DEMO_DB = "./data/demo.db";

export function assertDemoUrl(url: string): void {
  const port = Number(new URL(url).port);
  if (port === 8130) {
    throw new Error(
      `${url} is the dev server, whose database holds the pilot. Demos record only on port ${DEMO_PORT}.`,
    );
  }
  const ports = Object.values(SCHOOLS).map((s) => s.port);
  if (!ports.includes(port)) {
    throw new Error(
      `${url} is not a demo server. Demos record only on ports ${ports.join(", ")}.`,
    );
  }
}
