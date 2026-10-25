import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { agentNativePath } from "@agent-native/core/client";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useNavigationState } from "@/hooks/use-navigation-state";
import {
  NOTIFICATIONS_KEY,
  useNotifications,
  type NotificationItem,
} from "@/hooks/use-notifications";
import { cn } from "@/lib/utils";
import {
  disablePush,
  enablePush,
  isSubscribed,
  pushSupport,
  type PushSupport,
} from "@/lib/push-client";
import { useState } from "react";

const ACTIONS = "/_agent-native/actions";

async function call(name: string, method: string, body?: unknown) {
  const res = await fetch(agentNativePath(`${ACTIONS}/${name}`), {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new Error(`${name} failed`);
  return res.json();
}

function ago(iso: string): string {
  const minutes = Math.round((Date.now() - Date.parse(iso)) / 60_000);
  if (!Number.isFinite(minutes) || minutes < 1) return "just now";
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours} h ago`;
  const days = Math.round(hours / 24);
  return `${days} day${days === 1 ? "" : "s"} ago`;
}

export function NotificationsPage({
  role,
}: {
  role: "admin" | "teacher" | "student";
}) {
  const { sync } = useNavigationState();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const { items, unread, isLoading } = useNotifications();

  useEffect(() => {
    sync({ role, view: "notifications" } as any);
  }, [sync, role]);

  const markRead = (ids?: string[]) => {
    // The screen changes first; the server catches up.
    qc.setQueryData(NOTIFICATIONS_KEY, (old: any) => {
      if (!old) return old;
      const now = new Date().toISOString();
      const items = old.items.map((n: NotificationItem) =>
        !n.readAt && (!ids || ids.includes(n.id)) ? { ...n, readAt: now } : n,
      );
      return { items, unread: items.filter((n: any) => !n.readAt).length };
    });
    call("mark-notifications-read", "POST", ids ? { ids } : {}).catch(() =>
      qc.invalidateQueries({ queryKey: NOTIFICATIONS_KEY }),
    );
  };

  return (
    <div className="h-full overflow-auto p-4 sm:p-6">
      <div className="mx-auto max-w-2xl space-y-6">
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-xl font-semibold">Notifications</h1>
          {unread > 0 ? (
            <Button variant="outline" size="sm" onClick={() => markRead()}>
              Mark all read
            </Button>
          ) : null}
        </div>

        {isLoading ? null : items.length === 0 ? (
          <p className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
            Nothing yet. Announcements, work due soon and work waiting to be
            marked will show up here.
          </p>
        ) : (
          <ul className="divide-y rounded-lg border bg-card">
            {items.map((n) => (
              <li key={n.id}>
                <button
                  type="button"
                  onClick={() => {
                    if (!n.readAt) markRead([n.id]);
                    if (n.link) navigate(n.link);
                  }}
                  className={cn(
                    "flex w-full items-start gap-3 px-4 py-3 text-left text-sm transition-colors hover:bg-muted/40",
                    !n.link && "cursor-default",
                  )}
                >
                  <span
                    className={cn(
                      "mt-1.5 h-2 w-2 shrink-0 rounded-full",
                      n.readAt ? "bg-transparent" : "bg-primary",
                    )}
                    aria-hidden
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block font-medium">{n.title}</span>
                    {n.body ? (
                      <span className="mt-0.5 block whitespace-pre-line text-xs text-muted-foreground">
                        {n.body}
                      </span>
                    ) : null}
                    <span className="mt-1 block text-[11px] text-muted-foreground/80">
                      {ago(n.createdAt)}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}

        <HowToHear />
      </div>
    </div>
  );
}

/** How this person wants to hear: kept small, and below the list. */
function HowToHear() {
  const qc = useQueryClient();
  const { data } = useQuery<{
    emailDigest: "off" | "daily";
    push: "on" | "off";
    schoolSendsEmailDigests: boolean;
  }>({
    queryKey: ["my-notification-settings"],
    queryFn: () => call("update-my-notifications", "PUT", {}),
  });
  const change = useMutation({
    mutationFn: (patch: { emailDigest?: string; push?: string }) =>
      call("update-my-notifications", "PUT", patch),
    onMutate: async (patch) => {
      qc.setQueryData(["my-notification-settings"], (old: any) =>
        old ? { ...old, ...patch } : old,
      );
    },
    onSettled: () =>
      qc.invalidateQueries({ queryKey: ["my-notification-settings"] }),
  });
  if (!data) return null;
  return (
    <section className="space-y-3 rounded-lg border p-4">
      <h2 className="text-sm font-medium">How you hear</h2>
      <label className="flex items-start justify-between gap-4 text-sm">
        <span>
          Daily email
          <span className="mt-0.5 block text-xs text-muted-foreground">
            {data.schoolSendsEmailDigests
              ? "One email a day with what is new, only on days there is something."
              : "Your school has not turned email on."}
          </span>
        </span>
        <Switch
          checked={data.emailDigest === "daily"}
          disabled={!data.schoolSendsEmailDigests}
          onCheckedChange={(on) =>
            change.mutate({ emailDigest: on ? "daily" : "off" })
          }
        />
      </label>
      <PushToggle />
    </section>
  );
}

/** Notifications on this phone or computer, when it can and the school allows. */
function PushToggle() {
  const [support, setSupport] = useState<PushSupport | null>(null);
  const [on, setOn] = useState(false);
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    pushSupport()
      .then(async (s) => {
        setSupport(s);
        setOn(s === "ready" ? await isSubscribed() : false);
      })
      .catch(() => setSupport("unsupported"));
  }, []);
  if (!support || support === "off" || support === "unsupported") return null;
  const hint =
    support === "install"
      ? "On an iPhone, add this app to your Home Screen first (Share, then Add to Home Screen), then open it from there."
      : support === "denied"
        ? "Notifications are blocked for this site in your browser settings."
        : "A message on this device when something new arrives.";
  return (
    <label className="flex items-start justify-between gap-4 text-sm">
      <span>
        On this device
        <span className="mt-0.5 block text-xs text-muted-foreground">
          {hint}{" "}
          {support === "install" ? (
            <a href="/install" className="text-primary hover:underline">
              Show me how
            </a>
          ) : null}
        </span>
      </span>
      <Switch
        checked={on}
        disabled={busy || support !== "ready"}
        onCheckedChange={async (want) => {
          setBusy(true);
          try {
            if (want) setOn(await enablePush());
            else {
              await disablePush();
              setOn(false);
            }
          } finally {
            setBusy(false);
          }
        }}
      />
    </label>
  );
}
