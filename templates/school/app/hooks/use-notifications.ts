import { httpError } from "@/lib/http-error";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
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
export function useNotifications(limit = 30) {
  const query = useQuery<{
    items: NotificationItem[];
    unread: number;
    total: number;
  }>({
    queryKey: [...NOTIFICATIONS_KEY, limit],
    queryFn: async () => {
      const res = await fetch(
        agentNativePath(
          `/_agent-native/actions/list-my-notifications?limit=${limit}`,
        ),
      );
      if (!res.ok) throw await httpError(res);
      return res.json();
    },
    refetchInterval: () => (document.hidden ? false : 60_000),
    staleTime: 30_000,
    // Asking for more keeps the ones already shown on screen meanwhile.
    placeholderData: keepPreviousData,
  });
  return {
    items: query.data?.items ?? [],
    unread: query.data?.unread ?? 0,
    total: query.data?.total ?? 0,
    isLoading: query.isLoading,
  };
}
