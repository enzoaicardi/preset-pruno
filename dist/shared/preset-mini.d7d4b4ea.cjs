'use strict';

const core = require('@unocss/core');

const directionMap = {
  "l": ["-left"],
  "r": ["-right"],
  "t": ["-top"],
  "b": ["-bottom"],
  "s": ["-inline-start"],
  "e": ["-inline-end"],
  "x": ["-left", "-right"],
  "y": ["-top", "-bottom"],
  "": [""],
  "bs": ["-block-start"],
  "be": ["-block-end"],
  "is": ["-inline-start"],
  "ie": ["-inline-end"],
  "block": ["-block-start", "-block-end"],
  "inline": ["-inline-start", "-inline-end"]
};
const insetMap = {
  ...directionMap,
  s: ["-inset-inline-start"],
  start: ["-inset-inline-start"],
  e: ["-inset-inline-end"],
  end: ["-inset-inline-end"],
  bs: ["-inset-block-start"],
  be: ["-inset-block-end"],
  is: ["-inset-inline-start"],
  ie: ["-inset-inline-end"],
  block: ["-inset-block-start", "-inset-block-end"],
  inline: ["-inset-inline-start", "-inset-inline-end"]
};
const cornerMap = {
  "l": ["-top-left", "-bottom-left"],
  "r": ["-top-right", "-bottom-right"],
  "t": ["-top-left", "-top-right"],
  "b": ["-bottom-left", "-bottom-right"],
  "tl": ["-top-left"],
  "lt": ["-top-left"],
  "tr": ["-top-right"],
  "rt": ["-top-right"],
  "bl": ["-bottom-left"],
  "lb": ["-bottom-left"],
  "br": ["-bottom-right"],
  "rb": ["-bottom-right"],
  "": [""],
  "bs": ["-start-start", "-start-end"],
  "be": ["-end-start", "-end-end"],
  "s": ["-end-start", "-start-start"],
  "is": ["-end-start", "-start-start"],
  "e": ["-start-end", "-end-end"],
  "ie": ["-start-end", "-end-end"],
  "ss": ["-start-start"],
  "bs-is": ["-start-start"],
  "is-bs": ["-start-start"],
  "se": ["-start-end"],
  "bs-ie": ["-start-end"],
  "ie-bs": ["-start-end"],
  "es": ["-end-start"],
  "be-is": ["-end-start"],
  "is-be": ["-end-start"],
  "ee": ["-end-end"],
  "be-ie": ["-end-end"],
  "ie-be": ["-end-end"]
};
const xyzMap = {
  "x": ["-x"],
  "y": ["-y"],
  "z": ["-z"],
  "": ["-x", "-y"]
};
const basePositionMap = [
  "top",
  "top center",
  "top left",
  "top right",
  "bottom",
  "bottom center",
  "bottom left",
  "bottom right",
  "left",
  "left center",
  "left top",
  "left bottom",
  "right",
  "right center",
  "right top",
  "right bottom",
  "center",
  "center top",
  "center bottom",
  "center left",
  "center right",
  "center center"
];
const positionMap = Object.assign(
  {},
  ...basePositionMap.map((p) => ({ [p.replace(/ /, "-")]: p })),
  ...basePositionMap.map((p) => ({ [p.replace(/\b(\w)\w+/g, "$1").replace(/ /, "")]: p }))
);
const globalKeywords = [
  "inherit",
  "initial",
  "revert",
  "revert-layer",
  "unset"
];

const numberWithUnitRE = /^(-?\d*(?:\.\d+)?)(px|pt|pc|%|r?(?:em|ex|lh|cap|ch|ic)|(?:[sld]?v|cq)(?:[whib]|min|max)|in|cm|mm|rpx)?$/i;
const numberRE = /^(-?\d*(?:\.\d+)?)$/i;
const unitOnlyRE = /^(px)$/i;

