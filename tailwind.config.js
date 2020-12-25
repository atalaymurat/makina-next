module.exports = {
  purge: {
    content: process.env.NODE_ENV !== 'development' && ['./components/**/*.js', './pages/**/*.js'],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
