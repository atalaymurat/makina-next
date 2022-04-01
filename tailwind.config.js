const colors = require('tailwindcss/colors')

module.exports = {
  content:  [
    './components/**/*.js',
    './pages/**/*.js',
    './lib/**/*.js',
  ],

  theme: {
    extend: {
      minHeight: {
        '(screen-24)': 'calc(100vh - 6rem)',
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        gray: colors.gray,
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
  plugins: [
    require('@tailwindcss/forms'),
    require('@jinsung.lim/tailwindcss-filters'),
  ],
}
