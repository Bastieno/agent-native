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
            <div className="mt-2 space-y-2 pl-7 text-xs text-muted-foreground">
              <p>
                <span className="font-medium text-foreground">
                  How it is counted:{" "}
                </span>
                {finding.basis}
              </p>
              {finding.evidence.length > 0 ? (
                <ul className="space-y-1">
                  {finding.evidence.map((e, i) => (
                    <li key={`${e}-${i}`}>{e}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          </CollapsibleContent>
        ) : null}
      </Collapsible>
    </li>
  );
}
