import { statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { defineEventHandler, setResponseHeader } from "h3";

/** When this build was made: this file is rewritten by every build. */
let buildStamp: string | null = null;
function stamp(): string {
  if (buildStamp) return buildStamp;
  try {
    buildStamp = String(
      Math.round(statSync(fileURLToPath(import.meta.url)).mtimeMs),
    );
  } catch {
    buildStamp = "dev";
  }
  return buildStamp;
}

/**
 * Which build of Books is live, for open tabs to notice a deploy.
 *
 * `id` is the version React Router stamps on the screens' code (the browser
 * holds it as `window.__reactRouterManifest.version`); `build` changes with
 * every build, server-only ones included. A tab offers a refresh when either
 * differs from what it first saw. Public: it carries only these two ids.
 */
export default defineEventHandler(async (event) => {
  setResponseHeader(event, "Cache-Control", "no-store");
  let version: string | undefined;
  try {
    // @ts-ignore: the virtual module exists only inside a build
    const build: any = await import("virtual:react-router/server-build");
    version = build?.assets?.version;
  } catch {
    // No build to read (development).
  }
  return { id: version ?? "dev", build: stamp() };
});
