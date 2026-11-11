import { useCallback, useEffect, useState } from "react";
import {
  IconCheck,
  IconCopy,
  IconPlus,
  IconRefresh,
} from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

/**
 * Ellai's own console: the schools, their credit, and a form to create one.
 * Only on the shared address, only for the operators in ELLAI_OPERATOR_EMAILS;
 * everywhere else the routes answer 404. It is a plain page with no providers
 * of the school app around it, because it belongs to no school.
 */
export const handle = { publicPage: true };

interface School {
  id: string;
  name: string;
  host: string | null;
  head: string | null;
  mode: "managed" | "byo" | "none";
  credits: number;
  staffRequests: number;
  spent30: number;
  daysLeft: number | null;
  low: boolean;
  out: boolean;
}
interface LedgerEntry {
  id: string;
  kind: string;
  amountCc: number;
  paymentRef: string | null;
  note: string | null;
  createdBy: string;
  createdAt: string;
}
interface TopUp {
  id: string;
  schoolId: string;
  schoolName: string;
  requestedBy: string;
  credits: number | null;
  reference: string | null;
  note: string | null;
  status: string;
  createdAt: string;
}
interface Created {
  orgId: string;
  name: string;
  host: string | null;
  inviteUrl: string;
  emailed: boolean;
  emailError: string | null;
  starterCredits: number;
}

async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(path, {
    credentials: "same-origin",
    ...init,
    headers: { "content-type": "application/json", ...init?.headers },
  });
  const body = await res.json().catch(() => null);
  if (!res.ok) {
    const err = new Error(
      body?.statusMessage ||
        body?.statusText ||
        body?.message ||
        `Failed (${res.status})`,
    ) as Error & { status?: number };
    err.status = res.status;
    throw err;
  }
  return body as T;
}

const n = (v: number) => v.toLocaleString("en");
const day = (iso: string) => new Date(iso).toLocaleDateString("en-GB");

function Status({ s }: { s: School }) {
  if (s.mode !== "managed") {
    return (
      <Badge variant="outline">
        {s.mode === "byo" ? "Own key" : "No billing"}
      </Badge>
    );
  }
  if (s.out) return <Badge variant="destructive">Out of credit</Badge>;
  if (s.low) return <Badge variant="secondary">Low</Badge>;
  return <Badge variant="outline">On credit</Badge>;
}

