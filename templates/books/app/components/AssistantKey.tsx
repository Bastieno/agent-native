import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { agentNativePath, useActionQuery } from "@agent-native/core/client";
import { IconLoader2, IconMessage } from "@tabler/icons-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/** Asks the chat panel to check again whether the assistant has a key. */
const announceConfigured = () =>
  window.dispatchEvent(new CustomEvent("agent-engine:configured-changed"));

/** One field: the Anthropic key, saved for the owner and partner. */
export function AssistantKeyForm({
  submitLabel = "Save key",
}: {
  submitLabel?: string;
}) {
  const qc = useQueryClient();
  const [value, setValue] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!value.trim() || saving) return;
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(
        agentNativePath("/_agent-native/actions/save-assistant-key"),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Agent-Native-CSRF": "1",
          },
          body: JSON.stringify({ key: value }),
        },
      );
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        setError(body?.error ?? "The key could not be saved. Try again.");
        return;
      }
      setValue("");
      toast.success("Assistant switched on");
      qc.invalidateQueries({ queryKey: ["assistant-status"] });
      announceConfigured();
    } catch {
      setError("The key could not be saved. Check your connection.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-2">
      <div className="flex gap-2">
        <Input
          type="password"
          autoComplete="off"
          spellCheck={false}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="sk-ant-…"
          aria-label="Anthropic API key"
          className="h-9 min-w-0 flex-1"
        />
        <Button type="submit" size="sm" disabled={!value.trim() || saving}>
          {saving && <IconLoader2 className="mr-1 h-3.5 w-3.5 animate-spin" />}
          {submitLabel}
        </Button>
      </div>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </form>
  );
}

/** Whether the assistant has a key to run on. */
export function useAssistantConnected() {
  return useQuery<boolean>({
    queryKey: ["assistant-status"],
    queryFn: async () => {
      const res = await fetch(
        agentNativePath("/_agent-native/agent-engine/status"),
      );
      if (!res.ok) return false;
      const data = await res.json().catch(() => null);
      return data?.configured === true;
    },
  });
}

const KeyLink = () => (
  <a
    href="https://console.anthropic.com/settings/keys"
    target="_blank"
    rel="noreferrer"
    className="underline underline-offset-2 hover:text-foreground"
  >
    console.anthropic.com
  </a>
);

/**
 * Shown in the chat panel until the assistant has a key. The owner pastes it
 * here; the partner is told the owner switches it on.
 */
export function AssistantSetupCard() {
  const { data } = useActionQuery("get-settings", {});
  const owner = !!data?.canEdit;
  return (
    <div className="mx-4 my-6 rounded-lg border bg-card p-5">
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted">
          <IconMessage className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="min-w-0">
          <h3 className="text-sm font-medium">
            {owner
              ? "Switch on the assistant"
              : "The assistant isn't switched on yet"}
          </h3>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            {owner
              ? "Add your Anthropic API key. You and your partner both use it, and it is stored encrypted."
              : "The owner can switch it on in Settings, under Assistant."}
          </p>
        </div>
      </div>
      {owner && (
        <div className="mt-4 space-y-3">
          <AssistantKeyForm />
          <p className="text-xs text-muted-foreground">
            Get a key at <KeyLink />.
          </p>
        </div>
      )}
    </div>
  );
}

/** Settings → Assistant: whether it is on, which models, and the key. */
export function AssistantSettings({ canEdit }: { canEdit: boolean }) {
  const { data: connected, isLoading } = useAssistantConnected();
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between rounded-lg border border-border px-4 py-3 text-sm">
        <span>Assistant</span>
        <span className={connected ? "" : "text-muted-foreground"}>
          {isLoading ? "…" : connected ? "On" : "Not switched on"}
        </span>
      </div>
      <div className="space-y-1 text-sm">
        <p className="text-muted-foreground">
          The owner's questions run on Claude Sonnet 5.5; the partner, who only
          reads, on Claude Haiku 5.5, which costs less.
        </p>
      </div>
      {canEdit && (
        <div className="space-y-2">
          <p className="text-sm font-medium">
            {connected ? "Replace the key" : "Add your Anthropic API key"}
          </p>
          <AssistantKeyForm submitLabel={connected ? "Replace" : "Save key"} />
          <p className="text-xs text-muted-foreground">
            Get a key at <KeyLink />. It is stored encrypted and used only by
            Books.
          </p>
        </div>
      )}
    </div>
  );
}
