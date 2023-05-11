import {
  __commonJS
} from "/myst-test/build/_shared/chunk-7D2LYYYY.js";

// ../../node_modules/refractor/lang/prolog.js
var require_prolog = __commonJS({
  "../../node_modules/refractor/lang/prolog.js"(exports, module) {
    module.exports = prolog;
    prolog.displayName = "prolog";
    prolog.aliases = [];
    function prolog(Prism) {
      Prism.languages.prolog = {
        comment: {
          pattern: /\/\*[\s\S]*?\*\/|%.*/,
          greedy: true
        },
        string: {
          pattern: /(["'])(?:\1\1|\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1(?!\1)/,
          greedy: true
        },
        builtin: /\b(?:fx|fy|xf[xy]?|yfx?)\b/,
        function: /\b[a-z]\w*(?:(?=\()|\/\d+)/,
        number: /\b\d+(?:\.\d*)?/,
        operator: /[:\\=><\-?*@\/;+^|!$.]+|\b(?:is|mod|not|xor)\b/,
        punctuation: /[(){}\[\],]/
      };
    }
  }
});

export {
  require_prolog
};
//# sourceMappingURL=/myst-test/build/_shared/chunk-B5FPYCHX.js.map
