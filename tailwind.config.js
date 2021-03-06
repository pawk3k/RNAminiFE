const colors = {
  'dashas-purple': '#6100ff',
  'dashas-pink': '#FCEAFF',
  'dashas-red': '#FF0000',
};

module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors,
      transitionProperty: {
        width: 'width',
        spacing: 'margin, padding',
      },
    },
  },
  // eslint-disable-next-line global-require
  plugins: [require('tailwindcss-textshadow')],
};
