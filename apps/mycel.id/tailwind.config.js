import defaultTheme from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './renderer/**/*.{js,ts,jsx,tsx}',
    './../../packages/shared/**/*.{js,jsx,ts,tsx}',
  ],
  prefix: '',
  theme: {
    fontFamily: {
      sans: ['Inter', ...defaultTheme.fontFamily.sans],
      title: ['"Paytone One"', ...defaultTheme.fontFamily.sans],
      mono: ['Inconsolata', ...defaultTheme.fontFamily.mono],
    },
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        samon: 'var(--c-samon)',
        trinidad: 'var(--c-trinidad)',
        saffron: 'var(--c-saffron)',
        jade: 'var(--c-jade)',
        lochmara: 'var(--c-lochmara)',
        piano: 'var(--c-piano)',
        smoke: 'var(--c-smoke)',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        input: 'var(--input)',
        border: 'var(--border)',
      },
      boxShadow: {
        solid: '4px 4px var(--c-piano)',
        'solid-sm': '2px 2px var(--c-piano)',
        'solid-xs': '1px 1px var(--c-piano)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
