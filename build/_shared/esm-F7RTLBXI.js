import {
  require_utils,
  u
} from "/myst-test/build/_shared/chunk-VD2EVAVN.js";
import {
  AdmonitionKind,
  admonitionKindToTitle,
  embedded,
  findAfter,
  findAndReplace,
  isElement,
  phrasing,
  rehypeMinifyWhitespace,
  whitespace
} from "/myst-test/build/_shared/chunk-Q4IHEFDX.js";
import {
  unified
} from "/myst-test/build/_shared/chunk-2ZMK4Y3K.js";
import {
  remove
} from "/myst-test/build/_shared/chunk-37FM42JK.js";
import {
  require_classnames
} from "/myst-test/build/_shared/chunk-GTLR2MQB.js";
import "/myst-test/build/_shared/chunk-GSAZZRZQ.js";
import "/myst-test/build/_shared/chunk-7USQR3WX.js";
import {
  SKIP,
  init_unist_util_visit,
  init_unist_util_visit_parents,
  visit,
  visitParents
} from "/myst-test/build/_shared/chunk-GD5J3HUN.js";
import "/myst-test/build/_shared/chunk-JMLHSHJF.js";
import "/myst-test/build/_shared/chunk-DC4EK5TX.js";
import "/myst-test/build/_shared/chunk-JM3RROW2.js";
import {
  init_unist_util_select,
  init_zwitch,
  select,
  selectAll,
  zwitch
} from "/myst-test/build/_shared/chunk-HHQMBJWJ.js";
import {
  liftChildren,
  normalizeLabel,
  setTextAsChild
} from "/myst-test/build/_shared/chunk-7VCUQVFZ.js";
import {
  __export,
  __toESM
} from "/myst-test/build/_shared/chunk-7D2LYYYY.js";

// ../../node_modules/rehype-format/index.js
init_unist_util_visit_parents();

// ../../node_modules/html-whitespace-sensitive-tag-names/index.js
var whitespaceSensitiveTagNames = [
  "pre",
  "script",
  "style",
  "textarea"
];

// ../../node_modules/rehype-format/index.js
var minify = rehypeMinifyWhitespace({ newlines: true });
function rehypeFormat(options = {}) {
  let indent = options.indent || 2;
  let indentInitial = options.indentInitial;
  if (typeof indent === "number") {
    indent = " ".repeat(indent);
  }
  if (indentInitial === null || indentInitial === void 0) {
    indentInitial = true;
  }
  return (tree) => {
    let head2;
    minify(tree);
    visitParents(tree, (node, parents) => {
      let index = -1;
      if (!("children" in node)) {
        return;
      }
      if (isElement(node, "head")) {
        head2 = true;
      }
      if (head2 && isElement(node, "body")) {
        head2 = void 0;
      }
      if (isElement(node, whitespaceSensitiveTagNames)) {
        return SKIP;
      }
      const children = node.children;
      let level = parents.length;
      if (children.length === 0 || !padding(node, head2)) {
        return;
      }
      if (!indentInitial) {
        level--;
      }
      let eol;
      while (++index < children.length) {
        const child = children[index];
        if (child.type === "text" || child.type === "comment") {
          if (child.value.includes("\n")) {
            eol = true;
          }
          child.value = child.value.replace(
            / *\n/g,
            "$&" + String(indent).repeat(level)
          );
        }
      }
      const result = [];
      let previous;
      index = -1;
      while (++index < children.length) {
        const child = children[index];
        if (padding(child, head2) || eol && !index) {
          addBreak(result, level, child);
          eol = true;
        }
        previous = child;
        result.push(child);
      }
      if (previous && (eol || padding(previous, head2))) {
        if (whitespace(previous)) {
          result.pop();
          previous = result[result.length - 1];
        }
        addBreak(result, level - 1);
      }
      node.children = result;
    });
  };
  function addBreak(list2, level, next) {
    const tail = list2[list2.length - 1];
    const previous = whitespace(tail) ? list2[list2.length - 2] : tail;
    const replace = (blank(previous) && blank(next) ? "\n\n" : "\n") + String(indent).repeat(Math.max(level, 0));
    if (tail && tail.type === "text") {
      tail.value = whitespace(tail) ? replace : tail.value + replace;
    } else {
      list2.push({ type: "text", value: replace });
    }
  }
  function blank(node) {
    return Boolean(
      node && node.type === "element" && options.blanks && options.blanks.length > 0 && options.blanks.includes(node.tagName)
    );
  }
}
function padding(node, head2) {
  return node.type === "root" || (node.type === "element" ? head2 || isElement(node, "script") || embedded(node) || !phrasing(node) : false);
}

// ../../node_modules/myst-to-html/dist/esm/format.js
var formatHtml = function formatHtml2(opt) {
  if (!opt)
    return () => void 0;
  return rehypeFormat(typeof opt === "boolean" ? {} : opt);
};

// ../../node_modules/myst-to-html/dist/esm/utils.js
var import_utils = __toESM(require_utils());
var __rest = function(s, e) {
  var t = {};
  for (var p2 in s)
    if (Object.prototype.hasOwnProperty.call(s, p2) && e.indexOf(p2) < 0)
      t[p2] = s[p2];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p2 = Object.getOwnPropertySymbols(s); i < p2.length; i++) {
      if (e.indexOf(p2[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p2[i]))
        t[p2[i]] = s[p2[i]];
    }
  return t;
};
var HTML_EMPTY_ELEMENTS = /* @__PURE__ */ new Set([
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "keygen",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr"
]);
var formatAttr = (key2, value) => {
  let v;
  if (value == null)
    return null;
  if (Array.isArray(value)) {
    v = value.join(" ");
  } else if (typeof value === "number") {
    v = String(value);
  } else if (typeof value === "boolean") {
    if (!value)
      return null;
    v = "";
  } else {
    v = value;
  }
  return `${key2}="${(0, import_utils.escapeHtml)(v)}"`;
};
function formatTag(tag, attributes, inline) {
  const { children } = attributes, rest = __rest(attributes, ["children"]);
  const join = inline ? "" : "\n";
  const attrs = Object.entries(rest).filter(([, value]) => value != null && value !== false).map(([key2, value]) => formatAttr(key2, value)).filter((value) => value != null).join(" ");
  const html6 = `<${(0, import_utils.escapeHtml)(tag)}${attrs ? ` ${attrs}` : ""}>`;
  if (children)
    return `${html6}${join}${(0, import_utils.escapeHtml)(String(children))}`;
  return html6;
}
function toHTMLRecurse(template, inline) {
  const T = template;
  const atMostOneHole = T.flat(Infinity).filter((v) => v === 0).length <= 1;
  if (!atMostOneHole)
    throw new Error("There cannot be more than one hole in the template.");
  const tag = T[0];
  const hasAttrs = !Array.isArray(T === null || T === void 0 ? void 0 : T[1]) && typeof (T === null || T === void 0 ? void 0 : T[1]) === "object";
  const attrs = hasAttrs ? T[1] : {};
  const before = [];
  const after = [];
  before.push(formatTag(tag, attrs, inline));
  let foundHole = false;
  T.slice(hasAttrs ? 2 : 1).forEach((value) => {
    const v = value;
    if (v === 0) {
      foundHole = true;
      return;
    }
    const [b, a] = toHTMLRecurse(v, inline);
    before.push(b);
    if (a) {
      foundHole = true;
      after.push(a);
    }
  });
  const join = inline ? "" : "\n";
  const closingTag = HTML_EMPTY_ELEMENTS.has(tag) ? "" : `</${tag}>`;
  if (!foundHole) {
    if (closingTag)
      before.push(closingTag);
    return [before.join(join), null];
  }
  if (closingTag)
    after.push(closingTag);
  return [before.join(join), after.join(join)];
}
function toHTML(template, opts = { inline: false }) {
  const [before, after] = toHTMLRecurse(template, opts.inline);
  const join = opts.inline ? "" : "\n";
  return [`${before}${join}`, after ? `${after}${join}` : null];
}

// ../../node_modules/myst-to-html/dist/esm/renderer.js
var renderMath = (math2, block2, target) => {
  const { id, number: number2 } = target !== null && target !== void 0 ? target : {};
  const [html6] = toHTML([
    block2 ? "div" : "span",
    {
      class: target ? ["math", "numbered"] : "math",
      id,
      number: number2,
      children: block2 ? `\\[
${math2}
\\]` : `\\(${math2}\\)`
    }
  ], { inline: true });
  return block2 ? `${html6}
` : html6;
};
function addMathRenderers(md) {
  const { renderer } = md;
  renderer.rules.math_inline = (tokens, idx) => renderMath(tokens[idx].content, false);
  renderer.rules.math_inline_double = (tokens, idx) => renderMath(tokens[idx].content, true);
  renderer.rules.math_block = (tokens, idx) => renderMath(tokens[idx].content, true);
  renderer.rules.math_block_label = (tokens, idx) => {
    var _a;
    return renderMath(tokens[idx].content, true, (_a = tokens[idx].meta) === null || _a === void 0 ? void 0 : _a.target);
  };
}

// ../../node_modules/mdast-util-to-hast/lib/handlers/blockquote.js
function blockquote(state, node) {
  const result = {
    type: "element",
    tagName: "blockquote",
    properties: {},
    children: state.wrap(state.all(node), true)
  };
  state.patch(node, result);
  return state.applyData(node, result);
}

// ../../node_modules/mdast-util-to-hast/lib/handlers/break.js
function hardBreak(state, node) {
  const result = { type: "element", tagName: "br", properties: {}, children: [] };
  state.patch(node, result);
  return [state.applyData(node, result), { type: "text", value: "\n" }];
}

// ../../node_modules/mdast-util-to-hast/lib/handlers/code.js
function code(state, node) {
  const value = node.value ? node.value + "\n" : "";
  const lang = node.lang ? node.lang.match(/^[^ \t]+(?=[ \t]|$)/) : null;
  const properties = {};
  if (lang) {
    properties.className = ["language-" + lang];
  }
  let result = {
    type: "element",
    tagName: "code",
    properties,
    children: [{ type: "text", value }]
  };
  if (node.meta) {
    result.data = { meta: node.meta };
  }
  state.patch(node, result);
  result = state.applyData(node, result);
  result = { type: "element", tagName: "pre", properties: {}, children: [result] };
  state.patch(node, result);
  return result;
}

// ../../node_modules/mdast-util-to-hast/lib/handlers/delete.js
function strikethrough(state, node) {
  const result = {
    type: "element",
    tagName: "del",
    properties: {},
    children: state.all(node)
  };
  state.patch(node, result);
  return state.applyData(node, result);
}

// ../../node_modules/mdast-util-to-hast/lib/handlers/emphasis.js
function emphasis(state, node) {
  const result = {
    type: "element",
    tagName: "em",
    properties: {},
    children: state.all(node)
  };
  state.patch(node, result);
  return state.applyData(node, result);
}

