import {
  __commonJS
} from "/myst-test/build/_shared/chunk-7D2LYYYY.js";

// ../../node_modules/highlight.js/lib/languages/brainfuck.js
var require_brainfuck = __commonJS({
  "../../node_modules/highlight.js/lib/languages/brainfuck.js"(exports, module) {
    function brainfuck(hljs) {
      const LITERAL = {
        className: "literal",
        begin: /[+-]/,
        relevance: 0
      };
      return {
        name: "Brainfuck",
        aliases: ["bf"],
        contains: [
          hljs.COMMENT(
            "[^\\[\\]\\.,\\+\\-<> \r\n]",
            "[\\[\\]\\.,\\+\\-<> \r\n]",
            {
              returnEnd: true,
              relevance: 0
            }
          ),
          {
            className: "title",
            begin: "[\\[\\]]",
            relevance: 0
          },
          {
            className: "string",
            begin: "[\\.,]",
            relevance: 0
          },
          {
            begin: /(?:\+\+|--)/,
            contains: [LITERAL]
          },
          LITERAL
        ]
      };
    }
    module.exports = brainfuck;
  }
});

export {
  require_brainfuck
};
//# sourceMappingURL=/myst-test/build/_shared/chunk-TBGKBJRM.js.map
