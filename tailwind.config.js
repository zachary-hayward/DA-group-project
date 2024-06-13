/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './client/**/*.{js,ts,jsx,tsx}'],

  theme: {
    extend: {
      colors: {
        kks: {
          black: '#333333',
          grey: '#dcd8d6',
          blue: '#364da1',
          wine: '#4f0404'
        }
      }
    },
  },
  plugins: [],
}
