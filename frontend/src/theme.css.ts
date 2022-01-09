import { createGlobalTheme, globalStyle } from '@vanilla-extract/css';

export const colors = createGlobalTheme(':root', {
  black: 'hsl(0, 0%, 15%)',
  white: 'hsl(0, 0%, 93%)',

  smoke: 'hsl(0, 0%, 96%)',
  smokeDim: 'hsl(0, 0%, 90%)',

  gray: 'hsl(240, 5%, 90%)',

  red: 'hsl(0, 86%, 38%)',
});

createGlobalTheme('[data-theme="dark"]', colors, {
  black: 'hsl(0, 0%, 80%)',
  white: 'hsl(0, 0%, 7%)',

  smoke: 'hsl(0, 0%, 15%)',
  smokeDim: 'hsl(0, 0%, 10%)',

  gray: 'hsl(240, 5%, 10%)',

  red: 'hsl(0, 86%, 38%)',
});

globalStyle('body', {
  backgroundColor: colors.white,
  color: colors.black,
  fontFamily: '"Arial", sans-serif',
});