export default function Operator() {
  const [state, setState] = useState<
    "loading" | "signin" | "denied" | "ok" | "error"
  >("loading");
  const [me, setMe] = useState<{ email: string; baseDomain: string } | null>(
    null,
  );
  const [schools, setSchools] = useState<School[]>([]);
  const [topUps, setTopUps] = useState<TopUp[]>([]);
  const [openId, setOpenId] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);

  const load = useCallback(async () => {
    try {
      const [who, list, tops] = await Promise.all([
        api<{ email: string; baseDomain: string }>("/api/operator/me"),
        api<{ schools: School[] }>("/api/operator/schools"),
        api<{ requests: TopUp[] }>("/api/operator/top-ups"),
      ]);
      setMe(who);
      setSchools(list.schools);
      setTopUps(tops.requests);
      setState("ok");
    } catch (err) {
      const status = (err as { status?: number }).status;
      setState(status === 401 ? "signin" : status === 404 ? "denied" : "error");
    }
  }, []);
  useEffect(() => {
    void load();
  }, [load]);

  if (state === "loading") {
    return <p className="p-8 text-sm text-muted-foreground">Loading</p>;
  }
  if (state === "signin") {
    return <SignIn onDone={() => void load()} />;
  }
  if (state === "denied") {
    return (
      <main className="mx-auto max-w-md p-8">
        <h1 className="text-lg font-semibold">Page not found</h1>
      </main>
    );
  }
  if (state === "error") {
    return (
      <main className="mx-auto max-w-md space-y-3 p-8">
        <h1 className="text-lg font-semibold">Something went wrong</h1>
        <Button variant="outline" onClick={() => void load()}>
          Try again
        </Button>
      </main>
    );
  }

  const pending = topUps.filter((t) => t.status === "pending");

  return (
    <main className="mx-auto max-w-5xl space-y-6 p-4 sm:p-8">
      <header className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold">Operator</h1>
          <p className="text-sm text-muted-foreground">{me?.email}</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={async () => {
              await api("/api/operator/logout", { method: "POST" }).catch(
                () => {},
              );
              setState("signin");
            }}
          >
            Sign out
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => void load()}
            aria-label="Refresh"
          >
            <IconRefresh size={16} />
          </Button>
          <Button onClick={() => setCreating(true)}>
            <IconPlus size={16} className="mr-1.5" />
            New school
          </Button>
        </div>
      </header>

      <Tabs defaultValue="schools">
        <TabsList>
          <TabsTrigger value="schools">Schools ({schools.length})</TabsTrigger>
          <TabsTrigger value="top-ups">
            Top-up requests{pending.length ? ` (${pending.length})` : ""}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="schools" className="mt-4">
          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full text-sm">
              <thead className="border-b bg-muted/40 text-left text-xs text-muted-foreground">
                <tr>
                  <th className="p-3 font-medium">School</th>
                  <th className="p-3 font-medium">Credits</th>
                  <th className="p-3 font-medium">30-day use</th>
                  <th className="p-3 font-medium">Days left</th>
                  <th className="p-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {schools.map((s) => (
                  <tr
                    key={s.id}
                    className="cursor-pointer border-b last:border-0 hover:bg-muted/40"
                    onClick={() => setOpenId(s.id)}
                  >
                    <td className="p-3">
                      <div className="font-medium">{s.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {s.host ?? "no address"}
                      </div>
                    </td>
                    <td className="p-3 tabular-nums">
                      {s.mode === "managed" ? n(s.credits) : "-"}
                    </td>
                    <td className="p-3 tabular-nums">
                      {s.mode === "managed" ? n(s.spent30) : "-"}
                    </td>
                    <td className="p-3 tabular-nums">
                      {s.daysLeft == null ? "-" : n(s.daysLeft)}
                    </td>
                    <td className="p-3">
                      <Status s={s} />
                    </td>
                  </tr>
                ))}
                {schools.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="p-6 text-center text-muted-foreground"
                    >
                      No schools yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </TabsContent>

        <TabsContent value="top-ups" className="mt-4">
          <ul className="divide-y rounded-lg border text-sm">
            {topUps.map((t) => (
              <li
                key={t.id}
                className="flex cursor-pointer items-start justify-between gap-3 p-3 hover:bg-muted/40"
                onClick={() => setOpenId(t.schoolId)}
              >
                <div>
                  <div className="font-medium">{t.schoolName}</div>
                  <div className="text-xs text-muted-foreground">
                    {t.requestedBy} on {day(t.createdAt)}
                    {t.credits ? `, ${n(t.credits)} credits` : ""}
                    {t.reference ? `, ref ${t.reference}` : ""}
                  </div>
                  {t.note && <div className="mt-1">{t.note}</div>}
                </div>
                <Badge
                  variant={t.status === "pending" ? "secondary" : "outline"}
                >
                  {t.status === "pending" ? "Waiting" : "Granted"}
                </Badge>
              </li>
            ))}
            {topUps.length === 0 && (
              <li className="p-6 text-center text-muted-foreground">
                No requests.
              </li>
            )}
          </ul>
        </TabsContent>
      </Tabs>

      <SchoolSheet
        id={openId}
        onClose={() => setOpenId(null)}
        onChanged={() => void load()}
      />
      <NewSchool
        open={creating}
        baseDomain={me?.baseDomain ?? "ellai.dev"}
        onClose={() => setCreating(false)}
        onCreated={() => void load()}
      />
    </main>
  );
}

function SignIn({ onDone }: { onDone: () => void }) {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function ask() {
    setBusy(true);
    setError(null);
    try {
      await api("/api/operator/login/request", {
        method: "POST",
        body: JSON.stringify({ email }),
      });
      setSent(true);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  async function verify() {
    setBusy(true);
    setError(null);
    try {
      await api("/api/operator/login/verify", {
        method: "POST",
        body: JSON.stringify({ email, code }),
      });
      onDone();
    } catch (e) {
      setError((e as Error).message);
      setBusy(false);
    }
  }

  return (
    <main className="mx-auto max-w-sm space-y-5 p-6 pt-24">
      <div>
        <h1 className="text-xl font-semibold">Operator</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {sent
            ? `If ${email} is an operator address, a code is on its way. It lasts 10 minutes.`
            : "Sign in with your operator email. We send you a code."}
        </p>
      </div>
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          if (busy) return;
          void (sent ? verify() : ask());
        }}
      >
        <div className="space-y-1.5">
          <Label htmlFor="op-email">Email</Label>
          <Input
            id="op-email"
            type="email"
            autoComplete="email"
            value={email}
            disabled={sent}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {sent && (
          <div className="space-y-1.5">
            <Label htmlFor="op-code">Code</Label>
            <Input
              id="op-code"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              value={code}
              autoFocus
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
        )}
        {error && <p className="text-sm text-destructive">{error}</p>}
        <div className="flex gap-2">
          <Button
            type="submit"
            disabled={busy || !email.trim() || (sent && code.trim().length < 6)}
          >
            {sent
              ? busy
                ? "Checking"
                : "Sign in"
              : busy
                ? "Sending"
                : "Send code"}
          </Button>
          {sent && (
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                setSent(false);
                setCode("");
                setError(null);
              }}
            >
              Use another email
            </Button>
          )}
        </div>
      </form>
    </main>
  );
}

