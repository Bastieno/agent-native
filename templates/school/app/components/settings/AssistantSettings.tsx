import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { agentNativePath } from "@agent-native/core/client";
import { IconChevronDown, IconCopy } from "@tabler/icons-react";
import { toast } from "sonner";
import { copyText } from "@/lib/copy-text";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  AssistantKeyForm,
  useAssistantConnected,
} from "@/components/settings/AssistantKey";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSchoolConfig } from "@/hooks/use-school-config";
import { useSaveSchoolConfig } from "@/components/timetable/useSaveSchoolConfig";
import { SchoolUsage } from "@/components/settings/SchoolUsage";
import {
  SchoolCredit,
  useSchoolCredit,
} from "@/components/settings/SchoolCredit";
import {
  AGENT_AUDIENCES,
  modelLabel,
  resolveAgentSettings,
  type AgentAudience,
  type AgentSettings,
} from "@shared/agent-settings";

/** Whether the school has an API key, with a way to add or replace it. */
function ConnectionRow() {
  const { data: connected, isLoading } = useAssistantConnected();
  const { data: credit, isLoading: creditLoading } = useSchoolCredit();
  const [editing, setEditing] = useState(false);
  // On Ellai's credit the credit card below says all there is to say.
  if (isLoading || creditLoading || credit?.mode === "managed") return null;
  return (
    <div className="rounded-lg border bg-card p-4">
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-1">
          <p className="text-sm font-medium">API key</p>
          <p className="text-xs text-muted-foreground">
            {connected
              ? "The assistant is switched on for your school."
              : "The assistant is off until you add your Anthropic API key."}
          </p>
        </div>
        {!editing ? (
          <Button variant="outline" size="sm" onClick={() => setEditing(true)}>
            {connected ? "Replace key" : "Add key"}
          </Button>
        ) : null}
      </div>
      {editing ? (
        <div className="mt-3">
          <AssistantKeyForm onSaved={() => setEditing(false)} />
        </div>
      ) : null}
    </div>
  );
}

const WHO: Record<AgentAudience, string> = {
  learner: "Learners",
  teacher: "Teachers",
  admin: "Admins",
};

/**
 * The school's assistant: on or off for learners first, everything else under
 * Advanced. Each change saves on its own — the cache first, the request in the
 * background — so there is no Save button to forget.
 */
