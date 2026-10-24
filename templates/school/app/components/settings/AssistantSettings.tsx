import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { agentNativePath } from "@agent-native/core/client";
import { IconChevronDown, IconCopy } from "@tabler/icons-react";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  AssistantKeyForm,
  useAssistantConnected,
} from "@/components/settings/AssistantKey";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import {
  AGENT_AUDIENCES,
  resolveAgentSettings,
  type AgentAudience,
  type AgentSettings,
} from "@shared/agent-settings";

/** Whether the school has an API key, with a way to add or replace it. */
function ConnectionRow() {
  const { data: connected, isLoading } = useAssistantConnected();
  const [editing, setEditing] = useState(false);
  if (isLoading) return null;
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
  const [advanced, setAdvanced] = useState(false);

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
                      {choices.map((c) => (
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
    </div>
  );
}

/**
 * The address staff paste into their AI app (a custom connector in Claude or
 * ChatGPT). It is this deployment's own address, so it is read from the
 * browser rather than written into the page.
 */
function McpAddress() {
  const [address, setAddress] = useState("");
  useEffect(() => {
    setAddress(`${window.location.origin}/_agent-native/mcp`);
  }, []);
  if (!address) return null;
  return (
    <div className="space-y-1">
      <Label className="text-xs">Address for their AI app</Label>
      <div className="flex gap-2">
        <Input readOnly value={address} className="font-mono text-xs" />
        <Button
          variant="outline"
          size="icon"
          aria-label="Copy address"
          onClick={() => {
            navigator.clipboard
              ?.writeText(address)
              .then(() => toast.success("Address copied"))
              .catch(() => toast.error("Could not copy"));
          }}
        >
          <IconCopy size={16} />
        </Button>
      </div>
      <p className="text-xs text-muted-foreground">
        In Claude or ChatGPT, add it as a custom connector and sign in with your
        school account. Apps that cannot sign in this way can use the{" "}
        <a
          href={agentNativePath("/_agent-native/mcp/connect")}
          target="_blank"
          rel="noreferrer"
          className="underline underline-offset-2"
        >
          connect page
        </a>
        .
      </p>
    </div>
  );
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
