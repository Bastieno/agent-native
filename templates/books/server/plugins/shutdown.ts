/**
 * Exits once the server has stopped. On a stop signal (a deploy restarts the
 * service) the web server closes its connections within 5 seconds, but the
 * error reporter's module-loader thread keeps the process alive, so the
 * service manager waited its full timeout and killed it. This lets the
 * graceful close run, then ends the process itself.
 */
const GRACE_MS = 6000;

let installed = false;

export default (): void => {
  if (installed || typeof process === "undefined" || !process.once) return;
  installed = true;
  for (const signal of ["SIGTERM", "SIGINT"] as const)
    process.once(signal, () => {
      setTimeout(() => process.exit(0), GRACE_MS).unref();
    });
};
