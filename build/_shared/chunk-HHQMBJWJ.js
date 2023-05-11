import {
  __commonJS,
  __esm,
  __export,
  __toESM
} from "/myst-test/build/_shared/chunk-7D2LYYYY.js";

// ../../node_modules/zwitch/index.js
function zwitch(key, options) {
  const settings = options || {};
  function one2(value, ...parameters) {
    let fn = one2.invalid;
    const handlers = one2.handlers;
    if (value && own.call(value, key)) {
      const id = String(value[key]);
      fn = own.call(handlers, id) ? handlers[id] : one2.unknown;
    }
    if (fn) {
      return fn.call(this, value, ...parameters);
    }
  }
  one2.handlers = settings.handlers || {};
  one2.invalid = settings.invalid;
  one2.unknown = settings.unknown;
  return one2;
}
var own;
var init_zwitch = __esm({
  "../../node_modules/zwitch/index.js"() {
    own = {}.hasOwnProperty;
  }
});

// ../../node_modules/unist-util-select/lib/attribute.js
function attribute(query, node) {
  let index = -1;
  while (++index < query.attrs.length) {
    if (!handle(query.attrs[index], node))
      return false;
  }
  return true;
}
function exists(query, node) {
  return node[query.name] !== null && node[query.name] !== void 0;
}
function exact(query, node) {
  return exists(query, node) && String(node[query.name]) === query.value;
}
function containsArray(query, node) {
  const value = node[query.name];
  if (value === null || value === void 0)
    return false;
  if (Array.isArray(value) && value.includes(query.value)) {
    return true;
  }
  return String(value) === query.value;
}
function begins(query, node) {
  const value = node[query.name];
  return Boolean(
    query.value && typeof value === "string" && value.slice(0, query.value.length) === query.value
  );
}
function ends(query, node) {
  const value = node[query.name];
  return Boolean(
    query.value && typeof value === "string" && value.slice(-query.value.length) === query.value
  );
}
function containsString(query, node) {
  const value = node[query.name];
  return Boolean(
    query.value && typeof value === "string" && value.includes(query.value)
  );
}
function unknownOperator(query) {
  throw new Error("Unknown operator `" + query.operator + "`");
}
var handle;
var init_attribute = __esm({
  "../../node_modules/unist-util-select/lib/attribute.js"() {
    init_zwitch();
    handle = zwitch("operator", {
      unknown: unknownOperator,
      invalid: exists,
      handlers: {
        "=": exact,
        "^=": begins,
        "$=": ends,
        "*=": containsString,
        "~=": containsArray
      }
    });
  }
});

// ../../node_modules/unist-util-select/lib/name.js
function name(query, node) {
  return query.tagName === "*" || query.tagName === node.type;
}
var init_name = __esm({
  "../../node_modules/unist-util-select/lib/name.js"() {
  }
});

// ../../node_modules/nth-check/lib/esm/parse.js
function parse(formula) {
  formula = formula.trim().toLowerCase();
  if (formula === "even") {
    return [2, 0];
  } else if (formula === "odd") {
    return [2, 1];
  }
  let idx = 0;
  let a = 0;
  let sign = readSign();
  let number = readNumber();
  if (idx < formula.length && formula.charAt(idx) === "n") {
    idx++;
    a = sign * (number !== null && number !== void 0 ? number : 1);
    skipWhitespace();
    if (idx < formula.length) {
      sign = readSign();
      skipWhitespace();
      number = readNumber();
    } else {
      sign = number = 0;
    }
  }
  if (number === null || idx < formula.length) {
    throw new Error(`n-th rule couldn't be parsed ('${formula}')`);
  }
  return [a, sign * number];
  function readSign() {
    if (formula.charAt(idx) === "-") {
      idx++;
      return -1;
    }
    if (formula.charAt(idx) === "+") {
      idx++;
    }
    return 1;
  }
  function readNumber() {
    const start = idx;
    let value = 0;
    while (idx < formula.length && formula.charCodeAt(idx) >= ZERO && formula.charCodeAt(idx) <= NINE) {
      value = value * 10 + (formula.charCodeAt(idx) - ZERO);
      idx++;
    }
    return idx === start ? null : value;
  }
  function skipWhitespace() {
    while (idx < formula.length && whitespace.has(formula.charCodeAt(idx))) {
      idx++;
    }
  }
}
var whitespace, ZERO, NINE;
var init_parse = __esm({
  "../../node_modules/nth-check/lib/esm/parse.js"() {
    whitespace = /* @__PURE__ */ new Set([9, 10, 12, 13, 32]);
    ZERO = "0".charCodeAt(0);
    NINE = "9".charCodeAt(0);
  }
});

