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
          sunken: '#F3EFEA',
        },
        brand: {
          burgundy: '#6B1728',
          'burgundy-dark': '#55121F',
          terracotta: '#C25E3E',
          'terracotta-hover': '#A84E32',
          'terracotta-subtle': '#F9EDE8',
          pine: '#2B4036',
          'pine-subtle': '#E8ECE9',
          sage: '#6E7F73',
        },
        stone: {
          primary: '#1C1A18',
          secondary: '#635F5B',
          muted: '#8E8A85',
          border: '#E7E2DA',
          sunken: '#F3EFEA',
        },
        state: {
          success: '#2B4036',
          warning: '#B45309',
          danger: '#9E2A2B',
        },
      },
      fontFamily: {
        serif: ['var(--font-editorial)', 'Bodoni Moda', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'Plus Jakarta Sans', '-apple-system', 'sans-serif'],
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
