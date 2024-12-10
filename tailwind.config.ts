import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        "max-sm": { max: "768px" }, // Max width (sm breakpoint)
        "max-xsm": { max: "580px" }, // Max width (xsm breakpoint)
      },
    },
  },
  plugins: [],
};

export default config;
