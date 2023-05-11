import {
  ArticlePage,
  ArticlePageCatchBoundary,
  DEFAULT_NAV_HEIGHT,
  DocumentOutline,
  Navigation,
  TopNav,
  getMetaTagsForArticle,
  require_cjs,
  require_jsx_runtime,
  require_loaders,
  useOutlineHeight,
  useTocHeight
} from "/myst-test/build/_shared/chunk-GP5YZVNX.js";
import {
  require_jsx_dev_runtime,
  useLoaderData
} from "/myst-test/build/_shared/chunk-DAP57JCM.js";
import {
  __toESM
} from "/myst-test/build/_shared/chunk-7D2LYYYY.js";

// ../../packages/site/src/loaders/links.ts
var KatexCSS = {
  rel: "stylesheet",
  href: "https://cdn.jsdelivr.net/npm/katex@0.15.2/dist/katex.min.css",
  integrity: "sha384-MlJdn/WNKDGXveldHDdyRP1R4CTHr3FeuDNfhsLPYrq2t0UBkUdK2jyTnXPEK1NQ",
  crossOrigin: "anonymous"
};

// app/routes/($project)_.$slug.tsx
var import_loaders = __toESM(require_loaders());
var import_providers = __toESM(require_cjs());

// ../../packages/icons/dist/esm/myst.js
var import_jsx_runtime = __toESM(require_jsx_runtime());
function MystLogo({ size = 24, fill = "#616161", highlight = "#F37726", className }) {
  return (0, import_jsx_runtime.jsx)("svg", Object.assign({ style: { width: size, height: size }, xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 100 100", stroke: "none", className }, { children: (0, import_jsx_runtime.jsxs)("g", Object.assign({ id: "icon" }, { children: [(0, import_jsx_runtime.jsx)("path", { fill, d: "M23.8,54.8v-3.6l4.7-0.8V17.5l-4.7-0.8V13H36l13.4,31.7h0.2l13-31.7h12.6v3.6l-4.7,0.8v32.9l4.7,0.8v3.6h-15\n          v-3.6l4.9-0.8V20.8H65L51.4,53.3h-3.8l-14-32.5h-0.1l0.2,17.4v12.1l5,0.8v3.6H23.8z" }), (0, import_jsx_runtime.jsx)("path", { fill: highlight, d: "M47,86.9c0-5.9-3.4-8.8-10.1-8.8h-8.4c-5.2,0-9.4-1.3-12.5-3.8c-3.1-2.5-5.4-6.2-6.8-11l4.8-1.6\n          c1.8,5.6,6.4,8.6,13.8,8.8h9.2c6.4,0,10.8,2.5,13.1,7.5c2.3-5,6.7-7.5,13.1-7.5h8.4c7.8,0,12.7-2.9,14.6-8.7l4.8,1.6\n          c-1.4,4.9-3.6,8.6-6.8,11.1c-3.1,2.5-7.3,3.7-12.4,3.8H63c-6.7,0-10,2.9-10,8.8" })] })) }));
}
function MadeWithMyst({ url = "https://myst-tools.org/made-with-myst" }) {
  return (0, import_jsx_runtime.jsxs)("a", Object.assign({ className: "flex w-fit mx-auto text-gray-700 hover:text-blue-700 dark:text-gray-200 dark:hover:text-blue-400", href: url, target: "_blank", rel: "noreferrer" }, { children: [(0, import_jsx_runtime.jsx)(MystLogo, { fill: "currentColor" }), (0, import_jsx_runtime.jsx)("span", Object.assign({ className: "self-center text-sm ml-2" }, { children: "Made with MyST" }))] }));
}

// app/routes/($project)_.$slug.tsx
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
var meta = (args) => {
  var _a, _b, _c;
  const config = (_b = (_a = args.parentsData) == null ? void 0 : _a.root) == null ? void 0 : _b.config;
  const data = args.data;
  if (!config || !data || !data.frontmatter)
    return {};
  return getMetaTagsForArticle({
    origin: "",
    url: args.location.pathname,
    title: `${data.frontmatter.title} - ${config == null ? void 0 : config.title}`,
    description: data.frontmatter.description,
    image: (_c = data.frontmatter.thumbnailOptimized || data.frontmatter.thumbnail) != null ? _c : void 0
  });
};
var links = () => [KatexCSS];
function ArticlePageAndNavigation({
  children,
  hide_toc,
  projectSlug,
  top = DEFAULT_NAV_HEIGHT
}) {
  const { container, toc } = useTocHeight(top);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_providers.UiStateProvider, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
      Navigation,
      {
        tocRef: toc,
        top,
        hide_toc,
        footer: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MadeWithMyst, {}, void 0, false, {
          fileName: "app/routes/($project)_.$slug.tsx",
          lineNumber: 66,
          columnNumber: 17
        }, this),
        projectSlug,
        children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TopNav, {}, void 0, false, {
          fileName: "app/routes/($project)_.$slug.tsx",
          lineNumber: 69,
          columnNumber: 9
        }, this)
      },
      void 0,
      false,
      {
        fileName: "app/routes/($project)_.$slug.tsx",
        lineNumber: 62,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_providers.TabStateProvider, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
      "article",
      {
        ref: container,
        className: "article content article-grid article-grid-gap",
        style: { marginTop: top + 16 },
        children
      },
      void 0,
      false,
      {
        fileName: "app/routes/($project)_.$slug.tsx",
        lineNumber: 72,
        columnNumber: 9
      },
      this
    ) }, void 0, false, {
      fileName: "app/routes/($project)_.$slug.tsx",
      lineNumber: 71,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/($project)_.$slug.tsx",
    lineNumber: 61,
    columnNumber: 5
  }, this);
}
function Page({ top = DEFAULT_NAV_HEIGHT }) {
  var _a, _b;
  const { container, outline } = useOutlineHeight();
  const article = useLoaderData();
  const { hide_outline, hide_toc } = (_b = (_a = article.frontmatter) == null ? void 0 : _a.design) != null ? _b : {};
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArticlePageAndNavigation, { hide_toc, projectSlug: article.project, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", { ref: container, className: "article-grid article-subgrid-gap col-screen", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArticlePage, { article }, void 0, false, {
      fileName: "app/routes/($project)_.$slug.tsx",
      lineNumber: 91,
      columnNumber: 9
    }, this),
    !hide_outline && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DocumentOutline, { outlineRef: outline, top }, void 0, false, {
      fileName: "app/routes/($project)_.$slug.tsx",
      lineNumber: 92,
      columnNumber: 27
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/($project)_.$slug.tsx",
    lineNumber: 90,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "app/routes/($project)_.$slug.tsx",
    lineNumber: 89,
    columnNumber: 5
  }, this);
}
function CatchBoundary() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArticlePageAndNavigation, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", { className: "article-content", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArticlePageCatchBoundary, {}, void 0, false, {
    fileName: "app/routes/($project)_.$slug.tsx",
    lineNumber: 102,
    columnNumber: 9
  }, this) }, void 0, false, {
    fileName: "app/routes/($project)_.$slug.tsx",
    lineNumber: 101,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "app/routes/($project)_.$slug.tsx",
    lineNumber: 100,
    columnNumber: 5
  }, this);
}

export {
  KatexCSS,
  meta,
  links,
  Page,
  CatchBoundary
};
//# sourceMappingURL=/myst-test/build/_shared/chunk-UBOIEJ4S.js.map
