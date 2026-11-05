import type { ReactNode } from "react";
import type { Icon } from "@tabler/icons-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useFailedLoads } from "@/lib/failed-loads";

/**
 * The placeholder shown where a list will appear.
 *
 * While data is in flight this shows skeleton rows, not an empty state —
 * telling a teacher "No students yet" for two seconds before their class
 * appears reads as data loss and prompts a support ticket. The same goes for a
 * load that failed: an empty list and a list that could not be fetched look
 * alike, so when something on screen has failed to load this says so, and
 * offers another try, instead of claiming there is nothing.
 */
export function ListState({
  loading,
  icon: Icon,
  title,
  description,
  rows = 3,
  action,
}: {
  loading?: boolean;
  icon?: Icon;
  title: string;
  description?: string;
  rows?: number;
  /** One next step, such as a retry. */
  action?: ReactNode;
}) {
  const failed = useFailedLoads();
  if (loading) {
    return (
      <div className="space-y-2" aria-busy="true" aria-live="polite">
        {Array.from({ length: rows }).map((_, i) => (
          <Skeleton key={i} className="h-16 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  if (failed.count > 0) {
    return (
      <div className="rounded-lg border border-dashed p-10 text-center">
        <p className="text-sm font-medium">Could not load this</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Nothing has been lost. Check your connection and try again.
        </p>
        <Button
          variant="outline"
          size="sm"
          className="mt-3"
          onClick={() => void failed.retry()}
        >
          Try again
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-dashed p-10 text-center">
      {Icon ? (
        <Icon size={32} className="mx-auto text-muted-foreground mb-3" />
      ) : null}
      <p className="text-sm font-medium">{title}</p>
      {description ? (
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      ) : null}
      {action ? <div className="mt-3">{action}</div> : null}
    </div>
  );
}
