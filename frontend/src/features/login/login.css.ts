import { globalStyle, style } from '@vanilla-extract/css';
import { colors } from '../../theme.css';

export const wrapper = style({
  display: 'flex',
  flexDirection: 'column',
  width: 'clamp(300px, 90%, 360px)',

  background: colors.smoke,
  padding: '0 2em',
  paddingTop: '1em',
  borderRadius: '0.5em',
  zIndex: 3,
});

globalStyle(`${wrapper} > h1`, {
  color: colors.red,
  fontSize: 'clamp(1.5em, 3em, 4.5em)',
  lineHeight: 0,
  fontWeight: 600,
  textAlign: 'center',
  marginTop: '0.75em',
  marginBottom: '1em',
});

globalStyle(`${wrapper} > form > *`, {
  textAlign: 'center',
  width: '100%',
  marginBottom: '1.75em',
});

export const passwordField = style({
  display: 'flex',
});

globalStyle(`${passwordField} > *`, {
  border: `1px solid ${colors.gray}`,
  textAlign: 'center',
});

globalStyle(`${passwordField} > input`, {
  borderRight: 0,
  borderRadius: '0.75em 0 0 0.75em',
  minWidth: 'calc(100% - 4em)',
  textIndent: '2em',
});

globalStyle(`${passwordField} > span`, {
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '0.875rem',
  borderLeft: 0,
  cursor: 'pointer',
  minWidth: '4em',
  borderRadius: '0 0.75em 0.75em 0',
});

export const actionW = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingLeft: '0.5em',
});
