import {
  require_scheme
} from "/myst-test/build/_shared/chunk-3VGCRDFI.js";
import {
  __commonJS
} from "/myst-test/build/_shared/chunk-7D2LYYYY.js";

// ../../node_modules/refractor/lang/racket.js
var require_racket = __commonJS({
  "../../node_modules/refractor/lang/racket.js"(exports, module) {
    var refractorScheme = require_scheme();
    module.exports = racket;
    racket.displayName = "racket";
    racket.aliases = ["rkt"];
    function racket(Prism) {
      Prism.register(refractorScheme);
      Prism.languages.racket = Prism.languages.extend("scheme", {
        "lambda-parameter": {
          pattern: /([(\[]lambda\s+[(\[])[^()\[\]'\s]+/,
          lookbehind: true
        }
      });
      Prism.languages.insertBefore("racket", "string", {
        lang: {
          pattern: /^#lang.+/m,
          greedy: true,
          alias: "keyword"
        }
      });
      Prism.languages.rkt = Prism.languages.racket;
    }
  }
});

export {
  require_racket
};
//# sourceMappingURL=/myst-test/build/_shared/chunk-Q2Z3ENRE.js.map
