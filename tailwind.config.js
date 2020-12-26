
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
      colors: {
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
