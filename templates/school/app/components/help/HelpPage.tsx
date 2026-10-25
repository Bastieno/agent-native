import { useMemo, useState } from "react";
import { Link, useLocation } from "react-router";
import { IconChevronDown, IconCopy, IconSearch } from "@tabler/icons-react";
import { toast } from "sonner";
import { copyText } from "@/lib/copy-text";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { ConnectAiAppDialog } from "@/components/ConnectAiAppDialog";
import { useHelp } from "@/hooks/use-help";
import { cn } from "@/lib/utils";
import type { Capability, HelpRole } from "../../../shared/capabilities";
import { searchCapabilities } from "../../../shared/help-search";

/**
 * What a person can do here, in their own words and by task.
 *
 * Grouped, collapsed and searchable: someone who knows what they want types
 * it, someone browsing opens a group. Opening an entry marks it seen, which is
 * how the app learns not to mention it again. Search is plain keyword
 * matching in the browser, so asking "how do I…?" here costs nothing.
 */
export function HelpPage({ role }: { role: HelpRole }) {
  const { capabilities, seen, fresh, coordinator, markSeen, isLoading } =
    useHelp();
  const [query, setQuery] = useState("");
  // A link from the welcome card or a hint opens its entry straight away.
  const { hash } = useLocation();
  const [openId, setOpenId] = useState<string | null>(
    hash.startsWith("#help-") ? hash.slice("#help-".length) : null,
  );

  const results = useMemo(
    () => (query.trim() ? searchCapabilities(query, capabilities) : []),
    [query, capabilities],
  );
  const groups = useMemo(() => {
    const out = new Map<string, Capability[]>();
    for (const c of capabilities) {
      out.set(c.group, [...(out.get(c.group) ?? []), c]);
    }
    return [...out.entries()];
  }, [capabilities]);
  const freshIds = new Set(fresh.map((c) => c.id));

  const entry = (c: Capability) => (
    <CapabilityRow
      key={c.id}
      capability={c}
      role={role}
      isNew={
        freshIds.has(c.id) ||
        (!seen.has(c.id) && freshIds.size > 0 && freshIds.has(c.id))
      }
      open={openId === c.id}
      onToggle={() => {
        const next = openId === c.id ? null : c.id;
        setOpenId(next);
        if (next) markSeen([c.id]);
      }}
      showCoordinatorTag={coordinator && !!c.coordinator}
    />
  );

  return (
    <div className="h-full overflow-y-auto">
      <div className="mx-auto w-full max-w-3xl space-y-6 p-4 pb-24 sm:p-6 sm:pb-24">
        <div>
          <h1 className="text-xl font-semibold">Help</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            What you can do here, and how. Ask a question in your own words, or
            open a topic.
          </p>
        </div>
        <div className="relative">
          <IconSearch
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="How do I…"
            className="pl-9"
            aria-label="Search help"
          />
        </div>

        {isLoading && capabilities.length === 0 ? null : query.trim() ? (
          results.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Nothing matches that. Try other words, or ask the assistant.
            </p>
          ) : (
            <div className="divide-y rounded-lg border">
              {results
                .filter((r) => r.score >= results[0].score * 0.4)
                .slice(0, 5)
                .map((r) => entry(r.capability))}
            </div>
          )
        ) : (
          groups.map(([group, items]) => (
            <section key={group} className="space-y-2">
              <h2 className="text-sm font-medium text-muted-foreground">
                {group}
              </h2>
              <div className="divide-y rounded-lg border">
                {items.map(entry)}
              </div>
            </section>
          ))
        )}
      </div>
    </div>
  );
}

function CapabilityRow({
  capability: c,
  role,
  isNew,
  open,
  onToggle,
  showCoordinatorTag,
}: {
  capability: Capability;
  role: HelpRole;
  isNew: boolean;
  open: boolean;
  onToggle: () => void;
  showCoordinatorTag: boolean;
}) {
  const where = c.where?.[role];
  return (
    <Collapsible open={open} onOpenChange={onToggle} id={`help-${c.id}`}>
      <CollapsibleTrigger className="group flex w-full items-start gap-3 px-4 py-3 text-left hover:bg-muted/30">
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-center gap-2 text-sm font-medium">
            {c.title}
            {isNew ? <Badge className="text-[10px]">New for you</Badge> : null}
            {showCoordinatorTag ? (
              <Badge variant="secondary" className="text-[10px]">
                Coordinator
              </Badge>
            ) : null}
          </span>
          <span className="mt-0.5 block text-xs text-muted-foreground">
            {c.summary}
          </span>
        </span>
        <IconChevronDown
          size={16}
          className={cn(
            "mt-0.5 shrink-0 text-muted-foreground transition-transform",
            open && "rotate-180",
          )}
        />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="space-y-3 border-t bg-muted/20 px-4 py-3">
          <ol className="list-decimal space-y-1 pl-5 text-sm">
            {c.steps.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ol>
          {c.aiApp && role !== "student" ? (
            <div className="flex flex-wrap items-center gap-2 rounded-md border bg-background p-3 text-xs text-muted-foreground">
              <span className="min-w-0 flex-1">
                This is best done from your own AI app: it reads the pages and
                writes on your account, so it costs the school nothing.
              </span>
              <ConnectAiAppDialog
                trigger={
                  <Button size="sm" variant="outline">
                    Connect your AI app
                  </Button>
                }
              />
            </div>
          ) : null}
          {c.starters?.length ? (
            <div className="space-y-1">
              <p className="text-xs font-medium">Try asking</p>
              {c.starters.map((s) => (
                <div
                  key={s.label}
                  className="flex items-center justify-between gap-2 rounded-md border bg-background px-3 py-1.5 text-xs"
                >
                  <span className="min-w-0 truncate">{s.label}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 shrink-0"
                    aria-label={`Copy: ${s.label}`}
                    onClick={async () => {
                      if (await copyText(s.text)) toast.success("Copied");
                      else toast.error("Could not copy.");
                    }}
                  >
                    <IconCopy size={13} />
                  </Button>
                </div>
              ))}
            </div>
          ) : null}
          {where ? (
            <Button asChild size="sm" variant="outline">
              <Link to={where}>Open it</Link>
            </Button>
          ) : null}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
