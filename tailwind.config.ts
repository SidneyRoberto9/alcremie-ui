import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        lucide: {
          800: '#161618',
          600: '#1B1B1F',
          300: '#414853',
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('@headlessui/tailwindcss')],
};
export default config;
