import { useCalendarPosition } from "@/hooks/use-calendar-position";

/**
 * One quiet line when this is not an ordinary teaching week: a break,
 * revision, a test week or examinations. In an ordinary week it shows
 * nothing at all, so it only ever appears when it explains something.
 */
export function CalendarBanner() {
  const cal = useCalendarPosition();
  if (!cal || cal.kind === "teaching") return null;
  return (
    <p className="rounded-md border bg-muted/40 px-3 py-2 text-sm">
      <span className="font-medium">
        {cal.label ?? "Not an ordinary week"}
        <span className="ml-2 text-xs font-normal text-muted-foreground">
          Week {cal.week} of {cal.totalWeeks}
        </span>
      </span>
      {cal.short ? (
        <span className="mt-0.5 block text-xs text-muted-foreground">
          {cal.short}
        </span>
      ) : null}
    </p>
  );
}
