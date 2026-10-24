import { CurriculumWorkspace } from "@/components/curriculum/CurriculumWorkspace";

/**
 * The same drafting workspace the admin uses.
 *
 * A teacher drafts the subjects they teach and a coordinator any of theirs;
 * the actions decide which, and committing is refused to anyone who should
 * not. What nobody should have is a second, lesser version of this screen.
 */
export default function TeacherCurriculumSetup() {
  return (
    <CurriculumWorkspace role="teacher" curriculumPath="/teacher/curriculum" />
  );
}