const cssProps = [
  "color",
  "border-color",
  "background-color",
  "flex-grow",
  "flex",
  "flex-shrink",
  "caret-color",
  "font",
  "gap",
  "opacity",
  "visibility",
  "z-index",
  "font-weight",
  "zoom",
  "text-shadow",
  "transform",
  "box-shadow",
  "background-position",
  "left",
  "right",
  "top",
  "bottom",
  "object-position",
  "max-height",
  "min-height",
  "max-width",
  "min-width",
  "height",
  "width",
  "border-width",
  "margin",
  "padding",
  "outline-width",
  "outline-offset",
  "font-size",
  "line-height",
  "text-indent",
  "vertical-align",
  "border-spacing",
  "letter-spacing",
  "word-spacing",
  "stroke",
  "filter",
  "backdrop-filter",
  "fill",
  "mask",
  "mask-size",
  "mask-border",
  "clip-path",
  "clip",
  "border-radius"
];
function round(n) {
  return n.toFixed(10).replace(/\.0+$/, "").replace(/(\.\d+?)0+$/, "$1");
}
function numberWithUnit(str) {
  const match = str.match(numberWithUnitRE);
  if (!match)
    return;
  const [, n, unit] = match;
  const num = parseFloat(n);
  if (unit && !Number.isNaN(num))
    return `${round(num)}${unit}`;
}
function auto(str) {
  if (str === "auto" || str === "a")
    return "auto";
}
function rem(str) {
  if (str.match(unitOnlyRE))
    return `1${str}`;
  const match = str.match(numberWithUnitRE);
  if (!match)
    return;
  const [, n, unit] = match;
  const num = parseFloat(n);
  if (!Number.isNaN(num)) {
    if (num === 0)
      return "0";
    return unit ? `${round(num)}${unit}` : `${round(num / 16)}rem`;
  }
}
function px(str) {
  if (str.match(unitOnlyRE))
    return `1${str}`;
  const match = str.match(numberWithUnitRE);
  if (!match)
    return;
  const [, n, unit] = match;
  const num = parseFloat(n);
  if (!Number.isNaN(num)) {
    if (num === 0)
      return "0";
    return unit ? `${round(num)}${unit}` : `${round(num)}px`;
  }
}
function number(str) {
  if (!numberRE.test(str))
    return;
  const num = parseFloat(str);
  if (!Number.isNaN(num))
    return round(num);
}
function percent(str) {
  if (str.endsWith("%"))
    str = str.slice(0, -1);
  if (!numberRE.test(str))
    return;
  const num = parseFloat(str);
  if (!Number.isNaN(num))
    return `${round(num / 100)}`;
}
function fraction(str) {
  if (str === "full")
    return "100%";
  const [left, right] = str.split("/");
  const num = parseFloat(left) / parseFloat(right);
  if (!Number.isNaN(num)) {
    if (num === 0)
      return "0";
    return `${round(num * 100)}%`;
  }
}
const bracketTypeRe = /^\[(color|length|position|quoted|string):/i;
function bracketWithType(str, requiredType) {
  if (str && str.startsWith("[") && str.endsWith("]")) {
    let base;
    let hintedType;
    const match = str.match(bracketTypeRe);
    if (!match) {
      base = str.slice(1, -1);
    } else {
      if (!requiredType)
        hintedType = match[1];
      base = str.slice(match[0].length, -1);
    }
    if (!base)
      return;
    if (base === '=""')
      return;
    let curly = 0;
    for (const i of base) {
      if (i === "[") {
        curly += 1;
      } else if (i === "]") {
        curly -= 1;
        if (curly < 0)
          return;
      }
    }
    if (curly)
      return;
    switch (hintedType) {
      case "string":
        return base.replace(/(^|[^\\])_/g, "$1 ").replace(/\\_/g, "_");
      case "quoted":
        return base.replace(/(^|[^\\])_/g, "$1 ").replace(/\\_/g, "_").replace(/(["\\])/g, "\\$1").replace(/^(.+)$/, '"$1"');
    }
    return base.replace(/(url\(.*?\))/g, (v) => v.replace(/_/g, "\\_")).replace(/(^|[^\\])_/g, "$1 ").replace(/\\_/g, "_").replace(/(?:calc|clamp|max|min)\((.*)/g, (match2) => {
      const vars = [];
      return match2.replace(/var\((--.+?)[,)]/g, (match3, g1) => {
        vars.push(g1);
        return match3.replace(g1, "--un-calc");
      }).replace(/(-?\d*\.?\d(?!\b-\d.+[,)](?![^+\-/*])\D)(?:%|[a-z]+)?|\))([+\-/*])/g, "$1 $2 ").replace(/--un-calc/g, () => vars.shift());
    });
  }
}
function bracket(str) {
  return bracketWithType(str);
}
function bracketOfColor(str) {
  return bracketWithType(str, "color");
}
function bracketOfLength(str) {
  return bracketWithType(str, "length");
}
function bracketOfPosition(str) {
  return bracketWithType(str, "position");
}
function cssvar(str) {
  if (str.match(/^\$\S/))
    return `var(--${core.escapeSelector(str.slice(1))})`;
}
function time(str) {
  const match = str.match(/^(-?[0-9.]+)(s|ms)?$/i);
  if (!match)
    return;
  const [, n, unit] = match;
  const num = parseFloat(n);
  if (!Number.isNaN(num)) {
    if (num === 0 && !unit)
      return "0s";
    return unit ? `${round(num)}${unit}` : `${round(num)}ms`;
  }
}
function degree(str) {
  const match = str.match(/^(-?[0-9.]+)(deg|rad|grad|turn)?$/i);
  if (!match)
    return;
  const [, n, unit] = match;
  const num = parseFloat(n);
  if (!Number.isNaN(num)) {
    if (num === 0)
      return "0";
    return unit ? `${round(num)}${unit}` : `${round(num)}deg`;
  }
}
function global(str) {
  if (globalKeywords.includes(str))
    return str;
}
function properties(str) {
  if (str.split(",").every((prop) => cssProps.includes(prop)))
    return str;
}
function position(str) {
  if (["top", "left", "right", "bottom", "center"].includes(str))
    return str;
}

const valueHandlers = {
  __proto__: null,
  numberWithUnit: numberWithUnit,
  auto: auto,
  rem: rem,
  px: px,
  number: number,
  percent: percent,
  fraction: fraction,
  bracket: bracket,
  bracketOfColor: bracketOfColor,
  bracketOfLength: bracketOfLength,
  bracketOfPosition: bracketOfPosition,
  cssvar: cssvar,
  time: time,
  degree: degree,
  global: global,
  properties: properties,
  position: position
};

const handler = core.createValueHandler(valueHandlers);
const h = handler;

const CONTROL_MINI_NO_NEGATIVE = "$$mini-no-negative";
function directionSize(propertyPrefix) {
  return ([_, direction, size], { theme }) => {
    const v = theme.spacing?.[size || "DEFAULT"] ?? handler.bracket.cssvar.global.auto.fraction.rem(size);
    if (v != null)
      return directionMap[direction].map((i) => [`${propertyPrefix}${i}`, v]);
  };
}
function getThemeColor(theme, colors) {
  let obj = theme.colors;
  let index = -1;
  for (const c of colors) {
    index += 1;
    if (obj && typeof obj !== "string") {
      const camel = colors.slice(index).join("-").replace(/(-[a-z])/g, (n) => n.slice(1).toUpperCase());
      if (obj[camel])
        return obj[camel];
      if (obj[c]) {
        obj = obj[c];
        continue;
      }
    }
    return void 0;
  }
  return obj;
}
function splitShorthand(body, type) {
  const split = body.split(/(?:\/|:)/);
  if (split[0] === `[${type}`) {
    return [
      split.slice(0, 2).join(":"),
      split[2]
    ];
  }
  return split;
}
function parseColor$1(body, theme) {
  const [main, opacity] = splitShorthand(body, "color");
  const colors = main.replace(/([a-z])([0-9])/g, "$1-$2").split(/-/g);
  const [name] = colors;
  if (!name)
    return;
  let color;
  const bracket = handler.bracketOfColor(main);
  const bracketOrMain = bracket || main;
  if (bracketOrMain.match(/^#[\da-fA-F]+/g))
    color = bracketOrMain;
  else if (bracketOrMain.match(/^hex-[\da-fA-F]+/g))
    color = `#${bracketOrMain.slice(4)}`;
  else if (main.startsWith("$"))
    color = handler.cssvar(main);
  color = color || bracket;
  let no = "DEFAULT";
  if (!color) {
    let colorData;
    const [scale] = colors.slice(-1);
    if (scale.match(/^\d+$/)) {
      no = scale;
      colorData = getThemeColor(theme, colors.slice(0, -1));
      if (!colorData || typeof colorData === "string")
        color = void 0;
      else
        color = colorData[no];
    } else {
      colorData = getThemeColor(theme, colors);
      if (!colorData && colors.length <= 2) {
        [, no = no] = colors;
        colorData = getThemeColor(theme, [name]);
      }
      if (typeof colorData === "string")
        color = colorData;
      else if (no && colorData)
        color = colorData[no];
    }
  }
  return {
    opacity,
    name,
    no,
    color,
    cssColor: parseCssColor(color),
    alpha: handler.bracket.cssvar.percent(opacity ?? "")
  };
}
function colorResolver(property, varName, shouldPass) {
  return ([, body], { theme }) => {
    const data = parseColor$1(body, theme);
    if (!data)
      return;
    const { alpha, color, cssColor } = data;
    const css = {};
    if (cssColor) {
      if (alpha != null) {
        css[property] = colorToString(cssColor, alpha);
      } else {
        css[`--un-${varName}-opacity`] = colorOpacityToString(cssColor);
        css[property] = colorToString(cssColor, `var(--un-${varName}-opacity)`);
      }
    } else if (color) {
      css[property] = colorToString(color, alpha);
    }
    if (shouldPass?.(css) !== false)
      return css;
  };
}
function colorableShadows(shadows, colorVar) {
  const colored = [];
  shadows = core.toArray(shadows);
  for (let i = 0; i < shadows.length; i++) {
    const components = getComponents(shadows[i], " ", 6);
    if (!components || components.length < 3)
      return shadows;
    const color = parseCssColor(components.pop());
    if (color == null)
      return shadows;
    colored.push(`${components.join(" ")} var(${colorVar}, ${colorToString(color)})`);
  }
  return colored;
}
function hasParseableColor(color, theme) {
  return color != null && !!parseColor$1(color, theme)?.color;
}
function resolveBreakpoints({ theme, generator }) {
  let breakpoints;
  if (generator.userConfig && generator.userConfig.theme)
    breakpoints = generator.userConfig.theme.breakpoints;
  if (!breakpoints)
    breakpoints = theme.breakpoints;
  return breakpoints;
}
function resolveVerticalBreakpoints({ theme, generator }) {
  let verticalBreakpoints;
  if (generator.userConfig && generator.userConfig.theme)
    verticalBreakpoints = generator.userConfig.theme.verticalBreakpoints;
  if (!verticalBreakpoints)
    verticalBreakpoints = theme.verticalBreakpoints;
  return verticalBreakpoints;
}
function makeGlobalStaticRules(prefix, property) {
  return globalKeywords.map((keyword) => [`${prefix}-${keyword}`, { [property ?? prefix]: keyword }]);
}
function getBracket(str, open, close) {
  if (str === "")
    return;
  const l = str.length;
  let parenthesis = 0;
  let opened = false;
  let openAt = 0;
  for (let i = 0; i < l; i++) {
    switch (str[i]) {
      case open:
        if (!opened) {
          opened = true;
          openAt = i;
        }
        parenthesis++;
        break;
      case close:
        --parenthesis;
        if (parenthesis < 0)
          return;
        if (parenthesis === 0) {
          return [
            str.slice(openAt, i + 1),
            str.slice(i + 1),
            str.slice(0, openAt)
          ];
        }
        break;
    }
  }
}
function getComponent(str, open, close, separators) {
  if (str === "")
    return;
  if (core.isString(separators))
    separators = [separators];
  if (separators.length === 0)
    return;
  const l = str.length;
  let parenthesis = 0;
  for (let i = 0; i < l; i++) {
    switch (str[i]) {
      case open:
        parenthesis++;
        break;
      case close:
        if (--parenthesis < 0)
          return;
        break;
      default:
        for (const separator of separators) {
          const separatorLength = separator.length;
          if (separatorLength && separator === str.slice(i, i + separatorLength) && parenthesis === 0) {
            if (i === 0 || i === l - separatorLength)
              return;
            return [
              str.slice(0, i),
              str.slice(i + separatorLength)
            ];
          }
        }
    }
  }
  return [
    str,
    ""
  ];
}
function getComponents(str, separators, limit) {
  limit = limit ?? 10;
  const components = [];
  let i = 0;
  while (str !== "") {
    if (++i > limit)
      return;
    const componentPair = getComponent(str, "(", ")", separators);
    if (!componentPair)
      return;
    const [component, rest] = componentPair;
    components.push(component);
    str = rest;
  }
  if (components.length > 0)
    return components;
}

const cssColorFunctions = ["hsl", "hsla", "hwb", "lab", "lch", "oklab", "oklch", "rgb", "rgba"];
const alphaPlaceholders = ["%alpha", "<alpha-value>"];
const alphaPlaceholdersRE = new RegExp(alphaPlaceholders.map((v) => core.escapeRegExp(v)).join("|"));
function hex2rgba(hex = "") {
  const color = parseHexColor(hex);
  if (color != null) {
    const { components, alpha } = color;
    if (alpha == null)
      return components;
    return [...components, alpha];
  }
}
function parseCssColor(str = "") {
  const color = parseColor(str);
  if (color == null || color === false)
    return;
  const { type: casedType, components, alpha } = color;
  const type = casedType.toLowerCase();
  if (components.length === 0)
    return;
  if (["rgba", "hsla"].includes(type) && alpha == null)
    return;
  if (cssColorFunctions.includes(type) && ![1, 3].includes(components.length))
    return;
  return {
    type,
    components: components.map((c) => typeof c === "string" ? c.trim() : c),
    alpha: typeof alpha === "string" ? alpha.trim() : alpha
  };
}
function colorOpacityToString(color) {
  const alpha = color.alpha ?? 1;
  return typeof alpha === "string" && alphaPlaceholders.includes(alpha) ? 1 : alpha;
}
function colorToString(color, alphaOverride) {
  if (typeof color === "string")
    return color.replace(alphaPlaceholdersRE, `${alphaOverride ?? 1}`);
  const { components } = color;
  let { alpha, type } = color;
  alpha = alphaOverride ?? alpha;
  type = type.toLowerCase();
  if (["hsla", "hsl", "rgba", "rgb"].includes(type))
    return `${type.replace("a", "")}a(${components.join(",")}${alpha == null ? "" : `,${alpha}`})`;
  alpha = alpha == null ? "" : ` / ${alpha}`;
  if (cssColorFunctions.includes(type))
    return `${type}(${components.join(" ")}${alpha})`;
  return `color(${type} ${components.join(" ")}${alpha})`;
}
function parseColor(str) {
  if (!str)
    return;
  let color = parseHexColor(str);
  if (color != null)
    return color;
  color = cssColorKeyword(str);
  if (color != null)
    return color;
  color = parseCssCommaColorFunction(str);
  if (color != null)
    return color;
  color = parseCssSpaceColorFunction(str);
  if (color != null)
    return color;
  color = parseCssColorFunction(str);
  if (color != null)
    return color;
}
function parseHexColor(str) {
  const [, body] = str.match(/^#([\da-f]+)$/i) || [];
  if (!body)
    return;
  switch (body.length) {
    case 3:
    case 4:
      const digits = Array.from(body, (s) => Number.parseInt(s, 16)).map((n) => n << 4 | n);
      return {
        type: "rgb",
        components: digits.slice(0, 3),
        alpha: body.length === 3 ? void 0 : Math.round(digits[3] / 255 * 100) / 100
      };
    case 6:
    case 8:
      const value = Number.parseInt(body, 16);
      return {
        type: "rgb",
        components: body.length === 6 ? [value >> 16 & 255, value >> 8 & 255, value & 255] : [value >> 24 & 255, value >> 16 & 255, value >> 8 & 255],
        alpha: body.length === 6 ? void 0 : Math.round((value & 255) / 255 * 100) / 100
      };
  }
}
function cssColorKeyword(str) {
  const color = {
    rebeccapurple: [102, 51, 153, 1]
  }[str];
  if (color != null) {
    return {
      type: "rgb",
      components: color.slice(0, 3),
      alpha: color[3]
    };
  }
}
function parseCssCommaColorFunction(color) {
  const match = color.match(/^(rgb|rgba|hsl|hsla)\((.+)\)$/i);
  if (!match)
    return;
  const [, type, componentString] = match;
  const components = getComponents(componentString, ",", 5);
  if (components) {
    if ([3, 4].includes(components.length)) {
      return {
        type,
        components: components.slice(0, 3),
        alpha: components[3]
      };
    } else if (components.length !== 1) {
      return false;
    }
  }
}
const cssColorFunctionsRe = new RegExp(`^(${cssColorFunctions.join("|")})\\((.+)\\)$`, "i");
function parseCssSpaceColorFunction(color) {
  const match = color.match(cssColorFunctionsRe);
  if (!match)
    return;
  const [, fn, componentString] = match;
  const parsed = parseCssSpaceColorValues(`${fn} ${componentString}`);
  if (parsed) {
    const { alpha, components: [type, ...components] } = parsed;
    return {
      type,
      components,
      alpha
    };
  }
}
function parseCssColorFunction(color) {
  const match = color.match(/^color\((.+)\)$/);
  if (!match)
    return;
  const parsed = parseCssSpaceColorValues(match[1]);
  if (parsed) {
    const { alpha, components: [type, ...components] } = parsed;
    return {
      type,
      components,
      alpha
    };
  }
}
function parseCssSpaceColorValues(componentString) {
  const components = getComponents(componentString, " ");
  if (!components)
    return;
  let totalComponents = components.length;
  if (components[totalComponents - 2] === "/") {
    return {
      components: components.slice(0, totalComponents - 2),
      alpha: components[totalComponents - 1]
    };
  }
  if (components[totalComponents - 2] != null && (components[totalComponents - 2].endsWith("/") || components[totalComponents - 1].startsWith("/"))) {
    const removed = components.splice(totalComponents - 2);
    components.push(removed.join(" "));
    --totalComponents;
  }
  const withAlpha = getComponents(components[totalComponents - 1], "/", 2);
  if (!withAlpha)
    return;
  if (withAlpha.length === 1 || withAlpha[withAlpha.length - 1] === "")
    return { components };
  const alpha = withAlpha.pop();
  components[totalComponents - 1] = withAlpha.join("/");
  return {
    components,
    alpha
  };
}

exports.CONTROL_MINI_NO_NEGATIVE = CONTROL_MINI_NO_NEGATIVE;
exports.colorOpacityToString = colorOpacityToString;
exports.colorResolver = colorResolver;
exports.colorToString = colorToString;
exports.colorableShadows = colorableShadows;
exports.cornerMap = cornerMap;
exports.directionMap = directionMap;
exports.directionSize = directionSize;
exports.getBracket = getBracket;
exports.getComponent = getComponent;
exports.getComponents = getComponents;
exports.globalKeywords = globalKeywords;
exports.h = h;
exports.handler = handler;
exports.hasParseableColor = hasParseableColor;
exports.hex2rgba = hex2rgba;
exports.insetMap = insetMap;
exports.makeGlobalStaticRules = makeGlobalStaticRules;
exports.numberWithUnitRE = numberWithUnitRE;
exports.parseColor = parseColor$1;
exports.parseCssColor = parseCssColor;
exports.positionMap = positionMap;
exports.resolveBreakpoints = resolveBreakpoints;
exports.resolveVerticalBreakpoints = resolveVerticalBreakpoints;
exports.splitShorthand = splitShorthand;
exports.valueHandlers = valueHandlers;
exports.xyzMap = xyzMap;
