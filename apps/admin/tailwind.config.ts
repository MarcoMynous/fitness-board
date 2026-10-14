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
          terracotta: '#C25E3E',
          'terracotta-hover': '#A84E32',
          pine: '#2B4036',
          sage: '#6E7F73',
        },
        stone: {
          primary: '#1C1A18',
          secondary: '#635F5B',
          border: '#E7E2DA',
          sunken: '#F3EFEA',
        },
        state: {
          success: '#2B4036',
          warning: '#D97706',
          danger: '#9E2A2B',
        },
      },
    },
  },
  plugins: [],
};

export default config;
