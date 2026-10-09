import { useParams } from "react-router";
import { ActivityPrintSheet } from "@/components/activity/ActivityPrintSheet";

/** One activity, printed from the blocks it is made of. */
export default function PrintActivity() {
  const { assessmentId } = useParams<{ assessmentId: string }>();
  return <ActivityPrintSheet assessmentId={assessmentId} />;
}
