import {
  convert,
  init_unist_util_is
} from "/myst-test/build/_shared/chunk-JM3RROW2.js";

// ../../node_modules/unist-util-remove/lib/index.js
init_unist_util_is();
var empty = [];
var remove = function(tree, options, test) {
  const is = convert(test || options);
  const cascade = !options || options.cascade === void 0 || options.cascade === null ? true : options.cascade;
  return preorder(tree);
  function preorder(node, index, parent) {
    const children = node.children || empty;
    let childIndex = -1;
    let position = 0;
    if (is(node, index, parent)) {
      return null;
    }
    if (children.length > 0) {
      while (++childIndex < children.length) {
        if (preorder(children[childIndex], childIndex, node)) {
          children[position++] = children[childIndex];
        }
      }
      if (cascade && !position) {
        return null;
      }
      children.length = position;
    }
    return node;
  }
};

export {
  remove
};
//# sourceMappingURL=/myst-test/build/_shared/chunk-37FM42JK.js.map
