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
    // requests should be handled by Nitro routes or Vite's dev middleware —
    // not by React Router, which would log a verbose 404 for each one.
    const accept = request.headers.get("accept") ?? "";
    if (!accept.includes("text/html")) {
      return new Response(null, { status: 404 });
    }
    return handler(request);
  },
};
