/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Dairy Gold brand palette extracted from live site
        brand: {
          blue: '#046bd2', // primary action / links
          blueDark: '#045cb4', // hover / darker accent
          nav: '#003a63', // header / footer background
          slateDark: '#1e293b', // headings
          slate: '#334155', // body text
          bg: '#f9fafb', // light background
          white: '#ffffff',
          border: '#e2e8f0',
          gray: '#cbd5e1',
          grayMuted: '#94a3b8'
        },
        'dairy': {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        'gold': {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        'professional': {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        }
      },
      fontFamily: {
        dairy: ['Inter', 'system-ui', 'sans-serif'],
        brand: ['Montserrat', 'sans-serif'],
        body: ['Roboto', 'system-ui', 'sans-serif'],
        slab: ['"Roboto Slab"', 'serif']
      }
    },
  },
  plugins: [
    function ({ addBase, theme }) {
      addBase({
        body: {
          fontFamily: theme('fontFamily.body'),
          backgroundColor: theme('colors.brand.bg'),
          color: theme('colors.brand.slate'),
        },
        'h1, h2, h3, h4, h5, h6': {
          fontFamily: theme('fontFamily.brand'),
          color: theme('colors.brand.slateDark'),
        },
        a: {
          color: theme('colors.brand.blue'),
          '&:hover': {
            color: theme('colors.brand.blueDark'),
          },
        },
        '::selection': {
          backgroundColor: '#046bd2',
          color: '#ffffff',
        },
      });
    },
  ],
};
