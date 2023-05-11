import {
  __commonJS
} from "/myst-test/build/_shared/chunk-7D2LYYYY.js";

// ../../node_modules/highlight.js/lib/languages/node-repl.js
var require_node_repl = __commonJS({
  "../../node_modules/highlight.js/lib/languages/node-repl.js"(exports, module) {
    function nodeRepl(hljs) {
      return {
        name: "Node REPL",
        contains: [
          {
            className: "meta",
            starts: {
              end: / |$/,
              starts: {
                end: "$",
                subLanguage: "javascript"
              }
            },
            variants: [
              {
                begin: /^>(?=[ ]|$)/
              },
              {
                begin: /^\.\.\.(?=[ ]|$)/
              }
            ]
          }
        ]
      };
    }
    module.exports = nodeRepl;
  }
});

export {
  require_node_repl
};
//# sourceMappingURL=/myst-test/build/_shared/chunk-6I6XUU3B.js.map
