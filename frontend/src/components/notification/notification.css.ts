import { keyframes, style, styleVariants } from '@vanilla-extract/css';
import { colors } from '../../theme.css';

export const container = style({
  position: 'fixed',
  bottom: '2em',
  display: 'flex',
  justifyContent: 'center',
});

const base = style({
  display: 'flex',
  borderRadius: '0.5em',
  padding: '1em 1.5em',
  color: colors.white,
  fontWeight: 600,
  width: '100%',
  transition: 'all 0.3s',
});

export const type = styleVariants({
  long: [
    base,
    {
      background: 'hsl(21, 90%, 48%)',
    },
  ],
  loading: [
    base,
    {
      background: 'hsl(38, 92%, 50%)',
    },
  ],
  info: [
    base,
    {
      background: 'hsl(213, 94%, 68%)',
    },
  ],
  success: {
    background: 'hsl(142, 76%, 36%)',
  },
  error: [
    base,
    {
      background: 'hsl(0, 74%, 42%)',
    },
  ],
});

const spinKF = keyframes({
  from: {
    transform: 'rotate(0deg)',
  },
  to: {
    transform: 'rotate(360deg)',
  },
});

export const spinner = style({
  height: '1.25rem',
  width: '1.25rem',
  marginRight: '0.75rem',
  animation: `1s linear infinite ${spinKF}`,
});

const shakeKF = keyframes({
  '40%': {
    transform: 'translateX(0px)',
  },
  '55%': {
    transform: 'translateX(6px)',
  },
  '60%': {
    transform: 'translateX(-6px)',
  },
  '80%': {
    transform: 'translateX(4px)',
  },
  '85%': {
    transform: 'translateX(-4px)',
  },
  '90%': {
    transform: 'translateX(2px)',
  },
  '95%': {
    transform: 'translateX(-2px)',
  },
  '100%': {
    transform: 'translateX(0px)',
  },
});

export const shake = style({
  animation: `0.6s ${shakeKF}`,
});

export const appear = style({
  transform: 'translateY(-20px)',
  opacity: 0,
});

export const appearActive = style({
  transform: 'translateY(0px)',
  opacity: 1,
});

export const exit = style({
  transform: 'translateY(0px)',
  opacity: 1,
});

export const exitActive = style({
  transform: 'translateY(20px)',
  opacity: 0,
});
