/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'myBg': "url(https://img.freepik.com/free-vector/digital-global-currency-icons-concept-background_1017-17455.jpg)",
      }
    },
  },
  plugins: [],
}

