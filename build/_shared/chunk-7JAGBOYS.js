import {
  __commonJS
} from "/myst-test/build/_shared/chunk-7D2LYYYY.js";

// ../../node_modules/highlight.js/lib/languages/mojolicious.js
var require_mojolicious = __commonJS({
  "../../node_modules/highlight.js/lib/languages/mojolicious.js"(exports, module) {
    function mojolicious(hljs) {
      return {
        name: "Mojolicious",
        subLanguage: "xml",
        contains: [
          {
            className: "meta",
            begin: "^__(END|DATA)__$"
          },
          {
            begin: "^\\s*%{1,2}={0,2}",
            end: "$",
            subLanguage: "perl"
          },
          {
            begin: "<%{1,2}={0,2}",
            end: "={0,1}%>",
            subLanguage: "perl",
            excludeBegin: true,
            excludeEnd: true
          }
        ]
      };
    }
    module.exports = mojolicious;
  }
});

export {
  require_mojolicious
};
//# sourceMappingURL=/myst-test/build/_shared/chunk-7JAGBOYS.js.map
