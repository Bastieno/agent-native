import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

export interface FiguresRow {
  name: string;
  /** One per column, already formatted. */
  cells: { value: string; className?: string }[];
  strong?: boolean;
}

/**
 * Figures by business: a table where there is room, and in a narrow space
 * (a phone, or beside the sidebar and assistant) one block per business with each figure on its own line, so no column is pushed off screen.
 */
export function FiguresTable({
  columns,
  rows,
}: {
  columns: string[];
  rows: FiguresRow[];
}) {
  return (
    <div className="@container">
      <div className="divide-y divide-border @2xl:hidden">
        {rows.map((r) => (
          <div key={r.name} className="py-3 first:pt-0 last:pb-0">
            <div
              className={cn(
                "text-sm",
                r.strong ? "font-semibold" : "font-medium",
              )}
            >
              {r.name}
            </div>
            <dl className="mt-1.5 grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
              {columns.map((c, i) => (
                <div key={c} className="contents">
                  <dt className="text-muted-foreground">{c}</dt>
                  <dd
                    className={cn(
                      "text-right tabular-nums",
                      r.cells[i]?.className,
                    )}
                  >
                    {r.cells[i]?.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
      <Table className="hidden @2xl:table">
        <TableHeader>
          <TableRow>
            <TableHead />
            {columns.map((c) => (
              <TableHead key={c} className="text-right">
                {c}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((r) => (
            <TableRow key={r.name} className={r.strong ? "font-medium" : ""}>
              <TableCell>{r.name}</TableCell>
              {r.cells.map((c, i) => (
                <TableCell
                  key={i}
                  className={cn("text-right tabular-nums", c.className)}
                >
                  {c.value}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