// ../../node_modules/boolbase/index.js
var require_boolbase = __commonJS({
  "../../node_modules/boolbase/index.js"(exports, module) {
    module.exports = {
      trueFunc: function trueFunc() {
        return true;
      },
      falseFunc: function falseFunc() {
        return false;
      }
    };
  }
});

// ../../node_modules/nth-check/lib/esm/compile.js
function compile(parsed) {
  const a = parsed[0];
  const b = parsed[1] - 1;
  if (b < 0 && a <= 0)
    return import_boolbase.default.falseFunc;
  if (a === -1)
    return (index) => index <= b;
  if (a === 0)
    return (index) => index === b;
  if (a === 1)
    return b < 0 ? import_boolbase.default.trueFunc : (index) => index >= b;
  const absA = Math.abs(a);
  const bMod = (b % absA + absA) % absA;
  return a > 1 ? (index) => index >= b && index % absA === bMod : (index) => index <= b && index % absA === bMod;
}
var import_boolbase;
var init_compile = __esm({
  "../../node_modules/nth-check/lib/esm/compile.js"() {
    import_boolbase = __toESM(require_boolbase(), 1);
  }
});

// ../../node_modules/nth-check/lib/esm/index.js
function nthCheck(formula) {
  return compile(parse(formula));
}
var init_esm = __esm({
  "../../node_modules/nth-check/lib/esm/index.js"() {
    init_parse();
    init_compile();
  }
});

// ../../node_modules/unist-util-select/lib/util.js
function parent(node) {
  return Array.isArray(node.children);
}
var init_util = __esm({
  "../../node_modules/unist-util-select/lib/util.js"() {
  }
});

// ../../node_modules/unist-util-select/lib/pseudo.js
function pseudo(query, node, index, parent2, state) {
  const pseudos = query.pseudos;
  let offset = -1;
  while (++offset < pseudos.length) {
    if (!handle2(pseudos[offset], node, index, parent2, state))
      return false;
  }
  return true;
}
function empty(_1, node) {
  return parent(node) ? node.children.length === 0 : !("value" in node);
}
function firstChild(query, _1, _2, _3, state) {
  assertDeep(state, query);
  return state.nodeIndex === 0;
}
function firstOfType(query, _1, _2, _3, state) {
  assertDeep(state, query);
  return state.typeIndex === 0;
}
function has(query, node, _1, _2, state) {
  const fragment = { type: "root", children: parent(node) ? node.children : [] };
  const childState = {
    ...state,
    found: false,
    shallow: false,
    one: true,
    scopeNodes: [node],
    results: [],
    rootQuery: queryToSelectors(query.value)
  };
  walk(childState, fragment);
  return childState.results.length > 0;
}
function lastChild(query, _1, _2, _3, state) {
  assertDeep(state, query);
  return typeof state.nodeCount === "number" && state.nodeIndex === state.nodeCount - 1;
}
function lastOfType(query, _1, _2, _3, state) {
  assertDeep(state, query);
  return typeof state.typeCount === "number" && state.typeIndex === state.typeCount - 1;
}
function matches(query, node, _1, _2, state) {
  const childState = {
    ...state,
    found: false,
    shallow: false,
    one: true,
    scopeNodes: [node],
    results: [],
    rootQuery: queryToSelectors(query.value)
  };
  walk(childState, node);
  return childState.results[0] === node;
}
function not(query, node, index, parent2, state) {
  return !matches(query, node, index, parent2, state);
}
function nthChild(query, _1, _2, _3, state) {
  const fn = getCachedNthCheck(query);
  assertDeep(state, query);
  return typeof state.nodeIndex === "number" && fn(state.nodeIndex);
}
function nthLastChild(query, _1, _2, _3, state) {
  const fn = getCachedNthCheck(query);
  assertDeep(state, query);
  return typeof state.nodeCount === "number" && typeof state.nodeIndex === "number" && fn(state.nodeCount - state.nodeIndex - 1);
}
function nthLastOfType(query, _1, _2, _3, state) {
  const fn = getCachedNthCheck(query);
  assertDeep(state, query);
  return typeof state.typeIndex === "number" && typeof state.typeCount === "number" && fn(state.typeCount - 1 - state.typeIndex);
}
function nthOfType(query, _1, _2, _3, state) {
  const fn = getCachedNthCheck(query);
  assertDeep(state, query);
  return typeof state.typeIndex === "number" && fn(state.typeIndex);
}
function onlyChild(query, _1, _2, _3, state) {
  assertDeep(state, query);
  return state.nodeCount === 1;
}
function onlyOfType(query, _1, _2, _3, state) {
  assertDeep(state, query);
  return state.typeCount === 1;
}
function root(_1, node, _2, parent2) {
  return node && !parent2;
}
function scope(_1, node, _2, _3, state) {
  return node && state.scopeNodes.includes(node);
}
function invalidPseudo() {
  throw new Error("Invalid pseudo-selector");
}
function unknownPseudo(query) {
  if (query.name) {
    throw new Error("Unknown pseudo-selector `" + query.name + "`");
  }
  throw new Error("Unexpected pseudo-element or empty pseudo-class");
}
function assertDeep(state, query) {
  if (state.shallow) {
    throw new Error("Cannot use `:" + query.name + "` without parent");
  }
}
function getCachedNthCheck(query) {
  let fn = query._cachedFn;
  if (!fn) {
    fn = nthCheck2(query.value);
    query._cachedFn = fn;
  }
  return fn;
}
var nthCheck2, handle2;
var init_pseudo = __esm({
  "../../node_modules/unist-util-select/lib/pseudo.js"() {
    init_esm();
    init_zwitch();
    init_util();
    init_walk();
    nthCheck2 = nthCheck.default || nthCheck;
    handle2 = zwitch("name", {
      unknown: unknownPseudo,
      invalid: invalidPseudo,
      handlers: {
        any: matches,
        blank: empty,
        empty,
        "first-child": firstChild,
        "first-of-type": firstOfType,
        has,
        "last-child": lastChild,
        "last-of-type": lastOfType,
        matches,
        not,
        "nth-child": nthChild,
        "nth-last-child": nthLastChild,
        "nth-of-type": nthOfType,
        "nth-last-of-type": nthLastOfType,
        "only-child": onlyChild,
        "only-of-type": onlyOfType,
        root,
        scope
      }
    });
    pseudo.needsIndex = [
      "any",
      "first-child",
      "first-of-type",
      "last-child",
      "last-of-type",
      "matches",
      "not",
      "nth-child",
      "nth-last-child",
      "nth-of-type",
      "nth-last-of-type",
      "only-child",
      "only-of-type"
    ];
  }
});

