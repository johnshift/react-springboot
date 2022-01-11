import {
  createGlobalTheme,
  globalKeyframes,
  globalStyle,
  keyframes,
  style,
} from '@vanilla-extract/css';

export const colors = createGlobalTheme(':root', {
  black: 'hsl(0, 0%, 15%)',
  white: 'hsl(0, 0%, 93%)',

  smoke: 'hsl(0, 0%, 96%)',
  smokeDim: 'hsl(0, 0%, 93%)',
  smokeDim2: 'hsl(0, 0%, 90%)',

  gray: 'hsl(240, 5%, 90%)',
  grayDk: 'hsl(0, 0%, 66%)',

  red: 'hsl(0, 86%, 38%)',
  redL1: 'hsl(0, 72%, 51%)',
});

createGlobalTheme('[data-theme="dark"]', colors, {
  black: 'hsl(0, 0%, 80%)',
  white: 'hsl(0, 0%, 7%)',

  smoke: 'hsl(0, 0%, 15%)',
  smokeDim: 'hsl(0, 0%, 13%)',
  smokeDim2: 'hsl(0, 0%, 10%)',

  gray: 'hsl(240, 5%, 10%)',
  grayDk: 'hsl(0, 0%, 34%)',

  red: 'hsl(0, 86%, 38%)',
  redL1: 'hsl(0, 72%, 51%)',
});

globalStyle('body', {
  backgroundColor: colors.white,
  color: colors.black,
  fontFamily: '"Arial", sans-serif',
});

globalStyle('a', {
  color: 'inherit',
});

globalStyle('a:hover', {
  color: colors.red,
  textDecoration: 'underline',
});

globalKeyframes('pulse', {
  '0%, 100%': {
    opacity: 1,
  },
  '50%': {
    opacity: 0.5,
  },
});

export const animatePulse = style({
  animation: `2s cubic-bezier(0.4, 0, 0.6, 1) infinite pulse`,
});

const shimmer = keyframes({
  '0%': {
    backgroundPosition: '-1000px 0',
  },
  '100%': {
    backgroundPosition: '1000px 0',
  },
});

export const animateShimmer = style({
  animation: `${shimmer} 2.4s infinite linear`,
  background: 'linear-gradient(to right, #ddd 4%, #e8e8e8 25%, #ddd 36%) ',
  backgroundSize: '1000px 100%',
});
