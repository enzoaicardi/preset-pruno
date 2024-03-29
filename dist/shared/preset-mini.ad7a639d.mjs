import { d as displays, o as opacity, b as bgColors, a as borders, c as contentVisibility, e as contents, f as fonts, t as tabSizes, g as textIndents, h as textOverflows, i as textDecorations, j as textStrokes, k as textShadows, l as textTransforms, m as textAligns, n as textColors, p as fontStyles, q as fontSmoothings, r as boxShadows, s as rings, u as positions, v as cursors, w as appearances, x as pointerEvents, y as resizes, z as verticalAligns, A as userSelects, B as whitespaces, C as breaks, D as overflows, E as outline, F as appearance, G as orders, H as justifies, I as alignments, J as placements, K as flexGridJustifiesAlignments, L as insets, M as floats, N as zIndexes, O as boxSizing, P as transitions, Q as transforms, R as willChange, S as contains } from './preset-mini.46b4a7e7.mjs';
import { h as handler, r as resolveVerticalBreakpoints, l as resolveBreakpoints, o as directionSize, c as colorResolver } from './preset-mini.acf4efb2.mjs';
import { warnOnce } from '@unocss/core';

const containerParent = [
  [/^@container(?:\/(\w+))?(?:-(normal))?$/, ([, l, v]) => {
    warnOnce("The container query rule is experimental and may not follow semver.");
    return {
      "container-type": v ?? "inline-size",
      "container-name": l
    };
  }]
];

const flex = [
  ["flex", { display: "flex" }],
  ["inline-flex", { display: "inline-flex" }],
  ["flex-inline", { display: "inline-flex" }],
  [/^flex-(.*)$/, ([, d]) => ({ flex: handler.bracket(d) != null ? handler.bracket(d).split(" ").map((e) => handler.cssvar.fraction(e) ?? e).join(" ") : handler.cssvar.fraction(d) })],
  ["flex-1", { flex: "1 1 0%" }],
  ["flex-auto", { flex: "1 1 auto" }],
  ["flex-initial", { flex: "0 1 auto" }],
  ["flex-none", { flex: "none" }],
  [/^(?:flex-)?shrink(?:-(.*))?$/, ([, d = ""]) => ({ "flex-shrink": handler.bracket.cssvar.number(d) ?? 1 }), { autocomplete: ["flex-shrink-<num>", "shrink-<num>"] }],
  [/^(?:flex-)?grow(?:-(.*))?$/, ([, d = ""]) => ({ "flex-grow": handler.bracket.cssvar.number(d) ?? 1 }), { autocomplete: ["flex-grow-<num>", "grow-<num>"] }],
  [/^(?:flex-)?basis-(.+)$/, ([, d], { theme }) => ({ "flex-basis": theme.spacing?.[d] ?? handler.bracket.cssvar.auto.fraction.rem(d) }), { autocomplete: ["flex-basis-$spacing", "basis-$spacing"] }],
  ["flex-row", { "flex-direction": "row" }],
  ["flex-row-reverse", { "flex-direction": "row-reverse" }],
  ["flex-col", { "flex-direction": "column" }],
  ["flex-col-reverse", { "flex-direction": "column-reverse" }],
  ["flex-wrap", { "flex-wrap": "wrap" }],
  ["flex-wrap-reverse", { "flex-wrap": "wrap-reverse" }],
  ["flex-nowrap", { "flex-wrap": "nowrap" }]
];

const directions = {
  "": "",
  "x": "column-",
  "y": "row-"
};
function handleGap([, d = "", s], { theme }) {
  const v = theme.spacing?.[s] ?? handler.bracket.cssvar.global.rem(s);
  if (v != null) {
    return {
      [`grid-${directions[d]}gap`]: v,
      [`${directions[d]}gap`]: v
    };
  }
}
const gaps = [
  [/^(?:flex-|grid-)?gap-?()(.+)$/, handleGap, { autocomplete: ["gap-$spacing", "gap-<num>"] }],
  [/^(?:flex-|grid-)?gap-([xy])-?(.+)$/, handleGap, { autocomplete: ["gap-(x|y)-$spacing", "gap-(x|y)-<num>"] }]
];

