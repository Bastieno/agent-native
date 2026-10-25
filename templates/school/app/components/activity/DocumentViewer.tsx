import { useEffect, useRef, useState } from "react";
import { agentNativePath } from "@agent-native/core/client";
import { IconDownload, IconPrinter } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export interface DocumentInfo {
  id: string;
  version: number;
  fileName: string;
  byteSize: number;
  pageCount: number;
}

/**
 * A PDF set as learning material, read inside the app.
 *
 * Drawn with pdf.js, which is bundled with the app rather than fetched from
 * anywhere, so it works on a phone whose browser cannot show a PDF in a page
 * (Android Chrome downloads it instead) and needs nothing from outside the
 * school's own address. Pages are drawn as they scroll into view, so a long
 * document costs what is on screen. The file is the school's own branded copy;
 * Download and Print give the learner exactly that.
 */
export function DocumentViewer({
  assessmentId,
  document: doc,
}: {
  assessmentId: string;
  document: DocumentInfo;
}) {
  const url = agentNativePath(`/api/school/documents/${assessmentId}`);
  const host = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"loading" | "ready" | "failed">("loading");

  useEffect(() => {
    let cancelled = false;
    let pdf: any = null;
    const observers: IntersectionObserver[] = [];
    const container = host.current;
    if (!container) return;
    container.innerHTML = "";
    setState("loading");

    (async () => {
      try {
        const pdfjs = await import("pdfjs-dist");
        // Bundled with the app, so nothing is fetched from outside it.
        pdfjs.GlobalWorkerOptions.workerSrc = new URL(
          "pdfjs-dist/build/pdf.worker.min.mjs",
          import.meta.url,
        ).toString();
        pdf = await pdfjs.getDocument({
          // The version in the address makes a replaced file load afresh.
          url: `${url}?v=${doc.id}`,
          withCredentials: true,
        }).promise;
        if (cancelled) return;

        // The pages sit inside the frame's padding.
        const width = () => Math.max(container.clientWidth - 16, 260);
        const drawn = new Set<number>();
        const slots: HTMLDivElement[] = [];
        const first = await pdf.getPage(1);
        const base = first.getViewport({ scale: 1 });
        const ratio = base.height / base.width;

        for (let n = 1; n <= pdf.numPages; n++) {
          const slot = document.createElement("div");
          slot.className =
            "mb-3 overflow-hidden rounded-md border bg-white shadow-sm";
          slot.style.aspectRatio = `${1 / ratio}`;
          slot.dataset.page = String(n);
          container.appendChild(slot);
          slots.push(slot);
        }

        const draw = async (n: number) => {
          if (drawn.has(n) || cancelled) return;
          drawn.add(n);
          const page = await pdf.getPage(n);
          const natural = page.getViewport({ scale: 1 });
          const scale =
            (width() / natural.width) * (window.devicePixelRatio || 1);
          const viewport = page.getViewport({ scale });
          const canvas = document.createElement("canvas");
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          canvas.style.width = "100%";
          canvas.style.height = "auto";
          canvas.style.display = "block";
          await page.render({ canvas, viewport }).promise;
          if (cancelled) return;
          slots[n - 1].style.aspectRatio = "";
          slots[n - 1].replaceChildren(canvas);
        };

        const io = new IntersectionObserver(
          (entries) => {
            for (const e of entries) {
              if (e.isIntersecting) {
                void draw(Number((e.target as HTMLElement).dataset.page));
              }
            }
          },
          // The frame scrolls, not the page, so pages are drawn as they
          // come into the frame.
          { root: container, rootMargin: "600px 0px" },
        );
        observers.push(io);
        slots.forEach((s) => io.observe(s));
        setState("ready");
      } catch (err) {
        console.error("Document viewer failed:", err);
        if (!cancelled) setState("failed");
      }
    })();

    return () => {
      cancelled = true;
      observers.forEach((o) => o.disconnect());
      void pdf?.destroy?.();
    };
  }, [url, doc.id]);

  const size =
    doc.byteSize > 1048576
      ? `${(doc.byteSize / 1048576).toFixed(1)} MB`
      : `${Math.max(1, Math.round(doc.byteSize / 1024))} KB`;

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-xs text-muted-foreground">
          {doc.pageCount} page{doc.pageCount === 1 ? "" : "s"} · {size}
        </p>
        <div className="flex gap-2">
          <Button asChild size="sm" variant="outline">
            <a href={`${url}?download=1`} download={doc.fileName}>
              <IconDownload size={14} className="mr-1.5" />
              Download
            </a>
          </Button>
          <Button asChild size="sm" variant="outline">
            <a href={url} target="_blank" rel="noreferrer">
              <IconPrinter size={14} className="mr-1.5" />
              Print
            </a>
          </Button>
        </div>
      </div>
      {state === "failed" ? (
        <p className="rounded-md border p-4 text-sm text-muted-foreground">
          This document could not be shown here. You can still download it.
        </p>
      ) : null}
      {state === "loading" ? <Skeleton className="h-64 w-full" /> : null}
      {/* The document scrolls inside its own frame, so a long one does not
          make the page itself long. */}
      <div
        ref={host}
        className="h-[72dvh] min-h-[320px] overflow-y-auto overscroll-contain rounded-md border bg-muted/40 p-2"
      />
    </div>
  );
}
