import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import { IconPlus, IconTrash } from "@tabler/icons-react";
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
    <div className="flex-1 overflow-y-auto p-6">
      <Tabs
        value={params.get("tab") ?? "people"}
        onValueChange={(tab) => setParams({ tab }, { replace: true })}
      >
        <TabsList>
          <TabsTrigger value="people">People</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="limits">Limits</TabsTrigger>
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
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