function rowCol(s) {
  return s.replace("col", "column");
}
function rowColTheme(s) {
  return s[0] === "r" ? "Row" : "Column";
}
function autoDirection(c, theme, prop) {
  const v = theme[`gridAuto${rowColTheme(c)}`]?.[prop];
  if (v != null)
    return v;
  switch (prop) {
    case "min":
      return "min-content";
    case "max":
      return "max-content";
    case "fr":
      return "minmax(0,1fr)";
  }
  return handler.bracket.cssvar.auto.rem(prop);
}
const grids = [
  ["grid", { display: "grid" }],
  ["inline-grid", { display: "inline-grid" }],
  [/^(?:grid-)?(row|col)-(.+)$/, ([, c, v], { theme }) => ({
    [`grid-${rowCol(c)}`]: theme[`grid${rowColTheme(c)}`]?.[v] ?? handler.bracket.cssvar.auto(v)
  })],
  [/^(?:grid-)?(row|col)-span-(.+)$/, ([, c, s]) => {
    if (s === "full")
      return { [`grid-${rowCol(c)}`]: "1/-1" };
    const v = handler.bracket.number(s);
    if (v != null)
      return { [`grid-${rowCol(c)}`]: `span ${v}/span ${v}` };
  }, { autocomplete: ["grid-(row|col)-span-<num>", "(row|col)-span-<num>"] }],
  [/^(?:grid-)?(row|col)-start-(.+)$/, ([, c, v]) => ({ [`grid-${rowCol(c)}-start`]: handler.bracket.cssvar(v) ?? v })],
  [/^(?:grid-)?(row|col)-end-(.+)$/, ([, c, v]) => ({ [`grid-${rowCol(c)}-end`]: handler.bracket.cssvar(v) ?? v }), { autocomplete: ["grid-(row|col)-(start|end)-<num>"] }],
  [/^(?:grid-)?auto-(rows|cols)-(.+)$/, ([, c, v], { theme }) => ({ [`grid-auto-${rowCol(c)}`]: autoDirection(c, theme, v) }), { autocomplete: ["grid-auto-(rows|cols)-<num>"] }],
  [/^(?:grid-auto-flow|auto-flow|grid-flow)-(.+)$/, ([, v]) => ({ "grid-auto-flow": handler.bracket.cssvar(v) })],
  [/^(?:grid-auto-flow|auto-flow|grid-flow)-(row|col|dense|row-dense|col-dense)$/, ([, v]) => ({ "grid-auto-flow": rowCol(v).replace("-", " ") }), { autocomplete: ["(grid-auto-flow|auto-flow|grid-flow)-(row|col|dense|row-dense|col-dense)"] }],
  [/^grid-(rows|cols)-(.+)$/, ([, c, v], { theme }) => ({
    [`grid-template-${rowCol(c)}`]: theme[`gridTemplate${rowColTheme(c)}`]?.[v] ?? handler.bracket.cssvar(v)
  })],
  [/^grid-(rows|cols)-minmax-([\w.-]+)$/, ([, c, d]) => ({ [`grid-template-${rowCol(c)}`]: `repeat(auto-fill,minmax(${d},1fr))` })],
  [/^grid-(rows|cols)-(\d+)$/, ([, c, d]) => ({ [`grid-template-${rowCol(c)}`]: `repeat(${d},minmax(0,1fr))` }), { autocomplete: ["grid-(rows|cols)-<num>", "grid-(rows|cols)-none"] }],
  [/^grid-area(s)?-(.+)$/, ([, s, v]) => {
    if (s != null)
      return { "grid-template-areas": handler.cssvar(v) ?? v.split("-").map((s2) => `"${handler.bracket(s2)}"`).join(" ") };
    return { "grid-area": handler.bracket.cssvar(v) };
  }],
  ["grid-rows-none", { "grid-template-rows": "none" }],
  ["grid-cols-none", { "grid-template-columns": "none" }]
];