// ../../node_modules/micromark-util-character/lib/unicode-punctuation-regex.js
var unicodePunctuationRegex = /[!-/:-@[-`{-~\u00A1\u00A7\u00AB\u00B6\u00B7\u00BB\u00BF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u2E52\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]/;

// ../../node_modules/micromark-util-character/index.js
var asciiAlpha = regexCheck(/[A-Za-z]/);
var asciiDigit = regexCheck(/\d/);
var asciiHexDigit = regexCheck(/[\dA-Fa-f]/);
var asciiAlphanumeric = regexCheck(/[\dA-Za-z]/);
var asciiPunctuation = regexCheck(/[!-/:-@[-`{-~]/);
var asciiAtext = regexCheck(/[#-'*+\--9=?A-Z^-~]/);
var unicodeWhitespace = regexCheck(/\s/);
var unicodePunctuation = regexCheck(unicodePunctuationRegex);
function regexCheck(regex) {
  return check;
  function check(code3) {
    return code3 !== null && regex.test(String.fromCharCode(code3));
  }
}

// ../../node_modules/micromark-util-sanitize-uri/index.js
function normalizeUri(value) {
  const result = [];
  let index = -1;
  let start = 0;
  let skip = 0;
  while (++index < value.length) {
    const code3 = value.charCodeAt(index);
    let replace = "";
    if (code3 === 37 && asciiAlphanumeric(value.charCodeAt(index + 1)) && asciiAlphanumeric(value.charCodeAt(index + 2))) {
      skip = 2;
    } else if (code3 < 128) {
      if (!/[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(code3))) {
        replace = String.fromCharCode(code3);
      }
    } else if (code3 > 55295 && code3 < 57344) {
      const next = value.charCodeAt(index + 1);
      if (code3 < 56320 && next > 56319 && next < 57344) {
        replace = String.fromCharCode(code3, next);
        skip = 1;
      } else {
        replace = "\uFFFD";
      }
    } else {
      replace = String.fromCharCode(code3);
    }
    if (replace) {
      result.push(value.slice(start, index), encodeURIComponent(replace));
      start = index + skip + 1;
      replace = "";
    }
    if (skip) {
      index += skip;
      skip = 0;
    }
  }
  return result.join("") + value.slice(start);
}

// ../../node_modules/mdast-util-to-hast/lib/handlers/footnote-reference.js
function footnoteReference(state, node) {
  const id = String(node.identifier).toUpperCase();
  const safeId = normalizeUri(id.toLowerCase());
  const index = state.footnoteOrder.indexOf(id);
  let counter;
  if (index === -1) {
    state.footnoteOrder.push(id);
    state.footnoteCounts[id] = 1;
    counter = state.footnoteOrder.length;
  } else {
    state.footnoteCounts[id]++;
    counter = index + 1;
  }
  const reuseCounter = state.footnoteCounts[id];
  const link2 = {
    type: "element",
    tagName: "a",
    properties: {
      href: "#" + state.clobberPrefix + "fn-" + safeId,
      id: state.clobberPrefix + "fnref-" + safeId + (reuseCounter > 1 ? "-" + reuseCounter : ""),
      dataFootnoteRef: true,
      ariaDescribedBy: ["footnote-label"]
    },
    children: [{ type: "text", value: String(counter) }]
  };
  state.patch(node, link2);
  const sup = {
    type: "element",
    tagName: "sup",
    properties: {},
    children: [link2]
  };
  state.patch(node, sup);
  return state.applyData(node, sup);
}

// ../../node_modules/mdast-util-to-hast/lib/handlers/footnote.js
function footnote(state, node) {
  const footnoteById = state.footnoteById;
  let no = 1;
  while (no in footnoteById)
    no++;
  const identifier = String(no);
  footnoteById[identifier] = {
    type: "footnoteDefinition",
    identifier,
    children: [{ type: "paragraph", children: node.children }],
    position: node.position
  };
  return footnoteReference(state, {
    type: "footnoteReference",
    identifier,
    position: node.position
  });
}

// ../../node_modules/mdast-util-to-hast/lib/handlers/heading.js
function heading(state, node) {
  const result = {
    type: "element",
    tagName: "h" + node.depth,
    properties: {},
    children: state.all(node)
  };
  state.patch(node, result);
  return state.applyData(node, result);
}

// ../../node_modules/mdast-util-to-hast/lib/handlers/html.js
function html(state, node) {
  if (state.dangerous) {
    const result = { type: "raw", value: node.value };
    state.patch(node, result);
    return state.applyData(node, result);
  }
  return null;
}

// ../../node_modules/mdast-util-to-hast/lib/revert.js
function revert(state, node) {
  const subtype = node.referenceType;
  let suffix = "]";
  if (subtype === "collapsed") {
    suffix += "[]";
  } else if (subtype === "full") {
    suffix += "[" + (node.label || node.identifier) + "]";
  }
  if (node.type === "imageReference") {
    return { type: "text", value: "![" + node.alt + suffix };
  }
  const contents = state.all(node);
  const head2 = contents[0];
  if (head2 && head2.type === "text") {
    head2.value = "[" + head2.value;
  } else {
    contents.unshift({ type: "text", value: "[" });
  }
  const tail = contents[contents.length - 1];
  if (tail && tail.type === "text") {
    tail.value += suffix;
  } else {
    contents.push({ type: "text", value: suffix });
  }
  return contents;
}

// ../../node_modules/mdast-util-to-hast/lib/handlers/image-reference.js
function imageReference(state, node) {
  const def = state.definition(node.identifier);
  if (!def) {
    return revert(state, node);
  }
  const properties = { src: normalizeUri(def.url || ""), alt: node.alt };
  if (def.title !== null && def.title !== void 0) {
    properties.title = def.title;
  }
  const result = { type: "element", tagName: "img", properties, children: [] };
  state.patch(node, result);
  return state.applyData(node, result);
}

// ../../node_modules/mdast-util-to-hast/lib/handlers/image.js
function image(state, node) {
  const properties = { src: normalizeUri(node.url) };
  if (node.alt !== null && node.alt !== void 0) {
    properties.alt = node.alt;
  }
  if (node.title !== null && node.title !== void 0) {
    properties.title = node.title;
  }
  const result = { type: "element", tagName: "img", properties, children: [] };
  state.patch(node, result);
  return state.applyData(node, result);
}

// ../../node_modules/mdast-util-to-hast/lib/handlers/inline-code.js
function inlineCode(state, node) {
  const text3 = { type: "text", value: node.value.replace(/\r?\n|\r/g, " ") };
  state.patch(node, text3);
  const result = {
    type: "element",
    tagName: "code",
    properties: {},
    children: [text3]
  };
  state.patch(node, result);
  return state.applyData(node, result);
}

// ../../node_modules/mdast-util-to-hast/lib/handlers/link-reference.js
function linkReference(state, node) {
  const def = state.definition(node.identifier);
  if (!def) {
    return revert(state, node);
  }
  const properties = { href: normalizeUri(def.url || "") };
  if (def.title !== null && def.title !== void 0) {
    properties.title = def.title;
  }
  const result = {
    type: "element",
    tagName: "a",
    properties,
    children: state.all(node)
  };
  state.patch(node, result);
  return state.applyData(node, result);
}

// ../../node_modules/mdast-util-to-hast/lib/handlers/link.js
function link(state, node) {
  const properties = { href: normalizeUri(node.url) };
  if (node.title !== null && node.title !== void 0) {
    properties.title = node.title;
  }
  const result = {
    type: "element",
    tagName: "a",
    properties,
    children: state.all(node)
  };
  state.patch(node, result);
  return state.applyData(node, result);
}

// ../../node_modules/mdast-util-to-hast/lib/handlers/list-item.js
function listItem(state, node, parent) {
  const results = state.all(node);
  const loose = parent ? listLoose(parent) : listItemLoose(node);
  const properties = {};
  const children = [];
  if (typeof node.checked === "boolean") {
    const head2 = results[0];
    let paragraph2;
    if (head2 && head2.type === "element" && head2.tagName === "p") {
      paragraph2 = head2;
    } else {
      paragraph2 = { type: "element", tagName: "p", properties: {}, children: [] };
      results.unshift(paragraph2);
    }
    if (paragraph2.children.length > 0) {
      paragraph2.children.unshift({ type: "text", value: " " });
    }
    paragraph2.children.unshift({
      type: "element",
      tagName: "input",
      properties: { type: "checkbox", checked: node.checked, disabled: true },
      children: []
    });
    properties.className = ["task-list-item"];
  }
  let index = -1;
  while (++index < results.length) {
    const child = results[index];
    if (loose || index !== 0 || child.type !== "element" || child.tagName !== "p") {
      children.push({ type: "text", value: "\n" });
    }
    if (child.type === "element" && child.tagName === "p" && !loose) {
      children.push(...child.children);
    } else {
      children.push(child);
    }
  }
  const tail = results[results.length - 1];
  if (tail && (loose || tail.type !== "element" || tail.tagName !== "p")) {
    children.push({ type: "text", value: "\n" });
  }
  const result = { type: "element", tagName: "li", properties, children };
  state.patch(node, result);
  return state.applyData(node, result);
}
function listLoose(node) {
  let loose = false;
  if (node.type === "list") {
    loose = node.spread || false;
    const children = node.children;
    let index = -1;
    while (!loose && ++index < children.length) {
      loose = listItemLoose(children[index]);
    }
  }
  return loose;
}
function listItemLoose(node) {
  const spread = node.spread;
  return spread === void 0 || spread === null ? node.children.length > 1 : spread;
}

// ../../node_modules/mdast-util-to-hast/lib/handlers/list.js
function list(state, node) {
  const properties = {};
  const results = state.all(node);
  let index = -1;
  if (typeof node.start === "number" && node.start !== 1) {
    properties.start = node.start;
  }
  while (++index < results.length) {
    const child = results[index];
    if (child.type === "element" && child.tagName === "li" && child.properties && Array.isArray(child.properties.className) && child.properties.className.includes("task-list-item")) {
      properties.className = ["contains-task-list"];
      break;
    }
  }
  const result = {
    type: "element",
    tagName: node.ordered ? "ol" : "ul",
    properties,
    children: state.wrap(results, true)
  };
  state.patch(node, result);
  return state.applyData(node, result);
}

// ../../node_modules/mdast-util-to-hast/lib/handlers/paragraph.js
function paragraph(state, node) {
  const result = {
    type: "element",
    tagName: "p",
    properties: {},
    children: state.all(node)
  };
  state.patch(node, result);
  return state.applyData(node, result);
}

// ../../node_modules/mdast-util-to-hast/lib/handlers/root.js
function root(state, node) {
  const result = { type: "root", children: state.wrap(state.all(node)) };
  state.patch(node, result);
  return state.applyData(node, result);
}

// ../../node_modules/mdast-util-to-hast/lib/handlers/strong.js
function strong(state, node) {
  const result = {
    type: "element",
    tagName: "strong",
    properties: {},
    children: state.all(node)
  };
  state.patch(node, result);
  return state.applyData(node, result);
}

// ../../node_modules/unist-util-position/lib/index.js
var pointStart = point("start");
var pointEnd = point("end");
function position(node) {
  return { start: pointStart(node), end: pointEnd(node) };
}
function point(type) {
  return point2;
  function point2(node) {
    const point3 = node && node.position && node.position[type] || {};
    return {
      line: point3.line || null,
      column: point3.column || null,
      offset: point3.offset > -1 ? point3.offset : null
    };
  }
}

// ../../node_modules/mdast-util-to-hast/lib/handlers/table.js
function table(state, node) {
  const rows = state.all(node);
  const firstRow = rows.shift();
  const tableContent = [];
  if (firstRow) {
    const head2 = {
      type: "element",
      tagName: "thead",
      properties: {},
      children: state.wrap([firstRow], true)
    };
    state.patch(node.children[0], head2);
    tableContent.push(head2);
  }
  if (rows.length > 0) {
    const body3 = {
      type: "element",
      tagName: "tbody",
      properties: {},
      children: state.wrap(rows, true)
    };
    const start = pointStart(node.children[1]);
    const end = pointEnd(node.children[node.children.length - 1]);
    if (start.line && end.line)
      body3.position = { start, end };
    tableContent.push(body3);
  }
  const result = {
    type: "element",
    tagName: "table",
    properties: {},
    children: state.wrap(tableContent, true)
  };
  state.patch(node, result);
  return state.applyData(node, result);
}

// ../../node_modules/mdast-util-to-hast/lib/handlers/table-row.js
function tableRow(state, node, parent) {
  const siblings2 = parent ? parent.children : void 0;
  const rowIndex = siblings2 ? siblings2.indexOf(node) : 1;
  const tagName = rowIndex === 0 ? "th" : "td";
  const align = parent && parent.type === "table" ? parent.align : void 0;
  const length = align ? align.length : node.children.length;
  let cellIndex = -1;
  const cells2 = [];
  while (++cellIndex < length) {
    const cell = node.children[cellIndex];
    const properties = {};
    const alignValue = align ? align[cellIndex] : void 0;
    if (alignValue) {
      properties.align = alignValue;
    }
    let result2 = { type: "element", tagName, properties, children: [] };
    if (cell) {
      result2.children = state.all(cell);
      state.patch(cell, result2);
      result2 = state.applyData(node, result2);
    }
    cells2.push(result2);
  }
  const result = {
    type: "element",
    tagName: "tr",
    properties: {},
    children: state.wrap(cells2, true)
  };
  state.patch(node, result);
  return state.applyData(node, result);
}

// ../../node_modules/mdast-util-to-hast/lib/handlers/table-cell.js
function tableCell(state, node) {
  const result = {
    type: "element",
    tagName: "td",
    properties: {},
    children: state.all(node)
  };
  state.patch(node, result);
  return state.applyData(node, result);
}

// ../../node_modules/trim-lines/index.js
var tab = 9;
var space = 32;
function trimLines(value) {
  const source = String(value);
  const search = /\r?\n|\r/g;
  let match = search.exec(source);
  let last = 0;
  const lines = [];
  while (match) {
    lines.push(
      trimLine(source.slice(last, match.index), last > 0, true),
      match[0]
    );
    last = match.index + match[0].length;
    match = search.exec(source);
  }
  lines.push(trimLine(source.slice(last), last > 0, false));
  return lines.join("");
}
function trimLine(value, start, end) {
  let startIndex = 0;
  let endIndex = value.length;
  if (start) {
    let code3 = value.codePointAt(startIndex);
    while (code3 === tab || code3 === space) {
      startIndex++;
      code3 = value.codePointAt(startIndex);
    }
  }
  if (end) {
    let code3 = value.codePointAt(endIndex - 1);
    while (code3 === tab || code3 === space) {
      endIndex--;
      code3 = value.codePointAt(endIndex - 1);
    }
  }
  return endIndex > startIndex ? value.slice(startIndex, endIndex) : "";
}

// ../../node_modules/mdast-util-to-hast/lib/handlers/text.js
function text(state, node) {
  const result = { type: "text", value: trimLines(String(node.value)) };
  state.patch(node, result);
  return state.applyData(node, result);
}

// ../../node_modules/mdast-util-to-hast/lib/handlers/thematic-break.js
function thematicBreak(state, node) {
  const result = {
    type: "element",
    tagName: "hr",
    properties: {},
    children: []
  };
  state.patch(node, result);
  return state.applyData(node, result);
}

// ../../node_modules/mdast-util-to-hast/lib/handlers/index.js
var handlers = {
  blockquote,
  break: hardBreak,
  code,
  delete: strikethrough,
  emphasis,
  footnoteReference,
  footnote,
  heading,
  html,
  imageReference,
  image,
  inlineCode,
  linkReference,
  link,
  listItem,
  list,
  paragraph,
  root,
  strong,
  table,
  tableCell,
  tableRow,
  text,
  thematicBreak,
  toml: ignore,
  yaml: ignore,
  definition: ignore,
  footnoteDefinition: ignore
};
function ignore() {
  return null;
}

// ../../node_modules/mdast-util-to-hast/lib/state.js
init_unist_util_visit();

// ../../node_modules/unist-util-generated/lib/index.js
function generated(node) {
  return !node || !node.position || !node.position.start || !node.position.start.line || !node.position.start.column || !node.position.end || !node.position.end.line || !node.position.end.column;
}

// ../../node_modules/mdast-util-definitions/lib/index.js
init_unist_util_visit();
var own = {}.hasOwnProperty;
function definitions(tree) {
  const cache = /* @__PURE__ */ Object.create(null);
  if (!tree || !tree.type) {
    throw new Error("mdast-util-definitions expected node");
  }
  visit(tree, "definition", (definition2) => {
    const id = clean(definition2.identifier);
    if (id && !own.call(cache, id)) {
      cache[id] = definition2;
    }
  });
  return definition;
  function definition(identifier) {
    const id = clean(identifier);
    return id && own.call(cache, id) ? cache[id] : null;
  }
}
function clean(value) {
  return String(value || "").toUpperCase();
}

// ../../node_modules/mdast-util-to-hast/lib/state.js
var own2 = {}.hasOwnProperty;
function createState(tree, options) {
  const settings = options || {};
  const dangerous2 = settings.allowDangerousHtml || false;
  const footnoteById = {};
  state.dangerous = dangerous2;
  state.clobberPrefix = settings.clobberPrefix === void 0 || settings.clobberPrefix === null ? "user-content-" : settings.clobberPrefix;
  state.footnoteLabel = settings.footnoteLabel || "Footnotes";
  state.footnoteLabelTagName = settings.footnoteLabelTagName || "h2";
  state.footnoteLabelProperties = settings.footnoteLabelProperties || {
    className: ["sr-only"]
  };
  state.footnoteBackLabel = settings.footnoteBackLabel || "Back to content";
  state.unknownHandler = settings.unknownHandler;
  state.passThrough = settings.passThrough;
  state.handlers = { ...handlers, ...settings.handlers };
  state.definition = definitions(tree);
  state.footnoteById = footnoteById;
  state.footnoteOrder = [];
  state.footnoteCounts = {};
  state.patch = patch;
  state.applyData = applyData;
  state.one = oneBound;
  state.all = allBound;
  state.wrap = wrap;
  state.augment = augment;
  visit(tree, "footnoteDefinition", (definition) => {
    const id = String(definition.identifier).toUpperCase();
    if (!own2.call(footnoteById, id)) {
      footnoteById[id] = definition;
    }
  });
  return state;
  function augment(left, right) {
    if (left && "data" in left && left.data) {
      const data = left.data;
      if (data.hName) {
        if (right.type !== "element") {
          right = {
            type: "element",
            tagName: "",
            properties: {},
            children: []
          };
        }
        right.tagName = data.hName;
      }
      if (right.type === "element" && data.hProperties) {
        right.properties = { ...right.properties, ...data.hProperties };
      }
      if ("children" in right && right.children && data.hChildren) {
        right.children = data.hChildren;
      }
    }
    if (left) {
      const ctx = "type" in left ? left : { position: left };
      if (!generated(ctx)) {
        right.position = { start: pointStart(ctx), end: pointEnd(ctx) };
      }
    }
    return right;
  }
  function state(node, tagName, props, children) {
    if (Array.isArray(props)) {
      children = props;
      props = {};
    }
    return augment(node, {
      type: "element",
      tagName,
      properties: props || {},
      children: children || []
    });
  }
  function oneBound(node, parent) {
    return one(state, node, parent);
  }
  function allBound(parent) {
    return all(state, parent);
  }
}
function patch(from, to) {
  if (from.position)
    to.position = position(from);
}
function applyData(from, to) {
  let result = to;
  if (from && from.data) {
    const hName = from.data.hName;
    const hChildren = from.data.hChildren;
    const hProperties = from.data.hProperties;
    if (typeof hName === "string") {
      if (result.type === "element") {
        result.tagName = hName;
      } else {
        result = {
          type: "element",
          tagName: hName,
          properties: {},
          children: []
        };
      }
    }
    if (result.type === "element" && hProperties) {
      result.properties = { ...result.properties, ...hProperties };
    }
    if ("children" in result && result.children && hChildren !== null && hChildren !== void 0) {
      result.children = hChildren;
    }
  }
  return result;
}
function one(state, node, parent) {
  const type = node && node.type;
  if (!type) {
    throw new Error("Expected node, got `" + node + "`");
  }
  if (own2.call(state.handlers, type)) {
    return state.handlers[type](state, node, parent);
  }
  if (state.passThrough && state.passThrough.includes(type)) {
    return "children" in node ? { ...node, children: all(state, node) } : node;
  }
  if (state.unknownHandler) {
    return state.unknownHandler(state, node, parent);
  }
  return defaultUnknownHandler(state, node);
}
function all(state, parent) {
  const values = [];
  if ("children" in parent) {
    const nodes = parent.children;
    let index = -1;
    while (++index < nodes.length) {
      const result = one(state, nodes[index], parent);
      if (result) {
        if (index && nodes[index - 1].type === "break") {
          if (!Array.isArray(result) && result.type === "text") {
            result.value = result.value.replace(/^\s+/, "");
          }
          if (!Array.isArray(result) && result.type === "element") {
            const head2 = result.children[0];
            if (head2 && head2.type === "text") {
              head2.value = head2.value.replace(/^\s+/, "");
            }
          }
        }
        if (Array.isArray(result)) {
          values.push(...result);
        } else {
          values.push(result);
        }
      }
    }
  }
  return values;
}
function defaultUnknownHandler(state, node) {
  const data = node.data || {};
  const result = "value" in node && !(own2.call(data, "hProperties") || own2.call(data, "hChildren")) ? { type: "text", value: node.value } : {
    type: "element",
    tagName: "div",
    properties: {},
    children: all(state, node)
  };
  state.patch(node, result);
  return state.applyData(node, result);
}
function wrap(nodes, loose) {
  const result = [];
  let index = -1;
  if (loose) {
    result.push({ type: "text", value: "\n" });
  }
  while (++index < nodes.length) {
    if (index)
      result.push({ type: "text", value: "\n" });
    result.push(nodes[index]);
  }
  if (loose && nodes.length > 0) {
    result.push({ type: "text", value: "\n" });
  }
  return result;
}

// ../../node_modules/mdast-util-to-hast/lib/footer.js
function footer(state) {
  const listItems = [];
  let index = -1;
  while (++index < state.footnoteOrder.length) {
    const def = state.footnoteById[state.footnoteOrder[index]];
    if (!def) {
      continue;
    }
    const content = state.all(def);
    const id = String(def.identifier).toUpperCase();
    const safeId = normalizeUri(id.toLowerCase());
    let referenceIndex = 0;
    const backReferences = [];
    while (++referenceIndex <= state.footnoteCounts[id]) {
      const backReference = {
        type: "element",
        tagName: "a",
        properties: {
          href: "#" + state.clobberPrefix + "fnref-" + safeId + (referenceIndex > 1 ? "-" + referenceIndex : ""),
          dataFootnoteBackref: true,
          className: ["data-footnote-backref"],
          ariaLabel: state.footnoteBackLabel
        },
        children: [{ type: "text", value: "\u21A9" }]
      };
      if (referenceIndex > 1) {
        backReference.children.push({
          type: "element",
          tagName: "sup",
          children: [{ type: "text", value: String(referenceIndex) }]
        });
      }
      if (backReferences.length > 0) {
        backReferences.push({ type: "text", value: " " });
      }
      backReferences.push(backReference);
    }
    const tail = content[content.length - 1];
    if (tail && tail.type === "element" && tail.tagName === "p") {
      const tailTail = tail.children[tail.children.length - 1];
      if (tailTail && tailTail.type === "text") {
        tailTail.value += " ";
      } else {
        tail.children.push({ type: "text", value: " " });
      }
      tail.children.push(...backReferences);
    } else {
      content.push(...backReferences);
    }
    const listItem2 = {
      type: "element",
      tagName: "li",
      properties: { id: state.clobberPrefix + "fn-" + safeId },
      children: state.wrap(content, true)
    };
    state.patch(def, listItem2);
    listItems.push(listItem2);
  }
  if (listItems.length === 0) {
    return;
  }
  return {
    type: "element",
    tagName: "section",
    properties: { dataFootnotes: true, className: ["footnotes"] },
    children: [
      {
        type: "element",
        tagName: state.footnoteLabelTagName,
        properties: {
          ...JSON.parse(JSON.stringify(state.footnoteLabelProperties)),
          id: "footnote-label"
        },
        children: [{ type: "text", value: state.footnoteLabel }]
      },
      { type: "text", value: "\n" },
      {
        type: "element",
        tagName: "ol",
        properties: {},
        children: state.wrap(listItems, true)
      },
      { type: "text", value: "\n" }
    ]
  };
}

// ../../node_modules/mdast-util-to-hast/lib/index.js
function toHast(tree, options) {
  const state = createState(tree, options);
  const node = state.one(tree, null);
  const foot = footer(state);
  if (foot) {
    node.children.push({ type: "text", value: "\n" }, foot);
  }
  return Array.isArray(node) ? { type: "root", children: node } : node;
}

// ../../node_modules/myst-to-html/dist/esm/schema.js
var import_classnames = __toESM(require_classnames());
var abbreviation = (h, node) => h(node, "abbr", { title: node.title }, all(h, node));
var subscript = (h, node) => h(node, "sub", all(h, node));
var superscript = (h, node) => h(node, "sup", all(h, node));
var image2 = (h, node) => h(node, "img", {
  src: node.url,
  alt: node.alt,
  title: node.title,
  class: (0, import_classnames.default)(node.align ? `align-${node.align}` : "", node.class) || void 0,
  height: node.height,
  width: node.width
});
var caption = (h, node) => h(node, "figcaption", all(h, node));
var legend = (h, node) => h(node, "div", { class: "legend" }, all(h, node));
var container = (h, node) => h(node, "figure", {
  id: node.identifier || node.label || void 0,
  class: (0, import_classnames.default)({ numbered: node.enumerated !== false }, node.class) || void 0
}, all(h, node));
var admonitionTitle = (h, node) => h(node, "p", { class: "admonition-title" }, all(h, node));
var admonition = (h, node) => h(node, "aside", {
  class: (0, import_classnames.default)({
    [node.class]: node.class,
    admonition: true,
    [node.kind]: node.kind && node.kind !== "admonition"
  })
}, all(h, node));
var captionNumber = (h, node) => {
  var _a, _b;
  const captionKind = ((_a = node.kind) === null || _a === void 0 ? void 0 : _a.charAt(0).toUpperCase()) + ((_b = node.kind) === null || _b === void 0 ? void 0 : _b.slice(1));
  return h(node, "span", { class: "caption-number" }, [u("text", `${captionKind} ${node.value}`)]);
};
var math = (h, node) => {
  const attrs = { id: node.identifier || void 0, class: "math block" };
  if (node.value.indexOf("\n") !== -1) {
    const mathHast = h(node, "div", attrs, [u("text", node.value)]);
    return h(node, "pre", [mathHast]);
  }
  return h(node, "div", attrs, [u("text", node.value.replace(/\r?\n|\r/g, " "))]);
};
var inlineMath = (h, node) => {
  return h(node, "span", { class: "math inline" }, [
    u("text", node.value.replace(/\r?\n|\r/g, " "))
  ]);
};
var definitionList = (h, node) => h(node, "dl", all(h, node));
var definitionTerm = (h, node) => h(node, "dt", all(h, node));
var definitionDescription = (h, node) => h(node, "dd", all(h, node));
var mystRole = (h, node) => {
  const children = [h(node, "code", { class: "kind" }, [u("text", `{${node.name}}`)])];
  if (node.value) {
    children.push(h(node, "code", {}, [u("text", node.value)]));
  }
  return h(node, "span", { class: "role unhandled" }, children);
};
var mystDirective = (h, node) => {
  const directiveHeader = [
    h(node, "code", { class: "kind" }, [u("text", `{${node.name}}`)])
  ];
  if (node.args) {
    directiveHeader.push(h(node, "code", { class: "args" }, [u("text", node.args)]));
  }
  const directiveBody = [];
  if (node.options) {
    const optionsString = Object.keys(node.options).map((k) => `:${k}: ${node.options[k]}`).join("\n");
    directiveBody.push(h(node, "pre", [h(node, "code", { class: "options" }, [u("text", optionsString)])]));
  }
  directiveBody.push(h(node, "pre", [h(node, "code", [u("text", node.value)])]));
  return h(node, "div", { class: "directive unhandled" }, [
    h(node, "p", {}, directiveHeader),
    ...directiveBody
  ]);
};
var block = (h, node) => h(node, "div", { class: "block", "data-block": node.meta }, all(h, node));
var mystComment = (h, node) => u("comment", node.value);
var heading2 = (h, node) => h(node, `h${node.depth}`, { id: node.identifier || void 0 }, all(h, node));
var crossReference = (h, node) => {
  if (node.resolved) {
    return h(node, "a", { href: `#${node.identifier}`, title: node.title || void 0 }, all(h, node));
  } else {
    return h(node, "span", { class: "reference role unhandled" }, [
      h(node, "code", { class: "kind" }, [u("text", `{${node.kind}}`)]),
      h(node, "code", {}, [u("text", node.identifier)])
    ]);
  }
};
var table2 = (h, node) => {
  node.data = { hProperties: { align: node.align } };
  delete node.align;
  return handlers.table(h, node);
};
var code2 = (h, node) => {
  const value = node.value ? node.value + "\n" : "";
  const props = {};
  if (node.identifier) {
    props.id = node.identifier;
  }
  props.className = (0, import_classnames.default)({ ["language-" + node.lang]: node.lang }, node.class) || void 0;
  const codeHast = h(node, "code", props, [u("text", value)]);
  return h(node.position, "pre", [codeHast]);
};
var iframe = (h, node) => h(node, "div", { class: "iframe" });
var bibliography = (h, node) => h(node, "div", { class: "bibliography" });
var details = (h, node) => h(node, "details");
var summary = (h, node) => h(node, "summary");
var embed = (h, node) => h(node, "div");
var include = (h, node) => h(node, "div", { file: node.file });
var linkBlock = (h, node) => h(node, "a");
var margin = (h, node) => h(node, "aside", { class: "margin" });
var mdast = (h, node) => h(node, "div", { id: node.id });
var mermaid = (h, node) => h(node, "div", { class: "margin" });
var myst = (h, node) => h(node, "div", { class: "margin" });
var output = (h, node) => h(node, "div", { class: "output" });
var mystToHast = (opts) => (tree) => {
  return toHast(tree, Object.assign(Object.assign({}, opts), { handlers: Object.assign({
    admonition,
    admonitionTitle,
    container,
    image: image2,
    caption,
    captionNumber,
    legend,
    abbreviation,
    subscript,
    superscript,
    math,
    inlineMath,
    definitionList,
    definitionTerm,
    definitionDescription,
    mystRole,
    mystDirective,
    block,
    mystComment,
    comment: mystComment,
    heading: heading2,
    crossReference,
    code: code2,
    table: table2,
    iframe,
    bibliography,
    details,
    summary,
    embed,
    include,
    linkBlock,
    margin,
    mdast,
    mermaid,
    myst,
    output
  }, opts === null || opts === void 0 ? void 0 : opts.handlers) }));
};

// ../../node_modules/myst-to-html/dist/esm/state.js
init_unist_util_visit();
init_unist_util_select();
var TargetKind;
(function(TargetKind2) {
  TargetKind2["heading"] = "heading";
  TargetKind2["math"] = "math";
  TargetKind2["figure"] = "figure";
  TargetKind2["table"] = "table";
  TargetKind2["code"] = "code";
})(TargetKind || (TargetKind = {}));
var ReferenceKind;
(function(ReferenceKind2) {
  ReferenceKind2["ref"] = "ref";
  ReferenceKind2["numref"] = "numref";
  ReferenceKind2["eq"] = "eq";
})(ReferenceKind || (ReferenceKind = {}));
function fillReferenceEnumerators(node, enumerator) {
  const num = String(enumerator);
  findAndReplace(node, { "%s": num, "{number}": num });
}
function copyNode(node) {
  return JSON.parse(JSON.stringify(node));
}
function kindFromNode(node) {
  return node.type === "container" ? node.kind : node.type;
}
function incrementHeadingCounts(depth, counts) {
  const incrementIndex = depth - 1;
  return counts.map((count, index) => {
    if (count === null || index < incrementIndex)
      return count;
    if (index === incrementIndex)
      return count + 1;
    return 0;
  });
}
function formatHeadingEnumerator(counts) {
  counts = counts.filter((d) => d !== null);
  while (counts && counts[counts.length - 1] === 0) {
    counts.pop();
  }
  return counts.join(".");
}
var State = class {
  constructor(targetCounts, targets) {
    this.targetCounts = targetCounts || {};
    this.targets = targets || {};
  }
  addTarget(node) {
    const kind = kindFromNode(node);
    if (kind && kind in TargetKind) {
      let enumerator = null;
      if (node.enumerated !== false) {
        enumerator = this.incrementCount(node, kind);
        node.enumerator = enumerator;
      }
      if (node.identifier) {
        this.targets[node.identifier] = {
          node: copyNode(node),
          kind
        };
      }
    }
  }
  initializeNumberedHeadingDepths(tree) {
    const headings = selectAll("heading", tree).filter((node) => node.enumerated !== false);
    const headingDepths = new Set(headings.map((node) => node.depth));
    this.targetCounts.heading = [1, 2, 3, 4, 5, 6].map((depth) => headingDepths.has(depth) ? 0 : null);
  }
  incrementCount(node, kind) {
    if (kind === TargetKind.heading) {
      if (!this.targetCounts.heading)
        this.targetCounts.heading = [0, 0, 0, 0, 0, 0];
      this.targetCounts.heading = incrementHeadingCounts(node.depth, this.targetCounts.heading);
      return formatHeadingEnumerator(this.targetCounts.heading);
    }
    if (kind in this.targetCounts) {
      this.targetCounts[kind] += 1;
    } else {
      this.targetCounts[kind] = 1;
    }
    return String(this.targetCounts[kind]);
  }
  getTarget(identifier) {
    if (!identifier)
      return void 0;
    return this.targets[identifier];
  }
  resolveReferenceContent(node) {
    var _a;
    const target = this.getTarget(node.identifier);
    if (!target) {
      return;
    }
    const kinds = {
      ref: {
        eq: node.kind === ReferenceKind.eq,
        ref: node.kind === ReferenceKind.ref,
        numref: node.kind === ReferenceKind.numref
      },
      target: {
        math: target.kind === TargetKind.math,
        figure: target.kind === TargetKind.figure,
        table: target.kind === TargetKind.table,
        heading: target.kind === TargetKind.heading
      }
    };
    const noNodeChildren = !((_a = node.children) === null || _a === void 0 ? void 0 : _a.length);
    if (kinds.ref.eq && kinds.target.math && target.node.enumerator) {
      if (noNodeChildren) {
        setTextAsChild(node, `(${target.node.enumerator})`);
      }
      node.resolved = true;
    } else if (kinds.ref.ref && kinds.target.heading) {
      if (noNodeChildren) {
        node.children = copyNode(target.node).children;
      }
      node.resolved = true;
    } else if (kinds.ref.ref && (kinds.target.figure || kinds.target.table)) {
      if (noNodeChildren) {
        const caption2 = select("caption > paragraph", target.node);
        node.children = copyNode(caption2).children;
      }
      node.resolved = true;
    } else if (kinds.ref.numref && kinds.target.figure && target.node.enumerator) {
      if (noNodeChildren) {
        setTextAsChild(node, "Figure %s");
      }
      fillReferenceEnumerators(node, target.node.enumerator);
      node.resolved = true;
    } else if (kinds.ref.numref && kinds.target.table && target.node.enumerator) {
      if (noNodeChildren) {
        setTextAsChild(node, "Table %s");
      }
      fillReferenceEnumerators(node, target.node.enumerator);
      node.resolved = true;
    }
  }
};
var enumerateTargets = (state, tree, opts) => {
  state.initializeNumberedHeadingDepths(tree);
  if (!opts.disableContainerEnumeration) {
    visit(tree, "container", (node) => state.addTarget(node));
  }
  if (!opts.disableEquationEnumeration) {
    visit(tree, "math", (node) => state.addTarget(node));
  }
  if (!opts.disableHeadingEnumeration) {
    visit(tree, "heading", (node) => state.addTarget(node));
  }
  return tree;
};
var resolveReferences = (state, tree) => {
  selectAll("link", tree).forEach((node) => {
    const reference = normalizeLabel(node.url);
    if (reference && reference.identifier in state.targets) {
      node.type = "crossReference";
      node.kind = state.targets[reference.identifier].kind === TargetKind.math ? "eq" : "ref";
      node.identifier = reference.identifier;
      node.label = reference.label;
      delete node.url;
    }
  });
  visit(tree, "crossReference", (node) => {
    state.resolveReferenceContent(node);
  });
};

// ../../node_modules/myst-to-html/dist/esm/transforms.js
init_unist_util_visit();
init_unist_util_select();
var defaultOptions = {
  addAdmonitionHeaders: true,
  addContainerCaptionNumbers: true,
  disableHeadingEnumeration: false,
  disableContainerEnumeration: false,
  disableEquationEnumeration: false
};
function addAdmonitionHeaders(tree) {
  visit(tree, "admonition", (node) => {
    var _a;
    if (!node.kind || node.kind === AdmonitionKind.admonition)
      return;
    node.children = [
      {
        type: "admonitionTitle",
        children: [{ type: "text", value: admonitionKindToTitle(node.kind) }]
      },
      ...(_a = node.children) !== null && _a !== void 0 ? _a : []
    ];
  });
}
function addContainerCaptionNumbers(tree, state) {
  selectAll("container", tree).filter((container2) => container2.enumerator !== false).forEach((container2) => {
    var _a, _b;
    const enumerator = (_a = state.getTarget(container2.identifier)) === null || _a === void 0 ? void 0 : _a.node.enumerator;
    const para = select("caption > paragraph", container2);
    if (enumerator && para) {
      para.children = [
        { type: "captionNumber", kind: container2.kind, value: enumerator },
        ...(_b = para === null || para === void 0 ? void 0 : para.children) !== null && _b !== void 0 ? _b : []
      ];
    }
  });
}
function propagateTargets(tree) {
  visit(tree, "mystTarget", (node, index) => {
    const nextNode = findAfter(tree, index);
    const normalized = normalizeLabel(node.label);
    if (nextNode && normalized) {
      nextNode.identifier = normalized.identifier;
      nextNode.label = normalized.label;
    }
  });
  remove(tree, "mystTarget");
}
function ensureCaptionIsParagraph(tree) {
  visit(tree, "caption", (node) => {
    if (node.children && node.children[0].type !== "paragraph") {
      node.children = [{ type: "paragraph", children: node.children }];
    }
  });
}
var transform = (state, o) => (tree) => {
  const opts = Object.assign(Object.assign({}, defaultOptions), o);
  ensureCaptionIsParagraph(tree);
  propagateTargets(tree);
  enumerateTargets(state, tree, opts);
  resolveReferences(state, tree);
  liftChildren(tree, "mystDirective");
  liftChildren(tree, "mystRole");
  if (opts.addAdmonitionHeaders)
    addAdmonitionHeaders(tree);
  if (opts.addContainerCaptionNumbers)
    addContainerCaptionNumbers(tree, state);
};

// ../../node_modules/hast-util-to-html/node_modules/property-information/lib/util/schema.js
var Schema = class {
  constructor(property, normal, space2) {
    this.property = property;
    this.normal = normal;
    if (space2) {
      this.space = space2;
    }
  }
};
Schema.prototype.property = {};
Schema.prototype.normal = {};
Schema.prototype.space = null;

// ../../node_modules/hast-util-to-html/node_modules/property-information/lib/util/merge.js
function merge(definitions2, space2) {
  const property = {};
  const normal = {};
  let index = -1;
  while (++index < definitions2.length) {
    Object.assign(property, definitions2[index].property);
    Object.assign(normal, definitions2[index].normal);
  }
  return new Schema(property, normal, space2);
}

// ../../node_modules/hast-util-to-html/node_modules/property-information/lib/normalize.js
function normalize(value) {
  return value.toLowerCase();
}

// ../../node_modules/hast-util-to-html/node_modules/property-information/lib/util/info.js
var Info = class {
  constructor(property, attribute) {
    this.property = property;
    this.attribute = attribute;
  }
};
Info.prototype.space = null;
Info.prototype.boolean = false;
Info.prototype.booleanish = false;
Info.prototype.overloadedBoolean = false;
Info.prototype.number = false;
Info.prototype.commaSeparated = false;
Info.prototype.spaceSeparated = false;
Info.prototype.commaOrSpaceSeparated = false;
Info.prototype.mustUseProperty = false;
Info.prototype.defined = false;

// ../../node_modules/hast-util-to-html/node_modules/property-information/lib/util/types.js
var types_exports = {};
__export(types_exports, {
  boolean: () => boolean,
  booleanish: () => booleanish,
  commaOrSpaceSeparated: () => commaOrSpaceSeparated,
  commaSeparated: () => commaSeparated,
  number: () => number,
  overloadedBoolean: () => overloadedBoolean,
  spaceSeparated: () => spaceSeparated
});
var powers = 0;
var boolean = increment();
var booleanish = increment();
var overloadedBoolean = increment();
var number = increment();
var spaceSeparated = increment();
var commaSeparated = increment();
var commaOrSpaceSeparated = increment();
function increment() {
  return 2 ** ++powers;
}

// ../../node_modules/hast-util-to-html/node_modules/property-information/lib/util/defined-info.js
var checks = Object.keys(types_exports);
var DefinedInfo = class extends Info {
  constructor(property, attribute, mask, space2) {
    let index = -1;
    super(property, attribute);
    mark(this, "space", space2);
    if (typeof mask === "number") {
      while (++index < checks.length) {
        const check = checks[index];
        mark(this, checks[index], (mask & types_exports[check]) === types_exports[check]);
      }
    }
  }
};
DefinedInfo.prototype.defined = true;
function mark(values, key2, value) {
  if (value) {
    values[key2] = value;
  }
}

// ../../node_modules/hast-util-to-html/node_modules/property-information/lib/util/create.js
var own3 = {}.hasOwnProperty;
function create(definition) {
  const property = {};
  const normal = {};
  let prop;
  for (prop in definition.properties) {
    if (own3.call(definition.properties, prop)) {
      const value = definition.properties[prop];
      const info = new DefinedInfo(
        prop,
        definition.transform(definition.attributes || {}, prop),
        value,
        definition.space
      );
      if (definition.mustUseProperty && definition.mustUseProperty.includes(prop)) {
        info.mustUseProperty = true;
      }
      property[prop] = info;
      normal[normalize(prop)] = prop;
      normal[normalize(info.attribute)] = prop;
    }
  }
  return new Schema(property, normal, definition.space);
}

// ../../node_modules/hast-util-to-html/node_modules/property-information/lib/xlink.js
var xlink = create({
  space: "xlink",
  transform(_, prop) {
    return "xlink:" + prop.slice(5).toLowerCase();
  },
  properties: {
    xLinkActuate: null,
    xLinkArcRole: null,
    xLinkHref: null,
    xLinkRole: null,
    xLinkShow: null,
    xLinkTitle: null,
    xLinkType: null
  }
});

// ../../node_modules/hast-util-to-html/node_modules/property-information/lib/xml.js
var xml = create({
  space: "xml",
  transform(_, prop) {
    return "xml:" + prop.slice(3).toLowerCase();
  },
  properties: { xmlLang: null, xmlBase: null, xmlSpace: null }
});

// ../../node_modules/hast-util-to-html/node_modules/property-information/lib/util/case-sensitive-transform.js
function caseSensitiveTransform(attributes, attribute) {
  return attribute in attributes ? attributes[attribute] : attribute;
}

// ../../node_modules/hast-util-to-html/node_modules/property-information/lib/util/case-insensitive-transform.js
function caseInsensitiveTransform(attributes, property) {
  return caseSensitiveTransform(attributes, property.toLowerCase());
}

// ../../node_modules/hast-util-to-html/node_modules/property-information/lib/xmlns.js
var xmlns = create({
  space: "xmlns",
  attributes: { xmlnsxlink: "xmlns:xlink" },
  transform: caseInsensitiveTransform,
  properties: { xmlns: null, xmlnsXLink: null }
});

// ../../node_modules/hast-util-to-html/node_modules/property-information/lib/aria.js
var aria = create({
  transform(_, prop) {
    return prop === "role" ? prop : "aria-" + prop.slice(4).toLowerCase();
  },
  properties: {
    ariaActiveDescendant: null,
    ariaAtomic: booleanish,
    ariaAutoComplete: null,
    ariaBusy: booleanish,
    ariaChecked: booleanish,
    ariaColCount: number,
    ariaColIndex: number,
    ariaColSpan: number,
    ariaControls: spaceSeparated,
    ariaCurrent: null,
    ariaDescribedBy: spaceSeparated,
    ariaDetails: null,
    ariaDisabled: booleanish,
    ariaDropEffect: spaceSeparated,
    ariaErrorMessage: null,
    ariaExpanded: booleanish,
    ariaFlowTo: spaceSeparated,
    ariaGrabbed: booleanish,
    ariaHasPopup: null,
    ariaHidden: booleanish,
    ariaInvalid: null,
    ariaKeyShortcuts: null,
    ariaLabel: null,
    ariaLabelledBy: spaceSeparated,
    ariaLevel: number,
    ariaLive: null,
    ariaModal: booleanish,
    ariaMultiLine: booleanish,
    ariaMultiSelectable: booleanish,
    ariaOrientation: null,
    ariaOwns: spaceSeparated,
    ariaPlaceholder: null,
    ariaPosInSet: number,
    ariaPressed: booleanish,
    ariaReadOnly: booleanish,
    ariaRelevant: null,
    ariaRequired: booleanish,
    ariaRoleDescription: spaceSeparated,
    ariaRowCount: number,
    ariaRowIndex: number,
    ariaRowSpan: number,
    ariaSelected: booleanish,
    ariaSetSize: number,
    ariaSort: null,
    ariaValueMax: number,
    ariaValueMin: number,
    ariaValueNow: number,
    ariaValueText: null,
    role: null
  }
});

// ../../node_modules/hast-util-to-html/node_modules/property-information/lib/html.js
var html2 = create({
  space: "html",
  attributes: {
    acceptcharset: "accept-charset",
    classname: "class",
    htmlfor: "for",
    httpequiv: "http-equiv"
  },
  transform: caseInsensitiveTransform,
  mustUseProperty: ["checked", "multiple", "muted", "selected"],
  properties: {
    abbr: null,
    accept: commaSeparated,
    acceptCharset: spaceSeparated,
    accessKey: spaceSeparated,
    action: null,
    allow: null,
    allowFullScreen: boolean,
    allowPaymentRequest: boolean,
    allowUserMedia: boolean,
    alt: null,
    as: null,
    async: boolean,
    autoCapitalize: null,
    autoComplete: spaceSeparated,
    autoFocus: boolean,
    autoPlay: boolean,
    capture: boolean,
    charSet: null,
    checked: boolean,
    cite: null,
    className: spaceSeparated,
    cols: number,
    colSpan: null,
    content: null,
    contentEditable: booleanish,
    controls: boolean,
    controlsList: spaceSeparated,
    coords: number | commaSeparated,
    crossOrigin: null,
    data: null,
    dateTime: null,
    decoding: null,
    default: boolean,
    defer: boolean,
    dir: null,
    dirName: null,
    disabled: boolean,
    download: overloadedBoolean,
    draggable: booleanish,
    encType: null,
    enterKeyHint: null,
    form: null,
    formAction: null,
    formEncType: null,
    formMethod: null,
    formNoValidate: boolean,
    formTarget: null,
    headers: spaceSeparated,
    height: number,
    hidden: boolean,
    high: number,
    href: null,
    hrefLang: null,
    htmlFor: spaceSeparated,
    httpEquiv: spaceSeparated,
    id: null,
    imageSizes: null,
    imageSrcSet: null,
    inputMode: null,
    integrity: null,
    is: null,
    isMap: boolean,
    itemId: null,
    itemProp: spaceSeparated,
    itemRef: spaceSeparated,
    itemScope: boolean,
    itemType: spaceSeparated,
    kind: null,
    label: null,
    lang: null,
    language: null,
    list: null,
    loading: null,
    loop: boolean,
    low: number,
    manifest: null,
    max: null,
    maxLength: number,
    media: null,
    method: null,
    min: null,
    minLength: number,
    multiple: boolean,
    muted: boolean,
    name: null,
    nonce: null,
    noModule: boolean,
    noValidate: boolean,
    onAbort: null,
    onAfterPrint: null,
    onAuxClick: null,
    onBeforeMatch: null,
    onBeforePrint: null,
    onBeforeUnload: null,
    onBlur: null,
    onCancel: null,
    onCanPlay: null,
    onCanPlayThrough: null,
    onChange: null,
    onClick: null,
    onClose: null,
    onContextLost: null,
    onContextMenu: null,
    onContextRestored: null,
    onCopy: null,
    onCueChange: null,
    onCut: null,
    onDblClick: null,
    onDrag: null,
    onDragEnd: null,
    onDragEnter: null,
    onDragExit: null,
    onDragLeave: null,
    onDragOver: null,
    onDragStart: null,
    onDrop: null,
    onDurationChange: null,
    onEmptied: null,
    onEnded: null,
    onError: null,
    onFocus: null,
    onFormData: null,
    onHashChange: null,
    onInput: null,
    onInvalid: null,
    onKeyDown: null,
    onKeyPress: null,
    onKeyUp: null,
    onLanguageChange: null,
    onLoad: null,
    onLoadedData: null,
    onLoadedMetadata: null,
    onLoadEnd: null,
    onLoadStart: null,
    onMessage: null,
    onMessageError: null,
    onMouseDown: null,
    onMouseEnter: null,
    onMouseLeave: null,
    onMouseMove: null,
    onMouseOut: null,
    onMouseOver: null,
    onMouseUp: null,
    onOffline: null,
    onOnline: null,
    onPageHide: null,
    onPageShow: null,
    onPaste: null,
    onPause: null,
    onPlay: null,
    onPlaying: null,
    onPopState: null,
    onProgress: null,
    onRateChange: null,
    onRejectionHandled: null,
    onReset: null,
    onResize: null,
    onScroll: null,
    onScrollEnd: null,
    onSecurityPolicyViolation: null,
    onSeeked: null,
    onSeeking: null,
    onSelect: null,
    onSlotChange: null,
    onStalled: null,
    onStorage: null,
    onSubmit: null,
    onSuspend: null,
    onTimeUpdate: null,
    onToggle: null,
    onUnhandledRejection: null,
    onUnload: null,
    onVolumeChange: null,
    onWaiting: null,
    onWheel: null,
    open: boolean,
    optimum: number,
    pattern: null,
    ping: spaceSeparated,
    placeholder: null,
    playsInline: boolean,
    poster: null,
    preload: null,
    readOnly: boolean,
    referrerPolicy: null,
    rel: spaceSeparated,
    required: boolean,
    reversed: boolean,
    rows: number,
    rowSpan: number,
    sandbox: spaceSeparated,
    scope: null,
    scoped: boolean,
    seamless: boolean,
    selected: boolean,
    shape: null,
    size: number,
    sizes: null,
    slot: null,
    span: number,
    spellCheck: booleanish,
    src: null,
    srcDoc: null,
    srcLang: null,
    srcSet: null,
    start: number,
    step: null,
    style: null,
    tabIndex: number,
    target: null,
    title: null,
    translate: null,
    type: null,
    typeMustMatch: boolean,
    useMap: null,
    value: booleanish,
    width: number,
    wrap: null,
    align: null,
    aLink: null,
    archive: spaceSeparated,
    axis: null,
    background: null,
    bgColor: null,
    border: number,
    borderColor: null,
    bottomMargin: number,
    cellPadding: null,
    cellSpacing: null,
    char: null,
    charOff: null,
    classId: null,
    clear: null,
    code: null,
    codeBase: null,
    codeType: null,
    color: null,
    compact: boolean,
    declare: boolean,
    event: null,
    face: null,
    frame: null,
    frameBorder: null,
    hSpace: number,
    leftMargin: number,
    link: null,
    longDesc: null,
    lowSrc: null,
    marginHeight: number,
    marginWidth: number,
    noResize: boolean,
    noHref: boolean,
    noShade: boolean,
    noWrap: boolean,
    object: null,
    profile: null,
    prompt: null,
    rev: null,
    rightMargin: number,
    rules: null,
    scheme: null,
    scrolling: booleanish,
    standby: null,
    summary: null,
    text: null,
    topMargin: number,
    valueType: null,
    version: null,
    vAlign: null,
    vLink: null,
    vSpace: number,
    allowTransparency: null,
    autoCorrect: null,
    autoSave: null,
    disablePictureInPicture: boolean,
    disableRemotePlayback: boolean,
    prefix: null,
    property: null,
    results: number,
    security: null,
    unselectable: null
  }
});

// ../../node_modules/hast-util-to-html/node_modules/property-information/lib/svg.js
var svg = create({
  space: "svg",
  attributes: {
    accentHeight: "accent-height",
    alignmentBaseline: "alignment-baseline",
    arabicForm: "arabic-form",
    baselineShift: "baseline-shift",
    capHeight: "cap-height",
    className: "class",
    clipPath: "clip-path",
    clipRule: "clip-rule",
    colorInterpolation: "color-interpolation",
    colorInterpolationFilters: "color-interpolation-filters",
    colorProfile: "color-profile",
    colorRendering: "color-rendering",
    crossOrigin: "crossorigin",
    dataType: "datatype",
    dominantBaseline: "dominant-baseline",
    enableBackground: "enable-background",
    fillOpacity: "fill-opacity",
    fillRule: "fill-rule",
    floodColor: "flood-color",
    floodOpacity: "flood-opacity",
    fontFamily: "font-family",
    fontSize: "font-size",
    fontSizeAdjust: "font-size-adjust",
    fontStretch: "font-stretch",
    fontStyle: "font-style",
    fontVariant: "font-variant",
    fontWeight: "font-weight",
    glyphName: "glyph-name",
    glyphOrientationHorizontal: "glyph-orientation-horizontal",
    glyphOrientationVertical: "glyph-orientation-vertical",
    hrefLang: "hreflang",
    horizAdvX: "horiz-adv-x",
    horizOriginX: "horiz-origin-x",
    horizOriginY: "horiz-origin-y",
    imageRendering: "image-rendering",
    letterSpacing: "letter-spacing",
    lightingColor: "lighting-color",
    markerEnd: "marker-end",
    markerMid: "marker-mid",
    markerStart: "marker-start",
    navDown: "nav-down",
    navDownLeft: "nav-down-left",
    navDownRight: "nav-down-right",
    navLeft: "nav-left",
    navNext: "nav-next",
    navPrev: "nav-prev",
    navRight: "nav-right",
    navUp: "nav-up",
    navUpLeft: "nav-up-left",
    navUpRight: "nav-up-right",
    onAbort: "onabort",
    onActivate: "onactivate",
    onAfterPrint: "onafterprint",
    onBeforePrint: "onbeforeprint",
    onBegin: "onbegin",
    onCancel: "oncancel",
    onCanPlay: "oncanplay",
    onCanPlayThrough: "oncanplaythrough",
    onChange: "onchange",
    onClick: "onclick",
    onClose: "onclose",
    onCopy: "oncopy",
    onCueChange: "oncuechange",
    onCut: "oncut",
    onDblClick: "ondblclick",
    onDrag: "ondrag",
    onDragEnd: "ondragend",
    onDragEnter: "ondragenter",
    onDragExit: "ondragexit",
    onDragLeave: "ondragleave",
    onDragOver: "ondragover",
    onDragStart: "ondragstart",
    onDrop: "ondrop",
    onDurationChange: "ondurationchange",
    onEmptied: "onemptied",
    onEnd: "onend",
    onEnded: "onended",
    onError: "onerror",
    onFocus: "onfocus",
    onFocusIn: "onfocusin",
    onFocusOut: "onfocusout",
    onHashChange: "onhashchange",
    onInput: "oninput",
    onInvalid: "oninvalid",
    onKeyDown: "onkeydown",
    onKeyPress: "onkeypress",
    onKeyUp: "onkeyup",
    onLoad: "onload",
    onLoadedData: "onloadeddata",
    onLoadedMetadata: "onloadedmetadata",
    onLoadStart: "onloadstart",
    onMessage: "onmessage",
    onMouseDown: "onmousedown",
    onMouseEnter: "onmouseenter",
    onMouseLeave: "onmouseleave",
    onMouseMove: "onmousemove",
    onMouseOut: "onmouseout",
    onMouseOver: "onmouseover",
    onMouseUp: "onmouseup",
    onMouseWheel: "onmousewheel",
    onOffline: "onoffline",
    onOnline: "ononline",
    onPageHide: "onpagehide",
    onPageShow: "onpageshow",
    onPaste: "onpaste",
    onPause: "onpause",
    onPlay: "onplay",
    onPlaying: "onplaying",
    onPopState: "onpopstate",
    onProgress: "onprogress",
    onRateChange: "onratechange",
    onRepeat: "onrepeat",
    onReset: "onreset",
    onResize: "onresize",
    onScroll: "onscroll",
    onSeeked: "onseeked",
    onSeeking: "onseeking",
    onSelect: "onselect",
    onShow: "onshow",
    onStalled: "onstalled",
    onStorage: "onstorage",
    onSubmit: "onsubmit",
    onSuspend: "onsuspend",
    onTimeUpdate: "ontimeupdate",
    onToggle: "ontoggle",
    onUnload: "onunload",
    onVolumeChange: "onvolumechange",
    onWaiting: "onwaiting",
    onZoom: "onzoom",
    overlinePosition: "overline-position",
    overlineThickness: "overline-thickness",
    paintOrder: "paint-order",
    panose1: "panose-1",
    pointerEvents: "pointer-events",
    referrerPolicy: "referrerpolicy",
    renderingIntent: "rendering-intent",
    shapeRendering: "shape-rendering",
    stopColor: "stop-color",
    stopOpacity: "stop-opacity",
    strikethroughPosition: "strikethrough-position",
    strikethroughThickness: "strikethrough-thickness",
    strokeDashArray: "stroke-dasharray",
    strokeDashOffset: "stroke-dashoffset",
    strokeLineCap: "stroke-linecap",
    strokeLineJoin: "stroke-linejoin",
    strokeMiterLimit: "stroke-miterlimit",
    strokeOpacity: "stroke-opacity",
    strokeWidth: "stroke-width",
    tabIndex: "tabindex",
    textAnchor: "text-anchor",
    textDecoration: "text-decoration",
    textRendering: "text-rendering",
    typeOf: "typeof",
    underlinePosition: "underline-position",
    underlineThickness: "underline-thickness",
    unicodeBidi: "unicode-bidi",
    unicodeRange: "unicode-range",
    unitsPerEm: "units-per-em",
    vAlphabetic: "v-alphabetic",
    vHanging: "v-hanging",
    vIdeographic: "v-ideographic",
    vMathematical: "v-mathematical",
    vectorEffect: "vector-effect",
    vertAdvY: "vert-adv-y",
    vertOriginX: "vert-origin-x",
    vertOriginY: "vert-origin-y",
    wordSpacing: "word-spacing",
    writingMode: "writing-mode",
    xHeight: "x-height",
    playbackOrder: "playbackorder",
    timelineBegin: "timelinebegin"
  },
  transform: caseSensitiveTransform,
  properties: {
    about: commaOrSpaceSeparated,
    accentHeight: number,
    accumulate: null,
    additive: null,
    alignmentBaseline: null,
    alphabetic: number,
    amplitude: number,
    arabicForm: null,
    ascent: number,
    attributeName: null,
    attributeType: null,
    azimuth: number,
    bandwidth: null,
    baselineShift: null,
    baseFrequency: null,
    baseProfile: null,
    bbox: null,
    begin: null,
    bias: number,
    by: null,
    calcMode: null,
    capHeight: number,
    className: spaceSeparated,
    clip: null,
    clipPath: null,
    clipPathUnits: null,
    clipRule: null,
    color: null,
    colorInterpolation: null,
    colorInterpolationFilters: null,
    colorProfile: null,
    colorRendering: null,
    content: null,
    contentScriptType: null,
    contentStyleType: null,
    crossOrigin: null,
    cursor: null,
    cx: null,
    cy: null,
    d: null,
    dataType: null,
    defaultAction: null,
    descent: number,
    diffuseConstant: number,
    direction: null,
    display: null,
    dur: null,
    divisor: number,
    dominantBaseline: null,
    download: boolean,
    dx: null,
    dy: null,
    edgeMode: null,
    editable: null,
    elevation: number,
    enableBackground: null,
    end: null,
    event: null,
    exponent: number,
    externalResourcesRequired: null,
    fill: null,
    fillOpacity: number,
    fillRule: null,
    filter: null,
    filterRes: null,
    filterUnits: null,
    floodColor: null,
    floodOpacity: null,
    focusable: null,
    focusHighlight: null,
    fontFamily: null,
    fontSize: null,
    fontSizeAdjust: null,
    fontStretch: null,
    fontStyle: null,
    fontVariant: null,
    fontWeight: null,
    format: null,
    fr: null,
    from: null,
    fx: null,
    fy: null,
    g1: commaSeparated,
    g2: commaSeparated,
    glyphName: commaSeparated,
    glyphOrientationHorizontal: null,
    glyphOrientationVertical: null,
    glyphRef: null,
    gradientTransform: null,
    gradientUnits: null,
    handler: null,
    hanging: number,
    hatchContentUnits: null,
    hatchUnits: null,
    height: null,
    href: null,
    hrefLang: null,
    horizAdvX: number,
    horizOriginX: number,
    horizOriginY: number,
    id: null,
    ideographic: number,
    imageRendering: null,
    initialVisibility: null,
    in: null,
    in2: null,
    intercept: number,
    k: number,
    k1: number,
    k2: number,
    k3: number,
    k4: number,
    kernelMatrix: commaOrSpaceSeparated,
    kernelUnitLength: null,
    keyPoints: null,
    keySplines: null,
    keyTimes: null,
    kerning: null,
    lang: null,
    lengthAdjust: null,
    letterSpacing: null,
    lightingColor: null,
    limitingConeAngle: number,
    local: null,
    markerEnd: null,
    markerMid: null,
    markerStart: null,
    markerHeight: null,
    markerUnits: null,
    markerWidth: null,
    mask: null,
    maskContentUnits: null,
    maskUnits: null,
    mathematical: null,
    max: null,
    media: null,
    mediaCharacterEncoding: null,
    mediaContentEncodings: null,
    mediaSize: number,
    mediaTime: null,
    method: null,
    min: null,
    mode: null,
    name: null,
    navDown: null,
    navDownLeft: null,
    navDownRight: null,
    navLeft: null,
    navNext: null,
    navPrev: null,
    navRight: null,
    navUp: null,
    navUpLeft: null,
    navUpRight: null,
    numOctaves: null,
    observer: null,
    offset: null,
    onAbort: null,
    onActivate: null,
    onAfterPrint: null,
    onBeforePrint: null,
    onBegin: null,
    onCancel: null,
    onCanPlay: null,
    onCanPlayThrough: null,
    onChange: null,
    onClick: null,
    onClose: null,
    onCopy: null,
    onCueChange: null,
    onCut: null,
    onDblClick: null,
    onDrag: null,
    onDragEnd: null,
    onDragEnter: null,
    onDragExit: null,
    onDragLeave: null,
    onDragOver: null,
    onDragStart: null,
    onDrop: null,
    onDurationChange: null,
    onEmptied: null,
    onEnd: null,
    onEnded: null,
    onError: null,
    onFocus: null,
    onFocusIn: null,
    onFocusOut: null,
    onHashChange: null,
    onInput: null,
    onInvalid: null,
    onKeyDown: null,
    onKeyPress: null,
    onKeyUp: null,
    onLoad: null,
    onLoadedData: null,
    onLoadedMetadata: null,
    onLoadStart: null,
    onMessage: null,
    onMouseDown: null,
    onMouseEnter: null,
    onMouseLeave: null,
    onMouseMove: null,
    onMouseOut: null,
    onMouseOver: null,
    onMouseUp: null,
    onMouseWheel: null,
    onOffline: null,
    onOnline: null,
    onPageHide: null,
    onPageShow: null,
    onPaste: null,
    onPause: null,
    onPlay: null,
    onPlaying: null,
    onPopState: null,
    onProgress: null,
    onRateChange: null,
    onRepeat: null,
    onReset: null,
    onResize: null,
    onScroll: null,
    onSeeked: null,
    onSeeking: null,
    onSelect: null,
    onShow: null,
    onStalled: null,
    onStorage: null,
    onSubmit: null,
    onSuspend: null,
    onTimeUpdate: null,
    onToggle: null,
    onUnload: null,
    onVolumeChange: null,
    onWaiting: null,
    onZoom: null,
    opacity: null,
    operator: null,
    order: null,
    orient: null,
    orientation: null,
    origin: null,
    overflow: null,
    overlay: null,
    overlinePosition: number,
    overlineThickness: number,
    paintOrder: null,
    panose1: null,
    path: null,
    pathLength: number,
    patternContentUnits: null,
    patternTransform: null,
    patternUnits: null,
    phase: null,
    ping: spaceSeparated,
    pitch: null,
    playbackOrder: null,
    pointerEvents: null,
    points: null,
    pointsAtX: number,
    pointsAtY: number,
    pointsAtZ: number,
    preserveAlpha: null,
    preserveAspectRatio: null,
    primitiveUnits: null,
    propagate: null,
    property: commaOrSpaceSeparated,
    r: null,
    radius: null,
    referrerPolicy: null,
    refX: null,
    refY: null,
    rel: commaOrSpaceSeparated,
    rev: commaOrSpaceSeparated,
    renderingIntent: null,
    repeatCount: null,
    repeatDur: null,
    requiredExtensions: commaOrSpaceSeparated,
    requiredFeatures: commaOrSpaceSeparated,
    requiredFonts: commaOrSpaceSeparated,
    requiredFormats: commaOrSpaceSeparated,
    resource: null,
    restart: null,
    result: null,
    rotate: null,
    rx: null,
    ry: null,
    scale: null,
    seed: null,
    shapeRendering: null,
    side: null,
    slope: null,
    snapshotTime: null,
    specularConstant: number,
    specularExponent: number,
    spreadMethod: null,
    spacing: null,
    startOffset: null,
    stdDeviation: null,
    stemh: null,
    stemv: null,
    stitchTiles: null,
    stopColor: null,
    stopOpacity: null,
    strikethroughPosition: number,
    strikethroughThickness: number,
    string: null,
    stroke: null,
    strokeDashArray: commaOrSpaceSeparated,
    strokeDashOffset: null,
    strokeLineCap: null,
    strokeLineJoin: null,
    strokeMiterLimit: number,
    strokeOpacity: number,
    strokeWidth: null,
    style: null,
    surfaceScale: number,
    syncBehavior: null,
    syncBehaviorDefault: null,
    syncMaster: null,
    syncTolerance: null,
    syncToleranceDefault: null,
    systemLanguage: commaOrSpaceSeparated,
    tabIndex: number,
    tableValues: null,
    target: null,
    targetX: number,
    targetY: number,
    textAnchor: null,
    textDecoration: null,
    textRendering: null,
    textLength: null,
    timelineBegin: null,
    title: null,
    transformBehavior: null,
    type: null,
    typeOf: commaOrSpaceSeparated,
    to: null,
    transform: null,
    u1: null,
    u2: null,
    underlinePosition: number,
    underlineThickness: number,
    unicode: null,
    unicodeBidi: null,
    unicodeRange: null,
    unitsPerEm: number,
    values: null,
    vAlphabetic: number,
    vMathematical: number,
    vectorEffect: null,
    vHanging: number,
    vIdeographic: number,
    version: null,
    vertAdvY: number,
    vertOriginX: number,
    vertOriginY: number,
    viewBox: null,
    viewTarget: null,
    visibility: null,
    width: null,
    widths: null,
    wordSpacing: null,
    writingMode: null,
    x: null,
    x1: null,
    x2: null,
    xChannelSelector: null,
    xHeight: number,
    y: null,
    y1: null,
    y2: null,
    yChannelSelector: null,
    z: null,
    zoomAndPan: null
  }
});

// ../../node_modules/hast-util-to-html/node_modules/property-information/lib/find.js
var valid = /^data[-\w.:]+$/i;
var dash = /-[a-z]/g;
var cap = /[A-Z]/g;
function find(schema, value) {
  const normal = normalize(value);
  let prop = value;
  let Type = Info;
  if (normal in schema.normal) {
    return schema.property[schema.normal[normal]];
  }
  if (normal.length > 4 && normal.slice(0, 4) === "data" && valid.test(value)) {
    if (value.charAt(4) === "-") {
      const rest = value.slice(5).replace(dash, camelcase);
      prop = "data" + rest.charAt(0).toUpperCase() + rest.slice(1);
    } else {
      const rest = value.slice(4);
      if (!dash.test(rest)) {
        let dashes = rest.replace(cap, kebab);
        if (dashes.charAt(0) !== "-") {
          dashes = "-" + dashes;
        }
        value = "data" + dashes;
      }
    }
    Type = DefinedInfo;
  }
  return new Type(prop, value);
}
function kebab($0) {
  return "-" + $0.toLowerCase();
}
function camelcase($0) {
  return $0.charAt(1).toUpperCase();
}

// ../../node_modules/hast-util-to-html/node_modules/property-information/index.js
var html3 = merge([xml, xlink, xmlns, aria, html2], "html");
var svg2 = merge([xml, xlink, xmlns, aria, svg], "svg");

// ../../node_modules/html-void-elements/index.js
var htmlVoidElements = [
  "area",
  "base",
  "basefont",
  "bgsound",
  "br",
  "col",
  "command",
  "embed",
  "frame",
  "hr",
  "image",
  "img",
  "input",
  "isindex",
  "keygen",
  "link",
  "menuitem",
  "meta",
  "nextid",
  "param",
  "source",
  "track",
  "wbr"
];

// ../../node_modules/hast-util-to-html/lib/handle/index.js
init_zwitch();

// ../../node_modules/stringify-entities/lib/core.js
function core(value, options) {
  value = value.replace(
    options.subset ? charactersToExpression(options.subset) : /["&'<>`]/g,
    basic
  );
  if (options.subset || options.escapeOnly) {
    return value;
  }
  return value.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, surrogate).replace(
    /[\x01-\t\v\f\x0E-\x1F\x7F\x81\x8D\x8F\x90\x9D\xA0-\uFFFF]/g,
    basic
  );
  function surrogate(pair, index, all3) {
    return options.format(
      (pair.charCodeAt(0) - 55296) * 1024 + pair.charCodeAt(1) - 56320 + 65536,
      all3.charCodeAt(index + 2),
      options
    );
  }
  function basic(character, index, all3) {
    return options.format(
      character.charCodeAt(0),
      all3.charCodeAt(index + 1),
      options
    );
  }
}
function charactersToExpression(subset) {
  const groups = [];
  let index = -1;
  while (++index < subset.length) {
    groups.push(subset[index].replace(/[|\\{}()[\]^$+*?.]/g, "\\$&"));
  }
  return new RegExp("(?:" + groups.join("|") + ")", "g");
}

// ../../node_modules/stringify-entities/lib/util/to-hexadecimal.js
function toHexadecimal(code3, next, omit) {
  const value = "&#x" + code3.toString(16).toUpperCase();
  return omit && next && !/[\dA-Fa-f]/.test(String.fromCharCode(next)) ? value : value + ";";
}

// ../../node_modules/stringify-entities/lib/util/to-decimal.js
function toDecimal(code3, next, omit) {
  const value = "&#" + String(code3);
  return omit && next && !/\d/.test(String.fromCharCode(next)) ? value : value + ";";
}

// ../../node_modules/stringify-entities/node_modules/character-entities-legacy/index.js
var characterEntitiesLegacy = [
  "AElig",
  "AMP",
  "Aacute",
  "Acirc",
  "Agrave",
  "Aring",
  "Atilde",
  "Auml",
  "COPY",
  "Ccedil",
  "ETH",
  "Eacute",
  "Ecirc",
  "Egrave",
  "Euml",
  "GT",
  "Iacute",
  "Icirc",
  "Igrave",
  "Iuml",
  "LT",
  "Ntilde",
  "Oacute",
  "Ocirc",
  "Ograve",
  "Oslash",
  "Otilde",
  "Ouml",
  "QUOT",
  "REG",
  "THORN",
  "Uacute",
  "Ucirc",
  "Ugrave",
  "Uuml",
  "Yacute",
  "aacute",
  "acirc",
  "acute",
  "aelig",
  "agrave",
  "amp",
  "aring",
  "atilde",
  "auml",
  "brvbar",
  "ccedil",
  "cedil",
  "cent",
  "copy",
  "curren",
  "deg",
  "divide",
  "eacute",
  "ecirc",
  "egrave",
  "eth",
  "euml",
  "frac12",
  "frac14",
  "frac34",
  "gt",
  "iacute",
  "icirc",
  "iexcl",
  "igrave",
  "iquest",
  "iuml",
  "laquo",
  "lt",
  "macr",
  "micro",
  "middot",
  "nbsp",
  "not",
  "ntilde",
  "oacute",
  "ocirc",
  "ograve",
  "ordf",
  "ordm",
  "oslash",
  "otilde",
  "ouml",
  "para",
  "plusmn",
  "pound",
  "quot",
  "raquo",
  "reg",
  "sect",
  "shy",
  "sup1",
  "sup2",
  "sup3",
  "szlig",
  "thorn",
  "times",
  "uacute",
  "ucirc",
  "ugrave",
  "uml",
  "uuml",
  "yacute",
  "yen",
  "yuml"
];

// ../../node_modules/character-entities-html4/index.js
var characterEntitiesHtml4 = {
  nbsp: "\xA0",
  iexcl: "\xA1",
  cent: "\xA2",
  pound: "\xA3",
  curren: "\xA4",
  yen: "\xA5",
  brvbar: "\xA6",
  sect: "\xA7",
  uml: "\xA8",
  copy: "\xA9",
  ordf: "\xAA",
  laquo: "\xAB",
  not: "\xAC",
  shy: "\xAD",
  reg: "\xAE",
  macr: "\xAF",
  deg: "\xB0",
  plusmn: "\xB1",
  sup2: "\xB2",
  sup3: "\xB3",
  acute: "\xB4",
  micro: "\xB5",
  para: "\xB6",
  middot: "\xB7",
  cedil: "\xB8",
  sup1: "\xB9",
  ordm: "\xBA",
  raquo: "\xBB",
  frac14: "\xBC",
  frac12: "\xBD",
  frac34: "\xBE",
  iquest: "\xBF",
  Agrave: "\xC0",
  Aacute: "\xC1",
  Acirc: "\xC2",
  Atilde: "\xC3",
  Auml: "\xC4",
  Aring: "\xC5",
  AElig: "\xC6",
  Ccedil: "\xC7",
  Egrave: "\xC8",
  Eacute: "\xC9",
  Ecirc: "\xCA",
  Euml: "\xCB",
  Igrave: "\xCC",
  Iacute: "\xCD",
  Icirc: "\xCE",
  Iuml: "\xCF",
  ETH: "\xD0",
  Ntilde: "\xD1",
  Ograve: "\xD2",
  Oacute: "\xD3",
  Ocirc: "\xD4",
  Otilde: "\xD5",
  Ouml: "\xD6",
  times: "\xD7",
  Oslash: "\xD8",
  Ugrave: "\xD9",
  Uacute: "\xDA",
  Ucirc: "\xDB",
  Uuml: "\xDC",
  Yacute: "\xDD",
  THORN: "\xDE",
  szlig: "\xDF",
  agrave: "\xE0",
  aacute: "\xE1",
  acirc: "\xE2",
  atilde: "\xE3",
  auml: "\xE4",
  aring: "\xE5",
  aelig: "\xE6",
  ccedil: "\xE7",
  egrave: "\xE8",
  eacute: "\xE9",
  ecirc: "\xEA",
  euml: "\xEB",
  igrave: "\xEC",
  iacute: "\xED",
  icirc: "\xEE",
  iuml: "\xEF",
  eth: "\xF0",
  ntilde: "\xF1",
  ograve: "\xF2",
  oacute: "\xF3",
  ocirc: "\xF4",
  otilde: "\xF5",
  ouml: "\xF6",
  divide: "\xF7",
  oslash: "\xF8",
  ugrave: "\xF9",
  uacute: "\xFA",
  ucirc: "\xFB",
  uuml: "\xFC",
  yacute: "\xFD",
  thorn: "\xFE",
  yuml: "\xFF",
  fnof: "\u0192",
  Alpha: "\u0391",
  Beta: "\u0392",
  Gamma: "\u0393",
  Delta: "\u0394",
  Epsilon: "\u0395",
  Zeta: "\u0396",
  Eta: "\u0397",
  Theta: "\u0398",
  Iota: "\u0399",
  Kappa: "\u039A",
  Lambda: "\u039B",
  Mu: "\u039C",
  Nu: "\u039D",
  Xi: "\u039E",
  Omicron: "\u039F",
  Pi: "\u03A0",
  Rho: "\u03A1",
  Sigma: "\u03A3",
  Tau: "\u03A4",
  Upsilon: "\u03A5",
  Phi: "\u03A6",
  Chi: "\u03A7",
  Psi: "\u03A8",
  Omega: "\u03A9",
  alpha: "\u03B1",
  beta: "\u03B2",
  gamma: "\u03B3",
  delta: "\u03B4",
  epsilon: "\u03B5",
  zeta: "\u03B6",
  eta: "\u03B7",
  theta: "\u03B8",
  iota: "\u03B9",
  kappa: "\u03BA",
  lambda: "\u03BB",
  mu: "\u03BC",
  nu: "\u03BD",
  xi: "\u03BE",
  omicron: "\u03BF",
  pi: "\u03C0",
  rho: "\u03C1",
  sigmaf: "\u03C2",
  sigma: "\u03C3",
  tau: "\u03C4",
  upsilon: "\u03C5",
  phi: "\u03C6",
  chi: "\u03C7",
  psi: "\u03C8",
  omega: "\u03C9",
  thetasym: "\u03D1",
  upsih: "\u03D2",
  piv: "\u03D6",
  bull: "\u2022",
  hellip: "\u2026",
  prime: "\u2032",
  Prime: "\u2033",
  oline: "\u203E",
  frasl: "\u2044",
  weierp: "\u2118",
  image: "\u2111",
  real: "\u211C",
  trade: "\u2122",
  alefsym: "\u2135",
  larr: "\u2190",
  uarr: "\u2191",
  rarr: "\u2192",
  darr: "\u2193",
  harr: "\u2194",
  crarr: "\u21B5",
  lArr: "\u21D0",
  uArr: "\u21D1",
  rArr: "\u21D2",
  dArr: "\u21D3",
  hArr: "\u21D4",
  forall: "\u2200",
  part: "\u2202",
  exist: "\u2203",
  empty: "\u2205",
  nabla: "\u2207",
  isin: "\u2208",
  notin: "\u2209",
  ni: "\u220B",
  prod: "\u220F",
  sum: "\u2211",
  minus: "\u2212",
  lowast: "\u2217",
  radic: "\u221A",
  prop: "\u221D",
  infin: "\u221E",
  ang: "\u2220",
  and: "\u2227",
  or: "\u2228",
  cap: "\u2229",
  cup: "\u222A",
  int: "\u222B",
  there4: "\u2234",
  sim: "\u223C",
  cong: "\u2245",
  asymp: "\u2248",
  ne: "\u2260",
  equiv: "\u2261",
  le: "\u2264",
  ge: "\u2265",
  sub: "\u2282",
  sup: "\u2283",
  nsub: "\u2284",
  sube: "\u2286",
  supe: "\u2287",
  oplus: "\u2295",
  otimes: "\u2297",
  perp: "\u22A5",
  sdot: "\u22C5",
  lceil: "\u2308",
  rceil: "\u2309",
  lfloor: "\u230A",
  rfloor: "\u230B",
  lang: "\u2329",
  rang: "\u232A",
  loz: "\u25CA",
  spades: "\u2660",
  clubs: "\u2663",
  hearts: "\u2665",
  diams: "\u2666",
  quot: '"',
  amp: "&",
  lt: "<",
  gt: ">",
  OElig: "\u0152",
  oelig: "\u0153",
  Scaron: "\u0160",
  scaron: "\u0161",
  Yuml: "\u0178",
  circ: "\u02C6",
  tilde: "\u02DC",
  ensp: "\u2002",
  emsp: "\u2003",
  thinsp: "\u2009",
  zwnj: "\u200C",
  zwj: "\u200D",
  lrm: "\u200E",
  rlm: "\u200F",
  ndash: "\u2013",
  mdash: "\u2014",
  lsquo: "\u2018",
  rsquo: "\u2019",
  sbquo: "\u201A",
  ldquo: "\u201C",
  rdquo: "\u201D",
  bdquo: "\u201E",
  dagger: "\u2020",
  Dagger: "\u2021",
  permil: "\u2030",
  lsaquo: "\u2039",
  rsaquo: "\u203A",
  euro: "\u20AC"
};

// ../../node_modules/stringify-entities/lib/constant/dangerous.js
var dangerous = [
  "cent",
  "copy",
  "divide",
  "gt",
  "lt",
  "not",
  "para",
  "times"
];

// ../../node_modules/stringify-entities/lib/util/to-named.js
var own4 = {}.hasOwnProperty;
var characters = {};
var key;
for (key in characterEntitiesHtml4) {
  if (own4.call(characterEntitiesHtml4, key)) {
    characters[characterEntitiesHtml4[key]] = key;
  }
}
function toNamed(code3, next, omit, attribute) {
  const character = String.fromCharCode(code3);
  if (own4.call(characters, character)) {
    const name = characters[character];
    const value = "&" + name;
    if (omit && characterEntitiesLegacy.includes(name) && !dangerous.includes(name) && (!attribute || next && next !== 61 && /[^\da-z]/i.test(String.fromCharCode(next)))) {
      return value;
    }
    return value + ";";
  }
  return "";
}

// ../../node_modules/stringify-entities/lib/util/format-smart.js
function formatSmart(code3, next, options) {
  let numeric = toHexadecimal(code3, next, options.omitOptionalSemicolons);
  let named;
  if (options.useNamedReferences || options.useShortestReferences) {
    named = toNamed(
      code3,
      next,
      options.omitOptionalSemicolons,
      options.attribute
    );
  }
  if ((options.useShortestReferences || !named) && options.useShortestReferences) {
    const decimal = toDecimal(code3, next, options.omitOptionalSemicolons);
    if (decimal.length < numeric.length) {
      numeric = decimal;
    }
  }
  return named && (!options.useShortestReferences || named.length < numeric.length) ? named : numeric;
}

// ../../node_modules/stringify-entities/lib/index.js
function stringifyEntities(value, options) {
  return core(value, Object.assign({ format: formatSmart }, options));
}

// ../../node_modules/hast-util-to-html/lib/handle/comment.js
function comment(node, _1, _2, state) {
  return state.settings.bogusComments ? "<?" + stringifyEntities(
    node.value,
    Object.assign({}, state.settings.characterReferences, { subset: [">"] })
  ) + ">" : "<!--" + node.value.replace(/^>|^->|<!--|-->|--!>|<!-$/g, encode) + "-->";
  function encode($0) {
    return stringifyEntities(
      $0,
      Object.assign({}, state.settings.characterReferences, {
        subset: ["<", ">"]
      })
    );
  }
}

// ../../node_modules/hast-util-to-html/lib/handle/doctype.js
function doctype(_1, _2, _3, state) {
  return "<!" + (state.settings.upperDoctype ? "DOCTYPE" : "doctype") + (state.settings.tightDoctype ? "" : " ") + "html>";
}

// ../../node_modules/ccount/index.js
function ccount(value, character) {
  const source = String(value);
  if (typeof character !== "string") {
    throw new TypeError("Expected character");
  }
  let count = 0;
  let index = source.indexOf(character);
  while (index !== -1) {
    count++;
    index = source.indexOf(character, index + character.length);
  }
  return count;
}

// ../../node_modules/hast-util-to-html/node_modules/comma-separated-tokens/index.js
function stringify(values, options) {
  const settings = options || {};
  const input = values[values.length - 1] === "" ? [...values, ""] : values;
  return input.join(
    (settings.padRight ? " " : "") + "," + (settings.padLeft === false ? "" : " ")
  ).trim();
}

// ../../node_modules/hast-util-to-html/node_modules/space-separated-tokens/index.js
function stringify2(values) {
  return values.join(" ").trim();
}

// ../../node_modules/hast-util-to-html/lib/omission/util/siblings.js
var siblingAfter = siblings(1);
var siblingBefore = siblings(-1);
function siblings(increment2) {
  return sibling;
  function sibling(parent, index, includeWhitespace) {
    const siblings2 = parent ? parent.children : [];
    let offset = (index || 0) + increment2;
    let next = siblings2 && siblings2[offset];
    if (!includeWhitespace) {
      while (next && whitespace(next)) {
        offset += increment2;
        next = siblings2[offset];
      }
    }
    return next;
  }
}

// ../../node_modules/hast-util-to-html/lib/omission/omission.js
var own5 = {}.hasOwnProperty;
function omission(handlers2) {
  return omit;
  function omit(node, index, parent) {
    return own5.call(handlers2, node.tagName) && handlers2[node.tagName](node, index, parent);
  }
}

// ../../node_modules/hast-util-to-html/lib/omission/closing.js
var closing = omission({
  html: html4,
  head: headOrColgroupOrCaption,
  body,
  p,
  li,
  dt,
  dd,
  rt: rubyElement,
  rp: rubyElement,
  optgroup,
  option,
  menuitem,
  colgroup: headOrColgroupOrCaption,
  caption: headOrColgroupOrCaption,
  thead,
  tbody,
  tfoot,
  tr,
  td: cells,
  th: cells
});
function headOrColgroupOrCaption(_, index, parent) {
  const next = siblingAfter(parent, index, true);
  return !next || next.type !== "comment" && !(next.type === "text" && whitespace(next.value.charAt(0)));
}
function html4(_, index, parent) {
  const next = siblingAfter(parent, index);
  return !next || next.type !== "comment";
}
function body(_, index, parent) {
  const next = siblingAfter(parent, index);
  return !next || next.type !== "comment";
}
function p(_, index, parent) {
  const next = siblingAfter(parent, index);
  return next ? next.type === "element" && (next.tagName === "address" || next.tagName === "article" || next.tagName === "aside" || next.tagName === "blockquote" || next.tagName === "details" || next.tagName === "div" || next.tagName === "dl" || next.tagName === "fieldset" || next.tagName === "figcaption" || next.tagName === "figure" || next.tagName === "footer" || next.tagName === "form" || next.tagName === "h1" || next.tagName === "h2" || next.tagName === "h3" || next.tagName === "h4" || next.tagName === "h5" || next.tagName === "h6" || next.tagName === "header" || next.tagName === "hgroup" || next.tagName === "hr" || next.tagName === "main" || next.tagName === "menu" || next.tagName === "nav" || next.tagName === "ol" || next.tagName === "p" || next.tagName === "pre" || next.tagName === "section" || next.tagName === "table" || next.tagName === "ul") : !parent || !(parent.type === "element" && (parent.tagName === "a" || parent.tagName === "audio" || parent.tagName === "del" || parent.tagName === "ins" || parent.tagName === "map" || parent.tagName === "noscript" || parent.tagName === "video"));
}
function li(_, index, parent) {
  const next = siblingAfter(parent, index);
  return !next || next.type === "element" && next.tagName === "li";
}
function dt(_, index, parent) {
  const next = siblingAfter(parent, index);
  return next && next.type === "element" && (next.tagName === "dt" || next.tagName === "dd");
}
function dd(_, index, parent) {
  const next = siblingAfter(parent, index);
  return !next || next.type === "element" && (next.tagName === "dt" || next.tagName === "dd");
}
function rubyElement(_, index, parent) {
  const next = siblingAfter(parent, index);
  return !next || next.type === "element" && (next.tagName === "rp" || next.tagName === "rt");
}
function optgroup(_, index, parent) {
  const next = siblingAfter(parent, index);
  return !next || next.type === "element" && next.tagName === "optgroup";
}
function option(_, index, parent) {
  const next = siblingAfter(parent, index);
  return !next || next.type === "element" && (next.tagName === "option" || next.tagName === "optgroup");
}
function menuitem(_, index, parent) {
  const next = siblingAfter(parent, index);
  return !next || next.type === "element" && (next.tagName === "menuitem" || next.tagName === "hr" || next.tagName === "menu");
}
function thead(_, index, parent) {
  const next = siblingAfter(parent, index);
  return next && next.type === "element" && (next.tagName === "tbody" || next.tagName === "tfoot");
}
function tbody(_, index, parent) {
  const next = siblingAfter(parent, index);
  return !next || next.type === "element" && (next.tagName === "tbody" || next.tagName === "tfoot");
}
function tfoot(_, index, parent) {
  return !siblingAfter(parent, index);
}
function tr(_, index, parent) {
  const next = siblingAfter(parent, index);
  return !next || next.type === "element" && next.tagName === "tr";
}
function cells(_, index, parent) {
  const next = siblingAfter(parent, index);
  return !next || next.type === "element" && (next.tagName === "td" || next.tagName === "th");
}

// ../../node_modules/hast-util-to-html/lib/omission/opening.js
var opening = omission({
  html: html5,
  head,
  body: body2,
  colgroup,
  tbody: tbody2
});
function html5(node) {
  const head2 = siblingAfter(node, -1);
  return !head2 || head2.type !== "comment";
}
function head(node) {
  const children = node.children;
  const seen = [];
  let index = -1;
  while (++index < children.length) {
    const child = children[index];
    if (child.type === "element" && (child.tagName === "title" || child.tagName === "base")) {
      if (seen.includes(child.tagName))
        return false;
      seen.push(child.tagName);
    }
  }
  return children.length > 0;
}
function body2(node) {
  const head2 = siblingAfter(node, -1, true);
  return !head2 || head2.type !== "comment" && !(head2.type === "text" && whitespace(head2.value.charAt(0))) && !(head2.type === "element" && (head2.tagName === "meta" || head2.tagName === "link" || head2.tagName === "script" || head2.tagName === "style" || head2.tagName === "template"));
}
function colgroup(node, index, parent) {
  const previous = siblingBefore(parent, index);
  const head2 = siblingAfter(node, -1, true);
  if (parent && previous && previous.type === "element" && previous.tagName === "colgroup" && closing(previous, parent.children.indexOf(previous), parent)) {
    return false;
  }
  return head2 && head2.type === "element" && head2.tagName === "col";
}
function tbody2(node, index, parent) {
  const previous = siblingBefore(parent, index);
  const head2 = siblingAfter(node, -1);
  if (parent && previous && previous.type === "element" && (previous.tagName === "thead" || previous.tagName === "tbody") && closing(previous, parent.children.indexOf(previous), parent)) {
    return false;
  }
  return head2 && head2.type === "element" && head2.tagName === "tr";
}

// ../../node_modules/hast-util-to-html/lib/handle/element.js
var constants = {
  name: [
    ["	\n\f\r &/=>".split(""), "	\n\f\r \"&'/=>`".split("")],
    [`\0	
\f\r "&'/<=>`.split(""), "\0	\n\f\r \"&'/<=>`".split("")]
  ],
  unquoted: [
    ["	\n\f\r &>".split(""), "\0	\n\f\r \"&'<=>`".split("")],
    ["\0	\n\f\r \"&'<=>`".split(""), "\0	\n\f\r \"&'<=>`".split("")]
  ],
  single: [
    ["&'".split(""), "\"&'`".split("")],
    ["\0&'".split(""), "\0\"&'`".split("")]
  ],
  double: [
    ['"&'.split(""), "\"&'`".split("")],
    ['\0"&'.split(""), "\0\"&'`".split("")]
  ]
};
function element(node, index, parent, state) {
  const schema = state.schema;
  const omit = schema.space === "svg" ? false : state.settings.omitOptionalTags;
  let selfClosing = schema.space === "svg" ? state.settings.closeEmptyElements : state.settings.voids.includes(node.tagName.toLowerCase());
  const parts = [];
  let last;
  if (schema.space === "html" && node.tagName === "svg") {
    state.schema = svg2;
  }
  const attrs = serializeAttributes(state, node.properties);
  const content = state.all(
    schema.space === "html" && node.tagName === "template" ? node.content : node
  );
  state.schema = schema;
  if (content)
    selfClosing = false;
  if (attrs || !omit || !opening(node, index, parent)) {
    parts.push("<", node.tagName, attrs ? " " + attrs : "");
    if (selfClosing && (schema.space === "svg" || state.settings.closeSelfClosing)) {
      last = attrs.charAt(attrs.length - 1);
      if (!state.settings.tightSelfClosing || last === "/" || last && last !== '"' && last !== "'") {
        parts.push(" ");
      }
      parts.push("/");
    }
    parts.push(">");
  }
  parts.push(content);
  if (!selfClosing && (!omit || !closing(node, index, parent))) {
    parts.push("</" + node.tagName + ">");
  }
  return parts.join("");
}
function serializeAttributes(state, props) {
  const values = [];
  let index = -1;
  let key2;
  if (props) {
    for (key2 in props) {
      if (props[key2] !== void 0 && props[key2] !== null) {
        const value = serializeAttribute(state, key2, props[key2]);
        if (value)
          values.push(value);
      }
    }
  }
  while (++index < values.length) {
    const last = state.settings.tightAttributes ? values[index].charAt(values[index].length - 1) : null;
    if (index !== values.length - 1 && last !== '"' && last !== "'") {
      values[index] += " ";
    }
  }
  return values.join("");
}
function serializeAttribute(state, key2, value) {
  const info = find(state.schema, key2);
  const x = state.settings.allowParseErrors && state.schema.space === "html" ? 0 : 1;
  const y = state.settings.allowDangerousCharacters ? 0 : 1;
  let quote = state.quote;
  let result;
  if (info.overloadedBoolean && (value === info.attribute || value === "")) {
    value = true;
  } else if (info.boolean || info.overloadedBoolean && typeof value !== "string") {
    value = Boolean(value);
  }
  if (value === void 0 || value === null || value === false || typeof value === "number" && Number.isNaN(value)) {
    return "";
  }
  const name = stringifyEntities(
    info.attribute,
    Object.assign({}, state.settings.characterReferences, {
      subset: constants.name[x][y]
    })
  );
  if (value === true)
    return name;
  value = Array.isArray(value) ? (info.commaSeparated ? stringify : stringify2)(value, {
    padLeft: !state.settings.tightCommaSeparatedLists
  }) : String(value);
  if (state.settings.collapseEmptyAttributes && !value)
    return name;
  if (state.settings.preferUnquoted) {
    result = stringifyEntities(
      value,
      Object.assign({}, state.settings.characterReferences, {
        subset: constants.unquoted[x][y],
        attribute: true
      })
    );
  }
  if (result !== value) {
    if (state.settings.quoteSmart && ccount(value, quote) > ccount(value, state.alternative)) {
      quote = state.alternative;
    }
    result = quote + stringifyEntities(
      value,
      Object.assign({}, state.settings.characterReferences, {
        subset: (quote === "'" ? constants.single : constants.double)[x][y],
        attribute: true
      })
    ) + quote;
  }
  return name + (result ? "=" + result : result);
}

// ../../node_modules/hast-util-to-html/lib/handle/text.js
function text2(node, _, parent, state) {
  return parent && parent.type === "element" && (parent.tagName === "script" || parent.tagName === "style") ? node.value : stringifyEntities(
    node.value,
    Object.assign({}, state.settings.characterReferences, {
      subset: ["<", "&"]
    })
  );
}

// ../../node_modules/hast-util-to-html/lib/handle/raw.js
function raw(node, index, parent, state) {
  return state.settings.allowDangerousHtml ? node.value : text2(node, index, parent, state);
}

// ../../node_modules/hast-util-to-html/lib/handle/root.js
function root2(node, _1, _2, state) {
  return state.all(node);
}

// ../../node_modules/hast-util-to-html/lib/handle/index.js
var handle = zwitch("type", {
  invalid,
  unknown,
  handlers: { comment, doctype, element, raw, root: root2, text: text2 }
});
function invalid(node) {
  throw new Error("Expected node, not `" + node + "`");
}
function unknown(node) {
  throw new Error("Cannot compile unknown node `" + node.type + "`");
}

// ../../node_modules/hast-util-to-html/lib/index.js
function toHtml(tree, options) {
  const options_ = options || {};
  const quote = options_.quote || '"';
  const alternative = quote === '"' ? "'" : '"';
  if (quote !== '"' && quote !== "'") {
    throw new Error("Invalid quote `" + quote + "`, expected `'` or `\"`");
  }
  const state = {
    one: one2,
    all: all2,
    settings: {
      omitOptionalTags: options_.omitOptionalTags || false,
      allowParseErrors: options_.allowParseErrors || false,
      allowDangerousCharacters: options_.allowDangerousCharacters || false,
      quoteSmart: options_.quoteSmart || false,
      preferUnquoted: options_.preferUnquoted || false,
      tightAttributes: options_.tightAttributes || false,
      upperDoctype: options_.upperDoctype || false,
      tightDoctype: options_.tightDoctype || false,
      bogusComments: options_.bogusComments || false,
      tightCommaSeparatedLists: options_.tightCommaSeparatedLists || false,
      tightSelfClosing: options_.tightSelfClosing || false,
      collapseEmptyAttributes: options_.collapseEmptyAttributes || false,
      allowDangerousHtml: options_.allowDangerousHtml || false,
      voids: options_.voids || htmlVoidElements,
      characterReferences: options_.characterReferences || options_.entities || {},
      closeSelfClosing: options_.closeSelfClosing || false,
      closeEmptyElements: options_.closeEmptyElements || false
    },
    schema: options_.space === "svg" ? svg2 : html3,
    quote,
    alternative
  };
  return state.one(
    Array.isArray(tree) ? { type: "root", children: tree } : tree,
    void 0,
    void 0
  );
}
function one2(node, index, parent) {
  return handle(node, index, parent, this);
}
function all2(parent) {
  const results = [];
  const children = parent && parent.children || [];
  let index = -1;
  while (++index < children.length) {
    results[index] = this.one(children[index], index, parent);
  }
  return results.join("");
}

// ../../node_modules/rehype-stringify/lib/index.js
function rehypeStringify(config) {
  const processorSettings = this.data("settings");
  const settings = Object.assign({}, processorSettings, config);
  Object.assign(this, { Compiler: compiler });
  function compiler(tree) {
    return toHtml(tree, settings);
  }
}

// ../../node_modules/myst-to-html/dist/esm/renderMdast.js
function mystToHtml(tree, opts) {
  const state = new State();
  const pipe = unified().use(transform, state).use(mystToHast, opts === null || opts === void 0 ? void 0 : opts.hast).use(formatHtml, opts === null || opts === void 0 ? void 0 : opts.formatHtml).use(rehypeStringify, opts === null || opts === void 0 ? void 0 : opts.stringifyHtml);
  const result = pipe.runSync(tree);
  const html6 = pipe.stringify(result);
  return html6.trim();
}
export {
  State,
  addMathRenderers,
  formatHtml,
  mystToHast,
  mystToHtml,
  renderMath,
  transform
};
//# sourceMappingURL=/myst-test/build/_shared/esm-F7RTLBXI.js.map
