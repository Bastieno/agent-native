import { useState, type ReactNode } from "react";
import { IconCopy } from "@tabler/icons-react";
import { toast } from "sonner";
import { copyText } from "@/lib/copy-text";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { McpAddress } from "@/components/settings/AssistantSettings";

/**
 * Things worth asking, written the way a teacher would say them. Each carries
 * the whole request so it can be pasted into their own AI app as it is.
 */
const STARTERS: Array<{ label: string; text: string }> = [
  {
    label: "A PDF handout from a reference document",
    text: "Using the attached document as a reference, make a branded PDF handout for my class on [topic], for [class]. Look at the pages as images, write it fresh in your own words, redraw the diagrams cleanly, and save it to the school as a draft for me to read and publish.",
  },
  {
    label: "A catch-up resource for one learner",
    text: "How is [learner name] doing in [class]? Make a short resource to help them catch up, for them alone, and save it as a draft for me to read first.",
  },
  {
    label: "Draft this week's lesson notes",
    text: "Draft the lesson notes for [class] for this week from the curriculum, and show them to me before marking anything ready.",
  },
];

/**
 * How a teacher uses their own Claude or ChatGPT with the school.
 *
 * Their app reads the pages, writes the material and calls the school's tools
 * directly, so the school's own assistant, and its daily allowance, are not
 * used for long jobs such as a PDF made from a reference document. Teachers
 * have no Settings page, so this is where they find out it exists.
 */
export function ConnectAiAppDialog({ trigger }: { trigger: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Use your own AI app</DialogTitle>
          <DialogDescription>
            Connect Claude or ChatGPT to the school. It can read your classes
            and learners, write material from your documents, and save it here
            for you to review. Long jobs, like a PDF from a 60-page reference,
            suit it best.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <McpAddress />
          <div className="space-y-2">
            <p className="text-xs font-medium">Then try asking</p>
            <ul className="divide-y rounded-lg border">
              {STARTERS.map((s) => (
                <li
                  key={s.label}
                  className="flex items-center justify-between gap-3 px-3 py-2 text-sm"
                >
                  <span className="min-w-0">{s.label}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label={`Copy: ${s.label}`}
                    onClick={async () => {
                      if (await copyText(s.text)) toast.success("Copied");
                      else toast.error("Could not copy.");
                    }}
                  >
                    <IconCopy size={16} />
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
