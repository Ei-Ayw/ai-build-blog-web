/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'animate-aurora',
    '[--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)]',
    '[--dark-gradient:repeating-linear-gradient(100deg,var(--black)_0%,var(--black)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--black)_16%)]',
    '[--aurora:repeating-linear-gradient(100deg,var(--blue-500)_10%,var(--indigo-300)_15%,var(--blue-300)_20%,var(--violet-200)_25%,var(--blue-400)_30%)]',
    '[background-image:var(--white-gradient),var(--aurora)]',
    'dark:[background-image:var(--dark-gradient),var(--aurora)]',
    '[background-size:300%,_200%]',
    '[background-position:50%_50%,50%_50%]',
    'after:[background-size:200%,_100%]',
    'after:animate-aurora',
    'after:[background-attachment:fixed]',
    'after:mix-blend-difference',
    '[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]',
    'after:content-[""]',
    'after:absolute',
    'after:inset-0',
    'after:dark:[background-image:var(--dark-gradient),var(--aurora)]',
    'after:[background-image:var(--white-gradient),var(--aurora)]',
    'filter',
    'blur-[10px]',
    'invert',
    'dark:invert-0',
    'opacity-50',
    'will-change-transform',
    'pointer-events-none',
    'absolute',
    '-inset-[10px]'
  ],
  theme: {
  	extend: {
  		fontFamily: {
  			sans: [
  				'Inter',
  				'system-ui',
  				'sans-serif'
  			]
  		},
  		colors: {
  			// Design System Color Hierarchy
  			'bg-1': 'hsl(var(--bg-1))',
  			'bg-2': 'hsl(var(--bg-2))',
  			'bg-3': 'hsl(var(--bg-3))',
  			'bg-4': 'hsl(var(--bg-4))',
  			'text-1': 'hsl(var(--text-1))',
  			'text-2': 'hsl(var(--text-2))',
  			'text-3': 'hsl(var(--text-3))',
  			'text-4': 'hsl(var(--text-4))',
  			// Semantic colors
  			'positive': 'hsl(var(--positive))',
  			'negative': 'hsl(var(--negative))',
  			'warning': 'hsl(var(--warning))',
  			'info': 'hsl(var(--info))',
  			// Accent colors
  			teal: {
  				'50': '#f0fdfa',
  				'100': '#ccfbf1',
  				'200': '#99f6e4',
  				'300': '#5eead4',
  				'400': '#2dd4bf',
  				'500': '#14b8a6',
  				'600': '#0d9488',
  				'700': '#0f766e',
  				'800': '#115e59',
  				'900': '#134e4a'
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		animation: {
  			'fade-in-up': 'fadeInUp 0.5s ease-out',
  			'fade-in': 'fadeIn 0.3s ease-out',
  			'scale-in': 'scaleIn 0.2s ease-out',
  			float: 'float 20s ease-in-out infinite',
  			spin: 'spin 1s linear infinite',
  			aurora: 'aurora 60s linear infinite'
  		},
  		keyframes: {
  			fadeInUp: {
  				'0%': {
  					opacity: '0',
  					transform: 'translateY(20px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateY(0)'
  				}
  			},
  			fadeIn: {
  				'0%': {
  					opacity: '0'
  				},
  				'100%': {
  					opacity: '1'
  				}
  			},
  			scaleIn: {
  				'0%': {
  					opacity: '0',
  					transform: 'scale(0.95)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'scale(1)'
  				}
  			},
  			float: {
  				'0%, 100%': {
  					transform: 'translateY(0px) rotate(0deg)'
  				},
  				'33%': {
  					transform: 'translateY(-30px) rotate(120deg)'
  				},
  				'66%': {
  					transform: 'translateY(15px) rotate(240deg)'
  				}
  			},
  			aurora: {
  				'0%': {
  					'background-position': '50% 50%, 50% 50%'
  				},
  				'33%': {
  					'background-position': '350% 50%, 350% 50%'
  				},
  				'66%': {
  					'background-position': '750% 50%, 750% 50%'
  				},
  				'100%': {
  					'background-position': '50% 50%, 50% 50%'
  				}
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
		backgroundImage: {
			'grid-pattern': 'url("data:image/svg+xml,%3csvg width=\'100\' height=\'100\' xmlns=\'http://www.w3.org/2000/svg\'%3e%3cdefs%3e%3cpattern id=\'grid\' width=\'10\' height=\'10\' patternUnits=\'userSpaceOnUse\'%3e%3cpath d=\'M 10 0 L 0 0 0 10\' fill=\'none\' stroke=\'%23e5e7eb\' stroke-width=\'1\'/%3e%3c/pattern%3e%3c/defs%3e%3crect width=\'100\' height=\'100\' fill=\'url(%23grid)\' /%3e%3c/svg%3e")',
			'grid-pattern-light': 'url("data:image/svg+xml,%3csvg width=\'100\' height=\'100\' xmlns=\'http://www.w3.org/2000/svg\'%3e%3cdefs%3e%3cpattern id=\'grid\' width=\'10\' height=\'10\' patternUnits=\'userSpaceOnUse\'%3e%3cpath d=\'M 10 0 L 0 0 0 10\' fill=\'none\' stroke=\'%23f3f4f6\' stroke-width=\'1\'/%3e%3c/pattern%3e%3c/defs%3e%3crect width=\'100\' height=\'100\' fill=\'url(%23grid)\' /%3e%3c/svg%3e")'
		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}
