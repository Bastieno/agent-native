import { useEffect, useRef } from "react";
import { useLocation } from "react-router";
import { toast } from "sonner";
import { agentNativePath } from "@agent-native/core/client";

const CHECK_EVERY_MS = 60_000;
const TOAST_ID = "new-version";

/**
 * Where a refresh would cost someone their work: a learner partway through a
 * paper. The prompt waits until they leave it.
 */
const mid = (pathname: string) =>
  /^\/student\/assessments\/[^/]+/.test(pathname);

/**
 * Tells someone with the app open that a newer version is live. A tab's own
 * build is the one its browser loaded (or, where that is unknown, the first
 * answer from the server); a different one later means a deploy happened since. It only offers: reloading on its own could throw
 * away a half-written lesson note.
 */
export function useNewVersion() {
  const { pathname } = useLocation();
  const loaded = useRef<string | null>(null);
  const stale = useRef(false);
  const path = useRef(pathname);
  path.current = pathname;

  function show() {
    if (!stale.current || mid(path.current)) return;
    toast("A new version of Ellai is ready", {
      id: TOAST_ID,
      duration: Infinity,
      action: { label: "Refresh", onClick: () => window.location.reload() },
    });
  }

  useEffect(() => {
    let stopped = false;
    // The build this tab actually loaded, when the browser can say: a tab left
    // open across a deploy then learns on its first check that it is behind,
    // instead of taking the new build's id as its own. Only for a production
    // build, whose manifest version is the one the server reports.
    const own: string | undefined = import.meta.env.PROD
      ? (window as any).__reactRouterManifest?.version
      : undefined;
    if (own) loaded.current = own;
    async function check() {
      try {
        const res = await fetch(agentNativePath("/api/school/version"), {
          cache: "no-store",
        });
        if (!res.ok) return;
        const { id } = (await res.json()) as { id?: string };
        if (!id || stopped) return;
        if (loaded.current === null) loaded.current = id;
        else if (id !== loaded.current) stale.current = true;
        show();
      } catch {
        // Offline or mid-deploy: try again at the next check.
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

  // Leaving a paper is when a waiting prompt can finally show.
  useEffect(() => {
    show();
  }, [pathname]);
}