// ../../node_modules/unist-util-select/lib/test.js
function test(query, node, index, parent2, state) {
  if (query.id)
    throw new Error("Invalid selector: id");
  if (query.classNames)
    throw new Error("Invalid selector: class");
  return Boolean(
    node && (!query.tagName || name(query, node)) && (!query.attrs || attribute(query, node)) && (!query.pseudos || pseudo(query, node, index, parent2, state))
  );
}
var init_test = __esm({
  "../../node_modules/unist-util-select/lib/test.js"() {
    init_attribute();
    init_name();
    init_pseudo();
  }
});

// ../../node_modules/unist-util-select/lib/walk.js
function queryToSelectors(query) {
  if (query === null) {
    return { type: "selectors", selectors: [] };
  }
  if (query.type === "ruleSet") {
    return { type: "selectors", selectors: [query] };
  }
  return query;
}
function walk(state, tree) {
  if (tree) {
    one(state, [], tree, void 0, void 0);
  }
}
function one(state, currentRules, node, index, parentNode) {
  let nestResult = {
    directChild: void 0,
    descendant: void 0,
    adjacentSibling: void 0,
    generalSibling: void 0
  };
  nestResult = applySelectors(
    state,
    combine(currentRules, state.rootQuery.selectors),
    node,
    index,
    parentNode
  );
  if (parent(node) && !state.shallow && !(state.one && state.found)) {
    all(state, nestResult, node);
  }
  return nestResult;
}
function all(state, nest, node) {
  const fromParent = combine(nest.descendant, nest.directChild);
  let fromSibling;
  let index = -1;
  const total = { count: 0, types: /* @__PURE__ */ new Map() };
  const before = { count: 0, types: /* @__PURE__ */ new Map() };
  while (++index < node.children.length) {
    count(total, node.children[index]);
  }
  index = -1;
  while (++index < node.children.length) {
    const child = node.children[index];
    const name2 = child.type.toUpperCase();
    state.nodeIndex = before.count;
    state.typeIndex = before.types.get(name2) || 0;
    state.nodeCount = total.count;
    state.typeCount = total.types.get(name2);
    const forSibling = combine(fromParent, fromSibling);
    const nest2 = one(state, forSibling, node.children[index], index, node);
    fromSibling = combine(nest2.generalSibling, nest2.adjacentSibling);
    if (state.one && state.found) {
      break;
    }
    count(before, node.children[index]);
  }
}
function applySelectors(state, rules, node, index, parent2) {
  const nestResult = {
    directChild: void 0,
    descendant: void 0,
    adjacentSibling: void 0,
    generalSibling: void 0
  };
  let selectorIndex = -1;
  while (++selectorIndex < rules.length) {
    const ruleSet = rules[selectorIndex];
    if (state.one && state.found) {
      break;
    }
    if (state.shallow && ruleSet.rule.rule) {
      throw new Error("Expected selector without nesting");
    }
    if (test(ruleSet.rule, node, index, parent2, state)) {
      const nest = ruleSet.rule.rule;
      if (nest) {
        const rule = { type: "ruleSet", rule: nest };
        const label = nest.nestingOperator === "+" ? "adjacentSibling" : nest.nestingOperator === "~" ? "generalSibling" : nest.nestingOperator === ">" ? "directChild" : "descendant";
        add(nestResult, label, rule);
      } else {
        state.found = true;
        if (!state.results.includes(node)) {
          state.results.push(node);
        }
      }
    }
    if (ruleSet.rule.nestingOperator === null) {
      add(nestResult, "descendant", ruleSet);
    } else if (ruleSet.rule.nestingOperator === "~") {
      add(nestResult, "generalSibling", ruleSet);
    }
  }
  return nestResult;
}
function combine(left, right) {
  return left && right && left.length > 0 && right.length > 0 ? [...left, ...right] : left && left.length > 0 ? left : right && right.length > 0 ? right : empty2;
}
function add(nest, field, rule) {
  const list = nest[field];
  if (list) {
    list.push(rule);
  } else {
    nest[field] = [rule];
  }
}
function count(counts, node) {
  const name2 = node.type.toUpperCase();
  const count2 = (counts.types.get(name2) || 0) + 1;
  counts.count++;
  counts.types.set(name2, count2);
}
var empty2;
var init_walk = __esm({
  "../../node_modules/unist-util-select/lib/walk.js"() {
    init_test();
    init_util();
    empty2 = [];
  }
});

