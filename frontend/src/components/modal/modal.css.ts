import { style } from '@vanilla-extract/css';

export const container = style({
  position: 'fixed',
  left: 0,
  bottom: 0,
  right: 0,
  top: 0,
  background: 'rgba(0,0,0,0.5)',
  display: 'grid',
  placeItems: 'center',
});

export const wrapper = style({
  display: 'grid',
  placeItems: 'center',
  minWidth: 'min(360px, 80%)',
});
