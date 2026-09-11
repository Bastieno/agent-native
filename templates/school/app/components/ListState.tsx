import type { Icon } from "@tabler/icons-react";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * The placeholder shown where a list will appear.
 *
 * While data is in flight this shows skeleton rows, not an empty state —
 * telling a teacher "No students yet" for two seconds before their class
 * appears reads as data loss and prompts a support ticket.
 */
export function ListState({
  loading,
  icon: Icon,
  title,
  description,
  rows = 3,
}: {
  loading?: boolean;
  icon?: Icon;
  title: string;
  description?: string;
  rows?: number;
}) {
  if (loading) {
    return (
      <div className="space-y-2" aria-busy="true" aria-live="polite">
        {Array.from({ length: rows }).map((_, i) => (
          <Skeleton key={i} className="h-16 w-full rounded-lg" />
        ))}
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
    </div>
  );
}
