import {
  ParseTypesEnum
} from "/myst-test/build/_shared/chunk-7VCUQVFZ.js";
import "/myst-test/build/_shared/chunk-7D2LYYYY.js";

// ../../node_modules/myst-ext-grid/dist/esm/index.js
var gridDirective = {
  name: "grid",
  arg: {
    type: ParseTypesEnum.string
  },
  body: {
    type: ParseTypesEnum.parsed,
    required: true
  },
  run(data) {
    return [
      {
        type: "grid",
        columns: getColumns(data.arg),
        children: data.body
      }
    ];
  }
};
function getColumns(columnString) {
  const columns = (columnString !== null && columnString !== void 0 ? columnString : "1 2 2 3").split(/\s/).map((s) => Number(s.trim())).filter((n) => !Number.isNaN(n)).map((n) => Math.min(Math.max(Math.floor(n), 1), 12));
  if (columns.length === 0 || columns.length > 4)
    return [1, 2, 2, 3];
  return columns;
}
export {
  gridDirective
};
//# sourceMappingURL=/myst-test/build/_shared/esm-OZWFKUHL.js.map
