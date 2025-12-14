/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef2f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          300: '#fda4af',
          400: '#fb7185',
          500: '#8a2c3a', // Royal Maroon (Custom)
          600: '#be123c',
          700: '#9f1239',
          800: '#881337',
          900: '#4c0519',
        },
        royal: {
          maroon: '#8a2c3a',
          gold: '#f5b550',
          cream: '#fdf7ef',
          brown: '#462e24'
        },
        nest: { // Keeping for backward compat temporarily, but remapping
          green: '#8a2c3a', // Remap old green to maroon
          dark: '#462e24',
          yellow: '#f5b550'
        }
      },
      fontFamily: {
        sans: ['Lato', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      }
    },
  },
  plugins: [],
}
