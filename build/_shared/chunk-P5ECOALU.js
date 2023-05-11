import {
  __commonJS
} from "/myst-test/build/_shared/chunk-7D2LYYYY.js";

// ../../node_modules/highlight.js/lib/languages/leaf.js
var require_leaf = __commonJS({
  "../../node_modules/highlight.js/lib/languages/leaf.js"(exports, module) {
    function leaf(hljs) {
      return {
        name: "Leaf",
        contains: [
          {
            className: "function",
            begin: "#+[A-Za-z_0-9]*\\(",
            end: / \{/,
            returnBegin: true,
            excludeEnd: true,
            contains: [
              {
                className: "keyword",
                begin: "#+"
              },
              {
                className: "title",
                begin: "[A-Za-z_][A-Za-z_0-9]*"
              },
              {
                className: "params",
                begin: "\\(",
                end: "\\)",
                endsParent: true,
                contains: [
                  {
                    className: "string",
                    begin: '"',
                    end: '"'
                  },
                  {
                    className: "variable",
                    begin: "[A-Za-z_][A-Za-z_0-9]*"
                  }
                ]
              }
            ]
          }
        ]
      };
    }
    module.exports = leaf;
  }
});

export {
  require_leaf
};
//# sourceMappingURL=/myst-test/build/_shared/chunk-P5ECOALU.js.map