// ../../node_modules/css-selector-parser/lib/utils.js
var require_utils = __commonJS({
  "../../node_modules/css-selector-parser/lib/utils.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function isIdentStart(c) {
      return c >= "a" && c <= "z" || c >= "A" && c <= "Z" || c === "-" || c === "_";
    }
    exports.isIdentStart = isIdentStart;
    function isIdent(c) {
      return c >= "a" && c <= "z" || c >= "A" && c <= "Z" || c >= "0" && c <= "9" || c === "-" || c === "_";
    }
    exports.isIdent = isIdent;
    function isHex(c) {
      return c >= "a" && c <= "f" || c >= "A" && c <= "F" || c >= "0" && c <= "9";
    }
    exports.isHex = isHex;
    function escapeIdentifier(s) {
      var len = s.length;
      var result = "";
      var i = 0;
      while (i < len) {
        var chr = s.charAt(i);
        if (exports.identSpecialChars[chr]) {
          result += "\\" + chr;
        } else {
          if (!(chr === "_" || chr === "-" || chr >= "A" && chr <= "Z" || chr >= "a" && chr <= "z" || i !== 0 && chr >= "0" && chr <= "9")) {
            var charCode = chr.charCodeAt(0);
            if ((charCode & 63488) === 55296) {
              var extraCharCode = s.charCodeAt(i++);
              if ((charCode & 64512) !== 55296 || (extraCharCode & 64512) !== 56320) {
                throw Error("UCS-2(decode): illegal sequence");
              }
              charCode = ((charCode & 1023) << 10) + (extraCharCode & 1023) + 65536;
            }
            result += "\\" + charCode.toString(16) + " ";
          } else {
            result += chr;
          }
        }
        i++;
      }
      return result;
    }
    exports.escapeIdentifier = escapeIdentifier;
    function escapeStr(s) {
      var len = s.length;
      var result = "";
      var i = 0;
      var replacement;
      while (i < len) {
        var chr = s.charAt(i);
        if (chr === '"') {
          chr = '\\"';
        } else if (chr === "\\") {
          chr = "\\\\";
        } else if ((replacement = exports.strReplacementsRev[chr]) !== void 0) {
          chr = replacement;
        }
        result += chr;
        i++;
      }
      return '"' + result + '"';
    }
    exports.escapeStr = escapeStr;
    exports.identSpecialChars = {
      "!": true,
      '"': true,
      "#": true,
      "$": true,
      "%": true,
      "&": true,
      "'": true,
      "(": true,
      ")": true,
      "*": true,
      "+": true,
      ",": true,
      ".": true,
      "/": true,
      ";": true,
      "<": true,
      "=": true,
      ">": true,
      "?": true,
      "@": true,
      "[": true,
      "\\": true,
      "]": true,
      "^": true,
      "`": true,
      "{": true,
      "|": true,
      "}": true,
      "~": true
    };
    exports.strReplacementsRev = {
      "\n": "\\n",
      "\r": "\\r",
      "	": "\\t",
      "\f": "\\f",
      "\v": "\\v"
    };
    exports.singleQuoteEscapeChars = {
      n: "\n",
      r: "\r",
      t: "	",
      f: "\f",
      "\\": "\\",
      "'": "'"
    };
    exports.doubleQuotesEscapeChars = {
      n: "\n",
      r: "\r",
      t: "	",
      f: "\f",
      "\\": "\\",
      '"': '"'
    };
  }
});

