import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563EB',
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
          950: '#172554',
        },
        background: {
          DEFAULT: '#FFFFFF',
          secondary: '#F8FAFC',
        },
        foreground: {
          DEFAULT: '#0F172A',
          secondary: '#475569',
        },
        border: {
          DEFAULT: '#E2E8F0',
          secondary: '#CBD5E1',
        },
        ring: {
          DEFAULT: '#93C5FD',
        },
        success: {
          DEFAULT: '#16A34A',
          light: '#BBF7D0',
        },
        warning: {
          DEFAULT: '#CA8A04',
          light: '#FEF9C3',
        },
        error: {
          DEFAULT: '#DC2626',
          light: '#FEE2E2',
        }
      },
      borderRadius: {
        'lg': '0.625rem',
        'xl': '0.875rem',
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'DEFAULT': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        'md': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        'lg': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      },
    },
  },
  plugins: [],
}

export default config 