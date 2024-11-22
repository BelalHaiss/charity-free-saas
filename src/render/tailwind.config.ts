import type { Config } from "tailwindcss";
import { brand } from "./theme";

const config: Config = {
  content: ["./index.html", "./**/*.{vue,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-color": "var(--primary-color)",
        "secondary-color": "var(--text-color-secondary)",
        "text-black": "var(--text-black)",
        brand,
      },
    },
  },
  plugins: [],
};

export default config;
