import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        buttonColor: "rgba(163,40,214,1)",
        secondaryText: "rgba(134, 134, 134, 1)",
        positiveValue: "rgba(3, 172, 0, 1)",
        negativeValue: "rgba(199,0,0,1)",
      },
      spacing: {
        "1/10": "10%",
        "9/20": "45%",
      },
    },
  },
  plugins: [require("daisyui")],
};
export default config;
