import {
  __commonJS
} from "/myst-test/build/_shared/chunk-7D2LYYYY.js";

// ../../node_modules/highlight.js/lib/languages/julia-repl.js
var require_julia_repl = __commonJS({
  "../../node_modules/highlight.js/lib/languages/julia-repl.js"(exports, module) {
    function juliaRepl(hljs) {
      return {
        name: "Julia REPL",
        contains: [
          {
            className: "meta",
            begin: /^julia>/,
            relevance: 10,
            starts: {
              end: /^(?![ ]{6})/,
              subLanguage: "julia"
            },
            aliases: ["jldoctest"]
          }
        ]
      };
    }
    module.exports = juliaRepl;
  }
});

export {
  require_julia_repl
};
//# sourceMappingURL=/myst-test/build/_shared/chunk-M4YCKOIG.js.map
