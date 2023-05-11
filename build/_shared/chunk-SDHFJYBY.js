import {
  __commonJS
} from "/myst-test/build/_shared/chunk-7D2LYYYY.js";

// ../../node_modules/refractor/lang/ebnf.js
var require_ebnf = __commonJS({
  "../../node_modules/refractor/lang/ebnf.js"(exports, module) {
    module.exports = ebnf;
    ebnf.displayName = "ebnf";
    ebnf.aliases = [];
    function ebnf(Prism) {
      Prism.languages.ebnf = {
        comment: /\(\*[\s\S]*?\*\)/,
        string: {
          pattern: /"[^"\r\n]*"|'[^'\r\n]*'/,
          greedy: true
        },
        special: {
          pattern: /\?[^?\r\n]*\?/,
          greedy: true,
          alias: "class-name"
        },
        definition: {
          pattern: /^([\t ]*)[a-z]\w*(?:[ \t]+[a-z]\w*)*(?=\s*=)/im,
          lookbehind: true,
          alias: ["rule", "keyword"]
        },
        rule: /\b[a-z]\w*(?:[ \t]+[a-z]\w*)*\b/i,
        punctuation: /\([:/]|[:/]\)|[.,;()[\]{}]/,
        operator: /[-=|*/!]/
      };
    }
  }
});

export {
  require_ebnf
};
//# sourceMappingURL=/myst-test/build/_shared/chunk-SDHFJYBY.js.map
