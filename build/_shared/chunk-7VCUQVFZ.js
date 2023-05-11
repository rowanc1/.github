// ../../node_modules/unist-util-map/lib/index.js
function map(tree, mapFunction) {
  return preorder(tree, null, null);
  function preorder(node, index, parent) {
    const newNode = Object.assign({}, mapFunction(node, index, parent));
    if ("children" in node) {
      newNode.children = node.children.map(function(child, index2) {
        return preorder(child, index2, node);
      });
    }
    return newNode;
  }
}

// ../../node_modules/nanoid/index.browser.js
var random = (bytes) => crypto.getRandomValues(new Uint8Array(bytes));
var customRandom = (alphabet, defaultSize, getRandom) => {
  let mask = (2 << Math.log(alphabet.length - 1) / Math.LN2) - 1;
  let step = -~(1.6 * mask * defaultSize / alphabet.length);
  return (size = defaultSize) => {
    let id = "";
    while (true) {
      let bytes = getRandom(step);
      let j = step;
      while (j--) {
        id += alphabet[bytes[j] & mask] || "";
        if (id.length === size)
          return id;
      }
    }
  };
};
var customAlphabet = (alphabet, size = 21) => customRandom(alphabet, size, random);

// ../../node_modules/myst-common/dist/esm/utils.js
var __assign = function() {
  __assign = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
function addMessageInfo(message, info) {
  if (info === null || info === void 0 ? void 0 : info.note)
    message.note = info === null || info === void 0 ? void 0 : info.note;
  if (info === null || info === void 0 ? void 0 : info.url)
    message.url = info === null || info === void 0 ? void 0 : info.url;
  if (info === null || info === void 0 ? void 0 : info.fatal)
    message.fatal = true;
  return message;
}
function fileError(file, message, opts) {
  return addMessageInfo(file.message(message, opts === null || opts === void 0 ? void 0 : opts.node, opts === null || opts === void 0 ? void 0 : opts.source), __assign(__assign({}, opts), { fatal: true }));
}
function fileWarn(file, message, opts) {
  return addMessageInfo(file.message(message, opts === null || opts === void 0 ? void 0 : opts.node, opts === null || opts === void 0 ? void 0 : opts.source), opts);
}
var az = "abcdefghijklmnopqrstuvwxyz";
var alpha = az + az.toUpperCase();
var numbers = "0123456789";
var nanoidAZ = customAlphabet(alpha, 1);
var nanoidAZ9 = customAlphabet(alpha + numbers, 9);
function createId() {
  return nanoidAZ() + nanoidAZ9();
}
function normalizeLabel(label) {
  if (!label)
    return void 0;
  var identifier = label.replace(/[\t\n\r ]+/g, " ").trim().toLowerCase();
  var html_id = createHtmlId(identifier);
  return { identifier, label, html_id };
}
function createHtmlId(identifier) {
  if (!identifier)
    return void 0;
  return identifier.toLowerCase().replace(/[^a-z0-9-]/g, "-").replace(/^([0-9-])/, "id-$1").replace(/-[-]+/g, "-").replace(/(?:^[-]+)|(?:[-]+$)/g, "");
}
function liftChildren(tree, nodeType) {
  map(tree, function(node) {
    var _a, _b;
    var children = (_b = (_a = node.children) === null || _a === void 0 ? void 0 : _a.map(function(child) {
      if (child.type === nodeType && child.children)
        return child.children;
      return child;
    })) === null || _b === void 0 ? void 0 : _b.flat();
    if (node && node.children == null)
      delete node.children;
    if (children !== void 0)
      node.children = children;
    return node;
  });
}
function setTextAsChild(node, text) {
  node.children = [{ type: "text", value: text }];
}
function toText(content) {
  if (!content)
    return "";
  if (!Array.isArray(content))
    return toText([content]);
  return content.map(function(n) {
    if (!n || typeof n === "string")
      return n || "";
    if ("value" in n)
      return n.value;
    if ("children" in n && n.children)
      return toText(n.children);
    return "";
  }).join("");
}
function copyNode(node) {
  return JSON.parse(JSON.stringify(node));
}

// ../../node_modules/myst-common/dist/esm/types.js
var SourceFileKind;
(function(SourceFileKind2) {
  SourceFileKind2["Article"] = "Article";
  SourceFileKind2["Notebook"] = "Notebook";
})(SourceFileKind || (SourceFileKind = {}));
var ParseTypesEnum;
(function(ParseTypesEnum2) {
  ParseTypesEnum2["string"] = "string";
  ParseTypesEnum2["number"] = "number";
  ParseTypesEnum2["boolean"] = "boolean";
  ParseTypesEnum2["parsed"] = "parsed";
})(ParseTypesEnum || (ParseTypesEnum = {}));

export {
  map,
  fileError,
  fileWarn,
  createId,
  normalizeLabel,
  createHtmlId,
  liftChildren,
  setTextAsChild,
  toText,
  copyNode,
  SourceFileKind,
  ParseTypesEnum
};
//# sourceMappingURL=/myst-test/build/_shared/chunk-7VCUQVFZ.js.map
