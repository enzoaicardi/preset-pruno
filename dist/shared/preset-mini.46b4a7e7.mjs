import { g as globalKeywords, h as handler, c as colorResolver, d as directionMap, a as hasParseableColor, b as cornerMap, p as parseColor, e as colorToString, f as colorOpacityToString, n as numberWithUnitRE, m as makeGlobalStaticRules, s as splitShorthand, i as colorableShadows, j as insetMap, k as positionMap, x as xyzMap } from './preset-mini.acf4efb2.mjs';
import { toArray } from '@unocss/core';

const verticalAlignAlias = {
  "mid": "middle",
  "base": "baseline",
  "btm": "bottom",
  "baseline": "baseline",
  "top": "top",
  "start": "top",
  "middle": "middle",
  "bottom": "bottom",
  "end": "bottom",
  "text-top": "text-top",
  "text-bottom": "text-bottom",
  "sub": "sub",
  "super": "super",
  ...Object.fromEntries(globalKeywords.map((x) => [x, x]))
};
const verticalAligns = [
  [/^(?:vertical|align|v)-([-\w]+)$/, ([, v]) => ({ "vertical-align": verticalAlignAlias[v] }), { autocomplete: `(vertical|align|v)-(${Object.keys(verticalAlignAlias).join("|")})` }]
];
const textAligns = ["center", "left", "right", "justify", "start", "end"].map((v) => [`text-${v}`, { "text-align": v }]);

const outline = [
  [/^outline-(?:width-|size-)?(.+)$/, ([, d], { theme }) => ({ "outline-width": theme.lineWidth?.[d] ?? handler.bracket.cssvar.global.px(d) }), { autocomplete: "outline-(width|size)-<num>" }],
  [/^outline-(?:color-)?(.+)$/, colorResolver("outline-color", "outline-color"), { autocomplete: "outline-$colors" }],
  [/^outline-offset-(.+)$/, ([, d], { theme }) => ({ "outline-offset": theme.lineWidth?.[d] ?? handler.bracket.cssvar.global.px(d) }), { autocomplete: "outline-(offset)-<num>" }],
  ["outline", { "outline-style": "solid" }],
  ...["auto", "dashed", "dotted", "double", "hidden", "solid", "groove", "ridge", "inset", "outset", ...globalKeywords].map((v) => [`outline-${v}`, { "outline-style": v }]),
  ["outline-none", { "outline": "2px solid transparent", "outline-offset": "2px" }]
];
const appearance = [
  ["appearance-none", {
    "-webkit-appearance": "none",
    "appearance": "none"
  }]
];
function willChangeProperty(prop) {
  return handler.properties.auto.global(prop) ?? {
    contents: "contents",
    scroll: "scroll-position"
  }[prop];
}
const willChange = [
  [/^will-change-(.+)/, ([, p]) => ({ "will-change": willChangeProperty(p) })]
];