// ../../node_modules/css-selector-parser/lib/parser-context.js
var require_parser_context = __commonJS({
  "../../node_modules/css-selector-parser/lib/parser-context.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils_1 = require_utils();
    function parseCssSelector(str, pos, pseudos, attrEqualityMods, ruleNestingOperators, substitutesEnabled) {
      var l = str.length;
      var chr = "";
      function getStr(quote, escapeTable) {
        var result = "";
        pos++;
        chr = str.charAt(pos);
        while (pos < l) {
          if (chr === quote) {
            pos++;
            return result;
          } else if (chr === "\\") {
            pos++;
            chr = str.charAt(pos);
            var esc = void 0;
            if (chr === quote) {
              result += quote;
            } else if ((esc = escapeTable[chr]) !== void 0) {
              result += esc;
            } else if (utils_1.isHex(chr)) {
              var hex = chr;
              pos++;
              chr = str.charAt(pos);
              while (utils_1.isHex(chr)) {
                hex += chr;
                pos++;
                chr = str.charAt(pos);
              }
              if (chr === " ") {
                pos++;
                chr = str.charAt(pos);
              }
              result += String.fromCharCode(parseInt(hex, 16));
              continue;
            } else {
              result += chr;
            }
          } else {
            result += chr;
          }
          pos++;
          chr = str.charAt(pos);
        }
        return result;
      }
      function getIdent() {
        var result = "";
        chr = str.charAt(pos);
        while (pos < l) {
          if (utils_1.isIdent(chr)) {
            result += chr;
          } else if (chr === "\\") {
            pos++;
            if (pos >= l) {
              throw Error("Expected symbol but end of file reached.");
            }
            chr = str.charAt(pos);
            if (utils_1.identSpecialChars[chr]) {
              result += chr;
            } else if (utils_1.isHex(chr)) {
              var hex = chr;
              pos++;
              chr = str.charAt(pos);
              while (utils_1.isHex(chr)) {
                hex += chr;
                pos++;
                chr = str.charAt(pos);
              }
              if (chr === " ") {
                pos++;
                chr = str.charAt(pos);
              }
              result += String.fromCharCode(parseInt(hex, 16));
              continue;
            } else {
              result += chr;
            }
          } else {
            return result;
          }
          pos++;
          chr = str.charAt(pos);
        }
        return result;
      }
      function skipWhitespace() {
        chr = str.charAt(pos);
        var result = false;
        while (chr === " " || chr === "	" || chr === "\n" || chr === "\r" || chr === "\f") {
          result = true;
          pos++;
          chr = str.charAt(pos);
        }
        return result;
      }
      function parse3() {
        var res = parseSelector();
        if (pos < l) {
          throw Error('Rule expected but "' + str.charAt(pos) + '" found.');
        }
        return res;
      }
      function parseSelector() {
        var selector = parseSingleSelector();
        if (!selector) {
          return null;
        }
        var res = selector;
        chr = str.charAt(pos);
        while (chr === ",") {
          pos++;
          skipWhitespace();
          if (res.type !== "selectors") {
            res = {
              type: "selectors",
              selectors: [selector]
            };
          }
          selector = parseSingleSelector();
          if (!selector) {
            throw Error('Rule expected after ",".');
          }
          res.selectors.push(selector);
        }
        return res;
      }
      function parseSingleSelector() {
        skipWhitespace();
        var selector = {
          type: "ruleSet"
        };
        var rule = parseRule();
        if (!rule) {
          return null;
        }
        var currentRule = selector;
        while (rule) {
          rule.type = "rule";
          currentRule.rule = rule;
          currentRule = rule;
          skipWhitespace();
          chr = str.charAt(pos);
          if (pos >= l || chr === "," || chr === ")") {
            break;
          }
          if (ruleNestingOperators[chr]) {
            var op = chr;
            pos++;
            skipWhitespace();
            rule = parseRule();
            if (!rule) {
              throw Error('Rule expected after "' + op + '".');
            }
            rule.nestingOperator = op;
          } else {
            rule = parseRule();
            if (rule) {
              rule.nestingOperator = null;
            }
          }
        }
        return selector;
      }
      function parseRule() {
        var rule = null;
        while (pos < l) {
          chr = str.charAt(pos);
          if (chr === "*") {
            pos++;
            (rule = rule || {}).tagName = "*";
          } else if (utils_1.isIdentStart(chr) || chr === "\\") {
            (rule = rule || {}).tagName = getIdent();
          } else if (chr === ".") {
            pos++;
            rule = rule || {};
            (rule.classNames = rule.classNames || []).push(getIdent());
          } else if (chr === "#") {
            pos++;
            (rule = rule || {}).id = getIdent();
          } else if (chr === "[") {
            pos++;
            skipWhitespace();
            var attr = {
              name: getIdent()
            };
            skipWhitespace();
            if (chr === "]") {
              pos++;
            } else {
              var operator = "";
              if (attrEqualityMods[chr]) {
                operator = chr;
                pos++;
                chr = str.charAt(pos);
              }
              if (pos >= l) {
                throw Error('Expected "=" but end of file reached.');
              }
              if (chr !== "=") {
                throw Error('Expected "=" but "' + chr + '" found.');
              }
              attr.operator = operator + "=";
              pos++;
              skipWhitespace();
              var attrValue = "";
              attr.valueType = "string";
              if (chr === '"') {
                attrValue = getStr('"', utils_1.doubleQuotesEscapeChars);
              } else if (chr === "'") {
                attrValue = getStr("'", utils_1.singleQuoteEscapeChars);
              } else if (substitutesEnabled && chr === "$") {
                pos++;
                attrValue = getIdent();
                attr.valueType = "substitute";
              } else {
                while (pos < l) {
                  if (chr === "]") {
                    break;
                  }
                  attrValue += chr;
                  pos++;
                  chr = str.charAt(pos);
                }
                attrValue = attrValue.trim();
              }
              skipWhitespace();
              if (pos >= l) {
                throw Error('Expected "]" but end of file reached.');
              }
              if (chr !== "]") {
                throw Error('Expected "]" but "' + chr + '" found.');
              }
              pos++;
              attr.value = attrValue;
            }
            rule = rule || {};
            (rule.attrs = rule.attrs || []).push(attr);
          } else if (chr === ":") {
            pos++;
            var pseudoName = getIdent();
            var pseudo2 = {
              name: pseudoName
            };
            if (chr === "(") {
              pos++;
              var value = "";
              skipWhitespace();
              if (pseudos[pseudoName] === "selector") {
                pseudo2.valueType = "selector";
                value = parseSelector();
              } else {
                pseudo2.valueType = pseudos[pseudoName] || "string";
                if (chr === '"') {
                  value = getStr('"', utils_1.doubleQuotesEscapeChars);
                } else if (chr === "'") {
                  value = getStr("'", utils_1.singleQuoteEscapeChars);
                } else if (substitutesEnabled && chr === "$") {
                  pos++;
                  value = getIdent();
                  pseudo2.valueType = "substitute";
                } else {
                  while (pos < l) {
                    if (chr === ")") {
                      break;
                    }
                    value += chr;
                    pos++;
                    chr = str.charAt(pos);
                  }
                  value = value.trim();
                }
                skipWhitespace();
              }
              if (pos >= l) {
                throw Error('Expected ")" but end of file reached.');
              }
              if (chr !== ")") {
                throw Error('Expected ")" but "' + chr + '" found.');
              }
              pos++;
              pseudo2.value = value;
            }
            rule = rule || {};
            (rule.pseudos = rule.pseudos || []).push(pseudo2);
          } else {
            break;
          }
        }
        return rule;
      }
      return parse3();
    }
    exports.parseCssSelector = parseCssSelector;
  }
});

