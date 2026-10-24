import { useEffect, useRef, useState } from "react";

/**
 * An editable copy of something saved on the server.
 *
 * The copy follows the saved value while nobody has touched it. Once the admin
 * has edits of their own, a refetch leaves them alone — it used to replace
 * them with whatever the server said, mid-edit.
 */
export function useSyncedDraft<T>(saved: T) {
  const [draft, setDraft] = useState<T>(saved);
  const savedJson = JSON.stringify(saved);
  const previous = useRef(savedJson);

  useEffect(() => {
    if (savedJson === previous.current) return;
    const was = previous.current;
    previous.current = savedJson;
    setDraft((current) => (JSON.stringify(current) === was ? saved : current));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savedJson]);

  return [draft, setDraft, JSON.stringify(draft) !== savedJson] as const;
}
