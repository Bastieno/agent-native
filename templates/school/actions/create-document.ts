import { defineAction } from "@agent-native/core";
import { writeAppState } from "@agent-native/core/application-state";
import { currentAccess } from "@agent-native/core/sharing";
import { buildDeepLink } from "@agent-native/core/server";
import { nanoid } from "nanoid";
import { z } from "zod";

/**
 * Compose a printable document, on demand, for whatever a teacher just asked
 * for.
 *
 * This exists so the app does not grow a screen every time someone wants to
 * look at their data differently. "Give me the whole term on one page",
 * "print the class list with space to write in marks", "a summary of who has
 * not handed in Week 5" — none of those deserve a permanent view with its own
 * route, settings and empty state. They deserve a piece of paper.
 *
 * It matters that this is *output*, not interface. One deployment serves many
 * schools, so a layout added for one school's teacher would otherwise land on
 * every other school's screen. A document lands on one desk and is then thrown
 * away.
 *
 * The body is markdown, not HTML: the renderer already handles tables and
 * mathematics, and refuses raw markup, so a document can never inject anything
 * into the page it is displayed on. Documents are stored in per-user
 * application state, so one teacher's document is not readable by anyone else,
 * and nothing is added to the database.
 */
export default defineAction({
  description:
    "Compose a printable document from data you have already gathered — a term's marks on one page, a class list, a summary of missing work, anything a teacher asks to see or print. Read the data with the relevant action first, then write the document body as markdown (GitHub tables and $LaTeX$ are supported). Returns a path to open; the teacher prints it from there and it is thrown away. Prefer this over asking for a new screen.",
  schema: z.object({
    title: z
      .string()
      .describe(
        "Shown as the document heading, e.g. 'JSS1A Mathematics — Term 1'",
      ),
    body: z
      .string()
      .describe(
        "The document itself, in markdown. Use a table for anything tabular — it will print with borders. Keep it to what was asked for; a printed page has no scrollbar.",
      ),
    subtitle: z
      .string()
      .optional()
      .describe(
        "A line under the title — the class, the term, what this covers",
      ),
    orientation: z
      .enum(["portrait", "landscape"])
      .optional()
      .default("portrait")
      .describe(
        "Use landscape for a wide table — a term's worth of columns will not fit across a portrait page.",
      ),
    footnote: z
      .string()
      .optional()
      .describe("Small print at the foot of every page — a caveat or a source"),
  }),
  http: { method: "POST" },
  /**
   * A teacher working through Claude or another external agent gets a link,
   * not a relative path: `/print/abc` means nothing in a chat window. This
   * resolves to the running app, where they are already signed in, so the
   * document opens on the school's own header ready to print.
   */
  link: ({ result }) => {
    const documentId = (result as { documentId?: string } | undefined)
      ?.documentId;
    if (!documentId) return null;
    return {
      url: buildDeepLink({
        app: "school",
        view: "document",
        params: { documentId },
        // The printable is a real route, so point straight at it. Without
        // `to`, the open route redirects to /<view> and the id is lost.
        to: `/print/${documentId}`,
      }),
      label: "Open the document to print",
      view: "document",
    };
  },
  run: async (args) => {
    const { userEmail } = currentAccess();
    const documentId = nanoid();

    await writeAppState(`document-${documentId}`, {
      title: args.title,
      subtitle: args.subtitle ?? null,
      body: args.body,
      orientation: args.orientation ?? "portrait",
      footnote: args.footnote ?? null,
      createdAt: new Date().toISOString(),
      createdBy: userEmail ?? null,
    });

    const path = `/print/${documentId}`;
    return {
      documentId,
      path,
      orientation: args.orientation ?? "portrait",
      message: `"${args.title}" is ready at ${path} — open it and use Print to save it as a PDF. Take the teacher there with: navigate --view document --documentId ${documentId}`,
    };
  },
});
