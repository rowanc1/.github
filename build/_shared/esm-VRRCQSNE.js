import {
  ParseTypesEnum
} from "/myst-test/build/_shared/chunk-7VCUQVFZ.js";
import "/myst-test/build/_shared/chunk-7D2LYYYY.js";

// ../../node_modules/myst-ext-tabs/dist/esm/index.js
var tabSetDirective = {
  name: "tab-set",
  alias: "tabSet",
  options: {
    class: {
      type: ParseTypesEnum.string
    }
  },
  body: {
    type: ParseTypesEnum.parsed
  },
  run(data) {
    var _a;
    return [
      {
        type: "tabSet",
        class: (_a = data.options) === null || _a === void 0 ? void 0 : _a.class,
        children: data.body || []
      }
    ];
  }
};
var tabItemDirective = {
  name: "tab-item",
  alias: "tabItem",
  arg: {
    type: ParseTypesEnum.string
  },
  options: {
    sync: {
      type: ParseTypesEnum.string
    },
    selected: {
      type: ParseTypesEnum.boolean
    }
  },
  body: {
    type: ParseTypesEnum.parsed
  },
  run(data) {
    var _a, _b, _c;
    return [
      {
        type: "tabItem",
        title: (_a = data.arg) !== null && _a !== void 0 ? _a : "Tab Title",
        sync: (_b = data.options) === null || _b === void 0 ? void 0 : _b.sync,
        selected: (_c = data.options) === null || _c === void 0 ? void 0 : _c.selected,
        children: data.body || []
      }
    ];
  }
};
var tabDirectives = [tabSetDirective, tabItemDirective];
export {
  tabDirectives,
  tabItemDirective,
  tabSetDirective
};
//# sourceMappingURL=/myst-test/build/_shared/esm-VRRCQSNE.js.map
