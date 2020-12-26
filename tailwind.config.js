const colors = require('tailwindcss/colors')

module.exports = {
  purge: {
    content: process.env.NODE_ENV !== 'development' && [
      './components/**/*.js',
      './pages/**/*.js',
    ],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      minHeight: {
        '(screen-24)': 'calc(100vh - 6rem)',
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        gray: colors.coolGray,
        purple: colors.violet,
        red: colors.red,
        lime: colors.lime,
        yellow: colors.amber,
        green: {
          750: '#617f41',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
}