const sizeMapping = {
  h: "height",
  w: "width",
  inline: "inline-size",
  block: "block-size"
};
function getPropName(minmax, hw) {
  return `${minmax || ""}${sizeMapping[hw]}`;
}
function getSizeValue(minmax, hw, theme, prop) {
  const str = getPropName(minmax, hw).replace(/-(\w)/g, (_, p) => p.toUpperCase());
  const v = theme[str]?.[prop];
  if (v != null)
    return v;
  switch (prop) {
    case "fit":
    case "max":
    case "min":
      return `${prop}-content`;
  }
  return handler.bracket.cssvar.global.auto.fraction.rem(prop);
}
const sizes = [
  [/^(?:size-)?(min-|max-)?([wh])-?(.+)$/, ([, m, w, s], { theme }) => ({ [getPropName(m, w)]: getSizeValue(m, w, theme, s) })],
  [/^(?:size-)?(min-|max-)?(block|inline)-(.+)$/, ([, m, w, s], { theme }) => ({ [getPropName(m, w)]: getSizeValue(m, w, theme, s) }), {
    autocomplete: [
      "(w|h)-$width|height|maxWidth|maxHeight|minWidth|minHeight|inlineSize|blockSize|maxInlineSize|maxBlockSize|minInlineSize|minBlockSize",
      "(block|inline)-$width|height|maxWidth|maxHeight|minWidth|minHeight|inlineSize|blockSize|maxInlineSize|maxBlockSize|minInlineSize|minBlockSize",
      "(max|min)-(w|h|block|inline)",
      "(max|min)-(w|h|block|inline)-$width|height|maxWidth|maxHeight|minWidth|minHeight|inlineSize|blockSize|maxInlineSize|maxBlockSize|minInlineSize|minBlockSize"
    ]
  }],
  [/^(?:size-)?(min-|max-)?(h)-screen-(.+)$/, ([, m, w, s], context) => ({ [getPropName(m, w)]: resolveVerticalBreakpoints(context)?.[s] })],
  [/^(?:size-)?(min-|max-)?(w)-screen-(.+)$/, ([, m, w, s], context) => ({ [getPropName(m, w)]: resolveBreakpoints(context)?.[s] }), {
    autocomplete: [
      "(w|h)-screen",
      "(min|max)-(w|h)-screen",
      "h-screen-$verticalBreakpoints",
      "(min|max)-h-screen-$verticalBreakpoints",
      "w-screen-$breakpoints",
      "(min|max)-w-screen-$breakpoints"
    ]
  }]
];
function getAspectRatio(prop) {
  if (/^\d+\/\d+$/.test(prop))
    return prop;
  switch (prop) {
    case "square":
      return "1/1";
    case "video":
      return "16/9";
  }
  return handler.bracket.cssvar.global.auto.number(prop);
}
const aspectRatio = [
  [/^(?:size-)?aspect-(?:ratio-)?(.+)$/, ([, d]) => ({ "aspect-ratio": getAspectRatio(d) }), { autocomplete: ["aspect-(square|video|ratio)", "aspect-ratio-(square|video)"] }]
];

const paddings = [
  [/^pa?()-?(-?.+)$/, directionSize("padding"), { autocomplete: ["(m|p)<num>", "(m|p)-<num>"] }],
  [/^p-?xy()()$/, directionSize("padding"), { autocomplete: "(m|p)-(xy)" }],
  [/^p-?([xy])(?:-?(-?.+))?$/, directionSize("padding")],
  [/^p-?([rltbse])(?:-?(-?.+))?$/, directionSize("padding"), { autocomplete: "(m|p)<directions>-<num>" }],
  [/^p-(block|inline)(?:-(-?.+))?$/, directionSize("padding"), { autocomplete: "(m|p)-(block|inline)-<num>" }],
  [/^p-?([bi][se])(?:-?(-?.+))?$/, directionSize("padding"), { autocomplete: "(m|p)-(bs|be|is|ie)-<num>" }]
];
const margins = [
  [/^ma?()-?(-?.+)$/, directionSize("margin")],
  [/^m-?xy()()$/, directionSize("margin")],
  [/^m-?([xy])(?:-?(-?.+))?$/, directionSize("margin")],
  [/^m-?([rltbse])(?:-?(-?.+))?$/, directionSize("margin")],
  [/^m-(block|inline)(?:-(-?.+))?$/, directionSize("margin")],
  [/^m-?([bi][se])(?:-?(-?.+))?$/, directionSize("margin")]
];

const variablesAbbrMap = {
  backface: "backface-visibility",
  break: "word-break",
  case: "text-transform",
  content: "align-content",
  fw: "font-weight",
  items: "align-items",
  justify: "justify-content",
  select: "user-select",
  self: "align-self",
  vertical: "vertical-align",
  visible: "visibility",
  whitespace: "white-space",
  ws: "white-space"
};
const cssVariables = [
  [/^(.+?)-(\$.+)$/, ([, name, varname]) => {
    const prop = variablesAbbrMap[name];
    if (prop)
      return { [prop]: handler.cssvar(varname) };
  }]
];
const cssProperty = [
  [/^\[(--(\w|\\\W)+|[\w-]+):([^\s:]*?("\S+?"|'\S+?'|`\S+?`|[^\s:]+?)[^\s:]*?\)?)\]$/, ([match, prop, , value]) => {
    if (!isURI(match.slice(1, -1)))
      return { [prop]: handler.bracket(`[${value}]`) };
  }]
];
function isURI(declaration) {
  if (!declaration.includes("://"))
    return false;
  try {
    return new URL(declaration).host !== "";
  } catch (err) {
    return false;
  }
}

