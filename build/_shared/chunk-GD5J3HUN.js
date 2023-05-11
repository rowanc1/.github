import {
  convert,
  init_unist_util_is
} from "/myst-test/build/_shared/chunk-JM3RROW2.js";
import {
  __esm,
  __export
} from "/myst-test/build/_shared/chunk-7D2LYYYY.js";

// ../../node_modules/unist-util-visit-parents/lib/color.browser.js
function color(d) {
  return d;
}
var init_color_browser = __esm({
  "../../node_modules/unist-util-visit-parents/lib/color.browser.js"() {
  }
});

// ../../node_modules/unist-util-visit-parents/lib/index.js
function toResult(value) {
  if (Array.isArray(value)) {
    return value;
  }
  if (typeof value === "number") {
    return [CONTINUE, value];
  }
  return [value];
}
var CONTINUE, EXIT, SKIP, visitParents;
var init_lib = __esm({
  "../../node_modules/unist-util-visit-parents/lib/index.js"() {
    init_unist_util_is();
    init_color_browser();
    CONTINUE = true;
    EXIT = false;
    SKIP = "skip";
    visitParents = function(tree, test, visitor, reverse) {
      if (typeof test === "function" && typeof visitor !== "function") {
        reverse = visitor;
        visitor = test;
        test = null;
      }
      const is = convert(test);
      const step = reverse ? -1 : 1;
      factory(tree, void 0, [])();
      function factory(node, index, parents) {
        const value = node && typeof node === "object" ? node : {};
        if (typeof value.type === "string") {
          const name = typeof value.tagName === "string" ? value.tagName : typeof value.name === "string" ? value.name : void 0;
          Object.defineProperty(visit2, "name", {
            value: "node (" + color(node.type + (name ? "<" + name + ">" : "")) + ")"
          });
        }
        return visit2;
        function visit2() {
          let result = [];
          let subresult;
          let offset;
          let grandparents;
          if (!test || is(node, index, parents[parents.length - 1] || null)) {
            result = toResult(visitor(node, parents));
            if (result[0] === EXIT) {
              return result;
            }
          }
          if (node.children && result[0] !== SKIP) {
            offset = (reverse ? node.children.length : -1) + step;
            grandparents = parents.concat(node);
            while (offset > -1 && offset < node.children.length) {
              subresult = factory(node.children[offset], offset, grandparents)();
              if (subresult[0] === EXIT) {
                return subresult;
              }
              offset = typeof subresult[1] === "number" ? subresult[1] : offset + step;
            }
          }
          return result;
        }
      }
    };
  }
});

// ../../node_modules/unist-util-visit-parents/index.js
var init_unist_util_visit_parents = __esm({
  "../../node_modules/unist-util-visit-parents/index.js"() {
    init_lib();
  }
});

// ../../node_modules/unist-util-visit/lib/index.js
var visit;
var init_lib2 = __esm({
  "../../node_modules/unist-util-visit/lib/index.js"() {
    init_unist_util_visit_parents();
    init_unist_util_visit_parents();
    visit = function(tree, test, visitor, reverse) {
      if (typeof test === "function" && typeof visitor !== "function") {
        reverse = visitor;
        visitor = test;
        test = null;
      }
      visitParents(tree, test, overload, reverse);
      function overload(node, parents) {
        const parent = parents[parents.length - 1];
        return visitor(
          node,
          parent ? parent.children.indexOf(node) : null,
          parent
        );
      }
    };
  }
});

// ../../node_modules/unist-util-visit/index.js
var unist_util_visit_exports = {};
__export(unist_util_visit_exports, {
  CONTINUE: () => CONTINUE,
  EXIT: () => EXIT,
  SKIP: () => SKIP,
  visit: () => visit
});
var init_unist_util_visit = __esm({
  "../../node_modules/unist-util-visit/index.js"() {
    init_lib2();
  }
});

export {
  CONTINUE,
  EXIT,
  SKIP,
  visitParents,
  init_unist_util_visit_parents,
  visit,
  unist_util_visit_exports,
  init_unist_util_visit
};
//# sourceMappingURL=/myst-test/build/_shared/chunk-GD5J3HUN.js.map