const borderStyles = ["solid", "dashed", "dotted", "double", "hidden", "none", "groove", "ridge", "inset", "outset", ...globalKeywords];
const borders = [
  [/^(?:border|b)()(?:-(.+))?$/, handlerBorder, { autocomplete: "(border|b)-<directions>" }],
  [/^(?:border|b)-([xy])(?:-(.+))?$/, handlerBorder],
  [/^(?:border|b)-([rltbse])(?:-(.+))?$/, handlerBorder],
  [/^(?:border|b)-(block|inline)(?:-(.+))?$/, handlerBorder],
  [/^(?:border|b)-([bi][se])(?:-(.+))?$/, handlerBorder],
  [/^(?:border|b)-()(?:width|size)-(.+)$/, handlerBorderSize, { autocomplete: ["(border|b)-<num>", "(border|b)-<directions>-<num>"] }],
  [/^(?:border|b)-([xy])-(?:width|size)-(.+)$/, handlerBorderSize],
  [/^(?:border|b)-([rltbse])-(?:width|size)-(.+)$/, handlerBorderSize],
  [/^(?:border|b)-(block|inline)-(?:width|size)-(.+)$/, handlerBorderSize],
  [/^(?:border|b)-([bi][se])-(?:width|size)-(.+)$/, handlerBorderSize],
  [/^(?:border|b)-()(?:color-)?(.+)$/, handlerBorderColor, { autocomplete: ["(border|b)-$colors", "(border|b)-<directions>-$colors"] }],
  [/^(?:border|b)-([xy])-(?:color-)?(.+)$/, handlerBorderColor],
  [/^(?:border|b)-([rltbse])-(?:color-)?(.+)$/, handlerBorderColor],
  [/^(?:border|b)-(block|inline)-(?:color-)?(.+)$/, handlerBorderColor],
  [/^(?:border|b)-([bi][se])-(?:color-)?(.+)$/, handlerBorderColor],
  [/^(?:border|b)-()op(?:acity)?-?(.+)$/, handlerBorderOpacity, { autocomplete: "(border|b)-(op|opacity)-<percent>" }],
  [/^(?:border|b)-([xy])-op(?:acity)?-?(.+)$/, handlerBorderOpacity],
  [/^(?:border|b)-([rltbse])-op(?:acity)?-?(.+)$/, handlerBorderOpacity],
  [/^(?:border|b)-(block|inline)-op(?:acity)?-?(.+)$/, handlerBorderOpacity],
  [/^(?:border|b)-([bi][se])-op(?:acity)?-?(.+)$/, handlerBorderOpacity],
  [/^(?:border-|b-)?(?:rounded|rd)()(?:-(.+))?$/, handlerRounded, { autocomplete: ["(border|b)-(rounded|rd)", "(border|b)-(rounded|rd)-<num>", "(rounded|rd)", "(rounded|rd)-<num>"] }],
  [/^(?:border-|b-)?(?:rounded|rd)-([rltbse])(?:-(.+))?$/, handlerRounded],
  [/^(?:border-|b-)?(?:rounded|rd)-([rltb]{2})(?:-(.+))?$/, handlerRounded],
  [/^(?:border-|b-)?(?:rounded|rd)-([bise][se])(?:-(.+))?$/, handlerRounded],
  [/^(?:border-|b-)?(?:rounded|rd)-([bi][se]-[bi][se])(?:-(.+))?$/, handlerRounded],
  [/^(?:border|b)-(?:style-)?()(.+)$/, handlerBorderStyle, { autocomplete: ["(border|b)-style", `(border|b)-(${borderStyles.join("|")})`, "(border|b)-<directions>-style", `(border|b)-<directions>-(${borderStyles.join("|")})`, `(border|b)-<directions>-style-(${borderStyles.join("|")})`, `(border|b)-style-(${borderStyles.join("|")})`] }],
  [/^(?:border|b)-([xy])-(?:style-)?(.+)$/, handlerBorderStyle],
  [/^(?:border|b)-([rltbse])-(?:style-)?(.+)$/, handlerBorderStyle],
  [/^(?:border|b)-(block|inline)-(?:style-)?(.+)$/, handlerBorderStyle],
  [/^(?:border|b)-([bi][se])-(?:style-)?(.+)$/, handlerBorderStyle]
];
function borderColorResolver(direction) {
  return ([, body], theme) => {
    const data = parseColor(body, theme);
    if (!data)
      return;
    const { alpha, color, cssColor } = data;
    if (cssColor) {
      if (alpha != null) {
        return {
          [`border${direction}-color`]: colorToString(cssColor, alpha)
        };
      }
      if (direction === "") {
        return {
          "--un-border-opacity": colorOpacityToString(cssColor),
          "border-color": colorToString(cssColor, "var(--un-border-opacity)")
        };
      } else {
        return {
          "--un-border-opacity": colorOpacityToString(cssColor),
          [`--un-border${direction}-opacity`]: "var(--un-border-opacity)",
          [`border${direction}-color`]: colorToString(cssColor, `var(--un-border${direction}-opacity)`)
        };
      }
    } else if (color) {
      return {
        [`border${direction}-color`]: colorToString(color, alpha)
      };
    }
  };
}
function handlerBorder(m, ctx) {
  return handlerBorderSize(m, ctx);
}
function handlerBorderSize([, a = "", b], { theme }) {
  const v = theme.lineWidth?.[b || "DEFAULT"] ?? handler.bracket.cssvar.global.px(b || "1");
  if (a in directionMap && v != null)
    return directionMap[a].map((i) => [`border${i}-width`, v]);
}
function handlerBorderColor([, a = "", c], { theme }) {
  if (a in directionMap && hasParseableColor(c, theme)) {
    return Object.assign(
      {},
      ...directionMap[a].map((i) => borderColorResolver(i)(["", c], theme))
    );
  }
}
function handlerBorderOpacity([, a = "", opacity]) {
  const v = handler.bracket.percent.cssvar(opacity);
  if (a in directionMap && v != null)
    return directionMap[a].map((i) => [`--un-border${i}-opacity`, v]);
}
function handlerRounded([, a = "", s], { theme }) {
  const v = theme.borderRadius?.[s || "DEFAULT"] || handler.bracket.cssvar.global.fraction.rem(s || "1");
  if (a in cornerMap && v != null)
    return cornerMap[a].map((i) => [`border${i}-radius`, v]);
}
function handlerBorderStyle([, a = "", s]) {
  if (borderStyles.includes(s) && a in directionMap)
    return directionMap[a].map((i) => [`border${i}-style`, s]);
}

const opacity = [
  [/^op(?:acity)?-?(.+)$/, ([, d]) => ({ opacity: handler.bracket.percent.cssvar(d) })]
];
const textColors = [
  [/^(?:color|c)-(.+)$/, colorResolver("color", "text"), { autocomplete: "(color|c)-$colors" }],
  [/^text-(.+)$/, colorResolver("color", "text", (css) => !css.color?.toString().match(numberWithUnitRE)), { autocomplete: "text-$colors" }],
  [/^(?:text|color|c)-(.+)$/, ([, v]) => globalKeywords.includes(v) ? { color: v } : void 0, { autocomplete: `(text|color|c)-(${globalKeywords.join("|")})` }],
  [/^(?:text|color|c)-op(?:acity)?-?(.+)$/, ([, opacity2]) => ({ "--un-text-opacity": handler.bracket.percent.cssvar(opacity2) }), { autocomplete: "(text|color|c)-(op|opacity)-<percent>" }]
];
const bgColors = [
  [/^bg-(.+)$/, colorResolver("background-color", "bg"), { autocomplete: "bg-$colors" }],
  [/^bg-op(?:acity)?-?(.+)$/, ([, opacity2]) => ({ "--un-bg-opacity": handler.bracket.percent.cssvar(opacity2) }), { autocomplete: "bg-(op|opacity)-<percent>" }]
];

