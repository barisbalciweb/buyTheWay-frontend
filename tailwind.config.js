import { width } from "@fortawesome/free-brands-svg-icons/fa42Group";
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
        courierNew: ['"Courier New"', "monospace"],
      },
      borderWidth: {
        customBorder: "0.3vw",
      },
      height: {
        slider: "65vw",
      },
    },
  },
  plugins: [],
};
