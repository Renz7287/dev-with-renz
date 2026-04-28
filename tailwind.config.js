/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        head: ['"Playfair Display"', 'serif'],
        body: ['"DM Sans"', 'sans-serif'],
      },
      colors: {
        gold: {
          DEFAULT: '#c8a96e',
          light: '#e8c98a',
          dark: '#9a7a45',
        },
        dark: {
          900: '#0d0d0d',
          800: '#151515',
          700: '#1d1d1d',
          600: '#252525',
          500: '#2f2f2f',
        },
      },
      keyframes: {
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-up': {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease forwards',
        'slide-up': 'slide-up 0.3s ease forwards',
      },
    },
  },
  plugins: [],
}
