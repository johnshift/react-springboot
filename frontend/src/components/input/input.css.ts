import { style, styleVariants } from '@vanilla-extract/css';
import { colors } from '../../theme.css';

export const base = style({
  padding: '0.75em',
  outline: 'none',
  borderRadius: '0.5em',
  fontSize: 'inherit',
});

export const border = styleVariants({
  default: [base, { border: `1px solid ${colors.gray}` }],
  error: [base, { border: `1px solid ${colors.red}` }],
});
