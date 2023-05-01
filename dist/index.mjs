import { extractorArbitraryVariants } from '@unocss/extractor-arbitrary-variants';
import { entriesToCss, toArray } from '@unocss/core';
import './shared/preset-mini.46b4a7e7.mjs';
import { r as rules } from './shared/preset-mini.ad7a639d.mjs';
export { p as parseColor } from './shared/preset-mini.acf4efb2.mjs';
export { c as colors } from './shared/preset-mini.74b45c11.mjs';
import { t as theme } from './shared/preset-mini.a749a848.mjs';
export { t as theme } from './shared/preset-mini.a749a848.mjs';
import { v as variants } from './shared/preset-mini.780dcf0b.mjs';
import './shared/preset-mini.780f5e22.mjs';

const preflights = [
  {
    layer: "preflights",
    getCSS(ctx) {
      if (ctx.theme.preflightBase) {
        const css = entriesToCss(Object.entries(ctx.theme.preflightBase));
        const roots = toArray(ctx.theme.preflightRoot ?? ["*,::before,::after", "::backdrop"]);
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
    theme,
    rules,
    variants: variants(options),
    options,
    prefix: options.prefix,
    postprocess: VarPrefixPostprocessor(options.variablePrefix),
    preflights: options.preflight ? normalizePreflights(preflights, options.variablePrefix) : [],
    extractorDefault: options.arbitraryVariants === false ? void 0 : extractorArbitraryVariants
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

export { VarPrefixPostprocessor, presetPruno as default, normalizePreflights, preflights, presetPruno };
