// eslint-disable-next-line
const colors = {
  'dashas-purple': '#6100ff',
  'dashas-pink': '#FCEAFF',
  'dashas-red': '#FF0000',
};

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors,
    },
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
