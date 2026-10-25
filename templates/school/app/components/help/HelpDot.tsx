import { useHelp } from "@/hooks/use-help";

/** A quiet marker beside Help when there is something new for this person. */
export function HelpDot() {
  const { hasNews } = useHelp();
  if (!hasNews) return null;
  return (
    <span
      className="ml-auto h-2 w-2 shrink-0 rounded-full bg-primary"
      role="img"
      aria-label="Something new"
    />
  );
}