export function AssistantSettings() {
  const { config } = useSchoolConfig();
  const save = useSaveSchoolConfig();
  const settings = resolveAgentSettings((config as any).agent);
  const choices: Array<{ id: string; label: string; note: string }> =
    (config as any).agentModelChoices ?? [];
  // A school keeps the model it saved even once the list offers a newer one;
  // show it by name rather than as an empty box.
  const choicesFor = (current: string | null) =>
    current && !choices.some((c) => c.id === current)
      ? [...choices, { id: current, label: modelLabel(current), note: "older" }]
      : choices;
  const cheapest = choices[0];
  const [advanced, setAdvanced] = useState(false);
  const [usageOpen, setUsageOpen] = useState(false);

  const { data: yearGroups = [] } = useQuery<
    Array<{ id: string; name: string }>
  >({
    queryKey: ["grade-levels"],
    queryFn: async () => {
      const res = await fetch(
        agentNativePath("/_agent-native/actions/list-grade-levels"),
      );
      if (!res.ok) return [];
      return res.json();
    },
  });

  function update(next: AgentSettings, done?: string) {
    save({ agent: next }, done);
  }

  return (
    <div className="space-y-4">
      <ConnectionRow />
      <SchoolCredit />
      <div className="flex items-start justify-between gap-4 rounded-lg border bg-card p-4">
        <div className="space-y-1">
          <Label htmlFor="learner-agent" className="text-sm font-medium">
            Assistant for learners
          </Label>
          <p className="text-xs text-muted-foreground">
            {settings.learnerAgentEnabled
              ? "Learners can ask the assistant for help. It is paused for anyone sitting a timed paper."
              : "Learners don't see the assistant. Staff still have it."}
          </p>
        </div>
        <Switch
          id="learner-agent"
          checked={settings.learnerAgentEnabled}
          onCheckedChange={(on) =>
            update(
              { ...settings, learnerAgentEnabled: on },
              on ? "Assistant on for learners" : "Assistant off for learners",
            )
          }
        />
      </div>

      <Collapsible open={advanced} onOpenChange={setAdvanced}>
        <CollapsibleTrigger className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <IconChevronDown
            size={16}
            className={advanced ? "rotate-180 transition" : "transition"}
          />
          Advanced
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-3 space-y-4">
          {yearGroups.length > 0 ? (
            <section className="space-y-2 rounded-lg border bg-card p-4">
              <div>
                <h3 className="text-sm font-medium">By year group</h3>
                <p className="text-xs text-muted-foreground">
                  A year group can differ from the school-wide switch.
                </p>
              </div>
              <div className="divide-y">
                {yearGroups.map((yg) => {
                  const own = settings.learnerAgentByYearGroup[yg.id];
                  const value =
                    own === undefined ? "follow" : own ? "on" : "off";
                  return (
                    <div
                      key={yg.id}
                      className="flex items-center justify-between gap-3 py-2"
                    >
                      <span className="text-sm">{yg.name}</span>
                      <Select
                        value={value}
                        onValueChange={(v) => {
                          const byYear = {
                            ...settings.learnerAgentByYearGroup,
                          };
                          if (v === "follow") delete byYear[yg.id];
                          else byYear[yg.id] = v === "on";
                          save({
                            agent: {
                              ...settings,
                              learnerAgentByYearGroup: {
                                ...byYear,
                                // Tell the server to drop the override.
                                ...(v === "follow" ? { [yg.id]: null } : {}),
                              },
                            },
                          });
                        }}
                      >
                        <SelectTrigger className="h-8 w-48">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="follow">
                            Same as school (
                            {settings.learnerAgentEnabled ? "on" : "off"})
                          </SelectItem>
                          <SelectItem value="on">On</SelectItem>
                          <SelectItem value="off">Off</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  );
                })}
              </div>
            </section>
          ) : null}

          <section className="space-y-2 rounded-lg border bg-card p-4">
            <div>
              <h3 className="text-sm font-medium">Model and daily limit</h3>
              <p className="text-xs text-muted-foreground">
                Cheaper models cost less per message. The limit counts messages
                per person per school day; leave it empty for no limit.
              </p>
            </div>
            <div className="divide-y">
              {AGENT_AUDIENCES.map((who) => (
                <div
                  key={who}
                  className="flex flex-wrap items-center gap-3 py-2"
                >
                  <span className="w-20 text-sm">{WHO[who]}</span>
                  <Select
                    value={settings.models[who]}
                    onValueChange={(m) =>
                      update({
                        ...settings,
                        models: { ...settings.models, [who]: m },
                      })
                    }
                  >
                    <SelectTrigger className="h-8 w-60">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {choicesFor(settings.models[who]).map((c) => (
                        <SelectItem key={c.id} value={c.id}>
                          {c.label} · {c.note}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <LimitInput
                    who={who}
                    value={settings.dailyMessageLimits[who]}
                    onSave={(limit) =>
                      update({
                        ...settings,
                        dailyMessageLimits: {
                          ...settings.dailyMessageLimits,
                          [who]: limit,
                        },
                      })
                    }
                  />
                </div>
              ))}
            </div>
            {cheapest ? (
              <div className="flex items-start justify-between gap-4 border-t pt-3">
                <div className="space-y-1">
                  <Label htmlFor="routine-model" className="text-sm">
                    Quick staff questions on {cheapest.label}
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Questions and lookups from teachers and admins use the
                    cheapest model. Writing, marking, planning and changes stay
                    on the model above.
                  </p>
                </div>
                <Switch
                  id="routine-model"
                  checked={settings.routineModel !== null}
                  onCheckedChange={(on) =>
                    update(
                      {
                        ...settings,
                        routineModel: on ? cheapest.id : null,
                      },
                      on
                        ? `Quick staff questions on ${cheapest.label}`
                        : "Every staff message on the model above",
                    )
                  }
                />
              </div>
            ) : null}
          </section>

          <section className="space-y-2 rounded-lg border bg-card p-4">
            <div>
              <h3 className="text-sm font-medium">Whole school, per day</h3>
              <p className="text-xs text-muted-foreground">
                The most messages everyone together can send the assistant in a
                school day, however they reach it. It sits above each
                person&apos;s own limit. Leave it empty for no limit.
              </p>
            </div>
            <LimitInput
              label="Daily message limit for the whole school"
              value={settings.dailySchoolLimit}
              onSave={(limit) =>
                update({ ...settings, dailySchoolLimit: limit })
              }
            />
          </section>

          <section className="space-y-2 rounded-lg border bg-card p-4">
            <div>
              <h3 className="text-sm font-medium">Requests from AI apps</h3>
              <p className="text-xs text-muted-foreground">
                Staff can connect their own Claude or ChatGPT. Those apps use
                the school&apos;s tools directly; this limits how many requests
                the whole school hands to the assistant from them each day.
                Leave it empty for no limit.
              </p>
            </div>
            <McpAddress />
            <LimitInput
              label="Daily limit for requests from AI apps, whole school"
              value={settings.chatAppDailyLimit}
              onSave={(limit) =>
                update({ ...settings, chatAppDailyLimit: limit })
              }
            />
          </section>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible open={usageOpen} onOpenChange={setUsageOpen}>
        <CollapsibleTrigger className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <IconChevronDown
            size={16}
            className={usageOpen ? "rotate-180 transition" : "transition"}
          />
          Usage
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-3">
          {/* Mounted only when open, so the figures load only when asked for. */}
          {usageOpen ? <SchoolUsage /> : null}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}

/**
 * How staff connect their own AI app. The connect page has the steps for each
 * app (Claude, ChatGPT, Cursor and more), so it is the main action; the bare
 * address is under it for anyone who only needs to paste it. Both are this
 * deployment's own, so they are read from the browser rather than written
 * into the page.
 */
export function McpAddress() {
  const [address, setAddress] = useState("");
  useEffect(() => {
    setAddress(`${window.location.origin}/_agent-native/mcp`);
  }, []);
  if (!address) return null;
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-4">
        <p className="text-xs text-muted-foreground">
          Steps for Claude, ChatGPT and other apps, with your school account.
        </p>
        <Button asChild size="sm" className="shrink-0">
          <a
            href={agentNativePath("/_agent-native/mcp/connect")}
            target="_blank"
            rel="noreferrer"
          >
            Connect an AI app
          </a>
        </Button>
      </div>
      <ConnectedApps />
      <div className="space-y-1">
        <Label className="text-xs">Or paste this address</Label>
        <div className="flex gap-2">
          <Input readOnly value={address} className="font-mono text-xs" />
          <Button
            variant="outline"
            size="icon"
            aria-label="Copy address"
            onClick={async () => {
              if (await copyText(address)) toast.success("Address copied");
              else
                toast.error("Could not copy. Select the address and copy it.");
            }}
          >
            <IconCopy size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
}

/**
 * The AI apps that can act as someone at this school right now. Disconnecting
 * is the only way to take one back: the app is never told when its owner
 * deletes it on their side, so without this a connection outlives the person
 * who thought they had removed it. An admin sees everyone's.
 */
function ConnectedApps() {
  const qc = useQueryClient();
  const [target, setTarget] = useState<ConnectedApp | null>(null);
  const { data } = useQuery<{ apps: ConnectedApp[] }>({
    queryKey: ["connected-apps"],
    queryFn: async () => {
      const res = await fetch(
        agentNativePath("/_agent-native/actions/list-connected-apps"),
      );
      if (!res.ok) throw new Error("Could not load connected apps");
      return res.json();
    },
  });
  const apps = data?.apps ?? [];

  async function disconnect() {
    const app = target;
    if (!app) return;
    setTarget(null);
    // Optimistic: the row goes at once, and comes back if the server refuses.
    qc.setQueryData<{ apps: ConnectedApp[] }>(["connected-apps"], (old) => ({
      apps: (old?.apps ?? []).filter(
        (a) =>
          !(a.clientId === app.clientId && a.ownerEmail === app.ownerEmail),
      ),
    }));
    const res = await fetch(
      agentNativePath("/_agent-native/actions/disconnect-connected-app"),
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientId: app.clientId,
          ownerEmail: app.ownerEmail,
        }),
      },
    );
    if (!res.ok) toast.error("Could not disconnect that app.");
    else toast.success("Disconnected");
    qc.invalidateQueries({ queryKey: ["connected-apps"] });
  }

  if (apps.length === 0) return null;
  return (
    <div className="space-y-1.5">
      <Label className="text-xs">Connected now</Label>
      <ul className="divide-y rounded-lg border">
        {apps.map((a) => (
          <li
            key={`${a.ownerEmail}|${a.clientId}`}
            className="flex items-center justify-between gap-3 px-3 py-2"
          >
            <div className="min-w-0">
              <p className="truncate text-sm">
                {a.app} {a.mine ? "(you)" : ""}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                Acts as {a.ownerEmail}
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="shrink-0"
              onClick={() => setTarget(a)}
            >
              Disconnect
            </Button>
          </li>
        ))}
      </ul>
      <AlertDialog open={!!target} onOpenChange={(o) => !o && setTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Disconnect {target?.app} from {target?.ownerEmail}?
            </AlertDialogTitle>
            <AlertDialogDescription>
              It can no longer act for them until it is connected again. What it
              was already doing can carry on for up to an hour.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep it</AlertDialogCancel>
            <AlertDialogAction onClick={disconnect}>
              Disconnect
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

interface ConnectedApp {
  clientId: string;
  app: string;
  ownerEmail: string;
  mine: boolean;
  lastRenewedAt: string;
}

function LimitInput({
  who,
  label,
  value,
  onSave,
}: {
  who?: AgentAudience;
  label?: string;
  value: number | null;
  onSave: (limit: number | null) => void;
}) {
  const [text, setText] = useState(value === null ? "" : String(value));
  useEffect(() => {
    setText(value === null ? "" : String(value));
  }, [value]);

  function commit() {
    const trimmed = text.trim();
    const next = trimmed === "" ? null : Math.max(0, Math.floor(+trimmed));
    if (next !== null && !Number.isFinite(next)) {
      setText(value === null ? "" : String(value));
      return;
    }
    if (next !== value) onSave(next);
  }

  return (
    <div className="flex items-center gap-2">
      <Input
        aria-label={
          label ?? `Daily message limit for ${WHO[who!].toLowerCase()}`
        }
        inputMode="numeric"
        className="h-8 w-20"
        placeholder="No limit"
        value={text}
        onChange={(e) => setText(e.target.value.replace(/[^0-9]/g, ""))}
        onBlur={commit}
        onKeyDown={(e) => {
          if (e.key === "Enter") (e.target as HTMLInputElement).blur();
        }}
      />
      <span className="text-xs text-muted-foreground">a day</span>
    </div>
  );
}
