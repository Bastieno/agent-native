/**
 * Hold requests until the startup plugins have finished.
 *
 * Nitro starts each plugin and does not wait for it. The framework's plugins
 * do their database checks first and register their routes (sign-in, the
 * session, every action) when those are done, a few seconds on a serverless
 * instance whose database is far away. A request that arrives in that gap
 * finds no route and gets a 404, which the app reads as "signed out" and the
 * person is bounced to a page that does not exist. A host that starts a new
 * instance whenever traffic changes shows this to someone every few minutes.
 *
 * Each plugin is wrapped with `readyBeforeServing`, which records the promise
 * it returns; `server/middleware/00-wait-for-plugins.ts` makes every request
 * wait for them. After the first request it costs nothing.
 */
const pending = new Set<Promise<unknown>>();
let settled = false;

/** How long a request will wait before giving up on a plugin that never answers. */
const MAX_WAIT_MS = 20_000;

export function readyBeforeServing<P extends (...args: any[]) => any>(
  plugin: P,
): P {
  return ((...args: any[]) => {
    // A plugin started again (a dev reload) means there is something to wait for.
    settled = false;
    const result = plugin(...args);
    if (result && typeof result.then === "function") {
      // A failing plugin has already said so itself; waiting must not fail too.
      pending.add(
        Promise.resolve(result).then(
          () => undefined,
          () => undefined,
        ),
      );
    }
    return result;
  }) as P;
}

export function arePluginsReady(): boolean {
  return settled;
}

export async function whenPluginsReady(): Promise<void> {
  if (settled) return;
  let timer: ReturnType<typeof setTimeout> | undefined;
  await Promise.race([
    Promise.all([...pending]),
    new Promise<void>((resolve) => {
      timer = setTimeout(resolve, MAX_WAIT_MS);
    }),
  ]);
  if (timer) clearTimeout(timer);
  settled = true;
}
