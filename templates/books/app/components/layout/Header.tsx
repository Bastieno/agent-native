import { useLocation } from "react-router";
import { IconMenu2 } from "@tabler/icons-react";
import { useHeaderTitle, useHeaderActions } from "./HeaderActions";
import { AgentToggleButton } from "@agent-native/core/client";
import { APP_TITLE } from "@/lib/app-config";

const pageTitles: Record<string, string> = {
  "/": "Home",
  "/observability": "Observability",
  "/settings": "Settings",
  "/team": "Team",
};

function resolveTitle(pathname: string): string {
  if (pageTitles[pathname]) return pageTitles[pathname];
  if (pathname.startsWith("/extensions")) return "Extensions";
  return APP_TITLE;
}

interface HeaderProps {
  onOpenMobileSidebar?: () => void;
}

export function Header({ onOpenMobileSidebar }: HeaderProps) {
  const location = useLocation();
  const title = useHeaderTitle();
  const actions = useHeaderActions();

  return (
    <>
      <header className="flex h-12 items-center gap-3 border-b border-border bg-background px-4 lg:px-6 shrink-0">
        {onOpenMobileSidebar && (
          <button
            type="button"
            onClick={onOpenMobileSidebar}
            aria-label="Open navigation"
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-accent md:hidden"
          >
            <IconMenu2 className="h-4 w-4" />
          </button>
        )}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {typeof title === "string" || title == null ? (
            <h1 className="truncate whitespace-nowrap text-lg font-semibold tracking-tight">
              {title ?? resolveTitle(location.pathname)}
            </h1>
          ) : (
            title
          )}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {actions && (
            <div className="hidden items-center gap-2 sm:flex">{actions}</div>
          )}
          <AgentToggleButton />
        </div>
      </header>
      {actions && (
        // On a phone the page's controls get their own row under the title.
        <div className="flex shrink-0 items-center justify-end gap-2 overflow-x-auto border-b border-border px-4 py-2 sm:hidden">
          {actions}
        </div>
      )}
    </>
  );
}
