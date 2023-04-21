'use strict';

const core = require('@unocss/core');
const colors = require('./preset-mini.d7d4b4ea.cjs');

function variantMatcher(name, handler) {
  let re;
  return {
    name,
    match(input, ctx) {
      if (!re)
        re = new RegExp(`^${core.escapeRegExp(name)}(?:${ctx.generator.config.separators.join("|")})`);
      const match = input.match(re);
      if (match) {
        return {
          matcher: input.slice(match[0].length),
          handle: (input2, next) => next({
            ...input2,
            ...handler(input2)
          })
        };
      }
    },
    autocomplete: `${name}:`
  };
}
function variantParentMatcher(name, parent) {
  let re;
  return {
    name,
    match(input, ctx) {
      if (!re)
        re = new RegExp(`^${core.escapeRegExp(name)}(?:${ctx.generator.config.separators.join("|")})`);
      const match = input.match(re);
      if (match) {
        return {
          matcher: input.slice(match[0].length),
          handle: (input2, next) => next({
            ...input2,
            parent: `${input2.parent ? `${input2.parent} $$ ` : ""}${parent}`
          })
        };
      }
    },
    autocomplete: `${name}:`
  };
}
function variantGetBracket(prefix, matcher, separators) {
  if (matcher.startsWith(`${prefix}[`)) {
    const [match, rest] = colors.getBracket(matcher.slice(prefix.length), "[", "]") ?? [];
    if (match && rest) {
      for (const separator of separators) {
        if (rest.startsWith(separator))
          return [match, rest.slice(separator.length), separator];
      }
      return [match, rest, ""];
    }
  }
}
function variantGetParameter(prefix, matcher, separators) {
  if (matcher.startsWith(prefix)) {
    const body = variantGetBracket(prefix, matcher, separators);
    if (body) {
      const [label = "", rest = body[1]] = variantGetParameter("/", body[1], separators) ?? [];
      return [body[0], rest, label];
    }
    for (const separator of separators.filter((x) => x !== "/")) {
      const pos = matcher.indexOf(separator, prefix.length);
      if (pos !== -1) {
        const labelPos = matcher.indexOf("/", prefix.length);
        const unlabelled = labelPos === -1 || pos <= labelPos;
        return [
          matcher.slice(prefix.length, unlabelled ? pos : labelPos),
          matcher.slice(pos + separator.length),
          unlabelled ? "" : matcher.slice(labelPos + 1, pos)
        ];
      }
    }
  }
}

exports.variantGetBracket = variantGetBracket;
exports.variantGetParameter = variantGetParameter;
exports.variantMatcher = variantMatcher;
exports.variantParentMatcher = variantParentMatcher;
