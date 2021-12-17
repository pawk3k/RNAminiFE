const colors = {
  'dashas-purple': '#6100ff',
  'dashas-pink': '#FCEAFF',
  'dashas-red': '#FF0000',
};

module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors,
      transitionProperty: {
        width: 'width',
        spacing: 'margin, padding',
      },
    },
  },
  plugins: [],
};
