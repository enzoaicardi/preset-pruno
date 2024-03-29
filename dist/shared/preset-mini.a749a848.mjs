import { c as colors } from './preset-mini.74b45c11.mjs';
import { T as transformBase, U as boxShadowsBase, V as ringBase } from './preset-mini.46b4a7e7.mjs';
import '@unocss/core';
import './preset-mini.acf4efb2.mjs';

const fontFamily = {
  sans: [
    "ui-sans-serif",
    "system-ui",
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    '"Noto Sans"',
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
    '"Noto Color Emoji"'
  ].join(","),
  serif: [
    "ui-serif",
    "Georgia",
    "Cambria",
    '"Times New Roman"',
    "Times",
    "serif"
  ].join(","),
  mono: [
    "ui-monospace",
    "SFMono-Regular",
    "Menlo",
    "Monaco",
    "Consolas",
    '"Liberation Mono"',
    '"Courier New"',
    "monospace"
  ].join(",")
};
const fontSize = {
  "xs": ["0.75rem", "1rem"],
  "sm": ["0.875rem", "1.25rem"],
  "base": ["1rem", "1.5rem"],
  "lg": ["1.125rem", "1.75rem"],
  "xl": ["1.25rem", "1.75rem"],
  "2xl": ["1.5rem", "2rem"],
  "3xl": ["1.875rem", "2.25rem"],
  "4xl": ["2.25rem", "2.5rem"],
  "5xl": ["3rem", "1"],
  "6xl": ["3.75rem", "1"],
  "7xl": ["4.5rem", "1"],
  "8xl": ["6rem", "1"],
  "9xl": ["8rem", "1"]
};
const textIndent = {
  "DEFAULT": "1.5rem",
  "xs": "0.5rem",
  "sm": "1rem",
  "md": "1.5rem",
  "lg": "2rem",
  "xl": "2.5rem",
  "2xl": "3rem",
  "3xl": "4rem"
};
const textStrokeWidth = {
  DEFAULT: "1.5rem",
  none: "0",
  sm: "thin",
  md: "medium",
  lg: "thick"
};
const textShadow = {
  DEFAULT: ["0 0 1px rgba(0,0,0,0.2)", "0 0 1px rgba(1,0,5,0.1)"],
  none: "0 0 rgba(0,0,0,0)",
  sm: "1px 1px 3px rgba(36,37,47,0.25)",
  md: ["0 1px 2px rgba(30,29,39,0.19)", "1px 2px 4px rgba(54,64,147,0.18)"],
  lg: ["3px 3px 6px rgba(0,0,0,0.26)", "0 0 5px rgba(15,3,86,0.22)"],
  xl: ["1px 1px 3px rgba(0,0,0,0.29)", "2px 4px 7px rgba(73,64,125,0.35)"]
};
const lineHeight = {
  none: "1",
  tight: "1.25",
  snug: "1.375",
  normal: "1.5",
  relaxed: "1.625",
  loose: "2"
};
const letterSpacing = {
  tighter: "-0.05em",
  tight: "-0.025em",
  normal: "0em",
  wide: "0.025em",
  wider: "0.05em",
  widest: "0.1em"
};
const wordSpacing = letterSpacing;

const breakpoints = {
  "2xs": "26rem",
  "xs": "32rem",
  "sm": "40rem",
  "md": "48rem",
  "lg": "64rem",
  "xl": "80rem",
  "2xl": "90rem",
  "3xl": "96rem"
};
const verticalBreakpoints = { ...breakpoints };
const lineWidth = {
  DEFAULT: "1px",
  none: "0"
};
const spacing = {
  "DEFAULT": "1rem",
  "none": "0",
  "xs": "0.75rem",
  "sm": "0.875rem",
  "lg": "1.125rem",
  "xl": "1.25rem",
  "2xl": "1.5rem",
  "3xl": "1.875rem",
  "4xl": "2.25rem",
  "5xl": "3rem",
  "6xl": "3.75rem",
  "7xl": "4.5rem",
  "8xl": "6rem",
  "9xl": "8rem"
};
const duration = {
  DEFAULT: "150ms",
  none: "0s",
  75: "75ms",
  100: "100ms",
  150: "150ms",
  200: "200ms",
  300: "300ms",
  500: "500ms",
  700: "700ms",
  1e3: "1000ms"
};
const borderRadius = {
  "DEFAULT": "0.25rem",
  "none": "0",
  "sm": "0.125rem",
  "md": "0.375rem",
  "lg": "0.5rem",
  "xl": "0.75rem",
  "2xl": "1rem",
  "3xl": "1.5rem",
  "full": "9999px"
};
const boxShadow = {
  "DEFAULT": ["var(--un-shadow-inset) 0 1px 3px 0 rgba(0,0,0,0.1)", "var(--un-shadow-inset) 0 1px 2px -1px rgba(0,0,0,0.1)"],
  "none": "0 0 rgba(0,0,0,0)",
  "sm": "var(--un-shadow-inset) 0 1px 2px 0 rgba(0,0,0,0.05)",
  "md": ["var(--un-shadow-inset) 0 4px 6px -1px rgba(0,0,0,0.1)", "var(--un-shadow-inset) 0 2px 4px -2px rgba(0,0,0,0.1)"],
  "lg": ["var(--un-shadow-inset) 0 10px 15px -3px rgba(0,0,0,0.1)", "var(--un-shadow-inset) 0 4px 6px -4px rgba(0,0,0,0.1)"],
  "xl": ["var(--un-shadow-inset) 0 20px 25px -5px rgba(0,0,0,0.1)", "var(--un-shadow-inset) 0 8px 10px -6px rgba(0,0,0,0.1)"],
  "2xl": "var(--un-shadow-inset) 0 25px 50px -12px rgba(0,0,0,0.25)",
  "inner": "inset 0 2px 4px 0 rgba(0,0,0,0.05)"
};
const easing = {
  "DEFAULT": "cubic-bezier(0.4, 0, 0.2, 1)",
  "linear": "linear",
  "in": "cubic-bezier(0.4, 0, 1, 1)",
  "out": "cubic-bezier(0, 0, 0.2, 1)",
  "in-out": "cubic-bezier(0.4, 0, 0.2, 1)"
};
const ringWidth = {
  DEFAULT: "1px",
  none: "0"
};

