import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { agentNativePath } from "@agent-native/core/client";
import { IconLoader2, IconMessage } from "@tabler/icons-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRole } from "@/hooks/use-role";

/** Asks the chat panel to check again whether an assistant is configured. */
function announceConfigured() {
  window.dispatchEvent(new CustomEvent("agent-engine:configured-changed"));
}

/** The school's Anthropic key: one field, saved for everyone in the school. */
export function AssistantKeyForm({
  submitLabel = "Save key",
  onSaved,
}: {
  submitLabel?: string;
  onSaved?: () => void;
}) {
  const queryClient = useQueryClient();
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
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ key: value }),
        },
      );
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        setError(
          body?.error ?? "The key could not be saved. Please try again.",
        );
        return;
      }
      setValue("");
      toast.success("Assistant switched on");
      queryClient.invalidateQueries({ queryKey: ["assistant-status"] });
      announceConfigured();
      onSaved?.();
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
          {saving ? <IconLoader2 size={14} className="animate-spin" /> : null}
          {submitLabel}
        </Button>
      </div>
      {error ? <p className="text-xs text-destructive">{error}</p> : null}
    </form>
  );
}

/** Whether the assistant has a key, for the settings row. */
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

/**
 * Shown in the chat panel until the school has a key. The admin pastes it
 * here; anyone else is told who can switch the assistant on.
 */
export function AssistantSetupCard() {
  const { role } = useRole();
  const isAdmin = role === "school_admin";

  return (
    <div className="mx-4 my-6 rounded-lg border bg-card p-5">
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted">
          <IconMessage size={18} className="text-muted-foreground" />
        </div>
        <div className="min-w-0">
          <h3 className="text-sm font-medium">
            {isAdmin
              ? "Switch on the school assistant"
              : "The assistant isn't switched on yet"}
          </h3>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            {isAdmin
              ? "Add your school's Anthropic API key. Everyone in the school uses it, and it is stored encrypted."
              : "Your school administrator can switch it on in Settings, under Assistant."}
          </p>
        </div>
      </div>
      {isAdmin ? (
        <div className="mt-4 space-y-3">
          <AssistantKeyForm />
          <p className="text-xs text-muted-foreground">
            Get a key at{" "}
            <a
              href="https://console.anthropic.com/settings/keys"
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-2 hover:text-foreground"
            >
              console.anthropic.com
            </a>
            .
          </p>
        </div>
      ) : null}
    </div>
  );
}
