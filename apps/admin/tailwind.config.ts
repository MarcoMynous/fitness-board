import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          base: '#F8FAFC',
          raised: '#FFFFFF',
          sunken: '#F1F5F9',
        },
        brand: {
          burgundy: '#6B1728',
          terracotta: '#C85A32',
        },
        stone: {
          primary: '#0F172A',
          secondary: '#64748B',
          border: '#E2E8F0',
        },
        state: {
          success: '#16A34A',
          warning: '#D97706',
          danger: '#DC2626',
        },
      },
    },
  },
  plugins: [],
};

export default config;