// ../../node_modules/css-selector-parser/lib/render.js
var require_render = __commonJS({
  "../../node_modules/css-selector-parser/lib/render.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils_1 = require_utils();
    function renderEntity(entity) {
      var res = "";
      switch (entity.type) {
        case "ruleSet":
          var currentEntity = entity.rule;
          var parts = [];
          while (currentEntity) {
            if (currentEntity.nestingOperator) {
              parts.push(currentEntity.nestingOperator);
            }
            parts.push(renderEntity(currentEntity));
            currentEntity = currentEntity.rule;
          }
          res = parts.join(" ");
          break;
        case "selectors":
          res = entity.selectors.map(renderEntity).join(", ");
          break;
        case "rule":
          if (entity.tagName) {
            if (entity.tagName === "*") {
              res = "*";
            } else {
              res = utils_1.escapeIdentifier(entity.tagName);
            }
          }
          if (entity.id) {
            res += "#" + utils_1.escapeIdentifier(entity.id);
          }
          if (entity.classNames) {
            res += entity.classNames.map(function(cn) {
              return "." + utils_1.escapeIdentifier(cn);
            }).join("");
          }
          if (entity.attrs) {
            res += entity.attrs.map(function(attr) {
              if ("operator" in attr) {
                if (attr.valueType === "substitute") {
                  return "[" + utils_1.escapeIdentifier(attr.name) + attr.operator + "$" + attr.value + "]";
                } else {
                  return "[" + utils_1.escapeIdentifier(attr.name) + attr.operator + utils_1.escapeStr(attr.value) + "]";
                }
              } else {
                return "[" + utils_1.escapeIdentifier(attr.name) + "]";
              }
            }).join("");
          }
          if (entity.pseudos) {
            res += entity.pseudos.map(function(pseudo2) {
              if (pseudo2.valueType) {
                if (pseudo2.valueType === "selector") {
                  return ":" + utils_1.escapeIdentifier(pseudo2.name) + "(" + renderEntity(pseudo2.value) + ")";
                } else if (pseudo2.valueType === "substitute") {
                  return ":" + utils_1.escapeIdentifier(pseudo2.name) + "($" + pseudo2.value + ")";
                } else if (pseudo2.valueType === "numeric") {
                  return ":" + utils_1.escapeIdentifier(pseudo2.name) + "(" + pseudo2.value + ")";
                } else {
                  return ":" + utils_1.escapeIdentifier(pseudo2.name) + "(" + utils_1.escapeIdentifier(pseudo2.value) + ")";
                }
              } else {
                return ":" + utils_1.escapeIdentifier(pseudo2.name);
              }
            }).join("");
          }
          break;
        default:
          throw Error('Unknown entity type: "' + entity.type + '".');
      }
      return res;
    }
    exports.renderEntity = renderEntity;
  }
});

