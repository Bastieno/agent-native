import { useParams } from "react-router";
import { AssessmentDetail } from "@/components/activity/AssessmentDetail";

/**
 * A class's activity, opened by an admin.
 *
 * "What your class sees" links here from a lesson, and an admin following
 * that link used to land on a 404 — the route simply did not exist, so the
 * only way to read a worksheet before it was published was to be its
 * teacher.
 */
export default function AdminAssessment() {
  const { assessmentId } = useParams();
  return (
    <AssessmentDetail
      assessmentId={assessmentId!}
      role="admin"
      backToClass={() => "/admin/lessons"}
      backToLesson={(lessonNoteId) => `/admin/lessons/${lessonNoteId}`}
      backToClasses="/admin/classes"
    />
  );
}
