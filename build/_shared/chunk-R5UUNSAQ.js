import {
  __commonJS
} from "/myst-test/build/_shared/chunk-7D2LYYYY.js";

// ../../node_modules/highlight.js/lib/languages/json.js
var require_json = __commonJS({
  "../../node_modules/highlight.js/lib/languages/json.js"(exports, module) {
    function json(hljs) {
      const LITERALS = {
        literal: "true false null"
      };
      const ALLOWED_COMMENTS = [
        hljs.C_LINE_COMMENT_MODE,
        hljs.C_BLOCK_COMMENT_MODE
      ];
      const TYPES = [
        hljs.QUOTE_STRING_MODE,
        hljs.C_NUMBER_MODE
      ];
      const VALUE_CONTAINER = {
        end: ",",
        endsWithParent: true,
        excludeEnd: true,
        contains: TYPES,
        keywords: LITERALS
      };
      const OBJECT = {
        begin: /\{/,
        end: /\}/,
        contains: [
          {
            className: "attr",
            begin: /"/,
            end: /"/,
            contains: [hljs.BACKSLASH_ESCAPE],
            illegal: "\\n"
          },
          hljs.inherit(VALUE_CONTAINER, {
            begin: /:/
          })
        ].concat(ALLOWED_COMMENTS),
        illegal: "\\S"
      };
      const ARRAY = {
        begin: "\\[",
        end: "\\]",
        contains: [hljs.inherit(VALUE_CONTAINER)],
        illegal: "\\S"
      };
      TYPES.push(OBJECT, ARRAY);
      ALLOWED_COMMENTS.forEach(function(rule) {
        TYPES.push(rule);
      });
      return {
        name: "JSON",
        contains: TYPES,
        keywords: LITERALS,
        illegal: "\\S"
      };
    }
    module.exports = json;
  }
});

export {
  require_json
};
//# sourceMappingURL=/myst-test/build/_shared/chunk-R5UUNSAQ.js.map