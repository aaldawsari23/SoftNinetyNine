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
          DEFAULT: '#050505',
          light: '#0F0F0F',
          card: '#1A1A1A',
          hover: '#252525',
        },
        primary: {
          DEFAULT: '#FF2E2E',
          hover: '#FF5252',
          dark: '#CC1F1F',
        },
        secondary: {
          DEFAULT: '#00D4FF',
          hover: '#33DFFF',
        },
        accent: {
          DEFAULT: '#FFD700',
          hover: '#FFE033',
        },
        text: {
          DEFAULT: '#FFFFFF',
          secondary: '#A8A8A8',
          muted: '#6B6B6B',
          accent: '#FFD700',
        },
        border: {
          DEFAULT: '#2A2A2A',
          light: '#404040',
        },
        success: '#10B981',
        warning: '#F59E0B',
        danger: '#EF4444',
      },
      fontFamily: {
        sans: ['Inter', 'Tajawal', 'Cairo', 'system-ui', 'sans-serif'],
        arabic: ['Tajawal', 'Cairo', 'Noto Sans Arabic', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'shimmer': 'shimmer 3s ease infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          'from': { boxShadow: '0 0 20px rgba(255, 46, 46, 0.5)' },
          'to': { boxShadow: '0 0 30px rgba(255, 46, 46, 0.8), 0 0 40px rgba(255, 46, 46, 0.4)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '0% center' },
          '50%': { backgroundPosition: '100% center' },
          '100%': { backgroundPosition: '0% center' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(255, 46, 46, 0.5)',
        'glow-lg': '0 0 30px rgba(255, 46, 46, 0.8)',
        'inner-glow': 'inset 0 0 20px rgba(255, 46, 46, 0.1)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};
export default config;
