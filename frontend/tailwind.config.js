module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      // phones
      md: '48em', // tab, small laptop
      lg: '66em', // avg laptop
      hd: '98em' // large laptop
    },
    extend: {
      animation: {
        shimmer: 'shimmer 2s infinite linear',
        shake: 'shake 0.65s'
      },
      keyframes: {
        shimmer: {
          '0%': {
            'background-position': '-1000px 0'
          },
          '100%': {
            'background-position': '1000px 0'
          }
        },
        shake: {
          '40%': {
            transform: 'translateX(0px)'
          },
          '55%': {
            transform: 'translateX(6px)'
          },
          '60%': {
            transform: 'translateX(-6px)'
          },
          '80%': {
            transform: 'translateX(4px)'
          },
          '85%': {
            transform: 'translateX(-4px)'
          },
          '90%': {
            transform: 'translateX(2px)'
          },
          '95%': {
            transform: 'translateX(-2px)'
          },
          '100%': {
            transform: 'translateX(0px)'
          }
        }
      }
    }
  },
  plugins: []
}