const decorationStyles = ["solid", "double", "dotted", "dashed", "wavy", ...globalKeywords];
const textDecorations = [
  [/^(?:decoration-)?(underline|overline|line-through)$/, ([, s]) => ({ "text-decoration-line": s }), { autocomplete: "decoration-(underline|overline|line-through)" }],
  [/^(?:underline|decoration)-(?:size-)?(.+)$/, ([, s], { theme }) => ({ "text-decoration-thickness": theme.lineWidth?.[s] ?? handler.bracket.cssvar.global.px(s) }), { autocomplete: "(underline|decoration)-<num>" }],
  [/^(?:underline|decoration)-(auto|from-font)$/, ([, s]) => ({ "text-decoration-thickness": s }), { autocomplete: "(underline|decoration)-(auto|from-font)" }],
  [/^(?:underline|decoration)-(.+)$/, (match, ctx) => {
    const result = colorResolver("text-decoration-color", "line")(match, ctx);
    if (result) {
      return {
        "-webkit-text-decoration-color": result["text-decoration-color"],
        ...result
      };
    }
  }, { autocomplete: "(underline|decoration)-$colors" }],
  [/^(?:underline|decoration)-op(?:acity)?-?(.+)$/, ([, opacity]) => ({ "--un-line-opacity": handler.bracket.percent.cssvar(opacity) }), { autocomplete: "(underline|decoration)-(op|opacity)-<percent>" }],
  [/^(?:underline|decoration)-offset-(.+)$/, ([, s], { theme }) => ({ "text-underline-offset": theme.lineWidth?.[s] ?? handler.auto.bracket.cssvar.global.px(s) }), { autocomplete: "(underline|decoration)-(offset)-<num>" }],
  ...decorationStyles.map((v) => [`underline-${v}`, { "text-decoration-style": v }]),
  ...decorationStyles.map((v) => [`decoration-${v}`, { "text-decoration-style": v }]),
  ["no-underline", { "text-decoration": "none" }],
  ["decoration-none", { "text-decoration": "none" }]
];

const transitionPropertyGroup = {
  all: "all",
  colors: ["color", "background-color", "border-color", "outline-color", "text-decoration-color", "fill", "stroke"].join(","),
  none: "none",
  opacity: "opacity",
  shadow: "box-shadow",
  transform: "transform"
};
function transitionProperty(prop) {
  return handler.properties(prop) ?? transitionPropertyGroup[prop];
}
const transitions = [
  [/^transition(?:-([a-z-]+(?:,[a-z-]+)*))?(?:-(\d+))?$/, ([, prop, d], { theme }) => {
    const p = prop != null ? transitionProperty(prop) : [transitionPropertyGroup.colors, "opacity", "box-shadow", "transform", "filter", "backdrop-filter"].join(",");
    if (p) {
      const duration = theme.duration?.[d || "DEFAULT"] ?? handler.time(d || "150");
      return {
        "transition-property": p,
        "transition-timing-function": "cubic-bezier(0.4, 0, 0.2, 1)",
        "transition-duration": duration
      };
    }
  }, { autocomplete: `transition-(${Object.keys(transitionPropertyGroup).join("|")})` }],
  [
    /^(?:transition-)?duration-(.+)$/,
    ([, d], { theme }) => ({ "transition-duration": theme.duration?.[d || "DEFAULT"] ?? handler.bracket.cssvar.time(d) }),
    { autocomplete: ["transition-duration-$duration", "duration-$duration"] }
  ],
  [
    /^(?:transition-)?delay-(.+)$/,
    ([, d], { theme }) => ({ "transition-delay": theme.duration?.[d || "DEFAULT"] ?? handler.bracket.cssvar.time(d) }),
    { autocomplete: ["transition-delay-$duration", "delay-$duration"] }
  ],
  [
    /^(?:transition-)?ease(?:-(.+))?$/,
    ([, d], { theme }) => ({ "transition-timing-function": theme.easing?.[d || "DEFAULT"] ?? handler.bracket.cssvar(d) }),
    { autocomplete: ["transition-ease-(linear|in|out|in-out|DEFAULT)", "ease-(linear|in|out|in-out|DEFAULT)"] }
  ],
  [
    /^(?:transition-)?property-(.+)$/,
    ([, v]) => ({ "transition-property": handler.bracket.global(v) || transitionProperty(v) }),
    { autocomplete: [`transition-property-(${[...globalKeywords, ...Object.keys(transitionPropertyGroup)].join("|")})`] }
  ],
  ["transition-none", { transition: "none" }],
  ...makeGlobalStaticRules("transition")
];

