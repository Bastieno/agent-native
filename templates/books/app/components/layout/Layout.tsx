import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { IconMenu2 } from "@tabler/icons-react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { HeaderActionsProvider } from "./HeaderActions";
import { AgentSidebar } from "@agent-native/core/client";
import { AssistantSetupCard } from "@/components/AssistantKey";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet";

interface LayoutProps {
  children: React.ReactNode;
}

/**
 * Routes whose page renders its own h-12 toolbar (with title + AgentToggleButton).
 * Layout still wraps these with the left Sidebar and AgentSidebar but skips the
 * global Header so they don't double-stack a header bar.
 */
function routeOwnsToolbar(pathname: string): boolean {
  return pathname.startsWith("/extensions");
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    setMobileSidebarOpen(false);
  }, [location.pathname]);

  const ownsToolbar = routeOwnsToolbar(location.pathname);

  return (
    <HeaderActionsProvider>
      <div className="flex h-screen w-full overflow-hidden bg-background text-foreground">
        <div className="hidden md:block">
          <Sidebar />
        </div>
        <Sheet open={mobileSidebarOpen} onOpenChange={setMobileSidebarOpen}>
          <SheetContent
            side="left"
            className="w-72 max-w-[85vw] gap-0 bg-sidebar p-0 sm:max-w-72 [&>button]:top-3.5"
          >
            <SheetTitle className="sr-only">Navigation</SheetTitle>
            <SheetDescription className="sr-only">
              App navigation links
            </SheetDescription>
            <Sidebar inDrawer />
          </SheetContent>
        </Sheet>
        <AgentSidebar
          position="right"
          // Books' own key card in place of the framework's hosting offer.
          setupCard={<AssistantSetupCard />}
          // The server picks the model by role (owner Sonnet, partner Haiku),
          // so a picker would offer a choice it cannot honour.
          showModelSelector={false}
          // The workspace files and framework settings are not Books'; its own
          // settings are on the Settings page.
          showWorkspace={false}
          showSettings={false}
          // Side by side only on a wide screen; below that the panel slides
          // over the page instead of squeezing the figures.
          overlayBreakpointPx={1279}
          defaultOpen={
            typeof window !== "undefined" ? window.innerWidth >= 1280 : false
          }
          emptyStateText="Ask about your sales, costs and checks"
          suggestions={[
            "How did yesterday go?",
            "Which costs went up this week?",
            "What should I look at today?",
          ]}
        >
          <div className="flex h-full flex-1 flex-col overflow-hidden">
            {ownsToolbar ? (
              <div className="flex h-12 items-center border-b border-border px-4 md:hidden shrink-0">
                <button
                  type="button"
                  onClick={() => setMobileSidebarOpen(true)}
                  aria-label="Open navigation"
                  className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-accent"
                >
                  <IconMenu2 className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <Header onOpenMobileSidebar={() => setMobileSidebarOpen(true)} />
            )}
            <main className="flex-1 overflow-y-auto">{children}</main>
          </div>
        </AgentSidebar>
      </div>
    </HeaderActionsProvider>
  );
}