// ../../node_modules/css-selector-parser/lib/index.js
var require_lib = __commonJS({
  "../../node_modules/css-selector-parser/lib/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var parser_context_1 = require_parser_context();
    var render_1 = require_render();
    var CssSelectorParser2 = function() {
      function CssSelectorParser3() {
        this.pseudos = {};
        this.attrEqualityMods = {};
        this.ruleNestingOperators = {};
        this.substitutesEnabled = false;
      }
      CssSelectorParser3.prototype.registerSelectorPseudos = function() {
        var pseudos = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          pseudos[_i] = arguments[_i];
        }
        for (var _a = 0, pseudos_1 = pseudos; _a < pseudos_1.length; _a++) {
          var pseudo2 = pseudos_1[_a];
          this.pseudos[pseudo2] = "selector";
        }
        return this;
      };
      CssSelectorParser3.prototype.unregisterSelectorPseudos = function() {
        var pseudos = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          pseudos[_i] = arguments[_i];
        }
        for (var _a = 0, pseudos_2 = pseudos; _a < pseudos_2.length; _a++) {
          var pseudo2 = pseudos_2[_a];
          delete this.pseudos[pseudo2];
        }
        return this;
      };
      CssSelectorParser3.prototype.registerNumericPseudos = function() {
        var pseudos = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          pseudos[_i] = arguments[_i];
        }
        for (var _a = 0, pseudos_3 = pseudos; _a < pseudos_3.length; _a++) {
          var pseudo2 = pseudos_3[_a];
          this.pseudos[pseudo2] = "numeric";
        }
        return this;
      };
      CssSelectorParser3.prototype.unregisterNumericPseudos = function() {
        var pseudos = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          pseudos[_i] = arguments[_i];
        }
        for (var _a = 0, pseudos_4 = pseudos; _a < pseudos_4.length; _a++) {
          var pseudo2 = pseudos_4[_a];
          delete this.pseudos[pseudo2];
        }
        return this;
      };
      CssSelectorParser3.prototype.registerNestingOperators = function() {
        var operators = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          operators[_i] = arguments[_i];
        }
        for (var _a = 0, operators_1 = operators; _a < operators_1.length; _a++) {
          var operator = operators_1[_a];
          this.ruleNestingOperators[operator] = true;
        }
        return this;
      };
      CssSelectorParser3.prototype.unregisterNestingOperators = function() {
        var operators = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          operators[_i] = arguments[_i];
        }
        for (var _a = 0, operators_2 = operators; _a < operators_2.length; _a++) {
          var operator = operators_2[_a];
          delete this.ruleNestingOperators[operator];
        }
        return this;
      };
      CssSelectorParser3.prototype.registerAttrEqualityMods = function() {
        var mods = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          mods[_i] = arguments[_i];
        }
        for (var _a = 0, mods_1 = mods; _a < mods_1.length; _a++) {
          var mod = mods_1[_a];
          this.attrEqualityMods[mod] = true;
        }
        return this;
      };
      CssSelectorParser3.prototype.unregisterAttrEqualityMods = function() {
        var mods = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          mods[_i] = arguments[_i];
        }
        for (var _a = 0, mods_2 = mods; _a < mods_2.length; _a++) {
          var mod = mods_2[_a];
          delete this.attrEqualityMods[mod];
        }
        return this;
      };
      CssSelectorParser3.prototype.enableSubstitutes = function() {
        this.substitutesEnabled = true;
        return this;
      };
      CssSelectorParser3.prototype.disableSubstitutes = function() {
        this.substitutesEnabled = false;
        return this;
      };
      CssSelectorParser3.prototype.parse = function(str) {
        return parser_context_1.parseCssSelector(str, 0, this.pseudos, this.attrEqualityMods, this.ruleNestingOperators, this.substitutesEnabled);
      };
      CssSelectorParser3.prototype.render = function(path) {
        return render_1.renderEntity(path).trim();
      };
      return CssSelectorParser3;
    }();
    exports.CssSelectorParser = CssSelectorParser2;
  }
});

