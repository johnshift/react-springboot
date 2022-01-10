import { style, styleVariants } from '@vanilla-extract/css';
import { colors } from '../../theme.css';

const base = style({
  padding: '0.5rem 1rem',
  cursor: 'pointer',
  fontSize: 'inherit',
  fontWeight: 600,
  borderRadius: '0.5rem',
  ':active': {
    transform: 'translateY(0.1rem)',
    boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    transitionProperty: 'background-color',
    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
    transitionDuration: '200ms',
  },
});

export const variants = styleVariants({
  default: [
    base,
    {
      backgroundColor: colors.smoke,
      border: `1px solid ${colors.gray}`,
      ':hover': {
        backgroundColor: colors.smokeDim,
      },
    },
  ],
  primary: [
    base,
    {
      backgroundColor: colors.red,
      color: colors.white,
      border: 0,
      ':hover': {
        backgroundColor: colors.redL1,
      },
    },
  ],
});
