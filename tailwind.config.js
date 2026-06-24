/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        peach: "#FFDAB9",
        cream: "#FFF8DC",
        mint: "#B2E0D8",
        warm_gray: "#D3D3D3",
        off_white: "#F5F5F0",
        soft_orange: "#FFD4A3",
        taupe: "#6B5B4A",
      },
    },
  },
  plugins: [],
};