// ../../node_modules/unist-util-select/lib/parse.js
function parse2(selector) {
  if (typeof selector !== "string") {
    throw new TypeError("Expected `string` as selector, not `" + selector + "`");
  }
  return parser.parse(selector);
}
var import_css_selector_parser, parser;
var init_parse2 = __esm({
  "../../node_modules/unist-util-select/lib/parse.js"() {
    import_css_selector_parser = __toESM(require_lib(), 1);
    parser = new import_css_selector_parser.CssSelectorParser();
    parser.registerAttrEqualityMods("~", "^", "$", "*");
    parser.registerSelectorPseudos("any", "matches", "not", "has");
    parser.registerNestingOperators(">", "+", "~");
  }
});

// ../../node_modules/unist-util-select/index.js
var unist_util_select_exports = {};
__export(unist_util_select_exports, {
  matches: () => matches2,
  select: () => select,
  selectAll: () => selectAll
});
function matches2(selector, node) {
  const state = createState(selector, node);
  state.one = true;
  state.shallow = true;
  walk(state, node || void 0);
  return state.results.length > 0;
}
function select(selector, tree) {
  const state = createState(selector, tree);
  state.one = true;
  walk(state, tree || void 0);
  return state.results[0] || null;
}
function selectAll(selector, tree) {
  const state = createState(selector, tree);
  walk(state, tree || void 0);
  return state.results;
}
function createState(selector, tree) {
  return {
    rootQuery: queryToSelectors(parse2(selector)),
    results: [],
    scopeNodes: tree ? parent(tree) && (tree.type === "RootNode" || tree.type === "root") ? tree.children : [tree] : [],
    one: false,
    shallow: false,
    found: false,
    typeIndex: void 0,
    nodeIndex: void 0,
    typeCount: void 0,
    nodeCount: void 0
  };
}
var init_unist_util_select = __esm({
  "../../node_modules/unist-util-select/index.js"() {
    init_walk();
    init_parse2();
    init_util();
  }
});

export {
  zwitch,
  init_zwitch,
  select,
  selectAll,
  unist_util_select_exports,
  init_unist_util_select
};
//# sourceMappingURL=/myst-test/build/_shared/chunk-HHQMBJWJ.js.map
