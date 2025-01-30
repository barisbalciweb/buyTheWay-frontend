// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  mode: "jit",
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
        button: "4vw",
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
        input: "13vw",
        button: "14vw",
      },
    },
  },
  plugins: [],
};
