import {
  __commonJS
} from "/myst-test/build/_shared/chunk-7D2LYYYY.js";

// ../../node_modules/refractor/lang/hsts.js
var require_hsts = __commonJS({
  "../../node_modules/refractor/lang/hsts.js"(exports, module) {
    module.exports = hsts;
    hsts.displayName = "hsts";
    hsts.aliases = [];
    function hsts(Prism) {
      Prism.languages.hsts = {
        directive: {
          pattern: /\b(?:includeSubDomains|max-age|preload)(?=[\s;=]|$)/i,
          alias: "property"
        },
        operator: /=/,
        punctuation: /;/
      };
    }
  }
});

export {
  require_hsts
};
//# sourceMappingURL=/myst-test/build/_shared/chunk-RSXHEJYL.js.map
