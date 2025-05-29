/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      fontFamily: {
        'pokemon': ['Fredoka One', 'cursive'],
        'body': ['Nunito', 'sans-serif'],
      },
      colors: {
        'pokemon-yellow': '#FFDE00',
        'pokemon-blue': '#3B82C6',
        'pokemon-red': '#E53E3E',
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light"],
  },
}