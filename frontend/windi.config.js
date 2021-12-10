

module.exports = {
  theme: {
		// colors: {
		// 	bg2: '#1d1d1d',
		// 	red: import('windicss/colors').then(colors => colors.red),
		// },
    screens: {
      sm: { max: "767px" },
      md: { min: "768px" },
      lg: { min: "1279px" },
      xl: { min: "1500px" },
    },
  },
	plugins: [
    // Other plugins
    require('@windicss/plugin-animations')({
      settings: {
        animatedSpeed: 3000,
        animationDelaySpeed: 1000,
        heartBeatSpeed: 1000,
        hingeSpeed: 2000,
        bounceInSpeed: 750,
        bounceOutSpeed: 750,
      },
    }),
  ],
};
