import { useCallback, useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { agentNativePath } from "@agent-native/core/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { httpError } from "@/lib/http-error";
import { pollDelay } from "@/lib/poll-pace";
import { parsePrimary } from "@shared/theme-colour";

type Preview = {
  primary: string;
  primaryForeground: string;
  note?: string | null;
};

const KEY = "ellai-colour-preview";
const STATE = "/_agent-native/application-state/colour-preview";
/** A preview nobody answered is dropped after this long. */
const MAX_AGE_MS = 30 * 60_000;

function stored(): Preview | null {
  try {
    const raw = sessionStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Preview) : null;
  } catch {
    return null;
  }
}

/**
 * A colour shown to one person before the school takes it.
 *
 * It comes from two places: the assistant (it writes the person's own
 * application state) and a link from their own AI app (`?previewColour=`,
 * kept for this tab only). Either way only this person's screen changes, a
 * bar offers Keep or Undo, and nothing is saved until Keep.
 */
export function ColourPreviewBar() {
  const qc = useQueryClient();
  const [fromLink, setFromLink] = useState<Preview | null>(null);
  const [busy, setBusy] = useState(false);

  // A link from an outside app: read it once, remember it for this tab, and
  // take it out of the address so a reload or a copied address does not carry it.
  useEffect(() => {
    try {
      const url = new URL(window.location.href);
      const raw = url.searchParams.get("previewColour");
      if (raw) {
        const parsed = parsePrimary(raw);
        if (parsed.ok) {
          const p: Preview = {
            primary: parsed.primary,
            primaryForeground: parsed.primaryForeground,
            note: parsed.note ?? null,
          };
          sessionStorage.setItem(KEY, JSON.stringify(p));
          setFromLink(p);
        }
        url.searchParams.delete("previewColour");
        window.history.replaceState(null, "", url.toString());
      } else {
        setFromLink(stored());
      }
    } catch {
      // The preview is a courtesy; the page works without it.
    }
  }, []);

  const { data: fromAssistant } = useQuery<Preview | null>({
    queryKey: ["colour-preview"],
    queryFn: async () => {
      const res = await fetch(agentNativePath(STATE));
      if (res.status === 404) return null;
      if (!res.ok) throw await httpError(res);
      const text = await res.text();
      if (!text.trim()) return null;
      const body = JSON.parse(text) as Preview & { at?: number };
      if (body.at && Date.now() - body.at > MAX_AGE_MS) return null;
      return body;
    },
    refetchInterval: () => pollDelay(4_000),
    structuralSharing: false,
  });

  const preview = fromAssistant ?? fromLink;

  const drop = useCallback(async () => {
    try {
      sessionStorage.removeItem(KEY);
    } catch {
      // Nothing to remove.
    }
    setFromLink(null);
    qc.setQueryData(["colour-preview"], null);
    await fetch(agentNativePath(STATE), { method: "DELETE" }).catch(() => {});
  }, [qc]);

  // Paint the preview over the school's own colour, for this screen only.
  useEffect(() => {
    if (!preview) return;
    const style = document.createElement("style");
    style.setAttribute("data-colour-preview", "");
    style.textContent = `:root {
  --primary: ${preview.primary};
  --sidebar-primary: ${preview.primary};
  --ring: ${preview.primary};
  --primary-foreground: ${preview.primaryForeground};
  --sidebar-primary-foreground: ${preview.primaryForeground};
}`;
    document.head.appendChild(style);
    return () => style.remove();
  }, [preview?.primary, preview?.primaryForeground]);

  if (!preview) return null;

  async function keep() {
    if (!preview) return;
    setBusy(true);
    try {
      const res = await fetch(
        agentNativePath("/_agent-native/actions/update-school-config"),
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ theme: { primary: preview.primary } }),
        },
      );
      if (!res.ok) throw await httpError(res);
      await qc.invalidateQueries({ queryKey: ["school-config"] });
      await drop();
      toast.success("The school colour is changed");
    } catch {
      toast.error("Could not save the colour");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div
      role="status"
      className="fixed inset-x-3 bottom-3 z-50 mx-auto flex max-w-xl flex-wrap items-center justify-between gap-3 rounded-lg border bg-card px-4 py-3 text-sm shadow-lg"
    >
      <div className="min-w-0">
        <p className="font-medium">Trying this colour</p>
        <p className="text-xs text-muted-foreground">
          Only you can see it.{preview.note ? ` ${preview.note}` : ""}
        </p>
      </div>
      <div className="flex gap-2">
        <Button variant="ghost" size="sm" onClick={drop} disabled={busy}>
          Undo
        </Button>
        <Button size="sm" onClick={keep} disabled={busy}>
          Keep this colour
        </Button>
      </div>
    </div>
  );
}
