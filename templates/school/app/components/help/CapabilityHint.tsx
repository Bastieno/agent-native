import type { ReactNode } from "react";
import { IconX } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { useHelp } from "@/hooks/use-help";

/**
 * A single line, shown where a capability would help, until the person has
 * seen it. Pressing the action or the cross both count as seeing it, so it
 * appears once and never again. Nothing shows while the answer is loading.
 */
export function CapabilityHint({
  id,
  action,
  children,
}: {
  id: string;
  /** The button that takes them there; pressing it marks the hint seen. */
  action?: ReactNode;
  children: ReactNode;
}) {
  const { capabilities, seen, markSeen, isLoading } = useHelp();
  if (isLoading || seen.has(id) || !capabilities.some((c) => c.id === id)) {
    return null;
  }
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-dashed bg-muted/30 px-4 py-2.5 text-sm">
      <span className="min-w-0 text-muted-foreground">{children}</span>
      <span className="flex shrink-0 items-center gap-1">
        {action ? (
          <span onClickCapture={() => markSeen([id])}>{action}</span>
        ) : null}
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7"
          aria-label="Dismiss"
          onClick={() => markSeen([id])}
        >
          <IconX size={14} />
        </Button>
      </span>
    </div>
  );
}
