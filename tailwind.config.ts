import type { Config } from "tailwindcss";
const { nextui } = require("@nextui-org/theme");

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/slider.js",
    // "./node_modules/@nextui-org/theme/dist/components/(slider|).js",
  ],
  theme: {
    extend: {
      screens: {
        "max-sm": { max: "768px" }, // Max width (sm breakpoint)
        "max-xsm": { max: "580px" }, // Max width (xsm breakpoint)
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};

export default config;
