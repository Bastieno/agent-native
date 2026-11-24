import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import { IconCopy, IconPlus, IconTrash } from "@tabler/icons-react";
import { useActionMutation, useActionQuery } from "@agent-native/core/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSetPageTitle } from "@/components/layout/HeaderActions";
import { NARRATION_TAGS, narrationGuide } from "@shared/narration";
import { stockKeyName } from "@shared/stock-groups";
import { AssistantSettings } from "@/components/AssistantKey";

/** Who on the payroll works for which business: their salaries go there. */
function StaffList({ canEdit }: { canEdit: boolean }) {
  const qc = useQueryClient();
  const { data } = useActionQuery("list-staff", {});
  const setStaff = useActionMutation("set-staff-business");
  const staff = data?.staff ?? [];
  if (!staff.length) return null;
  const title = (s: string) =>
    s.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
  return (
    <div className="space-y-2 pt-6">
      <h3 className="text-sm font-medium">Staff</h3>
      <p className="text-sm text-muted-foreground">
        Each person&apos;s salary is filed under the business they work for.
      </p>
      {staff.map((p) => (
        <div key={p.payee} className="flex items-center justify-between gap-3">
          <span className="text-sm">{title(p.payee)}</span>
          <Select
            disabled={!canEdit}
            value={p.business}
            onValueChange={(business) => {
              qc.setQueryData(
                ["action", "list-staff", {}],
                (old: typeof data) =>
                  old
                    ? {
                        staff: old.staff.map((x) =>
                          x.payee === p.payee ? { ...x, business } : x,
                        ),
                      }
                    : old,
              );
              setStaff.mutate(
                { payee: p.payee, business: business as "lounge" | "hub" },
                { onError: (e) => toast.error(e.message) },
              );
            }}
          >
            <SelectTrigger className="w-44">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="lounge">Restaurant &amp; Lounge</SelectItem>
              <SelectItem value="hub">Hub</SelectItem>
            </SelectContent>
          </Select>
        </div>
      ))}
    </div>
  );
}

/** How to write the note on a transfer so Books files it without guessing. */
function TransferNotes() {
  const stock = NARRATION_TAGS.filter((t) => t.stockGroup);
  const running = NARRATION_TAGS.filter(
    (t) => t.business !== null && !t.stockGroup,
  );
  const notCosts = NARRATION_TAGS.filter((t) => t.business === null);
  const table = (rows: typeof NARRATION_TAGS) => (
    <div className="divide-y divide-border rounded-lg border border-border">
      {rows.map((t) => (
        <div
          key={t.tag}
          className="grid gap-1 px-3 py-2 text-sm sm:grid-cols-[7rem_1fr]"
        >
          <span className="font-mono text-xs font-semibold">{t.tag}</span>
          <span className="min-w-0">
            {t.stockGroup ? stockKeyName(t.stockGroup) : t.category}
            <span className="block break-words font-mono text-xs text-muted-foreground sm:truncate">
              {t.example}
            </span>
          </span>
        </div>
      ))}
    </div>
  );
  return (
    <div className="space-y-5">
      <div className="space-y-3">
        <p className="text-sm text-muted-foreground">
          Write the narration on every transfer like this, and Books files the
          expense under the right category and business by itself. Nothing is
          left to review.
        </p>
        <div className="rounded-lg border border-border bg-muted/40 px-4 py-3">
          <div className="font-mono text-sm">
            <span className="font-semibold">HUB</span>{" "}
            <span className="font-semibold">REPAIR</span> door lock and hinges
          </div>
          <div className="mt-2 grid gap-1 text-xs text-muted-foreground sm:grid-cols-3">
            <span>
              <span className="font-medium text-foreground">1. Business</span>{" "}
              LOUNGE or HUB. Leave it out for the usual one: diesel, repairs and
              internet are the Hub&apos;s, the rest the Lounge&apos;s.
            </span>
            <span>
              <span className="font-medium text-foreground">2. Tag</span> one
              word from the list, in CAPITALS.
            </span>
            <span>
              <span className="font-medium text-foreground">3. What for</span> a
              few words. Keep it short.
            </span>
          </div>
        </div>
        <Button
          size="sm"
          variant="outline"
          onClick={() =>
            navigator.clipboard
              .writeText(narrationGuide())
              .then(() => toast.success("Copied. Paste it into WhatsApp."))
              .catch(() => toast.error("Couldn't copy"))
          }
        >
          <IconCopy className="mr-2 h-4 w-4" /> Copy the guide for WhatsApp
        </Button>
      </div>
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Lounge stock, by menu group</h3>
        <p className="text-xs text-muted-foreground">
          One payment per group, with the amount on each line. Nylon, serviette
          and transport are counted as Shared; gas goes with the group it is
          written under.
        </p>
        {table(stock)}
      </div>
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Running costs</h3>
        {table(running)}
      </div>
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Money that isn't a running cost</h3>
        <p className="text-xs text-muted-foreground">
          Kept in the list but left out of expenses and profit. No business
          needed.
        </p>
        {table(notCosts)}
      </div>
    </div>
  );
}

