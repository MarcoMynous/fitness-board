import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Kinfolk & Core Exact Palette
        'canvas-cream': '#FAF7F2',
        'surface-cream': '#F2EDE4',
        'surface-elevated': '#EAE3D6',
        'deep-charcoal': '#1C1A18',
        'muted-charcoal': '#524E48',
        primary: {
          DEFAULT: '#9A4023',
          hover: '#A84C2F',
        },
        'terracotta-hover': '#A84C2F',
        'on-primary': '#FFFFFF',
        'primary-fixed': '#FFDBD0',
        'on-primary-fixed': '#3A0B00',
        'primary-fixed-dim': '#FFB59E',
        secondary: {
          DEFAULT: '#4D6358',
        },
        'secondary-fixed': '#D0E8DA',
        'on-secondary-fixed': '#0A1F17',
        'secondary-container': '#CDE5D7',
        'on-secondary-container': '#51675C',
        'border-subtle': '#E4DDD3',
        'surface-dim': '#DFD9D5',
        'surface-bright': '#FFF8F4',
        'surface-container-highest': '#E7E1DE',
        'surface-container-lowest': '#FFFFFF',
        'inverse-surface': '#32302E',

        // Backward compatibility
        surface: {
          base: '#FAF7F2',
          raised: '#FFFFFF',
          sunken: '#F2EDE4',
        },
        brand: {
          burgundy: '#6B1728',
          'burgundy-dark': '#55121F',
          terracotta: '#9A4023',
          'terracotta-hover': '#A84C2F',
          'terracotta-subtle': '#F9EDE8',
          pine: '#4D6358',
          'pine-subtle': '#E8ECE9',
          sage: '#6E7F73',
        },
        stone: {
          primary: '#1C1A18',
          secondary: '#524E48',
          muted: '#8E8A85',
          border: '#E4DDD3',
          sunken: '#F2EDE4',
        },
        state: {
          success: '#4D6358',
          warning: '#B45309',
          danger: '#9E2A2B',
        },
      },
      fontFamily: {
        serif: ['var(--font-editorial)', 'Bodoni Moda', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'Plus Jakarta Sans', '-apple-system', 'sans-serif'],
        'display-hero': ['var(--font-editorial)', 'Bodoni Moda', 'serif'],
        'headline-lg': ['var(--font-editorial)', 'Bodoni Moda', 'serif'],
        'headline-md': ['var(--font-editorial)', 'Bodoni Moda', 'serif'],
        'headline-sm': ['var(--font-editorial)', 'Bodoni Moda', 'serif'],
        'body-lg': ['var(--font-sans)', 'Plus Jakarta Sans', 'sans-serif'],
        'body-md': ['var(--font-sans)', 'Plus Jakarta Sans', 'sans-serif'],
        'body-sm': ['var(--font-sans)', 'Plus Jakarta Sans', 'sans-serif'],
        'label-caps': ['var(--font-sans)', 'Plus Jakarta Sans', 'sans-serif'],
        'label-md': ['var(--font-sans)', 'Plus Jakarta Sans', 'sans-serif'],
        'title-lg': ['var(--font-sans)', 'Plus Jakarta Sans', 'sans-serif'],
      },
      spacing: {
        'margin-desktop': '3rem',
        'margin': '1.25rem',
        'space-xs': '0.25rem',
        'space-sm': '0.5rem',
        'space-md': '1rem',
        'space-lg': '1.5rem',
        'space-xl': '2.5rem',
        'space-2xl': '4rem',
        'gutter-desktop': '2rem',
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
