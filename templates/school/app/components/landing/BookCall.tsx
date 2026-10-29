import { useState } from "react";
import { IconArrowRight, IconLoader2 } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Edition } from "@shared/landing-content";

/** Where to write when no booking page is set yet. */
export const CONTACT_EMAIL = "support@ellai.dev";

type CalFn = ((...args: unknown[]) => void) & {
  loaded?: boolean;
  ns?: Record<string, unknown>;
  q?: unknown[][];
};

declare global {
  interface Window {
    Cal?: CalFn;
  }
}

/**
 * Cal.com's own loader: queues calls until embed.js arrives. Written out
 * rather than added to the page so the script is fetched only when someone
 * asks to book, not on every visit.
 */
function loadCal(): CalFn {
  const w = window;
  if (w.Cal) return w.Cal;
  const cal = function (...args: unknown[]) {
    const self = w.Cal!;
    if (!self.loaded) {
      self.ns = {};
      self.q = self.q || [];
      const s = document.createElement("script");
      s.src = "https://app.cal.com/embed/embed.js";
      s.async = true;
      document.head.appendChild(s);
      self.loaded = true;
    }
    self.q!.push(args);
  } as CalFn;
  w.Cal = cal;
  cal("init", { origin: "https://cal.com" });
  return cal;
}

/**
 * The page's one action. Opens Cal.com's booking window over the page; the
 * edition the visitor saw rides along as booking metadata, so the webhook can
 * record it. Without a booking page configured it falls back to email.
 */
export function BookCall({
  calLink,
  edition,
  size = "lg",
  className,
}: {
  calLink: string | null;
  edition: Edition;
  size?: "default" | "lg";
  className?: string;
}) {
  const [opening, setOpening] = useState(false);

  if (!calLink) {
    return (
      <Button asChild size={size} className={cn("gap-2", className)}>
        <a
          href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("A call about Ellai")}`}
        >
          Book a 20-minute call
          <IconArrowRight size={16} />
        </a>
      </Button>
    );
  }

  function open(e: React.MouseEvent) {
    // A modified click (new tab) goes to Cal.com's own page.
    if (e.metaKey || e.ctrlKey || e.shiftKey) return;
    e.preventDefault();
    setOpening(true);
    try {
      loadCal()("modal", {
        calLink,
        config: { layout: "month_view", "metadata[edition]": edition },
      });
    } catch {
      window.location.href = `https://cal.com/${calLink}`;
    }
    // The window draws itself once embed.js arrives; the spinner only covers
    // that first fetch.
    window.setTimeout(() => setOpening(false), 1500);
  }

  return (
    <Button asChild size={size} className={cn("gap-2", className)}>
      <a
        href={`https://cal.com/${calLink}?metadata[edition]=${edition}`}
        onClick={open}
        rel="noopener"
      >
        Book a 20-minute call
        {opening ? (
          <IconLoader2 size={16} className="animate-spin" />
        ) : (
          <IconArrowRight size={16} />
        )}
      </a>
    </Button>
  );
}