export function meta() {
  return [{ title: "Settings · Books" }];
}

type Person = {
  name: string;
  email?: string;
  whatsapp?: string;
  role: "owner" | "partner";
};

export default function SettingsPage() {
  useSetPageTitle("Settings");
  const [params, setParams] = useSearchParams();
  const qc = useQueryClient();
  const { data } = useActionQuery("get-settings", {});
  // On a phone the tabs scroll sideways: keep the open one in view.
  const tabs = useRef<HTMLDivElement>(null);
  const tab = params.get("tab") ?? "people";
  useEffect(() => {
    tabs.current
      ?.querySelector<HTMLElement>('[role="tab"][data-state="active"]')
      ?.scrollIntoView({ inline: "center", block: "nearest" });
  }, [tab, !!data]);
  const save = useActionMutation("update-settings");
  const mapCategory = useActionMutation("set-category-business");
  const setUp = useActionMutation("set-up-digests");
  const [people, setPeople] = useState<Person[]>([]);
  const [limits, setLimits] = useState({
    houseLeakagesPerDay: "",
    largeExpense: "",
    spikePct: "",
  });

  useEffect(() => {
    if (!data) return;
    setPeople(data.recipients as Person[]);
    setLimits({
      houseLeakagesPerDay: String(data.thresholds.houseLeakagesPerDay / 100),
      largeExpense: String(data.thresholds.largeExpense / 100),
      spikePct: String(data.thresholds.spikePct),
    });
  }, [data]);

  if (!data) return null;
  const canEdit = data.canEdit;
  const done = {
    onSuccess: () => toast.success("Saved"),
    onError: (e: Error) => toast.error(e.message),
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6">
      <Tabs
        value={params.get("tab") ?? "people"}
        onValueChange={(tab) => setParams({ tab }, { replace: true })}
      >
        <TabsList
          ref={tabs}
          className="max-w-full justify-start overflow-x-auto"
        >
          <TabsTrigger value="people">People</TabsTrigger>
          <TabsTrigger value="notes">Transfer notes</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="limits">Limits</TabsTrigger>
          <TabsTrigger value="assistant">Assistant</TabsTrigger>
          <TabsTrigger value="connections">Connections</TabsTrigger>
        </TabsList>

        <TabsContent value="people" className="max-w-2xl space-y-4 pt-4">
          <p className="text-sm text-muted-foreground">
            Who gets the digests. Their WhatsApp number is also the number Books
            listens to for them; a partner can ask questions but not change
            anything.
          </p>
          {people.map((p, i) => (
            <div
              key={i}
              className="grid grid-cols-[1fr_1fr_1fr_7rem_2rem] items-end gap-2"
            >
              {(["name", "email", "whatsapp"] as const).map((field) => (
                <div key={field} className="space-y-1">
                  {i === 0 && (
                    <Label className="text-xs capitalize text-muted-foreground">
                      {field === "whatsapp" ? "WhatsApp" : field}
                    </Label>
                  )}
                  <Input
                    disabled={!canEdit}
                    value={p[field] ?? ""}
                    onChange={(e) =>
                      setPeople(
                        people.map((x, j) =>
                          j === i ? { ...x, [field]: e.target.value } : x,
                        ),
                      )
                    }
                  />
                </div>
              ))}
              <Select
                disabled={!canEdit}
                value={p.role}
                onValueChange={(role) =>
                  setPeople(
                    people.map((x, j) =>
                      j === i ? { ...x, role: role as Person["role"] } : x,
                    ),
                  )
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="owner">Owner</SelectItem>
                  <SelectItem value="partner">Partner</SelectItem>
                </SelectContent>
              </Select>
              {canEdit && (
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Remove"
                  onClick={() => setPeople(people.filter((_, j) => j !== i))}
                >
                  <IconTrash className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
          {canEdit && (
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setPeople([...people, { name: "", role: "partner" }])
                }
              >
                <IconPlus className="mr-1 h-4 w-4" /> Add person
              </Button>
              <Button
                size="sm"
                onClick={() =>
                  save.mutate(
                    {
                      people: people
                        .filter((p) => p.name.trim())
                        .map((p) => ({
                          ...p,
                          email: p.email || undefined,
                          whatsapp: p.whatsapp || undefined,
                        })),
                    },
                    done,
                  )
                }
              >
                Save
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="notes" className="max-w-2xl pt-4">
          <TransferNotes />
        </TabsContent>

        <TabsContent value="categories" className="max-w-md space-y-2 pt-4">
          <p className="text-sm text-muted-foreground">
            Which business each Moniebook category belongs to.
          </p>
          {data.itemCategories.map((c) => (
            <div
              key={c.name}
              className="flex items-center justify-between gap-3"
            >
              <span className="text-sm">{c.name}</span>
              <Select
                disabled={!canEdit}
                value={c.business ?? undefined}
                onValueChange={(business) => {
                  qc.setQueryData(
                    ["action", "get-settings", {}],
                    (old: typeof data) =>
                      old
                        ? {
                            ...old,
                            itemCategories: old.itemCategories.map((x) =>
                              x.name === c.name ? { ...x, business } : x,
                            ),
                          }
                        : old,
                  );
                  mapCategory.mutate(
                    {
                      category: c.name,
                      business: business as "lounge" | "hub",
                    },
                    { onError: (e) => toast.error(e.message) },
                  );
                }}
              >
                <SelectTrigger className="w-44">
                  <SelectValue placeholder="Choose" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lounge">
                    Restaurant &amp; Lounge
                  </SelectItem>
                  <SelectItem value="hub">Hub</SelectItem>
                </SelectContent>
              </Select>
            </div>
          ))}
          <StaffList canEdit={canEdit} />
        </TabsContent>

        <TabsContent value="limits" className="max-w-md space-y-4 pt-4">
          {(
            [
              [
                "houseLeakagesPerDay",
                "Flag The House + leakages above (₦ a day, at cost)",
              ],
              ["largeExpense", "Flag any expense above (₦)"],
              ["spikePct", "Flag a cost this % above its usual level"],
            ] as const
          ).map(([key, label]) => (
            <div key={key} className="space-y-1.5">
              <Label htmlFor={key}>{label}</Label>
              <Input
                id={key}
                inputMode="decimal"
                disabled={!canEdit}
                value={limits[key]}
                onChange={(e) =>
                  setLimits({ ...limits, [key]: e.target.value })
                }
              />
            </div>
          ))}
          {canEdit && (
            <Button
              size="sm"
              onClick={() =>
                save.mutate(
                  {
                    thresholds: {
                      houseLeakagesPerDay: Number(limits.houseLeakagesPerDay),
                      largeExpense: Number(limits.largeExpense),
                      spikePct: Number(limits.spikePct),
                    },
                  },
                  done,
                )
              }
            >
              Save
            </Button>
          )}
        </TabsContent>

        <TabsContent value="assistant" className="max-w-md pt-4">
          <AssistantSettings canEdit={canEdit} />
        </TabsContent>

        <TabsContent
          value="connections"
          className="max-w-md space-y-3 pt-4 text-sm"
        >
          {(
            [
              ["WhatsApp number", data.connections.whatsapp],
              ["Moniepoint payments", data.connections.moniepoint],
              ["Daily safety-net schedule", data.connections.cron],
              ["Digests switched on", data.connections.digestJob],
            ] as const
          ).map(([label, on]) => (
            <div key={label} className="flex justify-between">
              <span>{label}</span>
              <span className={on ? "" : "text-muted-foreground"}>
                {on ? "Connected" : "Not yet"}
              </span>
            </div>
          ))}
          {canEdit && !data.connections.digestJob && (
            <Button size="sm" onClick={() => setUp.mutate({}, done)}>
              Switch on digests
            </Button>
          )}
          <p className="text-xs text-muted-foreground">
            Keys for WhatsApp and Moniepoint are added in the setup checklist.
            Books organisation id:{" "}
            <code className="select-all">{data.orgId}</code>
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
