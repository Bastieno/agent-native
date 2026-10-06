import { useParams } from "react-router";
import { ActivityPrintSheet } from "@/components/activity/ActivityPrintSheet";

/** Everything set for one week, each piece on its own sheet of paper. */
export default function PrintWeekMaterial() {
  const { lessonNoteId } = useParams<{ lessonNoteId: string }>();
  return <ActivityPrintSheet lessonNoteId={lessonNoteId} />;
}
