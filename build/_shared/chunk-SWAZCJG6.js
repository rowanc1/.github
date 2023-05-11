import {
  __commonJS
} from "/myst-test/build/_shared/chunk-7D2LYYYY.js";

// ../../node_modules/refractor/lang/gcode.js
var require_gcode = __commonJS({
  "../../node_modules/refractor/lang/gcode.js"(exports, module) {
    module.exports = gcode;
    gcode.displayName = "gcode";
    gcode.aliases = [];
    function gcode(Prism) {
      Prism.languages.gcode = {
        comment: /;.*|\B\(.*?\)\B/,
        string: {
          pattern: /"(?:""|[^"])*"/,
          greedy: true
        },
        keyword: /\b[GM]\d+(?:\.\d+)?\b/,
        property: /\b[A-Z]/,
        checksum: {
          pattern: /(\*)\d+/,
          lookbehind: true,
          alias: "number"
        },
        punctuation: /[:*]/
      };
    }
  }
});

export {
  require_gcode
};
//# sourceMappingURL=/myst-test/build/_shared/chunk-SWAZCJG6.js.map
