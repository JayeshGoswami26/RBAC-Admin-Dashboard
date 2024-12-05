/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      colors: {
        primary: '#3490DC',
        secondary: '#E74C3C',
        accent: '#F1C40F',
        backgroundColor:"#15073a",
        cardBg:'#25164f'
      }
    },
  },
  plugins: [],
}

