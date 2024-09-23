import type { Config } from "tailwindcss";
import { brand } from "./theme";

const config: Config = {
  content: ["./index.html", "./**/*.{vue,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-color": "var(--primary-color)",
        "secondary-color": "var(--text-color-secondary)",
        brand,
      },
    },
  },
  plugins: [],
};

export default config;
