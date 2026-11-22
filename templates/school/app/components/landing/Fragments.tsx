import type { EditionContent } from "@shared/landing-content";
import { IconId } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

/**
 * Pieces of the app, drawn with the app's own look and filled with a demo
 * school's data. They are pictures of the product, not working screens, so
 * they hold no state and fetch nothing.
 */

export function Frame({
  children,
  label,
  className,
}: {
  children: React.ReactNode;
  label?: string;
  className?: string;
}) {
  return (
    <figure
      className={cn(
        "overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-[0_1px_2px_rgba(0,0,0,0.04),0_12px_32px_-12px_rgba(0,0,0,0.12)]",
        className,
      )}
    >
      {children}
      {label ? (
        <figcaption className="border-t border-border px-4 py-2 text-[11px] text-muted-foreground">
          {label}
        </figcaption>
      ) : null}
    </figure>
  );
}

export function ReportCardTop({ c }: { c: EditionContent }) {
  const r = c.report;
  const credits = r.rows.some((row) => row.extra);
  return (
    <Frame>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 border-b border-border pb-3">
          <div>
            <div className="text-sm font-semibold">{c.school}</div>
            <div className="text-xs text-muted-foreground">{r.title}</div>
          </div>
          <div className="text-right text-xs">
            <div className="font-medium">{r.learner}</div>
            <div className="text-muted-foreground">{r.group}</div>
          </div>
        </div>
        <table className="mt-3 w-full text-xs">
          <tbody>
            {r.rows.map((row) => (
              <tr key={row.subject} className="border-b border-border/60">
                <td className="py-1.5">{row.subject}</td>
                <td className="py-1.5 text-right tabular-nums text-muted-foreground">
                  {row.score}
                </td>
                <td className="w-12 py-1.5 text-right font-medium">
                  {row.grade}
                </td>
                {credits ? (
                  <td className="w-14 py-1.5 text-right tabular-nums text-muted-foreground">
                    {row.extra} cr
                  </td>
                ) : null}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-3 flex gap-4 text-xs font-medium">
          {r.summary.map((s) => (
            <span key={s}>{s}</span>
          ))}
        </div>
      </div>
    </Frame>
  );
}

export function SignInCard({ c }: { c: EditionContent }) {
  return (
    <div className="w-full max-w-[15rem] rounded-lg border border-dashed border-border bg-card p-4 text-xs">
      <div className="flex items-center gap-2 font-semibold">
        <IconId size={14} />
        {c.school}
      </div>
      <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1">
        <dt className="text-muted-foreground">Name</dt>
        <dd>Tolu Adeyemi</dd>
        <dt className="text-muted-foreground">ID</dt>
        <dd className="font-mono">2026/0142</dd>
        <dt className="text-muted-foreground">Password</dt>
        <dd className="font-mono">kite-mango-47</dd>
      </dl>
    </div>
  );
}

export function SettingsSheet({ c }: { c: EditionContent }) {
  return (
    <Frame>
      <div className="flex flex-wrap gap-2 p-5">
        {c.settings.map((s) => (
          <span
            key={s}
            className="rounded-md border border-border bg-muted/40 px-2.5 py-1 text-sm"
          >
            {s}
          </span>
        ))}
      </div>
    </Frame>
  );
}
