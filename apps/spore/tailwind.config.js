import defaultTheme from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './../../packages/shared/**/*.{js,jsx,ts,tsx}',
  ],
  prefix: '',
  theme: {
    fontFamily: {
      sans: ['Minecraft', ...defaultTheme.fontFamily.sans],
      title: ['Minecraft', ...defaultTheme.fontFamily.sans],
      mono: ['Minecraft', ...defaultTheme.fontFamily.mono],
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
        primary: 'var(--c-primary)',
        secondary: 'var(--c-secondary)',
        dark: 'var(--c-dark)',
        light: 'var(--c-light)',
      },
      borderWidth: {
        3: '3px',
      },
      boxShadow: {
        solid: '0px 10px var(--c-dark)',
        'solid-sm': '0px 6px var(--c-dark)',
        'solid-xs': '0px 4px var(--c-dark)',
        'solid-xxs': '0px 2px var(--c-dark)',
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
        boounce2: {
          '0%, 100%': {
            transform: 'translateY(-10%)',
            'animation-timing-function': 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '50%': {
            transform: 'translateY(0)',
            'animation-timing-function': 'cubic-bezier(0, 0, 0.2, 1)',
          },
        },
      },
      animation: {
        'bounce-slow': 'boounce2 2.5s infinite',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
