/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        forest: {
          50:  '#f0f7f0',
          100: '#d9edd9',
          200: '#b3dbb3',
          300: '#7fc07f',
          400: '#4fa04f',
          500: '#2d7d2d',
          600: '#1e6b1e',
          700: '#155515',
          800: '#0f3f0f',
          900: '#0a2d0a',
          950: '#051805',
        },
        gold: {
          400: '#e8c547',
          500: '#d4a017',
          600: '#b8860b',
        }
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"Source Serif 4"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        sans: ['"DM Sans"', 'sans-serif'],
      },
      animation: {
        'slide-up': 'slideUp 0.7s ease forwards',
        'fade-in': 'fadeIn 0.6s ease forwards',
        'line-grow': 'lineGrow 1s ease forwards',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        slideUp: {
          from: { opacity: '0', transform: 'translateY(40px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        lineGrow: {
          from: { scaleX: '0' },
          to: { scaleX: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
      backgroundImage: {
        'grid-pattern': "linear-gradient(rgba(21,85,21,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(21,85,21,0.04) 1px, transparent 1px)",
        'dot-pattern': "radial-gradient(circle, rgba(21,85,21,0.12) 1px, transparent 1px)",
      },
      backgroundSize: {
        'grid': '40px 40px',
        'dot': '24px 24px',
      }
    },
  },
  plugins: [],
}
