import { space } from "postcss/lib/list";

// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      spacing: {
        header: "17vw",
      },
      colors: {
        productImgBg: "#FAF8F6",
        customOrange: "#EA580C",
        customGray: "#D0D0D0",
      },
      fontSize: {
        customH1: "5.5vw",
      },
      fontFamily: {
        comfortaa: ['"Comfortaa"', "sans-serif"],
      },
      borderWidth: {
        customBorder: "0.3vw",
      },
    },
  },
  plugins: [],
};