function SchoolSheet({
  id,
  onClose,
  onChanged,
}: {
  id: string | null;
  onClose: () => void;
  onChanged: () => void;
}) {
  const [detail, setDetail] = useState<{
    school: School;
    ledger: LedgerEntry[];
  } | null>(null);
  const [credits, setCredits] = useState("");
  const [ref, setRef] = useState("");
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setDetail(null);
    setError(null);
    setCredits("");
    setRef("");
    setNote("");
    if (!id) return;
    api<{ school: School; ledger: LedgerEntry[] }>(
      `/api/operator/schools/${id}`,
    )
      .then(setDetail)
      .catch((e) => setError(e.message));
  }, [id]);

  async function grant() {
    if (!id) return;
    setBusy(true);
    setError(null);
    try {
      const next = await api<{ school: School; ledger: LedgerEntry[] }>(
        `/api/operator/schools/${id}/grant`,
        {
          method: "POST",
          body: JSON.stringify({
            credits: Number(credits.replace(/,/g, "")),
            paymentRef: ref || undefined,
            note: note || undefined,
          }),
        },
      );
      setDetail(next);
      setCredits("");
      setRef("");
      setNote("");
      onChanged();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  const s = detail?.school;
  return (
    <Sheet open={!!id} onOpenChange={(o) => !o && onClose()}>
      <SheetContent className="w-full overflow-y-auto sm:max-w-md">
        <SheetHeader>
          <SheetTitle>{s?.name ?? "School"}</SheetTitle>
          <SheetDescription>
            {s?.host ?? "no address"}
            {s?.head ? ` - head: ${s.head}` : ""}
          </SheetDescription>
        </SheetHeader>

        {s && (
          <div className="mt-6 space-y-6 text-sm">
            <div className="grid grid-cols-3 gap-3">
              <Stat
                label="Credits"
                value={s.mode === "managed" ? n(s.credits) : "-"}
              />
              <Stat
                label="30-day use"
                value={s.mode === "managed" ? n(s.spent30) : "-"}
              />
              <Stat
                label="Days left"
                value={s.daysLeft == null ? "-" : n(s.daysLeft)}
              />
            </div>
            {s.mode !== "managed" && (
              <p className="text-muted-foreground">
                This school uses its own key. A grant is recorded but nothing is
                spent from it until the school moves to Ellai's credit.
              </p>
            )}

            <form
              className="space-y-3"
              onSubmit={(e) => {
                e.preventDefault();
                void grant();
              }}
            >
              <h3 className="font-medium">Grant credit</h3>
              <div className="space-y-1.5">
                <Label htmlFor="g-credits">Credits</Label>
                <Input
                  id="g-credits"
                  inputMode="numeric"
                  placeholder="10000"
                  value={credits}
                  onChange={(e) => setCredits(e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="g-ref">Payment reference</Label>
                <Input
                  id="g-ref"
                  value={ref}
                  onChange={(e) => setRef(e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="g-note">Note</Label>
                <Input
                  id="g-note"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </div>
              {error && <p className="text-destructive">{error}</p>}
              <Button type="submit" disabled={busy || !credits.trim()}>
                {busy ? "Granting" : "Grant"}
              </Button>
            </form>

            <div>
              <h3 className="mb-2 font-medium">Ledger</h3>
              <ul className="divide-y rounded-lg border">
                {detail!.ledger.map((l) => (
                  <li key={l.id} className="flex justify-between gap-3 p-2.5">
                    <div>
                      <div className="capitalize">{l.kind}</div>
                      <div className="text-xs text-muted-foreground">
                        {day(l.createdAt)} - {l.createdBy}
                        {l.paymentRef ? ` - ${l.paymentRef}` : ""}
                        {l.note ? ` - ${l.note}` : ""}
                      </div>
                    </div>
                    <div className="tabular-nums">
                      {l.amountCc > 0 ? "+" : ""}
                      {n(Math.round(l.amountCc / 10))}
                    </div>
                  </li>
                ))}
                {detail!.ledger.length === 0 && (
                  <li className="p-3 text-muted-foreground">Nothing yet.</li>
                )}
              </ul>
            </div>
          </div>
        )}
        {!s && error && <p className="mt-6 text-destructive">{error}</p>}
      </SheetContent>
    </Sheet>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border p-3">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="text-lg font-semibold tabular-nums">{value}</div>
    </div>
  );
}

function NewSchool({
  open,
  baseDomain,
  onClose,
  onCreated,
}: {
  open: boolean;
  baseDomain: string;
  onClose: () => void;
  onCreated: () => void;
}) {
  const [name, setName] = useState("");
  const [headEmail, setHeadEmail] = useState("");
  const [headName, setHeadName] = useState("");
  const [slug, setSlug] = useState("");
  const [ownKey, setOwnKey] = useState(false);
  const [problem, setProblem] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [created, setCreated] = useState<Created | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!open) return;
    setName("");
    setHeadEmail("");
    setHeadName("");
    setSlug("");
    setOwnKey(false);
    setProblem(null);
    setError(null);
    setCreated(null);
  }, [open]);

  // Check the address as it is typed, once typing pauses.
  useEffect(() => {
    const clean = slug.trim().toLowerCase();
    if (!clean) {
      setProblem(null);
      return;
    }
    const t = setTimeout(() => {
      api<{ ok: boolean; problem: string | null }>(
        `/api/operator/slug-check?slug=${encodeURIComponent(clean)}`,
      )
        .then((r) => setProblem(r.ok ? null : r.problem))
        .catch(() => setProblem(null));
    }, 350);
    return () => clearTimeout(t);
  }, [slug]);

  async function submit() {
    setBusy(true);
    setError(null);
    try {
      const r = await api<Created>("/api/operator/schools", {
        method: "POST",
        body: JSON.stringify({
          name,
          headEmail,
          headName: headName || undefined,
          slug: slug.trim().toLowerCase(),
          ownKey,
        }),
      });
      setCreated(r);
      onCreated();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  const ready =
    name.trim().length > 1 &&
    /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(headEmail.trim()) &&
    slug.trim().length > 2 &&
    !problem;

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-md">
        {created ? (
          <>
            <DialogHeader>
              <DialogTitle>{created.name} is ready</DialogTitle>
              <DialogDescription>
                {created.emailed
                  ? `The invitation was emailed to ${headEmail}.`
                  : `No email went out${created.emailError ? ` (${created.emailError})` : ""}. Send the head this link.`}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-2 text-sm">
              <div className="break-all rounded-md border bg-muted/40 p-2.5">
                {created.inviteUrl}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  void navigator.clipboard.writeText(created.inviteUrl);
                  setCopied(true);
                }}
              >
                {copied ? (
                  <IconCheck size={14} className="mr-1.5" />
                ) : (
                  <IconCopy size={14} className="mr-1.5" />
                )}
                {copied ? "Copied" : "Copy link"}
              </Button>
              {created.starterCredits > 0 && (
                <p className="text-muted-foreground">
                  Starts with {n(created.starterCredits)} credits.
                </p>
              )}
            </div>
            <DialogFooter>
              <Button onClick={onClose}>Done</Button>
            </DialogFooter>
          </>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (ready && !busy) void submit();
            }}
            className="space-y-4"
          >
            <DialogHeader>
              <DialogTitle>New school</DialogTitle>
              <DialogDescription>
                Creates the school and invites its head.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-1.5">
              <Label htmlFor="n-name">School name</Label>
              <Input
                id="n-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="n-slug">Address</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="n-slug"
                  value={slug}
                  placeholder="greenvalley"
                  onChange={(e) => setSlug(e.target.value)}
                />
                <span className="shrink-0 text-sm text-muted-foreground">
                  .{baseDomain}
                </span>
              </div>
              {problem && <p className="text-xs text-destructive">{problem}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="n-email">Head's email</Label>
              <Input
                id="n-email"
                type="email"
                value={headEmail}
                onChange={(e) => setHeadEmail(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="n-hname">Head's name (optional)</Label>
              <Input
                id="n-hname"
                value={headName}
                onChange={(e) => setHeadName(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between gap-3 text-sm">
              <Label htmlFor="n-own" className="font-normal">
                School brings its own key (no starter credit)
              </Label>
              <Switch id="n-own" checked={ownKey} onCheckedChange={setOwnKey} />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={!ready || busy}>
                {busy ? "Creating" : "Create school"}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
