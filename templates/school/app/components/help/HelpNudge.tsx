import { Link } from "react-router";
import { IconX } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { useHelp } from "@/hooks/use-help";

/**
 * One quiet card at the top of a dashboard: the first time, three things worth
 * trying; afterwards, only what has arrived since, and only for people it is
 * for. Dismissing it is remembered per person, so it never comes back for
 * something they have already seen.
 */
export function HelpNudge() {
  const { helpRole, highlights, fresh, tourDone, isLoading, markSeen } =
    useHelp();
  if (!helpRole || isLoading) return null;
  const helpPath = `/${helpRole}/help`;

  if (!tourDone) {
    return (
      <section className="space-y-3 rounded-lg border bg-card p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-sm font-medium">What you can do here</h2>
            <p className="text-xs text-muted-foreground">
              Three places to start. Everything else is under Help.
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 shrink-0"
            aria-label="Dismiss"
            onClick={() => markSeen(["tour", ...highlights.map((h) => h.id)])}
          >
            <IconX size={14} />
          </Button>
        </div>
        <ul className="divide-y rounded-md border">
          {highlights.map((h) => (
            <li key={h.id}>
              <Link
                to={`${helpPath}#help-${h.id}`}
                onClick={() => markSeen(["tour", h.id])}
                className="block px-3 py-2 hover:bg-muted/40"
              >
                <span className="block text-sm font-medium">{h.title}</span>
                <span className="block text-xs text-muted-foreground">
                  {h.summary}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-between">
          <Link
            to={helpPath}
            onClick={() => markSeen(["tour"])}
            className="text-xs text-primary hover:underline"
          >
            See everything in Help
          </Link>
          <Button
            size="sm"
            variant="outline"
            onClick={() => markSeen(["tour", ...highlights.map((h) => h.id)])}
          >
            Got it
          </Button>
        </div>
      </section>
    );
  }

  if (fresh.length > 0) {
    const first = fresh[0];
    return (
      <div className="flex items-center justify-between gap-3 rounded-lg border bg-card px-4 py-2.5 text-sm">
        <span className="min-w-0">
          <span className="font-medium">New for you: </span>
          {first.title}
          {fresh.length > 1 ? ` and ${fresh.length - 1} more` : ""}
        </span>
        <span className="flex shrink-0 items-center gap-1">
          <Button asChild size="sm" variant="outline">
            <Link
              to={`${helpPath}#help-${first.id}`}
              onClick={() => markSeen([first.id])}
            >
              Show me
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            aria-label="Dismiss"
            onClick={() => markSeen(fresh.map((f) => f.id))}
          >
            <IconX size={14} />
          </Button>
        </span>
      </div>
    );
  }
  return null;
}
