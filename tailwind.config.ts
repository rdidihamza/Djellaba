import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Core palette
        brown: {
          950: '#0D0600',
          900: '#1C0F08',
          800: '#2C1810',
          700: '#3D2314',
          600: '#5C3420',
          500: '#7A4A2D',
          400: '#9B6444',
          300: '#B88A6A',
          200: '#D4B49A',
          100: '#EDD8C6',
          50:  '#F7EFE6',
        },
        gold: {
          900: '#5C4200',
          800: '#7A5800',
          700: '#9A7200',
          600: '#B8900A',
          500: '#C9A44A',
          400: '#D4B56A',
          300: '#E0CA90',
          200: '#EADDB5',
          100: '#F3EDD5',
          50:  '#FAF6EE',
        },
        sand: {
          DEFAULT: '#F2E8D0',
          dark: '#E8D8B8',
          light: '#FAF6EE',
        },
        cream: '#FAF6EE',
        parchment: '#F5EDD8',
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
      },
      fontSize: {
        'display-2xl': ['4.5rem', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-xl': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-lg': ['3rem', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        'display-md': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'display-sm': ['1.875rem', { lineHeight: '1.25' }],
        'display-xs': ['1.5rem', { lineHeight: '1.3' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
        '38': '9.5rem',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'fade-up': 'fadeUp 0.7s ease-out',
        'scale-in': 'scaleIn 0.4s ease-out',
        'slide-in-right': 'slideInRight 0.4s ease-out',
        'shimmer': 'shimmer 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(100%)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      backgroundImage: {
        'grain': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E\")",
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'luxury': '0 4px 24px rgba(28, 15, 8, 0.08), 0 1px 4px rgba(28, 15, 8, 0.04)',
        'luxury-lg': '0 8px 48px rgba(28, 15, 8, 0.12), 0 2px 8px rgba(28, 15, 8, 0.06)',
        'luxury-xl': '0 16px 64px rgba(28, 15, 8, 0.16), 0 4px 16px rgba(28, 15, 8, 0.08)',
        'gold': '0 0 0 1px rgba(201, 164, 74, 0.3)',
        'gold-lg': '0 4px 20px rgba(201, 164, 74, 0.2)',
      },
    },
  },
  plugins: [],
}

export default config
