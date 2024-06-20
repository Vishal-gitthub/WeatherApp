/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage:{
        'bg-img': "url(https://source.unsplash.com/400x400/?clouds)"
      }
    },
  },
  plugins: [],
};
