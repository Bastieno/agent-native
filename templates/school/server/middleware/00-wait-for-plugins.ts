/**
 * Every request waits until the startup plugins have registered their routes.
 * See server/lib/plugin-readiness.ts. Named to run before the other
 * middleware.
 *
 * A request that had to wait is sent through the app again afterwards. The
 * handlers it was going to meet were fixed when it arrived, so the routes
 * registered while it waited are not among them, and without this it would
 * still end in a 404.
 */
import { defineEventHandler } from "h3";
import { arePluginsReady, whenPluginsReady } from "../lib/plugin-readiness.js";

export default defineEventHandler(async (event) => {
  if (arePluginsReady()) return;
  await whenPluginsReady();
  // `event.app` is the h3 app that is serving the request.
  const app = (event as any).app as
    | { fetch: (req: Request) => Promise<Response> }
    | undefined;
  if (app) return app.fetch(event.req);
});
