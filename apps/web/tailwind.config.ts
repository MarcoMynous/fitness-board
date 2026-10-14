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
          base: '#FAF8F5',
          raised: '#FFFFFF',
          sunken: '#F2EDE4',
        },
        brand: {
          burgundy: '#6B1728',
          'burgundy-dark': '#55121F',
          terracotta: '#C85A32',
          'terracotta-dark': '#AD4B26',
        },
        stone: {
          primary: '#1C1917',
          secondary: '#78716C',
          muted: '#A8A29E',
          border: '#E7E2DA',
        },
        state: {
          success: '#2E6B4F',
          warning: '#B45309',
          danger: '#991B1B',
        },
      },
      fontFamily: {
        serif: ['var(--font-editorial)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '8px',
        lg: '12px',
        xl: '16px',
        '2xl': '24px',
      },
      boxShadow: {
        tactile: '0 2px 8px -2px rgba(28, 25, 23, 0.05), 0 1px 4px -1px rgba(28, 25, 23, 0.03)',
        'tactile-lg': '0 12px 32px -8px rgba(28, 25, 23, 0.08), 0 4px 12px -2px rgba(28, 25, 23, 0.04)',
      },
    },
  },
  plugins: [],
};

export default config;
