module.exports = {
  mode: 'jit',
  content: ['./public/**/*.html', './src/**/*.{astro,js,jsx,svelte,ts,tsx,vue}'],
	theme: {
		screens: {
										// phones
			md: "48em", 	// tab, small laptop
			lg: "66em", 	// avg laptop
			hd: "98em", 	// large laptop
		},
		extend: {
			animation: {
				shake: 'shake 0.65s'
			},
			keyframes: {
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
	}
};