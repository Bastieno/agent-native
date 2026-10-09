---
name: react-router-ssr-nitro
description: >-
  Fix for "No fetch handler exported from virtual:react-router/server-build"
  (NitroViteError) when using React Router v7 with Nitro SSR in a new template.
  Use when setting up a new template with React Router, or debugging the SSR
  boot error.
---

# React Router v7 + Nitro SSR Setup

## The Problem

When you add `reactRouter()` to a new template's `vite.config.ts`, the app
throws this error at every page request and never renders:

```
NitroViteError: No fetch handler exported from virtual:react-router/server-build
```

### Why it happens

Nitro and React Router both hook into Vite's `configEnvironment("ssr")` to
wire the SSR service entry. The conflict plays out in two hooks:

1. **`config()` hook** — React Router's Vite plugin runs first and sets
   `environments.ssr.build.rollupOptions.input = "virtual:react-router/server-build"`.

2. **`configEnvironment("ssr")` hook** — Nitro fires after all configs have
   merged. It reads `rollupOptions.input` and, if it finds a string, uses it
   as the SSR entry. It therefore ends up using React Router's **virtual
   module** (`virtual:react-router/server-build`) as the Nitro SSR service.

The virtual module exports React Router internals — not a `{ fetch(req) }`
handler. Nitro calls `.fetch()` on it at dev time, finds nothing, and throws
the error for every incoming request.

---

## The Fix (two files)

### 1. `ssr-entry.ts` — a real fetch handler

Create this file at the template root. It wraps React Router's request handler
so it exports a `default.fetch` that Nitro can call.

```ts
// templates/<your-template>/ssr-entry.ts

/**
 * SSR entry point for Nitro.
 * Wraps React Router's request handler so Nitro can use it as a service.
 */
import { createRequestHandler } from "react-router";

const handler = createRequestHandler(
  () => import("virtual:react-router/server-build"),
);

export default {
  async fetch(request: Request) {
    // Only hand HTML document requests to React Router.
    // API calls, source maps, Chrome DevTools probes, and other non-page
    // requests are handled by Nitro routes or Vite dev middleware.
    // Without this guard they reach React Router and produce noisy 404 logs.
    const accept = request.headers.get("accept") ?? "";
    if (!accept.includes("text/html")) {
      return new Response(null, { status: 404 });
    }
    return handler(request);
  },
};
```

### 2. `vite.config.ts` — pre-empt the virtual module path

Use `mergeConfig` to set `environments.ssr.build.rollupOptions.input` **before**
the plugins run. This causes Nitro's `configEnvironment("ssr")` hook to pick up
`./ssr-entry.ts` instead of the virtual module.

```ts
// templates/<your-template>/vite.config.ts
import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "@agent-native/core/vite";
import { mergeConfig } from "vite";

export default mergeConfig(
  defineConfig({
    plugins: [reactRouter()],
    ssrStubs: ["shiki"],   // add other stub deps as needed
  }),
  {
    environments: {
      ssr: {
        build: {
          rollupOptions: {
            input: "./ssr-entry.ts",   // ← this is the key line
          },
        },
      },
    },
  },
);
```

> **Why `mergeConfig` and not a direct object?**
> `defineConfig(...)` returns a resolved Vite config object. Spreading it
> inside another object literal loses the plugin array. `mergeConfig` deep-merges
> both configs correctly, including plugins and environments.

### 3. `tsconfig.json` — include the new entry file

Add `"ssr-entry.ts"` to the `include` array so TypeScript resolves the
`virtual:react-router/server-build` type declaration from
`.react-router/types/+server-build.d.ts`:

```json
{
  "include": [
    "app/**/*",
    "server/**/*",
    "shared/**/*",
    "actions/**/*",
    "vite.config.ts",
    "react-router.config.ts",
    "ssr-entry.ts",              // ← add this
    ".react-router/types/**/*"
  ]
}
```

### 4. `app/vite-env.d.ts` (if missing)

If the template was scaffolded without this file, create it:

```ts
/// <reference types="vite/client" />
declare module "react-dom/server.browser" {
  export * from "react-dom/server";
  export { default } from "react-dom/server";
}
```

---

## How to verify the fix

After applying the changes, restart the dev server:

```bash
cd templates/<your-template> && pnpm dev
```

You should see Vite start cleanly. Navigate to `http://localhost:8080` — the
React Router app should render. The browser console should have no
`NitroViteError` or source-map 404 noise (the `Accept: text/html` guard in
`ssr-entry.ts` silences those).

---

## Why the `Accept: text/html` guard matters

Without it, every browser-side request that reaches the SSR handler gets
logged as a verbose React Router 404:

- `.js.map` source-map fetches from browser devtools
- `/.well-known/appspecific/com.chrome.devtools.json` Chrome DevTools probes
- `/api/*` calls that Nitro API routes haven't handled yet

These all produce `text/html` responses from React Router (a 404 page), which
confuses the browser and fills the console with red noise. The guard returns a
plain `404 null` response for anything that isn't a page navigation, letting
Nitro/Vite handle the rest of the pipeline.

---

## Checklist for new templates using React Router

- [ ] `ssr-entry.ts` exists at template root with `default.fetch`
- [ ] `vite.config.ts` uses `mergeConfig` and sets `environments.ssr.build.rollupOptions.input = "./ssr-entry.ts"`
- [ ] `tsconfig.json` includes `"ssr-entry.ts"` and `".react-router/types/**/*"`
- [ ] `app/vite-env.d.ts` exists with `/// <reference types="vite/client" />`
- [ ] Dev server starts without `NitroViteError`
- [ ] Browser console shows no source-map or DevTools-probe 404s
