import { useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { agentNativePath } from "@agent-native/core/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { IconPhotoPlus, IconTrash } from "@tabler/icons-react";

/** Matches the server's limit, so a too-large file is refused before upload. */
const MAX_LOGO_BYTES = 48 * 1024;

/**
 * Choose the school's crest.
 *
 * The file is read in the browser and sent as a data URL, so there is no
 * upload endpoint, no bucket and no credentials — the image is simply part of
 * the school's configuration. A school admin has the crest as a file on their
 * laptop or phone, which is why this needs a file picker: an agent cannot read
 * a file off someone's desk.
 */
export function SchoolCrestField({
  currentLogoUrl,
}: {
  currentLogoUrl?: string | null;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const qc = useQueryClient();

  async function save(params: Record<string, unknown>) {
    setBusy(true);
    try {
      const res = await fetch(
        agentNativePath("/_agent-native/actions/set-school-logo"),
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(params),
        },
      );
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error((body as any).error ?? "Request failed");
      // The crest lives in school config, which the header and the print
      // layout both read.
      await qc.invalidateQueries({ queryKey: ["school-config"] });
      toast.success((body as any).message ?? "Saved");
    } catch (e: any) {
      toast.error(e.message ?? "Could not save the crest");
    } finally {
      setBusy(false);
    }
  }

  function onPick(file: File | undefined) {
    if (!file) return;
    // Refuse here as well as on the server: telling someone their 4MB photo is
    // too big before it is read and encoded is quicker and clearer.
    if (file.size > MAX_LOGO_BYTES) {
      toast.error(
        `That file is ${Math.round(file.size / 1024)}KB and the limit is ${
          MAX_LOGO_BYTES / 1024
        }KB. Resize it — 256×256 is plenty for a crest.`,
      );
      return;
    }
    const reader = new FileReader();
    reader.onerror = () => toast.error("That file could not be read.");
    reader.onload = () => {
      const dataUrl = String(reader.result ?? "");
      if (!dataUrl.startsWith("data:image/")) {
        toast.error("Choose an image file — PNG, JPEG, WebP or SVG.");
        return;
      }
      void save({ dataUrl });
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-md border bg-muted/30">
          {currentLogoUrl ? (
            <img
              src={currentLogoUrl}
              alt="The school crest"
              className="h-full w-full object-contain p-1"
            />
          ) : (
            <IconPhotoPlus size={18} className="text-muted-foreground" />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium">School crest</p>
          <p className="text-xs text-muted-foreground">
            Shown in the portal header and on everything you print. PNG, JPEG,
            WebP or SVG, under {MAX_LOGO_BYTES / 1024}KB.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/svg+xml"
          className="hidden"
          onChange={(e) => {
            onPick(e.target.files?.[0]);
            // Allow re-picking the same file after a failure.
            e.target.value = "";
          }}
        />
        <Button
          size="sm"
          variant="outline"
          disabled={busy}
          onClick={() => inputRef.current?.click()}
        >
          <IconPhotoPlus size={14} className="mr-1.5" />
          {currentLogoUrl ? "Replace" : "Choose an image"}
        </Button>
        {currentLogoUrl ? (
          <Button
            size="sm"
            variant="ghost"
            disabled={busy}
            onClick={() => void save({ clear: true })}
          >
            <IconTrash size={14} className="mr-1.5" />
            Remove
          </Button>
        ) : null}
      </div>
    </div>
  );
}
