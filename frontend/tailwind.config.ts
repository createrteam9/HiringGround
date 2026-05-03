import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary palette
        primary: '#702ae1',
        'primary-container': '#b28cff',
        'primary-dim': '#6411d5',
        'on-primary': '#ffffff',
        'on-primary-container': '#5c1dd1',

        // Secondary palette
        secondary: '#8319da',
        'secondary-container': '#e4c6ff',
        'on-secondary': '#ffffff',
        'on-secondary-container': '#6900b5',

        // Tertiary palette
        tertiary: '#6f5b45',
        'tertiary-container': '#d2b89e',
        'on-tertiary': '#ffffff',
        'on-tertiary-container': '#5b4834',

        // Error palette
        error: '#b41340',
        'error-container': '#f9dedc',
        'on-error': '#ffffff',
        'on-error-container': '#410e0b',

        // Surface tiers
        surface: '#f5f7f9',
        'surface-dim': '#d9dce0',
        'surface-bright': '#fafbfc',
        'surface-container-lowest': '#ffffff',
        'surface-container-low': '#eef1f3',
        'surface-container': '#e8ebe0',
        'surface-container-high': '#e2e5e7',
        'surface-container-highest': '#dce0e2',
        'on-surface': '#2c2f31',
        'on-surface-variant': '#49474b',

        // Outline & variant
        outline: '#79747e',
        'outline-variant': '#abadaf',

        // Background
        background: '#fafbfc',
        'on-background': '#2c2f31',

        // Surface tint
        'surface-tint': '#702ae1',

        // Inverse
        'inverse-surface': '#1a1c1e',
        'inverse-on-surface': '#f0f1f3',
        'inverse-primary': '#d0bcff',

        // Scrim
        scrim: '#000000',
      },

      fontFamily: {
        headline: ['Manrope', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        label: ['Inter', 'sans-serif'],
      },

      fontSize: {
        'display-lg': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-md': ['2.8rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'display-sm': ['2.2rem', { lineHeight: '1.3', letterSpacing: '0em' }],
        'headline-lg': ['2rem', { lineHeight: '1.4', letterSpacing: '0em' }],
        'headline-md': ['1.75rem', { lineHeight: '1.4', letterSpacing: '0em' }],
        'headline-sm': ['1.5rem', { lineHeight: '1.4', letterSpacing: '0em' }],
        'title-lg': ['1.375rem', { lineHeight: '1.4', letterSpacing: '0em' }],
        'title-md': ['1rem', { lineHeight: '1.5', letterSpacing: '0.015em' }],
        'title-sm': ['0.875rem', { lineHeight: '1.4', letterSpacing: '0.01em' }],
        'body-lg': ['1rem', { lineHeight: '1.5', letterSpacing: '0.5px' }],
        'body-md': ['0.875rem', { lineHeight: '1.5', letterSpacing: '0.25px' }],
        'body-sm': ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.4px' }],
        'label-lg': ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.1em' }],
        'label-md': ['0.6875rem', { lineHeight: '1.4', letterSpacing: '0.05em' }],
        'label-sm': ['0.625rem', { lineHeight: '1.4', letterSpacing: '0.03em' }],
      },

      borderRadius: {
        'none': '0',
        'xs': '0.25rem',
        'sm': '0.5rem',
        'md': '1.5rem',    // 24px - Premium corners
        'lg': '2rem',      // 32px
        'xl': '3rem',      // 48px - Hero sections
        'full': '9999px',
      },

      spacing: {
        // Luxury spacing scale
        '1': '0.25rem',
        '2': '0.5rem',
        '3': '0.75rem',
        '4': '1rem',
        '5': '1.25rem',
        '6': '1.5rem',
        '7': '1.75rem',
        '8': '2rem',
        '9': '2.25rem',
        '10': '2.5rem',
        '12': '3rem',
        '14': '3.5rem',
        '16': '5.5rem',    // 88px - Luxury section margins
        '20': '7rem',      // 112px - Hero spacing
      },

      boxShadow: {
        'none': '0 0 #0000',
        'sm': '0 1px 2px 0 rgba(44, 47, 49, 0.05)',
        'base': '0 2px 4px 0 rgba(44, 47, 49, 0.06)',
        'md': '0 4px 8px 0 rgba(44, 47, 49, 0.08)',
        'lg': '0 8px 16px 0 rgba(44, 47, 49, 0.1)',
        'xl': '0 12px 20px 0 rgba(44, 47, 49, 0.12)',
        '2xl': '0 16px 32px 0 rgba(44, 47, 49, 0.14)',
        'ambient': '0px 20px 40px rgba(44, 47, 49, 0.06)',
        'inner': 'inset 0 1px 2px 0 rgba(44, 47, 49, 0.05)',
      },

      backdropBlur: {
        'xl': '20px',
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },

      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
      },
    },
  },

  plugins: [],
};

export default config;
