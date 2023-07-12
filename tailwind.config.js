/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

module.exports = {
  content: ["./docs/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        nunito: "'Nunito Sans', sans-serif",
        neony: "'Neony', sans-serif",
      },
      colors: {
        dark: '#121212',
        darkLight: '#222',
        CyanNeon: '#0ef',
        Pinksparent: 'rgba(255, 156, 199, 1)'
      },
      blur: {
        xs: '2px',
      },
      boxShadow: {
        neon: '0 0 20px #0ef, inset 0 0 #0ef',
      },
      textShadow: {
        sm: '0 1px 2px var(--tw-shadow-color)',
        DEFAULT: '0 2px 4px var(--tw-shadow-color)',
        lg: '0 8px 16px var(--tw-shadow-color)',
        neon: '0 0 10px var(--tw-shadow-color), 0 0 20px var(--tw-shadow-color), 0 0 40px var(--tw-shadow-color), 0 0 80px var(--tw-shadow-color), 0 0 160px var(--tw-shadow-color)'
      },
      keyframes: {
        neonBlink: {
          '0%, 60%, 66%, 68%, 79%, 100%': { color: 'var(--tw-text-color)', 'text-shadow': '0 0 10px #0ef, 0 0 20px #0ef, 0 0 40px #0ef, 0 0 80px #0ef, 0 0 160px #0ef'},
          '61%, 65%, 67%, 69%, 78%': { color: '#222', 'text-shadow': 'none'},
          
        },
      },
      animation: {
        neonBlink: 'neonBlink 5s linear infinite',
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') }
      )
    }),
  ],
}

