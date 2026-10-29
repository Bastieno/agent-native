import katex from "katex";
import "katex/contrib/mhchem";
import "katex/dist/katex.min.css";
import { bindUnits } from "@shared/bind-units";

/**
 * Plain text with `$...$` spans written as notation.
 *
 * The print renderer writes prompts, options and cells as strings, not
 * markdown, so it cannot lean on the markdown pipeline for `$x^2$` or
 * `$\ce{MgCl2}$`. This does the same thing for a string: the spans are set by
 * KaTeX, the text between them keeps its measurements on one line, and
 * nothing outside a `$...$` is ever changed.
 */
const SPAN = /\$([^$\n]+)\$/g;

export function Typeset({ children }: { children: string | null | undefined }) {
  if (!children) return null;
  if (!children.includes("$")) return <>{bindUnits(children)}</>;

  const parts: React.ReactNode[] = [];
  let last = 0;
  for (const match of children.matchAll(SPAN)) {
    const at = match.index ?? 0;
    if (at > last) parts.push(bindUnits(children.slice(last, at)));
    parts.push(
      <span
        key={at}
        // KaTeX escapes what it is given and does not emit script or raw HTML.
        dangerouslySetInnerHTML={{
          __html: katex.renderToString(match[1], {
            throwOnError: false,
            trust: false,
          }),
        }}
      />,
    );
    last = at + match[0].length;
  }
  if (last < children.length) parts.push(bindUnits(children.slice(last)));
  return <>{parts}</>;
}
