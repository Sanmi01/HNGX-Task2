/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        'hsla-10': 'hsla(10, 83%, 41%, 0.1)',
        // Add more custom background colors as needed
      },
      gridTemplateColumns: {
        'auto-fit-minmax': 'repeat(auto-fit, minmax(120px, auto))',
      },
    },
  },
  plugins: [],
};
