/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'primary': {
          100: '#5BBA6F',
          300: '#3FA34D',
          500: '#2A9134',
          700: '#137547',
          900: '#054A29',
        }
      },
      fontFamily: {
        'heading_font': ['Roboto', 'sans-serif'],
        'body_font': ['Exo', 'sans-serif']
      }
    }
  },
  plugins: [],
}
