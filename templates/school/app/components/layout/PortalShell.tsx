import { useEffect, useState, type ReactNode } from "react";
import { useLocation } from "react-router";
import { AgentToggleButton } from "@agent-native/core/client";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { IconMenu2 } from "@tabler/icons-react";

/**
 * The staff portal shell.
 *
 * Three columns on a large screen — navigation, work, agent — but both side
 * columns give way as the viewport narrows, because a tablet cannot show all
 * three without squeezing the work to nothing:
 *
 *   ≥ 1280px  navigation + content + agent panel, side by side
 *   ≥ 1024px  navigation + content; agent opens over the page from a button
 *   < 1024px  content only; navigation opens as a drawer from the hamburger
 *
 * The agent panel's own breakpoint is set where it is used
 * (`overlayBreakpointPx`), so the two halves stay in step.
 */
export function PortalShell({
  sidebar,
  drawerSidebar,
  title,
  children,
}: {
  sidebar: ReactNode;
  /**
   * The navigation as it appears in the drawer. Same component, without the
   * agent toggle — the floating button already does that job, and leaving it
   * in means the drawer opens with its tooltip showing.
   */
  drawerSidebar?: ReactNode;
  title: string;
  children: ReactNode;
}) {
  const [navOpen, setNavOpen] = useState(false);
  const location = useLocation();

  // Navigating from the drawer should close it.
  useEffect(() => {
    setNavOpen(false);
  }, [location.pathname]);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* In-layout navigation on a large screen */}
      <div className="hidden lg:flex">{sidebar}</div>

      {/* Drawer navigation below lg */}
      <Sheet open={navOpen} onOpenChange={setNavOpen}>
        {/* Exactly the sidebar's width: anything wider leaves a strip of
            drawer background beside the navigation. */}
        <SheetContent
          side="left"
          className="w-56 gap-0 border-r-0 p-0 [&>button]:top-4"
        >
          <SheetTitle className="sr-only">{title} navigation</SheetTitle>
          {drawerSidebar ?? sidebar}
        </SheetContent>
      </Sheet>

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        {/* Compact header, only when the navigation is hidden */}
        <header className="flex h-12 shrink-0 items-center gap-2 border-b px-3 lg:hidden">
          <button
            type="button"
            onClick={() => setNavOpen(true)}
            aria-label="Open navigation"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent/40 hover:text-foreground"
          >
            <IconMenu2 size={20} />
          </button>
          <span className="truncate text-sm font-semibold">{title}</span>
        </header>

        <main className="min-w-0 flex-1 overflow-hidden">{children}</main>
      </div>

      {/* Agent button, for the widths where the panel is an overlay. Sits
          clear of the bottom edge and above page content. */}
      <AgentToggleButton className="fixed bottom-6 right-6 z-30 h-12 w-12 rounded-full border bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 hover:text-primary-foreground xl:hidden" />
    </div>
  );
}
