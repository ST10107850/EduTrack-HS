/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors:{
        "primaryColor": "#060721",
        "secondaryColor": "#006AFF",
        "tertiaryColor": "#FF6726"
      }
    },
  },
  plugins: [],
};
