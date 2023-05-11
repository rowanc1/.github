import {
  __commonJS
} from "/myst-test/build/_shared/chunk-7D2LYYYY.js";

// ../../node_modules/highlight.js/lib/languages/ldif.js
var require_ldif = __commonJS({
  "../../node_modules/highlight.js/lib/languages/ldif.js"(exports, module) {
    function ldif(hljs) {
      return {
        name: "LDIF",
        contains: [
          {
            className: "attribute",
            begin: "^dn",
            end: ": ",
            excludeEnd: true,
            starts: {
              end: "$",
              relevance: 0
            },
            relevance: 10
          },
          {
            className: "attribute",
            begin: "^\\w",
            end: ": ",
            excludeEnd: true,
            starts: {
              end: "$",
              relevance: 0
            }
          },
          {
            className: "literal",
            begin: "^-",
            end: "$"
          },
          hljs.HASH_COMMENT_MODE
        ]
      };
    }
    module.exports = ldif;
  }
});

export {
  require_ldif
};
//# sourceMappingURL=/myst-test/build/_shared/chunk-WVHJASG6.js.map