const weightMap = {
  thin: "100",
  extralight: "200",
  light: "300",
  normal: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
  extrabold: "800",
  black: "900"
};
function handleLineHeight(s, theme) {
  return theme.lineHeight?.[s] || handler.bracket.cssvar.global.rem(s);
}
const fonts = [
  [
    /^font-(.+)$/,
    ([, d], { theme }) => ({ "font-family": theme.fontFamily?.[d] || handler.bracket.cssvar.global(d) }),
    { autocomplete: "font-$fontFamily" }
  ],
  [
    /^text-(.+)$/,
    ([, s = "base"], { theme }) => {
      const [size, leading] = splitShorthand(s, "length");
      const sizePairs = toArray(theme.fontSize?.[size]);
      const lineHeight = leading ? handleLineHeight(leading, theme) : void 0;
      if (sizePairs?.[0]) {
        const [fontSize2, height] = sizePairs;
        return {
          "font-size": fontSize2,
          "line-height": lineHeight ?? height ?? "1"
        };
      }
      const fontSize = handler.bracketOfLength.rem(size);
      if (lineHeight && fontSize) {
        return {
          "font-size": fontSize,
          "line-height": lineHeight
        };
      }
      return { "font-size": handler.bracketOfLength.rem(s) };
    },
    { autocomplete: "text-$fontSize" }
  ],
  [/^text-size-(.+)$/, ([, s], { theme }) => {
    const themed = toArray(theme.fontSize?.[s]);
    const size = themed?.[0] ?? handler.bracket.cssvar.global.rem(s);
    if (size != null)
      return { "font-size": size };
  }, { autocomplete: "text-size-$fontSize" }],
  [
    /^(?:font|fw)-?([^-]+)$/,
    ([, s]) => ({ "font-weight": weightMap[s] || handler.global.number(s) }),
    { autocomplete: `(font|fw)-(100|200|300|400|500|600|700|800|900|${Object.keys(weightMap).join("|")})` }
  ],
  [
    /^(?:font-)?(?:leading|lh)-(.+)$/,
    ([, s], { theme }) => ({ "line-height": handleLineHeight(s, theme) }),
    { autocomplete: "(leading|lh)-$lineHeight" }
  ],
  ["font-synthesis-weight", { "font-synthesis": "weight" }],
  ["font-synthesis-style", { "font-synthesis": "style" }],
  ["font-synthesis-small-caps", { "font-synthesis": "small-caps" }],
  ["font-synthesis-none", { "font-synthesis": "none" }],
  [/^font-synthesis-(.+)$/, ([, s]) => ({ "font-synthesis": handler.bracket.cssvar.global(s) })],
  [
    /^(?:font-)?tracking-(.+)$/,
    ([, s], { theme }) => ({ "letter-spacing": theme.letterSpacing?.[s] || handler.bracket.cssvar.global.rem(s) }),
    { autocomplete: "tracking-$letterSpacing" }
  ],
  [
    /^(?:font-)?word-spacing-(.+)$/,
    ([, s], { theme }) => ({ "word-spacing": theme.wordSpacing?.[s] || handler.bracket.cssvar.global.rem(s) }),
    { autocomplete: "word-spacing-$wordSpacing" }
  ]
];
const tabSizes = [
  [/^tab(?:-(.+))?$/, ([, s]) => {
    const v = handler.bracket.cssvar.global.number(s || "4");
    if (v != null) {
      return {
        "-moz-tab-size": v,
        "-o-tab-size": v,
        "tab-size": v
      };
    }
  }]
];
const textIndents = [
  [/^indent(?:-(.+))?$/, ([, s], { theme }) => ({ "text-indent": theme.textIndent?.[s || "DEFAULT"] || handler.bracket.cssvar.global.fraction.rem(s) }), { autocomplete: "indent-$textIndent" }]
];
const textStrokes = [
  [/^text-stroke(?:-(.+))?$/, ([, s], { theme }) => ({ "-webkit-text-stroke-width": theme.textStrokeWidth?.[s || "DEFAULT"] || handler.bracket.cssvar.px(s) }), { autocomplete: "text-stroke-$textStrokeWidth" }],
  [/^text-stroke-(.+)$/, colorResolver("-webkit-text-stroke-color", "text-stroke"), { autocomplete: "text-stroke-$colors" }],
  [/^text-stroke-op(?:acity)?-?(.+)$/, ([, opacity]) => ({ "--un-text-stroke-opacity": handler.bracket.percent.cssvar(opacity) }), { autocomplete: "text-stroke-(op|opacity)-<percent>" }]
];
const textShadows = [
  [/^text-shadow(?:-(.+))?$/, ([, s], { theme }) => {
    const v = theme.textShadow?.[s || "DEFAULT"];
    if (v != null) {
      return {
        "--un-text-shadow": colorableShadows(v, "--un-text-shadow-color").join(","),
        "text-shadow": "var(--un-text-shadow)"
      };
    }
    return { "text-shadow": handler.bracket.cssvar.global(s) };
  }, { autocomplete: "text-shadow-$textShadow" }],
  [/^text-shadow-color-(.+)$/, colorResolver("--un-text-shadow-color", "text-shadow"), { autocomplete: "text-shadow-color-$colors" }],
  [/^text-shadow-color-op(?:acity)?-?(.+)$/, ([, opacity]) => ({ "--un-text-shadow-opacity": handler.bracket.percent.cssvar(opacity) }), { autocomplete: "text-shadow-color-(op|opacity)-<percent>" }]
];

const overflowValues = [
  "auto",
  "hidden",
  "clip",
  "visible",
  "scroll",
  "overlay",
  ...globalKeywords
];
const overflows = [
  [/^(?:overflow|of)-(.+)$/, ([, v]) => overflowValues.includes(v) ? { overflow: v } : void 0, { autocomplete: [`(overflow|of)-(${overflowValues.join("|")})`, `(overflow|of)-(x|y)-(${overflowValues.join("|")})`] }],
  [/^(?:overflow|of)-([xy])-(.+)$/, ([, d, v]) => overflowValues.includes(v) ? { [`overflow-${d}`]: v } : void 0]
];

