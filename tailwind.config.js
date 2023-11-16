/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./layout/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'naranja': '#ff9628',
        'vio_claro': '#854fcb',
        'vio_oscuro': '#5a328d',
        'fondo': '#ffffff'
      },
    },
  },
  plugins: [],
}
