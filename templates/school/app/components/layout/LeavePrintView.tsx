import { useNavigate } from "react-router";
import { IconChevronLeft } from "@tabler/icons-react";

/**
 * The way out of a print page.
 *
 * Print pages sit outside the portal shell on purpose — no navigation, no agent
 * panel, so what is on screen is what comes off the printer. The cost is that
 * they are the only pages in the app with no way back, which leaves a teacher
 * stranded on a document with nothing but the browser's own controls.
 *
 * Going back in history is right when there is history, and wrong when there is
 * not: a document opened from a link in Claude, or from a bookmark, has nowhere
 * to return to. So it falls back to the app's front door, which already sends
 * each role to their own portal.
 *
 * Hidden when printing, like every other control on these pages.
 */
export function LeavePrintView() {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      data-print-hide
      onClick={() => {
        // More than one entry means they arrived from somewhere in the app.
        if (window.history.length > 1) navigate(-1);
        else navigate("/");
      }}
      className="inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
    >
      <IconChevronLeft size={14} />
      Back
    </button>
  );
}
