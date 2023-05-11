import {
  __commonJS
} from "/myst-test/build/_shared/chunk-7D2LYYYY.js";

// ../../node_modules/refractor/lang/bnf.js
var require_bnf = __commonJS({
  "../../node_modules/refractor/lang/bnf.js"(exports, module) {
    module.exports = bnf;
    bnf.displayName = "bnf";
    bnf.aliases = ["rbnf"];
    function bnf(Prism) {
      Prism.languages.bnf = {
        string: {
          pattern: /"[^\r\n"]*"|'[^\r\n']*'/
        },
        definition: {
          pattern: /<[^<>\r\n\t]+>(?=\s*::=)/,
          alias: ["rule", "keyword"],
          inside: {
            punctuation: /^<|>$/
          }
        },
        rule: {
          pattern: /<[^<>\r\n\t]+>/,
          inside: {
            punctuation: /^<|>$/
          }
        },
        operator: /::=|[|()[\]{}*+?]|\.{3}/
      };
      Prism.languages.rbnf = Prism.languages.bnf;
    }
  }
});

export {
  require_bnf
};
//# sourceMappingURL=/myst-test/build/_shared/chunk-5INSLRFD.js.map