const positions = [
  [/^(?:position-|pos-)?(relative|absolute|fixed|sticky)$/, ([, v]) => ({ position: v })],
  [/^(?:position-|pos-)([-\w]+)$/, ([, v]) => globalKeywords.includes(v) ? { position: v } : void 0],
  [/^(?:position-|pos-)?(static)$/, ([, v]) => ({ position: v })]
];
const justifies = [
  ["justify-start", { "justify-content": "flex-start" }],
  ["justify-end", { "justify-content": "flex-end" }],
  ["justify-center", { "justify-content": "center" }],
  ["justify-between", { "justify-content": "space-between" }],
  ["justify-around", { "justify-content": "space-around" }],
  ["justify-evenly", { "justify-content": "space-evenly" }],
  ...makeGlobalStaticRules("justify", "justify-content"),
  ["justify-items-start", { "justify-items": "start" }],
  ["justify-items-end", { "justify-items": "end" }],
  ["justify-items-center", { "justify-items": "center" }],
  ["justify-items-stretch", { "justify-items": "stretch" }],
  ...makeGlobalStaticRules("justify-items"),
  ["justify-self-auto", { "justify-self": "auto" }],
  ["justify-self-start", { "justify-self": "start" }],
  ["justify-self-end", { "justify-self": "end" }],
  ["justify-self-center", { "justify-self": "center" }],
  ["justify-self-stretch", { "justify-self": "stretch" }],
  ...makeGlobalStaticRules("justify-self")
];
const orders = [
  [/^order-(.+)$/, ([, v]) => ({ order: handler.bracket.cssvar.number(v) })],
  ["order-first", { order: "-9999" }],
  ["order-last", { order: "9999" }],
  ["order-none", { order: "0" }]
];
const alignments = [
  ["content-center", { "align-content": "center" }],
  ["content-start", { "align-content": "flex-start" }],
  ["content-end", { "align-content": "flex-end" }],
  ["content-between", { "align-content": "space-between" }],
  ["content-around", { "align-content": "space-around" }],
  ["content-evenly", { "align-content": "space-evenly" }],
  ...makeGlobalStaticRules("content", "align-content"),
  ["items-start", { "align-items": "flex-start" }],
  ["items-end", { "align-items": "flex-end" }],
  ["items-center", { "align-items": "center" }],
  ["items-baseline", { "align-items": "baseline" }],
  ["items-stretch", { "align-items": "stretch" }],
  ...makeGlobalStaticRules("items", "align-items"),
  ["self-auto", { "align-self": "auto" }],
  ["self-start", { "align-self": "flex-start" }],
  ["self-end", { "align-self": "flex-end" }],
  ["self-center", { "align-self": "center" }],
  ["self-stretch", { "align-self": "stretch" }],
  ["self-baseline", { "align-self": "baseline" }],
  ...makeGlobalStaticRules("self", "align-self")
];
const placements = [
  ["place-content-center", { "place-content": "center" }],
  ["place-content-start", { "place-content": "start" }],
  ["place-content-end", { "place-content": "end" }],
  ["place-content-between", { "place-content": "space-between" }],
  ["place-content-around", { "place-content": "space-around" }],
  ["place-content-evenly", { "place-content": "space-evenly" }],
  ["place-content-stretch", { "place-content": "stretch" }],
  ...makeGlobalStaticRules("place-content"),
  ["place-items-start", { "place-items": "start" }],
  ["place-items-end", { "place-items": "end" }],
  ["place-items-center", { "place-items": "center" }],
  ["place-items-stretch", { "place-items": "stretch" }],
  ...makeGlobalStaticRules("place-items"),
  ["place-self-auto", { "place-self": "auto" }],
  ["place-self-start", { "place-self": "start" }],
  ["place-self-end", { "place-self": "end" }],
  ["place-self-center", { "place-self": "center" }],
  ["place-self-stretch", { "place-self": "stretch" }],
  ...makeGlobalStaticRules("place-self")
];
const flexGridJustifiesAlignments = [...justifies, ...alignments].flatMap(([k, v]) => [
  [`flex-${k}`, v],
  [`grid-${k}`, v]
]);
function handleInsetValue(v, { theme }) {
  return theme.spacing?.[v] ?? handler.bracket.cssvar.global.auto.fraction.rem(v);
}
function handleInsetValues([, d, v], ctx) {
  const r = handleInsetValue(v, ctx);
  if (r != null && d in insetMap)
    return insetMap[d].map((i) => [i.slice(1), r]);
}
const insets = [
  [
    /^(?:position-|pos-)?inset-(.+)$/,
    ([, v], ctx) => ({ inset: handleInsetValue(v, ctx) }),
    {
      autocomplete: [
        "(position|pos)-inset-<directions>-$spacing",
        "(position|pos)-inset-(block|inline)-$spacing",
        "(position|pos)-inset-(bs|be|is|ie)-$spacing",
        "(position|pos)-(top|left|right|bottom)-$spacing"
      ]
    }
  ],
  [/^(?:position-|pos-)?(start|end)-(.+)$/, handleInsetValues],
  [/^(?:position-|pos-)?inset-([xy])-(.+)$/, handleInsetValues],
  [/^(?:position-|pos-)?inset-([rltbse])-(.+)$/, handleInsetValues],
  [/^(?:position-|pos-)?inset-(block|inline)-(.+)$/, handleInsetValues],
  [/^(?:position-|pos-)?inset-([bi][se])-(.+)$/, handleInsetValues],
  [/^(?:position-|pos-)?(top|left|right|bottom)-(.+)$/, ([, d, v], ctx) => ({ [d]: handleInsetValue(v, ctx) })]
];
const floats = [
  ["float-left", { float: "left" }],
  ["float-right", { float: "right" }],
  ["float-none", { float: "none" }],
  ...makeGlobalStaticRules("float"),
  ["clear-left", { clear: "left" }],
  ["clear-right", { clear: "right" }],
  ["clear-both", { clear: "both" }],
  ["clear-none", { clear: "none" }],
  ...makeGlobalStaticRules("clear")
];
const zIndexes = [
  [/^(?:position-|pos-)?z([\d.]+)$/, ([, v]) => ({ "z-index": handler.number(v) })],
  [/^(?:position-|pos-)?z-(.+)$/, ([, v]) => ({ "z-index": handler.bracket.cssvar.global.auto.number(v) }), { autocomplete: "z-<num>" }]
];
const boxSizing = [
  ["box-border", { "box-sizing": "border-box" }],
  ["box-content", { "box-sizing": "content-box" }],
  ...makeGlobalStaticRules("box", "box-sizing")
];

