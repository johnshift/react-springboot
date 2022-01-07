import { style } from '@vanilla-extract/css';
import { colors } from '../../theme.css';

export const wrapper = style({
  color: colors.black,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
});
