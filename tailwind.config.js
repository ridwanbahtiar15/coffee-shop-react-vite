/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        plusJakartaSans: ["Plus Jakarta Sans"],
      },
      colors: {
        primary: "#FF8906",
      },
    },
  },
  plugins: [],
};
