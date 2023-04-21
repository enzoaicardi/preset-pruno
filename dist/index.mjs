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
        return roots.map((root) => `${root}{${css}}`).join("");
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
