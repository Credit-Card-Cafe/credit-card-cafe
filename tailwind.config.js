/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        'main': "#1fde78",
        'main-gray': "#262626",
        'white-warm': "#d6c0a5",
        'main-dark-green': '#00330f',
        "main-dark": "#052112",
        'alt': "#fdf8f4",
        'alt-dark': "#807d7b",
        'accent-one': "#78DEAB",
        'accent-one-hover': '#67bf93',
        'accent-one-dark': "#305945",
        'accent-two': "#69eae6",
        'accent-two-dark': "#285958"
      }
    },
  },
  plugins: [],
}

