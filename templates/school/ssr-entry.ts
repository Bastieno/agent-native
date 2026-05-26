/**
 * SSR entry point for Nitro.
 * Wraps React Router's request handler so Nitro can use it as a service.
 */
import { createRequestHandler } from "react-router";

const handler = createRequestHandler(
  () => import("virtual:react-router/server-build"),
);

// Paths served by Vite's own middleware — skip React Router to avoid
// verbose 404 logs for source maps and pre-bundled deps in dev mode.
const VITE_INTERNAL = /^\/node_modules\/|\.map$/;

export default {
  async fetch(request: Request) {
    const { pathname } = new URL(request.url);
    if (VITE_INTERNAL.test(pathname)) {
      return new Response(null, { status: 404 });
    }
    return handler(request);
  },
};
