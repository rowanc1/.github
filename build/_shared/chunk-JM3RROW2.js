import {
  __esm
} from "/myst-test/build/_shared/chunk-7D2LYYYY.js";

// ../../node_modules/unist-util-is/lib/index.js
function anyFactory(tests) {
  const checks = [];
  let index = -1;
  while (++index < tests.length) {
    checks[index] = convert(tests[index]);
  }
  return castFactory(any);
  function any(...parameters) {
    let index2 = -1;
    while (++index2 < checks.length) {
      if (checks[index2].call(this, ...parameters))
        return true;
    }
    return false;
  }
}
function propsFactory(check) {
  return castFactory(all);
  function all(node) {
    let key;
    for (key in check) {
      if (node[key] !== check[key])
        return false;
    }
    return true;
  }
}
function typeFactory(check) {
  return castFactory(type);
  function type(node) {
    return node && node.type === check;
  }
}
function castFactory(check) {
  return assertion;
  function assertion(node, ...parameters) {
    return Boolean(
      node && typeof node === "object" && "type" in node && Boolean(check.call(this, node, ...parameters))
    );
  }
}
function ok() {
  return true;
}
var convert;
var init_lib = __esm({
  "../../node_modules/unist-util-is/lib/index.js"() {
    convert = function(test) {
      if (test === void 0 || test === null) {
        return ok;
      }
      if (typeof test === "string") {
        return typeFactory(test);
      }
      if (typeof test === "object") {
        return Array.isArray(test) ? anyFactory(test) : propsFactory(test);
      }
      if (typeof test === "function") {
        return castFactory(test);
      }
      throw new Error("Expected function, string, or object as test");
    };
  }
});

// ../../node_modules/unist-util-is/index.js
var init_unist_util_is = __esm({
  "../../node_modules/unist-util-is/index.js"() {
    init_lib();
  }
});

export {
  convert,
  init_unist_util_is
};
//# sourceMappingURL=/myst-test/build/_shared/chunk-JM3RROW2.js.map
