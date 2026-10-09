import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { remarkBindUnits } from "@/components/remark-bind-units";
import "katex/dist/katex.min.css";
import { cn } from "@/lib/utils";

/**
 * Renders lesson notes, assessment questions, and feedback. Supports GitHub
 * markdown (tables, lists) and LaTeX math: inline `$x^2$` and block `$$...$$`.
 * Raw HTML is not rendered, so content written by the agent or users cannot
 * inject markup.
 */
/**
 * A line that means "start a new page here" when printing.
 *
 * Raw HTML is deliberately not rendered, so an agent asked to break pages
 * reached for `<div style="break-before: page">` and the printed worksheet
 * carried that text across the middle of it. Markdown has no page break, so
 * the app gives it one: a line reading `---page---`, which prints as a break
 * and shows as nothing on screen.
 */
const PAGE_BREAK = /^[ \t]*---page---[ \t]*$/m;

export function Markdown({
  children,
  className,
  pageBreaks = false,
}: {
  children: string | null | undefined;
  className?: string;
  /** Honour `---page---` as a page break. For print views. */
  pageBreaks?: boolean;
}) {
  if (!children) return null;

  if (pageBreaks && PAGE_BREAK.test(children)) {
    const pages = children.split(PAGE_BREAK);
    return (
      <>
        {pages.map((page, i) => (
          <div
            key={i}
            // Every page but the last ends with a break.
            className={i < pages.length - 1 ? "break-after-page" : undefined}
          >
            <Markdown className={className}>{page.trim()}</Markdown>
          </div>
        ))}
      </>
    );
  }

  return (
    <div
      className={cn(
        "text-sm leading-relaxed break-words",
        "[&_h1]:text-xl [&_h1]:font-semibold [&_h1]:mt-4 [&_h1]:mb-2",
        "[&_h2]:text-lg [&_h2]:font-semibold [&_h2]:mt-4 [&_h2]:mb-2",
        "[&_h3]:text-base [&_h3]:font-semibold [&_h3]:mt-3 [&_h3]:mb-1.5",
        "[&_p]:my-2 [&_ul]:my-2 [&_ul]:list-disc [&_ul]:pl-5",
        "[&_ol]:my-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:my-0.5",
        "[&_strong]:font-semibold [&_a]:underline [&_a]:text-primary",
        "[&_code]:rounded [&_code]:bg-muted [&_code]:px-1 [&_code]:text-[0.9em]",
        "[&_pre]:my-2 [&_pre]:overflow-x-auto [&_pre]:rounded-md [&_pre]:bg-muted [&_pre]:p-3",
        "[&_table]:my-2 [&_table]:w-full [&_table]:border-collapse",
        "[&_th]:border [&_th]:px-2 [&_th]:py-1 [&_th]:text-left [&_td]:border [&_td]:px-2 [&_td]:py-1",
        "[&_blockquote]:border-l-2 [&_blockquote]:pl-3 [&_blockquote]:text-muted-foreground",
        "[&_.katex-display]:overflow-x-auto [&_.katex-display]:py-1",
        "[&>*:first-child]:mt-0",
        className,
      )}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath, remarkBindUnits]}
        rehypePlugins={[rehypeKatex]}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
