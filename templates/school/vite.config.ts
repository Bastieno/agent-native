import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "@agent-native/core/vite";
import { mergeConfig } from "vite";

export default mergeConfig(
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
    environments: {
      ssr: {
        build: {
          rollupOptions: {
            input: "./ssr-entry.ts",
          },
        },
      },
    },
  },
);
