import {
  __commonJS
} from "/myst-test/build/_shared/chunk-7D2LYYYY.js";

// ../../node_modules/highlight.js/lib/languages/tap.js
var require_tap = __commonJS({
  "../../node_modules/highlight.js/lib/languages/tap.js"(exports, module) {
    function tap(hljs) {
      return {
        name: "Test Anything Protocol",
        case_insensitive: true,
        contains: [
          hljs.HASH_COMMENT_MODE,
          {
            className: "meta",
            variants: [
              {
                begin: "^TAP version (\\d+)$"
              },
              {
                begin: "^1\\.\\.(\\d+)$"
              }
            ]
          },
          {
            begin: /---$/,
            end: "\\.\\.\\.$",
            subLanguage: "yaml",
            relevance: 0
          },
          {
            className: "number",
            begin: " (\\d+) "
          },
          {
            className: "symbol",
            variants: [
              {
                begin: "^ok"
              },
              {
                begin: "^not ok"
              }
            ]
          }
        ]
      };
    }
    module.exports = tap;
  }
});

export {
  require_tap
};
//# sourceMappingURL=/myst-test/build/_shared/chunk-SDNYBRBG.js.map
