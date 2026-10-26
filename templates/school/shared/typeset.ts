import { bindUnits } from "./bind-units";
import { formatChemistry } from "./chemistry";

/**
 * Everything done to plain text on its way to the page: measurements kept on
 * one line, chemical formulas and ions written with sub- and superscripts.
 * Markdown goes through the remark plugin that wraps this; the print renderer,
 * which writes prompts and options as plain strings, calls it directly.
 */
export const typeset = (value: string): string =>
  formatChemistry(bindUnits(value));
