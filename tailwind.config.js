// eslint-disable-next-line
module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      backgroundColor: ['even', 'odd'],
      transform: ['active', 'hover'],
    },
  },
  // eslint-disable-next-line
  plugins: [require('tailwindcss-textshadow')],
};
