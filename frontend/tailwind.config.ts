import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        "background": "#f9f9f9",
        "surface-tint": "#465c97",
        "surface-container-high": "#e8e8e8",
        "tertiary-fixed-dim": "#dcc2a8",
        "surface-variant": "#e2e2e2",
        "on-tertiary-container": "#5b4834",
        "on-primary-fixed-variant": "#2e447d",
        "error": "#ba1a1a",
        "secondary": "#525d83",
        "surface-container-low": "#f3f3f3",
        "on-surface-variant": "#444650",
        "on-secondary": "#ffffff",
        "tertiary-fixed": "#f9dec3",
        "on-secondary-fixed-variant": "#3a456a",
        "surface-container-lowest": "#ffffff",
        "on-secondary-fixed": "#0d1a3c",
        "inverse-on-surface": "#f0f1f1",
        "on-primary-container": "#334a83",
        "on-tertiary-fixed": "#271908",
        "on-surface": "#1a1c1c",
        "error-container": "#ffdad6",
        "primary-container": "#a5bbfc",
        "on-primary": "#ffffff",
        "outline-variant": "#c5c6d1",
        "primary-fixed-dim": "#b2c5ff",
        "on-background": "#1a1c1c",
        "primary": "#465c97",
        "on-tertiary": "#ffffff",
        "on-error": "#ffffff",
        "tertiary": "#6f5b45",
        "tertiary-container": "#d2b89e",
        "on-primary-fixed": "#001848",
        "inverse-primary": "#b2c5ff",
        "secondary-fixed": "#dbe1ff",
        "surface-container": "#eeeeee",
        "inverse-surface": "#2f3131",
        "surface-dim": "#dadada",
        "surface": "#f9f9f9",
        "on-error-container": "#93000a",
        "surface-container-highest": "#e2e2e2",
        "on-secondary-container": "#4f5a80",
        "outline": "#757781",
        "secondary-container": "#c8d3ff",
        "surface-bright": "#f9f9f9",
        "primary-fixed": "#dae2ff",
        "on-tertiary-fixed-variant": "#554330",
        "secondary-fixed-dim": "#bac5f0"
      },
      fontFamily: {
        headline: ['Manrope', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        label: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        'none': '0',
        'xs': '0.125rem',
        'sm': '0.25rem',
        'md': '0.375rem',    // 6px - md
        'lg': '0.5rem',      // 8px - lg
        'xl': '0.75rem',     // 12px - xl
        'full': '9999px',
      },
      boxShadow: {
        'none': '0 0 #0000',
        'sm': '0 1px 2px 0 rgba(10, 33, 86, 0.05)',
        'base': '0 2px 4px 0 rgba(10, 33, 86, 0.06)',
        'md': '0 4px 8px 0 rgba(10, 33, 86, 0.08)',
        'lg': '0 8px 16px 0 rgba(10, 33, 86, 0.1)',
        'xl': '0 12px 20px 0 rgba(10, 33, 86, 0.12)',
        '2xl': '0 16px 32px 0 rgba(10, 33, 86, 0.14)',
        'ambient': '0 4px 6px -1px rgba(10, 33, 86, 0.04), 0 10px 15px -3px rgba(10, 33, 86, 0.08)',
        'inner': 'inset 0 1px 2px 0 rgba(10, 33, 86, 0.05)',
      },
      backdropBlur: {
        'xl': '20px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries'),
  ],
};

export default config;
