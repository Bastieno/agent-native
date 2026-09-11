import { useParams } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { agentNativePath } from "@agent-native/core/client";
import { useNavigationState } from "@/hooks/use-navigation-state";
import { useLessonEditor } from "@/hooks/use-lesson-editor";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Markdown } from "@/components/Markdown";
import { toast } from "sonner";
import { IconCheck, IconPencil } from "@tabler/icons-react";

export default function TeacherLesson() {
  const { lessonId } = useParams();
  const { sync } = useNavigationState();
  const qc = useQueryClient();
  const { liveEdit, save, clearEdit } = useLessonEditor(lessonId!);

  const { data: lesson, isLoading } = useQuery({
    queryKey: ["lesson", lessonId],
    queryFn: async () => {
      const res = await fetch(
        agentNativePath(`/api/school/lessons/${lessonId}`),
      );
      if (!res.ok) return null;
      return res.json();
    },
    enabled: !!lessonId,
  });

  const [content, setContent] = useState("");

  useEffect(() => {
    if (lessonId) sync({ role: "teacher", view: "lesson", lessonId });
  }, [sync, lessonId]);

  useEffect(() => {
    // Prefer live edit (agent changes), fall back to DB content
    if (liveEdit?.content !== undefined) {
      setContent(liveEdit.content);
    } else if (lesson?.content !== undefined) {
      setContent(lesson.content);
    }
  }, [liveEdit?.content, lesson?.content]);

  const handleContentChange = (value: string) => {
    setContent(value);
    save({
      title: lesson?.title ?? "",
      content: value,
      summary: lesson?.summary,
      status: lesson?.status ?? "draft",
    });
  };

  const finalizeMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(
        agentNativePath(`/api/school/lessons/${lessonId}/finalize`),
        {
          method: "PATCH",
        },
      );
      if (!res.ok) throw new Error("Failed to finalize");
    },
    onSuccess: () => {
      toast.success("Lesson finalized");
      clearEdit();
      qc.invalidateQueries({ queryKey: ["lesson", lessonId] });
    },
    onError: () => toast.error("Failed to finalize lesson"),
  });

  if (isLoading)
    return <div className="p-6 text-sm text-muted-foreground">Loading…</div>;
  if (!lesson)
    return (
      <div className="p-6 text-sm text-muted-foreground">Lesson not found.</div>
    );

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="flex items-center justify-between border-b px-6 py-3">
        <div className="flex items-center gap-3">
          <h1 className="text-base font-semibold">{lesson.title}</h1>
          <Badge
            variant={lesson.status === "finalized" ? "default" : "secondary"}
            className="text-xs"
          >
            {lesson.status}
          </Badge>
        </div>
        {lesson.status === "draft" && (
          <Button
            size="sm"
            onClick={() => finalizeMutation.mutate()}
            disabled={finalizeMutation.isPending}
          >
            <IconCheck size={14} className="mr-1.5" />
            Finalize
          </Button>
        )}
        {lesson.status === "finalized" && (
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <IconCheck size={12} />
            Finalized
          </div>
        )}
      </div>
      <div className="flex-1 overflow-auto p-6">
        {lesson.status === "draft" ? (
          <Tabs defaultValue="write" className="space-y-2">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <IconPencil size={12} />
                Changes auto-save and sync with the agent.
              </div>
              <TabsList>
                <TabsTrigger value="write">Write</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="write">
              <Textarea
                className="min-h-125 font-mono text-sm resize-none"
                value={content}
                onChange={(e) => handleContentChange(e.target.value)}
                placeholder="Write your lesson note in markdown…"
              />
            </TabsContent>
            <TabsContent value="preview" className="max-w-3xl">
              <Markdown>{content}</Markdown>
            </TabsContent>
          </Tabs>
        ) : (
          <div className="max-w-3xl">
            <Markdown>{content}</Markdown>
          </div>
        )}
      </div>
    </div>
  );
}
