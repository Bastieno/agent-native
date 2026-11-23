import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { appApiPath } from "@agent-native/core/client";

const CHECK_EVERY_MS = 60_000;
const TOAST_ID = "new-version";

/**
 * Tells someone with Books open that a newer version is live, with a Refresh
 * button. It only offers: reloading on its own could lose an expense being
 * edited. A deploy shows as screens' code different from the one this tab
 * loaded, or a build stamp different from the server's first answer.
 */
export function useNewVersion() {
  const loaded = useRef<string | null>(null);
  // The build the server first reported: a later, different one is a deploy,
  // even one that changed only the server.
  const firstBuild = useRef<string | null>(null);

  useEffect(() => {
    let stopped = false;
    // The build this tab loaded, in production: a tab left open across a
    // deploy learns on its first check that it is behind.
    const own: string | undefined = import.meta.env.PROD
      ? (window as any).__reactRouterManifest?.version
      : undefined;
    if (own) loaded.current = own;

    async function check() {
      try {
        const res = await fetch(appApiPath("/api/books/version"), {
          cache: "no-store",
        });
        if (!res.ok) return;
        const { id, build } = (await res.json()) as {
          id?: string;
          build?: string;
        };
        if (!id || stopped) return;
        if (loaded.current === null) loaded.current = id;
        if (build && firstBuild.current === null) firstBuild.current = build;
        const newer =
          id !== loaded.current || (!!build && build !== firstBuild.current);
        if (newer)
          toast("A new version of Books is ready", {
            id: TOAST_ID,
            description: "Refresh to get the latest changes.",
            duration: Infinity,
            action: {
              label: "Refresh",
              onClick: () => window.location.reload(),
            },
          });
      } catch {
        // Offline or mid-deploy: the next check tries again.
      }
    }
    check();
    const timer = window.setInterval(check, CHECK_EVERY_MS);
    const onVisible = () => {
      if (document.visibilityState === "visible") check();
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      stopped = true;
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);
}
