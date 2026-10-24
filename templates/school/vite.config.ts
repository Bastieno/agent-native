import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "@agent-native/core/vite";
import { mergeConfig } from "vite";

// In dev, Nitro's own renderer needs a fetch handler of its own: `ssr-entry.ts`
// answers every request that is not a page with a plain 404, which is what an
// agent-only action's missing HTTP route has to be. A production build must not
// have it: there it replaces React Router's server build with that dev entry,
// and every page 404s. Pages are rendered by `server/routes/[...page].get.ts`.
export default ({ command }: { command: string }) =>
  mergeConfig(
    defineConfig({
      plugins: [reactRouter()],
      ssrStubs: ["shiki"],
    }),
    {
      server: {
        // Loopback only. The dev agent surface (/_agent-native/mcp) answers
        // unauthenticated probes with the dev tool set, which includes shell and
        // filesystem tools — binding to 0.0.0.0 would hand anyone on the same
        // Wi-Fi a shell on the developer's machine. Override deliberately with
        // `--host` when you need to test from a phone or tablet on the LAN.
        host: "127.0.0.1",
      },
      ...(command === "serve"
        ? {
            environments: {
              ssr: { build: { rollupOptions: { input: "./ssr-entry.ts" } } },
            },
          }
        : {}),
    },
  );