const questionMark = [
  [
    /^(where|\?)$/,
    (_, { constructCSS, generator }) => {
      if (generator.userConfig.envMode === "dev")
        return `@keyframes __un_qm{0%{box-shadow:inset 4px 4px #ff1e90, inset -4px -4px #ff1e90}100%{box-shadow:inset 8px 8px #3399ff, inset -8px -8px #3399ff}}
${constructCSS({ animation: "__un_qm 0.5s ease-in-out alternate infinite" })}`;
    }
  ]
];

const svgUtilities = [
  [/^fill-(.+)$/, colorResolver("fill", "fill"), { autocomplete: "fill-$colors" }],
  [/^fill-op(?:acity)?-?(.+)$/, ([, opacity]) => ({ "--un-fill-opacity": handler.bracket.percent.cssvar(opacity) }), { autocomplete: "fill-(op|opacity)-<percent>" }],
  ["fill-none", { fill: "none" }],
  [/^stroke-(?:width-|size-)?(.+)$/, ([, s], { theme }) => ({ "stroke-width": theme.lineWidth?.[s] ?? handler.bracket.cssvar.fraction.px.number(s) }), { autocomplete: ["stroke-width-$lineWidth", "stroke-size-$lineWidth"] }],
  [/^stroke-dash-(.+)$/, ([, s]) => ({ "stroke-dasharray": handler.bracket.cssvar.number(s) }), { autocomplete: "stroke-dash-<num>" }],
  [/^stroke-offset-(.+)$/, ([, s], { theme }) => ({ "stroke-dashoffset": theme.lineWidth?.[s] ?? handler.bracket.cssvar.px.numberWithUnit(s) }), { autocomplete: "stroke-offset-$lineWidth" }],
  [/^stroke-(.+)$/, colorResolver("stroke", "stroke"), { autocomplete: "stroke-$colors" }],
  [/^stroke-op(?:acity)?-?(.+)$/, ([, opacity]) => ({ "--un-stroke-opacity": handler.bracket.percent.cssvar(opacity) }), { autocomplete: "stroke-(op|opacity)-<percent>" }],
  ["stroke-cap-square", { "stroke-linecap": "square" }],
  ["stroke-cap-round", { "stroke-linecap": "round" }],
  ["stroke-cap-auto", { "stroke-linecap": "butt" }],
  ["stroke-join-arcs", { "stroke-linejoin": "arcs" }],
  ["stroke-join-bevel", { "stroke-linejoin": "bevel" }],
  ["stroke-join-clip", { "stroke-linejoin": "miter-clip" }],
  ["stroke-join-round", { "stroke-linejoin": "round" }],
  ["stroke-join-auto", { "stroke-linejoin": "miter" }],
  ["stroke-none", { stroke: "none" }]
];

const rules = [
  cssVariables,
  cssProperty,
  paddings,
  margins,
  displays,
  opacity,
  bgColors,
  svgUtilities,
  borders,
  contentVisibility,
  contents,
  fonts,
  tabSizes,
  textIndents,
  textOverflows,
  textDecorations,
  textStrokes,
  textShadows,
  textTransforms,
  textAligns,
  textColors,
  fontStyles,
  fontSmoothings,
  boxShadows,
  rings,
  flex,
  grids,
  gaps,
  positions,
  sizes,
  aspectRatio,
  cursors,
  appearances,
  pointerEvents,
  resizes,
  verticalAligns,
  userSelects,
  whitespaces,
  breaks,
  overflows,
  outline,
  appearance,
  orders,
  justifies,
  alignments,
  placements,
  flexGridJustifiesAlignments,
  insets,
  floats,
  zIndexes,
  boxSizing,
  transitions,
  transforms,
  willChange,
  containerParent,
  contains,
  questionMark
].flat(1);

export { grids as a, aspectRatio as b, containerParent as c, svgUtilities as d, cssVariables as e, flex as f, gaps as g, cssProperty as h, margins as m, paddings as p, questionMark as q, rules as r, sizes as s };
