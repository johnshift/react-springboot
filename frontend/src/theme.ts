import { extendTheme, ThemeConfig } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false
};

const theme = extendTheme({
  config,
  styles: {
    global: {
      body: {
        bg: 'white',
        color: 'black'
      }
    }
  },
  breakpoints: createBreakpoints({
    sm: '48em', // tab
    md: '62em', // small screen
    lg: '85em', // laptop common
    xl: '96em' // hd
  }),
  colors: {
    black: '#2b2c2e',
    blackt: '#5f6161',
    white: '#f2f2f2',
    whiter: '#fcfcfc',
    blackhl: '#343538',
    whitehl: '#e6e7e8'
  }
});

export default theme;