const blur = {
  "DEFAULT": "8px",
  "0": "0",
  "sm": "4px",
  "md": "12px",
  "lg": "16px",
  "xl": "24px",
  "2xl": "40px",
  "3xl": "64px"
};
const dropShadow = {
  "DEFAULT": ["0 1px 2px rgba(0,0,0,0.1)", "0 1px 1px rgba(0,0,0,0.06)"],
  "sm": "0 1px 1px rgba(0,0,0,0.05)",
  "md": ["0 4px 3px rgba(0,0,0,0.07)", "0 2px 2px rgba(0,0,0,0.06)"],
  "lg": ["0 10px 8px rgba(0,0,0,0.04)", "0 4px 3px rgba(0,0,0,0.1)"],
  "xl": ["0 20px 13px rgba(0,0,0,0.03)", "0 8px 5px rgba(0,0,0,0.08)"],
  "2xl": "0 25px 25px rgba(0,0,0,0.15)",
  "none": "0 0 rgba(0,0,0,0)"
};

const baseSize = {
  "xs": "20rem",
  "sm": "24rem",
  "md": "28rem",
  "lg": "32rem",
  "xl": "36rem",
  "2xl": "42rem",
  "3xl": "48rem",
  "4xl": "56rem",
  "5xl": "64rem",
  "6xl": "72rem",
  "7xl": "80rem",
  "prose": "65ch"
};
const width = {
  auto: "auto",
  ...baseSize,
  screen: "100vw"
};
const maxWidth = {
  none: "none",
  ...baseSize,
  screen: "100vw"
};
const height = {
  auto: "auto",
  ...baseSize,
  screen: "100vh"
};
const maxHeight = {
  none: "none",
  ...baseSize,
  screen: "100vh"
};
const containers = Object.fromEntries(Object.entries(baseSize).map(([k, v]) => [k, `(max-width: ${v})`]));

const preflightBase = {
  ...transformBase,
  ...boxShadowsBase,
  ...ringBase
};

const theme = {
  width,
  height,
  maxWidth,
  maxHeight,
  minWidth: maxWidth,
  minHeight: maxHeight,
  inlineSize: width,
  blockSize: height,
  maxInlineSize: maxWidth,
  maxBlockSize: maxHeight,
  minInlineSize: maxWidth,
  minBlockSize: maxHeight,
  colors,
  fontFamily,
  fontSize,
  breakpoints,
  verticalBreakpoints,
  borderRadius,
  lineHeight,
  letterSpacing,
  wordSpacing,
  boxShadow,
  textIndent,
  textShadow,
  textStrokeWidth,
  blur,
  dropShadow,
  easing,
  lineWidth,
  spacing,
  duration,
  ringWidth,
  preflightBase,
  containers
};

export { containers as A, fontSize as a, blur as b, textIndent as c, dropShadow as d, textStrokeWidth as e, fontFamily as f, textShadow as g, letterSpacing as h, breakpoints as i, lineWidth as j, duration as k, lineHeight as l, borderRadius as m, boxShadow as n, easing as o, preflightBase as p, baseSize as q, ringWidth as r, spacing as s, theme as t, width as u, verticalBreakpoints as v, wordSpacing as w, maxWidth as x, height as y, maxHeight as z };
