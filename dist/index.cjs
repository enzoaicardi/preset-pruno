'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const extractorArbitraryVariants = require('@unocss/extractor-arbitrary-variants');
const core = require('@unocss/core');
require('./shared/preset-mini.a6e5a967.cjs');
const _default$1 = require('./shared/preset-mini.e7d6efba.cjs');
const colors$1 = require('./shared/preset-mini.d7d4b4ea.cjs');
const colors = require('./shared/preset-mini.bb7dc365.cjs');
const _default = require('./shared/preset-mini.00f6869f.cjs');
const _default$2 = require('./shared/preset-mini.1baba2d5.cjs');
require('./shared/preset-mini.950e178f.cjs');

const preflights = [
  {
    layer: "preflights",
    getCSS(ctx) {
      if (ctx.theme.preflightBase) {
        const css = core.entriesToCss(Object.entries(ctx.theme.preflightBase));
        const roots = core.toArray(ctx.theme.preflightRoot ?? ["*,::before,::after", "::backdrop"]);
        return `*,::before,::after{box-sizing:border-box;border-width:0;border-style:solid;border-color:#e5e7eb;}html{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;tab-size:4;font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"SegoeUI",Roboto,"HelveticaNeue",Arial,"NotoSans",sans-serif,"AppleColorEmoji","SegoeUIEmoji","SegoeUISymbol","NotoColorEmoji";}body{margin:0;line-height:inherit;}hr{height:0;color:inherit;border-top-width:1px;}abbr:where([title]){text-decoration:underlinedotted;}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit;}a{color:inherit;text-decoration:inherit;}b,strong{font-weight:bolder;}code,kbd,samp,pre{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"LiberationMono","CourierNew",monospace;font-size:1em;}small{font-size:80%;}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline;}sub{bottom:-0.25em;}sup{top:-0.5em;}table{text-indent:0;border-color:inherit;border-collapse:collapse;}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;font-weight:inherit;line-height:inherit;color:inherit;margin:0;padding:0;}button,select{text-transform:none;}button,[type='button'],[type='reset'],[type='submit']{-webkit-appearance:button;background-image:none;}:-moz-focusring{outline:auto;}:-moz-ui-invalid{box-shadow:none;}progress{vertical-align:baseline;}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto;}[type='search']{-webkit-appearance:textfield;outline-offset:-2px;}::-webkit-search-decoration{-webkit-appearance:none;}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit;}summary{display:list-item;}blockquote,dl,dd,h1,h2,h3,h4,h5,h6,hr,figure,p,pre{margin:0;}fieldset{margin:0;padding:0;}legend{padding:0;}ol,ul,menu{list-style:none;margin:0;padding:0;}textarea{resize:vertical;}input::placeholder,textarea::placeholder{opacity:1;color:#9ca3af;}button,[role="button"]{cursor:pointer;}:disabled{cursor:default;}img,svg,video,canvas,audio,iframe,embed,object{display:block;vertical-align:middle;}img,video{max-width:100%;height:auto;}[hidden]{display:none;}`
        + roots.map((root) => `${root}{${css}}`).join("");
      }
    }
  }
];

function presetPruno(options = {}) {
  options.dark = options.dark ?? "class";
  options.attributifyPseudo = options.attributifyPseudo ?? false;
  options.preflight = options.preflight ?? true;
  options.variablePrefix = options.variablePrefix ?? "un-";
  return {
    name: "@unocss/preset-pruno",
    theme: _default.theme,
    rules: _default$1.rules,
    variants: _default$2.variants(options),
    options,
    prefix: options.prefix,
    postprocess: VarPrefixPostprocessor(options.variablePrefix),
    preflights: options.preflight ? normalizePreflights(preflights, options.variablePrefix) : [],
    extractorDefault: options.arbitraryVariants === false ? void 0 : extractorArbitraryVariants.extractorArbitraryVariants
  };
}
function VarPrefixPostprocessor(prefix) {
  if (prefix !== "un-") {
    return (obj) => {
      obj.entries.forEach((i) => {
        i[0] = i[0].replace(/^--un-/, `--${prefix}`);
        if (typeof i[1] === "string")
          i[1] = i[1].replace(/var\(--un-/g, `var(--${prefix}`);
      });
    };
  }
}
function normalizePreflights(preflights3, variablePrefix) {
  if (variablePrefix !== "un-") {
    return preflights3.map((p) => ({
      ...p,
      getCSS: (() => async (ctx) => {
        const css = await p.getCSS(ctx);
        if (css)
          return css.replace(/--un-/g, `--${variablePrefix}`);
      })()
    }));
  }
  return preflights3;
}

exports.parseColor = colors$1.parseColor;
exports.colors = colors.colors;
exports.theme = _default.theme;
exports.VarPrefixPostprocessor = VarPrefixPostprocessor;
exports["default"] = presetPruno;
exports.normalizePreflights = normalizePreflights;
exports.preflights = preflights;
exports.presetPruno = presetPruno;
