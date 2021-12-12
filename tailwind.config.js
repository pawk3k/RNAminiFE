// eslint-disable-next-line
const colors = {
  'dashas-purple': '#6100ff',
  'dashas-pink': '#FCEAFF',
  'dashas-red': '#FF0000',
};

module.exports = {
  purge: [],
  important: true,
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors,
      transitionProperty: {
        width: 'width',
        spacing: 'margin, padding',
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['even', 'odd'],
      transform: ['active', 'hover'],
      scale: ['group-hover'],
    },
  },
  // eslint-disable-next-line
  plugins: [require('tailwindcss-textshadow')],
};
