import {
  __commonJS
} from "/myst-test/build/_shared/chunk-7D2LYYYY.js";

// ../../node_modules/refractor/lang/hpkp.js
var require_hpkp = __commonJS({
  "../../node_modules/refractor/lang/hpkp.js"(exports, module) {
    module.exports = hpkp;
    hpkp.displayName = "hpkp";
    hpkp.aliases = [];
    function hpkp(Prism) {
      Prism.languages.hpkp = {
        directive: {
          pattern: /\b(?:includeSubDomains|max-age|pin-sha256|preload|report-to|report-uri|strict)(?=[\s;=]|$)/i,
          alias: "property"
        },
        operator: /=/,
        punctuation: /;/
      };
    }
  }
});

export {
  require_hpkp
};
//# sourceMappingURL=/myst-test/build/_shared/chunk-HND4IWLK.js.map
