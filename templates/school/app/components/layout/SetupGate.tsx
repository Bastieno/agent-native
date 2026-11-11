import { useEffect } from "react";
import { sendToAgentChat } from "@agent-native/core/client";
import { IconCheck, IconCircle, IconMessageDots } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { useNavigationState } from "@/hooks/use-navigation-state";
import {
  NEED_ORDER,
  NEEDS,
  areaBlurb,
  areaLabel,
  type Need,
  type ReadinessFacts,
} from "@shared/readiness";

/**
 * Stands in for a page whose first steps are not done. It names what is
 * missing, in order, and does the next step; a teacher, who cannot, is told
 * to wait for the school's head.
 */
export function SetupGate({
  path,
  missing,
  facts,
  canSetUp,
}: {
  path: string;
  missing: Need[];
  facts: ReadinessFacts;
  canSetUp: boolean;
}) {
  const { sync } = useNavigationState();
  const next = missing[0];
  const missingKey = missing.join(",");
  // The assistant is told, so it explains instead of describing an empty page.
  useEffect(() => {
    sync({
      role: canSetUp ? "admin" : "teacher",
      view: canSetUp ? "overview" : "dashboard",
      locked: areaLabel(path),
      setupMissing: missingKey.split(","),
    } as any);
  }, [sync, canSetUp, path, missingKey]);

  return (
    <div className="flex h-full items-start justify-center overflow-auto p-6">
      <div className="mt-8 w-full max-w-md rounded-lg border bg-card p-6">
        <h1 className="text-base font-semibold">
          {areaLabel(path) ?? "This page"} opens after setup
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {areaBlurb(path) ? `${areaBlurb(path)} ` : ""}
          {canSetUp
            ? "It needs a few things in place first, so it has something to work with."
            : "Your school has not finished setting up yet. Ask your school's head, and this page will open on its own."}
        </p>
        {canSetUp ? (
          <>
            <ul className="mt-4 space-y-2">
              {NEED_ORDER.filter((n) => missing.includes(n) || facts[n]).map(
                (n) => (
                  <li key={n} className="flex items-center gap-2 text-sm">
                    {facts[n] ? (
                      <IconCheck size={16} className="text-primary" />
                    ) : (
                      <IconCircle size={16} className="text-muted-foreground" />
                    )}
                    <span className={facts[n] ? "text-muted-foreground" : ""}>
                      {NEEDS[n].label}
                    </span>
                  </li>
                ),
              )}
            </ul>
            {next ? (
              <div className="mt-5 flex flex-wrap gap-2">
                <Button
                  onClick={() =>
                    sendToAgentChat({
                      message: NEEDS[next].ask,
                      // into the box, not sent: the person reads it, edits it and presses send
                      submit: false,
                      openSidebar: true,
                    })
                  }
                >
                  <IconMessageDots size={16} className="mr-1.5" />
                  Do this with the assistant
                </Button>
              </div>
            ) : null}
          </>
        ) : null}
      </div>
    </div>
  );
}
