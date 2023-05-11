import {
  __commonJS
} from "/myst-test/build/_shared/chunk-7D2LYYYY.js";

// ../../node_modules/highlight.js/lib/languages/python-repl.js
var require_python_repl = __commonJS({
  "../../node_modules/highlight.js/lib/languages/python-repl.js"(exports, module) {
    function pythonRepl(hljs) {
      return {
        aliases: ["pycon"],
        contains: [
          {
            className: "meta",
            starts: {
              end: / |$/,
              starts: {
                end: "$",
                subLanguage: "python"
              }
            },
            variants: [
              {
                begin: /^>>>(?=[ ]|$)/
              },
              {
                begin: /^\.\.\.(?=[ ]|$)/
              }
            ]
          }
        ]
      };
    }
    module.exports = pythonRepl;
  }
});

export {
  require_python_repl
};
//# sourceMappingURL=/myst-test/build/_shared/chunk-X3YERRV4.js.map
