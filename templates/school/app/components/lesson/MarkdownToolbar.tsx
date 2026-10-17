import type { RefObject } from "react";
import {
  IconBold,
  IconHeading,
  IconItalic,
  IconList,
  IconListNumbers,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  BULLET,
  HEADING,
  NUMBERED,
  toggleLinePrefix,
  toggleWrap,
  type TextEdit,
} from "./markdown-edits";

/**
 * Formatting buttons for a markdown note.
 *
 * A lesson note is stored as markdown, and until now a teacher had to know
 * that — the editor showed `## This week's objective` and `- objective` and
 * expected them to type the same. Teachers are not markdown authors, and the
 * ones this is for are writing on a tablet between lessons.
 *
 * The buttons are a step, not the answer: they teach the syntax rather than
 * hiding it. The answer is an editor showing formatted text, which is a larger
 * change worth making once a real teacher has been watched using this.
 */
export function MarkdownToolbar({
  textareaRef,
  onChange,
}: {
  textareaRef: RefObject<HTMLTextAreaElement | null>;
  onChange: (value: string) => void;
}) {
  const apply = (
    edit: (text: string, start: number, end: number) => TextEdit,
  ) => {
    const el = textareaRef.current;
    if (!el) return;
    const { value, selectionStart, selectionEnd } = el;
    const next = edit(value, selectionStart, selectionEnd);

    // Type the change into the field rather than replacing its value, so the
    // browser's own undo still works: a teacher pressing ctrl+Z after a
    // mis-click gets their text back, which setting .value directly breaks.
    el.focus();
    el.setSelectionRange(0, value.length);
    const inserted = document.execCommand?.("insertText", false, next.text);
    if (!inserted) {
      el.value = next.text;
    }
    el.setSelectionRange(next.selectionStart, next.selectionEnd);
    onChange(el.value);
  };

  const actions = [
    {
      label: "Heading",
      hint: "Section heading",
      icon: IconHeading,
      run: (t: string, s: number, e: number) =>
        toggleLinePrefix(t, s, e, () => "## ", HEADING),
    },
    {
      label: "Bold",
      hint: "Bold (⌘B)",
      icon: IconBold,
      run: (t: string, s: number, e: number) => toggleWrap(t, s, e, "**"),
    },
    {
      label: "Italic",
      hint: "Italic",
      icon: IconItalic,
      run: (t: string, s: number, e: number) => toggleWrap(t, s, e, "_"),
    },
    {
      label: "Bullets",
      hint: "Bullet list",
      icon: IconList,
      run: (t: string, s: number, e: number) =>
        toggleLinePrefix(t, s, e, () => "- ", BULLET),
    },
    {
      label: "Numbers",
      hint: "Numbered list",
      icon: IconListNumbers,
      run: (t: string, s: number, e: number) =>
        toggleLinePrefix(t, s, e, (i) => `${i + 1}. `, NUMBERED),
    },
  ];

  return (
    <div className="flex items-center gap-0.5">
      {actions.map(({ label, hint, icon: Icon, run }) => (
        <Tooltip key={label}>
          <TooltipTrigger asChild>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              aria-label={label}
              className="h-7 w-7 p-0 text-muted-foreground"
              // The editor must keep the selection the button acts on.
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => apply(run)}
            >
              <Icon size={15} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>{hint}</TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
}

/** ⌘B / Ctrl+B, because every other editor a teacher has used does. */
export function boldShortcut(
  event: React.KeyboardEvent<HTMLTextAreaElement>,
  onChange: (value: string) => void,
) {
  if (!(event.metaKey || event.ctrlKey) || event.key.toLowerCase() !== "b") {
    return;
  }
  event.preventDefault();
  const el = event.currentTarget;
  const next = toggleWrap(el.value, el.selectionStart, el.selectionEnd, "**");
  el.focus();
  el.setSelectionRange(0, el.value.length);
  if (!document.execCommand?.("insertText", false, next.text)) {
    el.value = next.text;
  }
  el.setSelectionRange(next.selectionStart, next.selectionEnd);
  onChange(el.value);
}
