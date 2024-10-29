// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        productImgBg: "#FAF8F6",
        customOrange: "#EA580C",
      },
      fontSize: {
        customH1: "5.5vw",
      },
      borderWidth: {
        customBorder: "0.3vw",
      },
    },
  },
  plugins: [],
};
