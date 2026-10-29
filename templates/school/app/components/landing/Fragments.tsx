import {
  IconAlertTriangle,
  IconCheck,
  IconCircle,
  IconCircleCheck,
  IconFileText,
  IconFlag,
  IconId,
  IconSchool,
  IconUsers,
  IconBook,
  IconLayoutGrid,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import type { EditionContent } from "@shared/landing-content";

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

function AppBar({ c }: { c: EditionContent }) {
  return (
    <div className="flex items-center gap-3 border-b border-border px-4 py-2.5 text-sm">
      <span className="font-semibold">{c.school}</span>
      <span className="truncate text-xs text-muted-foreground">
        {c.yearLabel}
      </span>
    </div>
  );
}

const STAT_ICONS = [IconUsers, IconUsers, IconSchool, IconBook];

export function AdminHome({ c }: { c: EditionContent }) {
  return (
    <Frame label={`${c.school}, a demo school`}>
      <AppBar c={c} />
      <div className="grid gap-4 p-4 sm:p-5">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {c.stats.map((s, i) => {
            const Icon = STAT_ICONS[i];
            return (
              <div
                key={s.label}
                className="flex items-center gap-3 rounded-lg border border-border p-3"
              >
                <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <Icon size={16} />
                </span>
                <div className="min-w-0">
                  <div className="text-lg font-semibold leading-none tabular-nums">
                    {s.value}
                  </div>
                  <div className="mt-1 truncate text-xs text-muted-foreground">
                    {s.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <AttentionBody c={c} />
      </div>
    </Frame>
  );
}

function AttentionBody({ c }: { c: EditionContent }) {
  return (
    <div className="rounded-lg border border-border p-4">
      <div className="text-sm font-medium">Needs attention</div>
      <ul className="mt-3 grid gap-2.5">
        {c.attention.map((a) => (
          <li key={a.title} className="flex gap-2.5 text-sm">
            <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-amber-500" />
            <span>
              <span className="font-medium">{a.title}.</span>{" "}
              <span className="text-muted-foreground">{a.detail}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Attention({ c }: { c: EditionContent }) {
  return (
    <Frame>
      <div className="p-4">
        <AttentionBody c={c} />
      </div>
    </Frame>
  );
}

export function WeekGrid({
  c,
  proposal = false,
}: {
  c: EditionContent;
  proposal?: boolean;
}) {
  return (
    <Frame>
      {proposal ? (
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border bg-primary/5 px-4 py-2.5 text-sm">
          <span>
            <span className="font-medium">Draft timetable.</span>{" "}
            <span className="text-muted-foreground">
              No clashes. Nothing changes until you accept it.
            </span>
          </span>
          <span className="flex gap-2">
            <span className="rounded-md border border-border bg-card px-2.5 py-1 text-xs">
              Discard
            </span>
            <span className="rounded-md bg-primary px-2.5 py-1 text-xs text-primary-foreground">
              Accept
            </span>
          </span>
        </div>
      ) : null}
      <div className="overflow-x-auto p-4">
        <div className="mb-2 flex items-center gap-2 text-sm font-medium">
          <IconLayoutGrid size={15} className="text-muted-foreground" />
          {c.week.arm}
        </div>
        <table className="w-full min-w-[30rem] table-fixed border-separate border-spacing-1 text-xs">
          <thead>
            <tr>
              <th className="w-6" />
              {c.week.days.map((d) => (
                <th
                  key={d}
                  className="pb-1 text-left font-medium text-muted-foreground"
                >
                  {d}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {c.week.periods.map((row, i) => (
              <tr key={i}>
                <td className="text-muted-foreground tabular-nums">{i + 1}</td>
                {row.map((name, j) => (
                  <td
                    key={j}
                    className={cn(
                      "truncate rounded-md border border-border px-2 py-1.5",
                      proposal && (i + j) % 3 === 0
                        ? "border-dashed border-primary/50 bg-primary/5"
                        : "bg-muted/40",
                    )}
                  >
                    {name}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Frame>
  );
}

export function LessonDraft({ c }: { c: EditionContent }) {
  return (
    <Frame>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="text-sm font-medium">{c.lessonNote.title}</div>
          <span className="shrink-0 rounded-full border border-border px-2 py-0.5 text-[11px] text-muted-foreground">
            Draft
          </span>
        </div>
        <div className="mt-4 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          By the end of the lesson
        </div>
        <ul className="mt-2 grid gap-1.5 text-sm">
          {c.lessonNote.objectives.map((o) => (
            <li key={o} className="flex gap-2">
              <IconCircle
                size={14}
                className="mt-0.5 shrink-0 text-muted-foreground"
              />
              {o}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs text-muted-foreground">
          Only you can see this until you mark it ready.
        </p>
      </div>
    </Frame>
  );
}

export function ThreeLevels({ c }: { c: EditionContent }) {
  return (
    <Frame>
      <div className="p-4">
        <div className="mb-3 text-sm font-medium">{c.levelsClass}</div>
        <div className="grid gap-2 sm:grid-cols-3">
          {c.levels.map((l) => (
            <div
              key={l.label}
              className="rounded-lg border border-border bg-muted/30 p-3"
            >
              <div className="text-[11px] font-medium text-muted-foreground">
                {l.label}
              </div>
              <div className="mt-1.5 text-sm leading-snug">{l.question}</div>
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
}

export function MarkedAnswer({ c }: { c: EditionContent }) {
  const m = c.marked;
  return (
    <Frame>
      <div className="grid gap-4 p-5">
        <div className="flex items-center justify-between gap-3">
          <div className="text-xs text-muted-foreground">{m.paper}</div>
          <div className="text-sm font-semibold tabular-nums">{m.score}</div>
        </div>
        <div className="text-sm font-medium">{m.question}</div>
        <blockquote className="rounded-lg bg-muted/50 p-3 text-sm italic leading-relaxed">
          {m.answer}
        </blockquote>
        <ul className="grid gap-2 text-sm">
          {m.criteria.map((cr) => (
            <li key={cr.text} className="flex gap-2">
              {cr.met ? (
                <IconCircleCheck
                  size={16}
                  className="mt-0.5 shrink-0 text-emerald-600"
                />
              ) : (
                <IconCircle
                  size={16}
                  className="mt-0.5 shrink-0 text-muted-foreground"
                />
              )}
              <span>
                {cr.text}
                {cr.quote ? (
                  <span className="text-muted-foreground">
                    {" "}
                    · &ldquo;{cr.quote}&rdquo;
                  </span>
                ) : null}
              </span>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2 rounded-md border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-xs">
          <IconFlag size={14} className="shrink-0 text-amber-600" />
          {m.flag}
        </div>
      </div>
    </Frame>
  );
}

export function LearnerSummary({ c }: { c: EditionContent }) {
  const l = c.learner;
  return (
    <Frame>
      <div className="grid gap-4 p-5">
        <div>
          <div className="text-sm font-medium">{l.name}</div>
          <div className="text-xs text-muted-foreground">{l.group}</div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-lg border border-border p-3">
            <div className="text-lg font-semibold tabular-nums">
              {l.average}
            </div>
            <div className="text-xs text-muted-foreground">Her average</div>
          </div>
          <div className="rounded-lg border border-border p-3">
            <div className="text-lg font-semibold tabular-nums">
              {l.classAverage}
            </div>
            <div className="text-xs text-muted-foreground">
              Her classes' average
            </div>
          </div>
        </div>
        <div className="flex gap-2 text-sm">
          <IconAlertTriangle
            size={16}
            className="mt-0.5 shrink-0 text-amber-600"
          />
          {l.missed}
        </div>
        <div className="flex gap-2 rounded-md border border-border px-3 py-2 text-sm">
          <IconFileText
            size={16}
            className="mt-0.5 shrink-0 text-muted-foreground"
          />
          {l.resource}
        </div>
      </div>
    </Frame>
  );
}

export function SetupChecklist({ c }: { c: EditionContent }) {
  return (
    <Frame>
      <div className="p-5">
        <div className="text-sm font-medium">School setup</div>
        <ul className="mt-3 grid gap-2 text-sm">
          {c.setupDone.map((s) => (
            <li key={s} className="flex gap-2">
              <IconCheck
                size={16}
                className="mt-0.5 shrink-0 text-emerald-600"
              />
              {s}
            </li>
          ))}
          {c.setupLeft.map((s) => (
            <li key={s} className="flex gap-2 text-muted-foreground">
              <IconCircle size={16} className="mt-0.5 shrink-0" />
              {s}
            </li>
          ))}
        </ul>
      </div>
    </Frame>
  );
}

export function GradebookRow({ c }: { c: EditionContent }) {
  const g = c.gradebook;
  return (
    <Frame>
      <div className="overflow-x-auto p-4">
        <div className="mb-3 text-sm font-medium">{g.className}</div>
        <table className="w-full min-w-[26rem] text-xs">
          <thead>
            <tr className="text-left text-muted-foreground">
              <th className="pb-2 font-medium" />
              {g.marks.map((m) => (
                <th key={m.name} className="pb-2 font-medium">
                  {m.name}
                </th>
              ))}
              <th className="pb-2 text-right font-medium">Term</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-border">
              <td className="py-2 pr-2 font-medium">{g.learner}</td>
              {g.marks.map((m) => (
                <td key={m.name} className="py-2 tabular-nums">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1",
                      m.flagged &&
                        "rounded bg-amber-500/15 px-1.5 py-0.5 text-amber-800 dark:text-amber-300",
                    )}
                  >
                    {m.score}
                    {m.flagged ? <IconFlag size={11} /> : null}
                  </span>
                </td>
              ))}
              <td className="py-2 text-right font-medium tabular-nums">
                {g.total}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Frame>
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

export function PhoneWeek({ c }: { c: EditionContent }) {
  const p = c.phone;
  return (
    <div className="mx-auto w-full max-w-[17rem] rounded-[2.25rem] border border-border bg-card p-2.5 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.2)]">
      <div className="overflow-hidden rounded-[1.75rem] border border-border bg-background">
        <div className="px-4 pb-2 pt-5">
          <div className="text-[11px] text-muted-foreground">
            {p.learner} · {p.group}
          </div>
          <div className="text-base font-semibold">{p.day}</div>
        </div>
        <ul className="grid gap-1.5 px-3 pb-4">
          {p.lessons.map((l) => (
            <li
              key={l.time}
              className={cn(
                "flex items-baseline gap-3 rounded-lg px-2.5 py-2 text-xs",
                l.kind === "break" ? "text-muted-foreground" : "bg-muted/50",
              )}
            >
              <span className="w-9 shrink-0 tabular-nums text-muted-foreground">
                {l.time}
              </span>
              <span className="min-w-0">
                <span className="block truncate font-medium">{l.name}</span>
                {l.room ? (
                  <span className="block truncate text-[11px] text-muted-foreground">
                    {l.room}
                  </span>
                ) : null}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
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
