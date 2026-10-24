import { useParams } from "react-router";
import { AssessmentDetail } from "@/components/activity/AssessmentDetail";

export default function TeacherAssessment() {
  const { assessmentId } = useParams();
  return (
    <AssessmentDetail
      assessmentId={assessmentId!}
      role="teacher"
      backToClass={(classId) => `/teacher/classes/${classId}`}
      backToLesson={(lessonNoteId) => `/teacher/lessons/${lessonNoteId}`}
      backToClasses="/teacher/classes"
    />
  );
}
