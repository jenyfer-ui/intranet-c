/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'navy-900': '#1e2044',
        'navy-800': '#2a2d5a',
        'navy-700': '#383b70',
      },
    },
  },
  plugins: [],
};
