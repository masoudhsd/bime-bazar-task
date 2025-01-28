import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        yellow: "#FFC453",
        subTextGray: "#757575",
        buttonTextGray: "#858484",
        buttonBgGray: "#DAD8D8",
        paperBgGray: "#F2F2F2",
        error: "#E61F10",
      },
      fontFamily: {
        sans: ["var(--font-vazirmatn)", ...fontFamily.sans],
      },
    },
  },
  plugins: [],
} satisfies Config;
