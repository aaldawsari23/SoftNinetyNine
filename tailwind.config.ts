import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#0b0b0b',
          light: '#141414',
        },
        primary: {
          DEFAULT: '#E50914',
          hover: '#F40612',
        },
        text: {
          DEFAULT: '#FFFFFF',
          secondary: '#B3B3B3',
          muted: '#7A7A7A',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
