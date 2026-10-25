import { useState } from "react";
import {
  IconAlertTriangle,
  IconChevronDown,
  IconCircleCheck,
} from "@tabler/icons-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

export type Finding = {
  kind: string;
  subject: string | null;
  text: string;
  /** How the figures in it were counted. */
  basis: string;
  evidence: string[];
};

/**
 * A list of findings, each opening to how it was counted and the evidence
 * behind it, so none has to be taken on trust. Shared by the learner, teacher
 * and class pages.
 */
export function FindingList({
  title,
  tone,
  items,
}: {
  title: string;
  tone: "concern" | "good";
  items: Finding[];
}) {
  const Icon = tone === "concern" ? IconAlertTriangle : IconCircleCheck;
  return (
    <section className="space-y-2">
      <h2 className="text-sm font-medium">{title}</h2>
      <ul className="divide-y rounded-lg border">
        {items.map((f, i) => (
          <FindingRow
            key={`${f.kind}-${i}`}
            finding={f}
            Icon={Icon}
            tone={tone}
          />
        ))}
      </ul>
    </section>
  );
}

function FindingRow({
  finding,
  Icon,
  tone,
}: {
  finding: Finding;
  Icon: typeof IconAlertTriangle;
  tone: "concern" | "good";
}) {
  const [open, setOpen] = useState(false);
  // Every finding opens to how it was counted and the papers behind it, so
  // none has to be taken on trust.
  const more = !!finding.basis || finding.evidence.length > 0;
  return (
    <li className="px-4 py-3">
      <Collapsible open={open} onOpenChange={setOpen}>
        <div className="flex items-start gap-3">
          <Icon
            size={16}
            className={cn(
              "mt-0.5 shrink-0",
              tone === "concern" ? "text-destructive" : "text-green-500",
            )}
          />
          <p className="min-w-0 flex-1 text-sm">{finding.text}</p>
          {more ? (
            <CollapsibleTrigger className="flex shrink-0 items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
              Details
              <IconChevronDown
                size={14}
                className={cn("transition-transform", open && "rotate-180")}
              />
            </CollapsibleTrigger>
          ) : null}
        </div>
        {more ? (
          <CollapsibleContent>
            <div className="mt-3 space-y-3 text-xs text-muted-foreground sm:pl-7">
              <p className="rounded-md bg-muted/50 px-3 py-2 leading-relaxed">
                <span className="font-medium text-foreground">
                  How it is counted:{" "}
                </span>
                {finding.basis}
              </p>
              {finding.evidence.length > 0 ? (
                <ul className="divide-y divide-border/60">
                  {finding.evidence.map((e, i) => {
                    // "Subject: the figure and why" reads as a name over its
                    // detail; a line with no such split stays as it is.
                    const at = e.indexOf(": ");
                    const name = at > 0 && at < 60 ? e.slice(0, at) : null;
                    return (
                      <li key={`${e}-${i}`} className="py-2 leading-relaxed">
                        {name ? (
                          <>
                            <span className="block text-sm font-medium text-foreground">
                              {name}
                            </span>
                            {e.slice(at + 2)}
                          </>
                        ) : (
                          e
                        )}
                      </li>
                    );
                  })}
                </ul>
              ) : null}
            </div>
          </CollapsibleContent>
        ) : null}
      </Collapsible>
    </li>
  );
}

/**
 * Suggested next steps, one row each: what to do and about what, with the
 * reason beneath. A step written "Do this: because of that" splits at the
 * colon; one without stays a single line.
 */
export function NextStepList({ steps }: { steps: string[] }) {
  return (
    <ul className="divide-y rounded-lg border bg-card text-sm">
      {steps.map((n) => {
        const at = n.indexOf(": ");
        return (
          <li key={n} className="px-4 py-3 leading-relaxed">
            {at > 0 ? (
              <>
                <span className="block font-medium">{n.slice(0, at)}</span>
                <span className="block text-xs text-muted-foreground">
                  {n.slice(at + 2)}
                </span>
              </>
            ) : (
              n
            )}
          </li>
        );
      })}
    </ul>
  );
}
