/** @type {import('tailwindcss').Config} */
/*eslint-env node*/

const scrollbar = require("tailwind-scrollbar")

export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        color: {
          whity: "#efefef",
          primary: "#0059ff",
          accent: "#ffc639",
          secondary: "#393e46",
          dark: "#222831",
        },
      },
      screens: {
        pc: "1920px",
        laptop: "1366px",
        "tablet-l": "992px",
        hp: "576px",
        hmin: "425px",
        minni: "375px",
        mini: "320px",
      },
    },
  },
  plugins: [
    scrollbar
    // require("daisyui"),
  ],
}

