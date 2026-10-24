import { bindUnits } from "@shared/bind-units";

/**
 * `bindUnits` over a markdown tree's prose only.
 *
 * As a remark plugin rather than a search-and-replace on the source, because
 * by the time it sees the tree, code, inline code and `$LaTeX$` are their own
 * node types — so they are left alone without having to be parsed for.
 */

type Node = { type: string; value?: string; children?: Node[] };

export const remarkBindUnits = () => (tree: unknown) => {
  const walk = (node: Node) => {
    if (node.type === "text" && typeof node.value === "string") {
      node.value = bindUnits(node.value);
      return;
    }
    node.children?.forEach(walk);
  };
  walk(tree as Node);
};
