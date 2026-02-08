/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        woodDark: '#2D2926',
        woodGold: '#A66D3B',
        woodLight: '#C4936A',
        appBg: '#F8F5F2',
      },
      fontFamily: {
        script: ['"Dancing Script"', 'cursive'],
      },
    },
  },
  plugins: [],
}