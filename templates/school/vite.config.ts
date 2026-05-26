import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "@agent-native/core/vite";
import { mergeConfig } from "vite";

export default mergeConfig(
  defineConfig({
    plugins: [reactRouter()],
    ssrStubs: ["shiki"],
  }),
  {
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
