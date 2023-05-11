import {
  __commonJS
} from "/myst-test/build/_shared/chunk-7D2LYYYY.js";

// ../../node_modules/highlight.js/lib/languages/shell.js
var require_shell = __commonJS({
  "../../node_modules/highlight.js/lib/languages/shell.js"(exports, module) {
    function shell(hljs) {
      return {
        name: "Shell Session",
        aliases: ["console"],
        contains: [
          {
            className: "meta",
            begin: /^\s{0,3}[/~\w\d[\]()@-]*[>%$#]/,
            starts: {
              end: /[^\\](?=\s*$)/,
              subLanguage: "bash"
            }
          }
        ]
      };
    }
    module.exports = shell;
  }
});

export {
  require_shell
};
//# sourceMappingURL=/myst-test/build/_shared/chunk-WD33EIEM.js.map