const cursorValues = ["auto", "default", "none", "context-menu", "help", "pointer", "progress", "wait", "cell", "crosshair", "text", "vertical-text", "alias", "copy", "move", "no-drop", "not-allowed", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out"];
const containValues = ["none", "strict", "content", "size", "inline-size", "layout", "style", "paint"];
const varEmpty = " ";
const displays = [
  ["inline", { display: "inline" }],
  ["block", { display: "block" }],
  ["inline-block", { display: "inline-block" }],
  ["contents", { display: "contents" }],
  ["flow-root", { display: "flow-root" }],
  ["list-item", { display: "list-item" }],
  ["hidden", { display: "none" }],
  [/^display-(.+)$/, ([, c]) => ({ display: handler.bracket.cssvar.global(c) || c })]
];
const appearances = [
  ["visible", { visibility: "visible" }],
  ["invisible", { visibility: "hidden" }],
  ["backface-visible", { "backface-visibility": "visible" }],
  ["backface-hidden", { "backface-visibility": "hidden" }],
  ...makeGlobalStaticRules("backface", "backface-visibility")
];
const cursors = [
  [/^cursor-(.+)$/, ([, c]) => ({ cursor: handler.bracket.cssvar.global(c) })],
  ...cursorValues.map((v) => [`cursor-${v}`, { cursor: v }])
];
const contains = [
  [/^contain-(.*)$/, ([, d]) => {
    if (handler.bracket(d) != null) {
      return {
        contain: handler.bracket(d).split(" ").map((e) => handler.cssvar.fraction(e) ?? e).join(" ")
      };
    }
    return containValues.includes(d) ? { contain: d } : void 0;
  }]
];
const pointerEvents = [
  ["pointer-events-auto", { "pointer-events": "auto" }],
  ["pointer-events-none", { "pointer-events": "none" }],
  ...makeGlobalStaticRules("pointer-events")
];
const resizes = [
  ["resize-x", { resize: "horizontal" }],
  ["resize-y", { resize: "vertical" }],
  ["resize", { resize: "both" }],
  ["resize-none", { resize: "none" }],
  ...makeGlobalStaticRules("resize")
];
const userSelects = [
  ["select-auto", { "-webkit-user-select": "auto", "user-select": "auto" }],
  ["select-all", { "-webkit-user-select": "all", "user-select": "all" }],
  ["select-text", { "-webkit-user-select": "text", "user-select": "text" }],
  ["select-none", { "-webkit-user-select": "none", "user-select": "none" }],
  ...makeGlobalStaticRules("select", "user-select")
];
const whitespaces = [
  [
    /^(?:whitespace-|ws-)([-\w]+)$/,
    ([, v]) => ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces", ...globalKeywords].includes(v) ? { "white-space": v } : void 0,
    { autocomplete: "(whitespace|ws)-(normal|nowrap|pre|pre-line|pre-wrap|break-spaces)" }
  ]
];
const contentVisibility = [
  [/^intrinsic-size-(.+)$/, ([, d]) => ({ "contain-intrinsic-size": handler.bracket.cssvar.global.fraction.rem(d) }), { autocomplete: "intrinsic-size-<num>" }],
  ["content-visibility-visible", { "content-visibility": "visible" }],
  ["content-visibility-hidden", { "content-visibility": "hidden" }],
  ["content-visibility-auto", { "content-visibility": "auto" }],
  ...makeGlobalStaticRules("content-visibility")
];
const contents = [
  [/^content-(.+)$/, ([, v]) => ({ content: handler.bracket.cssvar(v) })],
  ["content-empty", { content: '""' }],
  ["content-none", { content: '""' }]
];
const breaks = [
  ["break-normal", { "overflow-wrap": "normal", "word-break": "normal" }],
  ["break-words", { "overflow-wrap": "break-word" }],
  ["break-all", { "word-break": "break-all" }],
  ["break-keep", { "word-break": "keep-all" }]
];
const textOverflows = [
  ["truncate", { "overflow": "hidden", "text-overflow": "ellipsis", "white-space": "nowrap" }],
  ["text-truncate", { "overflow": "hidden", "text-overflow": "ellipsis", "white-space": "nowrap" }],
  ["text-ellipsis", { "text-overflow": "ellipsis" }],
  ["text-clip", { "text-overflow": "clip" }]
];
const textTransforms = [
  ["case-upper", { "text-transform": "uppercase" }],
  ["case-lower", { "text-transform": "lowercase" }],
  ["case-capital", { "text-transform": "capitalize" }],
  ["case-normal", { "text-transform": "none" }],
  ...makeGlobalStaticRules("case", "text-transform")
];
const fontStyles = [
  ["italic", { "font-style": "italic" }],
  ["not-italic", { "font-style": "normal" }],
  ["font-italic", { "font-style": "italic" }],
  ["font-not-italic", { "font-style": "normal" }],
  ["oblique", { "font-style": "oblique" }],
  ["not-oblique", { "font-style": "normal" }],
  ["font-oblique", { "font-style": "oblique" }],
  ["font-not-oblique", { "font-style": "normal" }]
];
const fontSmoothings = [
  ["antialiased", {
    "-webkit-font-smoothing": "antialiased",
    "-moz-osx-font-smoothing": "grayscale",
    "font-smoothing": "grayscale"
  }],
  ["subpixel-antialiased", {
    "-webkit-font-smoothing": "auto",
    "-moz-osx-font-smoothing": "auto",
    "font-smoothing": "auto"
  }]
];

const ringBase = {
  "--un-ring-inset": varEmpty,
  "--un-ring-offset-width": "0px",
  "--un-ring-offset-color": "#fff",
  "--un-ring-width": "0px",
  "--un-ring-color": "rgba(147,197,253,0.5)",
  "--un-shadow": "0 0 rgba(0,0,0,0)"
};
const rings = [
  [/^ring(?:-(.+))?$/, ([, d], { theme }) => {
    const value = theme.ringWidth?.[d || "DEFAULT"] ?? handler.px(d || "1");
    if (value) {
      return {
        "--un-ring-width": value,
        "--un-ring-offset-shadow": "var(--un-ring-inset) 0 0 0 var(--un-ring-offset-width) var(--un-ring-offset-color)",
        "--un-ring-shadow": "var(--un-ring-inset) 0 0 0 calc(var(--un-ring-width) + var(--un-ring-offset-width)) var(--un-ring-color)",
        "box-shadow": "var(--un-ring-offset-shadow), var(--un-ring-shadow), var(--un-shadow)"
      };
    }
  }, { autocomplete: "ring-$ringWidth" }],
  [/^ring-(?:width-|size-)(.+)$/, ([, d], { theme }) => ({ "--un-ring-width": theme.lineWidth?.[d] ?? handler.bracket.cssvar.px(d) }), { autocomplete: "ring-(width|size)-$lineWidth" }],
  ["ring-offset", { "--un-ring-offset-width": "1px" }],
  [/^ring-offset-(?:width-|size-)?(.+)$/, ([, d], { theme }) => ({ "--un-ring-offset-width": theme.lineWidth?.[d] ?? handler.bracket.cssvar.px(d) }), { autocomplete: "ring-offset-(width|size)-$lineWidth" }],
  [/^ring-(.+)$/, colorResolver("--un-ring-color", "ring"), { autocomplete: "ring-$colors" }],
  [/^ring-op(?:acity)?-?(.+)$/, ([, opacity]) => ({ "--un-ring-opacity": handler.bracket.percent.cssvar(opacity) }), { autocomplete: "ring-(op|opacity)-<percent>" }],
  [/^ring-offset-(.+)$/, colorResolver("--un-ring-offset-color", "ring-offset"), { autocomplete: "ring-offset-$colors" }],
  [/^ring-offset-op(?:acity)?-?(.+)$/, ([, opacity]) => ({ "--un-ring-offset-opacity": handler.bracket.percent.cssvar(opacity) }), { autocomplete: "ring-offset-(op|opacity)-<percent>" }],
  ["ring-inset", { "--un-ring-inset": "inset" }]
];

const boxShadowsBase = {
  "--un-ring-offset-shadow": "0 0 rgba(0,0,0,0)",
  "--un-ring-shadow": "0 0 rgba(0,0,0,0)",
  "--un-shadow-inset": varEmpty,
  "--un-shadow": "0 0 rgba(0,0,0,0)"
};
const boxShadows = [
  [/^shadow(?:-(.+))?$/, (match, context) => {
    const [, d] = match;
    const { theme } = context;
    const v = theme.boxShadow?.[d || "DEFAULT"];
    const c = d ? handler.bracket.cssvar(d) : void 0;
    if ((v != null || c != null) && !hasParseableColor(c, theme)) {
      return {
        "--un-shadow": colorableShadows(v || c, "--un-shadow-color").join(","),
        "box-shadow": "var(--un-ring-offset-shadow), var(--un-ring-shadow), var(--un-shadow)"
      };
    }
    return colorResolver("--un-shadow-color", "shadow")(match, context);
  }, { autocomplete: ["shadow-$colors", "shadow-$boxShadow"] }],
  [/^shadow-op(?:acity)?-?(.+)$/, ([, opacity]) => ({ "--un-shadow-opacity": handler.bracket.percent.cssvar(opacity) }), { autocomplete: "shadow-(op|opacity)-<percent>" }],
  ["shadow-inset", { "--un-shadow-inset": "inset" }]
];

const transformValues = [
  "translate",
  "rotate",
  "scale"
];
const transformCpu = [
  "translateX(var(--un-translate-x))",
  "translateY(var(--un-translate-y))",
  "translateZ(var(--un-translate-z))",
  "rotate(var(--un-rotate))",
  "rotateX(var(--un-rotate-x))",
  "rotateY(var(--un-rotate-y))",
  "rotateZ(var(--un-rotate-z))",
  "skewX(var(--un-skew-x))",
  "skewY(var(--un-skew-y))",
  "scaleX(var(--un-scale-x))",
  "scaleY(var(--un-scale-y))",
  "scaleZ(var(--un-scale-z))"
].join(" ");
const transformGpu = [
  "translate3d(var(--un-translate-x), var(--un-translate-y), var(--un-translate-z))",
  "rotate(var(--un-rotate))",
  "rotateX(var(--un-rotate-x))",
  "rotateY(var(--un-rotate-y))",
  "rotateZ(var(--un-rotate-z))",
  "skewX(var(--un-skew-x))",
  "skewY(var(--un-skew-y))",
  "scaleX(var(--un-scale-x))",
  "scaleY(var(--un-scale-y))",
  "scaleZ(var(--un-scale-z))"
].join(" ");
const transformBase = {
  "--un-rotate": 0,
  "--un-rotate-x": 0,
  "--un-rotate-y": 0,
  "--un-rotate-z": 0,
  "--un-scale-x": 1,
  "--un-scale-y": 1,
  "--un-scale-z": 1,
  "--un-skew-x": 0,
  "--un-skew-y": 0,
  "--un-translate-x": 0,
  "--un-translate-y": 0,
  "--un-translate-z": 0
};
const transforms = [
  [/^(?:transform-)?origin-(.+)$/, ([, s]) => ({ "transform-origin": positionMap[s] ?? handler.bracket.cssvar(s) }), { autocomplete: [`transform-origin-(${Object.keys(positionMap).join("|")})`, `origin-(${Object.keys(positionMap).join("|")})`] }],
  [/^(?:transform-)?perspect(?:ive)?-(.+)$/, ([, s]) => {
    const v = handler.bracket.cssvar.px.numberWithUnit(s);
    if (v != null) {
      return {
        "-webkit-perspective": v,
        "perspective": v
      };
    }
  }],
  [/^(?:transform-)?perspect(?:ive)?-origin-(.+)$/, ([, s]) => {
    const v = handler.bracket.cssvar(s) ?? (s.length >= 3 ? positionMap[s] : void 0);
    if (v != null) {
      return {
        "-webkit-perspective-origin": v,
        "perspective-origin": v
      };
    }
  }],
  [/^(?:transform-)?translate-()(.+)$/, handleTranslate],
  [/^(?:transform-)?translate-([xyz])-(.+)$/, handleTranslate],
  [/^(?:transform-)?rotate-()(.+)$/, handleRotate],
  [/^(?:transform-)?rotate-([xyz])-(.+)$/, handleRotate],
  [/^(?:transform-)?skew-([xy])-(.+)$/, handleSkew, { autocomplete: ["transform-skew-(x|y)-<percent>"] }],
  [/^(?:transform-)?scale-()(.+)$/, handleScale],
  [/^(?:transform-)?scale-([xyz])-(.+)$/, handleScale, { autocomplete: [`transform-(${transformValues.join("|")})-<percent>`, `transform-(${transformValues.join("|")})-(x|y|z)-<percent>`] }],
  [/^(?:transform-)?preserve-3d$/, () => ({ "transform-style": "preserve-3d" })],
  [/^(?:transform-)?preserve-flat$/, () => ({ "transform-style": "flat" })],
  ["transform", { transform: transformCpu }],
  ["transform-cpu", { transform: transformCpu }],
  ["transform-gpu", { transform: transformGpu }],
  ["transform-none", { transform: "none" }],
  ...makeGlobalStaticRules("transform")
];
function handleTranslate([, d, b], { theme }) {
  const v = theme.spacing?.[b] ?? handler.bracket.cssvar.fraction.rem(b);
  if (v != null) {
    return [
      ...xyzMap[d].map((i) => [`--un-translate${i}`, v]),
      ["transform", transformCpu]
    ];
  }
}
function handleScale([, d, b]) {
  const v = handler.bracket.cssvar.fraction.percent(b);
  if (v != null) {
    return [
      ...xyzMap[d].map((i) => [`--un-scale${i}`, v]),
      ["transform", transformCpu]
    ];
  }
}
function handleRotate([, d = "", b]) {
  const v = handler.bracket.cssvar.degree(b);
  if (v != null) {
    if (d) {
      return {
        "--un-rotate": 0,
        [`--un-rotate-${d}`]: v,
        "transform": transformCpu
      };
    } else {
      return {
        "--un-rotate-x": 0,
        "--un-rotate-y": 0,
        "--un-rotate-z": 0,
        "--un-rotate": v,
        "transform": transformCpu
      };
    }
  }
}
function handleSkew([, d, b]) {
  const v = handler.bracket.cssvar.degree(b);
  if (v != null) {
    return {
      [`--un-skew-${d}`]: v,
      transform: transformCpu
    };
  }
}

export { userSelects as A, whitespaces as B, breaks as C, overflows as D, outline as E, appearance as F, orders as G, justifies as H, alignments as I, placements as J, flexGridJustifiesAlignments as K, insets as L, floats as M, zIndexes as N, boxSizing as O, transitions as P, transforms as Q, willChange as R, contains as S, transformBase as T, boxShadowsBase as U, ringBase as V, borderStyles as W, handlerBorderStyle as X, varEmpty as Y, borders as a, bgColors as b, contentVisibility as c, displays as d, contents as e, fonts as f, textIndents as g, textOverflows as h, textDecorations as i, textStrokes as j, textShadows as k, textTransforms as l, textAligns as m, textColors as n, opacity as o, fontStyles as p, fontSmoothings as q, boxShadows as r, rings as s, tabSizes as t, positions as u, cursors as v, appearances as w, pointerEvents as x, resizes as y, verticalAligns as z };
