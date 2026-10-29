import { bindUnits } from "./bind-units";

/**
 * Everything done to plain text on its way to the page: measurements kept on
 * one line. Notation — maths, units, chemical formulas — is not guessed from
 * the text; it is written between `$...$` and set by KaTeX, in markdown by
 * rehype-katex and in the print renderer by `Typeset`.
 */
export const typeset = (value: string): string => bindUnits(value);
