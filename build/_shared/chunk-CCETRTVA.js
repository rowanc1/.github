import {
  __commonJS
} from "/myst-test/build/_shared/chunk-7D2LYYYY.js";

// ../../node_modules/highlight.js/lib/languages/clojure-repl.js
var require_clojure_repl = __commonJS({
  "../../node_modules/highlight.js/lib/languages/clojure-repl.js"(exports, module) {
    function clojureRepl(hljs) {
      return {
        name: "Clojure REPL",
        contains: [
          {
            className: "meta",
            begin: /^([\w.-]+|\s*#_)?=>/,
            starts: {
              end: /$/,
              subLanguage: "clojure"
            }
          }
        ]
      };
    }
    module.exports = clojureRepl;
  }
});

export {
  require_clojure_repl
};
//# sourceMappingURL=/myst-test/build/_shared/chunk-CCETRTVA.js.map
