import { useSchoolTerm } from "@/hooks/use-calendar-position";

/**
 * Which session and term it is, in one muted line: "2027-2028 · First Term ·
 * Week 3 of 13". Between terms it says when the next begins. Nothing shows
 * until the school has a current session.
 */
export function TermLine() {
  const t = useSchoolTerm();
  if (!t?.session) return null;
  const parts = t.term
    ? [
        t.session.name,
        t.term.name,
        t.calendar ? `Week ${t.calendar.week} of ${t.calendar.totalWeeks}` : "",
      ]
    : [
        t.session.name,
        t.nextTerm
          ? `${t.nextTerm.name} begins ${t.nextTerm.startDate}`
          : "Between terms",
      ];
  return (
    <p className="mt-1 text-sm text-muted-foreground">
      {parts.filter(Boolean).join(" · ")}
    </p>
  );
}
