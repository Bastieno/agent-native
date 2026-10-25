import { useQuery } from "@tanstack/react-query";
import { agentNativePath } from "@agent-native/core/client";

export interface NotificationItem {
  id: string;
  kind: string;
  title: string;
  body: string;
  link: string | null;
  createdAt: string;
  readAt: string | null;
}

export const NOTIFICATIONS_KEY = ["my-notifications"] as const;

/** The signed-in person's notifications, refreshed about once a minute. */
export function useNotifications() {
  const query = useQuery<{ items: NotificationItem[]; unread: number }>({
    queryKey: NOTIFICATIONS_KEY,
    queryFn: async () => {
      const res = await fetch(
        agentNativePath("/_agent-native/actions/list-my-notifications"),
      );
      if (!res.ok) return { items: [], unread: 0 };
      return res.json();
    },
    refetchInterval: () => (document.hidden ? false : 60_000),
    staleTime: 30_000,
  });
  return {
    items: query.data?.items ?? [],
    unread: query.data?.unread ?? 0,
    isLoading: query.isLoading,
  };
}
